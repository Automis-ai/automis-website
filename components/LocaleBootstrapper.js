"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "automis_locale";
// Prefixed locales (English is the un-prefixed root). Keep in sync with the
// LanguageSwitcher / pathnames helpers. NOTE: "pt" MUST be here — otherwise this
// bootstrapper treats /pt as English, and on an Italian/English browser it
// "corrects" it by prepending the browser locale, producing /it/pt -> 404.
const PREFIXED = ["it", "pt"];

function localeFromPath(pathname) {
  for (const code of PREFIXED) {
    if (pathname === `/${code}` || pathname.startsWith(`/${code}/`)) return code;
  }
  return "en";
}

function stripLangPrefix(pathname) {
  for (const code of PREFIXED) {
    if (pathname === `/${code}`) return "/";
    if (pathname.startsWith(`/${code}/`)) return pathname.slice(code.length + 1);
  }
  return pathname;
}

function addLangPrefix(pathnameNoLang, targetLang) {
  if (PREFIXED.includes(targetLang)) {
    return pathnameNoLang === "/" ? `/${targetLang}` : `/${targetLang}${pathnameNoLang}`;
  }
  return pathnameNoLang;
}

export default function LocaleBootstrapper() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    try {
      // La landing VoiceAI (voice.automis.ai, path /ita) NON segue il modello
      // EN="/…" / IT="/it/…". Trattarla qui la fa leggere come "inglese" e, su un
      // browser italiano al primo accesso, produce un redirect a /it/ita -> 404.
      // La escludiamo del tutto: su voice host e su /ita non deve fare nulla.
      if (typeof window !== "undefined" && window.location.hostname === "voice.automis.ai") return;
      if (pathname === "/ita" || pathname.startsWith("/ita/")) return;

      // Explicit override: ?lang=en|it|pt forces the choice and skips the auto
      // language redirect.
      const override = new URLSearchParams(window.location.search).get("lang");
      if (override === "en" || override === "it" || override === "pt") {
        localStorage.setItem(STORAGE_KEY, override);
        return;
      }

      // If the visitor is already on a locale-prefixed page (/it or /pt), THAT is
      // their choice (a shared link, or the language toggle which pushes /pt before
      // this runs). Persist it and never redirect away — this is what prevented the
      // /it/pt bounce. Only un-prefixed (English) pages trigger auto-detect below.
      const currentLang = localeFromPath(pathname || "/");
      if (currentLang !== "en") {
        localStorage.setItem(STORAGE_KEY, currentLang);
        return;
      }

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "it" || stored === "pt") return;

      // First visit on an English page -> autodetect browser language.
      const browserLang = (navigator.language || "").toLowerCase();
      const preferred = browserLang.startsWith("it")
        ? "it"
        : browserLang.startsWith("pt")
        ? "pt"
        : "en";
      localStorage.setItem(STORAGE_KEY, preferred);

      if (preferred !== "en") {
        const noLang = stripLangPrefix(pathname || "/");
        router.replace(addLangPrefix(noLang, preferred));
      }
    } catch {
      // ignore
    }
  }, [pathname, router]);

  return null;
}
