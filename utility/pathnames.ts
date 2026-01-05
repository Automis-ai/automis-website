// utility/pathnames.ts

export type Locale = "en" | "it";

export const PATHNAMES = {
  home: {
    en: "/",
    it: "/it",
  },

  pages: {
    about: {
      en: "/about",
      it: "/it/about",
    },
    blog: {
      en: "/blog",
      it: "/it/blog",
    },
    contact: {
      en: "/contact",
      it: "/it/contact",
    },
    useCases: {
      en: "/use-cases",
      it: "/it/use-cases",
    },
    jumpstartAudit: {
      en: "/jumpstart-audit",
      it: "/it/jumpstart-audit",
    },
    termsOfService: {
      en: "/terms-of-service",
      it: "/it/terms-of-service",
    },
    privacyPolicy: {
      en: "/privacy-policy",
      it: "/it/privacy-policy",
    },
  },

  services: {
    paidAds: {
      en: "/paid-ads-management",
      it: "/it/paid-ads-management",
    },
    voiceAI: {
      en: "/voice-ai",
      it: "/it/voice-ai",
    },
    aiAutomations: {
      en: "/ai-automations",
      it: "/it/ai-automations",
    },
  },
} as const;

type LocalizedPath = { en: string; it: string };

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/it" || pathname.startsWith("/it/") ? "it" : "en";
}

export function normalizePathname(pathname: string): string {
  if (pathname === "/it") return "/";
  if (pathname.startsWith("/it/")) return pathname.replace("/it", "");
  return pathname;
}

/**
 * Preferisci passare direttamente PATHNAMES.pages.about (ecc.)
 * invece di stringhe, così hai autocomplete e zero typo.
 */
export function hrefFor(path: LocalizedPath, locale: Locale): string {
  return path[locale] ?? "/";
}