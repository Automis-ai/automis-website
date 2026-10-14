import AutomisEnShell from "@/components/site/AutomisEnShell";
import ContactView from "@/components/v2/contact/ContactView";

export const metadata = {
  title: "Contatti | Parliamo del tuo progetto IA | Automis",
  description:
    "Contatta Automis. Prenota una call conoscitiva di 30 minuti: ti mostriamo dove l'IA può farti recuperare tempo, chiamate e fatturato.",
  keywords: [
    "contatti Automis",
    "consulenza automazione IA",
    "call conoscitiva IA",
    "partner automazione IA",
  ],
  alternates: {
    canonical: "https://automis.ai/it/contact",
    languages: {
      en: "https://automis.ai/contact",
      "it-IT": "https://automis.ai/it/contact",
      "pt-PT": "https://automis.ai/pt/contact",
      "x-default": "https://automis.ai/contact",
    },
  },
  openGraph: {
    title: "Contatti Automis | Parla con un partner strategico di automazione IA",
    description:
      "Scrivici un messaggio o prenota una call conoscitiva. Individuiamo dove la tua azienda perde tempo e denaro, poi costruiamo i sistemi IA per risolverlo.",
    url: "https://automis.ai/it/contact",
    siteName: "Automis",
    locale: "it_IT",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contatti Automis",
    description:
      "Scrivici un messaggio o prenota una call conoscitiva con un partner strategico di automazione IA.",
  },
};

export default function ContactPage({ searchParams }) {
  return (
    <AutomisEnShell>
      <ContactView lang="it" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
