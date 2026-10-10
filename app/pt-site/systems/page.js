import AutomisEnShell from "@/components/site/AutomisEnShell";
import HubBody from "@/components/v2/systems/HubBody";
import { hubMetadata } from "@/components/v2/systems/meta";

export const metadata = hubMetadata("pt");

export default function SystemsPage() {
  return (
    <AutomisEnShell>
      <HubBody locale="pt" />
    </AutomisEnShell>
  );
}
