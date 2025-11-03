// middleware.js
import { NextResponse } from "next/server";

/**
 * Configure once, use forever.
 * Add new locales here (lowercase slugs = folder names in /app/<locale>).
 */
const LOCALES = ["ita", "fr", "en", "de", "es", "pt"]; // extend as you grow
const DEFAULT_LOCALE = "ita";

/** Utility: check if pathname starts with a supported locale */
function isLocalePath(pathname) {
  const p = pathname.replace(/\/+/g, "/");
  return LOCALES.some((loc) => p === `/${loc}` || p.startsWith(`/${loc}/`));
}

export function middleware(req) {
  const url = req.nextUrl;
  const host = req.headers.get("host") || "";
  const pathname = url.pathname;

  const isLocal = host.startsWith("localhost");
  const isVoice = host.startsWith("voice"); // subdomain for voice.automis.ai

  // ✅ Skip redirects during Preview or Dev environments
  if (isLocal || process.env.VERCEL_ENV !== "production") {
    return NextResponse.next();
  }

  // =========================
  // Voice subdomain behavior
  // =========================
  if (isVoice) {
    // 1️⃣ Redirect the root "/" → default locale
    if (pathname === "/") {
      url.pathname = `/${DEFAULT_LOCALE}`;
      url.search = "";
      return NextResponse.redirect(url);
    }

    // 2️⃣ Allow all whitelisted locales (e.g. /ita, /fr, /en, /de...)
    if (isLocalePath(pathname)) {
      return NextResponse.next();
    }

    // 3️⃣ For any other path, just pass through
    return NextResponse.next();
  }

  // =========================
  // Main domain behavior (optional)
  // =========================
  if (!isVoice && pathname.startsWith("/ita")) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

/**
 * Exclude static assets and API routes from middleware
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api|assets).*)",
  ],
};
