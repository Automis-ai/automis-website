import AutomisEnShell from "@/components/site/AutomisEnShell";
import HeroEN from "@/components/home/HeroEN";
import PainPoints from "@/components/home/PainPoints";
import SystemPillars from "@/components/home/SystemPillars";
import HowWeWork from "@/components/home/HowWeWork";
import Proof from "@/components/home/Proof";
import Industries from "@/components/home/Industries";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import Authority from "@/components/home/Authority";
import FaqEN from "@/components/home/FaqEN";
import FinalCta from "@/components/home/FinalCta";

export const metadata = {
  title: "Automis | AI Automation Agency for Business — Voice, Sales & Admin AI",
  description:
    "Automis is a strategic AI automation agency. We build the AI voice agents, automations, and company-brain systems your business is missing, end to end.",
  keywords: [
    "AI automation agency",
    "AI agency",
    "AI voice agent",
    "business automation",
    "AI for small business",
    "AI receptionist",
  ],
  alternates: {
    canonical: "https://automis.ai/",
    languages: {
      en: "https://automis.ai/",
      "it-IT": "https://automis.ai/it",
      "pt-PT": "https://automis.ai/pt",
      "x-default": "https://automis.ai/",
    },
  },
  openGraph: {
    title: "Automis | The AI automation agency that builds the system your business is missing",
    description:
      "AI voice agents, marketing automation, and company-brain systems, built end to end around how your business actually works.",
    url: "https://automis.ai/",
    siteName: "Automis",
    type: "website",
    images: [
      {
        url: "/assets/og/home-en.png",
        width: 1200,
        height: 630,
        alt: "Automis — We build the systems your business is missing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Automis | The AI automation agency that builds the system your business is missing",
    description:
      "AI voice agents, marketing automation, and company-brain systems, built end to end around how your business actually works.",
    images: ["/assets/og/home-en.png"],
  },
};

export default function Home() {
  return (
    <AutomisEnShell>
      <HeroEN />
      <PainPoints />
      <SystemPillars />
      <HowWeWork />
      <Proof />
      <Industries />
      <OpportunityFinder />
      <Authority />
      <FaqEN />
      <FinalCta />
    </AutomisEnShell>
  );
}
