/*
  Shared case-study data for the use-cases list + detail pages.
  Facts are real (two live Automis clients); every quantitative metric is a
  conservative, clearly-labeled estimate, we do not publish real client/caller
  data (GDPR / privacy-first positioning). Keep this the single source of truth
  for both /use-cases and /use-cases/[slug].

  Localization: each case carries an `it` object with the Italian of every
  user-facing field. Non-translatable logic keys (slug, client, shortClient,
  logo) stay language-neutral. Use getCases(locale) / getCase(slug, locale);
  localize() shallow-merges `it` over the base object for locale === "it".
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
      "A 24/7 Voice AI receptionist that answers every call, books check-ups, and captures the after-hours calls that used to go unanswered.",
    // detail: outcome-led hero line
    headline:
      "An AI receptionist that never lets a patient call go unanswered.",
    metaDescription:
      "A 24/7 Voice AI receptionist for a Lisbon dental clinic: it answers every call, books check-ups, and captures the after-hours calls once lost.",
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
        "After-hours coverage that books the nights-and-weekends calls that used to go unanswered.",
      ],
    },
    results: {
      lead: "The AI receptionist always answers, so there are no missed calls by design. Timing figures are conservative estimates from comparable Voice AI deployments and vary with call volume and setup.",
      metrics: [
        { value: "0", label: "missed calls, every call answered live, 24/7" },
        { value: "After hours", label: "nights-and-weekends calls captured and booked instead of lost" },
        { value: "<30s", label: "average time to answer an inbound call (estimate)" },
      ],
    },
    quote:
      "Patients get answered instantly, day or night, and bookings no longer slip through when the front desk is busy.",
    quoteAttribution: "Client story - quote placeholder, pending approval",
    it: {
      industry: "Clinica dentistica",
      location: "Lisbona, Portogallo",
      tag: "Segretaria IA",
      summary:
        "Una segretaria IA attiva 24/7 che risponde a ogni chiamata, prenota i check-up e recupera le chiamate fuori orario che prima restavano senza risposta.",
      headline:
        "Una segretaria IA che non lascia mai senza risposta la chiamata di un paziente.",
      metaDescription:
        "Segretaria IA 24/7 per una clinica dentistica di Lisbona: risponde a ogni chiamata, prenota i check-up e recupera le chiamate fuori orario.",
      challenge: {
        lead: "Uno studio dentistico pieno di lavoro perde pazienti nel momento in cui il telefono resta senza risposta.",
        points: [
          "Le chiamate in arrivo durante i trattamenti, la pausa pranzo e fuori orario finivano in segreteria, e la maggior parte di chi chiamava non richiamava più.",
          "Il personale alla reception veniva interrotto mentre lavorava per gestire richieste di routine su prenotazioni e spostamenti di appuntamento.",
          "Le richieste dei nuovi pazienti competevano con l'assistenza alla poltrona, così prime impressioni e prenotazioni andavano perse.",
        ],
      },
      solution: {
        lead: "Abbiamo attivato la segretaria IA di Automis, configurata sulle regole di prenotazione e sul tono reali della clinica.",
        points: [
          "Risposta alle chiamate in entrata 24/7, che accoglie subito chi chiama, di giorno e di notte.",
          "Prenotazione e spostamento degli appuntamenti in tempo reale sul calendario della clinica, con conferme.",
          "Raccolta strutturata dei dati del paziente, così le informazioni giuste vengono acquisite prima della visita.",
          "Copertura fuori orario che prenota le chiamate di sere e fine settimana che prima restavano senza risposta.",
        ],
      },
      results: {
        lead: "La segretaria IA risponde sempre, quindi non ci sono chiamate perse per definizione. I tempi indicati sono stime prudenti basate su implementazioni comparabili di segretarie IA e variano in base al volume di chiamate e alla configurazione.",
        metrics: [
          { value: "0", label: "chiamate perse: ogni chiamata gestita in diretta, 24/7" },
          { value: "Fuori orario", label: "chiamate di sere e fine settimana recuperate e prenotate invece che perse" },
          { value: "<30s", label: "tempo medio di risposta a una chiamata in entrata (stima)" },
        ],
      },
      quote:
        "I pazienti ricevono risposta all'istante, di giorno e di notte, e le prenotazioni non si perdono più quando la reception è impegnata.",
      quoteAttribution: "Storia del cliente, citazione provvisoria in attesa di approvazione",
    },
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
    metaDescription:
      "Meta automation for an Italian finance business: auto-replies to every Facebook and Instagram comment and DM, qualifies interest, routes clean leads.",
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
    it: {
      industry: "Finanza, cessione del quinto",
      location: "Monza, Italia",
      tag: "Automazione Meta",
      summary:
        "Automazione Meta che risponde in automatico a ogni commento e DM su Facebook e Instagram, qualifica l'interesse e smista i contatti puliti al team commerciale.",
      headline:
        "Ogni contatto da Facebook e Instagram gestito e qualificato, in automatico.",
      metaDescription:
        "Automazione Meta per una finanziaria italiana: risponde a ogni commento e DM su Facebook e Instagram, qualifica l'interesse e smista i contatti.",
      challenge: {
        lead: "Un'azienda finanziaria che gestiva campagne di cessione del quinto su Meta era sommersa da commenti e DM.",
        points: [
          "Commenti agli annunci e messaggi diretti arrivavano in gran volume, più in fretta di quanto il team riuscisse a rispondere, e le risposte lente fanno perdere i contatti caldi.",
          "Le richieste di finanziamento reali finivano sepolte in una casella rumorosa, insieme a spam e messaggi fuori tema.",
          "Nessun modo coerente di qualificare l'interesse prima dell'intervento di una persona, così il team commerciale perdeva tempo su contatti non pronti.",
        ],
      },
      solution: {
        lead: "Abbiamo costruito un'automazione Meta di Automis che intercetta ogni potenziale cliente nel momento in cui interagisce.",
        points: [
          "Risposte automatiche ai commenti e ai DM su Facebook e Instagram, con il tono dell'azienda.",
          "Qualificazione dei contatti che raccoglie i dati chiave per una richiesta di cessione del quinto.",
          "Smistamento pulito dei contatti qualificati al team commerciale, fuori dalla casella pubblica rumorosa.",
          "Un flusso di contatti costante e organizzato, invece della corsa manuale sotto ogni annuncio.",
        ],
      },
      results: {
        lead: "I dati qui sotto sono stime prudenti basate su implementazioni comparabili di automazione Meta. I risultati reali variano in base a budget pubblicitario, pubblico e configurazione.",
        metrics: [
          { value: "<30s", label: "risposta media a un nuovo commento o DM (stima)" },
          { value: "24/7", label: "copertura, così nessun contatto aspetta gli orari d'ufficio" },
          { value: "100%", label: "dei commenti e DM in entrata gestiti in automatico" },
        ],
      },
      quote:
        "I contatti vengono raccolti e qualificati prima ancora di muovere un dito, e il team commerciale vede solo quelli che meritano una call.",
      quoteAttribution: "Storia del cliente, citazione provvisoria in attesa di approvazione",
    },
  },
];

function localize(c, locale) {
  return locale === "it" ? { ...c, ...c.it } : c;
}

export function getCases(locale) {
  return CASES.map((c) => localize(c, locale));
}

export function getCase(slug, locale) {
  const c = CASES.find((x) => x.slug === slug);
  return c ? localize(c, locale) : undefined;
}
