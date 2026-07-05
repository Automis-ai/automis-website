// Data for the Automations explorer.
// Each automation is written as Problem -> What we automate -> Outcome, tagged
// with the niches it fits and the pillar (goal) it serves. Outcomes are kept
// realistic and non-inflated. `liveHref` deep-links to a real client story when
// one backs the automation.

// Filter axes ------------------------------------------------------------------

// By niche. `all` is the implicit default (handled in the explorer).
export const NICHES = [
  { id: "healthcare", label: "Healthcare" },
  { id: "professional", label: "Professional Services" },
  { id: "real-estate", label: "Real Estate" },
  { id: "local", label: "Local / Online business" },
];

// By goal (pillar). Plain-language goal labels map onto the 3 Automis pillars.
export const GOALS = [
  { id: "marketing", label: "Get more customers", pillar: "Marketing & Growth" },
  { id: "sales", label: "Never miss a lead", pillar: "Sales & Acquisition" },
  { id: "admin", label: "Run the back office", pillar: "Admin & Company Brain" },
];

// Small helper so cards can show a friendly pillar tag.
export const GOAL_BY_ID = GOALS.reduce((acc, g) => {
  acc[g.id] = g;
  return acc;
}, {});

// Automations ------------------------------------------------------------------
// pillar: one of "marketing" | "sales" | "admin"
// niches: subset of NICHES ids (an automation can serve several)

export const AUTOMATIONS = [
  // --- Sales & Acquisition ----------------------------------------------------
  {
    id: "voice-receptionist",
    title: "AI voice receptionist",
    pillar: "sales",
    niches: ["healthcare", "professional", "real-estate", "local"],
    problem: "Calls come in while you are with a client, after hours, or on the weekend, and go to voicemail.",
    automate: "An AI voice agent answers every call 24/7, qualifies the caller, books the appointment, and syncs it to your calendar and CRM.",
    outcome: "No call goes unanswered, and more of them turn into booked appointments.",
    liveHref: "/use-cases/clinica-santa-maria",
    liveLabel: "See it live",
  },
  {
    id: "missed-call-recovery",
    title: "Missed-call recovery",
    pillar: "sales",
    niches: ["healthcare", "real-estate", "local"],
    problem: "A missed call is usually a lost customer who simply dials the next business on the list.",
    automate: "The moment a call is missed, an automatic SMS goes out to reopen the conversation and offer a callback or booking link.",
    outcome: "You recover a meaningful share of missed calls that would otherwise walk away.",
    liveHref: "/use-cases/clinica-santa-maria",
    liveLabel: "See it live",
  },
  {
    id: "dm-to-crm",
    title: "Instagram & Facebook DM to CRM",
    pillar: "sales",
    niches: ["local", "professional", "real-estate"],
    problem: "Leads slide into your social DMs and get buried before anyone can qualify and follow up.",
    automate: "An AI agent replies to every Instagram and Facebook DM, qualifies the lead, and writes it straight into your CRM with the full context.",
    outcome: "Every social inquiry becomes a tracked lead your team can act on.",
    liveHref: "/use-cases/adifesa",
    liveLabel: "See it live",
  },
  {
    id: "inquiry-response-247",
    title: "24/7 inquiry response",
    pillar: "sales",
    niches: ["real-estate", "local", "professional"],
    problem: "Whoever replies first usually wins the deal, but inquiries land at all hours.",
    automate: "AI answers web-form, chat, and WhatsApp inquiries instantly, day or night, and routes qualified ones to the right person.",
    outcome: "Speed-to-lead measured in seconds instead of hours.",
    liveHref: null,
  },
  {
    id: "lead-qualification",
    title: "Lead qualification & routing",
    pillar: "sales",
    niches: ["professional", "real-estate", "local"],
    problem: "Your team spends time on unqualified leads and slow-walks the good ones.",
    automate: "AI screens each lead against your criteria, scores it, and routes the qualified ones to the right team member automatically.",
    outcome: "Sales time goes to the leads most likely to close.",
    liveHref: null,
  },
  {
    id: "audio-to-crm",
    title: "Audio-to-CRM voice notes",
    pillar: "sales",
    niches: ["real-estate", "professional", "local"],
    problem: "Notes from calls and site visits live in your head or on scraps and never make it into the system.",
    automate: "Record a quick voice note and AI transcribes it, structures it, and writes the update straight into the right CRM record.",
    outcome: "Your CRM stays current without anyone typing it up.",
    liveHref: null,
  },

  // --- Marketing & Growth -----------------------------------------------------
  {
    id: "ads-creative-agent",
    title: "AI ads & creative agent",
    pillar: "marketing",
    niches: ["local", "real-estate", "professional"],
    problem: "Ad spend leaks on tired creative and campaigns nobody has time to optimize.",
    automate: "An AI system generates and tests ad creative across Meta and Google, and shifts budget toward what is actually converting.",
    outcome: "More of every euro spent goes to ads that work.",
    liveHref: null,
  },
  {
    id: "seo-geo-agent",
    title: "SEO & GEO visibility agent",
    pillar: "marketing",
    niches: ["professional", "local", "healthcare"],
    problem: "You are invisible in Google and in the new AI answers where customers now search.",
    automate: "An AI content workflow researches, drafts, and publishes pages built to rank in Google and to be cited in AI search.",
    outcome: "Steady organic visibility without a full-time content team.",
    liveHref: null,
  },
  {
    id: "review-reputation",
    title: "Review & reputation engine",
    pillar: "marketing",
    niches: ["healthcare", "local", "real-estate"],
    problem: "Happy customers rarely leave reviews, and the occasional bad one sits unanswered.",
    automate: "AI requests reviews at the right moment, routes unhappy feedback to you privately, and drafts replies to public reviews.",
    outcome: "A stronger, steadier flow of positive reviews.",
    liveHref: null,
  },
  {
    id: "content-social-workflow",
    title: "Content & social workflow",
    pillar: "marketing",
    niches: ["local", "professional", "healthcare"],
    problem: "Posting consistently falls off the moment things get busy.",
    automate: "AI turns each piece of source material into a batch of on-brand posts, scheduled across your channels on a set cadence.",
    outcome: "A consistent presence that keeps running on its own.",
    liveHref: null,
  },
  {
    id: "reactivation-campaigns",
    title: "Database reactivation campaigns",
    pillar: "marketing",
    niches: ["healthcare", "local", "professional"],
    problem: "Your list of past customers is a goldmine sitting untouched.",
    automate: "AI segments your existing contacts and runs personalized SMS and email win-back sequences to bring them back.",
    outcome: "New revenue from customers you already had.",
    liveHref: null,
  },

  // --- Admin & Company Brain --------------------------------------------------
  {
    id: "company-brain-rag",
    title: "Company Brain (RAG over your docs)",
    pillar: "admin",
    niches: ["professional", "healthcare", "real-estate"],
    problem: "The answer to any question is buried in a folder, an inbox, or one person's memory.",
    automate: "We build a private searchable brain over your documents so your team asks a question in plain language and gets a sourced answer.",
    outcome: "Institutional knowledge that is instantly findable, not lost.",
    liveHref: "/use-cases/adifesa",
    liveLabel: "See it live",
  },
  {
    id: "scan-to-brain-ocr",
    title: "Scan-to-Brain OCR",
    pillar: "admin",
    niches: ["professional", "healthcare", "real-estate"],
    problem: "Paper forms, contracts, and PDFs pile up as data nobody can search.",
    automate: "AI reads scanned documents with OCR and vision, extracts the key fields, and files them as structured, searchable data.",
    outcome: "Paperwork becomes data you can actually query.",
    liveHref: null,
  },
  {
    id: "document-intake",
    title: "Automated document intake & sorting",
    pillar: "admin",
    niches: ["professional", "healthcare", "local"],
    problem: "Incoming documents and attachments need someone to open, name, and file each one.",
    automate: "AI reads each incoming document, classifies it, renames it, and routes it to the right place with the right record attached.",
    outcome: "Hours of manual filing removed from the week.",
    liveHref: null,
  },
  {
    id: "property-matching",
    title: "Property matching for real estate",
    pillar: "admin",
    niches: ["real-estate"],
    problem: "Matching new buyer requests against your listings by hand is slow and easy to miss.",
    automate: "AI matches each buyer's criteria against your live inventory and surfaces the best-fit listings the moment they are added.",
    outcome: "The right property reaches the right buyer first.",
    liveHref: null,
  },
  {
    id: "back-office-ops",
    title: "Back-office ops automation",
    pillar: "admin",
    niches: ["professional", "local", "healthcare"],
    problem: "Invoicing, reminders, and status updates eat the day in small repetitive tasks.",
    automate: "AI handles the routine back-office flows, drafting invoices, sending reminders, and updating records across your tools.",
    outcome: "The admin runs itself so your team works on the real work.",
    liveHref: null,
  },
];
