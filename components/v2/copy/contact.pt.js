/* Contactos (PT, pt-PT): Finder + invio messaggio + prenotazione della call. Assorbe /contact.
   Le etichette del form sono quelle già pubblicate in components/contact/ContactForm.js (pt).
   I dettagli del calendario (bullets, disponibilità, caricamento) stanno in common.booking. */
export default {
  meta: {
    title: "Falemos | Conte-nos o Seu Negócio | Automis",
    description:
      "Escreva-nos, responda a seis perguntas ou agende uma chamada. Ouvimos como funciona o seu negócio e dizemos-lhe por onde começaríamos.",
  },

  hero: {
    eyebrow: "Falemos",
    title: "Conte-nos o seu negócio",
    lead: "Escreva-nos ou agende uma chamada. Primeiro ouvimos, depois dizemos-lhe por onde começaríamos.",
    accent: "o seu negócio",
  },

  finder: {
    title: "Ou comece por seis perguntas",
    lead: "Responda e receba as três automações de IA mais indicadas.",
  },

  form: {
    title: "Envie-nos uma mensagem",
    successTitle: "Mensagem enviada",
    successBody: "Obrigado. Entramos em contacto consigo dentro de 24 horas.",
    error: "Não foi possível enviar a mensagem. Tente novamente ou escreva-nos para info@automis.ai.",
    nameLabel: "Nome completo",
    namePlaceholder: "João Silva",
    emailLabel: "Email",
    emailPlaceholder: "joao@empresa.com",
    phoneLabel: "Telefone",
    optional: "(opcional)",
    phonePlaceholder: "+351 912 345 678",
    companyLabel: "Empresa",
    companyPlaceholder: "A sua empresa",
    subjectLabel: "Assunto",
    subjectPlaceholder: "Como podemos ajudar?",
    messageLabel: "Mensagem",
    messagePlaceholder: "Fale-nos do seu negócio e do problema que quer resolver...",
    sending: "A enviar...",
    send: "Enviar mensagem",
    footer: "Respondemos dentro de 24 horas. Sem spam, nunca.",
  },

  aside: {
    reachTitle: "Fale connosco diretamente",
    emailLabel: "Email",
    followLabel: "Siga-nos",
  },

  booking: {
    title: "Prefere falar?",
    lead: "Escolha um horário no calendário. Trinta minutos, com confirmação imediata.",
    previewNote: "O calendário fica desligado na pré-visualização e ativa-se no site público.",
  },
};
