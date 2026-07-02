"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const STORAGE_KEY = "automis_locale";

function stripLangPrefix(pathname) {
  if (pathname === "/it") return "/";
  if (pathname.startsWith("/it/")) return pathname.replace(/^\/it/, "");
  return pathname;
}

function addLangPrefix(pathnameNoLang, targetLang) {
  if (targetLang === "it") return pathnameNoLang === "/" ? "/it" : `/it${pathnameNoLang}`;
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

      const stored = localStorage.getItem(STORAGE_KEY);

      // 1) If user already chose, do nothing
      if (stored === "en" || stored === "it") return;

      // 2) First visit -> autodetect browser language
      const browserLang = (navigator.language || "").toLowerCase();
      const preferred = browserLang.startsWith("it") ? "it" : "en";

      localStorage.setItem(STORAGE_KEY, preferred);

      // 3) If current URL doesn't match preferred, redirect to equivalent
      const isIt = pathname === "/it" || pathname.startsWith("/it/");
      const currentLang = isIt ? "it" : "en";

      if (preferred !== currentLang) {
        const noLang = stripLangPrefix(pathname || "/");
        const target = addLangPrefix(noLang, preferred);
        router.replace(target);
      }
    } catch {
      // ignore
    }
  }, [pathname, router]);

  return null;
}