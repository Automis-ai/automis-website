import AutomisEnShell from "@/components/site/AutomisEnShell";
import { HeroV3, JourneyV3, SystemsV3, CasesV3, ToneV3 } from "@/components/home-v3/HomeV3";
import HowWeWork from "@/components/home/HowWeWork";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import Authority from "@/components/home/Authority";
import FinalCta from "@/components/home/FinalCta";

export const metadata = {
  title: "Automis | Agenzia di automazione IA per il tuo business",
  description:
    "Automis è un'agenzia strategica di automazione IA. Costruiamo gli assistenti vocali IA, le automazioni e i sistemi che mancano al tuo business.",
  alternates: {
    canonical: "https://automis.ai/it",
    languages: {
      en: "https://automis.ai/",
      "it-IT": "https://automis.ai/it",
      "pt-PT": "https://automis.ai/pt",
      "x-default": "https://automis.ai/",
    },
  },
  openGraph: {
    title: "Automis | Agenzia di automazione IA per il tuo business",
    description:
      "Costruiamo gli assistenti vocali IA, le automazioni e i sistemi che mancano al tuo business, dall'inizio alla fine.",
    url: "https://automis.ai/it",
    siteName: "Automis",
    locale: "it_IT",
    type: "website",
    images: [{ url: "/assets/og/home-en.png", width: 1200, height: 630, alt: "Automis" }],
  },
};

// Home v3 (13/10/2026): hero → journey → 5 Sistemi IA → casi studio → come lavoriamo → Finder → founder → call.
// Fuori dalla home: Problemi (finiti nelle schede dei sistemi), Settori e FAQ.
export default function HomeIt() {
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
      <FinalCta />
    </AutomisEnShell>
  );
}
