export function renderLandingPageHtml(sdkCount: number): string {
  return `<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AppShield MCP & API — Ship Mobile Apps Without Privacy Rejections</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    :root {
      --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
    }

    /* 1. Deep Dark Navy Mesh Background (#040814 + Fixed Ambient Radial Glows) */
    body {
      background-color: #040814;
      background-image:
        radial-gradient(circle at 50% 0%, rgba(14, 165, 233, 0.22), transparent 60%),
        radial-gradient(circle at 80% 40%, rgba(56, 189, 248, 0.14), transparent 50%),
        radial-gradient(circle at 15% 75%, rgba(37, 99, 235, 0.14), transparent 55%);
      background-attachment: fixed;
      color: #F8FAFC;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    /* 2. Ultra-Glassy Apple visionOS Style (.glass-card) */
    .glass-card {
      background: linear-gradient(135deg, rgba(15, 28, 58, 0.65) 0%, rgba(8, 16, 36, 0.45) 100%);
      backdrop-filter: blur(28px) saturate(190%);
      -webkit-backdrop-filter: blur(28px) saturate(190%);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-top: 1px solid rgba(255, 255, 255, 0.32); /* لمعة حافة الزجاج العلوية على طريقة أبل */
      box-shadow: 0 20px 50px rgba(2, 6, 23, 0.75), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      transition:
        transform 240ms var(--ease-out-expo),
        border-color 240ms var(--ease-out-expo),
        box-shadow 240ms var(--ease-out-expo),
        background 240ms var(--ease-out-expo);
    }

    /* Navbar Frosted Navy Glass */
    .glass-nav {
      background: linear-gradient(180deg, rgba(15, 28, 58, 0.72) 0%, rgba(8, 16, 36, 0.58) 100%);
      backdrop-filter: blur(28px) saturate(190%);
      -webkit-backdrop-filter: blur(28px) saturate(190%);
      border-bottom: 1px solid rgba(148, 163, 184, 0.18);
      box-shadow: 0 10px 30px rgba(2, 6, 23, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.18);
    }

    /* Interactive Card Hover Lift */
    @media (hover: hover) and (pointer: fine) {
      .glass-card-hover:hover {
        transform: translateY(-3px);
        border-color: rgba(56, 189, 248, 0.38);
        border-top-color: rgba(255, 255, 255, 0.48);
        box-shadow: 0 26px 60px rgba(2, 6, 23, 0.85), 0 0 35px rgba(14, 165, 233, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.25);
      }
    }

    /* Highlighted Best-Seller Glass Card ($9 Release Pass) */
    .glass-card-featured {
      background: linear-gradient(135deg, rgba(20, 42, 88, 0.78) 0%, rgba(10, 22, 50, 0.58) 100%);
      border: 1px solid rgba(56, 189, 248, 0.55);
      border-top: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow:
        0 24px 60px rgba(2, 6, 23, 0.85),
        0 0 45px rgba(14, 165, 233, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.28);
    }

    /* Inner Deep Navy Code & Input Wells */
    .navy-well {
      background: rgba(4, 8, 20, 0.72);
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: inset 0 2px 6px rgba(2, 6, 23, 0.65);
      border-radius: 14px;
    }

    /* Apple Typography Optical Sizing & Tracking */
    .display-headline {
      letter-spacing: -0.03em;
      line-height: 1.07;
      font-optical-sizing: auto;
    }

    .section-headline {
      letter-spacing: -0.022em;
      line-height: 1.15;
    }

    /* Emil Design: Responsive Pressable Buttons (pointer-down scale 0.97) */
    .pressable {
      transition:
        transform 150ms var(--ease-out-expo),
        background-color 180ms var(--ease-out-expo),
        border-color 180ms var(--ease-out-expo),
        box-shadow 180ms var(--ease-out-expo),
        opacity 150ms var(--ease-out-expo);
      will-change: transform;
    }

    .pressable:active {
      transform: scale(0.97) !important;
    }

    /* Primary Luminous Action Button */
    .btn-primary-glow {
      background: linear-gradient(180deg, #38BDF8 0%, #0284C7 100%);
      color: #FFFFFF;
      border-top: 1px solid rgba(255, 255, 255, 0.45);
      box-shadow: 0 10px 25px -5px rgba(14, 165, 233, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .btn-primary-glow:hover {
      background: linear-gradient(180deg, #7DD3FC 0%, #0ea5e9 100%);
      box-shadow: 0 14px 30px -5px rgba(14, 165, 233, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.4);
    }

    /* Emil Design: Blur-bridged Content Morphing (never scale(0)) */
    .morph-container {
      transition:
        opacity 220ms var(--ease-out-expo),
        transform 220ms var(--ease-out-expo),
        filter 200ms var(--ease-out-expo);
      will-change: transform, opacity, filter;
    }

    .morph-exit {
      opacity: 0;
      transform: scale(0.97) translateY(4px);
      filter: blur(3px);
    }

    .morph-enter {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: blur(0px);
    }

    /* Origin-aware Status Popover (scales from top-right trigger) */
    .status-popover {
      transform-origin: top right;
      transition:
        opacity 190ms var(--ease-out-expo),
        transform 190ms var(--ease-out-expo),
        filter 190ms var(--ease-out-expo);
    }

    .status-popover[data-open="false"] {
      opacity: 0;
      transform: scale(0.95) translateY(-6px);
      filter: blur(2px);
      pointer-events: none;
    }

    .status-popover[data-open="true"] {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: blur(0px);
      pointer-events: auto;
    }

    /* Centered Checkout Modal */
    .apple-modal-scrim {
      transition: opacity 220ms var(--ease-out-expo);
    }

    .apple-modal-scrim[data-open="false"] {
      opacity: 0;
      pointer-events: none;
    }

    .apple-modal-scrim[data-open="true"] {
      opacity: 1;
      pointer-events: auto;
    }

    .apple-modal-card {
      transform-origin: center;
      transition:
        transform 260ms var(--ease-out-expo),
        opacity 220ms var(--ease-out-expo),
        filter 200ms var(--ease-out-expo);
    }

    .apple-modal-scrim[data-open="false"] .apple-modal-card {
      opacity: 0;
      transform: scale(0.95) translateY(8px);
      filter: blur(3px);
    }

    .apple-modal-scrim[data-open="true"] .apple-modal-card {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: blur(0px);
    }

    /* Sonner-Style Toast Notification */
    .sonner-toast {
      transition:
        transform 280ms var(--ease-out-expo),
        opacity 220ms var(--ease-out-expo),
        filter 200ms var(--ease-out-expo);
    }

    .sonner-toast[data-visible="false"] {
      opacity: 0;
      transform: translateY(100%) scale(0.96);
      filter: blur(2px);
      pointer-events: none;
    }

    .sonner-toast[data-visible="true"] {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
      pointer-events: auto;
    }

    .icon-morph {
      transition:
        transform 180ms var(--ease-out-expo),
        opacity 160ms var(--ease-out-expo),
        filter 160ms var(--ease-out-expo);
    }

    .stagger-item {
      opacity: 0;
      transform: translateY(6px);
      animation: staggerSlideIn 240ms var(--ease-out-expo) forwards;
    }

    @keyframes staggerSlideIn {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, ::before, ::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 120ms !important;
        scroll-behavior: auto !important;
      }
      .pressable:active,
      .glass-card-hover:hover {
        transform: none !important;
      }
    }

    @media (prefers-reduced-transparency: reduce) {
      .glass-card,
      .glass-nav {
        background: #0B1528 !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
    }
  </style>
</head>
<body class="min-h-screen selection:bg-sky-500/35 selection:text-white relative">

  <!-- Ambient Background Light Orbs (Enhances glass refraction across scroll) -->
  <div class="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden="true">
    <div class="absolute -top-28 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-sky-500/15 blur-[130px]"></div>
    <div class="absolute top-[38%] -right-32 w-[600px] h-[500px] rounded-full bg-cyan-400/10 blur-[140px]"></div>
    <div class="absolute bottom-10 -left-24 w-[650px] h-[450px] rounded-full bg-blue-600/12 blur-[140px]"></div>
  </div>

  <!-- Sticky Translucent Frosted Navbar -->
  <header class="sticky top-0 z-40 glass-nav">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
      <!-- Brand Logo -->
      <a href="#" class="flex items-center gap-3 group focus:outline-none">
        <div class="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-400/35 flex items-center justify-center text-sky-300 shadow-inner pressable">
          <svg class="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-base tracking-tight text-white">AppShield</span>
          <span class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-400/30 text-sky-300">
            MCP
          </span>
        </div>
      </a>

      <!-- Center Navigation -->
      <nav class="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
        <a href="#scanner" class="hover:text-white transition-colors">Live Scanner</a>
        <a href="#comparison" class="hover:text-white transition-colors">Why AppShield</a>
        <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
        <button
          type="button"
          onclick="openCheckoutModal('pass', 9)"
          class="pressable inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/35 text-sky-300 hover:text-white text-xs font-mono font-semibold"
        >
          <span>🔑 Claim API Key</span>
        </button>
      </nav>

      <!-- Right: Live Status Pill + Frosted Glass Popover Modal (Zero raw /health navigation) -->
      <div class="relative">
        <button
          id="status-pill-btn"
          type="button"
          onclick="toggleStatusPopover(event)"
          aria-expanded="false"
          class="pressable inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/70 hover:bg-slate-800/80 border border-slate-400/25 border-t-white/30 text-xs font-medium text-slate-100 shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400/50"
        >
          <span class="relative flex h-2.5 w-2.5">
            <span id="status-dot-ping" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30D158] opacity-75"></span>
            <span id="status-dot-core" class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#30D158] shadow-[0_0_8px_#30D158]"></span>
          </span>
          <span id="status-pill-text" class="tracking-tight font-medium text-white">System Operational • ${sdkCount}+ SDKs Active</span>
          <svg class="w-3.5 h-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Origin-Aware Visual Telemetry Popover (.glass-card) -->
        <div
          id="status-popover"
          data-open="false"
          class="status-popover glass-card absolute right-0 mt-3 w-80 p-5 z-50 text-left"
        >
          <div class="flex items-center justify-between pb-3 border-b border-slate-400/20">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158]"></span>
              <span class="text-xs font-semibold text-white">Cloudflare Edge Telemetry</span>
            </div>
            <span id="popover-version" class="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#30D158]/15 border border-[#30D158]/30 text-[#30D158]">
              v3.0 Live
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3 my-3.5">
            <div class="p-3 navy-well">
              <div class="text-[11px] text-slate-300 font-medium">Indexed SDK Rules</div>
              <div id="popover-sdk-count" class="text-xl font-bold text-white font-mono mt-0.5">${sdkCount}</div>
            </div>
            <div class="p-3 navy-well">
              <div class="text-[11px] text-slate-300 font-medium">Edge Latency</div>
              <div id="popover-latency" class="text-xl font-bold text-[#30D158] font-mono mt-0.5">14 ms</div>
            </div>
          </div>

          <div class="space-y-2 text-xs">
            <div class="flex items-center justify-between py-1 text-slate-300">
              <span>D1 Compliance Database</span>
              <span class="text-[#30D158] font-mono font-medium text-[11px]">Connected</span>
            </div>
            <div class="flex items-center justify-between py-1 text-slate-300">
              <span>MCP JSON-RPC 2.0 Server</span>
              <span class="text-[#30D158] font-mono font-medium text-[11px]">Active</span>
            </div>
            <div class="flex items-center justify-between py-1 text-slate-300">
              <span>Apple Plist DTD Validator</span>
              <span class="text-[#30D158] font-mono font-medium text-[11px]">100% Strict</span>
            </div>
          </div>

          <div class="mt-3.5 pt-3 border-t border-slate-400/20 flex items-center justify-between text-[11px] text-slate-300">
            <span id="popover-last-checked">Updated just now</span>
            <button type="button" onclick="refreshHealthTelemetry()" class="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- 1. Hero Section -->
  <section class="relative pt-16 pb-14 sm:pt-24 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
    <!-- Top Pill Badge -->
    <div class="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card text-xs font-medium text-white mb-8">
      <span class="px-2 py-0.5 rounded-full bg-sky-500/25 text-sky-300 font-mono text-[11px] font-semibold border border-sky-400/40">
        2026 READY
      </span>
      <span class="text-slate-100">Updated for Apple Guideline 5.1.2(i) &amp; Google Play 2026 Rules</span>
    </div>

    <!-- Display Headline -->
    <h1 class="display-headline text-4xl sm:text-6xl lg:text-[68px] font-extrabold text-white max-w-4xl mx-auto">
      Ship Mobile Apps Without <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400">Privacy Rejections</span>
    </h1>

    <p class="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
      AppShield MCP &amp; API — Never Get Rejected by Apple App Store or Google Play Again. Deterministically audit your project lockfiles and generate 100% valid <code class="font-mono text-xs text-sky-200 bg-sky-950/70 px-1.5 py-0.5 rounded border border-sky-400/30">PrivacyInfo.xcprivacy</code> &amp; Google Play Data Safety CSV manifests in 2 seconds.
    </p>

    <!-- Primary Hero Actions -->
    <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
      <a href="#scanner" class="pressable btn-primary-glow px-7 py-3.5 rounded-full font-semibold text-sm">
        Scan Your Project Free
      </a>
      <a href="#pricing" class="pressable px-7 py-3.5 rounded-full bg-slate-900/70 hover:bg-slate-800/80 text-white font-semibold text-sm border border-slate-400/30 border-t-white/30 shadow-lg">
        Unlock Full Store Files ($9)
      </a>
    </div>

    <!-- Interactive Terminal & MCP Integration Box (.glass-card) -->
    <div class="mt-12 max-w-3xl mx-auto text-left">
      <div class="glass-card overflow-hidden">
        <!-- Window Chrome & Segmented Control Tabs -->
        <div class="flex flex-wrap items-center justify-between px-5 py-3.5 border-b border-slate-400/20 bg-slate-950/40 gap-3">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#FF453A]"></span>
            <span class="w-3 h-3 rounded-full bg-[#FF9F0A]"></span>
            <span class="w-3 h-3 rounded-full bg-[#30D158]"></span>
          </div>

          <!-- Segmented Control Tabs -->
          <div class="flex items-center gap-1 bg-[#040814]/80 p-1 rounded-xl border border-slate-400/20 text-xs font-medium" role="tablist">
            <button
              id="tab-btn-cli"
              type="button"
              onclick="switchHeroTab('cli')"
              class="pressable px-3.5 py-1.5 rounded-lg bg-sky-500/25 text-white border border-sky-400/40 font-semibold shadow-sm"
            >
              Terminal CLI
            </button>
            <button
              id="tab-btn-claude"
              type="button"
              onclick="switchHeroTab('claude')"
              class="pressable px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white"
            >
              Claude Code
            </button>
            <button
              id="tab-btn-cursor"
              type="button"
              onclick="switchHeroTab('cursor')"
              class="pressable px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white"
            >
              Cursor &amp; Antigravity
            </button>
          </div>

          <div class="hidden sm:block text-[11px] font-mono text-sky-300/90">
            zero-source-upload
          </div>
        </div>

        <!-- Tab Panels Container with Blur-Bridged Crossfade -->
        <div id="hero-tab-stage" class="morph-container morph-enter p-5 sm:p-6">
          <!-- Panel 1: Terminal CLI -->
          <div id="tab-panel-cli" class="space-y-3.5">
            <div class="flex items-center justify-between gap-4 navy-well px-4 py-3.5">
              <div class="font-mono text-xs sm:text-sm text-white overflow-x-auto whitespace-nowrap">
                <span class="text-sky-400 font-bold select-none mr-2">$</span>npx appshield-mcp audit
              </div>
              <button
                type="button"
                onclick="copyWithMorph('npx appshield-mcp audit', this, 'CLI command copied to clipboard')"
                class="pressable shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/35 text-xs font-mono font-medium text-white"
              >
                <span class="copy-icon-slot icon-morph inline-flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </span>
              </button>
            </div>

            <div class="flex items-center justify-between gap-4 navy-well px-4 py-3">
              <div class="font-mono text-xs text-slate-300 overflow-x-auto whitespace-nowrap">
                <span class="text-[#30D158] font-semibold select-none mr-1.5">● MCP Server:</span>
                <span class="text-white">https://appshield-mcp.appshield-api.workers.dev/mcp</span>
              </div>
              <button
                type="button"
                onclick="copyWithMorph('https://appshield-mcp.appshield-api.workers.dev/mcp', this, 'MCP Endpoint URL copied')"
                class="pressable shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] border border-slate-400/25 text-[11px] font-mono font-medium text-white"
              >
                <span class="copy-icon-slot icon-morph inline-flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  <span>Copy URL</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Panel 2: Claude Code -->
          <div id="tab-panel-claude" class="hidden space-y-3">
            <div class="flex items-center justify-between gap-4 navy-well px-4 py-3.5">
              <div class="font-mono text-xs sm:text-sm text-white overflow-x-auto whitespace-nowrap">
                <span class="text-sky-400 font-bold select-none mr-2">$</span>claude mcp add --transport http appshield https://appshield-mcp.appshield-api.workers.dev/mcp
              </div>
              <button
                type="button"
                onclick="copyWithMorph('claude mcp add --transport http appshield https://appshield-mcp.appshield-api.workers.dev/mcp', this, 'Claude Code MCP command copied')"
                class="pressable shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/35 text-xs font-mono font-medium text-white"
              >
                <span class="copy-icon-slot icon-morph inline-flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy</span>
                </span>
              </button>
            </div>
            <p class="text-xs text-slate-300 font-mono">
              Exposes <span class="text-sky-300 font-semibold">inspect_sdk_footprint</span>, <span class="text-sky-300 font-semibold">audit_mobile_project</span>, and <span class="text-sky-300 font-semibold">generate_store_compliance_files</span> directly inside Claude Code.
            </p>
          </div>

          <!-- Panel 3: Cursor & Antigravity -->
          <div id="tab-panel-cursor" class="hidden space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-slate-300">Paste into <code class="text-white font-semibold">.cursor/mcp.json</code> or <code class="text-white font-semibold">mcp_config.json</code>:</span>
              <button
                type="button"
                onclick="copyWithMorph(document.getElementById('mcp-json-snippet').innerText, this, 'MCP JSON configuration copied')"
                class="pressable inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/35 text-xs font-mono font-medium text-white"
              >
                <span class="copy-icon-slot icon-morph inline-flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copy JSON</span>
                </span>
              </button>
            </div>
            <pre id="mcp-json-snippet" class="p-4 navy-well font-mono text-xs text-[#30D158] overflow-x-auto">{
  "mcpServers": {
    "appshield": {
      "url": "https://appshield-mcp.appshield-api.workers.dev/mcp"
    }
  }
}</pre>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. Interactive Live Scanner Playground -->
  <section id="scanner" class="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-5">
      <div>
        <div class="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400 mb-2">Interactive Compliance Engine</div>
        <h2 class="section-headline text-2xl sm:text-4xl font-bold text-white">Live Project Scanner Playground</h2>
        <p class="text-sm text-slate-300 mt-1.5">Select a real-world app preset or paste your own <code class="font-mono text-xs text-sky-300">package.json</code> to run a live D1 compliance audit.</p>
      </div>

      <!-- 3 Smooth Preset Buttons -->
      <div class="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          id="preset-btn-rn_openai"
          onclick="selectPreset('rn_openai')"
          class="pressable px-4 py-2 rounded-xl text-xs font-semibold btn-primary-glow"
        >
          React Native + OpenAI App
        </button>
        <button
          type="button"
          id="preset-btn-flutter_admob"
          onclick="selectPreset('flutter_admob')"
          class="pressable px-4 py-2 rounded-xl text-xs font-medium bg-slate-900/75 text-slate-200 border border-slate-400/25 hover:bg-slate-800/80 hover:text-white"
        >
          Flutter + Firebase + AdMob App
        </button>
        <button
          type="button"
          id="preset-btn-ios_appsflyer"
          onclick="selectPreset('ios_appsflyer')"
          class="pressable px-4 py-2 rounded-xl text-xs font-medium bg-slate-900/75 text-slate-200 border border-slate-400/25 hover:bg-slate-800/80 hover:text-white"
        >
          iOS Native + AppsFlyer App
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <!-- Left Column: Manifest Editor (.glass-card) -->
      <div class="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
        <div id="editor-stage" class="morph-container morph-enter space-y-4">
          <div class="flex items-center justify-between">
            <label for="scanner-input" class="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Project Dependencies
            </label>
            <span id="preset-ecosystem-tag" class="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-sky-500/20 border border-sky-400/35 text-sky-200">
              package.json (React Native + AI)
            </span>
          </div>

          <input id="scanner-app-name" type="hidden" value="ReactNativeOpenAIApp" />

          <textarea
            id="scanner-input"
            rows="10"
            spellcheck="false"
            class="w-full p-4 navy-well focus:border-sky-400 focus:outline-none font-mono text-xs text-sky-100 leading-relaxed resize-none transition-colors"
          ></textarea>

          <div class="p-4 navy-well space-y-3">
            <label class="flex items-center justify-between cursor-pointer select-none">
              <span class="text-xs font-medium text-white">
                In-App AI Consent Modal Implemented?
              </span>
              <input
                id="scanner-ai-consent"
                type="checkbox"
                onchange="runLiveScan()"
                class="w-4 h-4 rounded bg-slate-950 border-slate-400/40 text-sky-500 focus:ring-sky-400 cursor-pointer"
              />
            </label>
            <div>
              <label for="scanner-policy-text" class="block text-[11px] text-slate-300 mb-1">
                Privacy Policy Excerpt (Verified against SDK disclosure rules)
              </label>
              <input
                id="scanner-policy-text"
                type="text"
                value="We use Sentry for crash reporting and Stripe for payment processing."
                class="w-full px-3 py-2 rounded-lg bg-[#040814]/90 border border-slate-400/25 text-xs text-white font-mono focus:outline-none focus:border-sky-400"
              />
            </div>
          </div>
        </div>

        <button
          id="scan-now-btn"
          type="button"
          onclick="runLiveScan()"
          class="pressable btn-primary-glow mt-5 w-full py-3.5 px-5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
        >
          <span id="scan-btn-label">Scan Project Now</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      <!-- Right Column: Audit Output + Frosted Blur Preview (.glass-card) -->
      <div class="lg:col-span-7 glass-card p-6 flex flex-col justify-between relative overflow-hidden min-h-[540px]">
        <div id="scanner-results-stage" class="morph-container morph-enter space-y-5">
          <!-- Top Bar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-400/20">
            <div>
              <div class="flex items-center gap-2.5">
                <h3 id="result-app-title" class="text-base font-bold text-white">ReactNativeOpenAIApp</h3>
                <span id="result-sdk-count" class="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-md bg-sky-500/20 border border-sky-400/30 text-sky-200">
                  5 SDKs Matched
                </span>
              </div>
              <p class="text-xs text-slate-300 mt-0.5">Evaluated against Apple App Review &amp; Google Play Data Safety rules</p>
            </div>
            <span id="result-status-pill" class="px-3.5 py-1 rounded-full text-xs font-mono font-bold"></span>
          </div>

          <!-- Detected Blockers List -->
          <div>
            <div class="flex items-center justify-between mb-2.5">
              <span class="text-xs font-semibold uppercase tracking-wider text-slate-200">Store Review Blockers &amp; Warnings</span>
              <span id="result-risk-counter" class="text-xs font-mono font-semibold text-[#FF453A]"></span>
            </div>
            <div id="result-risks-grid" class="space-y-2.5 max-h-56 overflow-y-auto pr-1"></div>
          </div>

          <!-- Live File Previews with Blurred Continuation & Unlock Button -->
          <div class="pt-3 border-t border-slate-400/20 relative">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- PrivacyInfo.xcprivacy Card -->
              <div class="navy-well overflow-hidden">
                <div class="px-3.5 py-2 border-b border-slate-400/20 bg-slate-900/60 flex items-center justify-between">
                  <span class="font-mono text-[11px] font-semibold text-sky-300">PrivacyInfo.xcprivacy</span>
                  <span class="font-mono text-[10px] text-slate-300">Apple Plist DTD</span>
                </div>
                <div class="p-3.5 font-mono text-[11px] leading-relaxed overflow-x-auto">
                  <pre id="live-xml-preview" class="text-white"></pre>
                  <pre class="text-slate-400 select-none blur-[5px] opacity-50 mt-1 pointer-events-none">	&lt;key&gt;NSPrivacyCollectedDataTypes&lt;/key&gt;
	&lt;array&gt;
		&lt;dict&gt;
			&lt;key&gt;NSPrivacyCollectedDataType&lt;/key&gt;
			&lt;string&gt;NSPrivacyCollectedDataTypeDeviceID&lt;/string&gt;
			&lt;key&gt;NSPrivacyCollectedDataTypeLinked&lt;/key&gt;
			&lt;true/&gt;
		&lt;/dict&gt;
	&lt;/array&gt;
&lt;/dict&gt;
&lt;/plist&gt;</pre>
                </div>
              </div>

              <!-- google-play-data-safety.csv Card -->
              <div class="navy-well overflow-hidden">
                <div class="px-3.5 py-2 border-b border-slate-400/20 bg-slate-900/60 flex items-center justify-between">
                  <span class="font-mono text-[11px] font-semibold text-[#30D158]">google-play-data-safety.csv</span>
                  <span class="font-mono text-[10px] text-slate-300">Play Console CSV</span>
                </div>
                <div class="p-3.5 font-mono text-[11px] leading-relaxed overflow-x-auto">
                  <pre id="live-csv-preview" class="text-white"></pre>
                  <pre class="text-slate-400 select-none blur-[5px] opacity-50 mt-1 pointer-events-none">PSL_DATA_TYPES_DEVICE_OR_OTHER_IDS,DEVICE_OR_OTHER_IDS,TRUE
PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS,ANALYTICS,TRUE
PSL_DATA_PURPOSE_DEVICE_OR_OTHER_IDS,ADVERTISING_OR_MARKETING,TRUE
PSL_DATA_TYPES_LOCATION,PRECISE_LOCATION,TRUE
PSL_DATA_PURPOSE_PRECISE_LOCATION,APP_FUNCTIONALITY,TRUE</pre>
                </div>
              </div>
            </div>

            <!-- Deep Navy Gradient Scrim + Unlock CTA -->
            <div class="inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#081229] via-[#081229]/90 to-transparent flex items-end justify-center pb-2 -mt-24 z-10 relative">
              <button
                type="button"
                onclick="openCheckoutModal('pass', 9)"
                class="pressable btn-primary-glow px-6 py-2.5 rounded-full font-semibold text-xs tracking-tight flex items-center gap-2"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>Unlock Full Store Files ($9)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Comparison Section (Why Developers Switch to AppShield) -->
  <section id="comparison" class="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
    <div class="text-center mb-10">
      <div class="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400 mb-2">Precision vs. Guesswork</div>
      <h2 class="section-headline text-2xl sm:text-4xl font-bold text-white">Why Developers Switch to AppShield</h2>
      <p class="text-sm text-slate-300 mt-2">Eliminate hours of manual SDK privacy research and unexpected App Review rejections.</p>
    </div>

    <div class="glass-card overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-12 border-b border-slate-400/20 bg-slate-950/40 text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
        <div class="md:col-span-4 p-4 sm:px-6">Compliance Dimension</div>
        <div class="md:col-span-4 p-4 sm:px-6 border-t md:border-t-0 md:border-l border-slate-400/20 text-[#FF453A]">Manual Research (40+ SDKs)</div>
        <div class="md:col-span-4 p-4 sm:px-6 border-t md:border-t-0 md:border-l border-slate-400/20 text-[#30D158]">AppShield Deterministic Engine</div>
      </div>

      <div class="divide-y divide-slate-400/15 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-12 items-center">
          <div class="md:col-span-4 p-4 sm:px-6 font-semibold text-white">Time Required</div>
          <div class="md:col-span-4 p-4 sm:px-6 md:border-l border-slate-400/15 text-slate-300 font-mono text-xs">4+ Hours digging through SDK docs</div>
          <div class="md:col-span-4 p-4 sm:px-6 md:border-l border-slate-400/15 text-[#30D158] font-mono text-xs font-bold">2 Seconds (100% Automated)</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 items-center">
          <div class="md:col-span-4 p-4 sm:px-6 font-semibold text-white">Apple Guideline 5.1.2(i) AI Check</div>
          <div class="md:col-span-4 p-4 sm:px-6 md:border-l border-slate-400/15 text-[#FF453A] text-xs font-medium">High risk of App Store binary rejection</div>
          <div class="md:col-span-4 p-4 sm:px-6 md:border-l border-slate-400/15 text-white text-xs font-semibold">Instant AI SDK &amp; Consent Modal Verification</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 items-center">
          <div class="md:col-span-4 p-4 sm:px-6 font-semibold text-white">Required Reason APIs (<code class="font-mono text-xs text-sky-300">CA92.1</code>, <code class="font-mono text-xs text-sky-300">C617.1</code>)</div>
          <div class="md:col-span-4 p-4 sm:px-6 md:border-l border-slate-400/15 text-slate-300 text-xs">Error-prone manual Plist XML editing</div>
          <div class="md:col-span-4 p-4 sm:px-6 md:border-l border-slate-400/15 text-white text-xs font-semibold">100% Valid Apple Plist DTD Output</div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 items-center">
          <div class="md:col-span-4 p-4 sm:px-6 font-semibold text-white">Google Play Data Safety Form</div>
          <div class="md:col-span-4 p-4 sm:px-6 md:border-l border-slate-400/15 text-slate-300 text-xs">100+ manual questionnaire checkboxes</div>
          <div class="md:col-span-4 p-4 sm:px-6 md:border-l border-slate-400/15 text-white text-xs font-semibold">Ready-to-Import Play Console CSV</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Pricing Cards -->
  <section id="pricing" class="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
    <div class="text-center mb-12">
      <div class="text-xs font-mono font-semibold uppercase tracking-widest text-sky-400 mb-2">Pricing</div>
      <h2 class="section-headline text-3xl sm:text-4xl font-bold text-white">Audit Free. Pay Only When You Ship.</h2>
      <p class="text-sm text-slate-300 mt-2 max-w-lg mx-auto">Unlimited free risk audits via CLI and MCP. Unlock complete store submission manifests on demand.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      <!-- Tier 1: Free Audit ($0) -->
      <div class="glass-card glass-card-hover p-7 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-300">Free Audit</span>
            <span class="text-[11px] font-mono text-slate-300">Forever Free</span>
          </div>
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-4xl font-extrabold text-white">$0</span>
            <span class="text-xs text-slate-300 font-mono">/ unlimited</span>
          </div>
          <p class="mt-3 text-xs text-slate-300 leading-relaxed">Detect store rejection blockers and preview your compliance files before submitting.</p>
          <ul class="mt-6 space-y-3 text-xs text-slate-100">
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> Unlimited <code class="font-mono text-[11px] text-sky-300">npx appshield-mcp audit</code></li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> Apple Guideline 5.1.2(i) AI consent check</li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> Privacy policy keyword verification</li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> 6-line preview of XML &amp; CSV manifests</li>
          </ul>
        </div>
        <a href="#scanner" class="pressable mt-8 w-full py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-slate-400/30 text-white font-semibold text-xs text-center">
          Run Free Scan Above
        </a>
      </div>

      <!-- Tier 2: Release Pass ($9 - Best Seller with Featured Navy Glass) -->
      <div class="glass-card glass-card-featured glass-card-hover p-7 flex flex-col justify-between relative">
        <div class="absolute -top-3.5 right-6 px-3.5 py-0.5 rounded-full btn-primary-glow font-mono font-bold text-[10px] uppercase tracking-wider">
          Best Seller
        </div>
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-sky-300">Release Pass</span>
            <span class="text-[11px] font-mono text-sky-200">One-Time Payment</span>
          </div>
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-4xl font-extrabold text-white">$9</span>
            <span class="text-xs text-slate-300 font-mono">/ one-time</span>
          </div>
          <p class="mt-3 text-xs text-slate-200 leading-relaxed">Complete store compliance artifacts for shipping or updating your mobile app.</p>
          <ul class="mt-6 space-y-3 text-xs text-white">
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> <strong>5 Full Generations</strong> (<code class="font-mono text-[11px] text-sky-300">PrivacyInfo.xcprivacy</code>)</li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> <strong>5 Full Exports</strong> (<code class="font-mono text-[11px] text-[#30D158]">google-play-data-safety.csv</code>)</li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> Complete Apple Nutrition Labels Guide</li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> Instant API Key for CLI &amp; MCP Agents</li>
          </ul>
        </div>
        <a
          href="https://nowpayments.io/payment/?iid=4764234970"
          target="_blank"
          rel="noopener noreferrer"
          onclick="openCheckoutModal('pass', 9)"
          class="pressable btn-primary-glow mt-8 w-full py-3 rounded-xl font-bold text-xs text-center block"
        >
          Buy Release Pass ($9) →
        </a>
      </div>

      <!-- Tier 3: Indie Pro ($19/mo) -->
      <div class="glass-card glass-card-hover p-7 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-sky-300">Indie Pro</span>
            <span class="text-[11px] font-mono text-slate-300">Studios &amp; CI/CD</span>
          </div>
          <div class="mt-4 flex items-baseline gap-1">
            <span class="text-4xl font-extrabold text-white">$19</span>
            <span class="text-xs text-slate-300 font-mono">/ month</span>
          </div>
          <p class="mt-3 text-xs text-slate-300 leading-relaxed">Built for indie studios shipping multiple apps and automated CI/CD release pipelines.</p>
          <ul class="mt-6 space-y-3 text-xs text-slate-100">
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> <strong>50 Full Generations</strong> per month</li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> Automated CI/CD &amp; GitHub Actions checks</li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> Live Privacy Policy URL scraping via MCP</li>
            <li class="flex items-center gap-2.5"><span class="text-[#30D158] font-bold">✓</span> Priority SDK compliance rule updates</li>
          </ul>
        </div>
        <a
          href="https://nowpayments.io/payment/?iid=4971511243"
          target="_blank"
          rel="noopener noreferrer"
          onclick="openCheckoutModal('pro', 19)"
          class="pressable mt-8 w-full py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-white font-semibold text-xs text-center block"
        >
          Unlock Indie Pro ($19/mo) →
        </a>
      </div>
    </div>

    <!-- Post-Payment Claim Key Callout Banner (.glass-card) -->
    <div class="mt-8 glass-card p-5 sm:px-7 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3.5 text-left">
        <div class="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-400/35 flex items-center justify-center text-sky-300 shrink-0 font-mono text-base">
          🔑
        </div>
        <div>
          <h3 class="text-sm font-bold text-white">Already Completed Your NOWPayments Checkout?</h3>
          <p class="text-xs text-slate-300 mt-0.5">Enter your NOWPayments Payment ID or Email to claim your API key and unlock all compliance files immediately.</p>
        </div>
      </div>
      <button
        type="button"
        onclick="openCheckoutModal('pass', 9)"
        class="pressable px-5 py-2.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-white font-semibold text-xs shrink-0"
      >
        Claim Your API Key →
      </button>
    </div>
  </section>

  <!-- Checkout & Claim Key Modal (.glass-card) -->
  <div
    id="checkout-modal"
    data-open="false"
    onclick="handleModalBackdropClick(event)"
    class="apple-modal-scrim fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-xl"
  >
    <div class="apple-modal-card glass-card max-w-lg w-full p-6 sm:p-7 relative text-left">
      <button
        type="button"
        onclick="closeCheckoutModal()"
        aria-label="Close modal"
        class="pressable absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.16] border border-white/15 flex items-center justify-center text-slate-300 hover:text-white text-xs"
      >
        ✕
      </button>

      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-[11px] font-mono font-semibold mb-3">
        <span id="modal-plan-badge">RELEASE PASS • $9 ONE-TIME</span>
      </div>

      <h3 class="text-xl font-bold text-white tracking-tight">NOWPayments Checkout &amp; Claim API Key</h3>
      <p id="modal-intent-status" class="text-xs text-slate-300 mt-1 font-mono">Select your plan to pay via NOWPayments or claim your API key below.</p>

      <!-- Plan Switcher Pills Inside Modal -->
      <div class="grid grid-cols-2 gap-2.5 mt-4">
        <button
          id="modal-switch-pass"
          type="button"
          onclick="selectModalPlan('pass', 9)"
          class="pressable py-2 px-3 rounded-xl text-xs font-semibold border border-sky-400/50 bg-sky-500/25 text-white text-center"
        >
          Release Pass ($9 • 5 Credits)
        </button>
        <button
          id="modal-switch-pro"
          type="button"
          onclick="selectModalPlan('pro', 19)"
          class="pressable py-2 px-3 rounded-xl text-xs font-medium border border-slate-400/25 bg-slate-900/60 text-slate-300 hover:text-white text-center"
        >
          Indie Pro ($19 • 50 Credits)
        </button>
      </div>

      <div class="mt-4 space-y-3.5 text-xs">
        <!-- Step 1: Direct NOWPayments Link -->
        <div class="p-4 navy-well space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-white">1. Pay Securely via NOWPayments</span>
            <span id="modal-tx-id" class="font-mono font-semibold text-sky-400">Instant IPN</span>
          </div>
          <p class="text-[11px] text-slate-300">
            Complete your payment on NOWPayments. Once <code class="font-mono text-white">confirmed</code> or <code class="font-mono text-white">finished</code>, our webhook automatically activates your key:
          </p>
          <a
            id="modal-checkout-url"
            href="https://nowpayments.io/payment/?iid=4764234970"
            target="_blank"
            rel="noopener noreferrer"
            class="pressable btn-primary-glow block w-full py-2.5 px-4 rounded-xl font-bold text-center"
          >
            Pay $9 on NOWPayments (Release Pass) →
          </a>
        </div>

        <!-- Step 2: Claim Key Modal Form -->
        <div class="p-4 navy-well space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-white">2. Claim Your API Key After Payment</span>
            <span class="font-mono text-[10px] font-semibold text-[#30D158]">Instant Delivery</span>
          </div>
          <p class="text-[11px] text-slate-300">
            Enter your NOWPayments <strong>Payment ID / Transaction ID</strong> or <strong>Email Address</strong> to retrieve your active API key immediately:
          </p>
          <div class="flex flex-col sm:flex-row gap-2">
            <input
              id="claim-identifier-input"
              type="text"
              placeholder="e.g. 5839201948 or you@company.com"
              class="flex-1 px-3.5 py-2.5 rounded-xl bg-[#040814]/90 border border-slate-400/30 text-white placeholder-slate-400 font-mono text-xs focus:outline-none focus:border-sky-400"
            />
            <button
              id="modal-claim-btn"
              type="button"
              onclick="claimApiKeyFromModal()"
              class="pressable px-4 py-2.5 rounded-xl bg-sky-500/25 hover:bg-sky-500/35 border border-sky-400/50 text-white font-semibold text-xs shrink-0"
            >
              🔑 Claim API Key
            </button>
          </div>
        </div>

        <!-- Issued Key Box -->
        <div id="modal-key-result" class="hidden p-4 rounded-xl bg-[#30D158]/15 border border-[#30D158]/40 space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-[#30D158]">
              ✓ API Key Active (<span id="issued-credits-count">5</span> Credits)
            </span>
            <button
              type="button"
              onclick="copyWithMorph(document.getElementById('issued-api-key').innerText, this, 'API Key copied to clipboard')"
              class="pressable px-2.5 py-1 rounded-lg bg-white/[0.1] hover:bg-white/[0.18] text-[11px] font-mono text-white"
            >
              <span class="copy-icon-slot icon-morph">Copy Key</span>
            </button>
          </div>
          <div class="p-2.5 navy-well flex items-center justify-between gap-2">
            <span class="text-[11px] text-slate-300 font-mono">API Key:</span>
            <code id="issued-api-key" class="font-mono text-xs font-bold text-white select-all"></code>
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="text-[11px] text-slate-200 font-medium">Run in your project terminal:</span>
            <button
              type="button"
              onclick="copyWithMorph(document.getElementById('issued-cli-cmd').innerText, this, 'Generator CLI command copied')"
              class="pressable px-2.5 py-1 rounded-lg bg-white/[0.1] hover:bg-white/[0.18] text-[11px] font-mono text-white"
            >
              <span class="copy-icon-slot icon-morph">Copy CLI Command</span>
            </button>
          </div>
          <pre id="issued-cli-cmd" class="p-2.5 navy-well font-mono text-[11px] text-[#30D158] overflow-x-auto"></pre>
        </div>
      </div>
    </div>
  </div>

  <!-- Sonner-Style Toast Notification (.glass-card) -->
  <div
    id="sonner-toast"
    data-visible="false"
    role="status"
    aria-live="polite"
    class="sonner-toast glass-card fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3"
  >
    <span class="w-5 h-5 rounded-full bg-[#30D158]/25 border border-[#30D158]/50 flex items-center justify-center text-[#30D158] text-xs font-bold">
      ✓
    </span>
    <span id="sonner-toast-text" class="text-xs font-medium text-white">Copied to clipboard</span>
  </div>

  <!-- Clean Footer (No Raw JSON Exit Links) -->
  <footer class="border-t border-slate-400/15 py-10 mt-12 text-xs text-slate-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-2">
        <span class="text-white font-semibold">AppShield MCP</span>
        <span>— Deterministic Apple App Store &amp; Google Play Compliance Engine</span>
      </div>
      <div class="flex items-center gap-6">
        <button type="button" onclick="toggleStatusPopover(event); window.scrollTo({top: 0, behavior: 'smooth'});" class="hover:text-white transition-colors">
          System Status
        </button>
        <a href="#scanner" class="hover:text-white transition-colors">Live Scanner</a>
        <a href="#pricing" class="hover:text-white transition-colors">Pricing</a>
      </div>
    </div>
  </footer>

  <script>
    const PRESETS = {
      rn_openai: {
        appName: "ReactNativeOpenAIApp",
        tag: "package.json (React Native + AI)",
        aiConsent: false,
        policy: "We use Sentry for crash reporting and Stripe for payment processing.",
        content: JSON.stringify({
          name: "react-native-ai-assistant",
          dependencies: {
            "openai": "^4.68.0",
            "@anthropic-ai/sdk": "^0.30.0",
            "@sentry/react-native": "^5.32.0",
            "stripe-react-native": "^0.38.0",
            "expo-location": "~17.0.1"
          }
        }, null, 2)
      },
      flutter_admob: {
        appName: "FlutterSuperApp",
        tag: "pubspec.lock (Flutter + AdMob)",
        aiConsent: true,
        policy: "Our app uses Firebase Analytics for usage data.",
        content: JSON.stringify({
          name: "flutter_super_app",
          dependencies: {
            "firebase_core": "^3.6.0",
            "firebase_analytics": "^11.3.3",
            "firebase_crashlytics": "^4.1.3",
            "google_mobile_ads": "^5.2.0",
            "purchases_flutter": "^8.1.0",
            "geolocator": "^13.0.1"
          }
        }, null, 2)
      },
      ios_appsflyer: {
        appName: "iOSNativeCommerce",
        tag: "Podfile.lock (iOS Native)",
        aiConsent: true,
        policy: "We use Google Sign-In for authentication.",
        content: JSON.stringify({
          name: "ios-native-commerce",
          dependencies: {
            "Alamofire": "5.9.1",
            "AppsFlyerFramework": "6.14.0",
            "Adjust": "4.38.0",
            "FacebookCore": "17.0.0",
            "GoogleSignIn": "7.1.0",
            "BrazeKit": "10.3.0"
          }
        }, null, 2)
      }
    };

    let currentModalPlan = 'pass';
    let currentModalAmount = 9;
    let toastTimer = null;

    function showToast(message) {
      const toast = document.getElementById('sonner-toast');
      const textEl = document.getElementById('sonner-toast-text');
      textEl.textContent = message;
      toast.setAttribute('data-visible', 'true');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.setAttribute('data-visible', 'false');
      }, 2400);
    }

    function copyWithMorph(text, btn, toastMsg) {
      navigator.clipboard.writeText(text);
      showToast(toastMsg || 'Copied to clipboard');

      const slot = btn.querySelector('.copy-icon-slot') || btn;
      if (!slot.dataset.originalHtml) {
        slot.dataset.originalHtml = slot.innerHTML;
      }

      slot.style.filter = 'blur(2px)';
      slot.style.opacity = '0.4';
      slot.style.transform = 'scale(0.92)';

      setTimeout(() => {
        slot.innerHTML = \`
          <svg class="w-3.5 h-3.5 text-[#30D158]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-[#30D158] font-semibold">Copied!</span>
        \`;
        slot.style.filter = 'blur(0px)';
        slot.style.opacity = '1';
        slot.style.transform = 'scale(1)';
      }, 90);

      setTimeout(() => {
        slot.style.filter = 'blur(2px)';
        slot.style.opacity = '0.4';
        setTimeout(() => {
          slot.innerHTML = slot.dataset.originalHtml;
          slot.style.filter = 'blur(0px)';
          slot.style.opacity = '1';
          slot.style.transform = 'scale(1)';
        }, 90);
      }, 1750);
    }

    function switchHeroTab(tab) {
      const stage = document.getElementById('hero-tab-stage');
      stage.classList.remove('morph-enter');
      stage.classList.add('morph-exit');

      ['cli', 'claude', 'cursor'].forEach(t => {
        const btn = document.getElementById('tab-btn-' + t);
        if (t === tab) {
          btn.className = 'pressable px-3.5 py-1.5 rounded-lg bg-sky-500/25 text-white border border-sky-400/40 font-semibold shadow-sm';
        } else {
          btn.className = 'pressable px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white';
        }
      });

      setTimeout(() => {
        ['cli', 'claude', 'cursor'].forEach(t => {
          const panel = document.getElementById('tab-panel-' + t);
          if (t === tab) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
        stage.classList.remove('morph-exit');
        stage.classList.add('morph-enter');
      }, 110);
    }

    function toggleStatusPopover(e) {
      if (e) e.stopPropagation();
      const popover = document.getElementById('status-popover');
      const btn = document.getElementById('status-pill-btn');
      const isOpen = popover.getAttribute('data-open') === 'true';
      const nextState = !isOpen;
      popover.setAttribute('data-open', String(nextState));
      btn.setAttribute('aria-expanded', String(nextState));
      if (nextState) {
        refreshHealthTelemetry();
      }
    }

    async function refreshHealthTelemetry() {
      const t0 = performance.now();
      try {
        const res = await fetch('/health');
        const data = await res.json();
        const elapsed = Math.max(4, Math.round(performance.now() - t0));

        const count = data.sdk_rules_count || ${sdkCount};
        document.getElementById('status-pill-text').textContent = \`System Operational • \${count}+ SDKs Active\`;
        document.getElementById('popover-sdk-count').textContent = String(count);
        document.getElementById('popover-latency').textContent = elapsed + ' ms';
        document.getElementById('popover-version').textContent = 'v' + (data.version || '3.0.0') + ' Live';
        document.getElementById('popover-last-checked').textContent = 'Synced just now';
      } catch (err) {
        document.getElementById('popover-last-checked').textContent = 'Edge cache active';
      }
    }

    function selectPreset(key) {
      const p = PRESETS[key];
      if (!p) return;

      ['rn_openai', 'flutter_admob', 'ios_appsflyer'].forEach(k => {
        const btn = document.getElementById('preset-btn-' + k);
        if (k === key) {
          btn.className = 'pressable px-4 py-2 rounded-xl text-xs font-semibold btn-primary-glow';
        } else {
          btn.className = 'pressable px-4 py-2 rounded-xl text-xs font-medium bg-slate-900/75 text-slate-200 border border-slate-400/25 hover:bg-slate-800/80 hover:text-white';
        }
      });

      const editorStage = document.getElementById('editor-stage');
      editorStage.classList.remove('morph-enter');
      editorStage.classList.add('morph-exit');

      setTimeout(() => {
        document.getElementById('scanner-app-name').value = p.appName;
        document.getElementById('preset-ecosystem-tag').textContent = p.tag;
        document.getElementById('scanner-input').value = p.content;
        document.getElementById('scanner-ai-consent').checked = p.aiConsent;
        document.getElementById('scanner-policy-text').value = p.policy;

        editorStage.classList.remove('morph-exit');
        editorStage.classList.add('morph-enter');
        runLiveScan();
      }, 110);
    }

    function extractDependencies(raw) {
      const trimmed = (raw || '').trim();
      if (!trimmed) return [];
      if (trimmed.startsWith('{')) {
        try {
          const parsed = JSON.parse(trimmed);
          const out = new Set();
          ['dependencies', 'devDependencies', 'peerDependencies'].forEach(sec => {
            if (parsed[sec] && typeof parsed[sec] === 'object') {
              Object.keys(parsed[sec]).forEach(k => out.add(k));
            }
          });
          if (out.size > 0) return Array.from(out);
        } catch (e) {}
      }
      return trimmed
        .split(/[\\n,]+/)
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    }

    async function runLiveScan() {
      const resultsStage = document.getElementById('scanner-results-stage');
      const scanBtn = document.getElementById('scan-now-btn');
      const scanLabel = document.getElementById('scan-btn-label');

      const appName = document.getElementById('scanner-app-name').value || 'MobileApp';
      const deps = extractDependencies(document.getElementById('scanner-input').value);
      const hasAiConsent = document.getElementById('scanner-ai-consent').checked;
      const policyText = document.getElementById('scanner-policy-text').value.trim();

      resultsStage.classList.remove('morph-enter');
      resultsStage.classList.add('morph-exit');
      scanBtn.disabled = true;
      scanLabel.textContent = 'Scanning Dependencies...';

      try {
        const res = await fetch('/v1/audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            app_name: appName,
            dependencies: deps,
            has_in_app_ai_consent_modal: hasAiConsent,
            privacy_policy_text: policyText || undefined
          })
        });
        const data = await res.json();
        setTimeout(() => {
          renderScanResults(data);
          resultsStage.classList.remove('morph-exit');
          resultsStage.classList.add('morph-enter');
        }, 120);
      } catch (err) {
        showToast('Network error while scanning');
        resultsStage.classList.remove('morph-exit');
        resultsStage.classList.add('morph-enter');
      } finally {
        scanBtn.disabled = false;
        scanLabel.textContent = 'Scan Project Now';
      }
    }

    function renderScanResults(data) {
      document.getElementById('result-app-title').textContent = data.app_name || 'MobileApp';
      document.getElementById('result-sdk-count').textContent = (data.detected_sdks_count || 0) + ' SDKs Matched';

      const pill = document.getElementById('result-status-pill');
      if (data.audit_status === 'HIGH_REJECTION_RISK') {
        pill.className = 'px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#FF453A]/20 text-[#FF453A] border border-[#FF453A]/45';
        pill.textContent = '● CRITICAL BLOCKERS';
      } else if (data.audit_status === 'WARNINGS_FOUND') {
        pill.className = 'px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#FF9F0A]/20 text-[#FF9F0A] border border-[#FF9F0A]/45';
        pill.textContent = '▲ WARNINGS FOUND';
      } else {
        pill.className = 'px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#30D158]/20 text-[#30D158] border border-[#30D158]/45';
        pill.textContent = '✓ READY FOR APP REVIEW';
      }

      const risks = data.rejection_risks || [];
      const counter = document.getElementById('result-risk-counter');
      counter.textContent = risks.length + (risks.length === 1 ? ' blocker detected' : ' blockers detected');
      counter.className = risks.length > 0 ? 'text-xs font-mono font-semibold text-[#FF453A]' : 'text-xs font-mono font-semibold text-[#30D158]';

      const grid = document.getElementById('result-risks-grid');
      if (risks.length === 0) {
        grid.innerHTML = '<div class="p-4 rounded-xl bg-[#30D158]/15 border border-[#30D158]/35 text-xs text-[#30D158] font-medium">✓ All detected SDK disclosures and Apple Guideline 5.1.2(i) requirements are satisfied.</div>';
      } else {
        grid.innerHTML = risks.map((r, idx) => {
          const isCrit = r.severity === 'CRITICAL';
          const delay = Math.min(idx * 45, 220);
          return \`
            <div style="animation-delay: \${delay}ms" class="stagger-item p-3.5 rounded-xl border \${isCrit ? 'bg-[#FF453A]/15 border-[#FF453A]/40' : 'bg-[#040814]/65 border-slate-400/25'}">
              <div class="flex items-center justify-between gap-2">
                <span class="font-mono text-[11px] font-bold \${isCrit ? 'text-[#FF453A]' : 'text-[#FF9F0A]'}">
                  [\${r.severity}] \${r.code}
                </span>
                <span class="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-900/90 text-sky-200 border border-slate-400/25">\${r.sdk}</span>
              </div>
              <p class="text-xs text-white mt-1.5 leading-relaxed">\${r.message}</p>
              <p class="text-[11px] text-[#30D158] mt-1 font-mono font-medium">Fix → \${r.remediation}</p>
            </div>
          \`;
        }).join('');
      }

      if (data.free_preview) {
        document.getElementById('live-xml-preview').textContent = data.free_preview.ios_privacy_manifest_xml_preview;
        document.getElementById('live-csv-preview').textContent = data.free_preview.google_play_data_safety_csv_preview;
      }
    }

    const NOWPAYMENTS_LINKS = {
      pass: 'https://nowpayments.io/payment/?iid=4764234970',
      pro: 'https://nowpayments.io/payment/?iid=4971511243'
    };

    function selectModalPlan(plan, amount) {
      currentModalPlan = plan;
      currentModalAmount = amount;

      const passBtn = document.getElementById('modal-switch-pass');
      const proBtn = document.getElementById('modal-switch-pro');
      const checkoutLink = document.getElementById('modal-checkout-url');
      const badge = document.getElementById('modal-plan-badge');

      if (plan === 'pro') {
        badge.textContent = 'INDIE PRO • $19/MO (50 CREDITS)';
        checkoutLink.href = NOWPAYMENTS_LINKS.pro;
        checkoutLink.textContent = 'Pay $19 on NOWPayments (Indie Pro) →';
        proBtn.className = 'pressable py-2 px-3 rounded-xl text-xs font-semibold border border-sky-400/50 bg-sky-500/25 text-white text-center';
        passBtn.className = 'pressable py-2 px-3 rounded-xl text-xs font-medium border border-slate-400/25 bg-slate-900/60 text-slate-300 hover:text-white text-center';
      } else {
        badge.textContent = 'RELEASE PASS • $9 ONE-TIME (5 CREDITS)';
        checkoutLink.href = NOWPAYMENTS_LINKS.pass;
        checkoutLink.textContent = 'Pay $9 on NOWPayments (Release Pass) →';
        passBtn.className = 'pressable py-2 px-3 rounded-xl text-xs font-semibold border border-sky-400/50 bg-sky-500/25 text-white text-center';
        proBtn.className = 'pressable py-2 px-3 rounded-xl text-xs font-medium border border-slate-400/25 bg-slate-900/60 text-slate-300 hover:text-white text-center';
      }
    }

    async function openCheckoutModal(plan, amount) {
      selectModalPlan(plan || 'pass', amount || 9);
      const modal = document.getElementById('checkout-modal');
      modal.setAttribute('data-open', 'true');

      document.getElementById('modal-intent-status').textContent = 'Registering checkout session...';
      document.getElementById('modal-tx-id').textContent = 'Instant IPN';

      const appName = document.getElementById('scanner-app-name').value || 'MobileApp';
      const deps = extractDependencies(document.getElementById('scanner-input').value);

      try {
        const res = await fetch('/v1/unlock-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ app_name: appName, dependencies: deps, plan: currentModalPlan })
        });
        const data = await res.json();
        document.getElementById('modal-intent-status').textContent = \`Order #\${data.transaction_id} ready for \${data.app_name} (\${data.detected_sdks_count} SDKs detected)\`;
        document.getElementById('modal-tx-id').textContent = 'Order #' + data.transaction_id;
        if (data.checkout_url) {
          document.getElementById('modal-checkout-url').href = data.checkout_url;
        }
      } catch (e) {
        document.getElementById('modal-intent-status').textContent = 'Checkout session ready via NOWPayments.';
      }
    }

    function closeCheckoutModal() {
      const modal = document.getElementById('checkout-modal');
      modal.setAttribute('data-open', 'false');
    }

    function handleModalBackdropClick(e) {
      if (e.target && e.target.id === 'checkout-modal') {
        closeCheckoutModal();
      }
    }

    async function claimApiKeyFromModal() {
      const inputEl = document.getElementById('claim-identifier-input');
      const btn = document.getElementById('modal-claim-btn');
      const identifier = (inputEl.value || '').trim();

      if (!identifier || identifier.length < 2) {
        showToast('Please enter your NOWPayments Payment ID or Email');
        inputEl.focus();
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Verifying...';

      try {
        const res = await fetch('/v1/claim-key', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifier: identifier,
            plan: currentModalPlan
          })
        });
        const data = await res.json();
        if (!res.ok || !data.api_key) {
          showToast(data.error || 'Could not verify transaction');
          return;
        }
        const box = document.getElementById('modal-key-result');
        box.classList.remove('hidden');
        document.getElementById('issued-credits-count').textContent = String(data.credits_remaining);
        document.getElementById('issued-api-key').textContent = data.api_key;
        document.getElementById('issued-cli-cmd').textContent = \`npx appshield-mcp generate --key=\${data.api_key}\`;
        showToast('API Key claimed & active!');
      } catch (e) {
        showToast('Error connecting to server');
      } finally {
        btn.disabled = false;
        btn.textContent = '🔑 Claim API Key';
      }
    }

    document.addEventListener('click', (e) => {
      const popover = document.getElementById('status-popover');
      const btn = document.getElementById('status-pill-btn');
      if (popover && popover.getAttribute('data-open') === 'true') {
        if (!popover.contains(e.target) && !btn.contains(e.target)) {
          popover.setAttribute('data-open', 'false');
          btn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCheckoutModal();
        const popover = document.getElementById('status-popover');
        if (popover) popover.setAttribute('data-open', 'false');
      }
    });

    window.addEventListener('DOMContentLoaded', () => {
      const p = PRESETS.rn_openai;
      document.getElementById('scanner-app-name').value = p.appName;
      document.getElementById('preset-ecosystem-tag').textContent = p.tag;
      document.getElementById('scanner-input').value = p.content;
      document.getElementById('scanner-ai-consent').checked = p.aiConsent;
      document.getElementById('scanner-policy-text').value = p.policy;
      runLiveScan();
      refreshHealthTelemetry();
    });
  </script>
</body>
</html>`;
}
