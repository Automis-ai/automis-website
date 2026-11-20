import AutomisEnShell from "@/components/site/AutomisEnShell";
import AutomationsHero from "@/components/automations/AutomationsHero";
import AutomationsPerSettore from "@/components/automations/AutomationsPerSettore";
import AutomationsExplorer from "@/components/automations/AutomationsExplorer";
import CustomAutomations from "@/components/automations/CustomAutomations";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import AutomationsCta from "@/components/automations/AutomationsCta";

export const metadata = {
  title: "Automazioni IA per settore: cosa puoi automatizzare | Automis",
  description:
    "Scegli il tuo settore e scopri cosa puoi automatizzare con l'IA: cosa fai da solo con la guida e cosa costruiamo con te. Studi, PMI, sanità, immobiliare e altri.",
  keywords: [
    "automazioni IA per settore",
    "intelligenza artificiale per le aziende",
    "automazioni IA",
    "automazione aziendale IA",
    "sistemi IA su misura",
    "company brain",
    "integrazione CRM IA",
    "automazione marketing IA",
  ],
  alternates: {
    canonical: "https://automis.ai/it/automazioni-ia",
    languages: {
      en: "https://automis.ai/ai-automations",
      "it-IT": "https://automis.ai/it/automazioni-ia",
      "pt-PT": "https://automis.ai/pt/ai-automations",
      "x-default": "https://automis.ai/ai-automations",
    },
  },
  openGraph: {
    title: "Automazioni IA per settore | Automis",
    description:
      "Scegli il tuo settore e scopri cosa puoi automatizzare con l'IA, da solo o con il nostro aiuto.",
    url: "https://automis.ai/it/automazioni-ia",
    siteName: "Automis",
    locale: "it_IT",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
};

export default function AutomationsPage() {
  return (
    <AutomisEnShell>
      <AutomationsHero />
      <AutomationsPerSettore />
      <AutomationsExplorer />
      <CustomAutomations />
      <OpportunityFinder />
      <AutomationsCta />
    </AutomisEnShell>
  );
}
