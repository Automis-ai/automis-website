"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localeFromPath, stripLangPrefix, addLangPrefix, isSingleLanguagePage } from "@/lib/locales";

const STORAGE_KEY = "automis_locale";

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

      // Un-prefixed page that exists in English ONLY (see lib/locales.js). The
      // auto-detect below would "correct" /playbook into /it/playbook, which does
      // not exist — the exact 404 that hit /luca-ig, and before it /ita and /pt.
      // Do nothing at all here, deliberately including the persistence step: this
      // visitor has not landed on a page that says anything about their language,
      // so let the next normal page auto-detect as usual.
      if (isSingleLanguagePage(pathname || "/")) return;

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
