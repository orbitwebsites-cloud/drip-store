// Vercel Routing Middleware — x402 bot paywall.
// Humans pass straight through (UA check only). AI crawlers/scrapers get HTTP 402
// with x402 payment requirements unless they pay. Logic: ./x402/bot-paywall.js
import { next } from "@vercel/functions";
import { handleBotPaywall } from "./x402/bot-paywall.js";

export const config = {
  runtime: "nodejs",
  // Never run on API routes (Stripe checkout/webhook), static files, or crawler meta files.
  matcher: [
    "/((?!api/|public/|_next/static/|\\.well-known/|robots\\.txt|llms\\.txt|favicon|sitemap).*)",
  ],
};

export default async function middleware(request) {
  const result = await handleBotPaywall(request);
  if (result.action === "respond") return result.response;
  if (result.headers) return next({ headers: result.headers });
  return undefined; // continue to the static page untouched
}
