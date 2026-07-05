/*
  Shared case-study data for the use-cases list + detail pages.
  Facts are real (two live Automis clients); every quantitative metric is a
  conservative, clearly-labeled estimate — we do not publish real client/caller
  data (GDPR / privacy-first positioning). Keep this the single source of truth
  for both /use-cases and /use-cases/[slug].
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
    // list-card one-liner
    summary:
      "A 24/7 Voice AI receptionist that answers every call, books check-ups, and recovers the after-hours calls that used to go to voicemail.",
    // detail: outcome-led hero line
    headline:
      "An AI receptionist that never lets a patient call go unanswered.",
    challenge: {
      lead: "A busy dental practice loses patients the moment the phone goes unanswered.",
      points: [
        "Calls arriving during treatments, lunch, and after hours went to voicemail, and most callers never called back.",
        "Front-desk staff were interrupted mid-task to handle routine booking and rescheduling questions.",
        "New-patient enquiries competed with in-chair care, so first impressions and bookings slipped through the cracks.",
      ],
    },
    solution: {
      lead: "We deployed the Automis Voice AI receptionist, configured for the clinic's real booking rules and tone.",
      points: [
        "24/7 inbound answering that greets every caller instantly, day or night.",
        "Live appointment booking and rescheduling into the clinic's calendar, with confirmations.",
        "Structured patient intake so the right details are captured before the visit.",
        "Missed-call recovery that automatically follows up on calls the team could not reach in time.",
      ],
    },
    results: {
      lead: "Figures below are conservative estimates from comparable Voice AI deployments. Actual results vary with call volume and setup.",
      metrics: [
        { value: "24/7", label: "call coverage, including nights, weekends, and holidays" },
        { value: "~30-50%", label: "of missed calls typically recovered (estimate)" },
        { value: "<30s", label: "average time to answer an inbound call (estimate)" },
      ],
    },
    quote:
      "Patients get answered instantly, day or night, and bookings no longer slip through when the front desk is busy.",
    quoteAttribution: "Client story - quote placeholder, pending approval",
  },
  {
    slug: "adifesa",
    client: "Adifesa",
    shortClient: "Adifesa",
    industry: "Finance - cessione del quinto",
    location: "Italy",
    tag: "Meta automation",
    logo: "/assets/images/client-logos/adifesa.png",
    summary:
      "Meta automation that auto-replies to every Facebook and Instagram comment and DM, qualifies the interest, and routes clean leads to the sales team.",
    headline:
      "Every Facebook and Instagram lead answered and qualified, automatically.",
    challenge: {
      lead: "A finance business running salary-backed loan campaigns on Meta was drowning in comments and DMs.",
      points: [
        "High-volume ad comments and direct messages arrived faster than the team could reply, and slow replies lose warm leads.",
        "Genuine loan enquiries were buried in a noisy inbox alongside spam and off-topic messages.",
        "No consistent way to qualify interest before a human stepped in, so the sales team spent time on unready contacts.",
      ],
    },
    solution: {
      lead: "We built an Automis Meta automation that meets every prospect the moment they engage.",
      points: [
        "Automatic replies to Facebook and Instagram comments and DMs, in the brand's voice.",
        "Lead qualification that gathers the key details for a cessione del quinto enquiry.",
        "Clean routing of qualified leads to the sales team, out of the noisy public inbox.",
        "A steady, organized flow of leads instead of a manual scramble under each ad.",
      ],
    },
    results: {
      lead: "Figures below are conservative estimates from comparable Meta automation deployments. Actual results vary with ad spend, audience, and setup.",
      metrics: [
        { value: "<30s", label: "average response to a new comment or DM (estimate)" },
        { value: "24/7", label: "coverage, so no lead waits for office hours" },
        { value: "100%", label: "of inbound comments and DMs answered automatically" },
      ],
    },
    quote:
      "Leads are captured and qualified before anyone lifts a finger, and the sales team only sees the ones worth a call.",
    quoteAttribution: "Client story - quote placeholder, pending approval",
  },
];

export function getCase(slug) {
  return CASES.find((c) => c.slug === slug);
}
