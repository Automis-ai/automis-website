import { addLangPrefix } from "../locales.js";

const ORIGIN = "https://automis.ai";

// hreflang emessi per lingua. Deve restare identico a HREFLANG di lib/blog.js e di
// components/LanguageSwitcher.js (che legge questi <link rel="alternate"> per trovare il gemello).
const HREFLANG = { en: "en", it: "it-IT", pt: "pt-PT" };
const OG_LOCALE = { en: "en_US", it: "it_IT", pt: "pt_PT" };
const DEFAULT_OG_IMAGE = "/assets/og/home-en.png";

/** URL assoluto di `path` (senza prefisso di lingua) nella lingua `lang`. "/" in EN resta "https://automis.ai/". */
function absoluteUrl(path, lang) {
  const prefixed = addLangPrefix(path, lang);
  return prefixed === "/" ? `${ORIGIN}/` : `${ORIGIN}${prefixed}`;
}

/**
 * Metadati Next di una pagina del sito v2: canonical, hreflang reciproci e Open Graph.
 * Lo schema e' identico a quello di app/about/page.js, app/it/about/page.js e
 * app/pt-site/about/page.js: inglese senza prefisso, it-IT su /it, pt-PT su /pt,
 * x-default sull'inglese. Una funzione sola per i cinque costruttori di pagine, cosi'
 * nessuno riscrive a mano un URL (e nessuno sbaglia un prefisso).
 *
 * Uso, in `app/<rotta>/page.js` (en), `app/it/<rotta>/page.js` (it) e
 * `app/pt-site/<rotta>/page.js` (pt):
 *
 *   import { buildMetadata } from "@/lib/v2/meta";
 *   export const metadata = buildMetadata({
 *     path: "/systems/marketing",   // percorso SENZA prefisso di lingua; "/" per la home
 *     lang: "it",                   // "en" | "it" | "pt": la lingua di QUESTA pagina
 *     title: "…",                   // titolo completo: il layout non aggiunge suffissi
 *     description: "…",
 *   });
 *
 * Opzioni:
 *   - `twins`: { en?, it?, pt? } percorsi senza prefisso per le pagine il cui slug cambia
 *     per lingua (es. un caso studio con slug diversi). Chi manca in `twins` usa `path`.
 *   - `languages`: array delle lingue in cui la pagina esiste davvero (default tutte e tre).
 *     Una pagina in una sola lingua passa `languages: ["it"]`: niente hreflang verso gemelli
 *     che non esistono, niente x-default su una pagina che non e' inglese.
 *   - `ogTitle`, `ogDescription`: se l'anteprima social deve dire altro dal titolo SEO.
 *   - `ogImage`: percorso di un'immagine 1200x630 (default /assets/og/home-en.png).
 *   - `ogAlt`: testo alternativo dell'immagine (default: il titolo).
 *   - `keywords`: array di parole chiave.
 *   - `noindex`: true per le pagine da non indicizzare.
 *
 * @param {object} args
 * @param {string} args.path
 * @param {"en"|"it"|"pt"} args.lang
 * @param {string} args.title
 * @param {string} args.description
 * @param {{en?: string, it?: string, pt?: string}} [args.twins]
 * @param {Array<"en"|"it"|"pt">} [args.languages]
 * @param {string} [args.ogTitle]
 * @param {string} [args.ogDescription]
 * @param {string} [args.ogImage]
 * @param {string} [args.ogAlt]
 * @param {string[]} [args.keywords]
 * @param {boolean} [args.noindex]
 * @returns {import("next").Metadata}
 */
export function buildMetadata({
  path,
  lang,
  title,
  description,
  twins = {},
  languages = ["en", "it", "pt"],
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogAlt,
  keywords,
  noindex = false,
}) {
  if (!HREFLANG[lang]) throw new Error(`buildMetadata: lingua non valida "${lang}" (en | it | pt)`);
  if (!path || !path.startsWith("/")) throw new Error(`buildMetadata: path deve iniziare con "/" (ricevuto "${path}")`);

  const pathFor = (code) => twins[code] || path;
  const canonical = absoluteUrl(pathFor(lang), lang);

  const alternates = { canonical };
  // Un gemello solo non ha senso: hreflang si dichiara fra due o piu' versioni.
  if (languages.length > 1) {
    const map = {};
    for (const code of languages) map[HREFLANG[code]] = absoluteUrl(pathFor(code), code);
    if (languages.includes("en")) map["x-default"] = map.en;
    alternates.languages = map;
  }

  const shareTitle = ogTitle || title;
  const shareDescription = ogDescription || description;

  const metadata = {
    title,
    description,
    alternates,
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      url: canonical,
      siteName: "Automis",
      locale: OG_LOCALE[lang],
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: ogAlt || shareTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      images: [ogImage],
    },
  };
  if (keywords && keywords.length) metadata.keywords = keywords;
  if (noindex) metadata.robots = { index: false, follow: false };
  return metadata;
}
