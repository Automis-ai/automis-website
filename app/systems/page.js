import AutomisEnShell from "@/components/site/AutomisEnShell";
import HubBody from "@/components/v2/systems/HubBody";
import { hubMetadata } from "@/components/v2/systems/meta";

export const metadata = hubMetadata("en");

export default function SystemsPage({ searchParams }) {
  return (
    <AutomisEnShell>
      <HubBody locale="en" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
