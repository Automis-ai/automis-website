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

/** First path segment, e.g. "/blog/foo" -> "blog". */
export function firstSegment(pathname) {
  return (pathname || "/").split("/").filter(Boolean)[0] || "";
}

/** The locale a path belongs to, from its prefix. Un-prefixed means English. */
export function localeFromPath(pathname) {
  for (const code of PREFIXED) {
    if (pathname === `/${code}` || pathname.startsWith(`/${code}/`)) return code;
  }
  return "en";
}

/** "/it/voice-ai" -> "/voice-ai", "/pt" -> "/". Leaves un-prefixed paths alone. */
export function stripLangPrefix(pathname) {
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
