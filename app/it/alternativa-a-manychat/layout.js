// Pagina pubblica «alternativa a ManyChat» (italiano): indicizzabile, presenta la guida e raccoglie l'email.
// La guida vera sta in /guida (noindex, solo con il codice). Gemella inglese: /manychat-alternative.
// Il link corto /alternativa-a-manychat rimanda qui (middleware.js).
export const metadata = {
  title: { absolute: "Alternativa a ManyChat: commento e DM su Instagram" },
  description: "Come costruire da solo il flusso commento e messaggio privato su Instagram con le API di Meta: 14 passi, codice completo e prove.",
  alternates: {
    canonical: "https://automis.ai/it/alternativa-a-manychat",
    languages: { "it-IT": "https://automis.ai/it/alternativa-a-manychat", en: "https://automis.ai/manychat-alternative", "x-default": "https://automis.ai/manychat-alternative" },
  },
  openGraph: {
    title: "Alternativa a ManyChat: commento e DM su Instagram",
    description: "Come costruire da solo il flusso commento e messaggio privato su Instagram con le API di Meta: 14 passi, codice completo e prove.",
    url: "https://automis.ai/it/alternativa-a-manychat",
    type: "article",
    locale: "it_IT",
    images: [{ url: "https://automis.ai/luca-ig/og-alternativa-a-manychat.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Alternativa a ManyChat: commento e DM su Instagram", description: "Come costruire da solo il flusso commento e messaggio privato su Instagram con le API di Meta: 14 passi, codice completo e prove.", images: ["https://automis.ai/luca-ig/og-alternativa-a-manychat.png"] },
  robots: { index: true, follow: true },
};

export default function GuidaLayout({ children }) {
  return children;
}
