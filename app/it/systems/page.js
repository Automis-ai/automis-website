import AutomisEnShell from "@/components/site/AutomisEnShell";
import SystemsHubV3 from "@/components/home-v3/SystemsHubV3";
import { hubMetadata } from "@/components/v2/systems/meta";

export const metadata = hubMetadata("it");

export default function SystemsPage() {
  return (
    <AutomisEnShell>
      <SystemsHubV3 locale="it" />
    </AutomisEnShell>
  );
}
