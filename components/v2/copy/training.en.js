/* Formazione (EN). Contenuto deciso da Luca il 10/10: come integrare Claude o ChatGPT nei flussi
   di lavoro dell'azienda (agenti, second brain), oppure, più semplicemente, come usare l'IA nei
   processi di tutti i giorni. Nessun prezzo; formato e durata non decisi, quindi non scritti.
   In fondo, la sezione breve sulla conformità: art. 4 del Regolamento (UE) 2024/1689 NEL TESTO
   IN VIGORE, cioè come sostituito dal Regolamento (UE) 2026/1744 (in vigore dal 27/7/2026).
   Il testo originale del 2024 («ensure a sufficient level») non vale più. */
export default {
  meta: {
    title: "AI Training for Teams: Claude and ChatGPT at Work | Automis",
    description:
      "Practical training on using Claude or ChatGPT in your company's daily work, from simple everyday uses to agents and a second brain.",
  },

  hero: {
    eyebrow: "Training",
    title: "Make AI part of how your company works",
    lead: "Practical training on using Claude or ChatGPT in your daily work, from simple everyday uses to agents and a second brain.",
    map: {
      ariaLabel: "From everyday uses to your company's workflows",
      from: {
        label: "Every day",
        chips: ["Writing", "Summarizing", "Searching", "Preparing documents"],
      },
      to: {
        label: "In company workflows",
        chips: ["Agents", "Second brain"],
      },
    },
  },

  paths: {
    title: "Two ways in",
    moreLabel: "What we cover",
    items: [
      {
        id: "everyday",
        title: "AI in your everyday work",
        line: "Simple ways to use Claude or ChatGPT in the tasks you repeat every day.",
        more: "Writing, summarizing, searching, preparing documents. We start from your own tasks, not from a tour of the tool.",
      },
      {
        id: "workflows",
        title: "AI in your company's workflows",
        line: "Bring Claude or ChatGPT into your processes, as agents and as a second brain.",
        more: "How to give an assistant your company's documents and tools, what it can do on its own, and where a person checks.",
      },
    ],
  },

  audience: {
    title: "Who it is for",
    items: [
      "Owners who want to know where AI actually helps.",
      "Teams that already use ChatGPT or Claude and want to use it better.",
      "Companies that want AI inside their processes, with clear rules.",
    ],
  },

  compliance: {
    eyebrow: "AI Act",
    badge: "Article 4",
    moreLabel: "What the article says",
    title: "We bring you in line with the AI rules",
    line: "Article 4 of the EU AI Act asks companies that use AI to support the AI literacy of their staff. Training is one way to do that.",
    more: "Providers and deployers of AI systems take measures to support the development of AI literacy of their staff and of other people who use AI systems on their behalf, taking into account technical knowledge, experience, education and training, the context of use and the people the systems are used on. It does not require anyone to guarantee a specific level of AI literacy. This is the text in force since 27 July 2026, introduced by Regulation (EU) 2026/1744. General information, not legal advice.",
    sourceLabel: "Read the Regulation on EUR-Lex",
    sourceHref: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng",
  },

  cta: {
    title: "What would your team do with AI?",
    line: "Tell us about your team and the work it does every day.",
    button: "Tell us about your team",
  },
};
