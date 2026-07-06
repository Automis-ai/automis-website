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
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Automis Voice AI | 24/7 Receptionist That Books Calls",
  description:
    "Automis Voice AI answers every call 24/7, qualifies leads, books appointments, and syncs to your CRM. Full dashboard transparency, plans from €297/mo, 30-day performance guarantee.",
  keywords: [
    "AI voice agent",
    "AI receptionist",
    "AI phone answering",
    "voice AI for business",
    "24/7 call answering",
    "AI appointment booking",
    "missed call recovery",
  ],
  alternates: { canonical: "https://automis.ai/voice-ai" },
  openGraph: {
    title: "Automis Voice AI | The 24/7 AI receptionist that books appointments",
    description:
      "Answers every call 24/7, qualifies, books, and syncs to your CRM. Full dashboard transparency, plans from €297/mo, 30-day performance guarantee.",
    url: "https://automis.ai/voice-ai",
    siteName: "Automis",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis Voice AI, the 24/7 AI receptionist that books appointments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automis Voice AI | The 24/7 AI receptionist that books appointments",
    description:
      "Answers every call 24/7, qualifies, books, and syncs to your CRM. Full dashboard transparency, plans from €297/mo.",
    images: ["/assets/og/home-en.png"],
  },
};

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automis Voice AI",
  serviceType: "AI voice receptionist and call answering",
  provider: { "@id": "https://automis.ai/#organization" },
  description:
    "24/7 AI receptionist that answers every call, qualifies leads, books appointments, and syncs to your CRM.",
  offers: {
    "@type": "Offer",
    price: "297",
    priceCurrency: "EUR",
    url: "https://automis.ai/voice-ai",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "297",
      priceCurrency: "EUR",
      unitText: "MONTH",
    },
  },
};

export default function VoiceAiPage() {
  return (
    <AutomisEnShell>
      <JsonLd data={SERVICE_JSONLD} />
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
