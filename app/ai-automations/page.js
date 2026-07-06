import AutomisEnShell from "@/components/site/AutomisEnShell";
import AutomationsHero from "@/components/automations/AutomationsHero";
import AutomationsExplorer from "@/components/automations/AutomationsExplorer";
import CustomAutomations from "@/components/automations/CustomAutomations";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import AutomationsCta from "@/components/automations/AutomationsCta";

export const metadata = {
  title: "Automations | Automis",
  description:
    "Browse the AI automations Automis builds, from 24/7 voice receptionists to social-DM-to-CRM and your own Company Brain. Filter by industry and goal to see what fits your business.",
  alternates: {
    canonical: "https://automis.ai/ai-automations",
    languages: {
      en: "https://automis.ai/ai-automations",
      "it-IT": "https://automis.ai/it/ai-automations",
      "x-default": "https://automis.ai/ai-automations",
    },
  },
  openGraph: {
    title: "Automations | Automis",
    description:
      "A browsable catalog of the AI automations we build. Filter by industry and goal to find the systems that fit your business.",
    url: "https://automis.ai/ai-automations",
    siteName: "Automis",
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
