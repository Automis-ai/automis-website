/* Parliamo (IT): Finder + invio messaggio + prenotazione della call. Assorbe /contact.
   Le etichette del form sono quelle già pubblicate in components/contact/ContactForm.js.
   I dettagli del calendario (bullets, disponibilità, caricamento) stanno in common.booking. */
export default {
  meta: {
    title: "Parliamo | Raccontaci la tua attività | Automis",
    description:
      "Scrivici, rispondi a sei domande o prenota una call. Ascoltiamo come lavora la tua attività e ti diciamo da dove partiremmo.",
  },

  hero: {
    eyebrow: "Parliamo",
    title: "Raccontaci la tua attività",
    lead: "Scrivici o prenota una call. Prima ascoltiamo, poi ti diciamo da dove partiremmo.",
    accent: "la tua attività",
  },

  finder: {
    title: "Oppure parti da sei domande",
    lead: "Rispondi e scopri le tre automazioni IA più adatte a te.",
  },

  form: {
    title: "Scrivici un messaggio",
    successTitle: "Messaggio inviato",
    successBody: "Grazie! Ti ricontattiamo entro 24 ore.",
    error: "Invio non riuscito. Riprova o scrivici a info@automis.ai.",
    nameLabel: "Nome completo",
    namePlaceholder: "Mario Rossi",
    emailLabel: "Email",
    emailPlaceholder: "mario@azienda.com",
    phoneLabel: "Telefono",
    optional: "(facoltativo)",
    phonePlaceholder: "+39 333 123 4567",
    companyLabel: "Azienda",
    companyPlaceholder: "La tua azienda",
    subjectLabel: "Oggetto",
    subjectPlaceholder: "Come possiamo aiutarti?",
    messageLabel: "Messaggio",
    messagePlaceholder: "Raccontaci della tua attività e del problema che vuoi risolvere...",
    sending: "Invio in corso...",
    send: "Invia il messaggio",
    footer: "Rispondiamo entro 24 ore. Niente spam, mai.",
  },

  aside: {
    reachTitle: "Contattaci direttamente",
    emailLabel: "Email",
    followLabel: "Seguici",
  },

  booking: {
    title: "Preferisci parlarne?",
    lead: "Scegli un orario sul calendario. Trenta minuti, con conferma immediata.",
    previewNote: "Il calendario resta spento in anteprima e si attiva sul sito pubblico.",
  },
};
