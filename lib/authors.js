/*
  Author registry for the blog. A post's `author` frontmatter is looked up
  here by id (case-insensitive). Data mirrors the About page founders.
  To add an author: add an entry and set `author: "<id>"` in the post.
*/
const AUTHORS = {
  arcangelo: {
    name: "Arcangelo Bianco",
    role: "AI Automation & Audit · Automis",
    roleIt: "Automazione IA e audit · Automis",
    avatar: "/assets/images/headshots/arcangelo.jpeg",
    social: { type: "instagram", url: "https://instagram.com/arcangelobianco.ai" },
    bio: "Co-founder of Automis. Audit-first AI automation: he maps where a business leaks time and money, then builds the custom agents and systems that fix it.",
    bioIt: "Co-fondatore di Automis. Automazione IA che parte dall'audit: individua dove un'azienda perde tempo e denaro e costruisce gli agenti e i sistemi su misura che lo risolvono.",
  },
  luca: {
    name: "Vincenzo Luca Casillo",
    role: "AI-Driven Growth & Marketing · Automis",
    roleIt: "Crescita e marketing guidati dall'IA · Automis",
    avatar: "/assets/images/headshots/luca.jpeg",
    social: { type: "linkedin", url: "https://www.linkedin.com/in/vincenzo-luca-casillo/" },
    bio: "Co-founder of Automis. Runs AI-driven growth and marketing: paid acquisition, SEO and GEO, and conversion-first funnels that turn attention into booked demand.",
    bioIt: "Co-fondatore di Automis. Guida crescita e marketing con l'IA: acquisizione a pagamento, SEO e GEO e funnel orientati alla conversione che trasformano l'attenzione in domanda.",
  },
  // Fallback identity for legacy/brand-authored posts.
  automis: {
    name: "Automis Team",
    role: "Strategic AI Integrator",
    roleIt: "Integratore strategico di IA",
    avatar: "/assets/images/logos/favicon.png",
    social: { type: "instagram", url: "https://www.instagram.com/automis.ai/" },
    bio: "Automis builds the AI systems a business is missing, from AI voice agents to full marketing and operations automation.",
    bioIt: "Automis costruisce i sistemi di IA che mancano a un'azienda, dagli agenti vocali IA all'automazione completa di marketing e operations.",
  },
};

const DEFAULT_AUTHOR = "automis";

/** Font Awesome brand-icon class per social type. */
export const SOCIAL_ICON = {
  linkedin: "fab fa-linkedin",
  instagram: "fab fa-instagram",
};

/**
 * Resolve a post's author frontmatter to an author object.
 * Accepts an id ("arcangelo"), a display name, or the legacy "automis.ai".
 * Always returns a valid author.
 */
export function getAuthor(author) {
  if (!author) return AUTHORS[DEFAULT_AUTHOR];
  const key = String(author).toLowerCase().trim();

  if (AUTHORS[key]) return AUTHORS[key];
  if (key === "automis.ai" || key === "automis team") return AUTHORS.automis;
  if (key.includes("arcangelo")) return AUTHORS.arcangelo;
  if (key.includes("luca") || key.includes("casillo")) return AUTHORS.luca;

  const byName = Object.values(AUTHORS).find(
    (a) => a.name.toLowerCase() === key
  );
  return byName || AUTHORS[DEFAULT_AUTHOR];
}

export default AUTHORS;
