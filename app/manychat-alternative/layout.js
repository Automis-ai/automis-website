// Public "ManyChat alternative" page (English): indexable, presents the guide and collects the email.
// The actual guide lives in /guide (noindex, code only). Italian twin: /it/alternativa-a-manychat.
export const metadata = {
  title: { absolute: "ManyChat alternative: Instagram comment-to-DM guide" },
  description: "Build your own Instagram comment-to-DM flow with Meta's official APIs: 14 steps, full code and a test checklist. A ManyChat alternative.",
  alternates: {
    canonical: "https://automis.ai/manychat-alternative",
    languages: { "it-IT": "https://automis.ai/it/alternativa-a-manychat", en: "https://automis.ai/manychat-alternative", "x-default": "https://automis.ai/manychat-alternative" },
  },
  openGraph: {
    title: "ManyChat alternative: Instagram comment-to-DM guide",
    description: "Build your own Instagram comment-to-DM flow with Meta's official APIs: 14 steps, full code and a test checklist. A ManyChat alternative.",
    url: "https://automis.ai/manychat-alternative",
    type: "article",
    locale: "en_US",
    images: [{ url: "https://automis.ai/manychat-alternative/og.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "ManyChat alternative: Instagram comment-to-DM guide", description: "Build your own Instagram comment-to-DM flow with Meta's official APIs: 14 steps, full code and a test checklist. A ManyChat alternative.", images: ["https://automis.ai/manychat-alternative/og.png"] },
  robots: { index: true, follow: true },
};

export default function GuideLayout({ children }) {
  return children;
}
