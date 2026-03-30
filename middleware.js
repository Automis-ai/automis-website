// middleware.js (root della repo)
import { NextResponse } from "next/server";

const VOICE_HOST = "voice.automis.ai";
const DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);
const LOCALES = ["it", "ita", "fr", "de", "pt", "es"];
const DEFAULT_LOCALE = "it";
const ENGLISH_ROOT_PAGES = new Set([
  "privacy-policy",
  "terms-of-service",
  "contact",
  "about",
  "blog",
  "use-cases",
  "jumpstart-audit",
  "paid-ads-management",
  "ai-automations",
  "voice-ai",
  "consultation",
  "coming-soon",
  "blog-details"
]);

export function middleware(req) {
  const { nextUrl } = req;
  const { pathname, hostname } = nextUrl;

  // ✅ Esegui il middleware SOLO sul sottodominio voice in produzione.
  // Su automis.ai (sito inglese) o in locale → non fare nulla.
  if (hostname !== VOICE_HOST && !DEV_HOSTS.has(hostname)) {
    return NextResponse.next();
  }

  // Ignora asset e API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    /\.[\w]+$/.test(pathname) // file con estensione (es. .png, .js)
  ) {
    return NextResponse.next();
  }

  // Root → locale di default
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, req.url));
  }

  // Se il primo segmento NON è una lingua supportata → check if it's an English page
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (!LOCALES.includes(maybeLocale)) {
    // If it's a valid English root page, let it through
    if (ENGLISH_ROOT_PAGES.has(maybeLocale)) {
      return NextResponse.next();
    }
    // Otherwise redirect to default locale
    const remainder = segments.slice(0).join("/");
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname.startsWith("/") ? "" : "/"}${remainder ? pathname : ""}`, req.url)
    );
  }

  return NextResponse.next();
}

// Limita il middleware alle route "pagina"
export const config = {
  matcher: ["/((?!_next|api|.*\\..*|assets|favicon.ico).*)"],
};