/*
 * English homepage copy (v3, "the system, live").
 * The page shows an Automis system working in real time; every section is
 * a camera move on the same machine. One message per section.
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
      "Right now, Automis systems are answering calls, qualifying leads, and booking appointments for businesses across Portugal and Italy. We find where you lose time and money, then we build the system that fixes it. You own it.",
    primaryCta: { label: "Book a discovery call", href: BOOKING_URL },
    secondaryCta: { label: "See how it works", href: "#how" },
    chips: ["80%+ calls handled automatically", "100+ hours saved monthly", "Live in ~7 days"],

    /* The living-system diagram: nodes + choreographed scenarios.
       Each scenario lights an input, sends a packet through the core,
       lights an output, then logs its events in the ticker. */
    diagram: {
      coreLabel: "Automis Core",
      inputs: ["Incoming call", "WhatsApp message", "Web form"],
      outputs: ["Booking confirmed", "Lead sent to CRM", "Follow-up sent"],
      scenarios: [
        {
          input: 0,
          output: 0,
          events: ["Call answered on the first ring", "Appointment booked for Tue 15:30"],
        },
        {
          input: 0,
          output: 2,
          events: ["Missed call at closing time", "Instant text-back sent to the caller"],
        },
        {
          input: 2,
          output: 1,
          events: ["New form lead received", "Qualified and pushed to the CRM"],
        },
        {
          input: 1,
          output: 0,
          events: ["WhatsApp booking request", "Slot confirmed, calendar synced"],
        },
      ],
      note: "Simulation of a live Automis system",
    },
  },

  logos: { label: "Already running inside businesses across Europe" },

  leak: {
    kicker: "The cost of doing nothing",
    title: "Your business is leaking, quietly",
    lead: "Not because your team is slow, but because work that should run itself still runs on people. Here is where it hides, and how the system plugs it.",
    fixedLabel: "Handled",
    rows: [
      {
        tag: "Missed call",
        pain: "Every missed call is a booking that goes to a competitor.",
        fix: "A 24/7 voice agent answers, qualifies, and books, even after hours.",
      },
      {
        tag: "Manual admin",
        pain: "Your team loses hours to manual admin and data entry.",
        fix: "Automations handle the repetitive work, so people do the work that matters.",
      },
      {
        tag: "Cold lead",
        pain: "Leads from ads, DMs, and forms go cold before anyone replies.",
        fix: "Instant qualification and follow-up, across every channel.",
      },
      {
        tag: "Lost knowledge",
        pain: "Knowledge is trapped in inboxes, drawers, and people's heads.",
        fix: "A private company brain makes every answer one question away.",
      },
    ],
  },

  pillars: {
    kicker: "One connected system",
    title: "Not another tool. One system, three pillars.",
    lead: "Most vendors sell you one piece. We audit the whole business, then build interconnected AI across all three pillars, so each part makes the others smarter.",
    items: [
      {
        tag: "01",
        name: "Marketing & Growth",
        statement: "Systems that run your marketing, not just campaigns.",
        outcome:
          "AI that plans, writes, and optimizes so your pipeline fills while you focus on the work.",
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
        outcome:
          "Automis VoiceAI answers, qualifies, and books, while your social channels turn conversations into CRM leads.",
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
        outcome:
          "A private AI trained on your business, so answers, documents, and knowledge are one question away.",
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
    guarantee: {
      title: "30-day performance guarantee",
      body: "Every Voice AI tier is backed by it. If it does not perform, we make it right.",
    },
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

    /* Staged call simulation: plays once when scrolled into view. */
    call: {
      meta: "Incoming call · after hours",
      transcript: [
        { from: "caller", text: "Hi, I would like to book a cleaning next week." },
        {
          from: "ai",
          text: "Of course. I have Tuesday at 15:30 or Thursday at 10:00. Which works better for you?",
        },
        { from: "caller", text: "Tuesday works." },
      ],
      confirmation: "Booked, Tuesday 15:30. Synced to the calendar.",
      closing: "Call handled. No human needed.",
      replayLabel: "Replay",
    },
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
    kicker: "Real deployments",
    title: "Already running for real businesses",
    lead: "No stock demos. These are live Automis systems working for real clients today.",
    liveLabel: "Live system",
    cases: [
      {
        client: "Clínica Dentária Santa Maria dos Olivais",
        location: "Lisbon, Portugal",
        sector: "Healthcare",
        logo: "/assets/images/case-studies/clinica-santa-maria.png",
        summary:
          "An AI voice receptionist that answers every patient call, handles FAQs, and books appointments 24/7.",
        outcomes: [
          "Zero missed calls, day or night",
          "More bookings captured after hours",
          "Front desk freed from phone tag",
        ],
        tags: ["Voice AI", "24/7 booking", "GDPR"],
      },
      {
        client: "Adifesa",
        location: "Italy",
        sector: "Finance",
        logo: "/assets/images/case-studies/adifesa.png",
        summary:
          "Meta advertising automation for cessione del quinto (salary backed loans), turning paid campaigns into qualified leads.",
        outcomes: [
          "Qualified leads from Meta on autopilot",
          "Faster routing to the sales team",
          "Less time lost on unqualified inquiries",
        ],
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
    title: "Bring your system online",
    subtitle:
      "Book a discovery call. We will map your biggest time and money leaks and show you exactly what a system would fix, no obligation.",
  },
};

export default home;
