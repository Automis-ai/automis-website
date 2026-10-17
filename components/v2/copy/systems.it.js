/* Sistemi v2 (IT): l'hub /systems e le cinque categorie /systems/<slug>.
   Il meta di primo livello è quello dell'hub; ogni categoria ha il suo meta.
   Scheda = { id, kicker, title, short, line, more, href, caseHref, price }.
   href = pagina propria della scheda (solo prodotti); caseHref = caso studio (badge «Caso reale →»).
   short è la riga visibile (al massimo ~9 parole); line (cosa fa) e more (il problema) si aprono a richiesta (Disclosure). Percorsi senza prefisso di lingua. */
export default {
  meta: {
    title: "Automazione IA per aziende: marketing e vendite | Automis",
    description:
      "Sistemi IA costruiti sul tuo modo di lavorare: marketing, vendite, assistenza e amministrazione, più assistente vocale, e-commerce e Company Brain.",
  },

  labels: {
    more: "Leggi di più",
  },

  hub: {
    hero: {
      eyebrow: "Sistemi IA",
      title: "I sistemi che mancano alla tua azienda",
      highlight: "che mancano",
      lead: "Scegli un'area. Ogni sistema nasce dal tuo modo di lavorare.",
    },
    categories: {
      items: [
        { slug: "marketing", title: "Sistemi IA per il Marketing", line: "Ads, SEO, contenuti, recensioni e negozio online." },
        { slug: "sales", title: "Sistemi IA per la Vendita", line: "Ogni contatto riceve risposta e viene seguito." },
        { slug: "support", title: "Sistemi IA per l'Assistenza", line: "Chiamate, chat e messaggi hanno una risposta a ogni ora." },
        { slug: "admin", title: "Sistemi IA per l'Amministrazione", line: "Documenti, dati e routine li gestisce il sistema." },
      ],
    },
    products: {
      title: "Tre prodotti da cui partire",
      items: [
        {
          id: "voice",
          name: "Voice AI",
          line: "Risponde a ogni chiamata, 24/7, e fissa l'appuntamento.",
          price: "da 297 €/mese",
          cta: "Scopri Voice AI",
          href: "/voice-ai",
        },
        {
          id: "ecommerce",
          name: "AI E-commerce Manager",
          line: "Agenti IA che seguono il tuo negozio online.",
          price: null,
          cta: "Scegli la piattaforma",
          href: "/ecommerce",
        },
        {
          id: "company-brain",
          name: "Company Brain",
          line: "Un archivio sui tuoi documenti: il tuo team chiede e riceve la risposta, con la fonte.",
          price: null,
          tag: "Sui tuoi documenti",
          cta: "Scopri il Company Brain",
          href: "/systems/company-brain",
        },
      ],
    },
    cta: {
      title: "Non sai da dove partire?",
      line: "Raccontaci come lavori: ti proponiamo i sistemi che ti servono davvero.",
    },
  },

  marketing: {
    meta: {
      title: "Sistemi IA per il Marketing: ads, SEO e negozio online | Automis",
      description:
        "Sistemi IA per il tuo marketing: ads e creatività, SEO e GEO, recensioni, contenuti, riattivazione clienti e un manager IA per il negozio online.",
    },
    hero: {
      eyebrow: "Sistemi IA per il Marketing",
      title: "Sistemi che mandano avanti il tuo marketing",
      highlight: "il tuo marketing",
      lead: "Ads, SEO, contenuti, recensioni e negozio online, gestiti da un'IA costruita sul tuo modo di lavorare.",
    },
    moment: {
      label: "Dal primo annuncio al social: la catena del marketing",
      steps: [
        { card: "ads-creative", glyph: "target", label: "Annunci" },
        { card: "seo-geo", glyph: "search", label: "Ricerca" },
        { card: "reviews", glyph: "star", label: "Recensioni" },
        { card: "content-social", glyph: "pen", label: "Social" },
      ],
    },
    cards: [
      {
        id: "ads-creative",
        kicker: null,
        title: "Agente per ads e creatività",
        short: "Testa le creatività e porta il budget dove rende.",
        line: "Genera e testa creatività per Meta e Google e sposta il budget su quelle che convertono.",
        more: "Il budget degli annunci si disperde su creatività ormai stanche e su campagne che nessuno ha il tempo di ottimizzare.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "seo-geo",
        kicker: null,
        title: "Agente SEO e GEO",
        short: "Pagine pensate per Google e per le risposte dell'IA.",
        line: "Scrive e pubblica pagine pensate per posizionarsi su Google ed essere citate nelle risposte dell'IA.",
        more: "Ormai i clienti cercano su Google e nelle risposte dell'IA. Senza contenuti costanti non compari in nessuno dei due.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "reviews",
        kicker: null,
        title: "Recensioni e reputazione",
        short: "Chiede le recensioni e prepara le risposte pubbliche.",
        line: "Chiede recensioni al momento giusto, ti passa in privato quelle negative e prepara le risposte pubbliche.",
        more: "I clienti soddisfatti lasciano di rado una recensione, e quella negativa ogni tanto resta senza risposta.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "content-social",
        kicker: null,
        title: "Contenuti e social",
        short: "Parte da un tuo materiale e programma i post.",
        line: "Parte da un tuo materiale e prepara post nello stile del tuo brand, programmati sui tuoi canali.",
        more: "Pubblicare con costanza è la prima cosa che salta quando il lavoro si fa frenetico.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "ecommerce-manager",
        kicker: null,
        title: "AI E-commerce Manager",
        short: "Agenti IA che seguono il tuo negozio, giorno e notte.",
        line: "Agenti IA che seguono il tuo negozio online giorno e notte. Scegli la tua piattaforma.",
        more: "Hosting, sito, annunci ed email controllano ognuno il proprio pezzo, ma nessuno guarda il negozio intero. Questo sistema sì.",
        href: "/ecommerce",
        caseHref: null,
        price: null,
      },
      {
        id: "product-listings",
        kicker: null,
        title: "Schede prodotto da foto",
        short: "Scrive le schede prodotto partendo dalle foto.",
        line: "Scrive descrizioni e schede prodotto partendo dalle foto dei tuoi prodotti.",
        more: "Scrivere una pagina per ogni prodotto richiede tempo, e la foto dice già buona parte di ciò che la pagina deve raccontare.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "video-editing",
        kicker: null,
        title: "Montaggio video",
        short: "Dal girato al video finito, con i sottotitoli.",
        line: "Dal girato al video finito: sceglie i ciak migliori, taglia le pause e aggiunge i sottotitoli.",
        more: "Montare richiede più tempo che girare, ed è spesso quello che impedisce di pubblicare video.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "reactivation",
        kicker: null,
        title: "Campagne di riattivazione del database",
        short: "SMS ed email per far tornare i vecchi clienti.",
        line: "Manda sequenze personalizzate di SMS ed email per far tornare i clienti del passato.",
        more: "Gli ex clienti conoscono già la tua attività, ma di rado qualcuno li ricontatta.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "animated-sites",
        kicker: "Piattaforme",
        title: "Siti animati e 3D",
        short: "Siti con animazioni e 3D per mostrare cosa fai.",
        line: "Siti con animazioni e 3D, pensati per mostrare al meglio la tua attività.",
        more: "Il sito è la prima cosa che molti clienti vedono. Movimento e 3D fanno capire a colpo d'occhio cosa fai.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: null,
    faq: {
      title: "Domande frequenti",
      items: [
        {
          q: "Chi segue le campagne, voi o il sistema?",
          a: "Il sistema fa il lavoro di ogni giorno: prova le creatività e sposta il budget su quelle che convertono. Ogni mese controlliamo i risultati e lo miglioriamo, con una persona che supervisiona.",
        },
        {
          q: "Cos'è il GEO?",
          a: "È il lavoro che rende i tuoi contenuti citabili nelle risposte di ChatGPT, Perplexity e simili, oltre a farli posizionare su Google. Nessuno può garantire una citazione: noi lavoriamo perché i tuoi contenuti siano chiari e pronti a meritarla.",
        },
        {
          q: "L'AI E-commerce Manager può cambiare i prezzi o fare rimborsi?",
          a: "No. Prezzi, rimborsi e resi non vengono mai lasciati a un'IA, e ciò che costa o tocca il negozio aspetta la tua approvazione.",
        },
        {
          q: "Quanto costa?",
          a: "Lo preventiviamo dopo aver capito come lavori, perché costruiamo sui tuoi processi e non su pacchetti standard. Raccontaci il tuo caso e ti diciamo da dove partiremmo.",
        },
      ],
    },
    cta: {
      title: "Quale di questi ti servirebbe di più?",
      line: "Raccontaci la tua attività e ti diciamo da dove partiremmo.",
    },
  },

  sales: {
    meta: {
      title: "Sistemi IA per le vendite: CRM, contatti e DM | Automis",
      description:
        "L'IA risponde a commenti e DM, richiama i contatti degli annunci, qualifica con quiz e gestisce il CRM. Online in 2-4 settimane. Prenota una call.",
    },
    hero: {
      eyebrow: "Sistemi IA per la Vendita",
      title: "Sistemi che non lasciano freddare nessun contatto",
      highlight: "nessun contatto",
      lead: "Rispondono subito, portano il contatto all'appuntamento e lo seguono nel CRM, così il tuo team parla solo con chi è pronto.",
    },
    moment: {
      label: "Dal messaggio al CRM: la catena della vendita",
      steps: [
        { card: "social-dms", glyph: "chat", label: "Messaggio" },
        { card: "lead-qualification", glyph: "sales", label: "Qualifica" },
        { card: "lead-nurture", glyph: "repeat", label: "Seguito" },
        { card: "custom-crm", glyph: "contact", label: "CRM" },
      ],
      result: { value: "2.329", unit: "conversazioni gestite", src: "ADifesa · dal 1/5 al 16/9/2026" },
    },
    // Esempi illustrativi delle vignette (nessun dato vero: contatti inventati, prefisso del paese della pagina)
    dmDemo: {
      caption: "Esempio illustrativo: dal commento alla scheda nel CRM",
      rows: ["Commento: «Posso avere informazioni?»", "DM: risposta con le tue regole"],
      crmLabel: "Contatto nel CRM",
      crmState: "✓ qualificato",
    },
    crmDemo: {
      caption: "Esempio illustrativo: la pipeline del tuo team",
      cols: [
        { name: "Nuovo", cards: [["Contatto 01", "+39 3•• ••• 214", "Informazioni"], ["Contatto 02", "+39 3•• ••• 251", "Preventivo"]] },
        { name: "Contattato", cards: [["Contatto 03", "+39 3•• ••• 288", "Preventivo"]] },
        { name: "Interessato", cards: [["Contatto 04", "+39 3•• ••• 325", "Informazioni"], ["Contatto 05", "+39 3•• ••• 362", "Preventivo"]] },
        { name: "Prenotato", cards: [["Contatto 06", "+39 3•• ••• 399", "Appuntamento"]] },
      ],
    },
    qualDemo: {
      caption: "Esempio illustrativo: i contatti di oggi",
      rows: [["Vuole prenotare", "→ al team", true], ["Chiede informazioni", "Risponde il sistema", false]],
    },
    cards: [
      {
        id: "social-dms",
        kicker: null,
        title: "Commenti e DM di Instagram e Facebook nel CRM",
        short: "Risponde a commenti e DM e aggiorna il CRM.",
        line: "Risponde a ogni commento e DM, qualifica il contatto e lo scrive nel tuo CRM.",
        more: "I contatti arrivano nei commenti e nei DM dei social e restano sepolti prima che qualcuno li ricontatti.",
        href: null,
        caseHref: "/use-cases/adifesa",
        price: null,
      },
      {
        id: "lead-callback",
        kicker: null,
        title: "Richiamo dei contatti degli annunci",
        short: "Richiama chi lascia il numero da un annuncio.",
        line: "Chi lascia il numero da un annuncio viene richiamato da un assistente vocale, che fa le tue domande e propone un appuntamento.",
        more: "Chi lascia il numero da un annuncio vuole una risposta subito. Se deve aspettare, di solito chiama qualcun altro.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "lead-forms",
        kicker: null,
        title: "Moduli e quiz che qualificano",
        short: "Un quiz capisce cosa serve e scrive il contatto nel CRM.",
        line: "Un quiz di poche domande capisce cosa serve a chi lo compila, gli dà un risultato su misura e scrive il contatto nel CRM con le risposte e i tag.",
        more: "Un modulo che raccoglie solo nome ed email porta contatti di cui non sai nulla. Un quiz ti dice già chi hai davanti.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "lead-qualification",
        kicker: null,
        title: "Qualifica e smistamento dei contatti",
        short: "Valuta i contatti con i tuoi criteri, li smista e li porta a prenotare.",
        line: "Valuta ogni contatto sui tuoi criteri, smista quelli buoni alla persona giusta e li porta a prenotare.",
        more: "Il tuo team perde tempo con contatti che non comprano, e quelli buoni aspettano troppo.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "lead-nurture",
        kicker: null,
        title: "Contatti sempre caldi",
        short: "Tiene vivo chi non è ancora pronto.",
        line: "Chi non è ancora pronto riceve una sequenza di messaggi su email, SMS o WhatsApp, scelti in base al contatto e scritti con le tue regole.",
        more: "Molti contatti non sono pronti subito, e senza un seguito si dimenticano di te.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "reactivation-sales",
        kicker: null,
        title: "Riattivazione del database",
        short: "SMS ed email per riportare a parlare con te i contatti fermi.",
        line: "Manda sequenze personalizzate di SMS ed email ai contatti fermi nel database, per riportarli a parlare con te.",
        more: "Nel database ci sono contatti che non hanno comprato e che nessuno ha più richiamato.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "custom-crm",
        kicker: null,
        title: "CRM su misura",
        short: "Un CRM fatto sul modo di vendere del tuo team.",
        line: "Un CRM costruito sul modo di vendere del tuo team: ogni contatto, in che fase è e cosa fare dopo.",
        more: "Contatti e clienti finiscono sparsi tra fogli di calcolo, caselle email e la memoria delle persone.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "voice-notes",
        kicker: null,
        title: "Note vocali nel CRM",
        short: "Una nota vocale diventa una scheda nel CRM.",
        line: "Registri una nota vocale, viene trascritta, strutturata e scritta nella scheda giusta del CRM.",
        more: "Gli appunti di chiamate e sopralluoghi restano nella tua testa o su foglietti e non arrivano mai nel sistema.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: {
      eyebrow: "Caso reale",
      title: "ADifesa",
      line: "Commenti e DM su Facebook e Instagram gestiti e qualificati: 2.329 conversazioni dal 1/5 al 16/9/2026 e 524 schede complete. Secondo l'associazione, 3 schede complete su 10 diventano clienti.",
      cta: "Leggi il caso",
      href: "/use-cases/adifesa",
    },
    finder: {
      eyebrow: "Provalo su di noi",
      title: "Il sistema di vendita che usiamo noi",
      line: "Rispondi a poche domande sulla tua attività: l'Opportunity Finder ti dà una roadmap su misura e tu entri nel nostro CRM come contatto, con le risposte e i tag. È lo stesso percorso che costruiamo per i tuoi contatti.",
      cta: "Prova l'Opportunity Finder",
      steps: ["Quiz sulla tua attività", "Roadmap su misura", "Contatto nel CRM, con risposte e tag"],
    },
    start: {
      eyebrow: "Per partire",
      title: "Cosa serve per cominciare",
      need: {
        label: "Cosa serve da te",
        items: [
          "L'accesso ai canali da cui arrivano i contatti: pagine Instagram e Facebook, numero, modulo.",
          "Le tue regole: cosa rende buono un contatto, cosa rispondere.",
          "Chi del team riceve i contatti buoni.",
          "Il CRM o il foglio che usi oggi, se c'è.",
        ],
        outro: "Il resto lo facciamo noi.",
      },
      times: {
        label: "Tempi",
        text: "Circa 2 settimane per le risposte ai DM, il richiamo dei contatti e i moduli. Circa 4 per un CRM su misura. Si parte quando abbiamo gli accessi.",
      },
      tools: {
        label: "Si collega a",
        title: "Gli strumenti che usi già",
        line: "Se ha un'API, ci colleghiamo: non cambi quello che usi.",
        items: [
          { name: "HubSpot", src: "/assets/images/integrations/hubspot.svg" },
          { name: "Salesforce", src: "/assets/images/integrations/salesforce.svg" },
          { name: "WhatsApp", src: "/assets/images/integrations/whatsapp.svg" },
          { name: "Instagram", src: "/assets/images/integrations/instagram.svg" },
          { name: "Facebook", src: "/assets/images/integrations/facebook.svg" },
          { name: "Google Calendar", src: "/assets/images/integrations/googlecalendar.svg" },
          { name: "Google Sheets", src: "/assets/images/integrations/googlesheets.svg" },
        ],
      },
    },
    faq: {
      title: "Domande frequenti",
      items: [
        {
          q: "Funziona con il CRM che uso già?",
          a: "Se il tuo strumento ha un'API, ci colleghiamo: HubSpot e GoHighLevel, per esempio. Se nessuno fa al caso tuo, costruiamo il CRM sul modo di vendere del tuo team.",
        },
        {
          q: "Chi risponde a commenti e DM, l'IA o una persona?",
          a: "Risponde l'IA, con le tue regole, e scrive nel CRM il contatto qualificato. I casi delicati arrivano a una persona del tuo team.",
        },
        {
          q: "I dati dei miei contatti sono al sicuro?",
          a: "Rispettiamo il GDPR dal primo giorno. I dati possono stare su server UE e, prima di partire, ti diciamo quali fornitori trattano quali dati e dove.",
        },
        {
          q: "Quanto ci vuole per partire?",
          a: "Circa 2 settimane per i sistemi più semplici, come le risposte ai DM, il richiamo dei contatti e i moduli. Circa 4 per un CRM su misura. Il conto parte da quando abbiamo gli accessi e le tue regole.",
        },
        {
          q: "Quanto costa?",
          a: "Lo preventiviamo dopo aver capito come lavori, perché costruiamo sui tuoi processi e non su pacchetti standard. Raccontaci il tuo caso e ti diciamo da dove partiremmo.",
        },
      ],
    },
    cta: {
      title: "Dove si perdono i tuoi contatti?",
      line: "Raccontaci come ti raggiungono oggi e ti mostriamo dove un sistema può aiutare.",
    },
  },

  support: {
    meta: {
      title: "Sistemi IA per l'Assistenza: voce, chat e messaggi | Automis",
      description:
        "Sistemi IA che rispondono ai clienti giorno e notte: receptionist vocale, recupero delle chiamate perse, risposte 24/7 e assistenza e-commerce.",
    },
    hero: {
      eyebrow: "Sistemi IA per l'Assistenza",
      title: "Sistemi che rispondono ai tuoi clienti",
      highlight: "ai tuoi clienti",
      lead: "Al telefono, in chat e nei messaggi, giorno e notte, con una persona pronta per i casi delicati.",
    },
    moment: {
      label: "Dalla chiamata alla risposta: la catena dell'assistenza",
      steps: [
        { card: "voice-receptionist", glyph: "voice", label: "Chiamata" },
        { card: "missed-call-recovery", glyph: "phone", label: "Recupero" },
        { card: "answers-247", glyph: "clock", label: "Risposta" },
        { card: "ecommerce-support", glyph: "cart", label: "Negozio" },
      ],
      result: { value: "872", unit: "chiamate", src: "Clínica Santa Maria dos Olivais · dal 1/2 al 9/9/2026" },
    },
    cards: [
      {
        id: "voice-receptionist",
        kicker: null,
        title: "Segretaria IA",
        short: "Risponde a ogni chiamata, 24/7, e fissa gli appuntamenti.",
        line: "Risponde a ogni chiamata 24/7, fissa gli appuntamenti e passa al team i casi delicati.",
        more: "Le chiamate arrivano mentre sei con un cliente, fuori orario o nel weekend, e finiscono in segreteria.",
        href: "/voice-ai",
        caseHref: "/use-cases/clinica-santa-maria",
        price: "da 297 €/mese",
      },
      {
        id: "missed-call-recovery",
        kicker: null,
        title: "Recupero delle chiamate perse",
        short: "Alla chiamata persa risponde subito un SMS.",
        line: "A una chiamata persa risponde un SMS che propone di richiamare o un link per prenotare.",
        more: "Una chiamata persa di solito è un cliente perso, che chiama l'attività successiva della lista.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "answers-247",
        kicker: null,
        title: "Risposte 24/7",
        short: "Risponde subito a form, chat e WhatsApp.",
        line: "Risponde subito alle richieste da form, chat e WhatsApp, giorno e notte, e le smista.",
        more: "Chi risponde per primo di solito conquista il cliente, ma le richieste arrivano a ogni ora.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "ecommerce-support",
        kicker: null,
        title: "Assistenza clienti e-commerce",
        short: "Risponde su WhatsApp, Instagram ed email con le tue regole.",
        line: "Risponde su WhatsApp, Instagram ed email con le tue regole. I casi delicati arrivano a te.",
        more: "I clienti scrivono dove vogliono, a qualsiasi ora, e un negozio raramente ha qualcuno su ogni canale.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    chat: {
      title: "Così risponde in chat",
      header: "L'assistente dello studio",
      caption: "È tarda sera e l'ufficio è chiuso da ore.",
      messages: [
        { role: "customer", text: "Buonasera, avete qualcosa di libero questa settimana per un appuntamento?" },
        { role: "assistant", text: "Buonasera, sono l'assistente virtuale dello studio (un'IA) e rispondo quando l'ufficio è chiuso. Posso proporti giovedì mattina o venerdì pomeriggio. Quale preferisci?" },
        { role: "customer", text: "Venerdì pomeriggio va bene." },
        { role: "assistant", text: "Perfetto, ti ho fissato venerdì pomeriggio. La conferma arriva qui in chat. Ti serve altro?" },
        { role: "customer", text: "Sì, vorrei un rimborso su una fattura del mese scorso." },
        { role: "assistant", text: "Per questo serve una persona. Ho passato la richiesta al team con tutti i dettagli e ti risponderanno all'apertura." },
      ],
    },
    case: {
      eyebrow: "Caso reale",
      title: "Clínica Santa Maria dos Olivais",
      line: "Un assistente vocale sul telefono di una clinica dentale: 872 chiamate dal 1/2 al 9/9/2026, 527 chiuse dall'assistente e 114 appuntamenti presi.",
      cta: "Leggi il caso",
      href: "/use-cases/clinica-santa-maria",
    },
    faq: {
      title: "Domande frequenti",
      items: [
        {
          q: "Quanto costa il receptionist vocale?",
          a: "Voice AI parte da 297 €/mese. Gli altri sistemi di assistenza li preventiviamo dopo aver capito come lavori, senza pacchetti standard.",
        },
        {
          q: "Quanto ci vuole per attivarlo?",
          a: "Circa 2-4 settimane, a seconda del sistema: circa 2 per i più semplici, circa 4 per un CRM su misura o un progetto più ampio. I tempi li concordiamo con te prima di iniziare.",
        },
        {
          q: "Che fine fanno le chiamate delicate?",
          a: "Passano a una persona del tuo team. L'IA si occupa delle richieste ripetitive, i casi delicati arrivano a te.",
        },
        {
          q: "E se non funziona per noi?",
          a: "Ogni piano Voice AI ha 30 giorni di garanzia sui risultati. Il rischio del primo passo lo prendiamo noi.",
        },
      ],
    },
    cta: {
      title: "Chi risponde quando non puoi?",
      line: "Raccontaci dove ti cercano i clienti e ti mostriamo cosa potrebbe prendere in carico un sistema.",
    },
  },

  admin: {
    meta: {
      title: "Sistemi IA per l'Amministrazione: documenti, contabilità e back office | Automis",
      description:
        "Sistemi IA per il back office: gestionali contabili, Scan-to-Brain per la carta, raccolta e smistamento dei documenti, automazione della routine.",
    },
    hero: {
      eyebrow: "Sistemi IA per l'Amministrazione",
      title: "Sistemi che mandano avanti il tuo back office",
      highlight: "il tuo back office",
      lead: "Documenti, dati e lavoro di routine passano all'IA: il tuo team si occupa delle cose importanti.",
    },
    moment: {
      label: "Dal documento alla scheda: la catena dell'amministrazione",
      steps: [
        { card: "document-intake", glyph: "inbox", label: "Documenti" },
        { card: "scan-to-brain", glyph: "scan", label: "Lettura" },
        { card: "accounting-software", glyph: "receipt", label: "Fatture" },
        { card: "back-office", glyph: "repeat", label: "Back office" },
      ],
    },
    cards: [
      {
        id: "accounting-software",
        kicker: null,
        title: "Gestionali contabili",
        short: "Contabilità sulle tue regole, anche per il 74-ter.",
        line: "Un gestionale contabile sulle tue regole, per esempio il regime IVA 74-ter delle agenzie di viaggio.",
        more: "I regimi speciali come il 74-ter chiedono regole che i software contabili generici non sempre seguono.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "scan-to-brain",
        kicker: null,
        title: "Scan-to-Brain",
        short: "Legge i documenti scansionati e li rende ricercabili.",
        line: "Legge i documenti scansionati, estrae i campi chiave e li archivia come dati ricercabili.",
        more: "Moduli cartacei, contratti e PDF si accumulano e nessuno può cercare le informazioni che contengono.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "document-intake",
        kicker: null,
        title: "Raccolta e smistamento dei documenti",
        short: "Classifica, rinomina e archivia ogni documento in arrivo.",
        line: "Legge ogni documento in arrivo, lo classifica, lo rinomina e lo manda nel posto giusto.",
        more: "I documenti in arrivo hanno bisogno di qualcuno che li apra, li rinomini e li archivi uno per uno.",
        href: null,
        caseHref: null,
        price: null,
      },
      {
        id: "back-office",
        kicker: null,
        title: "Automazione del back office",
        short: "Fatture, promemoria e schede aggiornate da sole.",
        line: "Gestisce la routine: prepara le fatture, invia i promemoria, aggiorna le schede sui tuoi strumenti.",
        more: "Fatture, promemoria e aggiornamenti di stato si mangiano la giornata in tante piccole attività ripetitive.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    case: null,
    brain: {
      title: "Chiedi ai tuoi documenti",
      caption: "Documenti di esempio, già scansionati e archiviati. Tocca una domanda.",
      windowTitle: "Archivio documenti",
      sourceLabel: "Fonte",
      queries: [
        {
          q: "Quando scade il contratto di affitto del magazzino?",
          a: "Il contratto scade a fine anno e si rinnova da solo, salvo disdetta con sei mesi di preavviso.",
          sources: [{ doc: "Contratto di affitto del magazzino", where: "Scansione · articolo 4, durata" }],
        },
        {
          q: "Dove ho archiviato la fattura del fornitore di giugno?",
          a: "È in Fatture fornitori, nella cartella di giugno. L'ho rinominata con data e fornitore, e i dati principali sono nella sua scheda.",
          sources: [{ doc: "Fatture fornitori", where: "Archivio · giugno" }],
        },
        {
          q: "Il fornitore ha già mandato la bolla di consegna?",
          a: "Sì, è arrivata per email stamattina. L'ho letta, classificata come bolla di consegna e archiviata con le altre.",
          sources: [{ doc: "Bolle di consegna", where: "Ricevute per email" }],
        },
      ],
    },
    crossLink: {
      title: "Company Brain",
      line: "Un archivio privato sui tuoi documenti: il tuo team fa una domanda e riceve una risposta con la fonte. Lo trovi nella sua pagina.",
      cta: "Scopri il Company Brain",
      href: "/systems/company-brain",
    },
    faq: {
      title: "Domande frequenti",
      items: [
        {
          q: "I miei documenti sono al sicuro?",
          a: "Rispettiamo il GDPR dal primo giorno. I dati possono stare su server UE e, prima di partire, ti diciamo quali fornitori trattano quali dati e dove.",
        },
        {
          q: "Funziona con i documenti cartacei?",
          a: "Sì. Il sistema legge i documenti scansionati, estrae i campi chiave e li archivia come dati che puoi cercare.",
        },
        {
          q: "Funziona con il gestionale che uso già?",
          a: "Se il programma ha un'API, ci colleghiamo. Dove i software standard non seguono le tue regole, come nel regime 74-ter, costruiamo il gestionale su misura.",
        },
        {
          q: "Qualcuno controlla il lavoro dell'IA?",
          a: "Sì. Una persona supervisiona i risultati, i casi delicati arrivano al tuo team e ogni mese miglioriamo il sistema.",
        },
      ],
    },
    cta: {
      title: "Quali scartoffie ti rubano la settimana?",
      line: "Raccontaci cosa fa a mano il tuo team e ti mostriamo cosa può prendere in carico un sistema.",
    },
  },

  "company-brain": {
    meta: {
      title: "Company Brain: l'IA che risponde dai tuoi file | Automis",
      description:
        "Un archivio privato sui tuoi documenti: il team chiede, l'IA risponde con la fonte e tu smetti di essere il manuale dell'azienda. Scopri come funziona.",
    },
    hero: {
      eyebrow: "Company Brain",
      title: "Smetti di essere il manuale della tua azienda",
      highlight: "il manuale della tua azienda",
      lead: "Chi lavora da te chiede e l'archivio risponde, con il documento da cui arriva. Lo prepariamo noi, e decidi tu dove stanno i dati.",
    },
    cards: [
      {
        id: "company-brain",
        kicker: null,
        title: "Company Brain",
        short: "Chiedi come parli, ricevi la risposta con la fonte.",
        line: "Un archivio privato sui tuoi documenti: chi lavora da te fa una domanda e riceve la risposta, con il documento da cui arriva.",
        more: "Per sapere come si fa una cosa devi trovare la persona giusta, e non sempre è disponibile.",
        href: null,
        caseHref: null,
        price: null,
      },
    ],
    brain: {
      title: "Chiedi al Brain",
      caption: "Azienda e documenti di esempio. Tocca una domanda.",
      placeholder: "Chiedi qualsiasi cosa sull'azienda",
      sourceLabel: "Fonte",
      queries: [
        {
          q: "Come chiedo un giorno di permesso?",
          a: "Manda la richiesta nello strumento HR. La approva il responsabile del tuo team, poi la conferma l'amministrazione.",
          sources: [{ doc: "Manuale del personale", where: "Ferie e permessi" }],
        },
        {
          q: "A chi mando la fattura di un fornitore?",
          a: "Le fatture dei fornitori vanno all'amministrazione. Manda il PDF con il riferimento d'ordine e se ne occupa lei.",
          sources: [{ doc: "Procedure amministrative", where: "Fatture fornitori" }],
        },
        {
          q: "Posso approvare da solo il rimborso a un cliente?",
          a: "Entro il limite standard lo approva direttamente l'assistenza. Oltre quel limite serve il responsabile.",
          sources: [{ doc: "Politica rimborsi", where: "Approvazioni" }],
        },
      ],
    },
    faq: {
      title: "Domande frequenti",
      items: [
        {
          q: "Da dove prende le risposte il Brain?",
          a: "Dai documenti della tua azienda. Ogni risposta indica la fonte, così chi chiede può controllarla.",
        },
        {
          q: "I miei documenti restano privati?",
          a: "Sì, il Brain è privato e lavora sui tuoi documenti. Rispettiamo il GDPR dal primo giorno, i dati possono stare su server UE e, prima di partire, ti diciamo quali fornitori trattano quali dati e dove.",
        },
        {
          q: "Chi può usarlo?",
          a: "Chiunque lavori da te, a ogni ora. Prima di partire decidiamo insieme chi vede cosa.",
        },
        {
          q: "Serve personale tecnico?",
          a: "No. Costruiamo, attiviamo e manteniamo tutto noi, tu lo usi. Quello che consegniamo è tuo.",
        },
        {
          q: "Quanto costa e quanto ci vuole?",
          a: "Lo preventiviamo dopo aver capito come lavori e i tempi li concordiamo con te prima di iniziare. Non esiste un pacchetto standard.",
        },
      ],
    },
    cta: {
      title: "Cosa resta oggi nella testa di poche persone?",
      line: "Raccontaci dove stanno le informazioni della tua azienda e ti mostriamo come renderle accessibili a tutti.",
    },
  },
};
