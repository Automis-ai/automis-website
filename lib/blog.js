import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = {
  en: path.join(process.cwd(), "content/blog/en"),
  it: path.join(process.cwd(), "content/blog/it"),
  pt: path.join(process.cwd(), "content/blog/pt"),
};

/** Public URL prefix for a locale's blog. EN is un-prefixed. */
export const BLOG_BASE_PATH = {
  en: "/blog",
  it: "/it/blog",
  pt: "/pt/blog",
};

export const BLOG_LOCALES = ["en", "it", "pt"];

/**
 * Get all posts for a given language, sorted newest first.
 * Returns frontmatter only (no body) — for listing pages.
 */
export function getAllPosts(lang = "en") {
  const dir = BLOG_DIR[lang];
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      const { data } = matter(raw);
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single post by slug and language.
 * Returns frontmatter + body markdown string.
 */
export function getPostBySlug(slug, lang = "en") {
  const dir = BLOG_DIR[lang];
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content: body } = matter(raw);
  return { slug, ...data, body };
}

/** True when a post file actually exists for this slug + language. */
export function postExists(slug, lang = "en") {
  const dir = BLOG_DIR[lang];
  if (!dir || !slug) return false;
  return fs.existsSync(path.join(dir, `${slug}.md`));
}

/**
 * Resolve which locales actually have a version of this post, and at which slug.
 *
 * Two ways a post is paired across languages:
 *   1. Same slug in the other language's folder (the common case).
 *   2. An explicit `translations:` frontmatter map, for pairs whose slugs
 *      legitimately differ per language (e.g. en/ai-receptionist-cost <->
 *      it/recupero-chiamate-perse). Native slugs beat translated ones for SEO,
 *      so we pair them explicitly rather than forcing slug parity.
 *
 * Returns e.g. { en: "ai-receptionist-cost", it: "recupero-chiamate-perse" }.
 * A locale is only ever included when the file is really on disk — this is what
 * keeps hreflang from advertising URLs that 404.
 */
export function getPostTranslations(slug, lang = "en") {
  const out = {};
  if (!postExists(slug, lang)) return out;
  out[lang] = slug;

  const post = getPostBySlug(slug, lang);
  const declared = (post && post.translations) || {};

  for (const code of BLOG_LOCALES) {
    if (code === lang) continue;
    // Explicit pairing wins, then fall back to a same-slug match.
    const candidate = declared[code] || slug;
    if (postExists(candidate, code)) out[code] = candidate;
  }
  return out;
}

/** hreflang code per locale. pt-PT is explicit so Google never reads it as pt-BR. */
const HREFLANG = { en: "en", it: "it-IT", pt: "pt-PT" };

const SITE = "https://automis.ai";

/** Absolute public URL for a post. */
export function blogPostUrl(slug, lang = "en") {
  return `${SITE}${BLOG_BASE_PATH[lang]}/${slug}`;
}

/**
 * Build the Next.js `alternates` block for an article.
 *
 * Only emits an hreflang for a language that REALLY has this post. Previously
 * every post declared a twin in every other language at the same slug, so
 * Google was handed URLs like /it/blog/ai-receptionist-cost that 404 — the
 * source of the 404s in Search Console. Slug parity across languages is not
 * guaranteed (each language is written natively, on its own night), so
 * existence has to be checked rather than assumed.
 */
export function buildBlogAlternates(slug, lang = "en") {
  const translations = getPostTranslations(slug, lang);
  const languages = {};
  for (const [code, translatedSlug] of Object.entries(translations)) {
    languages[HREFLANG[code]] = blogPostUrl(translatedSlug, code);
  }
  // x-default points at English when it exists, otherwise at this page.
  languages["x-default"] = translations.en
    ? blogPostUrl(translations.en, "en")
    : blogPostUrl(slug, lang);

  return {
    canonical: blogPostUrl(slug, lang),
    // A lone self-reference is noise; only ship hreflang for a real set.
    ...(Object.keys(translations).length > 1 ? { languages } : {}),
  };
}

/**
 * Slugify a heading into a URL-safe anchor id.
 * Used both for the in-body heading ids and the TOC links, so they match.
 */
export function slugifyHeading(text) {
  return String(text)
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Estimate reading time in whole minutes (~200 wpm), from a markdown body.
 */
export function readingTimeMinutes(body = "") {
  const words = String(body)
    .replace(/```[\s\S]*?```/g, " ") // drop code blocks
    .replace(/[#>*_`~\-\[\]()!]/g, " ") // drop markdown punctuation
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Extract an H2/H3 table of contents from a markdown body.
 * Skips headings inside fenced code blocks. Returns [{ level, text, id }].
 */
export function extractToc(body = "") {
  const withoutCode = String(body).replace(/```[\s\S]*?```/g, "");
  const lines = withoutCode.split("\n");
  const toc = [];
  for (const line of lines) {
    const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const level = m[1].length; // 2 or 3
    const text = m[2].replace(/[`*_~]/g, "").trim();
    toc.push({ level, text, id: slugifyHeading(text) });
  }
  return toc;
}

/**
 * Related posts for the end-of-article block.
 * Prefers same category/cluster, then fills with most recent, excludes self.
 */
export function getRelatedPosts(slug, lang = "en", limit = 3) {
  const all = getAllPosts(lang).filter((p) => p.slug !== slug);
  const current = getAllPosts(lang).find((p) => p.slug === slug);
  if (!current) return all.slice(0, limit);

  const sameTopic = all.filter(
    (p) =>
      (current.category && p.category === current.category) ||
      (current.cluster && p.cluster === current.cluster)
  );
  const rest = all.filter((p) => !sameTopic.includes(p));
  return [...sameTopic, ...rest].slice(0, limit);
}

/**
 * Get all slugs for a given language — used in generateStaticParams.
 */
export function getAllSlugs(lang = "en") {
  const dir = BLOG_DIR[lang];
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}
