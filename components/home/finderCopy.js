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
  pt: {
    eyebrow: "Grátis · 60 segundos · sem chamada",
    title: "Descubra as suas oportunidades IA",
    lead: "Responda a 6 perguntas rápidas e receba, na hora, um roadmap personalizado com as automações que mais contam para o seu negócio, e quanto tempo lhe podem devolver.",
    yourResults: "Os seus resultados",
    question: "Pergunta",
    of: "de",
    back: "Voltar",
    hereIsWhatWeFound: "Foi isto que encontrámos",
    startWith: "Comece por",
    timeBack: "Tempo devolvido / semana",
    hrs: "h",
    focusPillar: "Pilar prioritário",
    unlockTitle: "Desbloqueie as suas 3 automações + roadmap em PDF",
    unlockSubtitle: "Veja o roadmap completo personalizado no ecrã e receba uma cópia na sua caixa de entrada.",
    namePlaceholder: "O seu nome",
    emailPlaceholder: "O seu email",
    buildingRoadmap: "A preparar o seu roadmap…",
    unlockCta: "Desbloquear o meu roadmap",
    noSpam: "Sem spam. Sem cartão de crédito. Cancele quando quiser.",
    roadmapReady: "O seu roadmap está pronto",
    top3Title: "As suas 3 automações principais",
    pdfDownloaded: "O seu roadmap em PDF acabou de ser descarregado. Uma cópia está a caminho da sua caixa de entrada.",
    newsletterNote: "Passa também a fazer parte da lista Automis, por isso vai receber, de vez em quando, novidades, dicas e atualizações sobre IA. Cancele quando quiser.",
    spamNote: "Não vê o email? Verifique a pasta de spam ou promoções.",
    buildCta: "Quer que os construamos? Agende uma chamada",
    downloadAgain: "Descarregar o PDF de novo",
    disclaimer: "As estimativas são indicativas e dependem do seu volume e configuração.",
    questions: [
      {
        id: "sector",
        q: "Que tipo de negócio gere?",
        options: [
          { label: "Saúde / clínica", w: { sales: 2, admin: 2 }, h: 6 },
          { label: "Serviços profissionais / financeiros", w: { sales: 2, admin: 3 }, h: 7 },
          { label: "Imobiliário", w: { sales: 3, marketing: 1 }, h: 5 },
          { label: "Negócio local / serviços", w: { sales: 2, marketing: 1 }, h: 4 },
          { label: "E-commerce / retalho", w: { marketing: 2, sales: 2 }, h: 5 },
          { label: "Hotelaria / restauração", w: { sales: 3, admin: 1 }, h: 5 },
        ],
      },
      {
        id: "leak",
        q: "Onde perde mais tempo ou dinheiro?",
        options: [
          { label: "Chamadas perdidas e sem resposta", w: { sales: 3 }, h: 6 },
          { label: "Follow-up lento aos contactos", w: { sales: 2, marketing: 1 }, h: 5 },
          { label: "Burocracia e tarefas manuais", w: { admin: 3 }, h: 8 },
          { label: "Marketing que não converte", w: { marketing: 3 }, h: 4 },
          { label: "Conhecimento da empresa disperso", w: { admin: 3 }, h: 6 },
        ],
      },
      {
        id: "channel",
        q: "Como é que os clientes costumam contactá-lo?",
        options: [
          { label: "Chamadas telefónicas", w: { sales: 3 }, h: 5 },
          { label: "Formulários no site", w: { sales: 1, marketing: 2 }, h: 3 },
          { label: "Redes sociais & WhatsApp", w: { sales: 2, marketing: 1 }, h: 4 },
          { label: "Uma mistura de tudo", w: { sales: 2, marketing: 1, admin: 1 }, h: 5 },
        ],
      },
      {
        id: "volume",
        q: "Quantos contactos ou pedidos recebe por semana?",
        options: [
          { label: "Menos de 20", w: {}, h: 2 },
          { label: "De 20 a 100", w: {}, h: 4 },
          { label: "De 100 a 500", w: {}, h: 7 },
          { label: "500+", w: {}, h: 10 },
        ],
      },
      {
        id: "tried",
        q: "O que já experimentou até agora?",
        options: [
          { label: "Ainda nada", w: {}, h: 3 },
          { label: "Contratei mais pessoal", w: { admin: 1 }, h: 4 },
          { label: "Ferramentas básicas / um chatbot", w: { sales: 1 }, h: 2 },
          { label: "Trabalhei com uma agência", w: { marketing: 1 }, h: 2 },
        ],
      },
      {
        id: "goal",
        q: "Qual é o seu objetivo n.º 1 para os próximos 90 dias?",
        options: [
          { label: "Mais marcações confirmadas", w: { sales: 3 }, h: 6 },
          { label: "Responder mais depressa aos contactos", w: { sales: 2, marketing: 1 }, h: 5 },
          { label: "Libertar tempo à minha equipa", w: { admin: 3 }, h: 7 },
          { label: "Melhor ROI de marketing", w: { marketing: 3 }, h: 4 },
          { label: "Organizar o conhecimento da empresa", w: { admin: 3 }, h: 5 },
        ],
      },
    ],
    pillars: {
      sales: {
        name: "Vendas & Aquisição",
        plays: [
          "Assistente de voz IA 24/7 para atender e qualificar cada chamada",
          "Recuperação de chamadas perdidas com SMS de follow-up imediato",
          "Automação de redes sociais & WhatsApp a alimentar o seu CRM",
        ],
      },
      admin: {
        name: "Administração & Company Brain",
        plays: [
          "Um “Second Brain” RAG à medida sobre os seus documentos",
          "OCR Scan-to-Brain para digitalizar a papelada",
          "Notas de voz escritas no CRM, automaticamente",
        ],
      },
      marketing: {
        name: "Marketing & Crescimento",
        plays: [
          "Agente IA de anúncios e criatividades no Meta e Google",
          "Visibilidade SEO / GEO no Google e na pesquisa por IA",
          "Workflows automáticos de conteúdo e reputação",
        ],
      },
    },
  },
};

// Etichetta delle ore risparmiate, localizzata. Finisce nel custom field GHL
// contact.hours_saved (e quindi nelle email automatiche).
export function hoursLabel(hoursLow, hoursHigh, locale) {
  const unit = locale === "it" ? "settimana" : locale === "pt" ? "semana" : "week";
  return `${hoursLow}-${hoursHigh}/${unit}`;
}
