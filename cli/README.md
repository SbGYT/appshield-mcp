# 🛡️ AppShield MCP CLI (`appshield-mcp`)

**Never Get Rejected by Apple App Store or Google Play Again.**  
Deterministically scan your mobile project lockfiles (`package.json`, `Podfile.lock`, `pubspec.lock`, `build.gradle`) locally—with **zero source code uploaded**—to detect Apple Guideline 5.1.2(i) AI consent blockers and generate 100% valid `PrivacyInfo.xcprivacy` and `google-play-data-safety.csv` files.

---

## ⚡ Quick Start (2 Lines)

```bash
# 1. Run a free compliance & rejection risk audit in your mobile project folder:
npx appshield-mcp audit

# 2. Generate full Apple PrivacyInfo.xcprivacy & Google Play Data Safety CSV files:
npx appshield-mcp generate --key=YOUR_API_KEY
```

---

## 🤖 Direct MCP Server (Claude Code / Cursor / Antigravity)

Add AppShield directly to your AI coding agent via Streamable HTTP MCP:

```bash
claude mcp add --transport http appshield https://appshield-mcp.appshield-api.workers.dev/mcp
```

Or in `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "appshield": {
      "url": "https://appshield-mcp.appshield-api.workers.dev/mcp"
    }
  }
}
```

🌐 **Live Playground & API**: [https://appshield-mcp.appshield-api.workers.dev](https://appshield-mcp.appshield-api.workers.dev)
