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
    howWeWork: {
      en: "/how-we-work",
      it: "/it/how-we-work",
      pt: "/pt/how-we-work",
    },
    training: {
      en: "/training",
      it: "/it/training",
      pt: "/pt/training",
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
    ecommerce: {
      en: "/ecommerce",
      it: "/it/ecommerce",
      pt: "/pt/ecommerce",
    },
  },

  // Sito v2: l'hub dei sistemi e le cinque categorie (slug inglesi in tutte le lingue).
  // /jumpstart-audit e /ai-automations sono usciti: next.config.mjs li reindirizza a /contact e /systems.
  systems: {
    hub: { en: "/systems", it: "/it/systems", pt: "/pt/systems" },
    marketing: { en: "/systems/marketing", it: "/it/systems/marketing", pt: "/pt/systems/marketing" },
    sales: { en: "/systems/sales", it: "/it/systems/sales", pt: "/pt/systems/sales" },
    support: { en: "/systems/support", it: "/it/systems/support", pt: "/pt/systems/support" },
    admin: { en: "/systems/admin", it: "/it/systems/admin", pt: "/pt/systems/admin" },
    hr: { en: "/systems/hr", it: "/it/systems/hr", pt: "/pt/systems/hr" },
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
