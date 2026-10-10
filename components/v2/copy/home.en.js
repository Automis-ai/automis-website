/* Home v2 (EN). Sette sezioni, nell'ordine della §6 del brief:
   hero, proof, categories, how, cases, finder (il componente esistente porta i suoi testi), chiusura (founders, guarantee, faq, book).
   I percorsi dei link sono senza prefisso di lingua. */
export default {
  meta: {
    title: "Automis | AI Agency for Marketing, Sales and Admin Systems",
    description:
      "We listen to how your business works, then build the AI automation systems it is missing: marketing, sales, customer service, admin and HR.",
  },

  hero: {
    eyebrow: "AI agency",
    title: "We build the systems your business is missing.",
    highlight: ["systems"],
    lead: "First we listen to how you work. Then we build it around you, with systems already running for our clients.",
    cta: "Tell us about your business",
    ctaSecondary: "See real cases",
    call: {
      title: "Demo call",
      status: "Hear how it answers",
      play: "Play the call",
      pause: "Pause",
      replay: "Play the call again",
      agent: "Automis",
      caller: "Caller",
      transcript: "Read the conversation",
      note: "Demo with sample voices.",
      aria: "Demo call: a voice assistant books an appointment",
      lines: [
        "Automis, good evening. How can I help you?",
        "Good evening. I'd like to book an appointment.",
        "Of course. I have an opening on Thursday at ten thirty. Does that work for you?",
        "Yes, that's perfect.",
        "Great. I've just sent you a text with the confirmation. Anything else?",
        "No, thank you so much.",
        "You're welcome. Have a wonderful evening!",
      ],
    },
  },

  proof: {
    label: "Already at work for",
    figure: "872",
    figureLabel: "calls answered by a voice assistant at a Lisbon dental clinic, in seven months",
  },

  categories: {
    title: "Systems for every part of your business",
    lead: "Start from the area where you lose the most time.",
    items: [
      { slug: "marketing", title: "Marketing systems" },
      { slug: "sales", title: "Sales systems" },
      { slug: "support", title: "Customer service systems" },
      { slug: "admin", title: "Admin systems" },
      { slug: "hr", title: "HR systems" },
    ],
    cta: "See all systems",
  },

  how: {
    title: "How we work",
    steps: [
      { title: "Listen and diagnose", line: "We learn how you work and where time leaks." },
      { title: "Design and launch", line: "We build it around you. You test it first." },
      { title: "Run and improve", line: "We monitor it and improve it every month." },
    ],
    cta: "See how we work",
  },

  cases: {
    title: "Systems already at work",
    items: [
      {
        slug: "clinica-santa-maria",
        client: "Clínica Santa Maria dos Olivais",
        tag: "Voice AI receptionist",
        system: "A voice assistant answers and books appointments.",
        figure: "872",
        figureLabel: "calls in seven months",
        cta: "Read the case",
        href: "/use-cases/clinica-santa-maria",
      },
      {
        slug: "adifesa",
        client: "ADifesa",
        tag: "Meta automation",
        system: "An automation answers on Facebook and Instagram and collects each person's details.",
        figure: "2,329",
        figureLabel: "conversations in five months",
        cta: "Read the case",
        href: "/use-cases/adifesa",
      },
    ],
    all: "All case studies",
  },


  founders: {
    title: "Two founders, hands-on with your build",
    line: "The people who design your system are the people who build it.",
    items: [
      { name: "Vincenzo Luca Casillo", role: "AI-driven growth and marketing" },
      { name: "Arcangelo Bianco", role: "AI automation and audit" },
    ],
  },

  guarantee: {
    title: "Our guarantee",
    line: "A 30-day performance guarantee on every Voice AI plan.",
  },

  faq: {
    title: "Straight answers",
    items: [
      {
        q: "How fast can we go live?",
        a: "Voice AI and simple automations go live in about 7 days. Complex systems get a timeline we agree with you before anything starts.",
      },
      {
        q: "How much does it cost?",
        a: "Voice AI starts from €297/month. Everything else is quoted after we have heard how your business works, because we build around your processes, not a standard package.",
      },
      {
        q: "Is my data safe?",
        a: "We work GDPR-first. Data can be stored on EU servers, sensitive cases go to a person, and before we start we tell you which providers process what, and where.",
      },
      {
        q: "Do I need technical staff?",
        a: "No. We build, launch and maintain the system, and you use it. What we deliver is yours, not a black box you rent.",
      },
      {
        q: "What happens after launch?",
        a: "We don't disappear. Every month we check how the system performs and improve it, with a person overseeing the result.",
      },
      {
        q: "What if it doesn't work for us?",
        a: "Every Voice AI plan has a 30-day performance guarantee, and custom projects with a setup fee come with a refund of it. We take the risk of the first step.",
      },
    ],
  },

  book: {
    title: "Tell us how your business works",
    lead: "Thirty minutes, no obligation. We listen, then tell you where we would start.",
  },
};
