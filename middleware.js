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

  const isVoiceHost = hostname === VOICE_HOST || DEV_HOSTS.has(hostname);

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

  // ✅ LOGICA PER SOTTODOMINIO VOICE (voice.automis.ai)
  if (isVoiceHost) {
    // Se root ("/") -> reindirizza a /ita (che è la lander Voice AI in italiano)
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/ita", req.url));
    }

    // Se per sbaglio atterrano su /it (lander principale) mentre sono su voice.automis.ai -> forza /ita
    if (pathname === "/it") {
      return NextResponse.redirect(new URL("/ita", req.url));
    }

    // Altrimenti procedi normalmente per /ita, /fr, /de, /es, /pt, /voice-ai
    return NextResponse.next();
  }

  // ✅ LOGICA PER DOMINIO PRINCIPALE (automis.ai)
  // Su automis.ai vogliamo le pagine principali, non quelle di voice
  
  // Se root ("/") -> rimani sulla pagina inglese (non reindirizzare a /it automaticamente se preferisci l'inglese come base)
  // Se invece vuoi che automis.ai redirecti a /it di default, scommenta qui sotto:
  /*
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, req.url));
  }
  */

  // Se atterrano su /ita (lander voice) mentre sono su automis.ai -> forza /it (lander principale)
  if (pathname === "/ita") {
    return NextResponse.redirect(new URL("/it", req.url));
  }

  // Gestione altri segmenti (privacy-policy, about, etc.)
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (LOCALES.includes(maybeLocale)) {
    return NextResponse.next();
  }

  // Se non è un locale e non è una "English root page", permetti il passaggio (o gestisci redirect)
  if (ENGLISH_ROOT_PAGES.has(maybeLocale) || maybeLocale === undefined) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Limita il middleware alle route "pagina"
export const config = {
  matcher: ["/((?!_next|api|.*\\..*|assets|favicon.ico).*)"],
};