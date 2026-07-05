import AutomisEnShell from "@/components/site/AutomisEnShell";
import VoiceHero from "@/components/voice-ai/VoiceHero";
import VoiceProblem from "@/components/voice-ai/VoiceProblem";
import HowItWorks from "@/components/voice-ai/HowItWorks";
import DashboardWalk from "@/components/voice-ai/DashboardWalk";
import CrmTiers from "@/components/voice-ai/CrmTiers";
import VoicePricing from "@/components/voice-ai/VoicePricing";
import VoiceFaq from "@/components/voice-ai/VoiceFaq";
import FinalCta from "@/components/home/FinalCta";

export const metadata = {
  title: "Automis Voice AI | The 24/7 AI Receptionist That Books Appointments",
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
        alt: "Automis Voice AI — the 24/7 AI receptionist that books appointments",
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

export default function VoiceAiPage() {
  return (
    <AutomisEnShell>
      <VoiceHero />
      <VoiceProblem />
      <HowItWorks />
      <DashboardWalk />
      <CrmTiers />
      <VoicePricing />
      <VoiceFaq />
      <FinalCta />
    </AutomisEnShell>
  );
}
