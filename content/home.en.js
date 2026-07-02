/*
 * English homepage copy (v2 — editorial hierarchy).
 * One clear message per section: kicker -> headline -> lead -> scannable support.
 * Numbers are believable aggregates, not per-client figures. No em/en dashes.
 * Locale-agnostic: the Italian main site can ship the same design via home.it.js.
 */

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const home = {
  bookingUrl: BOOKING_URL,

  meta: {
    title: "Automis - Strategic AI Integrator",
    description:
      "Automis builds the AI system your business is missing. From voice agents that answer every call to the internal brain that runs your operations, we find where you lose time and money and build the system that fixes it. You own it.",
  },

  hero: {
    kicker: "Strategic AI Integrator",
    titleLead: "We build the AI system",
    titleAccent: "your business is missing.",
    subhead:
      "From voice agents that answer every call to the internal brain that runs your operations, we find where you lose time and money, and we build the system that fixes it. You own it.",
    primaryCta: { label: "Book a discovery call", href: BOOKING_URL },
    secondaryCta: { label: "See how it works", href: "#how" },
    chips: ["24/7 answering", "80%+ calls handled", "Live in ~7 days"],
    trustLabel: "Trusted by clinics, agencies, and firms across Europe",
  },

  logos: { label: "Trusted by businesses across Europe" },

  proof: {
    kicker: "The proof",
    title: "Systems that pay for themselves",
    lead: "Not a demo. These are the outcomes our live client systems deliver, week after week.",
    stats: [
      { value: "80", suffix: "%+", label: "of calls handled automatically, no human needed", gold: true },
      { value: "100", suffix: "+", label: "hours of manual work saved every month" },
      { value: "~7", suffix: " days", label: "to go live for voice, custom for complex" },
    ],
  },

  problem: {
    kicker: "The cost of doing nothing",
    title: "Your business is leaking time and money",
    lead: "Not because your team is slow, but because the work that should run itself still runs on people. Here is where it hides, and what we do about it.",
    rows: [
      {
        pain: "Every missed call is a booking that goes to a competitor.",
        fix: "A 24/7 voice agent answers, qualifies, and books, even after hours.",
      },
      {
        pain: "Your team loses hours to manual admin and data entry.",
        fix: "Automations handle the repetitive work, so people do the work that matters.",
      },
      {
        pain: "Leads from ads, DMs, and forms go cold before anyone replies.",
        fix: "Instant qualification and follow-up, across every channel.",
      },
      {
        pain: "Knowledge is trapped in inboxes, drawers, and people's heads.",
        fix: "A private company brain makes every answer one question away.",
      },
    ],
  },

  pillars: {
    kicker: "One connected system, three pillars",
    title: "Not another tool. The system that ties it together.",
    lead: "Most vendors sell you one piece. We audit the whole business, then build interconnected AI across all three, so each part makes the others smarter.",
    items: [
      {
        tag: "01",
        name: "Marketing & Growth",
        statement: "Systems that run your marketing, not just campaigns.",
        outcome: "AI that plans, writes, and optimizes so your pipeline fills while you focus on the work.",
        capabilities: [
          "AI ads agent for Meta and Google",
          "SEO and GEO for Google, Perplexity, and ChatGPT",
          "Content and reputation workflows",
        ],
      },
      {
        tag: "02",
        name: "Sales & Acquisition",
        featured: true,
        statement: "Never miss a lead, day or night.",
        outcome: "Automis VoiceAI answers, qualifies, and books, while your social channels turn conversations into CRM leads.",
        capabilities: [
          "Automis VoiceAI, a 24/7 receptionist",
          "Instagram, Facebook, and WhatsApp automation",
          "Missed-call recovery and lead qualification",
        ],
      },
      {
        tag: "03",
        name: "Admin & Company Brain",
        statement: "The internal brain your operation runs on.",
        outcome: "A private AI trained on your business, so answers, documents, and knowledge are one question away.",
        capabilities: [
          "Custom RAG second brain over your data",
          "Scan to Brain OCR for paper and PDFs",
          "Audio to CRM voice-note transcription",
        ],
      },
    ],
  },

  voice: {
    kicker: "Flagship proof",
    title: "Automis VoiceAI",
    lead: "A 24/7 AI voice agent that answers inbound and outbound calls, qualifies leads, handles FAQs, and books appointments with real-time calendar sync. GDPR compliant, on EU servers.",
    cta: { label: "Book a discovery call", href: BOOKING_URL },
    revenueLine:
      "For most clients that adds up to thousands in recovered revenue every month, from calls that would otherwise go unanswered.",
    stats: [
      { value: "80", suffix: "%+", label: "calls handled automatically", gold: true },
      { value: "30", suffix: "%", label: "fewer no-shows" },
      { value: "100", suffix: "+", label: "hours saved / month" },
      { value: "24", suffix: "/7", label: "always answering" },
    ],
    highlights: [
      "Answers every call, even after hours and at peak times",
      "Books and reschedules straight into your calendar",
      "Recovers missed calls with an instant callback or text",
    ],
  },

  how: {
    kicker: "How we work",
    title: "From bottleneck to built, without the guesswork",
    lead: "We find where the business actually leaks, build the fix, and keep it sharp with human oversight.",
    steps: [
      {
        n: "01",
        title: "Discover & Diagnose",
        body: "We learn your business and map exactly where time and money leak, before writing a line of automation.",
      },
      {
        n: "02",
        title: "Design, Build & Deploy",
        tag: "~7 days for voice and simple builds",
        body: "We build your system and hand it over to test before go-live. Custom timeline for complex systems.",
      },
      {
        n: "03",
        title: "Launch, Monitor & Optimize",
        body: "We keep it improving every month with human oversight, so it gets better as your business grows.",
      },
    ],
  },

  results: {
    kicker: "Real results",
    title: "Built for real businesses, already running",
    lead: "No stock demos. These are live Automis systems working for real clients today.",
    cases: [
      {
        client: "Clínica Dentária Santa Maria dos Olivais",
        location: "Lisbon, Portugal",
        sector: "Healthcare",
        logo: "/assets/images/case-studies/clinica-santa-maria.png",
        summary:
          "An AI voice receptionist that answers every patient call, handles FAQs, and books appointments 24/7.",
        outcomes: ["Zero missed calls, day or night", "More bookings captured after hours", "Front desk freed from phone tag"],
        tags: ["Voice AI", "24/7 booking", "GDPR"],
      },
      {
        client: "Adifesa",
        location: "Italy",
        sector: "Finance",
        logo: "/assets/images/case-studies/adifesa.png",
        summary:
          "Meta advertising automation for cessione del quinto (salary backed loans), turning paid campaigns into qualified leads.",
        outcomes: ["Qualified leads from Meta on autopilot", "Faster routing to the sales team", "Less time lost on unqualified inquiries"],
        tags: ["Paid ads", "Lead gen", "CRM"],
      },
    ],
  },

  wedge: {
    kicker: "Why Automis",
    title: "A partner, not a vendor",
    lead: "We do not hand you a tool and walk away. We diagnose, build, and stand behind the result.",
    items: [
      {
        title: "We diagnose before we build",
        body: "A real bottleneck audit comes first. We fix what actually costs you, not what is easy to sell.",
      },
      {
        title: "You own the system",
        body: "Custom infrastructure, your data, your workflows. No lock-in to someone else's subscription.",
      },
      {
        title: "Proof, not promises",
        body: "Live client systems and real outcomes, backed by a guarantee. Not slideware.",
      },
    ],
    guarantees: [
      {
        title: "100% setup refund in month 1",
        body: "On custom engagements with a setup fee, if we do not deliver what we agreed, you get the setup back.",
      },
      {
        title: "30-day performance guarantee on Voice AI",
        body: "Every Voice AI tier is backed by a 30-day performance guarantee. If it does not perform, we make it right.",
      },
    ],
  },

  finalCta: {
    kicker: "Ready to build?",
    title: "Let us find what to automate first",
    subtitle:
      "Book a discovery call. We will map your biggest time and money leaks and show you exactly what a system would fix, no obligation.",
  },
};

export default home;
