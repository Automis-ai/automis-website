// Data for the Automations explorer.
// Each automation is written as Problem -> What we automate -> Outcome, tagged
// with the niches it fits and the pillar (goal) it serves. Outcomes are kept
// realistic and non-inflated. `liveHref` deep-links to a real client story when
// one backs the automation.

// Filter axes ------------------------------------------------------------------

// By niche. `all` is the implicit default (handled in the explorer).
export const NICHES = [
  { id: "healthcare", label: "Healthcare", label_it: "Sanità" },
  { id: "professional", label: "Professional Services", label_it: "Servizi professionali" },
  { id: "real-estate", label: "Real Estate", label_it: "Immobiliare" },
  { id: "local", label: "Local / Online business", label_it: "Attività locali / online" },
];

// By goal (pillar). Plain-language goal labels map onto the 3 Automis pillars.
export const GOALS = [
  { id: "marketing", label: "Get more customers", pillar: "Marketing & Growth", label_it: "Trova più clienti", pillar_it: "Marketing e crescita" },
  { id: "sales", label: "Never miss a lead", pillar: "Sales & Acquisition", label_it: "Non perdere un lead", pillar_it: "Vendite e acquisizione" },
  { id: "admin", label: "Run the back office", pillar: "Admin & Company Brain", label_it: "Gestisci il back office", pillar_it: "Admin e cervello aziendale" },
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
    it: {
      title: "Receptionist vocale IA",
      problem: "Le chiamate arrivano mentre sei con un cliente, fuori orario o nel weekend, e finiscono in segreteria.",
      automate: "Un agente vocale IA risponde a ogni chiamata 24/7, qualifica chi chiama, fissa l'appuntamento e lo sincronizza con il tuo calendario e il CRM.",
      outcome: "Nessuna chiamata resta senza risposta, e più chiamate si trasformano in appuntamenti fissati.",
      liveLabel: "Guardala dal vivo",
    },
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
    it: {
      title: "Recupero delle chiamate perse",
      problem: "Una chiamata persa di solito è un cliente perso, che semplicemente chiama l'attività successiva nella lista.",
      automate: "Nel momento in cui una chiamata va persa, parte un SMS automatico che riapre la conversazione e propone di essere richiamati o un link per prenotare.",
      outcome: "Recuperi una quota significativa di chiamate perse che altrimenti se ne andrebbero.",
      liveLabel: "Guardala dal vivo",
    },
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
    it: {
      title: "DM di Instagram e Facebook nel CRM",
      problem: "I lead arrivano nei DM dei tuoi social e finiscono sepolti prima che qualcuno riesca a qualificarli e a ricontattarli.",
      automate: "Un agente IA risponde a ogni DM di Instagram e Facebook, qualifica il lead e lo scrive direttamente nel tuo CRM con tutto il contesto.",
      outcome: "Ogni richiesta dai social diventa un lead tracciato su cui il tuo team può agire.",
      liveLabel: "Guardala dal vivo",
    },
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
    it: {
      title: "Risposta alle richieste 24/7",
      problem: "Chi risponde per primo di solito conquista il cliente, ma le richieste arrivano a qualsiasi ora.",
      automate: "L'IA risponde all'istante alle richieste da form web, chat e WhatsApp, giorno e notte, e smista quelle qualificate alla persona giusta.",
      outcome: "Tempo di risposta al lead misurato in secondi anziché in ore.",
    },
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
    it: {
      title: "Qualifica e smistamento dei lead",
      problem: "Il tuo team perde tempo sui lead non qualificati e rallenta quelli buoni.",
      automate: "L'IA valuta ogni lead in base ai tuoi criteri, gli assegna un punteggio e smista in automatico quelli qualificati alla persona giusta del team.",
      outcome: "Il tempo delle vendite va ai lead con più probabilità di chiudere.",
    },
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
    it: {
      title: "Note vocali da audio a CRM",
      problem: "Gli appunti da chiamate e sopralluoghi restano nella tua testa o su foglietti e non arrivano mai nel sistema.",
      automate: "Registri una nota vocale al volo e l'IA la trascrive, la struttura e scrive l'aggiornamento direttamente nella scheda giusta del CRM.",
      outcome: "Il tuo CRM resta aggiornato senza che nessuno debba digitarlo.",
    },
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
    it: {
      title: "Agente IA per ads e creatività",
      problem: "Il budget pubblicitario si disperde su creatività stanche e campagne che nessuno ha il tempo di ottimizzare.",
      automate: "Un sistema IA genera e testa le creatività degli annunci su Meta e Google, e sposta il budget verso ciò che converte davvero.",
      outcome: "Una fetta maggiore di ogni euro speso va agli annunci che funzionano.",
    },
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
    it: {
      title: "Agente di visibilità SEO e GEO",
      problem: "Sei invisibile su Google e nelle nuove risposte dell'IA, dove ora cercano i clienti.",
      automate: "Un flusso di contenuti basato su IA ricerca, scrive e pubblica pagine pensate per posizionarsi su Google ed essere citate nelle ricerche IA.",
      outcome: "Visibilità organica costante senza un team di contenuti a tempo pieno.",
    },
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
    it: {
      title: "Motore per recensioni e reputazione",
      problem: "I clienti soddisfatti lasciano raramente recensioni, e quella negativa ogni tanto resta senza risposta.",
      automate: "L'IA chiede le recensioni al momento giusto, ti gira in privato i feedback negativi e prepara le risposte alle recensioni pubbliche.",
      outcome: "Un flusso di recensioni positive più forte e costante.",
    },
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
    it: {
      title: "Flusso per contenuti e social",
      problem: "Pubblicare con costanza salta nel momento in cui le cose si fanno frenetiche.",
      automate: "L'IA trasforma ogni materiale di partenza in una serie di post in linea con il brand, programmati sui tuoi canali con una cadenza prestabilita.",
      outcome: "Una presenza costante che va avanti da sola.",
    },
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
    it: {
      title: "Campagne di riattivazione del database",
      problem: "La tua lista di ex clienti è una miniera d'oro lasciata intatta.",
      automate: "L'IA segmenta i tuoi contatti esistenti e lancia sequenze personalizzate via SMS ed email per riconquistarli e farli tornare.",
      outcome: "Nuovo fatturato da clienti che avevi già.",
    },
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
    it: {
      title: "Company Brain (RAG sui tuoi documenti)",
      problem: "La risposta a qualsiasi domanda è sepolta in una cartella, in una casella email o nella memoria di una sola persona.",
      automate: "Costruiamo un cervello privato e ricercabile sui tuoi documenti: il tuo team fa una domanda in linguaggio naturale e ottiene una risposta con le fonti.",
      outcome: "La conoscenza aziendale diventa subito reperibile, invece di andare persa.",
      liveLabel: "Guardala dal vivo",
    },
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
    it: {
      title: "OCR da scansione al Brain",
      problem: "Moduli cartacei, contratti e PDF si accumulano come dati in cui nessuno può cercare.",
      automate: "L'IA legge i documenti scansionati con OCR e visione artificiale, estrae i campi chiave e li archivia come dati strutturati e ricercabili.",
      outcome: "Le scartoffie diventano dati che puoi davvero interrogare.",
    },
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
    it: {
      title: "Acquisizione e smistamento automatico dei documenti",
      problem: "I documenti e gli allegati in arrivo hanno bisogno di qualcuno che li apra, li rinomini e li archivi uno per uno.",
      automate: "L'IA legge ogni documento in arrivo, lo classifica, lo rinomina e lo instrada nel posto giusto, con la scheda corretta collegata.",
      outcome: "Ore di archiviazione manuale tolte dalla settimana.",
    },
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
    it: {
      title: "Abbinamento immobiliare per le agenzie",
      problem: "Abbinare a mano le nuove richieste degli acquirenti ai tuoi annunci è lento e facile da sbagliare.",
      automate: "L'IA confronta i criteri di ogni acquirente con il tuo portafoglio aggiornato e fa emergere gli annunci più adatti nel momento in cui vengono inseriti.",
      outcome: "L'immobile giusto arriva per primo all'acquirente giusto.",
    },
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
    it: {
      title: "Automazione delle operazioni di back office",
      problem: "Fatturazione, promemoria e aggiornamenti di stato divorano la giornata in piccole attività ripetitive.",
      automate: "L'IA gestisce i flussi di routine del back office: prepara le fatture, invia i promemoria e aggiorna le schede sui tuoi strumenti.",
      outcome: "L'amministrazione va avanti da sola, così il tuo team lavora sulle cose che contano davvero.",
    },
  },
];

// Locale-aware accessor. For "it" it swaps in the Italian labels/pillars and
// spreads each automation's `it` fields over its English base. Any other locale
// returns the English data untouched.
export function getAutomationsData(locale) {
  if (locale !== "it") return { NICHES, GOALS, GOAL_BY_ID, AUTOMATIONS };
  const niches = NICHES.map((n) => ({ ...n, label: n.label_it }));
  const goals = GOALS.map((g) => ({ ...g, label: g.label_it, pillar: g.pillar_it }));
  const goalById = goals.reduce((acc, g) => { acc[g.id] = g; return acc; }, {});
  const automations = AUTOMATIONS.map((a) => ({ ...a, ...a.it }));
  return { NICHES: niches, GOALS: goals, GOAL_BY_ID: goalById, AUTOMATIONS: automations };
}
