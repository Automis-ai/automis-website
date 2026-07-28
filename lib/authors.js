/*
  Author registry for the blog. A post's `author` frontmatter is looked up
  here by id (case-insensitive). Data mirrors the About page founders.
  To add an author: add an entry and set `author: "<id>"` in the post.

  `socials` is an ordered array — an author can show more than one profile
  (e.g. LinkedIn + Instagram). The first entry is treated as the primary one
  and is what JSON-LD uses as the author's canonical URL.

  Authorship is assigned BY LANGUAGE (decided 2026-07-28):
    IT -> luca · EN + PT -> arcangelo
  The overnight engine's topic generator applies the same rule.
*/
const AUTHORS = {
  arcangelo: {
    name: "Arcangelo Bianco",
    role: "Co-founder, Automis AI",
    roleIt: "Co-fondatore, Automis AI",
    rolePt: "Co-fundador, Automis AI",
    avatar: "/assets/images/headshots/arcangelo.jpeg",
    socials: [
      { type: "instagram", url: "https://instagram.com/arcangelo.bianco_" },
    ],
    bio: "Co-founder of Automis. Audit-first AI automation: he maps where a business leaks time and money, then builds the custom agents and systems that fix it.",
    bioIt: "Co-fondatore di Automis. Automazione IA che parte dall'audit: individua dove un'azienda perde tempo e denaro e costruisce gli agenti e i sistemi su misura che lo risolvono.",
    bioPt: "Co-fundador da Automis. Automação com IA que começa pela auditoria: identifica onde um negócio está a perder tempo e dinheiro e constrói os agentes e sistemas à medida que resolvem o problema.",
  },
  luca: {
    name: "Vincenzo Luca Casillo",
    role: "Co-founder, Automis AI",
    roleIt: "Co-fondatore, Automis AI",
    rolePt: "Co-fundador, Automis AI",
    avatar: "/assets/images/headshots/luca.jpeg",
    socials: [
      { type: "linkedin", url: "https://www.linkedin.com/in/vincenzo-luca-casillo/" },
      { type: "instagram", url: "https://www.instagram.com/luca.automis/" },
    ],
    bio: "Co-founder of Automis. Runs AI-driven growth and marketing: paid acquisition, SEO and GEO, and conversion-first funnels that turn attention into booked demand.",
    bioIt: "Co-fondatore di Automis. Guida crescita e marketing con l'IA: acquisizione a pagamento, SEO e GEO e funnel orientati alla conversione che trasformano l'attenzione in domanda.",
    bioPt: "Co-fundador da Automis. Lidera o crescimento e o marketing com IA: aquisição paga, SEO e GEO e funis orientados à conversão que transformam atenção em procura agendada.",
  },
  // Fallback identity for legacy/brand-authored posts.
  automis: {
    name: "Automis Team",
    role: "Strategic AI Integrator",
    roleIt: "Integratore strategico di IA",
    rolePt: "Integrador estratégico de IA",
    avatar: "/assets/images/logos/favicon.png",
    socials: [
      { type: "instagram", url: "https://www.instagram.com/automis.ai/" },
    ],
    bio: "Automis builds the AI systems a business is missing, from AI voice agents to full marketing and operations automation.",
    bioIt: "Automis costruisce i sistemi di IA che mancano a un'azienda, dagli agenti vocali IA all'automazione completa di marketing e operations.",
    bioPt: "A Automis constrói os sistemas de IA que faltam a um negócio, desde agentes de voz com IA até à automação completa de marketing e operações.",
  },
};

const DEFAULT_AUTHOR = "automis";

/** Font Awesome brand-icon class per social type. */
export const SOCIAL_ICON = {
  linkedin: "fab fa-linkedin",
  instagram: "fab fa-instagram",
};

/** Human label per social type, for aria-labels. */
export const SOCIAL_LABEL = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
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

/** All renderable social links for an author (never null). */
export function getAuthorSocials(author) {
  return Array.isArray(author && author.socials) ? author.socials : [];
}

/** Localised role string for an author. */
export function getAuthorRole(author, locale = "en") {
  if (locale === "it") return author.roleIt || author.role;
  if (locale === "pt") return author.rolePt || author.role;
  return author.role;
}

/** Localised bio string for an author. */
export function getAuthorBio(author, locale = "en") {
  if (locale === "it") return author.bioIt || author.bio;
  if (locale === "pt") return author.bioPt || author.bio;
  return author.bio;
}

export default AUTHORS;
