import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = {
  en: path.join(process.cwd(), "content/blog/en"),
  it: path.join(process.cwd(), "content/blog/it"),
};

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
