"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SINGLE_LANGUAGE_PAGES,
  firstSegment,
  localeFromPath,
  stripLangPrefix,
  addLangPrefix,
  isLocalisedDetail,
  resolveTarget,
} from "@/lib/locales";

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
  { code: "pt", label: "PT", flag: "🇵🇹" },
];

// The prefix list and the path helpers (localeFromPath, stripLangPrefix,
// addLangPrefix) now live in lib/locales.js, shared with LocaleBootstrapper.
// Keeping a second copy here is what let the two drift apart. Keep LANGS in sync
// with PREFIXED there.

/** hreflang code emitted per locale (must match lib/blog.js HREFLANG). */
const HREFLANG = { en: "en", it: "it-IT", pt: "pt-PT" };

/**
 * The translation this page itself declares for `targetLang`, or null.
 *
 * Pages render <link rel="alternate" hreflang> for their real translations, and
 * (since the hreflang fix in lib/blog.js) only for translations that actually
 * exist. So the page is the authority on where its twin lives, and reading it
 * beats reconstructing a URL: it gets localised slugs right for free
 * (/tools/missed-call-revenue-calculator -> /it/tools/calcolatore-chiamate-perse),
 * which a prefix swap turns into a 404.
 */
function declaredTranslation(targetLang) {
  if (typeof document === "undefined") return null;
  const code = HREFLANG[targetLang] || targetLang;
  const link = document.querySelector(
    `link[rel="alternate"][hreflang="${code}"]`
  );
  if (!link || !link.href) return null;
  try {
    // Keep it a same-origin path so the client router handles it.
    return new URL(link.href).pathname;
  } catch {
    return null;
  }
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

  // Destinazioni dichiarate dalla pagina stessa (<link rel="alternate" hreflang>),
  // riempite DOPO il mount. Il primo render - server e client - deve restare quello
  // puro di resolveTarget, altrimenti e' un mismatch di idratazione; ma lasciare
  // l'href fermo li' faceva divergere i gesti fra loro. Su
  // /tools/whatsapp-link-generator il click semplice passa da switchTo() e atterra
  // sulla traduzione vera, mentre cmd-click, shift-click e tasto centrale escono
  // prima del preventDefault e seguono l'href, cioe' /it/tools: stesso elemento,
  // due destinazioni. Riguarda le ~26 pagine che dichiarano un gemello reale.
  const [declaredHrefs, setDeclaredHrefs] = useState({});

  useEffect(() => {
    const next = {};
    for (const lang of LANGS) {
      const declared = declaredTranslation(lang.code);
      if (declared) next[lang.code] = declared;
    }
    setDeclaredHrefs(next);
  }, [pathname]);

  const activeLang = useMemo(() => localeFromPath(pathname || "/"), [pathname]);

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
      if (stored === "en" || stored === "it" || stored === "pt") return; // user already chose

      const browserLang = (navigator.language || "").toLowerCase();
      const preferred = browserLang.startsWith("it")
        ? "it"
        : browserLang.startsWith("pt")
        ? "pt"
        : "en";

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

    // Prefer what the page itself declares — it is the only source that knows
    // about localised slugs and missing translations.
    const declared = declaredTranslation(targetLang);
    if (declared) {
      setOpen(false);
      router.push(declared);
      return;
    }

    // No declared twin. Anything below here would be a guess, so only guess
    // where a guess is safe.
    const section = firstSegment(currentNoLang);

    // Single-language pages have nothing to switch to; send them to the home page
    // of the target language rather than a guaranteed 404. Works in both
    // directions: /playbook (EN only) and /it/luca-ig (IT only) alike, because
    // `section` is read after the prefix has been stripped.
    if (SINGLE_LANGUAGE_PAGES.has(section)) {
      setOpen(false);
      router.push(addLangPrefix("/", targetLang));
      return;
    }

    // A detail page in a localised section (an article, a tool) with no
    // declared twin: that translation does not exist. Go to the section index.
    if (isLocalisedDetail(currentNoLang)) {
      setOpen(false);
      router.push(addLangPrefix(`/${section}`, targetLang));
      return;
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

      {/* Dropdown.
          Rendered on every page, hidden with CSS rather than unmounted: as
          `{open && ...}` the three language links existed only after a click, so
          the served HTML carried no link at all to /it or /pt. Google read that
          literally — 21 of the 27 URLs it had "discovered but not indexed" were
          Italian or Portuguese pages nothing linked to. The menu behaves exactly
          as before; it is only its markup that is now always present. */}
      <div
        className={`
          absolute z-50 mt-2 min-w-[140px]
          rounded-2xl
          border border-blue-middle/20
          bg-blue-darkest/90
          backdrop-blur-lg
          shadow-lg shadow-yellow-light/10
          overflow-hidden
          ${open ? "" : "hidden"}
          ${align === "left" ? "left-0" : "right-0"}
        `}
        role="menu"
      >
        {LANGS.map((lang) => {
          const isActive = lang.code === activeLang;
          return (
            <a
              key={lang.code}
              role="menuitem"
              href={
                declaredHrefs[lang.code] || resolveTarget(pathname || "/", lang.code)
              }
              onClick={(e) => {
                // Let the browser do its job for the gestures that mean "not here":
                // cmd/ctrl-click, shift-click, middle-click all open elsewhere and
                // must keep working now that this is a real link.
                if (
                  e.metaKey ||
                  e.ctrlKey ||
                  e.shiftKey ||
                  e.altKey ||
                  (typeof e.button === "number" && e.button !== 0)
                ) {
                  return;
                }
                // A plain click keeps the richer client path: it persists the
                // preference and reads the page's own hreflang, which knows the
                // localised slug the href cannot (/tools/whatsapp-link-generator
                // -> /it/tools/generatore-link-whatsapp, not /it/tools).
                e.preventDefault();
                switchTo(lang.code);
              }}
              onKeyDown={(e) => {
                // Un <a> si attiva solo con Enter; il <button> che c'era prima
                // rispondeva anche alla barra spaziatrice, e dentro un role="menu"
                // NVDA e JAWS passano lo Spazio all'elemento invece di scrollare.
                // Senza questo, da tastiera la voce sembra morta.
                if (e.key !== " " && e.key !== "Spacebar") return;
                e.preventDefault();
                switchTo(lang.code);
              }}
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
            </a>
          );
        })}
      </div>
    </div>
  );
}