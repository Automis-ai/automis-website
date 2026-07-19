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
  title: "Assistente de Voz IA | Rececionista e agentes de voz 24/7 | Automis",
  description:
    "O assistente de voz IA da Automis atende 24/7, qualifica os contactos, marca e sincroniza o CRM. Planos a partir de 297€/mês, garantia de 30 dias.",
  keywords: [
    "agente de voz IA",
    "rececionista IA",
    "atendimento telefónico IA",
    "assistente de voz para empresas",
    "atendimento de chamadas 24/7",
    "marcação de consultas IA",
    "recuperação de chamadas perdidas",
  ],
  alternates: {
    canonical: "https://automis.ai/pt/voice-ai",
    languages: {
      en: "https://automis.ai/voice-ai",
      "it-IT": "https://automis.ai/it/voice-ai",
      "pt-PT": "https://automis.ai/pt/voice-ai",
      "x-default": "https://automis.ai/voice-ai",
    },
  },
  openGraph: {
    title: "Assistente de Voz Automis | A rececionista IA 24/7 que marca as consultas",
    description:
      "Atende cada chamada 24/7, qualifica, marca e sincroniza o seu CRM. Transparência total via dashboard, planos a partir de 297€/mês, garantia de 30 dias.",
    url: "https://automis.ai/pt/voice-ai",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Assistente de Voz Automis, a rececionista IA 24/7 que marca as consultas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Assistente de Voz Automis | A rececionista IA 24/7 que marca as consultas",
    description:
      "Atende cada chamada 24/7, qualifica, marca e sincroniza o seu CRM. Transparência total via dashboard, planos a partir de 297€/mês.",
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
