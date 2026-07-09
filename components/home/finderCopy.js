// Fonte unica della copy del "AI Opportunity Finder" (EN + IT).
// 6 domande. Ogni opzione porta i pesi di scoring verso i 3 pilastri (w) e un
// contributo di ore risparmiate/settimana (h). Testo per locale, pesi condivisi.
//
// Importata sia da components/home/OpportunityFinder.js (home EN/IT) sia da
// components/luca/LucaFinder.js (landing /luca-ig), per evitare duplicazione
// e derive tra i due Finder.

export const FINDER_COPY = {
  en: {
    eyebrow: "Free · 60 seconds · no call required",
    title: "The AI Opportunity Finder",
    lead: "Answer 6 quick questions and get an instant, personalized roadmap of the top automations for your business, plus how much time they could give you back.",
    yourResults: "Your results",
    question: "Question",
    of: "of",
    back: "Back",
    hereIsWhatWeFound: "Here's what we found",
    startWith: "Start with",
    timeBack: "Time back / week",
    hrs: "hrs",
    focusPillar: "Focus pillar",
    unlockTitle: "Unlock your top 3 automations + PDF roadmap",
    unlockSubtitle: "Get the full personalized roadmap on screen and a copy in your inbox.",
    namePlaceholder: "Your name",
    emailPlaceholder: "Your email",
    buildingRoadmap: "Building your roadmap…",
    unlockCta: "Unlock my roadmap",
    noSpam: "No spam. No credit card. Unsubscribe anytime.",
    roadmapReady: "Your roadmap is ready",
    top3Title: "Your top 3 automations",
    pdfDownloaded: "Your PDF roadmap just downloaded. A copy is on its way to your inbox.",
    newsletterNote: "You're also on the Automis list, so you'll get occasional AI news, tips, and updates. Unsubscribe anytime.",
    spamNote: "Don't see the email? Check your spam or promotions folder.",
    buildCta: "Want us to build these? Book a call",
    downloadAgain: "Download PDF again",
    disclaimer: "Estimates are indicative and depend on your volume and setup.",
    questions: [
      {
        id: "sector",
        q: "What kind of business do you run?",
        options: [
          { label: "Healthcare / clinic", w: { sales: 2, admin: 2 }, h: 6 },
          { label: "Professional / financial services", w: { sales: 2, admin: 3 }, h: 7 },
          { label: "Real estate", w: { sales: 3, marketing: 1 }, h: 5 },
          { label: "Local business / services", w: { sales: 2, marketing: 1 }, h: 4 },
          { label: "E-commerce / retail", w: { marketing: 2, sales: 2 }, h: 5 },
          { label: "Hospitality / restaurant", w: { sales: 3, admin: 1 }, h: 5 },
        ],
      },
      {
        id: "leak",
        q: "Where do you lose the most time or money?",
        options: [
          { label: "Missed & unanswered calls", w: { sales: 3 }, h: 6 },
          { label: "Slow lead follow-up", w: { sales: 2, marketing: 1 }, h: 5 },
          { label: "Manual admin & paperwork", w: { admin: 3 }, h: 8 },
          { label: "Marketing that doesn't convert", w: { marketing: 3 }, h: 4 },
          { label: "Scattered company knowledge", w: { admin: 3 }, h: 6 },
        ],
      },
      {
        id: "channel",
        q: "How do customers usually reach you?",
        options: [
          { label: "Phone calls", w: { sales: 3 }, h: 5 },
          { label: "Web forms", w: { sales: 1, marketing: 2 }, h: 3 },
          { label: "Social & WhatsApp", w: { sales: 2, marketing: 1 }, h: 4 },
          { label: "A mix of everything", w: { sales: 2, marketing: 1, admin: 1 }, h: 5 },
        ],
      },
      {
        id: "volume",
        q: "How many leads or inquiries do you get per week?",
        options: [
          { label: "Under 20", w: {}, h: 2 },
          { label: "20 to 100", w: {}, h: 4 },
          { label: "100 to 500", w: {}, h: 7 },
          { label: "500+", w: {}, h: 10 },
        ],
      },
      {
        id: "tried",
        q: "What have you tried so far?",
        options: [
          { label: "Nothing yet", w: {}, h: 3 },
          { label: "Hired more staff", w: { admin: 1 }, h: 4 },
          { label: "Basic tools / a chatbot", w: { sales: 1 }, h: 2 },
          { label: "Worked with an agency", w: { marketing: 1 }, h: 2 },
        ],
      },
      {
        id: "goal",
        q: "What's your #1 goal for the next 90 days?",
        options: [
          { label: "More booked appointments", w: { sales: 3 }, h: 6 },
          { label: "Faster response to leads", w: { sales: 2, marketing: 1 }, h: 5 },
          { label: "Free up my team's time", w: { admin: 3 }, h: 7 },
          { label: "Better marketing ROI", w: { marketing: 3 }, h: 4 },
          { label: "Organise company knowledge", w: { admin: 3 }, h: 5 },
        ],
      },
    ],
    pillars: {
      sales: {
        name: "Sales & Acquisition",
        plays: [
          "24/7 AI Voice Agent to answer & qualify every call",
          "Missed-call recovery with instant SMS follow-up",
          "Social & WhatsApp automation feeding your CRM",
        ],
      },
      admin: {
        name: "Admin & Company Brain",
        plays: [
          "Custom RAG “Second Brain” over your documents",
          "Scan-to-Brain OCR to digitise paperwork",
          "Audio-to-CRM voice notes, written automatically",
        ],
      },
      marketing: {
        name: "Marketing & Growth",
        plays: [
          "AI Ads & Creative Agent across Meta & Google",
          "SEO / GEO visibility in Google and AI search",
          "Automated content & reputation workflows",
        ],
      },
    },
  },
  it: {
    eyebrow: "Gratis · 60 secondi · senza call",
    title: "Trova le tue opportunità IA",
    lead: "Rispondi a 6 domande veloci e ottieni subito una roadmap su misura: le automazioni che contano di più per il tuo business e quanto tempo ti fanno risparmiare.",
    yourResults: "I tuoi risultati",
    question: "Domanda",
    of: "di",
    back: "Indietro",
    hereIsWhatWeFound: "Ecco cosa è emerso",
    startWith: "Parti da",
    timeBack: "Tempo risparmiato / settimana",
    hrs: "ore",
    focusPillar: "Pilastro prioritario",
    unlockTitle: "Sblocca le tue 3 automazioni + roadmap PDF",
    unlockSubtitle: "Vedi la roadmap completa su misura a schermo e ricevine una copia via email.",
    namePlaceholder: "Il tuo nome",
    emailPlaceholder: "La tua email",
    buildingRoadmap: "Sto preparando la tua roadmap…",
    unlockCta: "Sblocca la mia roadmap",
    noSpam: "Niente spam. Nessuna carta richiesta. Ti disiscrivi quando vuoi.",
    roadmapReady: "La tua roadmap è pronta",
    top3Title: "Le tue 3 automazioni top",
    pdfDownloaded: "La tua roadmap PDF è stata scaricata. Una copia sta arrivando nella tua email.",
    newsletterNote: "Entri anche nella lista Automis: ogni tanto riceverai novità, consigli e aggiornamenti sull'IA. Ti disiscrivi quando vuoi.",
    spamNote: "Non vedi l'email? Controlla la cartella spam o promozioni.",
    buildCta: "Vuoi che le costruiamo noi? Prenota una call",
    downloadAgain: "Scarica di nuovo il PDF",
    disclaimer: "Le stime sono indicative e variano in base ai tuoi volumi e alla configurazione.",
    questions: [
      {
        id: "sector",
        q: "Che tipo di attività gestisci?",
        options: [
          { label: "Sanità / clinica", w: { sales: 2, admin: 2 }, h: 6 },
          { label: "Servizi professionali / finanziari", w: { sales: 2, admin: 3 }, h: 7 },
          { label: "Immobiliare", w: { sales: 3, marketing: 1 }, h: 5 },
          { label: "Attività locale / servizi", w: { sales: 2, marketing: 1 }, h: 4 },
          { label: "E-commerce / retail", w: { marketing: 2, sales: 2 }, h: 5 },
          { label: "Ristorazione / hotel", w: { sales: 3, admin: 1 }, h: 5 },
        ],
      },
      {
        id: "leak",
        q: "Dove perdi più tempo o denaro?",
        options: [
          { label: "Chiamate perse o senza risposta", w: { sales: 3 }, h: 6 },
          { label: "Follow-up lenti sui contatti", w: { sales: 2, marketing: 1 }, h: 5 },
          { label: "Pratiche e attività manuali", w: { admin: 3 }, h: 8 },
          { label: "Marketing che non converte", w: { marketing: 3 }, h: 4 },
          { label: "Informazioni aziendali sparse ovunque", w: { admin: 3 }, h: 6 },
        ],
      },
      {
        id: "channel",
        q: "Come ti contattano di solito i clienti?",
        options: [
          { label: "Telefonate", w: { sales: 3 }, h: 5 },
          { label: "Moduli sul sito", w: { sales: 1, marketing: 2 }, h: 3 },
          { label: "Social & WhatsApp", w: { sales: 2, marketing: 1 }, h: 4 },
          { label: "Un mix di tutto", w: { sales: 2, marketing: 1, admin: 1 }, h: 5 },
        ],
      },
      {
        id: "volume",
        q: "Quanti contatti o richieste ricevi a settimana?",
        options: [
          { label: "Meno di 20", w: {}, h: 2 },
          { label: "Da 20 a 100", w: {}, h: 4 },
          { label: "Da 100 a 500", w: {}, h: 7 },
          { label: "500+", w: {}, h: 10 },
        ],
      },
      {
        id: "tried",
        q: "Cosa hai provato finora?",
        options: [
          { label: "Ancora niente", w: {}, h: 3 },
          { label: "Ho assunto più personale", w: { admin: 1 }, h: 4 },
          { label: "Strumenti base / un chatbot", w: { sales: 1 }, h: 2 },
          { label: "Mi sono affidato a un'agenzia", w: { marketing: 1 }, h: 2 },
        ],
      },
      {
        id: "goal",
        q: "Qual è il tuo obiettivo n.1 per i prossimi 90 giorni?",
        options: [
          { label: "Più appuntamenti prenotati", w: { sales: 3 }, h: 6 },
          { label: "Rispondere più in fretta ai contatti", w: { sales: 2, marketing: 1 }, h: 5 },
          { label: "Liberare tempo al mio team", w: { admin: 3 }, h: 7 },
          { label: "Un marketing che rende di più", w: { marketing: 3 }, h: 4 },
          { label: "Mettere ordine nelle informazioni aziendali", w: { admin: 3 }, h: 5 },
        ],
      },
    ],
    pillars: {
      sales: {
        name: "Vendite & Acquisizione",
        plays: [
          "Agente vocale IA 24/7 che risponde e qualifica ogni chiamata",
          "Recupero delle chiamate perse con SMS di follow-up immediato",
          "Automazioni social & WhatsApp che alimentano il tuo CRM",
        ],
      },
      admin: {
        name: "Operations & Company Brain",
        plays: [
          "Un “Second Brain” RAG sui tuoi documenti",
          "OCR Scan-to-Brain per digitalizzare le pratiche",
          "Note vocali trascritte e portate nel CRM in automatico",
        ],
      },
      marketing: {
        name: "Marketing & Crescita",
        plays: [
          "Agente IA per ads e creatività su Meta e Google",
          "Visibilità SEO / GEO su Google e sulle ricerche IA",
          "Workflow automatici per contenuti e reputazione online",
        ],
      },
    },
  },
};

// Etichetta delle ore risparmiate, localizzata. Finisce nel custom field GHL
// contact.hours_saved (e quindi nelle email automatiche).
export function hoursLabel(hoursLow, hoursHigh, locale) {
  const unit = locale === "it" ? "settimana" : "week";
  return `${hoursLow}-${hoursHigh}/${unit}`;
}
