import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import {
  generateAppleNutritionLabelsGuide,
  generateApplePrivacyManifestXml,
  generateGooglePlayCsv,
  safeParseJson,
  SdkRule,
} from "./generators";
import { renderLandingPageHtml } from "./landing";

export interface Env {
  DB: D1Database;
  PAYMENT_WEBHOOK_SECRET?: string;
}

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

const AuditSchema = z.object({
  app_name: z.string().min(1),
  dependencies: z.array(z.string()),
  has_in_app_ai_consent_modal: z.boolean(),
  privacy_policy_text: z.string().optional(),
  privacy_policy_url: z.string().url().optional(),
});

const GenerateSchema = z.object({
  app_name: z.string().min(1).optional(),
  dependencies: z.array(z.string()),
});

export const NOWPAYMENTS_PASS_URL = "https://nowpayments.io/payment/?iid=4764234970";
export const NOWPAYMENTS_PRO_URL = "https://nowpayments.io/payment/?iid=4971511243";

const UnlockIntentSchema = z.object({
  app_name: z.string().min(1),
  detected_sdks_count: z.number().int().nonnegative().optional(),
  dependencies: z.array(z.string()).optional(),
  plan: z.enum(["pass", "pro"]).optional(),
});

const PaymentWebhookSchema = z
  .object({
    provider: z.enum(["nowpayments", "xpay", "direct"]).optional(),
    payment_id: z.union([z.string(), z.number()]).optional(),
    invoice_id: z.union([z.string(), z.number()]).optional(),
    iid: z.union([z.string(), z.number()]).optional(),
    order_id: z.union([z.string(), z.number()]).optional(),
    transaction_id: z.union([z.string(), z.number()]).optional(),
    payment_status: z.string().optional(),
    status: z.string().optional(),
    price_amount: z.union([z.number(), z.string()]).optional(),
    actually_paid: z.union([z.number(), z.string()]).optional(),
    amount: z.union([z.number(), z.string()]).optional(),
    pay_currency: z.string().optional(),
    currency: z.string().optional(),
    plan: z.enum(["pass", "pro"]).optional(),
    buyer_email: z.string().optional(),
    customer_email: z.string().optional(),
    order_description: z.string().optional(),
  })
  .passthrough();

const ClaimKeySchema = z.object({
  identifier: z.string().min(2),
  plan: z.enum(["pass", "pro"]).optional(),
});

async function ensurePaymentClaimsTable(db: D1Database): Promise<void> {
  await db
    .prepare(
      `CREATE TABLE IF NOT EXISTS payment_claims (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        payment_id TEXT UNIQUE,
        order_id TEXT,
        buyer_email TEXT,
        iid TEXT,
        plan TEXT,
        amount_usd REAL,
        credits INTEGER,
        api_key TEXT,
        key_hash TEXT,
        payment_status TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )`
    )
    .run();
}


async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function generateSecureApiKey(plan: "pass" | "pro"): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `appshield_${plan}_${hex}`;
}

async function findApiKeyRecord(
  db: D1Database,
  rawApiKey: string
): Promise<{ key_hash: string; plan: string; credits_remaining: number } | null> {
  const hashedKey = await sha256Hex(rawApiKey);
  const record = await db
    .prepare(
      "SELECT key_hash, plan, credits_remaining FROM api_keys WHERE key_hash = ? OR key_hash = ? LIMIT 1"
    )
    .bind(hashedKey, rawApiKey)
    .first<{ key_hash: string; plan: string; credits_remaining: number }>();

  return record ?? null;
}

async function getMatchingSdks(
  db: D1Database,
  dependencies: string[]
): Promise<SdkRule[]> {
  if (!dependencies || dependencies.length === 0) {
    return [];
  }
  const uniqueDeps = Array.from(new Set(dependencies));
  const placeholders = uniqueDeps.map(() => "?").join(", ");
  const query = `SELECT * FROM sdk_rules WHERE package_name IN (${placeholders})`;
  const { results } = await db
    .prepare(query)
    .bind(...uniqueDeps)
    .all<SdkRule>();
  return results || [];
}

function parseKeywords(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((k) => String(k));
    }
  } catch {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

async function fetchPrivacyPolicyTextFromUrl(url: string): Promise<{
  text: string;
  fetch_error?: string;
}> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "AppShield-MCP-Auditor/3.0 (+https://appshield.dev)",
        Accept: "text/html,text/plain,application/xhtml+xml,*/*",
      },
    });
    if (!response.ok) {
      return {
        text: "",
        fetch_error: `HTTP ${response.status} when fetching privacy_policy_url`,
      };
    }
    const html = await response.text();
    const plainText = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return { text: plainText };
  } catch (err) {
    return {
      text: "",
      fetch_error:
        err instanceof Error ? err.message : "Failed to fetch privacy policy URL",
    };
  }
}

async function performProjectAudit(
  db: D1Database,
  params: {
    app_name: string;
    dependencies: string[];
    has_in_app_ai_consent_modal: boolean;
    privacy_policy_text?: string;
    privacy_policy_url?: string;
  }
) {
  const {
    app_name,
    dependencies,
    has_in_app_ai_consent_modal,
    privacy_policy_text,
    privacy_policy_url,
  } = params;

  const matchedSdks = await getMatchingSdks(db, dependencies);
  const matchedNames = new Set(matchedSdks.map((s) => s.package_name));
  const unmatchedDependencies = dependencies.filter(
    (d) => !matchedNames.has(d)
  );

  let effectivePolicyText = privacy_policy_text || "";
  let policyFetchError: string | undefined;

  if (!effectivePolicyText && privacy_policy_url) {
    const fetched = await fetchPrivacyPolicyTextFromUrl(privacy_policy_url);
    effectivePolicyText = fetched.text;
    policyFetchError = fetched.fetch_error;
  }

  const risks: Array<{
    severity: "CRITICAL" | "HIGH" | "MEDIUM";
    code: string;
    sdk: string;
    message: string;
    remediation: string;
  }> = [];

  if (policyFetchError) {
    risks.push({
      severity: "HIGH",
      code: "PRIVACY_POLICY_URL_UNREACHABLE",
      sdk: "general",
      message: `Could not fetch privacy policy from '${privacy_policy_url}': ${policyFetchError}`,
      remediation:
        "Ensure your privacy policy URL is publicly accessible without authentication so Apple App Review and Google Play reviewers can access it.",
    });
  }

  const normalizedPolicy = effectivePolicyText.toLowerCase();

  for (const sdk of matchedSdks) {
    if (sdk.requires_ai_consent_modal === 1 && !has_in_app_ai_consent_modal) {
      risks.push({
        severity: "CRITICAL",
        code: "APPLE_GUIDELINE_5_1_2_I_AI_CONSENT_MISSING",
        sdk: sdk.package_name,
        message: `SDK '${sdk.package_name}' transmits user data to a third-party AI service, but 'has_in_app_ai_consent_modal' is false.`,
        remediation:
          "Add an explicit in-app consent modal disclosing what data will be shared with third-party AI before sending any user input (Apple App Store Review Guideline 5.1.2(i)).",
      });
    }

    const keywords = parseKeywords(sdk.privacy_policy_keywords);
    if (keywords.length > 0) {
      if (!effectivePolicyText || effectivePolicyText.trim() === "") {
        risks.push({
          severity: "HIGH",
          code: "PRIVACY_POLICY_TEXT_MISSING",
          sdk: sdk.package_name,
          message: `No privacy policy text or reachable URL provided to verify required disclosures for '${sdk.package_name}'.`,
          remediation: `Ensure your privacy policy explicitly mentions at least one of: ${keywords.join(", ")}.`,
        });
      } else {
        const hasAnyKeyword = keywords.some((kw) =>
          normalizedPolicy.includes(kw.toLowerCase())
        );
        if (!hasAnyKeyword) {
          risks.push({
            severity: "HIGH",
            code: "PRIVACY_POLICY_KEYWORD_MISSING",
            sdk: sdk.package_name,
            message: `Privacy policy is missing required disclosure keywords for '${sdk.package_name}'.`,
            remediation: `Update your privacy policy to include relevant disclosure terms (${keywords.join(", ")}).`,
          });
        }
      }
    }
  }

  const fullXml = generateApplePrivacyManifestXml(matchedSdks);
  const fullCsv = generateGooglePlayCsv(matchedSdks);

  const xmlPreview = fullXml.split("\n").slice(0, 6).join("\n");
  const csvPreview = fullCsv.split("\n").slice(0, 6).join("\n");

  return {
    app_name,
    audit_status: risks.some((r) => r.severity === "CRITICAL")
      ? "HIGH_REJECTION_RISK"
      : risks.length > 0
      ? "WARNINGS_FOUND"
      : "PASSED",
    privacy_policy_source: privacy_policy_url
      ? `url:${privacy_policy_url}`
      : privacy_policy_text
      ? "inline_text"
      : "none",
    detected_sdks_count: matchedSdks.length,
    detected_sdks: matchedSdks.map((s) => ({
      package_name: s.package_name,
      ecosystem: s.ecosystem,
      requires_ai_consent_modal: Boolean(s.requires_ai_consent_modal),
    })),
    unmatched_dependencies: unmatchedDependencies,
    rejection_risks_count: risks.length,
    rejection_risks: risks,
    free_preview: {
      ios_privacy_manifest_xml_preview: xmlPreview,
      google_play_data_safety_csv_preview: csvPreview,
      truncated: true,
      upgrade_message:
        "This is a 6-line preview. Upgrade to Pro and call POST /v1/generate with your x-api-key (or MCP tool generate_store_compliance_files) to unlock the complete, ready-to-submit Apple PrivacyInfo.xcprivacy XML, Google Play Data Safety CSV, and Apple Nutrition Labels guide.",
    },
  };
}

app.get("/", async (c) => {
  const row = await c.env.DB.prepare(
    "SELECT COUNT(*) as total FROM sdk_rules"
  ).first<{ total: number }>();

  const sdkCount = row?.total ?? 50;
  return c.html(renderLandingPageHtml(sdkCount));
});

app.get("/health", async (c) => {
  const row = await c.env.DB.prepare(
    "SELECT COUNT(*) as total FROM sdk_rules"
  ).first<{ total: number }>();

  return c.json({
    status: "ok",
    service: "appshield-mcp",
    version: "3.0.0",
    sdk_rules_count: row?.total ?? 0,
    endpoints: [
      "GET /",
      "GET /health",
      "POST /v1/audit",
      "POST /v1/generate",
      "POST /v1/unlock-intent",
      "POST /v1/claim-key",
      "POST /webhooks/payment",
      "GET /mcp",
      "POST /mcp",
    ],
  });
});

app.post("/v1/audit", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = AuditSchema.safeParse(body);
  if (!parsed.success) {
    return c.json(
      {
        error: "Invalid request payload",
        details: parsed.error.flatten(),
      },
      400
    );
  }

  const result = await performProjectAudit(c.env.DB, parsed.data);
  return c.json(result);
});

app.post("/v1/generate", async (c) => {
  const apiKey = c.req.header("x-api-key");
  if (!apiKey) {
    return c.json(
      {
        error: "Missing x-api-key header",
        message:
          "Please provide a valid API key in the x-api-key header or call /v1/unlock-intent to purchase access.",
      },
      401
    );
  }

  const keyRecord = await findApiKeyRecord(c.env.DB, apiKey);

  if (!keyRecord) {
    return c.json({ error: "Invalid API key" }, 401);
  }

  if (keyRecord.credits_remaining <= 0) {
    return c.json(
      {
        error: "Insufficient credits",
        credits_remaining: 0,
        message:
          "Your API key has 0 credits remaining. Call /v1/unlock-intent or /webhooks/payment to top up your credits.",
      },
      402
    );
  }

  const body = await c.req.json().catch(() => null);
  const parsed = GenerateSchema.safeParse(body);
  if (!parsed.success) {
    return c.json(
      {
        error: "Invalid request payload",
        details: parsed.error.flatten(),
      },
      400
    );
  }

  const { app_name, dependencies } = parsed.data;
  const matchedSdks = await getMatchingSdks(c.env.DB, dependencies);

  await c.env.DB.prepare(
    "UPDATE api_keys SET credits_remaining = credits_remaining - 1 WHERE key_hash = ?"
  )
    .bind(keyRecord.key_hash)
    .run();

  const updatedCredits = keyRecord.credits_remaining - 1;
  const iosPrivacyManifestXml = generateApplePrivacyManifestXml(matchedSdks);
  const googlePlayDataSafetyCsv = generateGooglePlayCsv(matchedSdks);
  const appleNutritionLabels = generateAppleNutritionLabelsGuide(matchedSdks);

  return c.json({
    app_name: app_name ?? "unnamed-app",
    plan: keyRecord.plan,
    credits_remaining: updatedCredits,
    detected_sdks_count: matchedSdks.length,
    detected_sdks: matchedSdks.map((s) => s.package_name),
    ios_privacy_manifest_xml: iosPrivacyManifestXml,
    google_play_data_safety_csv: googlePlayDataSafetyCsv,
    apple_nutrition_labels: appleNutritionLabels,
  });
});

app.post("/v1/unlock-intent", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = UnlockIntentSchema.safeParse(body);
  if (!parsed.success) {
    return c.json(
      {
        error: "Invalid request payload",
        details: parsed.error.flatten(),
      },
      400
    );
  }

  const { app_name, detected_sdks_count, dependencies, plan = "pass" } = parsed.data;
  let sdkCount = detected_sdks_count ?? 0;

  if (detected_sdks_count === undefined && dependencies) {
    const matched = await getMatchingSdks(c.env.DB, dependencies);
    sdkCount = matched.length;
  }

  const insertResult = await c.env.DB.prepare(
    "INSERT INTO unlock_intents (app_name, detected_sdks_count) VALUES (?, ?)"
  )
    .bind(app_name, sdkCount)
    .run();

  const transactionId = insertResult.meta?.last_row_id ?? Date.now();
  const checkoutUrl = plan === "pro" ? NOWPAYMENTS_PRO_URL : NOWPAYMENTS_PASS_URL;

  return c.json({
    status: "intent_created",
    transaction_id: transactionId,
    app_name,
    detected_sdks_count: sdkCount,
    selected_plan: plan,
    pricing_tiers: {
      pass: { price_usd: 9, credits: 5, checkout_url: NOWPAYMENTS_PASS_URL },
      pro: { price_usd: 19, credits: 50, checkout_url: NOWPAYMENTS_PRO_URL },
    },
    checkout_url: checkoutUrl,
    claim_endpoint: "/v1/claim-key",
    webhook_endpoint: "/webhooks/payment",
  });
});

// ============================================================================
// Day 3: Crypto & Payment Gateway Webhook (NOWPayments IPN & Key Claiming)
// ============================================================================

const SUCCESSFUL_PAYMENT_STATUSES = new Set([
  "finished",
  "confirmed",
  "completed",
  "paid",
  "succeeded",
  "success",
]);

app.post("/webhooks/payment", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = PaymentWebhookSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        error: "Invalid payment webhook payload",
        details: parsed.error.flatten(),
      },
      400
    );
  }

  const data = parsed.data;
  const rawStatus = String(
    data.payment_status || data.status || "finished"
  ).toLowerCase();

  if (!SUCCESSFUL_PAYMENT_STATUSES.has(rawStatus)) {
    return c.json(
      {
        status: "ignored",
        payment_status: rawStatus,
        message: `Payment status '${rawStatus}' is not final/confirmed yet. No API key issued.`,
      },
      202
    );
  }

  const rawIid = String(data.iid ?? data.invoice_id ?? "");
  const isProByIid = rawIid === "4971511243";
  const isPassByIid = rawIid === "4764234970";

  const amountUsd = Number(
    data.price_amount ??
      data.amount ??
      data.actually_paid ??
      (data.plan === "pro" || isProByIid ? 19 : 9)
  );

  if (Number.isNaN(amountUsd) || amountUsd < 9) {
    return c.json(
      {
        error: "Insufficient payment amount",
        amount_received_usd: amountUsd,
        minimum_required_usd: 9,
        pricing_tiers: {
          pass: "$9 USD (5 credits)",
          pro: "$19 USD (50 credits)",
        },
      },
      400
    );
  }

  const assignedPlan: "pass" | "pro" =
    data.plan === "pro" || isProByIid || (!isPassByIid && amountUsd >= 19)
      ? "pro"
      : "pass";
  const assignedCredits = assignedPlan === "pro" ? 50 : 5;

  await ensurePaymentClaimsTable(c.env.DB);

  const paymentId = String(
    data.payment_id ?? data.transaction_id ?? data.order_id ?? `np_${Date.now()}`
  ).trim();
  const orderId = String(data.order_id ?? data.invoice_id ?? paymentId).trim();
  const buyerEmail = String(
    data.buyer_email ?? data.customer_email ?? ""
  )
    .trim()
    .toLowerCase();

  // Idempotency check: if NOWPayments sends both 'confirmed' and 'finished' IPNs for the same payment_id, return existing key
  const existingClaim = await c.env.DB.prepare(
    "SELECT * FROM payment_claims WHERE payment_id = ? LIMIT 1"
  )
    .bind(paymentId)
    .first<{
      payment_id: string;
      api_key: string;
      key_hash: string;
      plan: string;
      credits: number;
      amount_usd: number;
    }>();

  if (existingClaim) {
    const liveKey = await findApiKeyRecord(c.env.DB, existingClaim.api_key);
    return c.json(
      {
        status: "payment_verified",
        idempotent: true,
        provider: "nowpayments",
        payment_id: existingClaim.payment_id,
        amount_usd: existingClaim.amount_usd,
        plan: existingClaim.plan,
        credits_remaining: liveKey?.credits_remaining ?? existingClaim.credits,
        api_key: existingClaim.api_key,
        key_hash: existingClaim.key_hash,
        cli_usage: `npx appshield-mcp generate --key=${existingClaim.api_key}`,
        message: "Payment already verified. Returning your active API key.",
      },
      200
    );
  }

  const newApiKey = generateSecureApiKey(assignedPlan);
  const keyHash = await sha256Hex(newApiKey);

  await c.env.DB.prepare(
    "INSERT INTO api_keys (key_hash, plan, credits_remaining) VALUES (?, ?, ?)"
  )
    .bind(keyHash, assignedPlan, assignedCredits)
    .run();

  await c.env.DB.prepare(
    `INSERT INTO payment_claims (payment_id, order_id, buyer_email, iid, plan, amount_usd, credits, api_key, key_hash, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      paymentId,
      orderId,
      buyerEmail || null,
      rawIid || (assignedPlan === "pro" ? "4971511243" : "4764234970"),
      assignedPlan,
      amountUsd,
      assignedCredits,
      newApiKey,
      keyHash,
      rawStatus
    )
    .run();

  return c.json(
    {
      status: "payment_verified",
      provider:
        data.provider ||
        (data.payment_status ? "nowpayments" : data.status ? "xpay" : "direct"),
      payment_id: paymentId,
      order_id: orderId,
      buyer_email: buyerEmail || undefined,
      amount_usd: amountUsd,
      plan: assignedPlan,
      credits_remaining: assignedCredits,
      api_key: newApiKey,
      key_hash: keyHash,
      cli_usage: `npx appshield-mcp generate --key=${newApiKey}`,
      message:
        "Payment verified! Save your api_key securely — you can also retrieve it anytime via /v1/claim-key using your payment_id or email.",
    },
    201
  );
});

app.post("/v1/claim-key", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = ClaimKeySchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      {
        error: "Invalid request. Please provide your NOWPayments Payment ID, Order ID, or Email.",
        details: parsed.error.flatten(),
      },
      400
    );
  }

  await ensurePaymentClaimsTable(c.env.DB);

  const identifier = parsed.data.identifier.trim();
  const normalizedIdentifier = identifier.toLowerCase();
  const requestedPlan: "pass" | "pro" = parsed.data.plan === "pro" ? "pro" : "pass";

  // 1. Check if an IPN webhook or prior claim already registered this Payment ID, Order ID, or Email
  const matchedClaim = await c.env.DB.prepare(
    `SELECT * FROM payment_claims
     WHERE payment_id = ?
        OR order_id = ?
        OR LOWER(buyer_email) = ?
     ORDER BY id DESC
     LIMIT 1`
  )
    .bind(identifier, identifier, normalizedIdentifier)
    .first<{
      payment_id: string;
      order_id: string;
      buyer_email: string | null;
      plan: string;
      amount_usd: number;
      credits: number;
      api_key: string;
      key_hash: string;
    }>();

  if (matchedClaim) {
    const keyRow = await findApiKeyRecord(c.env.DB, matchedClaim.api_key);
    const liveCredits = keyRow?.credits_remaining ?? matchedClaim.credits;

    return c.json({
      status: "key_claimed",
      source: "verified_ipn_record",
      payment_id: matchedClaim.payment_id,
      plan: matchedClaim.plan,
      credits_remaining: liveCredits,
      api_key: matchedClaim.api_key,
      cli_usage: `npx appshield-mcp generate --key=${matchedClaim.api_key}`,
      message: "API key found and ready to use!",
    });
  }

  // 2. If NOWPayments IPN is still in transit or buyer entered their NOWPayments Payment ID / Email right after checkout,
  // issue & bind their API key deterministically to this identifier so they can use it immediately.
  const assignedCredits = requestedPlan === "pro" ? 50 : 5;
  const amountUsd = requestedPlan === "pro" ? 19 : 9;
  const iid = requestedPlan === "pro" ? "4971511243" : "4764234970";
  const isEmail = identifier.includes("@");

  const newApiKey = generateSecureApiKey(requestedPlan);
  const keyHash = await sha256Hex(newApiKey);
  const claimPaymentId = isEmail ? `claim_${ normalizedIdentifier }` : identifier;

  await c.env.DB.prepare(
    "INSERT INTO api_keys (key_hash, plan, credits_remaining) VALUES (?, ?, ?)"
  )
    .bind(keyHash, requestedPlan, assignedCredits)
    .run();

  await c.env.DB.prepare(
    `INSERT INTO payment_claims (payment_id, order_id, buyer_email, iid, plan, amount_usd, credits, api_key, key_hash, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      claimPaymentId,
      identifier,
      isEmail ? normalizedIdentifier : null,
      iid,
      requestedPlan,
      amountUsd,
      assignedCredits,
      newApiKey,
      keyHash,
      "confirmed"
    )
    .run();

  return c.json(
    {
      status: "key_claimed",
      source: "instant_claim_issued",
      payment_id: claimPaymentId,
      plan: requestedPlan,
      credits_remaining: assignedCredits,
      api_key: newApiKey,
      cli_usage: `npx appshield-mcp generate --key=${newApiKey}`,
      message: "Your API key has been activated and bound to your transaction/email!",
    },
    201
  );
});

// ============================================================================
// Model Context Protocol (MCP) JSON-RPC 2.0 Endpoint (/mcp)
// ============================================================================

const MCP_TOOLS = [
  {
    name: "inspect_sdk_footprint",
    description:
      "Free tool: Inspects a single mobile SDK package_name and returns its exact Apple PrivacyInfo.xcprivacy data types, required reason APIs, Google Play Data Safety declarations, AI consent modal requirement, and privacy policy keywords.",
    inputSchema: {
      type: "object",
      properties: {
        package_name: {
          type: "string",
          description:
            "Exact SDK package name (e.g., 'openai', '@sentry/react-native', 'firebase_analytics', 'AppsFlyerFramework')",
        },
      },
      required: ["package_name"],
    },
  },
  {
    name: "audit_mobile_project",
    description:
      "Free tool: Audits a mobile project's dependencies against Apple App Store and Google Play compliance rules. Optionally fetches privacy_policy_url to automatically detect missing SDK disclosures and AI consent modal violations.",
    inputSchema: {
      type: "object",
      properties: {
        app_name: {
          type: "string",
          description: "Name of the mobile application",
        },
        dependencies: {
          type: "array",
          items: { type: "string" },
          description:
            "Array of SDK/package names extracted from package.json, pubspec.lock, Podfile.lock, or build.gradle",
        },
        has_in_app_ai_consent_modal: {
          type: "boolean",
          description:
            "Whether the app shows an explicit in-app user consent modal before sending data to third-party AI APIs",
        },
        privacy_policy_url: {
          type: "string",
          description:
            "Optional public URL of the app's privacy policy page to fetch and scan for required SDK disclosures",
        },
        privacy_policy_text: {
          type: "string",
          description:
            "Optional raw text of the privacy policy if URL is not provided",
        },
      },
      required: ["app_name", "dependencies", "has_in_app_ai_consent_modal"],
    },
  },
  {
    name: "generate_store_compliance_files",
    description:
      "Paid tool (consumes 1 API credit): Generates the complete, ready-to-submit Apple PrivacyInfo.xcprivacy XML, Google Play Data Safety CSV, and Apple Nutrition Labels guide for a mobile project.",
    inputSchema: {
      type: "object",
      properties: {
        app_name: {
          type: "string",
          description: "Name of the mobile application",
        },
        dependencies: {
          type: "array",
          items: { type: "string" },
          description: "List of mobile SDK package names used in the project",
        },
        api_key: {
          type: "string",
          description: "Pro or Pass API key",
        },
      },
      required: ["app_name", "dependencies", "api_key"],
    },
  },
];

app.get("/mcp", async (c) => {
  const row = await c.env.DB.prepare(
    "SELECT COUNT(*) as total FROM sdk_rules"
  ).first<{ total: number }>();

  return c.json({
    protocol: "mcp",
    protocolVersion: "2024-11-05",
    transport: "streamable-http-jsonrpc",
    serverInfo: {
      name: "appshield-mcp",
      version: "3.0.0",
      sdk_rules_count: row?.total ?? 0,
    },
    capabilities: {
      tools: {},
    },
    tools: MCP_TOOLS,
  });
});

app.post("/mcp", async (c) => {
  const rpcRequest = await c.req.json().catch(() => null);

  if (!rpcRequest || typeof rpcRequest !== "object") {
    return c.json(
      {
        jsonrpc: "2.0",
        id: null,
        error: {
          code: -32700,
          message: "Parse error: Invalid JSON payload",
        },
      },
      400
    );
  }

  const { id = null, method, params = {} } = rpcRequest as {
    jsonrpc?: string;
    id?: string | number | null;
    method?: string;
    params?: Record<string, unknown>;
  };

  if (method === "initialize") {
    return c.json({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {},
        },
        serverInfo: {
          name: "appshield-mcp",
          version: "3.0.0",
        },
      },
    });
  }

  if (method === "notifications/initialized" || method === "ping") {
    return c.json({
      jsonrpc: "2.0",
      id,
      result: {},
    });
  }

  if (method === "tools/list") {
    return c.json({
      jsonrpc: "2.0",
      id,
      result: {
        tools: MCP_TOOLS,
      },
    });
  }

  if (method === "tools/call") {
    const toolName = String(params.name || "");
    const rawArgs = (params.arguments || {}) as Record<string, unknown>;

    if (toolName === "inspect_sdk_footprint") {
      const packageName = String(rawArgs.package_name || "").trim();
      if (!packageName) {
        return c.json({
          jsonrpc: "2.0",
          id,
          result: {
            isError: true,
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  error: "Missing required parameter 'package_name'",
                }),
              },
            ],
          },
        });
      }

      const sdk = await c.env.DB.prepare(
        "SELECT * FROM sdk_rules WHERE package_name = ?"
      )
        .bind(packageName)
        .first<SdkRule>();

      if (!sdk) {
        return c.json({
          jsonrpc: "2.0",
          id,
          result: {
            isError: false,
            content: [
              {
                type: "text",
                text: JSON.stringify(
                  {
                    found: false,
                    package_name: packageName,
                    message: `No compliance rule found for '${packageName}' in sdk_rules database.`,
                  },
                  null,
                  2
                ),
              },
            ],
          },
        });
      }

      const payload = {
        found: true,
        package_name: sdk.package_name,
        ecosystem: sdk.ecosystem,
        requires_ai_consent_modal: Boolean(sdk.requires_ai_consent_modal),
        apple_data_types: safeParseJson(sdk.apple_data_types, []),
        apple_required_reasons: safeParseJson(sdk.apple_required_reasons, []),
        google_play_data_types: safeParseJson(sdk.google_play_data_types, []),
        privacy_policy_keywords: parseKeywords(sdk.privacy_policy_keywords),
      };

      return c.json({
        jsonrpc: "2.0",
        id,
        result: {
          isError: false,
          content: [
            {
              type: "text",
              text: JSON.stringify(payload, null, 2),
            },
          ],
          structuredContent: payload,
        },
      });
    }

    if (toolName === "audit_mobile_project") {
      const schema = z.object({
        app_name: z.string().min(1),
        dependencies: z.array(z.string()),
        has_in_app_ai_consent_modal: z.boolean(),
        privacy_policy_url: z.string().url().optional(),
        privacy_policy_text: z.string().optional(),
      });

      const parsed = schema.safeParse(rawArgs);
      if (!parsed.success) {
        return c.json({
          jsonrpc: "2.0",
          id,
          result: {
            isError: true,
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  error: "Invalid arguments for audit_mobile_project",
                  details: parsed.error.flatten(),
                }),
              },
            ],
          },
        });
      }

      const auditResult = await performProjectAudit(c.env.DB, parsed.data);

      return c.json({
        jsonrpc: "2.0",
        id,
        result: {
          isError: false,
          content: [
            {
              type: "text",
              text: JSON.stringify(auditResult, null, 2),
            },
          ],
          structuredContent: auditResult,
        },
      });
    }

    if (toolName === "generate_store_compliance_files") {
      const schema = z.object({
        app_name: z.string().min(1),
        dependencies: z.array(z.string()),
        api_key: z.string().min(1),
      });

      const parsed = schema.safeParse(rawArgs);
      if (!parsed.success) {
        return c.json({
          jsonrpc: "2.0",
          id,
          result: {
            isError: true,
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  error:
                    "Invalid arguments for generate_store_compliance_files",
                  details: parsed.error.flatten(),
                }),
              },
            ],
          },
        });
      }

      const { app_name, dependencies, api_key } = parsed.data;
      const keyRecord = await findApiKeyRecord(c.env.DB, api_key);

      if (!keyRecord) {
        return c.json({
          jsonrpc: "2.0",
          id,
          result: {
            isError: true,
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  error: "Invalid api_key",
                }),
              },
            ],
          },
        });
      }

      if (keyRecord.credits_remaining <= 0) {
        return c.json({
          jsonrpc: "2.0",
          id,
          result: {
            isError: true,
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  error: "Insufficient credits remaining on api_key",
                  credits_remaining: 0,
                }),
              },
            ],
          },
        });
      }

      const matchedSdks = await getMatchingSdks(c.env.DB, dependencies);

      await c.env.DB.prepare(
        "UPDATE api_keys SET credits_remaining = credits_remaining - 1 WHERE key_hash = ?"
      )
        .bind(keyRecord.key_hash)
        .run();

      const updatedCredits = keyRecord.credits_remaining - 1;
      const iosPrivacyManifestXml = generateApplePrivacyManifestXml(matchedSdks);
      const googlePlayDataSafetyCsv = generateGooglePlayCsv(matchedSdks);
      const appleNutritionLabels = generateAppleNutritionLabelsGuide(matchedSdks);

      const payload = {
        app_name,
        plan: keyRecord.plan,
        credits_remaining: updatedCredits,
        detected_sdks_count: matchedSdks.length,
        detected_sdks: matchedSdks.map((s) => s.package_name),
        ios_privacy_manifest_xml: iosPrivacyManifestXml,
        google_play_data_safety_csv: googlePlayDataSafetyCsv,
        apple_nutrition_labels: appleNutritionLabels,
      };

      return c.json({
        jsonrpc: "2.0",
        id,
        result: {
          isError: false,
          content: [
            {
              type: "text",
              text: JSON.stringify(payload, null, 2),
            },
          ],
          structuredContent: payload,
        },
      });
    }

    return c.json(
      {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32601,
          message: `Unknown MCP tool: '${toolName}'`,
        },
      },
      404
    );
  }

  return c.json(
    {
      jsonrpc: "2.0",
      id,
      error: {
        code: -32601,
        message: `Method not found: '${method}'`,
      },
    },
    404
  );
});

export default app;
