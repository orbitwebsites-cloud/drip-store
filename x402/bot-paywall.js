// x402 bot paywall — shared logic for the Vercel Routing Middleware (../middleware.js).
//
// Humans browse free. AI crawlers / scrapers (matched by User-Agent) get an
// HTTP 402 with x402 payment requirements; if they pay (PAYMENT-SIGNATURE /
// X-PAYMENT header), the payment is verified + settled via the facilitator and
// the page is served normally with a PAYMENT-RESPONSE header.
//
// FAIL OPEN: any exception or facilitator outage serves the page normally.
// The x402 libraries are lazy-loaded, so non-bot requests pay only a UA check.

// ---------------------------------------------------------------------------
// Config (all env-overridable)
// ---------------------------------------------------------------------------
const env = (name, fallback) => {
  const v = typeof process !== "undefined" && process.env ? process.env[name] : undefined;
  return v !== undefined && v !== "" ? v : fallback;
};

export function getConfig() {
  return {
    enabled: String(env("X402_ENABLED", "true")).toLowerCase() !== "false",
    payTo: env("X402_PAY_TO", "0x0ba3b8796ce61ef8Cbd11A7F33Be31F1Fd4A03B3"),
    price: env("X402_PRICE", "$0.001"),
    network: env("X402_NETWORK", "eip155:8453"), // Base mainnet (USDC)
    facilitatorUrl: env("X402_FACILITATOR_URL", "https://x402.org/facilitator"),
    cdpApiKeyId: env("CDP_API_KEY_ID", ""),
    cdpApiKeySecret: env("CDP_API_KEY_SECRET", ""),
  };
}

// ---------------------------------------------------------------------------
// Bot detection (case-insensitive User-Agent substring match)
// ---------------------------------------------------------------------------
export const BOT_UA_PATTERNS = {
  // Checked first: search engines, link previews, platform + uptime monitors stay free.
  neverCharge: [
    "Googlebot", "Bingbot", "DuckDuckBot", "Slurp",
    "Applebot", // plain Applebot only — "Applebot-Extended" is excluded in isAllowedBot()
    "Twitterbot", "facebookexternalhit", "LinkedInBot", "Slackbot", "Discordbot",
    "WhatsApp", "TelegramBot", "Vercel",
    // uptime monitors
    "UptimeRobot", "Pingdom", "StatusCake", "Better Uptime", "BetterStack", "Uptime-Kuma",
    "Site24x7", "Checkly", "Datadog", "Freshping", "HetrixTools", "NewRelicPinger", "updown.io",
  ],
  charge: [
    "GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-User", "Claude-SearchBot",
    "anthropic-ai", "CCBot", "PerplexityBot", "Perplexity-User", "Bytespider", "Amazonbot",
    "Applebot-Extended", "Google-Extended", "Meta-ExternalAgent", "meta-externalfetcher",
    "FacebookBot", "Diffbot", "cohere-ai", "cohere-training-data-crawler", "YouBot", "AI2Bot",
    "Ai2Bot-Dolma", "Timpibot", "ImagesiftBot", "omgili", "PetalBot", "Scrapy",
    "python-requests", "aiohttp", "Go-http-client", "curl", "wget", "HeadlessChrome", "PhantomJS",
  ],
};

const lower = (list) => list.map((s) => s.toLowerCase());
const NEVER_CHARGE = lower(BOT_UA_PATTERNS.neverCharge);
const CHARGE = lower(BOT_UA_PATTERNS.charge);

function isAllowedBot(ua) {
  return NEVER_CHARGE.some((p) => {
    if (!ua.includes(p)) return false;
    if (p === "applebot") return !ua.includes("applebot-extended");
    return true;
  });
}

/** True if this User-Agent should be charged. */
export function isChargeableBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  if (isAllowedBot(ua)) return false;
  return CHARGE.some((p) => ua.includes(p));
}

// ---------------------------------------------------------------------------
// Always-free paths
// ---------------------------------------------------------------------------
const FREE_PATH_RE = [
  /^\/robots\.txt$/i,
  /^\/sitemap[^/]*\.xml$/i,
  /^\/favicon/i,
  /^\/llms\.txt$/i,
  /^\/\.well-known\//i,
  /^\/api\//i, // Stripe checkout + webhook must never be touched
  /^\/public\//i,
  /^\/_next\/static\//i,
  /^\/(images|img|assets|static|fonts|css|js)\//i,
  /\.(css|js|mjs|map|png|jpe?g|gif|svg|webp|avif|ico|bmp|woff2?|ttf|otf|eot|mp4|webm|mp3|txt|xml|json|webmanifest|pdf)$/i,
];

export function isFreePath(pathname) {
  return FREE_PATH_RE.some((re) => re.test(pathname));
}

// ---------------------------------------------------------------------------
// x402 server (lazy, cached per instance)
// ---------------------------------------------------------------------------
let httpServerPromise = null;
let lastInitFailure = 0;
const INIT_RETRY_MS = 60_000; // after a facilitator failure, fail open for 60s before retrying
let decodePaymentRequiredHeader = null;

async function buildHttpServer(cfg) {
  const [{ x402ResourceServer, x402HTTPResourceServer, HTTPFacilitatorClient }, { ExactEvmScheme }, http] =
    await Promise.all([
      import("@x402/core/server"),
      import("@x402/evm/exact/server"),
      import("@x402/core/http"),
    ]);
  decodePaymentRequiredHeader = http.decodePaymentRequiredHeader;

  let facilitatorConfig;
  if (cfg.cdpApiKeyId && cfg.cdpApiKeySecret) {
    // Coinbase CDP facilitator (authenticated) via the official helper.
    const { createFacilitatorConfig } = await import("@coinbase/x402");
    facilitatorConfig = createFacilitatorConfig(cfg.cdpApiKeyId, cfg.cdpApiKeySecret);
  } else {
    facilitatorConfig = { url: cfg.facilitatorUrl };
  }
  facilitatorConfig = { timeoutMs: 15000, ...facilitatorConfig };

  const resourceServer = new x402ResourceServer(new HTTPFacilitatorClient(facilitatorConfig)).register(
    cfg.network,
    new ExactEvmScheme(),
  );

  // Single RouteConfig = applies to every path the middleware hands us.
  const httpServer = new x402HTTPResourceServer(resourceServer, {
    accepts: { scheme: "exact", price: cfg.price, network: cfg.network, payTo: cfg.payTo },
    description: "Paid access for automated agents",
    mimeType: "text/html",
  });
  await httpServer.initialize(); // fetches facilitator /supported + validates config
  return httpServer;
}

function getHttpServer(cfg) {
  if (!httpServerPromise) {
    if (Date.now() - lastInitFailure < INIT_RETRY_MS) {
      return Promise.reject(new Error("facilitator init failed recently; backing off"));
    }
    httpServerPromise = buildHttpServer(cfg).catch((err) => {
      httpServerPromise = null; // retry after backoff
      lastInitFailure = Date.now();
      throw err;
    });
  }
  return httpServerPromise;
}

/** Framework-agnostic adapter over a Web `Request` (x402 HTTPAdapter interface). */
class WebRequestAdapter {
  constructor(request) {
    this.request = request;
    this.url = new URL(request.url);
  }
  getHeader(name) {
    return this.request.headers.get(name) ?? undefined;
  }
  getMethod() {
    return this.request.method;
  }
  getPath() {
    return this.url.pathname;
  }
  getUrl() {
    return this.request.url;
  }
  // Charged clients are bots, never humans: always answer with machine-readable
  // requirements instead of the browser paywall HTML.
  getAcceptHeader() {
    return "application/json";
  }
  getUserAgent() {
    return this.request.headers.get("user-agent") || "";
  }
  getQueryParams() {
    const out = {};
    for (const [k, v] of this.url.searchParams) {
      out[k] = k in out ? [].concat(out[k], v) : v;
    }
    return out;
  }
  getQueryParam(name) {
    const all = this.url.searchParams.getAll(name);
    if (all.length === 0) return undefined;
    return all.length === 1 ? all[0] : all;
  }
}

function jsonResponse(instr) {
  let body = instr.body;
  // v2 carries requirements in the PAYMENT-REQUIRED header; mirror them into the
  // JSON body too so any client can read them.
  const header = instr.headers && (instr.headers["PAYMENT-REQUIRED"] || instr.headers["payment-required"]);
  if (header && decodePaymentRequiredHeader && (!body || Object.keys(body).length === 0)) {
    try {
      body = decodePaymentRequiredHeader(header);
    } catch {
      /* keep original body */
    }
  }
  const headers = new Headers(instr.headers || {});
  headers.set("Content-Type", "application/json");
  return new Response(JSON.stringify(body ?? {}), { status: instr.status, headers });
}

/**
 * Decide what to do with a request.
 * @returns {Promise<{action: "pass"} | {action: "pass", headers: Record<string,string>} | {action: "respond", response: Response}>}
 */
export async function handleBotPaywall(request) {
  try {
    const cfg = getConfig();
    if (!cfg.enabled) return { action: "pass" };
    if (request.method !== "GET" && request.method !== "HEAD") return { action: "pass" };

    const ua = request.headers.get("user-agent") || "";
    if (!isChargeableBot(ua)) return { action: "pass" };

    const url = new URL(request.url);
    if (isFreePath(url.pathname)) return { action: "pass" };

    const httpServer = await getHttpServer(cfg);
    const adapter = new WebRequestAdapter(request);
    const context = {
      adapter,
      path: url.pathname,
      method: request.method,
      paymentHeader: adapter.getHeader("payment-signature") || adapter.getHeader("x-payment"),
    };

    const result = await httpServer.processHTTPRequest(context);
    if (result.type === "no-payment-required") return { action: "pass" };
    if (result.type === "payment-error") return { action: "respond", response: jsonResponse(result.response) };

    // payment-verified: the page is static, so settle now and then let the
    // origin serve it with the settlement (PAYMENT-RESPONSE) header attached.
    const settle = await httpServer.processSettlement(
      result.paymentPayload,
      result.paymentRequirements,
      result.declaredExtensions,
      { request: context },
      undefined,
      result.beforeHandlerSettlement,
    );
    if (!settle.success) return { action: "respond", response: jsonResponse(settle.response) };

    const headers = { ...settle.headers };
    headers["Cache-Control"] = "private, no-store";
    return { action: "pass", headers };
  } catch (err) {
    // FAIL OPEN — never break the site.
    console.error("[x402-bot-paywall] fail-open:", err && err.message ? err.message : err);
    return { action: "pass" };
  }
}
