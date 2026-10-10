"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { addLangPrefix, localeFromPath, resolveTarget } from "@/lib/locales";

/**
 * LanguageSwitcher
 *
 * Tre link <a href> sempre visibili (EN · IT · PT), non un menu a tendina: ogni
 * lingua e' un indirizzo vero che sta nell'HTML servito, quindi Google lo segue
 * e il lettore lo apre anche con il tasto centrale o cmd-click.
 *
 * - Dove porta ogni link lo decide lib/locales.js (resolveTarget), l'unica fonte
 *   delle regole di percorso. Lo stesso calcolo gira sul server e sul client, cosi'
 *   l'href non cambia fra i due render (niente mismatch di idratazione).
 * - Dopo il mount, se la pagina dichiara il proprio gemello con
 *   <link rel="alternate" hreflang>, l'href passa a quello: e' l'unica fonte che
 *   conosce gli slug tradotti (/tools/whatsapp-link-generator ->
 *   /it/tools/generatore-link-whatsapp, non /it/tools).
 * - Il clic semplice salva la scelta in localStorage ("automis_locale") e naviga
 *   col router; i clic "altrove" (cmd, ctrl, shift, tasto centrale) seguono l'href.
 */

const STORAGE_KEY = "automis_locale";

const LANGS = [
  { code: "en", label: "EN", name: "English", hreflang: "en" },
  { code: "it", label: "IT", name: "Italiano", hreflang: "it-IT" },
  { code: "pt", label: "PT", name: "Português", hreflang: "pt-PT" },
];

/**
 * La traduzione che la pagina stessa dichiara per `targetLang`, o null.
 * Le pagine emettono <link rel="alternate" hreflang> solo per i gemelli che esistono.
 */
function declaredTranslation(hreflang) {
  if (typeof document === "undefined") return null;
  const link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!link || !link.href) return null;
  try {
    // Resta un percorso della stessa origine, cosi' lo gestisce il router.
    return new URL(link.href).pathname;
  } catch {
    return null;
  }
}

/**
 * Gemelli noti già sul server. Dove lo slug cambia per lingua (casi studio, blog, tools) resolveTarget
 * può solo puntare all'indice della sezione: la pagina che conosce i propri gemelli li dichiara qui, così
 * l'HTML servito ha già l'indirizzo giusto anche per chi non esegue JavaScript.
 */
const LangTwinsContext = createContext({});

/**
 * Avvolge una pagina il cui percorso (senza prefisso di lingua) è lo stesso in tutte le lingue ma sta
 * sotto una sezione con slug localizzati. Uso: <LangTwins path="/use-cases/adifesa">…</LangTwins>.
 */
export function LangTwins({ path, children }) {
  const value = useMemo(
    () => ({ en: addLangPrefix(path, "en"), it: addLangPrefix(path, "it"), pt: addLangPrefix(path, "pt") }),
    [path]
  );
  return <LangTwinsContext.Provider value={value}>{children}</LangTwinsContext.Provider>;
}

/**
 * Le destinazioni che la pagina dichiara per ogni lingua (<link rel="alternate" hreflang>), lette DOPO il
 * mount: il primo render (server e client) deve restare quello puro di resolveTarget, o quello dei gemelli
 * dichiarati da <LangTwins>. Le usano il selettore del menu e i link di lingua del piede, così portano
 * alla stessa pagina nell'altra lingua.
 */
export function useDeclaredHrefs(pathname) {
  const twins = useContext(LangTwinsContext);
  const [declared, setDeclaredHrefs] = useState({});

  useEffect(() => {
    const next = {};
    for (const lang of LANGS) {
      const declared = declaredTranslation(lang.hreflang);
      if (declared) next[lang.code] = declared;
    }
    setDeclaredHrefs(next);
  }, [pathname]);

  return useMemo(() => ({ ...twins, ...declared }), [twins, declared]);
}

export default function LanguageSwitcher({
  className = "",
  persist = true,
  label = "Language",
}) {
  const pathname = usePathname();
  const router = useRouter();
  const declaredHrefs = useDeclaredHrefs(pathname);

  const activeLang = useMemo(() => localeFromPath(pathname || "/"), [pathname]);

  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] p-0.5 ${className}`}
    >
      {LANGS.map((lang) => {
        const isActive = lang.code === activeLang;
        const href = declaredHrefs[lang.code] || resolveTarget(pathname || "/", lang.code);
        return (
          <a
            key={lang.code}
            href={href}
            hrefLang={lang.hreflang}
            lang={lang.code}
            title={lang.name}
            aria-label={lang.name}
            aria-current={isActive ? "true" : undefined}
            onClick={(e) => {
              // Cmd/ctrl-click, shift-click e tasto centrale aprono altrove: restano
              // quelli del browser, ora che e' un link vero.
              if (
                e.metaKey ||
                e.ctrlKey ||
                e.shiftKey ||
                e.altKey ||
                (typeof e.button === "number" && e.button !== 0)
              ) {
                return;
              }
              e.preventDefault();
              if (isActive) return;
              if (persist) {
                try {
                  localStorage.setItem(STORAGE_KEY, lang.code);
                } catch {
                  // ignora: localStorage puo' essere bloccato
                }
              }
              router.push(href);
            }}
            className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full px-2 text-[13px] font-semibold tracking-wide no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3C91E6] ${
              isActive
                ? "bg-[#3C91E6] text-[#00121f]"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            {lang.label}
          </a>
        );
      })}
    </div>
  );
}
