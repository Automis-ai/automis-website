/**
 * Single source of truth for the URL-level language model.
 *
 * Two separate pieces of code move visitors between languages, and until now each
 * kept its own copy of these rules:
 *   - LocaleBootstrapper — the AUTOMATIC redirect on first visit (browser language)
 *   - LanguageSwitcher   — the MANUAL flag toggle in the header
 *
 * Keeping the rules in two places is what made the same bug come back three times
 * (/ita, /it/pt, /it/luca-ig): a page was taught to the toggle but not to the
 * automatic redirect, so it looked fixed to anyone who already had a stored
 * preference, and 404'd for every genuinely new visitor. Both now import from here.
 */

/** Locales that live under a URL prefix. English is the un-prefixed root. */
export const PREFIXED = ["it", "pt"];

/**
 * Pages that exist in ONE language only.
 *
 * Keyed by first path segment, independent of any prefix, because the rule is the
 * same in both directions: there is no twin to switch TO, and no twin to redirect
 * INTO. Adding, swapping, or stripping a locale prefix on these lands on a 404.
 *
 * Add a page here whenever you ship a landing page in a single language.
 */
export const SINGLE_LANGUAGE_PAGES = new Set([
  "playbook", // EN only
  "consultation", // EN only (307 -> /jumpstart-audit)
  "roadmap", // EN only, transactional finder-results page
  "luca-ig", // IT only; canonical URL is /it/luca-ig (Instagram bio lander)
]);

/**
 * Il path PUBBLICO di una route interna.
 *
 * Il middleware serve il sito portoghese su /pt/* riscrivendo a /pt-site/*. Finche'
 * ogni pagina e' resa per-richiesta, usePathname() riporta il path del browser e la
 * cosa non si nota. Due casi in cui invece si nota, e sono entrambi reali:
 *
 *   - /pt-site/* e' raggiungibile direttamente e risponde 200 (verificato in
 *     produzione il 26/08/2026: /pt-site/about esce con <html lang="en">, cinque
 *     link di nav inglesi e i CTA di prenotazione di due mercati diversi);
 *   - con il rendering STATICO la pagina viene pre-generata dal path di ROUTE, non
 *     da quello del browser. Quell'HTML inglese diventerebbe quello servito anche
 *     su /pt/*, cioe' il difetto smetterebbe di essere un angolo e diventerebbe la
 *     versione ufficiale del sito portoghese.
 *
 * Sta qui e non copiata in ogni chiamante per il motivo scritto in cima al file:
 * due copie di una regola divergono, ed e' cosi' che lo stesso bug e' tornato tre volte.
 */
export function publicPath(pathname) {
  return (pathname || "/").replace(/^\/pt-site(?=\/|$)/, "/pt");
}

/** First path segment, e.g. "/blog/foo" -> "blog". */
export function firstSegment(pathname) {
  return (pathname || "/").split("/").filter(Boolean)[0] || "";
}

/** The locale a path belongs to, from its prefix. Un-prefixed means English. */
export function localeFromPath(pathname) {
  const p = publicPath(pathname);
  for (const code of PREFIXED) {
    if (p === `/${code}` || p.startsWith(`/${code}/`)) return code;
  }
  return "en";
}

/** "/it/voice-ai" -> "/voice-ai", "/pt" -> "/". Leaves un-prefixed paths alone. */
export function stripLangPrefix(pathname) {
  pathname = publicPath(pathname);
  for (const code of PREFIXED) {
    if (pathname === `/${code}`) return "/";
    if (pathname.startsWith(`/${code}/`)) return pathname.slice(code.length + 1);
  }
  return pathname;
}

/** "/voice-ai" -> "/it/voice-ai". English stays clean, and "/" -> "/it". */
export function addLangPrefix(pathnameNoLang, targetLang) {
  if (!PREFIXED.includes(targetLang)) return pathnameNoLang;
  return pathnameNoLang === "/" ? `/${targetLang}` : `/${targetLang}${pathnameNoLang}`;
}

/**
 * True when this path has no counterpart in any other language, so no automatic
 * redirect and no prefix-swap may touch it. Accepts a path with or without prefix.
 */
export function isSingleLanguagePage(pathname) {
  return SINGLE_LANGUAGE_PAGES.has(firstSegment(stripLangPrefix(pathname || "/")));
}

/**
 * Sections whose slugs are localised, so the same page has a DIFFERENT path per
 * language (/blog/<slug>, /tools/<slug>, /use-cases/<slug>). Swapping only the
 * prefix lands on a URL that does not exist.
 *
 * Lived in LanguageSwitcher.js until the switcher needed to publish real hrefs;
 * moved here rather than copied, for the reason stated at the top of this file.
 */
export const LOCALISED_SECTIONS = new Set(["blog", "tools", "use-cases"]);

/** True for a detail page inside a localised section, e.g. "/blog/<slug>". */
export function isLocalisedDetail(pathnameNoLang) {
  const parts = (pathnameNoLang || "/").split("/").filter(Boolean);
  return parts.length >= 2 && LOCALISED_SECTIONS.has(parts[0]);
}

/**
 * Where `pathname` should go in `targetLang` — computed with pure string work only,
 * so it is identical on the server and on the client.
 *
 * That constraint is the whole point. This is what goes in an <a href>, and an href
 * that differs between the two renders is a hydration mismatch: the crawler files one
 * destination and the reader is sent to another. The switcher still upgrades the
 * destination at click time by reading the page's own <link rel="alternate"> (which
 * knows about localised slugs), but that lookup needs the DOM and therefore cannot
 * decide the href.
 *
 * The three cases mirror, in order, the branches of switchTo():
 *   - a single-language page has no twin      -> the target language's home
 *   - a detail page under a localised section -> that section's index, never a
 *     prefix swap, which would publish a crawlable link to a 404
 *   - anything else                           -> the same path, re-prefixed
 */
export function resolveTarget(pathname, targetLang) {
  const noLang = stripLangPrefix(publicPath(pathname));
  const section = firstSegment(noLang);

  if (SINGLE_LANGUAGE_PAGES.has(section)) return addLangPrefix("/", targetLang);
  if (isLocalisedDetail(noLang)) return addLangPrefix(`/${section}`, targetLang);
  return addLangPrefix(noLang, targetLang);
}
