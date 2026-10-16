import AutomisEnShell from "@/components/site/AutomisEnShell";
import { HeroV3, JourneyV3, SystemsV3, CasesV3, ToneV3 } from "@/components/home-v3/HomeV3";
import HowWeWork from "@/components/home/HowWeWork";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import Authority from "@/components/home/Authority";
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
// Home v3 (16/10/2026), la stessa composizione della versione IT: hero → journey → 4 Sistemi IA → casi studio → come lavoriamo → Finder → founder → call.
export default function HomePt() {
  return (
    <AutomisEnShell>
      <HeroV3 />
      <JourneyV3 />
      <SystemsV3 />
      <CasesV3 />
      <HowWeWork />
      <OpportunityFinder />
      <ToneV3 className="hv3-team">
        <Authority sectionClassName="bg-transparent" />
      </ToneV3>
      <FinalCta v3 />
    </AutomisEnShell>
  );
}
