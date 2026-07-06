import AutomisEnShell from "@/components/site/AutomisEnShell";
import AutomationsHero from "@/components/automations/AutomationsHero";
import AutomationsExplorer from "@/components/automations/AutomationsExplorer";
import CustomAutomations from "@/components/automations/CustomAutomations";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import AutomationsCta from "@/components/automations/AutomationsCta";

export const metadata = {
  title: "Automazioni IA | Sistemi su misura per il tuo business | Automis",
  description:
    "Esplora le automazioni IA che costruisce Automis: dalle segretarie vocali 24/7 ai flussi da DM social a CRM, fino al tuo Company Brain. Filtra per settore e obiettivo.",
  keywords: [
    "automazioni IA",
    "automazione aziendale IA",
    "sistemi IA su misura",
    "company brain",
    "integrazione CRM IA",
    "automazione marketing IA",
  ],
  alternates: {
    canonical: "https://automis.ai/it/ai-automations",
    languages: {
      en: "https://automis.ai/ai-automations",
      "it-IT": "https://automis.ai/it/ai-automations",
      "x-default": "https://automis.ai/ai-automations",
    },
  },
  openGraph: {
    title: "Automazioni IA | Automis",
    description:
      "Un catalogo navigabile delle automazioni IA che costruiamo. Filtra per settore e obiettivo e trova i sistemi giusti per la tua azienda.",
    url: "https://automis.ai/it/ai-automations",
    siteName: "Automis",
    locale: "it_IT",
    type: "website",
  },
};

export default function AutomationsPage() {
  return (
    <AutomisEnShell>
      <AutomationsHero />
      <AutomationsExplorer />
      <CustomAutomations />
      <OpportunityFinder />
      <AutomationsCta />
    </AutomisEnShell>
  );
}
