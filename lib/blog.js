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
