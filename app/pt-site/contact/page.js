import AutomisEnShell from "@/components/site/AutomisEnShell";
import ContactView from "@/components/v2/contact/ContactView";

export const metadata = {
  title: "Contactos | Vamos falar do seu projeto de IA | Automis",
  description:
    "Contacte a Automis. Agende uma chamada de descoberta de 30 minutos: mostramos-lhe onde a IA lhe pode devolver tempo, chamadas e faturação.",
  keywords: [
    "contactos Automis",
    "consultoria automação IA",
    "chamada de descoberta IA",
    "parceiro automação IA",
  ],
  alternates: {
    canonical: "https://automis.ai/pt/contact",
    languages: {
      en: "https://automis.ai/contact",
      "it-IT": "https://automis.ai/it/contact",
      "pt-PT": "https://automis.ai/pt/contact",
      "x-default": "https://automis.ai/contact",
    },
  },
  openGraph: {
    title: "Contactos Automis | Fale com um parceiro estratégico de automação IA",
    description:
      "Envie-nos uma mensagem ou agende uma chamada de descoberta. Identificamos onde a sua empresa perde tempo e dinheiro e depois construímos os sistemas de IA para resolver.",
    url: "https://automis.ai/pt/contact",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contactos Automis",
    description:
      "Envie-nos uma mensagem ou agende uma chamada de descoberta com um parceiro estratégico de automação IA.",
  },
};

export default function ContactPage({ searchParams }) {
  return (
    <AutomisEnShell>
      <ContactView lang="pt" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
