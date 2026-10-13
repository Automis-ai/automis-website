// Le tappe delle pagine /systems/<categoria> (solo IT, 14/10/2026). Ogni tappa ha un sistema in primo piano (il primo id)
// e i sistemi di supporto. Gli id sono quelli delle schede in components/v2/copy/systems.it.js; titoli e frasi
// delle tappe sono bozze da validare con Luca.
export const STAGES = {
  marketing: [
    { title: "Ti trovano", line: "Chi cerca quello che fai deve trovare te: su Google, nelle risposte dell'IA e negli annunci.", ids: ["ads-creative", "seo-geo", "animated-sites"] },
    { title: "Si fidano", line: "Recensioni, contenuti e video che costruiscono fiducia prima ancora della prima chiamata.", ids: ["reviews", "content-social", "video-editing"] },
    { title: "Comprano e tornano", line: "Il negozio che si segue da solo, le schede prodotto già scritte e i vecchi clienti richiamati.", ids: ["ecommerce-manager", "product-listings", "reactivation"] },
  ],
  sales: [
    { title: "Arrivano", line: "Ogni messaggio e ogni richiesta riceve risposta e viene qualificato.", ids: ["social-dms", "lead-qualification", "property-matching"] },
    { title: "Si seguono", line: "Un posto solo dove vedere contatti, trattative e numeri.", ids: ["custom-crm", "dashboards-pipeline", "sales-management", "voice-notes"] },
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
