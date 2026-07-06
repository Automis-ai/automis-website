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
  title: "Automis | Agenzia di automazione AI per il tuo business",
  description:
    "Automis è un'agenzia strategica di automazione AI. Costruiamo gli AI voice agent, le automazioni e i sistemi “company brain” che mancano al tuo business, dall'inizio alla fine.",
  alternates: {
    canonical: "https://automis.ai/it",
    languages: {
      en: "https://automis.ai/",
      "it-IT": "https://automis.ai/it",
      "x-default": "https://automis.ai/",
    },
  },
  openGraph: {
    title: "Automis | Agenzia di automazione AI per il tuo business",
    description:
      "Costruiamo gli AI voice agent, le automazioni e i sistemi che mancano al tuo business, dall'inizio alla fine.",
    url: "https://automis.ai/it",
    siteName: "Automis",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/assets/og/home-en.png", width: 1200, height: 630, alt: "Automis" }],
  },
};

// The Italian home reuses the new design system; every home section is
// locale-aware (it renders Italian on /it via usePathname).
export default function HomeIt() {
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
