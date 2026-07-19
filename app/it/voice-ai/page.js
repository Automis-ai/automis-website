import AutomisEnShell from "@/components/site/AutomisEnShell";
import VoiceHero from "@/components/voice-ai/VoiceHero";
import VoiceProblem from "@/components/voice-ai/VoiceProblem";
import InboundOutbound from "@/components/voice-ai/InboundOutbound";
import HowItWorks from "@/components/voice-ai/HowItWorks";
import DashboardWalk from "@/components/voice-ai/DashboardWalk";
import CrmTiers from "@/components/voice-ai/CrmTiers";
import VoicePricing from "@/components/voice-ai/VoicePricing";
import VoiceFaq from "@/components/voice-ai/VoiceFaq";
import VoiceBooking from "@/components/voice-ai/VoiceBooking";

export const metadata = {
  title: "Assistente Vocale IA | Segretaria e agenti vocali 24/7 | Automis",
  description:
    "L'assistente vocale IA di Automis risponde 24/7, qualifica i contatti, prenota e sincronizza il CRM. Piani da 297€/mese, garanzia 30 giorni.",
  keywords: [
    "agente vocale IA",
    "segretaria IA",
    "risponditore telefonico IA",
    "assistente vocale per aziende",
    "risposta chiamate 24/7",
    "prenotazione appuntamenti IA",
    "recupero chiamate perse",
  ],
  alternates: {
    canonical: "https://automis.ai/it/voice-ai",
    languages: {
      en: "https://automis.ai/voice-ai",
      "it-IT": "https://automis.ai/it/voice-ai",
      "pt-PT": "https://automis.ai/pt/voice-ai",
      "x-default": "https://automis.ai/voice-ai",
    },
  },
  openGraph: {
    title: "Assistente Vocale Automis | La segretaria IA 24/7 che fissa gli appuntamenti",
    description:
      "Risponde a ogni chiamata 24/7, qualifica, prenota e sincronizza il tuo CRM. Trasparenza totale via dashboard, piani da 297€/mese, garanzia 30 giorni.",
    url: "https://automis.ai/it/voice-ai",
    siteName: "Automis",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Assistente Vocale Automis, la segretaria IA 24/7 che fissa gli appuntamenti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assistente Vocale Automis | La segretaria IA 24/7 che fissa gli appuntamenti",
    description:
      "Risponde a ogni chiamata 24/7, qualifica, prenota e sincronizza il tuo CRM. Trasparenza totale via dashboard, piani da 297€/mese.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function VoiceAiPage() {
  return (
    <AutomisEnShell>
      <VoiceHero />
      <VoiceProblem />
      <InboundOutbound />
      <HowItWorks />
      <DashboardWalk />
      <CrmTiers />
      <VoicePricing />
      <VoiceFaq />
      <VoiceBooking />
    </AutomisEnShell>
  );
}
