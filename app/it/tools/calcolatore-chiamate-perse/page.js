import ToolPage from "@/components/tools/ToolPage";
import MissedCallCalculator from "@/components/tools/widgets/MissedCallCalculator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("missed-call-calculator", "it");

export default function Page() {
  return (
    <ToolPage toolKey="missed-call-calculator" locale="it">
      <MissedCallCalculator locale="it" />
    </ToolPage>
  );
}
