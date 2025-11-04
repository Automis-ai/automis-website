// middleware.js (root della repo)
import { NextResponse } from "next/server";

const VOICE_HOST = "voice.automis.ai";
const DEV_HOSTS = new Set(["localhost", "127.0.0.1"]);
const LOCALES = ["ita", "fr", "de", "pt", "es"];
const DEFAULT_LOCALE = "ita";

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

  // Se il primo segmento NON è una lingua supportata → redirect alla default
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (!LOCALES.includes(maybeLocale)) {
    // Mantiene il resto del path dopo la lingua
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