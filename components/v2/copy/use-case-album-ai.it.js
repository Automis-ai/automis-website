/* Caso Album AI (IT). Solo i fatti della §3 del brief: da 1.200 a 1.800 scatti di un evento il
   sistema sceglie circa 280 foto, poi impagina l'album; il fotografo lo usa dal browser sul suo Mac.
   Nessun risultato (tempo, soddisfazione), nessun evento o data del cliente. Dal 14/10/2026 Simone Casillo ha dato l'ok a comparire col nome.
   Percorso proposto: /use-cases/album-ai. */
export default {
  meta: {
    title: "Album AI: da 6 ore a 50 minuti per un album | Automis",
    description:
      "Album AI sceglie le foto e impagina l'album per lo Studio fotografico Simone Casillo: da circa 6 ore a circa 50 minuti, revisione compresa. Tempi indicati dallo studio.",
  },

  hero: {
    eyebrow: "Caso studio",
    title: "Un album in circa 50 minuti, non in 6 ore",
    highlight: "circa 50 minuti",
    lead: "Album AI sceglie le foto e impagina l'album di Simone. Lui rivede e corregge, e il sistema impara dalle sue correzioni.",
    client: "Studio fotografico Simone Casillo",
    tag: "Strumento per album",
  },

  flow: {
    title: "Cosa fa il sistema",
    from: { figure: "Da 1.200 a 1.800", label: "scatti di un evento entrano nel sistema" },
    to: { figure: "Circa 280", label: "foto che il sistema sceglie" },
    then: "Poi il sistema impagina l'album.",
  },

  time: {
    title: "Prima e dopo",
    lead: "Il tempo di un album di eventi, scelta e impaginazione, prima a mano e adesso con il sistema.",
    before: {
      label: "A mano",
      figure: "Circa 6 ore",
      rows: [
        ["Scelta delle foto", "circa 3 ore"],
        ["Impaginazione", "2-3 ore"],
      ],
    },
    after: {
      label: "Con Album AI",
      figure: "Circa 50 minuti",
      rows: [
        ["Scelta delle foto", "circa 20 minuti"],
        ["Impaginazione", "circa 15 minuti"],
        ["Revisione di Simone", "circa 15 minuti"],
      ],
    },
    note: "Tempi indicati dallo studio, non ancora cronometrati dallo strumento. Il cronometro arriva con i prossimi eventi.",
  },

  loop: {
    title: "Simone resta al comando",
    lead: "Il sistema propone, Simone decide. Guarda la scelta e l'album, cambia a mano quello che non lo convince e lascia una nota. Le correzioni diventano il materiale con cui il sistema sceglie meglio la volta dopo.",
    quote: "Va tutto benissimo, tranne due piccole cose.",
    by: "Simone, Studio fotografico Simone Casillo",
    when: "Agosto 2026, su un album di prova da 21 doppie. Le due cose erano la foto principale di una pagina e l'ordine di due pagine.",
  },

  shots: {
    title: "Lo strumento al lavoro",
    lead: "Gira nel browser, sul Mac di Simone. Le schermate usano foto di esempio, non foto dei clienti.",
    steps: [
      { n: "1", title: "Si sceglie l'evento", caption: "Si indica la cartella dell'evento e si avvia la scelta.", src: "/media/use-cases/album-ai/eventi.png", alt: "Elenco degli eventi in Album AI" },
      { n: "2", title: "Il sistema lavora", caption: "La scelta procede passo per passo e stima quanto manca.", src: "/media/use-cases/album-ai/in-lavorazione.png", alt: "Barra di avanzamento della scelta delle foto" },
      { n: "3", title: "Simone rivede", caption: "Cambia a mano quello che non lo convince e lascia una nota: il sistema la tiene per la volta dopo." },
    ],
  },

  online: {
    title: "Online da zero, in tre pezzi",
    lead: "Per lo studio di Simone abbiamo costruito il sistema per gli album, il sito e il CRM.",
    site: {
      status: "Online",
      title: "Il sito",
      line: "Il sito dello studio: le gallerie, i due studi, la pagina delle foto di Natale e un pulsante per scrivere su WhatsApp.",
      cta: "Vai al sito",
      url: "https://simonecasillo.com",
      links: [
        { label: "Home", href: "https://simonecasillo.com/" },
        { label: "Foto di Natale", href: "https://simonecasillo.com/natale/" },
      ],
      shots: [
        { src: "/media/use-cases/album-ai/sito-home.jpg", alt: "La home del sito di Simone Casillo su computer", kind: "desktop" },
        { src: "/media/use-cases/album-ai/sito-mobile.jpg", alt: "La home del sito di Simone Casillo su telefono", kind: "mobile" },
      ],
      note: "Foto segnaposto, in attesa degli scatti dello studio.",
    },
    items: [
      { title: "Album AI", line: "Sceglie le foto e impagina l'album, con Simone che rivede.", status: "In uso" },
      { title: "Il CRM", line: "Richieste e clienti in un posto solo, dal primo contatto alla consegna dell'album.", status: "In consegna" },
    ],
  },

  where: {
    title: "Dove gira",
    line: "Simone lo usa dal browser, sul suo Mac.",
  },

  custom: {
    title: "Costruito per un solo professionista",
    line: "Lo abbiamo costruito intorno al modo di lavorare di Simone, su misura per lui.",
  },

  cta: {
    title: "Meno ore sugli album, più tempo per i clienti",
    line: "Album AI toglie allo studio il lavoro più lungo e ripetitivo: si consegna prima e resta più tempo per seguire chi aspetta. Raccontaci quale lavoro ripetitivo ti porta via più ore e ti diciamo da dove partiremmo.",
  },
};
