// Le tappe delle pagine /systems/<categoria> (IT fonte; EN e PT con le stesse tappe, 16/10/2026). Ogni tappa ha un sistema in
// primo piano (il primo id) e i sistemi di supporto. Gli id sono quelli delle schede in components/v2/copy/systems.<lingua>.js;
// titoli e frasi delle tappe sono bozze da validare con Luca. Gli id restano uguali in tutte le lingue.
const IT = {
  marketing: [
    { title: "Ti trovano", line: "Chi cerca quello che fai deve trovare te: su Google, nelle risposte dell'IA e negli annunci.", ids: ["ads-creative", "seo-geo", "animated-sites"] },
    { title: "Si fidano", line: "Recensioni, contenuti e video che costruiscono fiducia prima ancora della prima chiamata.", ids: ["reviews", "content-social", "video-editing"] },
    { title: "Comprano e tornano", line: "Il negozio seguito giorno e notte, le schede prodotto già scritte e i vecchi clienti richiamati.", ids: ["ecommerce-manager", "product-listings", "reactivation"] },
  ],
  sales: [
    { title: "Rispondi subito", line: "Chi ti scrive, commenta o lascia il numero trova subito qualcuno dall'altra parte.", ids: ["social-dms", "lead-callback", "lead-forms"] },
    { title: "Porta all'appuntamento", line: "Il sistema capisce chi è pronto e lo accompagna fino a una prenotazione.", ids: ["lead-qualification", "lead-nurture", "reactivation-sales"] },
    { title: "Segui fino al sì", line: "Un posto solo dove vedere contatti, trattative e passo successivo.", ids: ["custom-crm", "voice-notes"] },
  ],
  support: [
    { title: "Rispondi a tutti", line: "Chiamate perse, domande a ogni ora: nessuno resta senza risposta.", ids: ["voice-receptionist", "missed-call-recovery", "answers-247"] },
    { title: "Anche il negozio", line: "Lo stesso vale per chi ti scrive dal tuo e-commerce.", ids: ["ecommerce-support"] },
  ],
  admin: [
    { title: "Arrivano le carte", line: "Documenti e dati entrano nel sistema senza che nessuno li ribatta a mano.", ids: ["document-intake", "scan-to-brain"] },
    { title: "Si tiene in ordine", line: "Contabilità e routine di ufficio seguite dal sistema, con un controllo umano.", ids: ["accounting-software", "back-office"] },
  ],
  "company-brain": [{ title: "", line: "", ids: ["company-brain"] }],
};

const EN = {
  marketing: [
    { title: "They find you", line: "Anyone searching for what you do should find you: on Google, in AI answers and in ads.", ids: ["ads-creative", "seo-geo", "animated-sites"] },
    { title: "They trust you", line: "Reviews, content and video that build trust before the first call.", ids: ["reviews", "content-social", "video-editing"] },
    { title: "They buy and come back", line: "A store watched day and night, product pages already written, and past customers brought back.", ids: ["ecommerce-manager", "product-listings", "reactivation"] },
  ],
  sales: [
    { title: "Reply right away", line: "Anyone who messages, comments or leaves a number gets someone on the other end right away.", ids: ["social-dms", "lead-callback", "lead-forms"] },
    { title: "Lead them to the appointment", line: "The system works out who is ready and guides them all the way to a booking.", ids: ["lead-qualification", "lead-nurture", "reactivation-sales"] },
    { title: "Follow through to yes", line: "One place to see contacts, deals and the next step.", ids: ["custom-crm", "voice-notes"] },
  ],
  support: [
    { title: "Answer everyone", line: "Missed calls, questions at any hour: nobody is left without an answer.", ids: ["voice-receptionist", "missed-call-recovery", "answers-247"] },
    { title: "Your store too", line: "The same goes for people who write to you from your e-commerce site.", ids: ["ecommerce-support"] },
  ],
  admin: [
    { title: "The paperwork arrives", line: "Documents and data enter the system without anyone retyping them by hand.", ids: ["document-intake", "scan-to-brain"] },
    { title: "Things stay in order", line: "Accounting and office routines followed by the system, with a human check.", ids: ["accounting-software", "back-office"] },
  ],
  "company-brain": [
    { title: "", line: "", ids: ["company-brain"] },
  ],
};

const PT = {
  marketing: [
    { title: "Encontram-no", line: "Quem procura o que faz tem de o encontrar a si: no Google, nas respostas da IA e nos anúncios.", ids: ["ads-creative", "seo-geo", "animated-sites"] },
    { title: "Confiam em si", line: "Avaliações, conteúdos e vídeo que criam confiança antes mesmo da primeira chamada.", ids: ["reviews", "content-social", "video-editing"] },
    { title: "Compram e voltam", line: "A loja acompanhada dia e noite, as fichas de produto já escritas e os antigos clientes reativados.", ids: ["ecommerce-manager", "product-listings", "reactivation"] },
  ],
  sales: [
    { title: "Responda logo", line: "Quem lhe escreve, comenta ou deixa o número encontra logo alguém do outro lado.", ids: ["social-dms", "lead-callback", "lead-forms"] },
    { title: "Leve até à marcação", line: "O sistema percebe quem está pronto e acompanha-o até à marcação.", ids: ["lead-qualification", "lead-nurture", "reactivation-sales"] },
    { title: "Acompanhe até ao sim", line: "Um só sítio para ver contactos, negociações e o passo seguinte.", ids: ["custom-crm", "voice-notes"] },
  ],
  support: [
    { title: "Responda a todos", line: "Chamadas perdidas, perguntas a qualquer hora: ninguém fica sem resposta.", ids: ["voice-receptionist", "missed-call-recovery", "answers-247"] },
    { title: "A loja também", line: "O mesmo vale para quem lhe escreve a partir da sua loja online.", ids: ["ecommerce-support"] },
  ],
  admin: [
    { title: "Chegam os papéis", line: "Documentos e dados entram no sistema sem que ninguém os volte a escrever à mão.", ids: ["document-intake", "scan-to-brain"] },
    { title: "Fica tudo em ordem", line: "Contabilidade e rotinas de escritório acompanhadas pelo sistema, com controlo humano.", ids: ["accounting-software", "back-office"] },
  ],
  "company-brain": [
    { title: "", line: "", ids: ["company-brain"] },
  ],
};

const VIZ_TEXT = {
  it: {
    bars: "Esempio illustrativo: il budget si sposta sulla creatività che converte",
    stars: "Esempio illustrativo: la risposta pubblica aspetta il tuo ok",
    starsRow: "Risposta pronta: «Grazie, ci fa piacere…»",
  },
  en: {
    bars: "Illustrative example: the budget moves to the creative that converts",
    stars: "Illustrative example: the public reply waits for your OK",
    starsRow: "Reply ready: “Thank you, we're glad…”",
  },
  pt: {
    bars: "Exemplo ilustrativo: o orçamento passa para o criativo que converte",
    stars: "Exemplo ilustrativo: a resposta pública espera pelo seu OK",
    starsRow: "Resposta pronta: «Obrigado, ficamos contentes…»",
  },
};

export const STAGES = { it: IT, en: EN, pt: PT };

export function stagesFor(locale) {
  return STAGES[locale] || STAGES.it;
}

export function vizTextFor(locale) {
  return VIZ_TEXT[locale] || VIZ_TEXT.it;
}
