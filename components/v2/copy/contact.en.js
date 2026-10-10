/* Parliamo (EN): Finder + invio messaggio + prenotazione della call. Assorbe /contact.
   Le etichette del form sono quelle già pubblicate in components/contact/ContactForm.js.
   I dettagli del calendario (bullets, disponibilità, caricamento) stanno in common.booking. */
export default {
  meta: {
    title: "Let's Talk | Tell Us About Your Business | Automis",
    description:
      "Send us a message, answer six quick questions or book a call. We listen to how your business works, then tell you where we would start.",
  },

  hero: {
    eyebrow: "Let's talk",
    title: "Tell us about your business",
    lead: "Send a message or book a call. We listen first, then tell you where we would start.",
    accent: "your business",
  },

  finder: {
    title: "Or start with six questions",
    lead: "Answer them and get your top three AI automations.",
  },

  form: {
    title: "Send us a message",
    successTitle: "Message sent",
    successBody: "Thanks. We'll get back to you within 24 hours.",
    error: "Failed to send message. Please try again or email us at info@automis.ai.",
    nameLabel: "Full name",
    namePlaceholder: "Jane Smith",
    emailLabel: "Email",
    emailPlaceholder: "jane@company.com",
    phoneLabel: "Phone",
    optional: "(optional)",
    phonePlaceholder: "+1 (555) 123 4567",
    companyLabel: "Company",
    companyPlaceholder: "Your company",
    subjectLabel: "Subject",
    subjectPlaceholder: "How can we help?",
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your business and what you're trying to solve...",
    sending: "Sending...",
    send: "Send message",
    footer: "We reply within 24 hours. No spam, ever.",
  },

  aside: {
    reachTitle: "Reach us directly",
    emailLabel: "Email",
    followLabel: "Follow",
  },

  booking: {
    title: "Prefer to talk?",
    lead: "Pick a time on the calendar. Thirty minutes, with instant confirmation.",
    previewNote: "The calendar stays off in the preview and switches on at the public site.",
  },
};
