import AutomisEnShell from "@/components/site/AutomisEnShell";
import AutomationsHero from "@/components/automations/AutomationsHero";
import AutomationsExplorer from "@/components/automations/AutomationsExplorer";
import CustomAutomations from "@/components/automations/CustomAutomations";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import AutomationsCta from "@/components/automations/AutomationsCta";

export const metadata = {
  title: "Automações de IA | Sistemas à medida para o seu negócio | Automis",
  description:
    "Explore as automações de IA da Automis: assistentes de voz 24/7, fluxos de DMs das redes sociais para o CRM e o seu Company Brain. Filtre por setor e objetivo.",
  keywords: [
    "automações de IA",
    "automação empresarial com IA",
    "sistemas de IA à medida",
    "company brain",
    "integração de CRM com IA",
    "automação de marketing com IA",
  ],
  alternates: {
    canonical: "https://automis.ai/pt/ai-automations",
    languages: {
      en: "https://automis.ai/ai-automations",
      "it-IT": "https://automis.ai/it/ai-automations",
      "pt-PT": "https://automis.ai/pt/ai-automations",
      "x-default": "https://automis.ai/ai-automations",
    },
  },
  openGraph: {
    title: "Automações de IA | Automis",
    description:
      "Um catálogo navegável das automações de IA que construímos. Filtre por setor e objetivo e encontre os sistemas certos para a sua empresa.",
    url: "https://automis.ai/pt/ai-automations",
    siteName: "Automis",
    locale: "pt_PT",
    type: "website",
    images: ["/assets/og/home-en.png"],
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
