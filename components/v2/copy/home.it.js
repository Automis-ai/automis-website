/* Home v2 (IT). Sette sezioni, nell'ordine della §6 del brief:
   hero, proof, categories, how, cases, finder (il componente esistente porta i suoi testi), chiusura (founders, guarantee, faq, book).
   I percorsi dei link sono senza prefisso di lingua. */
export default {
  meta: {
    title: "Automis | Agenzia IA per marketing, vendite e amministrazione",
    description:
      "Ascoltiamo come lavori, poi costruiamo i sistemi IA che mancano alla tua azienda: marketing, vendite, assistenza, amministrazione e risorse umane.",
  },

  hero: {
    eyebrow: "Agenzia IA",
    title: "Costruiamo il sistema IA che manca alla tua azienda.",
    highlight: ["sistema IA"],
    lead: "Prima ascoltiamo come lavori, poi lo costruiamo su misura. Con sistemi che lavorano già ogni giorno per i nostri clienti.",
    cta: "Raccontaci il tuo caso",
    ctaSecondary: "Guarda i casi",
    call: {
      title: "Chiamata dimostrativa",
      status: "Ascolta come risponde",
      play: "Ascolta la chiamata",
      pause: "Metti in pausa",
      replay: "Riascolta la chiamata",
      agent: "Automis",
      caller: "Cliente",
      transcript: "Leggi la conversazione",
      note: "Dimostrazione con voci di esempio.",
      aria: "Chiamata dimostrativa: un assistente vocale fissa un appuntamento",
      lines: [
        "Automis, buonasera. Come posso aiutarla?",
        "Buonasera. Vorrei prenotare un appuntamento.",
        "Certamente. Ho un posto giovedì, alle dieci e mezza. Le va bene?",
        "Sì, perfetto.",
        "Benissimo. Le ho appena inviato un SMS con la conferma. Desidera altro?",
        "No, grazie mille.",
        "Di nulla. Le auguro una buona serata!",
      ],
    },
  },

  proof: {
    label: "Già al lavoro per",
    figure: "872",
    figureLabel: "chiamate gestite dall'assistente vocale di una clinica dentale di Lisbona in sette mesi",
  },

  categories: {
    title: "Un sistema per ogni area della tua azienda",
    lead: "Parti dall'area in cui perdi più tempo.",
    items: [
      { slug: "marketing", title: "Sistemi di Marketing" },
      { slug: "sales", title: "Sistemi di Vendita" },
      { slug: "support", title: "Sistemi di Assistenza" },
      { slug: "admin", title: "Sistemi di Amministrazione" },
      { slug: "hr", title: "Sistemi di Risorse umane" },
    ],
    cta: "Vedi tutti i sistemi",
  },

  how: {
    title: "Come lavoriamo",
    steps: [
      { title: "Ascolto e diagnosi", line: "Capiamo come lavori e dove perdi tempo." },
      { title: "Progettazione e attivazione", line: "Costruiamo il sistema su misura, tu lo provi per primo." },
      { title: "Gestione e miglioramento", line: "Controlliamo il sistema e lo miglioriamo ogni mese." },
    ],
    cta: "Scopri come lavoriamo",
  },

  cases: {
    title: "Sistemi già al lavoro",
    items: [
      {
        slug: "clinica-santa-maria",
        client: "Clínica Santa Maria dos Olivais",
        tag: "Receptionist vocale IA",
        system: "Un assistente vocale risponde e fissa gli appuntamenti.",
        figure: "872",
        figureLabel: "chiamate in sette mesi",
        cta: "Leggi il caso",
        href: "/use-cases/clinica-santa-maria",
      },
      {
        slug: "adifesa",
        client: "ADifesa",
        tag: "Automazione Meta",
        system: "Un'automazione risponde su Facebook e Instagram e raccoglie i dati di chi scrive.",
        figure: "2.329",
        figureLabel: "conversazioni in cinque mesi",
        cta: "Leggi il caso",
        href: "/use-cases/adifesa",
      },
    ],
    all: "Tutti i casi studio",
  },


  founders: {
    title: "Due fondatori che ci mettono le mani",
    line: "Chi progetta il tuo sistema è lo stesso che lo costruisce.",
    items: [
      { name: "Vincenzo Luca Casillo", role: "Crescita e marketing guidati dall'IA" },
      { name: "Arcangelo Bianco", role: "Automazione IA e audit" },
    ],
  },

  guarantee: {
    title: "La nostra garanzia",
    line: "30 giorni di garanzia sui risultati per ogni piano Voice AI.",
  },

  faq: {
    title: "Risposte dirette",
    items: [
      {
        q: "In quanto tempo si parte?",
        a: "Voice AI e automazioni semplici partono in circa 7 giorni. Per i sistemi complessi i tempi sono su misura, e li concordiamo con te prima di iniziare.",
      },
      {
        q: "Quanto costa?",
        a: "Voice AI parte da 297 €/mese. Il resto lo preventiviamo dopo aver capito come lavori: costruiamo sui tuoi processi, senza pacchetti standard.",
      },
      {
        q: "I miei dati sono al sicuro?",
        a: "Rispettiamo il GDPR dal primo giorno. I dati possono stare su server UE, i casi delicati passano a una persona e prima di partire ti diciamo quali fornitori trattano quali dati e dove.",
      },
      {
        q: "Serve personale tecnico?",
        a: "No. Costruiamo, attiviamo e manteniamo tutto noi, tu lo usi. Quello che consegniamo è tuo, senza scatole nere in affitto.",
      },
      {
        q: "Cosa succede dopo il lancio?",
        a: "Restiamo con te. Ogni mese controlliamo come va il sistema e lo miglioriamo, con una persona che supervisiona il risultato.",
      },
      {
        q: "E se non funziona per noi?",
        a: "Ogni piano Voice AI ha 30 giorni di garanzia sui risultati, e se un progetto su misura ha un costo di setup, te lo rimborsiamo. Il rischio del primo passo lo prendiamo noi.",
      },
    ],
  },

  book: {
    title: "Raccontaci come funziona la tua azienda",
    lead: "Trenta minuti, senza impegno. Ti ascoltiamo e poi ti diciamo da dove partiremmo.",
  },
};
