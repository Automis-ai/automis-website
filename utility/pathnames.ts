// utility/pathnames.ts

export type Locale = "en" | "it" | "pt";

export const PATHNAMES = {
  home: {
    en: "/",
    it: "/it",
    pt: "/pt",
  },

  pages: {
    about: {
      en: "/about",
      it: "/it/about",
      pt: "/pt/about",
    },
    blog: {
      en: "/blog",
      it: "/it/blog",
      pt: "/pt/blog",
    },
    contact: {
      en: "/contact",
      it: "/it/contact",
      pt: "/pt/contact",
    },
    useCases: {
      en: "/use-cases",
      it: "/it/use-cases",
      pt: "/pt/use-cases",
    },
    jumpstartAudit: {
      en: "/jumpstart-audit",
      it: "/it/jumpstart-audit",
      pt: "/pt/jumpstart-audit",
    },
    termsOfService: {
      en: "/terms-of-service",
      it: "/it/terms-of-service",
      pt: "/pt/terms-of-service",
    },
    privacyPolicy: {
      en: "/privacy-policy",
      it: "/it/privacy-policy",
      pt: "/pt/privacy-policy",
    },
    cookiePolicy: {
      en: "/cookie-policy",
      it: "/it/cookie-policy",
      pt: "/pt/cookie-policy",
    },
    tools: {
      en: "/tools",
      it: "/it/tools",
      pt: "/pt/tools",
    },
  },

  services: {
    paidAds: {
      en: "/paid-ads-management",
      it: "/it/paid-ads-management",
      pt: "/pt/paid-ads-management",
    },
    voiceAI: {
      en: "/voice-ai",
      it: "/it/voice-ai",
      pt: "/pt/voice-ai",
    },
    aiAutomations: {
      en: "/ai-automations",
      it: "/it/ai-automations",
      pt: "/pt/ai-automations",
    },
  },
} as const;

type LocalizedPath = { en: string; it: string; pt: string };

// Prefixed locales (English is the un-prefixed root). Keep in sync with Locale.
const PREFIXED: Exclude<Locale, "en">[] = ["it", "pt"];

// Il sito portoghese e' servito su /pt/* riscrivendo a /pt-site/*. Senza questo,
// /pt-site/about si legge come inglese: vedi il commento esteso su publicPath() in
// lib/locales.js. La regola e' una sola, ripetuta qui solo perche' questo modulo e'
// TypeScript e non importa dal gemello JS; se la cambi, cambiala in entrambi.
function publicPath(pathname: string): string {
  return (pathname || "/").replace(/^\/pt-site(?=\/|$)/, "/pt");
}

export function getLocaleFromPathname(pathname: string): Locale {
  pathname = publicPath(pathname);
  for (const code of PREFIXED) {
    if (pathname === `/${code}` || pathname.startsWith(`/${code}/`)) return code;
  }
  return "en";
}

export function normalizePathname(pathname: string): string {
  pathname = publicPath(pathname);
  for (const code of PREFIXED) {
    if (pathname === `/${code}`) return "/";
    if (pathname.startsWith(`/${code}/`)) return pathname.replace(`/${code}`, "");
  }
  return pathname;
}

/**
 * Preferisci passare direttamente PATHNAMES.pages.about (ecc.)
 * invece di stringhe, così hai autocomplete e zero typo.
 */
export function hrefFor(path: LocalizedPath, locale: Locale): string {
  return path[locale] ?? "/";
}
