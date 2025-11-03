import { NextResponse } from "next/server";

// Aggiungi qui le lingue supportate
const LOCALES = ["ita", "fr", "de", "es", "pt"];
const DEFAULT_LOCALE = "ita";

// Mappa rapida da Accept-Language a una delle nostre LOCALES
// (accetta sia codici primari che regionali: es -> es, es-ES -> es, pt-BR -> pt)
function bestLocaleFromHeader(header) {
  if (!header) return null;
  const parts = header.split(",").map(s => s.trim().toLowerCase());
  for (const p of parts) {
    const lang = p.split(";")[0];         // es-ES
    const primary = lang.split("-")[0];   // es
    // se abbiamo un match diretto del primario (it,de,fr,es,pt) usa quello
    if (LOCALES.includes(primary)) return primary;
    // supporto ai nostri alias (es. "it" -> "ita")
    const alias = aliasMap(primary);
    if (alias && LOCALES.includes(alias)) return alias;
  }
  return null;
}

// Converte codici primari in nostri slug, se necessario
function aliasMap(primary) {
  switch (primary) {
    case "it": return "ita";
    case "de": return "de";
    case "fr": return "fr";
    case "es": return "es";
    case "pt": return "pt";
    default: return null;
  }
}

export function middleware(req) {
  const url = req.nextUrl;
  const { pathname, search, hash } = url;

  // Ignora asset, API, file statici
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/assets") ||
    pathname === "/favicon.ico" ||
    /\.[\w]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Segmenti e locale “forse” presente
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  // Normalizza locale maiuscola -> minuscola (es. /DE -> /de)
  if (maybeLocale && LOCALES.includes(maybeLocale.toLowerCase()) && maybeLocale !== maybeLocale.toLowerCase()) {
    const normalized = `/${[maybeLocale.toLowerCase(), ...segments.slice(1)].join("/")}${search}${hash}`;
    return NextResponse.redirect(new URL(normalized, req.url));
  }

  // Root: scegli locale (cookie > accept-language > default)
  if (pathname === "/") {
    const cookieLocale = req.cookies.get("locale")?.value;
    const headerLocale = bestLocaleFromHeader(req.headers.get("accept-language"));
    const locale =
      (cookieLocale && LOCALES.includes(cookieLocale)) ? cookieLocale
      : (headerLocale || DEFAULT_LOCALE);

    const res = NextResponse.redirect(new URL(`/${locale}${search}${hash}`, req.url));
    // persisti la scelta per 1 anno
    res.cookies.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  // Se il primo segmento NON è una nostra locale supportata, prefissa con DEFAULT_LOCALE
  if (!maybeLocale || !LOCALES.includes(maybeLocale)) {
    const pathNoLeading = pathname.startsWith("/") ? pathname : `/${pathname}`;
    const target = `/${DEFAULT_LOCALE}${pathNoLeading}${search}${hash}`;
    return NextResponse.redirect(new URL(target, req.url));
  }

  // Locale valida già presente
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*|assets|favicon.ico).*)"],
};
