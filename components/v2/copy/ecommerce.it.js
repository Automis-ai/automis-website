/* AI E-commerce Manager (IT). Prodotto dei Sistemi di Marketing: la pagina descrive il prodotto e
   porta, per piattaforma, alle due landing già fatte (solo in italiano, servite come file statici).
   Moduli e angolo per piattaforma ripresi dalle landing, senza le promesse da non ripetere.
   Nessun prezzo finché Luca non decide il «da». Percorsi senza prefisso di lingua, tranne le due landing. */
export default {
  meta: {
    title: "AI E-commerce Manager per Shopify e WooCommerce | Automis",
    description:
      "Agenti IA che seguono il tuo negozio online giorno e notte: annunci, clienti, catalogo e incassi. Scegli la tua piattaforma, Shopify o WooCommerce.",
  },

  hero: {
    eyebrow: "Sistemi di Marketing",
    title: "AI E-commerce Manager",
    lead: "Agenti IA che guardano il tuo negozio online giorno e notte e ti scrivono solo quando serve.",
    cta: "Scegli la piattaforma",
    visual: {
      title: "Il tuo negozio, stanotte",
      caption: "Esempio illustrativo.",
      rows: [
        { icon: "target", area: "Annunci", text: "Taglia finita: lo stop dell'annuncio è pronto.", state: "Aspetta il tuo ok", tone: "wait" },
        { icon: "chat", area: "Clienti", text: "Un cliente scrive per un caso delicato.", state: "Passa a te", tone: "wait" },
        { icon: "database", area: "Catalogo", text: "Prezzi confrontati con ciò che vede Meta.", state: "Controllato", tone: "done" },
        { icon: "web", area: "Sito", text: "Il sito risponde ancora.", state: "Controllato", tone: "done" },
      ],
    },
  },

  platforms: {
    title: "Scegli la tua piattaforma",
    note: "La pagina di ogni piattaforma spiega nel dettaglio i moduli.",
    langTag: null,
    modulesSummary: "cosa seguiamo",
    items: [
      {
        id: "shopify",
        name: "Shopify",
        tagline: "Dove Sidekick finisce, iniziamo noi.",
        line: "Annunci, clienti, catalogo e incassi seguiti giorno e notte.",
        modules: [
          { title: "Annunci", line: "Ogni notte incrociamo campagne e scorte. Taglia finita? Lo stop dell'annuncio è già pronto e confermi tu." },
          { title: "Clienti", line: "Rispondiamo su WhatsApp, Instagram ed email con le tue regole. I casi delicati arrivano a te." },
          { title: "Catalogo", line: "Ogni notte confrontiamo catalogo, prezzi e disponibilità con ciò che vede Meta. Le differenze ti arrivano con la correzione già pronta." },
          { title: "Incassi", line: "Ogni mese dividiamo gli incassi di Shopify per la spesa in annunci: il ritorno vero, non quello che Meta si attribuisce." },
        ],
        cta: "Vai alla pagina Shopify",
        href: "/it/ecommerce/shopify",
      },
      {
        id: "woocommerce",
        name: "WooCommerce",
        tagline: "Chi guarda il tuo WooCommerce mentre dormi?",
        line: "Attività programmate, aggiornamenti dei plugin, catalogo Meta e sito, controllati senza pause.",
        modules: [
          { title: "Attività programmate", line: "Ogni notte verifichiamo che email, aggiornamenti del catalogo e scadenze partano davvero." },
          { title: "Aggiornamenti", line: "Aggiorniamo i plugin di notte e controlliamo il sito dopo ognuno. Se qualcosa si rompe, si torna indietro: lo decide una regola fissa, mai un'IA." },
          { title: "Catalogo", line: "Ogni notte rigeneriamo il catalogo e controlliamo prodotti, prezzi e sconti." },
          { title: "Sito", line: "Una sentinella controlla di continuo che il sito risponda. Se si blocca, leggiamo i registri del server e cerchiamo la causa." },
        ],
        cta: "Vai alla pagina WooCommerce",
        href: "/it/ecommerce/woocommerce",
      },
    ],
    other: "Un'altra piattaforma? Raccontaci il tuo negozio.",
  },

  control: {
    title: "Decidi sempre tu",
    items: [
      { title: "Regole fisse", line: "Prezzi, rimborsi e resi non vengono mai lasciati a un'IA." },
      { title: "Il tuo ok", line: "Ciò che costa o tocca il negozio aspetta la tua approvazione." },
      { title: "Rodaggio iniziale", line: "All'inizio controlliamo noi ogni azione. Poi quelle sicure diventano automatiche, una alla volta." },
    ],
  },

  cta: {
    title: "Raccontaci del tuo negozio",
    line: "Dicci che piattaforma usi e dove il negozio perde tempo o soldi.",
    button: "Raccontaci del tuo negozio",
  },

  legal: "Shopify e Sidekick sono marchi di Shopify Inc. WooCommerce è un marchio di Automattic Inc. Automis non è affiliata a Shopify né ad Automattic.",
};
