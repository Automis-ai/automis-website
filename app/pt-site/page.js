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
  title: "Automis | Agência de automação IA para o seu negócio",
  description:
    "A Automis é uma agência estratégica de automação IA. Construímos os assistentes de voz IA, as automações e os sistemas que faltam ao seu negócio.",
  alternates: {
    canonical: "https://automis.ai/pt",
    languages: {
      en: "https://automis.ai/",
      "it-IT": "https://automis.ai/it",
      "pt-PT": "https://automis.ai/pt",
      "x-default": "https://automis.ai/",
    },
  },
  openGraph: {
    title: "Automis | Agência de automação IA para o seu negócio",
    description:
      "Construímos os assistentes de voz IA, as automações e os sistemas que faltam ao seu negócio, do início ao fim.",
    url: "https://automis.ai/pt",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: [{ url: "/assets/og/home-en.png", width: 1200, height: 630, alt: "Automis" }],
  },
};

// The Portuguese home reuses the new design system; every home section is
// locale-aware (it renders European Portuguese on /pt via usePathname).
export default function HomePt() {
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
