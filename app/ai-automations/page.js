import AutomisEnShell from "@/components/site/AutomisEnShell";
import AutomationsHero from "@/components/automations/AutomationsHero";
import AutomationsExplorer from "@/components/automations/AutomationsExplorer";
import CustomAutomations from "@/components/automations/CustomAutomations";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import AutomationsCta from "@/components/automations/AutomationsCta";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "AI Automations for Business | Automis",
  description:
    "Browse the AI automations Automis builds, from 24/7 voice receptionists to social-DM-to-CRM and your own Company Brain. Filter by industry and goal to see what fits your business.",
  alternates: { canonical: "https://automis.ai/ai-automations" },
  openGraph: {
    title: "AI Automations for Business | Automis",
    description:
      "A browsable catalog of the AI automations we build. Filter by industry and goal to find the systems that fit your business.",
    url: "https://automis.ai/ai-automations",
    siteName: "Automis",
    type: "website",
  },
};

const AUTOMATIONS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Automis AI Automations",
  provider: { "@id": "https://automis.ai/#organization" },
  url: "https://automis.ai/ai-automations",
  description:
    "Custom AI automations for business: 24/7 voice agents, social-DM-to-CRM, lead qualification, and a searchable Company Brain over your data.",
};

export default function AutomationsPage() {
  return (
    <AutomisEnShell>
      <JsonLd data={AUTOMATIONS_JSONLD} />
      <AutomationsHero />
      <AutomationsExplorer />
      <CustomAutomations />
      <OpportunityFinder />
      <AutomationsCta />
    </AutomisEnShell>
  );
}
