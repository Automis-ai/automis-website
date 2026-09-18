/*
  Shared case-study data for the use-cases list + detail pages.
  Two live Automis clients. Both carry production figures, aggregates only:
  no caller, patient, contact or calendar data ever leaves the client's systems.
  Keep this the single source of truth for both /use-cases and /use-cases/[slug].

  A case with `longForm: true` has its own written page and is rendered by a
  dedicated component instead of the shared challenge/solution/results template,
  so it only needs the list-card fields here (see components/use-cases/clinica).

  Localization: each case carries an `it` (Italian) and `pt` (European
  Portuguese) object with the translated version of every user-facing field.
  Non-translatable logic keys (slug, client, shortClient, logo) stay
  language-neutral. Use getCases(locale) / getCase(slug, locale);
  localize() shallow-merges the matching locale object over the base object
  for locale === "it" or "pt".
*/

export const CASES = [
  {
    slug: "clinica-santa-maria",
    client: "Clínica Dentária Santa Maria dos Olivais",
    shortClient: "Clínica Santa Maria dos Olivais",
    industry: "Dental clinic",
    location: "Lisbon, Portugal",
    tag: "Voice AI receptionist",
    logo: "/assets/images/client-logos/clinica-santa-maria.png",
    // Written case study with production figures: rendered by ClinicaStory, not the template.
    longForm: true,
    summary:
      "872 calls in seven months, 527 closed without reaching the front desk and 114 appointments booked. What changed month by month, once the clinic started trusting it.",
    headline: "7 months on a dental clinic's phone line",
    metaDescription:
      "872 calls, 527 closed without reaching the front desk and 114 appointments: how a voice assistant answers the phone at a Lisbon dental clinic.",
    it: {
      industry: "Clinica dentale",
      location: "Lisbona, Portogallo",
      tag: "Segretaria IA",
      summary:
        "872 chiamate in sette mesi, 527 chiuse senza passare dalla segretaria e 114 appuntamenti presi. Cosa è cambiato mese per mese, da quando la clinica si è fidata.",
      headline: "7 mesi al telefono di una clinica dentale",
      metaDescription:
        "872 chiamate, 527 chiuse senza passare dalla segretaria e 114 appuntamenti: come un assistente vocale risponde al telefono di una clinica dentale a Lisbona.",
    },
    pt: {
      industry: "Clínica dentária",
      location: "Lisboa, Portugal",
      tag: "Assistente de voz IA",
      summary:
        "872 chamadas em sete meses, 527 resolvidas sem passar pela receção e 114 marcações. O que mudou mês a mês, desde que a clínica passou a confiar.",
      headline: "7 meses ao telefone de uma clínica dentária",
      metaDescription:
        "872 chamadas, 527 resolvidas sem passar pela receção e 114 marcações: como um assistente de voz atende o telefone de uma clínica dentária em Lisboa.",
    },
  },
  {
    slug: "adifesa",
    client: "Associazione ADifesa",
    shortClient: "ADifesa",
    industry: "Consumer-protection association",
    location: "Lissone, Italy",
    tag: "Meta automation",
    logo: "/assets/images/client-logos/adifesa.png",
    // Written case study with production figures: rendered by AdifesaStory, not the template.
    longForm: true,
    summary:
      "2,329 conversations across Facebook and Instagram comments and DMs in five months, and 524 complete records. Eight in ten of those become clients, according to the association.",
    headline: "Five months in the comments on Facebook and Instagram",
    metaDescription:
      "2,329 conversations and 524 complete records, 8 in 10 of which become clients: how an automation handles Facebook and Instagram comments and DMs.",
    it: {
      industry: "Associazione di tutela",
      location: "Lissone, Italia",
      tag: "Automazione Meta",
      summary:
        "2.329 conversazioni fra commenti e messaggi su Facebook e Instagram in cinque mesi, e 524 schede complete. Di quelle, secondo l'associazione, 8 su 10 diventano clienti.",
      headline: "Cinque mesi nei commenti di Facebook e Instagram",
      metaDescription:
        "2.329 conversazioni e 524 schede complete, di cui 8 su 10 diventano clienti: come un'automazione gestisce commenti e messaggi su Facebook e Instagram.",
    },
    pt: {
      industry: "Associação de defesa do consumidor",
      location: "Lissone, Itália",
      tag: "Automação Meta",
      summary:
        "2.329 conversas entre comentários e mensagens no Facebook e no Instagram em cinco meses, e 524 fichas completas. Dessas, segundo a associação, 8 em cada 10 tornam-se clientes.",
      headline: "Cinco meses nos comentários do Facebook e do Instagram",
      metaDescription:
        "2.329 conversas e 524 fichas completas, das quais 8 em cada 10 se tornam clientes: como uma automação trata comentários e mensagens no Facebook e no Instagram.",
    },
  },
];

function localize(c, locale) {
  if (locale === "it") return { ...c, ...c.it };
  if (locale === "pt") return { ...c, ...c.pt };
  return c;
}

export function getCases(locale) {
  return CASES.map((c) => localize(c, locale));
}

export function getCase(slug, locale) {
  const c = CASES.find((x) => x.slug === slug);
  return c ? localize(c, locale) : undefined;
}
