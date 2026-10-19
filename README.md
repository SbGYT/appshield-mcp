# 🛡️ AppShield MCP & CLI

**Deterministic Apple App Store (`PrivacyInfo.xcprivacy`) & Google Play Data Safety Compliance Engine**

[![npm version](https://img.shields.io/npm/v/appshield-mcp.svg?style=flat-square&color=0ea5e9)](https://www.npmjs.com/package/appshield-mcp)
[![Live API & Playground](https://img.shields.io/badge/Live_Server-Cloudflare_Workers-38bdf8?style=flat-square)](https://appshield-mcp.appshield-api.workers.dev)
[![MCP Protocol](https://img.shields.io/badge/MCP-2024--11--05-30d158?style=flat-square)](https://appshield-mcp.appshield-api.workers.dev/mcp)

**AppShield MCP** scans your mobile project dependencies (`package.json`, `pubspec.lock`, `Podfile.lock`, `build.gradle.kts`) against a deterministic database of **50+ mobile SDK compliance rules** to prevent **Apple App Store Guideline 5.1.2(i)** rejections and generate store-ready compliance manifests in **2 seconds**.

🔗 **Live Interactive Scanner & API:** [https://appshield-mcp.appshield-api.workers.dev](https://appshield-mcp.appshield-api.workers.dev)  
🔌 **Remote MCP Endpoint:** `https://appshield-mcp.appshield-api.workers.dev/mcp`

---

## 🚨 The Problem AppShield Solves

Shipping a React Native, Expo, Flutter, iOS, or Android app today requires navigating strict store privacy rules:

1. **Apple App Store Guideline 5.1.2(i) (Third-Party AI Data Sharing):** Apps using AI SDKs (`openai`, `@anthropic-ai/sdk`, `@google/generative-ai`, `langchain`, etc.) face immediate binary rejection unless they disclose third-party AI data sharing in their Privacy Policy and display an explicit in-app user consent modal before transmitting data.
2. **Apple `PrivacyInfo.xcprivacy` & Required Reason APIs (`ITMS-91053`):** Every SDK accessing `NSUserDefaults` (`CA92.1`), file timestamps (`C617.1`), system boot time (`35F9.1`), or disk space (`E174.1`) must be declared in a strictly formatted Apple Plist XML manifest.
3. **Google Play Console Data Safety CSV:** Manually answering 100+ questionnaire checkboxes across analytics, crash reporting, payments, and advertising SDKs is slow and error-prone.

---

## ⚡ Quick Start (Zero-Install CLI via `npx`)

Run a **100% free compliance & rejection risk audit** in your project directory:

```bash
npx appshield-mcp audit
```

### Generate Complete Store-Ready Compliance Files

Once you have an API key, generate the full, un-truncated `PrivacyInfo.xcprivacy`, `google-play-data-safety.csv`, and `APPLE_NUTRITION_LABELS.md` directly into your project root:

```bash
npx appshield-mcp generate --key=YOUR_API_KEY
```

---

## 🤖 Connect to AI Coding Agents (Model Context Protocol — MCP)

AppShield provides a native **Streamable HTTP JSON-RPC 2.0 MCP Server** so Claude Code, Cursor, Windsurf, and Antigravity can audit your project and generate compliance artifacts autonomously.

### Claude Code

```bash
claude mcp add --transport http appshield https://appshield-mcp.appshield-api.workers.dev/mcp
```

### Cursor / Windsurf / Antigravity (`mcp.json`)

```json
{
  "mcpServers": {
    "appshield": {
      "url": "https://appshield-mcp.appshield-api.workers.dev/mcp"
    }
  }
}
```

### Available MCP Tools

| Tool Name | Tier | Description |
| :--- | :---: | :--- |
| `inspect_sdk_footprint` | **Free** | Inspects a single SDK package (`openai`, `firebase_analytics`, `AppsFlyerFramework`, etc.) and returns its exact Apple privacy data types, Required Reason API codes, Google Play Data Safety declarations, and required privacy policy keywords. |
| `audit_mobile_project` | **Free** | Audits an array of project dependencies, checks Apple Guideline 5.1.2(i) AI consent compliance, optionally scrapes a live `privacy_policy_url` to verify SDK disclosures, and returns a 6-line preview of the XML/CSV manifests. |
| `generate_store_compliance_files` | **Paid (1 Credit)** | Generates the complete, store-ready `PrivacyInfo.xcprivacy` XML, `google-play-data-safety.csv`, and `APPLE_NUTRITION_LABELS.md` guide. |

---

## 🌐 REST API Endpoints

Base URL: `https://appshield-mcp.appshield-api.workers.dev`

- **`GET /`** — Interactive Web Scanner, MCP Setup Guide & API Key Claim Portal
- **`GET /health`** — Edge server telemetry & indexed SDK rule count
- **`POST /v1/audit`** — Free project compliance & privacy policy audit
- **`POST /v1/generate`** — Authenticated full manifest generator (`x-api-key` header)
- **`POST /v1/unlock-intent`** — Create a checkout session for Release Pass ($9) or Indie Pro ($19)
- **`POST /v1/claim-key`** — Retrieve an issued API key using your NOWPayments Payment ID or Email
- **`POST /webhooks/payment`** — Instant IPN webhook for automated SHA-256 API key provisioning
- **`GET /mcp` & `POST /mcp`** — Model Context Protocol (MCP) JSON-RPC 2.0 server

---

## 🛠️ Self-Hosting & Local Development

AppShield runs on **Cloudflare Workers** + **Cloudflare D1 (Serverless SQLite)** using **Hono** and **TypeScript**.

```bash
# 1. Install dependencies
npm install

# 2. Initialize & seed local D1 database with 50+ SDK compliance rules
npx wrangler d1 execute appshield-db --local --file=./schema.sql
npx wrangler d1 execute appshield-db --local --file=./seed-50.sql

# 3. Start local development server
npx wrangler dev

# 4. Deploy to Cloudflare Workers
npx wrangler deploy
```

---

## 📄 License

MIT License
