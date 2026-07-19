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

export function getLocaleFromPathname(pathname: string): Locale {
  for (const code of PREFIXED) {
    if (pathname === `/${code}` || pathname.startsWith(`/${code}/`)) return code;
  }
  return "en";
}

export function normalizePathname(pathname: string): string {
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
