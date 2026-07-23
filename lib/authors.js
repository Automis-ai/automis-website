/*
  Author registry for the blog.
  A post's `author` frontmatter is looked up here (case-insensitive, by id).
  To add a real author: drop a headshot in /public/assets/images/authors/,
  add an entry below, and set `author: "<id>"` in the post frontmatter.
*/
const AUTHORS = {
  arcangelo: {
    name: "Arcangelo Bianco",
    role: "Founder, Automis",
    avatar: "/assets/images/authors/arcangelo.jpg",
    linkedin: "https://www.linkedin.com/in/arcangelo-bianco/",
    bio: "Founder of Automis. Builds the AI systems local businesses are missing, across marketing, sales and operations.",
  },
  luca: {
    name: "Luca",
    role: "Co-founder, Automis",
    avatar: "/assets/images/authors/luca.jpg",
    linkedin: "",
    bio: "Co-founder of Automis, focused on the automation and content systems behind every client build.",
  },
  // Fallback identity for legacy posts authored as the brand.
  automis: {
    name: "Automis Team",
    role: "Strategic AI Integrator",
    avatar: "/assets/images/logos/favicon.png",
    linkedin: "https://www.linkedin.com/company/automis-ai/",
    bio: "Automis builds the AI systems a business is missing, from AI voice agents to full marketing and operations automation.",
  },
};

const DEFAULT_AUTHOR = "automis";

/**
 * Resolve a post's author frontmatter to an author object.
 * Accepts an id ("arcangelo"), a display name ("Automis Team"),
 * or the legacy "automis.ai" string. Always returns a valid author.
 */
export function getAuthor(author) {
  if (!author) return AUTHORS[DEFAULT_AUTHOR];
  const key = String(author).toLowerCase().trim();

  if (AUTHORS[key]) return AUTHORS[key];
  // legacy value used across existing posts
  if (key === "automis.ai" || key === "automis team") return AUTHORS.automis;

  // try matching by display name
  const byName = Object.values(AUTHORS).find(
    (a) => a.name.toLowerCase() === key
  );
  return byName || AUTHORS[DEFAULT_AUTHOR];
}

export default AUTHORS;
