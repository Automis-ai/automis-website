/* Caso Datura Clothing (IT), come «AI WooCommerce Manager» (14/10/2026, terzo giro). Tre storie: il negozio va avanti da solo
   (presidio operativo, con errori trovati e come si risolvono), il catalogo si scrive più in fretta, gli annunci lavorano meglio.
   In pagina niente date: solo durate («in 28 giorni») e «negli ultimi 4 mesi». Le finestre esatte (13/8-9/9 per i 10 guasti,
   25/8-8/10 per le 100 inserzioni, 20-23/8 per i 19 aggiornamenti) stanno nel registro dei lavori del cliente. Numeri dalla raccolta fatti del cliente, dal registro dei lavori e dalle dichiarazioni del negozio
   (20 minuti per la scheda di un prodotto prima, 5 minuti per tutto il catalogo adesso: dichiarati, non misurati). Niente ore risparmiate misurate, niente fatturato.
   Mockup (primo giro): ~/Automations/sandbox/web-motion/datura-v3/mockup.html. Percorso: /use-cases/datura-clothing.
   EN e PT restano sul testo precedente. */
export default {
  meta: {
    title: "Datura Clothing: AI WooCommerce Manager per un negozio online | Automis",
    description:
      "Un'IA che controlla il negozio WooCommerce giorno e notte, scrive le schede prodotto in pochi minuti e fa lavorare meglio gli annunci Meta: 10 guasti trovati in 28 giorni, 100 inserzioni create in 6 settimane.",
  },

  hero: {
    eyebrow: "Caso studio",
    title: "AI WooCommerce Manager: un solo sistema per tutto il negozio",
    highlight: "AI WooCommerce Manager:",
    titleLogo: { word: "WooCommerce", src: "/assets/images/logos/woocommerce-mark-white.svg", alt: "WooCommerce" },
    lead: "Un negozio di abbigliamento che va avanti da solo. Negli ultimi quattro mesi l'IA ha preso in carico il controllo giorno e notte, ha reso più veloce il catalogo e ha fatto lavorare meglio gli annunci.",
    client: "Datura Clothing",
    logo: "/assets/images/client-logos/datura-clothing-white.png",
  },

  presidio: {
    eyebrow: "1 · Presidio",
    title: "Il negozio resta in piedi anche quando nessuno lo guarda",
    lead: "Un negozio online si rompe senza fare rumore. Qui un'IA lo controlla giorno e notte, trova gli errori, li risolve e ti scrive solo quando serve.",
    ops: {
      title: "Presidio",
      live: "sempre acceso",
      ariaLabel: "Il presidio controlla il negozio e risolve cinque errori, uno dopo l'altro.",
      checksLabel: "Cosa controlla",
      checks: ["Attività programmate", "Collegamento Instagram", "Home e pagine", "Catalogo Meta", "Pagamenti", "Aggiornamenti dei plugin"],
      tags: { found: "Trovato", fix: "Intervento", done: "Risolto" },
      incidents: [
        {
          name: "Attività programmate",
          figure: "23",
          unit: "giorni",
          title: "Le attività programmate erano ferme",
          found: "313 eventi su 318 erano in ritardo.",
          fix: "Un controllo esterno fa ripartire il ciclo ogni 10 minuti. Ogni notte un secondo controllo guarda se il lavoro è stato fatto davvero, non solo se la pagina risponde.",
          done: "Arretrato smaltito. Se si ferma di nuovo, arriva un avviso.",
        },
        {
          name: "Collegamento Instagram",
          figure: "37",
          unit: "giorni",
          title: "Il collegamento a Instagram era scaduto",
          found: "La vetrina del sito mostrava ancora i post di maggio.",
          fix: "Un nuovo accesso, collegato al sito, che non ha scadenza.",
          done: "Collegamento rinnovato. Non scade più.",
        },
        {
          name: "Home e pagine",
          figure: "111",
          unit: "errori in un giorno",
          title: "Le raffiche di Meta mandavano giù il sito",
          found: "Il sito rispondeva con errore 503 e andava giù.",
          fix: "Le pagine più richieste si servono dalla cache, anche al crawler di Meta.",
          done: "Dopo due giorni, zero errori.",
        },
        {
          name: "Catalogo Meta",
          figure: "2×",
          unit: "il prezzo reale",
          title: "Il catalogo pubblicava i prezzi pieni",
          found: "Alcuni capi dell'outlet comparivano negli annunci al doppio del prezzo reale.",
          fix: "Il prezzo scontato entra nel catalogo, che ogni notte si rigenera e si controlla.",
          done: "I prezzi degli annunci sono quelli del sito.",
        },
        {
          name: "Pagamenti",
          figure: "28",
          unit: "acquisti a rate persi",
          title: "Nessuno scriveva a chi lasciava il pagamento a metà",
          found: "In quattro mesi, 28 acquisti a rate persi perché il pagamento è rimasto a metà. Nessuna email ai clienti.",
          fix: "Ogni pagamento annullato per tempo manda un'email con i capi ancora disponibili e un link che li rimette nel carrello.",
          done: "Attivo. Risultati ancora da misurare.",
        },
      ],
    },
  },

  catalog: {
    eyebrow: "2 · Catalogo",
    title: "Dalla foto alla scheda online, molto più in fretta",
    lead: "L'IA ottimizza le foto e scrive la descrizione di ogni prodotto a partire dalla foto. I prompt li abbiamo scritti noi: il negozio li usa e carica il risultato sul sito.",
    steps: {
      photo: { n: "1 · Foto", title: "Foto ottimizzate", ready: "Foto pronta", alt: "Pullover Camionneur Full Zip, foto del prodotto" },
      desc: {
        n: "2 · Descrizione",
        title: "Tutti i dettagli del prodotto",
        label: "Scritta dall'IA",
        lines: [
          "Pullover in viscosa con lavorazione a costine, che dona profondità e carattere alla maglia. ",
          "Il collo camionneur può essere portato alzato o aperto, mentre la zip lungo tutto il davanti permette di indossarlo anche come alternativa al cardigan. ",
          "La viscosa conferisce alla maglia una mano morbida e una caduta fluida, piacevole da indossare e facile da inserire negli abbinamenti quotidiani.",
        ],
        chips: ["Come si indossa", "A cosa si abbina", "Composizione"],
      },
      card: { n: "3 · Scheda", title: "Online sul sito", name: "Pullover Camionneur Full Zip", site: "daturaclothing.it", status: "Pubblicata" },
    },
    time: {
      title: "Quanto ci vuole",
      before: { label: "Prima", figure: "20 min", pre: "per scrivere la scheda di", strong: "1 solo prodotto" },
      after: { label: "Adesso", figure: "5 min", pre: "per scrivere le schede di", strong: "tutto il catalogo" },
    },
  },

  ads: {
    eyebrow: "3 · Annunci",
    title: "Analisi più precise, concept nuovi, campagne che partono dal catalogo",
    lead: "L'IA legge i numeri, propone cosa cambiare e prepara le creatività. Le campagne si accendono solo dopo l'ok di una persona.",
    analysis: {
      n: "Analisi",
      title: "Cosa dicono i dati",
      lead: "Due letture diverse, una sola domanda: cosa conviene spingere oggi?",
      past: {
        tag: "Creatività precedenti",
        title: "Ogni creatività ha il suo compito",
        lines: [
          "I caroselli di catalogo vendono e non fanno pubblico. I post organici sponsorizzati fanno pubblico e non vendono.",
          "Giudicarli tutti sul ritorno spegnerebbe la macchina che alimenta il profilo. Il ritorno vero si calcola sul fatturato del negozio, non sul numero che dichiara Meta.",
        ],
        matrix: {
          cols: ["Vendono", "Fanno pubblico"],
          rows: [
            { name: "Caroselli di catalogo", v: [true, false] },
            { name: "Post organici sponsorizzati", v: [false, true] },
          ],
        },
        costTitle: "Costo di un follower",
        cost: [
          { label: "Post sponsorizzati", text: "1,45 €", w: "6%" },
          { label: "Campagne di vendita", text: "da 8 a 26 €", w: "100%" },
        ],
      },
      dynamic: {
        tag: "Gruppi dinamici",
        title: "I prodotti entrano ed escono da soli",
        lines: [
          "Un gruppo di prodotti dinamico si riempie e si svuota da solo: un capo entra negli annunci quando ha le taglie giuste ed esce quando finiscono.",
          "La disponibilità si legge sulle taglie, non sul prodotto. Con una sola taglia viva il prodotto risulta ancora disponibile e gli annunci continuano a pagare: era successo con un abito che aveva 3 taglie vive su 66 ed era il primo per visite dagli annunci.",
        ],
        group: {
          chip: "Gruppo dinamico",
          name: "Novità disponibili",
          tag: "esempio illustrativo",
          inLabel: "Negli annunci",
          outLabel: "Fuori",
          unit: "taglie vive",
          rows: [
            { name: "Pullover Camionneur Full Zip", text: "5 su 5", pct: 100 },
            { name: "Giacca Cardigan Con Tasche", cycle: true, text: "5 su 5", textLow: "1 su 5" },
            { name: "Abito Blu", text: "3 su 66", pct: 5, out: true },
            { name: "Pullover Full Zip Cappuccio", text: "5 su 5", pct: 100 },
          ],
        },
      },
    },
    concepts: {
      n: "Concept",
      title: "Una serie di concept creativi nuovi",
      ariaLabel: "Una serie di concept creativi per gli annunci: jeans, abiti, misure, il marchio.",
      images: [
        { src: "/media/use-cases/datura/concepts/jeans-toru.jpg", alt: "Concept: Jeans Toru Lavaggio Zero", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/jeans-misura.jpg", alt: "Concept: la misura del fondo dei jeans, 22 centimetri", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/jeans-moodboard.jpg", alt: "Moodboard dei jeans: i fotogrammi del video", w: 900, h: 352 },
        { src: "/media/use-cases/datura/ad-camionneur.jpg", alt: "Concept: Pullover Camionneur Full Zip", w: 640, h: 640 },
        { src: "/media/use-cases/datura/concepts/abito-gessato.jpg", alt: "Concept: Abito Gessato Blu", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/abito-revers.jpg", alt: "Concept: il revers dell'Abito Blu, 12 centimetri", w: 520, h: 650 },
        { src: "/media/use-cases/datura/ad-cappuccio.jpg", alt: "Concept: Pullover Full Zip con cappuccio", w: 640, h: 640 },
        { src: "/media/use-cases/datura/concepts/abito-herringbone.jpg", alt: "Concept: Abito Herringbone Terra", w: 520, h: 650 },
        { src: "/media/use-cases/datura/concepts/marchio-dieci-anni.jpg", alt: "Concept: un abito che porterai fra dieci anni", w: 520, h: 650 },
      ],
    },
    campaigns: {
      n: "Campagne",
      title: "Campagne dal catalogo",
      items: [
        { figure: "4", label: "campagne" },
        { figure: "100", label: "inserzioni create", bar: 100 },
        { figure: "46", label: "andate in onda", bar: 46 },
      ],
      note: "In sei settimane. Il ritorno delle campagne più recenti non lo giudichiamo ancora.",
    },
  },

  numbers: {
    eyebrow: "In numeri",
    title: "Negli ultimi 4 mesi",
    label: "I numeri del caso",
    items: [
      { figure: "10", label: "guasti distinti trovati", basis: "in 28 giorni" },
      { figure: "100", label: "inserzioni create in 4 campagne, 46 andate in onda", basis: "in 6 settimane" },
      { figure: "19", label: "aggiornamenti di plugin verificati uno per uno, tutti senza problemi", basis: "in 4 giorni" },
    ],
    product: { label: "Il prodotto dietro il caso: AI E-commerce Manager", href: "/ecommerce" },
  },

  site: {
    eyebrow: "Il sito",
    title: "Rifatto da cima a fondo",
    lead: "In questi mesi abbiamo rifatto anche il sito.",
    items: [
      { title: "Grafica", line: "Un aspetto nuovo, costruito sull'identità del marchio. Qui la nuova scheda prodotto." },
      { title: "Menu", line: "Nove voci: tipi di capo, novità e outlet. Chi cerca trova subito la categoria giusta." },
      { title: "Checkout", line: "Un processo di acquisto migliorato." },
    ],
    shots: {
      menu: { src: "/media/use-cases/datura/sito-menu.jpg", alt: "Il nuovo menu del sito di Datura Clothing, con il sottomenu della maglieria aperto" },
      phone: { src: "/media/use-cases/datura/sito-scheda-telefono.jpg", alt: "La nuova scheda prodotto sul telefono: Pullover Camionneur Full Zip" },
    },
  },

  cta: {
    title: "Vuoi anche tu un collaboratore AI che monitora h24 il tuo sito web e ti aiuta a ottimizzarlo costantemente?",
    line: "",
  },
};
