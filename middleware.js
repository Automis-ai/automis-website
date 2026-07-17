// middleware.js (root della repo)
import { NextResponse } from "next/server";

const VOICE_HOST = "voice.automis.ai";
const DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);
const LOCALES = ["it", "ita", "en", "fr", "de", "pt", "es"];
const DEFAULT_LOCALE = "it";
const ENGLISH_ROOT_PAGES = new Set([
  "privacy-policy",
  "terms-of-service",
  "contact",
  "about",
  "blog",
  "use-cases",
  "jumpstart-audit",
  "ai-automations",
  "voice-ai",
  "consultation",
  "playbook",
  "tools"
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

  // Espone il path corrente ai Server Component, così il root layout può impostare
  // il corretto <html lang> lato server per ogni locale (vedi app/layout.js). Qui
  // arrivano solo le route "pagina" (asset/API sono già usciti sopra). I redirect
  // non ne hanno bisogno: la richiesta reindirizzata rientra nel middleware e riceve
  // l'header allora.
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);
  const pass = () => NextResponse.next({ request: { headers: requestHeaders } });

  // ✅ LOGICA PER SOTTODOMINIO VOICE (voice.automis.ai)
  if (isVoiceHost) {
    // Se root ("/") -> reindirizza a /ita (che è la lander Voice AI in italiano)
    if (pathname === "/") {
      return NextResponse.redirect(new URL("/ita", req.url));
    }

    // Su voice.automis.ai il tree /it (sito principale) non esiste: /it e QUALSIASI
    // /it/* (es. /it/ita, generato da vecchi redirect client-side) -> forza /ita.
    // Rete di sicurezza contro i 404 lato client sulla lander Voice.
    if (pathname === "/it" || pathname.startsWith("/it/")) {
      return NextResponse.redirect(new URL("/ita", req.url));
    }

    // Altrimenti procedi normalmente per /ita, /en, /fr, /de, /es, /pt, /voice-ai
    return pass();
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
    return pass();
  }

  // Se non è un locale e non è una "English root page", permetti il passaggio (o gestisci redirect)
  if (ENGLISH_ROOT_PAGES.has(maybeLocale) || maybeLocale === undefined) {
    return pass();
  }

  return pass();
}

// Limita il middleware alle route "pagina"
export const config = {
  matcher: ["/((?!_next|api|.*\\..*|assets|favicon.ico).*)"],
};