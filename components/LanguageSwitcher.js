"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * LanguageSwitcher
 * - URL strategy:
 *   EN: /...
 *   IT: /it/...
 *
 * - Behavior:
 *   1) Detect active language from current pathname.
 *   2) Show a rounded pill toggle with flag + language + chevron.
 *   3) On selection:
 *      - Build the equivalent path for the target language
 *      - Persist preference in localStorage ("site_lang" = "en" | "it")
 *      - Navigate to the new path
 *      - If target path doesn't exist (optional), fallback to a parent section
 *
 * NOTE: Client-side can't truly know if a route exists without fetching.
 *       We implement a safe fallback strategy:
 *       - If translation is missing, we route to the closest "section root"
 *         (e.g., /it/use-cases -> /use-cases or /it -> /).
 */

const STORAGE_KEY = "automis_locale";

const LANGS = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "it", label: "IT", flag: "🇮🇹" },
];

/** Helpers */
function getActiveLangFromPath(pathname) {
  // If path starts with /it or is exactly /it => Italian, else English
  if (pathname === "/it" || pathname.startsWith("/it/")) return "it";
  return "en";
}

function stripLangPrefix(pathname) {
  // Convert /it/voice-ai -> /voice-ai, /it -> /
  if (pathname === "/it") return "/";
  if (pathname.startsWith("/it/")) return pathname.replace("/it", "");
  return pathname;
}

function addLangPrefix(pathnameNoLang, targetLang) {
  // Convert /voice-ai -> /it/voice-ai (for it), or keep /voice-ai (for en)
  // Ensure root stays clean: "/" -> "/it" (for it)
  if (targetLang === "it") {
    if (pathnameNoLang === "/") return "/it";
    return `/it${pathnameNoLang}`;
  }
  // EN
  return pathnameNoLang;
}

function getSectionFallback(pathnameNoLang) {
  // Optional fallback: if a specific page doesn't exist in target lang,
  // send user to the section root instead of a 404.
  //
  // Examples:
  //  - /use-cases/slug -> /use-cases
  //  - /blog/post/123 -> /blog
  //  - /voice-ai -> /voice-ai (already section root)
  //
  // You can customize these rules based on your site's structure.

  const parts = pathnameNoLang.split("/").filter(Boolean); // e.g. ["use-cases","slug"]
  if (parts.length <= 1) return pathnameNoLang === "" ? "/" : `/${parts.join("/")}`;

  // Known sections you may want to keep:
  const knownSections = new Set([
    "use-cases",
    "voice-ai",
    "ai-automations",
    "services",
    "about",
    "contact",
    "blog",
    "jumpstart-audit",
  ]);

  const first = parts[0];
  if (knownSections.has(first)) return `/${first}`;

  // Generic fallback: just go to "/"
  return "/";
}

/**
 * Optional: attempt to validate route existence
 * This is best-effort only and depends on your setup.
 * If you have pages returning 404, a HEAD request may work,
 * but with Next static export / routing this can be unreliable.
 *
 * We'll keep it OFF by default; enable if you want.
 */
async function routeSeemsToExist(url) {
  try {
    // Some deployments may not allow HEAD; GET is safer.
    // We use GET with `no-store` and check for 404.
    const res = await fetch(url, { method: "GET", cache: "no-store" });
    // If your app serves a 200 for custom 404 page, this won't help.
    return res.ok;
  } catch {
    return false;
  }
}

export default function LanguageSwitcher({
  className = "",
  align = "right", // "right" | "left"
  persist = true,
  autoDetectFirstVisit = false, // keep OFF unless you explicitly want it now
  validateRoute = false, // best-effort route existence check
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const activeLang = useMemo(() => getActiveLangFromPath(pathname || "/"), [pathname]);

  const active = LANGS.find((l) => l.code === activeLang) || LANGS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Optional: auto-detect on first visit
  useEffect(() => {
    if (!autoDetectFirstVisit) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "it") return; // user already chose

      const browserLang = (navigator.language || "").toLowerCase();
      const preferred = browserLang.startsWith("it") ? "it" : "en";

      if (persist) localStorage.setItem(STORAGE_KEY, preferred);

      // If user is currently on EN but preferred IT, redirect to /it equivalent (and vice versa)
      if (preferred !== activeLang) {
        const noLang = stripLangPrefix(pathname || "/");
        const target = addLangPrefix(noLang, preferred);
        router.replace(target);
      }
    } catch {
      // Ignore storage errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function switchTo(targetLang) {
    if (targetLang === activeLang) {
      setOpen(false);
      return;
    }

    const currentNoLang = stripLangPrefix(pathname || "/");
    let targetPath = addLangPrefix(currentNoLang, targetLang);

    // Persist choice
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, targetLang);
      } catch {
        // ignore
      }
    }

    // Optional: validate route existence; otherwise fallback to section root
    if (validateRoute) {
      const ok = await routeSeemsToExist(targetPath);
      if (!ok) {
        const fallbackNoLang = getSectionFallback(currentNoLang);
        targetPath = addLangPrefix(fallbackNoLang, targetLang);
      }
    }

    setOpen(false);
    router.push(targetPath);
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      {/* Toggle pill */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="
          inline-flex items-center gap-2
          rounded-full
          border border-blue-middle/30
          bg-blue-darkest/20
          px-4 py-2
          text-white/90
          hover:border-yellow-light/60
          hover:bg-blue-darkest/30
          transition-all
          font-montserrat
        "
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{active.flag}</span>
        <span className="text-sm font-semibold">{active.label}</span>
        <span
          className={`text-white/70 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className={`
            absolute z-50 mt-2 min-w-[140px]
            rounded-2xl
            border border-blue-middle/20
            bg-blue-darkest/90
            backdrop-blur-lg
            shadow-lg shadow-yellow-light/10
            overflow-hidden
            ${align === "left" ? "left-0" : "right-0"}
          `}
          role="menu"
        >
          {LANGS.map((lang) => {
            const isActive = lang.code === activeLang;
            return (
              <button
                key={lang.code}
                type="button"
                role="menuitem"
                onClick={() => switchTo(lang.code)}
                className={`
                  w-full text-left px-4 py-3
                  flex items-center gap-2
                  text-sm font-semibold
                  transition-all
                  ${isActive ? "text-yellow-light bg-yellow-light/10" : "text-white/90 hover:bg-white/5"}
                `}
              >
                <span className="text-base leading-none">{lang.flag}</span>
                <span>{lang.label}</span>
                {isActive && <span className="ml-auto text-xs text-yellow-light">●</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}