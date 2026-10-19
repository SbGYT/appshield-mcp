#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_API_BASE_URL =
  process.env.APPSHIELD_API_URL ||
  "https://appshield-mcp.appshield-api.workers.dev";

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

function color(text, ...styles) {
  return `${styles.join("")}${text}${COLORS.reset}`;
}

function parseCliArgs(argv) {
  const args = argv.slice(2);
  const command = args.find((a) => !a.startsWith("-")) || "help";
  const flags = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
      const eqIdx = arg.indexOf("=");
      if (eqIdx !== -1) {
        const key = arg.slice(2, eqIdx);
        const val = arg.slice(eqIdx + 1);
        flags[key] = val;
      } else {
        const key = arg.slice(2);
        const next = args[i + 1];
        if (next && !next.startsWith("-")) {
          flags[key] = next;
          i++;
        } else {
          flags[key] = "true";
        }
      }
    }
  }

  return { command, flags };
}

/**
 * Extracts package names from package.json, Podfile.lock, pubspec.lock,
 * build.gradle, and build.gradle.kts in the target directory without reading source code.
 */
export function scanProjectDependencies(projectDir) {
  const dependencies = new Set();
  const scannedFiles = [];
  let detectedAppName = path.basename(path.resolve(projectDir));

  // 1. package.json (React Native / Expo / Node)
  const pkgJsonPath = path.join(projectDir, "package.json");
  if (fs.existsSync(pkgJsonPath)) {
    try {
      const raw = fs.readFileSync(pkgJsonPath, "utf8");
      const pkg = JSON.parse(raw);
      if (pkg.name && typeof pkg.name === "string") {
        detectedAppName = pkg.name;
      }
      const sections = [
        pkg.dependencies,
        pkg.devDependencies,
        pkg.peerDependencies,
      ];
      for (const sec of sections) {
        if (sec && typeof sec === "object") {
          for (const depName of Object.keys(sec)) {
            dependencies.add(depName);
          }
        }
      }
      scannedFiles.push("package.json");
    } catch {
      // Ignore malformed package.json
    }
  }

  // 2. Podfile.lock (iOS / CocoaPods)
  const podfileLockCandidates = [
    path.join(projectDir, "Podfile.lock"),
    path.join(projectDir, "ios", "Podfile.lock"),
  ];
  for (const podPath of podfileLockCandidates) {
    if (fs.existsSync(podPath)) {
      try {
        const content = fs.readFileSync(podPath, "utf8");
        const podsBlockMatch = content.match(
          /PODS:\s*\r?\n([\s\S]*?)(?:\r?\n\r?\n|\r?\nDEPENDENCIES:)/
        );
        const block = podsBlockMatch ? podsBlockMatch[1] : content;
        const lines = block.split(/\r?\n/);
        for (const line of lines) {
          // Matches top-level pod entries like: "  - Alamofire (5.8.1):" or "  - AppsFlyerFramework (6.12.2)"
          const m = line.match(/^\s{2}-\s+["']?([A-Za-z0-9_.\-+]+)(?:\/[^\s(]+)?\s*\(/);
          if (m && m[1]) {
            dependencies.add(m[1]);
          }
        }
        scannedFiles.push(path.relative(projectDir, podPath));
      } catch {
        // Ignore read error
      }
    }
  }

  // 3. pubspec.lock (Flutter / Dart)
  const pubspecLockPath = path.join(projectDir, "pubspec.lock");
  if (fs.existsSync(pubspecLockPath)) {
    try {
      const content = fs.readFileSync(pubspecLockPath, "utf8");
      const lines = content.split(/\r?\n/);
      let inPackages = false;
      for (const line of lines) {
        if (/^packages:\s*$/.test(line)) {
          inPackages = true;
          continue;
        }
        if (inPackages) {
          if (/^\S/.test(line)) {
            inPackages = false;
            continue;
          }
          const m = line.match(/^\s{2}([a-zA-Z0-9_]+):\s*$/);
          if (m && m[1]) {
            dependencies.add(m[1]);
          }
        }
      }
      scannedFiles.push("pubspec.lock");
    } catch {
      // Ignore read error
    }
  }

  // 4. build.gradle & build.gradle.kts (Android Native / Gradle)
  const gradleCandidates = [
    path.join(projectDir, "build.gradle"),
    path.join(projectDir, "build.gradle.kts"),
    path.join(projectDir, "app", "build.gradle"),
    path.join(projectDir, "app", "build.gradle.kts"),
    path.join(projectDir, "android", "app", "build.gradle"),
    path.join(projectDir, "android", "app", "build.gradle.kts"),
  ];
  for (const gradlePath of gradleCandidates) {
    if (fs.existsSync(gradlePath)) {
      try {
        const content = fs.readFileSync(gradlePath, "utf8");
        const regex =
          /\b(?:implementation|api|compileOnly|runtimeOnly)\s*\(?\s*["']([a-zA-Z0-9_.\-]+:[a-zA-Z0-9_.\-]+)(?::[^"']+)["']\s*\)?/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
          if (match[1]) {
            dependencies.add(match[1]);
          }
        }
        scannedFiles.push(path.relative(projectDir, gradlePath));
      } catch {
        // Ignore read error
      }
    }
  }

  return {
    appName: detectedAppName,
    dependencies: Array.from(dependencies),
    scannedFiles,
  };
}

async function runAudit(flags) {
  const projectDir = flags.dir ? path.resolve(flags.dir) : process.cwd();
  const apiUrl = (flags["api-url"] || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
  const { appName, dependencies, scannedFiles } =
    scanProjectDependencies(projectDir);

  const extraDeps = flags.deps
    ? flags.deps
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean)
    : [];
  const allDependencies = Array.from(new Set([...dependencies, ...extraDeps]));
  const finalAppName = flags.app || appName;
  const hasAiConsent = flags["ai-consent"] === "true";
  const privacyPolicyUrl = flags["policy-url"] || undefined;

  console.log(
    color("\n🛡️  AppShield Mobile Compliance Auditor v2.0", COLORS.bold, COLORS.cyan)
  );
  console.log(color("────────────────────────────────────────────────────────", COLORS.dim));
  console.log(`${color("App Name:", COLORS.bold)}       ${finalAppName}`);
  console.log(
    `${color("Scanned Files:", COLORS.bold)}  ${
      scannedFiles.length > 0 ? scannedFiles.join(", ") : "None (using --deps)"
    }`
  );
  console.log(
    `${color("Total Packages:", COLORS.bold)} ${allDependencies.length} extracted locally (zero source code uploaded)`
  );
  console.log(`${color("Server Endpoint:", COLORS.bold)} ${apiUrl}/v1/audit\n`);

  const payload = {
    app_name: finalAppName,
    dependencies: allDependencies,
    has_in_app_ai_consent_modal: hasAiConsent,
  };
  if (privacyPolicyUrl) {
    payload.privacy_policy_url = privacyPolicyUrl;
  }

  const response = await fetch(`${apiUrl}/v1/audit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error(
      color(`❌ Audit request failed (${response.status}):`, COLORS.red, COLORS.bold),
      JSON.stringify(data, null, 2)
    );
    process.exit(1);
  }

  const statusColor =
    data.audit_status === "HIGH_REJECTION_RISK"
      ? COLORS.red
      : data.audit_status === "WARNINGS_FOUND"
      ? COLORS.yellow
      : COLORS.green;

  console.log(
    `${color("Audit Status:", COLORS.bold)}   ${color(
      data.audit_status,
      COLORS.bold,
      statusColor
    )}`
  );
  console.log(
    `${color("Matched SDKs:", COLORS.bold)}   ${data.detected_sdks_count} compliance-tracked SDK(s)`
  );

  if (data.detected_sdks && data.detected_sdks.length > 0) {
    for (const sdk of data.detected_sdks) {
      const aiBadge = sdk.requires_ai_consent_modal
        ? color(" [Requires AI Consent Modal]", COLORS.magenta, COLORS.bold)
        : "";
      console.log(
        `  • ${color(sdk.package_name, COLORS.cyan)} (${sdk.ecosystem})${aiBadge}`
      );
    }
  }

  console.log("");
  if (data.rejection_risks && data.rejection_risks.length > 0) {
    console.log(
      color(
        `⚠️  Store Rejection Risks Detected (${data.rejection_risks_count}):`,
        COLORS.bold,
        COLORS.yellow
      )
    );
    for (const risk of data.rejection_risks) {
      const badge =
        risk.severity === "CRITICAL"
          ? color(`[${risk.severity}]`, COLORS.bold, COLORS.red)
          : color(`[${risk.severity}]`, COLORS.bold, COLORS.yellow);
      console.log(`\n  ${badge} ${color(risk.code, COLORS.bold)} (${risk.sdk})`);
      console.log(`  ${color("Issue:", COLORS.dim)} ${risk.message}`);
      console.log(`  ${color("Fix:", COLORS.green)}   ${risk.remediation}`);
    }
  } else {
    console.log(
      color("✅ No immediate store rejection risks detected!", COLORS.bold, COLORS.green)
    );
  }

  if (data.free_preview) {
    console.log(
      color("\n📄 Free Preview (PrivacyInfo.xcprivacy - first 6 lines):", COLORS.bold, COLORS.blue)
    );
    console.log(color(data.free_preview.ios_privacy_manifest_xml_preview, COLORS.dim));
    console.log(
      color("\n📊 Free Preview (Google Play Data Safety CSV - first 6 lines):", COLORS.bold, COLORS.blue)
    );
    console.log(color(data.free_preview.google_play_data_safety_csv_preview, COLORS.dim));
    console.log(
      `\n💡 ${color(data.free_preview.upgrade_message, COLORS.yellow)}`
    );
    console.log(
      `   Run: ${color("node cli/index.mjs generate --key=YOUR_KEY", COLORS.bold, COLORS.green)}\n`
    );
  }
}

async function runGenerate(flags) {
  const apiKey = flags.key || process.env.APPSHIELD_API_KEY;
  if (!apiKey) {
    console.error(
      color(
        "❌ Missing API key! Please pass --key=YOUR_KEY (e.g., node cli/index.mjs generate --key=TEST_PRO_KEY_2026)",
        COLORS.bold,
        COLORS.red
      )
    );
    process.exit(1);
  }

  const projectDir = flags.dir ? path.resolve(flags.dir) : process.cwd();
  const outDir = flags.out ? path.resolve(flags.out) : projectDir;
  const apiUrl = (flags["api-url"] || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
  const { appName, dependencies, scannedFiles } =
    scanProjectDependencies(projectDir);

  const extraDeps = flags.deps
    ? flags.deps
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean)
    : [];
  const allDependencies = Array.from(new Set([...dependencies, ...extraDeps]));
  const finalAppName = flags.app || appName;

  console.log(
    color(
      "\n🚀 AppShield Store Compliance Generator v2.0",
      COLORS.bold,
      COLORS.cyan
    )
  );
  console.log(color("────────────────────────────────────────────────────────", COLORS.dim));
  console.log(`${color("App Name:", COLORS.bold)}       ${finalAppName}`);
  console.log(
    `${color("Scanned Files:", COLORS.bold)}  ${
      scannedFiles.length > 0 ? scannedFiles.join(", ") : "None (using --deps)"
    }`
  );
  console.log(`${color("Server Endpoint:", COLORS.bold)} ${apiUrl}/v1/generate\n`);

  const response = await fetch(`${apiUrl}/v1/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({
      app_name: finalAppName,
      dependencies: allDependencies,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error(
      color(
        `❌ Generation failed (${response.status}):`,
        COLORS.bold,
        COLORS.red
      ),
      JSON.stringify(data, null, 2)
    );
    process.exit(1);
  }

  const xcprivacyPath = path.join(outDir, "PrivacyInfo.xcprivacy");
  const csvPath = path.join(outDir, "google-play-data-safety.csv");

  fs.writeFileSync(xcprivacyPath, data.ios_privacy_manifest_xml, "utf8");
  fs.writeFileSync(csvPath, data.google_play_data_safety_csv, "utf8");

  console.log(
    color("✅ Successfully generated store compliance files!", COLORS.bold, COLORS.green)
  );
  console.log(
    `  • ${color("Apple Privacy Manifest:", COLORS.bold)} ${xcprivacyPath}`
  );
  console.log(
    `  • ${color("Google Play Data Safety:", COLORS.bold)} ${csvPath}`
  );
  console.log(
    `  • ${color("Matched SDKs:", COLORS.bold)}           ${
      data.detected_sdks_count
    } (${(data.detected_sdks || []).join(", ")})`
  );
  console.log(
    `  • ${color("Credits Remaining:", COLORS.bold)}      ${color(
      String(data.credits_remaining),
      COLORS.bold,
      COLORS.yellow
    )} (Plan: ${data.plan})\n`
  );
}

function printHelp() {
  console.log(`
${color("AppShield MCP CLI (appshield-mcp v2.0.0)", COLORS.bold, COLORS.cyan)}

${color("Usage:", COLORS.bold)}
  node cli/index.mjs audit [--ai-consent=true|false] [--policy-url=URL] [--deps=pkg1,pkg2]
  node cli/index.mjs generate --key=YOUR_API_KEY [--out=DIR] [--deps=pkg1,pkg2]

${color("Automatically Scanned Lockfiles & Manifests:", COLORS.bold)}
  • package.json (React Native / Expo /Capacitor)
  • Podfile.lock & ios/Podfile.lock (iOS CocoaPods)
  • pubspec.lock (Flutter / pub.dev)
  • build.gradle & build.gradle.kts (Android Gradle)
`);
}

async function main() {
  const { command, flags } = parseCliArgs(process.argv);
  if (command === "audit") {
    await runAudit(flags);
  } else if (command === "generate") {
    await runGenerate(flags);
  } else {
    printHelp();
  }
}

main().catch((err) => {
  console.error(color(`❌ Fatal CLI Error: ${err.message}`, COLORS.bold, COLORS.red));
  process.exit(1);
});
