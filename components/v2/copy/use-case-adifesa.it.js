/* Caso ADifesa (IT), nello stile di Datura e Album AI (14/10/2026).
   Stessi fatti e stesse cifre dell'articolo lungo (components/use-cases/adifesa/story.it.js, generato dal secondo cervello,
   clients/adifesa/): qui il testo è accorciato e ogni passaggio ha la sua scena.
   Finestra dei dati: dal 1° maggio al 16 settembre 2026. L'esito commerciale (3 schede su 10 diventano clienti) è un dato
   dell'associazione, non nostro. Nessun fatturato né rimborso: non sono dati nostri.
   Metadati e JSON-LD restano quelli di components/use-cases/adifesa/meta.js. EN e PT restano sull'articolo lungo. */
export default {
  hero: {
    eyebrow: "Caso studio",
    title: "Cinque mesi nei commenti di Facebook e Instagram",
    highlight: "Cinque mesi",
    lead: "2.329 conversazioni gestite e 524 schede complete di nome, telefono ed email. Di quelle, 3 su 10 diventano clienti.",
    client: "Associazione ADifesa",
    logo: "/assets/images/client-logos/adifesa-mark.png",
  },

  start: {
    eyebrow: "1 · Il punto di partenza",
    title: "Sotto ogni inserzione c'è una coda di persone che chiedono",
    lead: "ADifesa è un'associazione di tutela bancaria e finanziaria di Lissone. Segue chi ha pagato costi che non doveva su una cessione del quinto, una carta revolving, un prestito con polizza, e prova a farsi restituire quei soldi.",
    cards: [
      { tag: "Chi sono", title: "Si paga solo sul recuperato", line: "Perizia e ricorso sono gratuiti, il compenso arriva solo sul recuperato. Sede a Lissone, in Brianza, e pratiche seguite in tutta Italia." },
      { tag: "Cosa funzionava già", title: "I moduli compilati", line: "Le campagne su Meta portano moduli compilati, e quella parte andava bene." },
      { tag: "Il problema", title: "Tutto intorno ai moduli", line: "Sotto ogni inserzione si accumulano commenti, e nella casella dei messaggi arrivano richieste dirette. Sono persone che raccontano in pubblico una cosa privata, cioè quanto devono a una banca." },
    ],
    who: {
      title: "Chi scrive lì non è un curioso",
      line: "Ha appena letto l'annuncio e vuole sapere una cosa sola: se il suo caso rientra. Se non gli risponde nessuno per un giorno, quella domanda se la porta altrove.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-2-messenger-apertura.png",
      alt: "Schermata della casella messaggi di ADifesa: l'assistente risponde a un commento e chiede telefono, email e orari; la persona risponde di sabato sera.",
      caption: "Schermata vera della casella di ADifesa. In cima è Meta a dichiarare che la conversazione nasce da un commento. La persona risponde alle 23:07 di un sabato e lascia telefono, email e orari. Nome, foto e contatti sono distrutti nei pixel.",
    },
  },

  flow: {
    eyebrow: "2 · Dal commento alla scheda",
    title: "Cosa succede dopo un commento",
    lead: "Una persona commenta sotto un'inserzione. L'automazione risponde in pubblico, apre la conversazione privata e raccoglie i dati che servono alla consulente.",
    label: "Il percorso, in quattro passi",
    steps: [
      { n: "1", title: "Il commento", line: "La persona scrive sotto un'inserzione o un post, su Facebook o Instagram." },
      { n: "2", title: "La risposta pubblica", line: "Dopo un'attesa voluta di tre minuti l'automazione risponde. Se nel commento c'è un numero di telefono, lo nasconde." },
      { n: "3", title: "Il messaggio privato", line: "In parallelo apre la conversazione privata e chiede telefono, email e orari in cui essere richiamati." },
      { n: "4", title: "La scheda", line: "Nome, telefono, email e prodotto: quello che serve a una consulente per alzare il telefono." },
    ],
  },

  detail: {
    eyebrow: "Nel dettaglio",
    title: "Il retroscena, per chi vuole vederlo",
    lead: "I numeri in chiaro, Instagram e il costo di un post virale.",
  },

  rules: {
    eyebrow: "3 · Le regole",
    title: "Il lavoro è capire se la pratica rientra",
    lead: "Rispondere «ci scriva in privato» lo sa fare chiunque. Il valore è capire se c'è un caso, e le regole dell'associazione sono strette.",
    stats: [
      { figure: "10", label: "regole di eleggibilità attive" },
      { figure: "5", label: "tipi di prodotto" },
      { figure: "11", label: "fra banche e finanziarie nominate" },
    ],
    list: {
      title: "Ogni regola ha le sue condizioni",
      lead: "Non è una lista di parole chiave: ognuna ha una finestra di anni e delle condizioni sue.",
      rows: [
        ["Carte revolving", "attivate fra il 2000 e il 2017, con una finestra più larga per due emittenti"],
        ["Prestito Compass", "dal 2011 al 2020"],
        ["Prestito Deutsche Bank o Findomestic", "dal 2017 al 2022, sopra una certa cifra"],
        ["Fido bancario", "solo alle aziende, attive da cinque anni e sopra i ventimila euro"],
        ["Perdite su investimenti", "sì"],
        ["Criptovalute", "no"],
      ],
    },
    words: {
      title: "Prima ancora, capire di cosa si parla",
      lead: "Nei commenti nessuno scrive «cessione del quinto rinnovata nel 2016». Scrive come parla, e da quelle parole si deve arrivare al prodotto giusto, perché è il prodotto a decidere se la pratica esiste.",
      pairs: [
        ["«Mi trattengono il quinto dello stipendio»", "Cessione del quinto"],
        ["«Ho una carta che non finisce mai»", "Carta revolving"],
        ["«Mi hanno venduto un'assicurazione insieme al prestito»", "Prestito con polizza"],
      ],
    },
  },

  numbers: {
    eyebrow: "In numeri",
    title: "Dal 1° maggio al 16 settembre 2026",
    lead: "Dati di produzione.",
    label: "I numeri del caso",
    funnel: [
      { figure: "2.329", label: "conversazioni gestite fra commenti e messaggi privati" },
      { figure: "1.033", label: "contatti qualificati" },
      { figure: "524", label: "schede complete: nome, telefono, email, prodotto" },
      { figure: "3 su 10", label: "di quelle schede diventa cliente, con almeno una pratica", note: "dato dell'associazione" },
    ],
    funnelNote: "Dal commento alla pratica. L'ultimo passaggio è un dato dell'associazione, non nostro.",
    focus: "Il numero che guardiamo per primo non è il totale: sono le 524 schede complete, cioè quello che serve a una consulente per alzare il telefono e sapere già di cosa si parla.",
    chart: {
      title: "Conversazioni al mese",
      total: "2.329 in totale",
      ariaLabel: "Conversazioni gestite ogni mese del 2026: maggio 523, giugno 470, luglio 760, agosto 355, settembre 221 (fino al 16).",
      months: [
        { label: "mag", value: 523 },
        { label: "giu", value: 470 },
        { label: "lug", value: 760 },
        { label: "ago", value: 355 },
        { label: "set", value: 221 },
      ],
      markAt: 2,
      mark: "Luglio · Instagram",
      year: "2026",
      note: "Da luglio arrivano anche i messaggi diretti di Instagram. Il volume segue le campagne dell'associazione, ridotte da agosto. Settembre fino al 16.",
    },
    rows: [
      ["Persone diverse", "1.794"],
      ["Passate a una persona", "111 (4,8%)"],
      ["Messaggi privati ricevuti", "2.951"],
      ["Risposte private scritte dall'automazione", "1.676"],
      ["Risposte pubbliche sotto i commenti", "1.262"],
    ],
    origin: {
      title: "Da dove nascono le 2.329 conversazioni",
      parts: [
        { value: 1065, label: "Da un commento sotto un'inserzione" },
        { value: 232, label: "Da un commento sotto un post" },
        { value: 1032, label: "Da un messaggio diretto" },
      ],
    },
  },

  hours: {
    eyebrow: "4 · Fuori orario",
    title: "Metà delle persone scrive quando l'ufficio è chiuso",
    lead: "Dei 2.951 messaggi privati arrivati, 1.377 sono fuori dall'orario di lavoro: il 46,7%.",
    figure: "46,7%",
    figureLabel: "dei messaggi privati arriva fuori orario",
    parts: [
      { value: 850, label: "Nei giorni feriali", line: "prima delle nove o dopo le sei" },
      { value: 527, label: "Nel fine settimana", line: "sabato e domenica" },
    ],
    night: { value: 267, label: "fra le dieci di sera e le sette del mattino" },
    line: "È il numero più facile da sottovalutare di tutto il progetto. Dice che quasi metà delle richieste arriva quando non c'è nessuno a leggerle. Sono le sere e le domeniche in cui uno si mette a guardare i conti, e proprio lì si decide a scrivere.",
  },

  privacy: {
    eyebrow: "I numeri in chiaro",
    title: "Un numero di telefono sotto un post è un problema, non un contatto",
    lead: "Capita spesso: la persona scrive il suo numero dentro il commento, in chiaro, e vuole essere richiamata. Nel frattempo quel numero lo legge chiunque passi di lì.",
    steps: [
      { n: "1", title: "Il commento", line: "Contiene un numero di telefono o un dettaglio delicato." },
      { n: "2", title: "Lo nasconde", line: "L'automazione lo tratta come un incidente da chiudere, non come un contatto da incassare." },
      { n: "3", title: "Va in privato", line: "La conversazione si sposta nei messaggi privati." },
    ],
    note: "Vale sotto le inserzioni e sotto i post organici, su Facebook e su Instagram.",
    wait: {
      figure: "3 minuti",
      title: "Un'attesa voluta",
      line: "Sotto i commenti la risposta pubblica arriva dopo tre minuti. Non è lentezza: una risposta che compare nello stesso secondo in cui uno ha finito di scrivere dice a tutti che sotto c'è una macchina.",
    },
  },

  handoff: {
    eyebrow: "5 · La persona",
    title: "111 conversazioni su 2.329 sono passate a una persona",
    lead: "Meno di una su venti. Tutto il resto lo ha chiuso l'automazione da sola.",
    figure: "4,8%",
    figureLabel: "passate a una persona",
    control: {
      tag: "Il controllo resta al cliente",
      title: "Si spegne conversazione per conversazione",
      line: "È il pezzo che in una demo non si vede mai. Dal pannello di controllo l'associazione spegne l'automazione su una singola conversazione e continua a mano, senza toccare le altre. Da quel momento quella chat è sua e il bot non ci scrive più.",
    },
    fee: {
      tag: "Sul compenso non si gira intorno",
      title: "Risponde in pubblico",
      line: "All'associazione un compenso spetta, in percentuale sul recuperato. Nei commenti la domanda «quanto mi costa» arriva ogni giorno, spesso con tono ostile. La risposta dice che perizia e ricorso sono gratuiti e che si paga solo se il rimborso arriva, e non prova a spostare la domanda in privato. Su un pubblico che di promesse ne ha già sentite troppe, una risposta evasiva vale meno di zero.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-1-facebook-commenti.png",
      alt: "Commenti sotto un post di ADifesa: la domanda sul costo e la risposta pubblica dell'assistente.",
      zoom: { ratio: "779 / 330", z: 1.12, x: 100, y: 90 },
      caption: "Commenti veri sotto un post del 18 settembre 2026: la domanda sul costo arriva in pubblico e la risposta resta in pubblico. Nomi e foto distrutti nei pixel.",
    },
  },

  instagram: {
    eyebrow: "Instagram",
    title: "Instagram è arrivato dopo, e si vede",
    lead: "Il progetto è nato su Facebook. I messaggi diretti di Instagram hanno richiesto un passaggio in più: cinque permessi da far approvare a Meta, ognuno con un video dimostrativo.",
    steps: [
      { n: "Maggio", title: "Il primo invio", line: "Non è passato." },
      { n: "28 maggio", title: "Cinque video rigirati", line: "Con un metodo diverso, mostrando la catena dell'identità fra il portale Meta e il sistema. Questa volta è andata." },
    ],
    odd: {
      tag: "Un dettaglio che vale il racconto",
      line: "Meta chiedeva la dimostrazione di una funzione che nelle sue API non esiste: modificare un commento su Instagram. Si può creare, nascondere, cancellare, non modificare. La dimostrazione è stata riscritta su quello che l'API fa davvero.",
    },
    chart: {
      title: "Contatti qualificati da Instagram",
      ariaLabel: "Contatti qualificati arrivati da Instagram: maggio 6, giugno 29, luglio 117, agosto 22, settembre 6 (fino al 16).",
      months: [
        { label: "mag", value: 6 },
        { label: "giu", value: 29 },
        { label: "lug", value: 117 },
        { label: "ago", value: 22 },
        { label: "set", value: 6 },
      ],
      note: "Settembre fino al 16.",
    },
    shot: {
      src: "/assets/images/casi/adifesa-3-instagram-dm.png",
      alt: "Messaggio diretto di Instagram con le risposte dell'assistente: la scheda si completa in tre risposte.",
      caption: "Messaggio diretto di Instagram, 24 agosto 2026. Le bolle viola distinguono Instagram da Messenger. La scheda si completa in tre risposte: prima telefono e orari, poi l'email.",
    },
  },

  cost: {
    eyebrow: "Il costo",
    title: "Il post che costava diciotto dollari al giorno",
    lead: "A luglio un contenuto dell'associazione è diventato virale nel modo peggiore: migliaia di commenti di sfogo politico, nessuno dei quali era un caso da seguire.",
    problem: {
      figure: "circa 18 $",
      label: "al giorno, per rispondere a nessuno",
      line: "L'automazione li leggeva uno per uno e li classificava correttamente come non pertinenti, ma per capirlo doveva prima chiamare il modello.",
    },
    fix: {
      tag: "La soluzione",
      title: "Un contatore, non filtri più alti",
      line: "Ogni post tiene il conto dei commenti visti e di quanti sono risultati spam. Superata una soglia, quel singolo post viene messo in sordina e i commenti non arrivano più al modello.",
    },
    stats: [
      { figure: "257", label: "post seguiti, nella finestra osservata" },
      { figure: "37", label: "messi in sordina, nella finestra osservata" },
    ],
    safe: {
      tag: "Non diventa cieco",
      line: "Un post in sordina lascia passare le parole che indicano un prodotto vero, come il nome di una finanziaria o «cessione del quinto».",
      test: "Il controllo prima di metterlo in produzione l'abbiamo fatto sui commenti veri, non su esempi inventati: nessun caso buono perso su trentacinque provati, e i dieci casi buoni riconosciuti tutti e dieci.",
    },
  },

  mistakes: {
    eyebrow: "6 · Gli errori",
    title: "Cosa abbiamo sbagliato, e sistemato",
    lead: "Se raccontassimo solo le cose che hanno funzionato, sarebbe pubblicità.",
    tags: { found: "Il problema", fix: "Com'è finita" },
    items: [
      {
        title: "«Mi trattengono il quinto» finiva nello spam",
        found: "Il filtro scartava chi parlava di una frazione dello stipendio, per evitare gli sfoghi generici. Ma il quinto è letteralmente un quinto: era il prodotto principale dell'associazione, scambiato per rumore.",
        fix: "Sistemato.",
      },
      {
        title: "Il messaggio di apertura arrivava due volte",
        found: "Una persona già in chat, che tornava a scrivere sotto un'inserzione, si vedeva arrivare un secondo «come possiamo aiutarla?».",
        fix: "Ora se la conversazione è già aperta il secondo messaggio non parte.",
      },
      {
        title: "I reel condivisi in privato facevano ripartire il bot",
        found: "Instagram manda un video condiviso come un messaggio senza testo, e l'automazione rispondeva a ogni condivisione.",
        fix: "Adesso un allegato senza parole non riceve risposta.",
      },
      {
        title: "Su Instagram i contatti si chiamavano tutti «Utente c168f1»",
        found: "Il nome veniva letto da un campo che per Instagram non esiste.",
        fix: "Sistemato, e recuperati i nomi vecchi: da 33 senza nome a 4.",
      },
    ],
  },

  clients: {
    eyebrow: "7 · I clienti",
    title: "Quanti di quei contatti diventano clienti",
    lead: "Il nostro database si ferma alla scheda completa. Cosa succede dopo, quando la consulente chiama, lo sa solo l'associazione: gliel'abbiamo chiesto.",
    figure: "3 su 10",
    figureLabel: "schede complete che diventano clienti, con almeno una pratica aperta",
    line: "È un numero loro, che esce dal loro sistema e non dal nostro, e lo riportiamo come ce l'hanno detto. Non è il 30% di chi commenta: è il 30% di chi è arrivato in fondo alla conversazione lasciando nome, telefono, email e prodotto.",
    limits: {
      tag: "Cosa questi numeri non dicono",
      lines: [
        "Non contiamo il lavoro delle persone dopo il passaggio di mano, perché da quel punto la conversazione continua dentro gli strumenti di Meta e non nel nostro sistema. E l'esito della verifica di eleggibilità non viene registrato come tale: la decisione la prende la consulente, con i documenti in mano.",
        "Quanti rimborsi siano poi arrivati, e per quali cifre, non è un dato nostro e non lo mettiamo qui. Un caso studio che promette il fatturato senza avere il dato del fatturato è un annuncio travestito.",
      ],
    },
  },

  faq: {
    eyebrow: "Domande frequenti",
    title: "Quello che ci chiedono di più",
    items: [
      {
        q: "Quante conversazioni ha gestito l'automazione?",
        a: "Dal 1° maggio al 16 settembre 2026 ha gestito 2.329 conversazioni fra commenti e messaggi privati su Facebook e Instagram, con 1.794 persone diverse. Ne sono usciti 1.033 contatti qualificati e 524 schede complete di nome, telefono ed email.",
      },
      {
        q: "Risponde anche ai commenti pubblici o solo ai messaggi privati?",
        a: "A entrambi. Sotto il commento pubblico risponde dopo un'attesa voluta di tre minuti, e in parallelo apre la conversazione privata. Nella finestra osservata ha scritto 1.262 risposte pubbliche e 1.676 messaggi privati.",
      },
      {
        q: "Cosa succede se qualcuno scrive il suo numero di telefono in un commento?",
        a: "Il commento viene nascosto e la conversazione si sposta in privato. Un numero di telefono in chiaro sotto un'inserzione è un rischio per chi lo ha scritto, non un contatto da raccogliere.",
      },
      {
        q: "Quando interviene una persona?",
        a: "Quando serve, e sempre per scelta del cliente: dal pannello di controllo l'automazione si spegne sulla singola conversazione e il team continua a mano. È successo con 111 conversazioni su 2.329, meno di una su venti.",
      },
      {
        q: "Quanti di quei contatti diventano clienti?",
        a: "Secondo l'associazione, 3 schede complete su 10 diventano clienti con almeno una pratica aperta. È un dato loro, dal loro sistema: il nostro database si ferma alla scheda completa, cioè nome, telefono, email e prodotto.",
      },
      {
        q: "Quanto ci vuole a metterla in piedi?",
        a: "Dipende da quanto sono definite le regole. La parte lunga non è il software, è scrivere nero su bianco quando un caso rientra e quando no: qui sono dieci regole con finestre di anni, importi minimi e nomi di finanziarie. Per i messaggi diretti di Instagram va messa in conto anche l'approvazione dei permessi da parte di Meta.",
      },
    ],
  },

  cta: {
    title: "Fai campagne su Meta? Sotto le tue inserzioni c'è già una coda di persone che ti chiedono qualcosa",
    line: "La domanda è se le tue regole sono scritte abbastanza bene perché qualcuno possa rispondere al posto tuo. Trenta minuti, e ti diciamo da dove partiremmo noi.",
    more: { text: "Se vuoi vedere come lavoriamo prima di parlarne,", label: "qui trovi come costruiamo le automazioni", href: "/how-we-work" },
  },
};
