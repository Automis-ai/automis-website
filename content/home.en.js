/*
 * English homepage copy dictionary.
 * Locale-agnostic section components read from this object, so the Italian
 * main site can ship the same design by supplying content/home.it.js.
 *
 * Brand rule: no em/en dashes in copy. Use commas, "and", or parentheses.
 * Numbers here are conservative, believable estimates (approved direction),
 * not audited client figures.
 */

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const home = {
  bookingUrl: BOOKING_URL,

  meta: {
    title: "Automis - Strategic AI Integrator",
    description:
      "Automis builds the AI system your business is missing. From voice agents that answer every call to the internal brain that runs your operations, we find where you lose time and money and automate it end to end. You own the system.",
  },

  hero: {
    eyebrow: "Strategic AI Integrator",
    titleLead: "We build the AI system",
    titleAccent: "your business is missing.",
    subhead:
      "From voice agents that answer every call to the internal brain that runs your operations, we find where you lose time and money and automate it end to end. You own the system.",
    primaryCta: { label: "Book a discovery call", href: BOOKING_URL },
    secondaryCta: { label: "See how it works", href: "#how-we-work" },
    trustLabel: "Trusted by clinics, agencies, and firms across Europe",
    // Node-graph labels — the interactive "system" visual.
    graph: {
      core: "Automis Core",
      pillars: [
        { key: "marketing", label: "Marketing", satellites: ["Ads", "SEO / GEO"] },
        { key: "sales", label: "Sales", satellites: ["Voice AI", "WhatsApp"] },
        { key: "admin", label: "Company Brain", satellites: ["RAG", "Scan to Brain"] },
      ],
    },
  },

  painPoints: {
    eyebrow: "The cost of doing nothing",
    title: "Your business is leaking time and money",
    subtitle:
      "Not because your team is slow, but because the work that should run itself still runs on people. Here is where it usually hides.",
    items: [
      {
        icon: "phone-missed",
        title: "Missed calls, missed revenue",
        body: "Every unanswered call is a booking that went to a competitor. After hours, it just rings out.",
      },
      {
        icon: "clock",
        title: "Hours lost to manual admin",
        body: "Your team retypes the same data, chases the same follow ups, and digs for answers that should be one question away.",
      },
      {
        icon: "reply",
        title: "Leads that go cold",
        body: "Inquiries from ads, DMs, and forms sit for hours. By the time someone replies, the interest is gone.",
      },
      {
        icon: "boxes",
        title: "Knowledge trapped in people's heads",
        body: "Contracts, notes, and paperwork live in inboxes and drawers. When someone is out, the answers leave with them.",
      },
    ],
  },

  pillars: {
    eyebrow: "One connected system, three pillars",
    title: "Not another tool. The system that ties it together.",
    subtitle:
      "Most vendors sell you one piece. We audit the whole business, then build interconnected AI across all three pillars, so each part makes the others smarter.",
    items: [
      {
        key: "marketing",
        tag: "Pillar 01",
        name: "Marketing & Growth",
        headline: "Systems that run your marketing, not just campaigns.",
        body: "AI that plans, writes, and optimizes so your pipeline fills while you focus on the work.",
        capabilities: [
          "AI Ads agent for Meta and Google, creative and copy generation",
          "AI SEO and GEO agent for visibility on Google, Perplexity, and ChatGPT",
          "Content workflows and reputation management",
        ],
      },
      {
        key: "sales",
        tag: "Pillar 02",
        name: "Sales & Acquisition",
        headline: "Never miss a lead, day or night.",
        body: "Automis VoiceAI answers, qualifies, and books, while your social channels turn conversations into CRM leads.",
        featured: true,
        capabilities: [
          "Automis VoiceAI, a 24/7 receptionist that books straight into your calendar",
          "AI social manager for Instagram, Facebook, and WhatsApp",
          "Missed call recovery and instant lead qualification",
        ],
      },
      {
        key: "admin",
        tag: "Pillar 03",
        name: "Admin & Company Brain",
        headline: "The internal brain your operation runs on.",
        body: "A private AI trained on your business, so answers, documents, and knowledge are one question away.",
        capabilities: [
          "Custom RAG Second Brain over your company data",
          "Scan to Brain OCR to digitize paper and PDFs",
          "Audio to CRM voice note transcription",
        ],
      },
    ],
  },

  voice: {
    eyebrow: "Flagship proof",
    title: "Automis VoiceAI",
    subtitle:
      "A 24/7 AI voice agent that answers inbound and outbound calls, qualifies leads, handles FAQs, and books appointments with real time calendar sync. GDPR compliant, on EU servers.",
    cta: { label: "Book a discovery call", href: BOOKING_URL },
    revenueLine:
      "For most clients that adds up to thousands in recovered revenue every month, from calls that would otherwise go unanswered.",
    stats: [
      { value: 80, suffix: "%+", label: "of calls handled automatically" },
      { value: 100, suffix: "+", label: "hours saved per month" },
      { value: 30, suffix: "%", label: "fewer no-shows" },
      { value: 24, suffix: "/7", label: "always answering", plain: true },
    ],
    highlights: [
      "Answers every call, even after hours and at peak times",
      "Books and reschedules straight into your calendar",
      "Recovers missed calls with an instant callback or text",
    ],
  },

  how: {
    eyebrow: "How we work",
    title: "From bottleneck to built, without the guesswork",
    subtitle:
      "We start by finding where the business actually leaks, then build and run the fix with human oversight.",
    steps: [
      {
        n: "01",
        title: "Discover & Diagnose",
        body: "We learn your business and map exactly where time and money leak, before writing a line of automation.",
      },
      {
        n: "02",
        title: "Design, Build & Deploy",
        body: "We build your system and hand it over to test before go live. Around 7 days for voice and simple builds, a custom timeline for complex systems.",
      },
      {
        n: "03",
        title: "Launch, Monitor & Optimize",
        body: "We keep it sharp with continuous monthly improvements and human oversight, so it gets better as your business grows.",
      },
    ],
  },

  results: {
    eyebrow: "Real results",
    title: "Built for real businesses, already running",
    subtitle:
      "No stock demos. These are live Automis systems working for real clients today.",
    cases: [
      {
        client: "Clínica Dentária Santa Maria dos Olivais",
        location: "Lisbon, Portugal",
        sector: "Healthcare",
        logo: "/assets/images/case-studies/clinica-santa-maria.svg",
        summary:
          "An AI voice receptionist that answers every patient call, handles FAQs, and books appointments 24/7, so the front desk stops losing after hours bookings.",
        tags: ["Voice AI", "24/7 booking", "GDPR"],
      },
      {
        client: "Adifesa",
        location: "Italy",
        sector: "Finance",
        logo: "/assets/images/case-studies/adifesa.png",
        summary:
          "Meta advertising automation for cessione del quinto (salary backed loans), turning paid campaigns into a steady flow of qualified, ready to contact leads.",
        tags: ["Paid ads", "Lead gen", "CRM"],
      },
    ],
  },

  guarantee: {
    eyebrow: "The Automis guarantee",
    title: "We take on the risk, so you do not have to",
    items: [
      {
        title: "100% setup refund in month 1",
        body: "On custom engagements with a setup fee, if we do not deliver what we agreed in the first month, you get the setup back.",
      },
      {
        title: "30-day performance guarantee on Voice AI",
        body: "Every Voice AI tier is backed by a 30 day performance guarantee. If it does not perform, we make it right.",
      },
    ],
  },

  finalCta: {
    eyebrow: "Ready to build?",
    title: "Let us find what to automate first",
    subtitle:
      "Book a discovery call. We will map your biggest time and money leaks and show you exactly what a system would fix, no obligation.",
  },
};

export default home;
