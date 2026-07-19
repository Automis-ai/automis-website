import ToolPage from "@/components/tools/ToolPage";
import MissedCallCalculator from "@/components/tools/widgets/MissedCallCalculator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("missed-call-calculator", "pt");

export default function Page() {
  return (
    <ToolPage toolKey="missed-call-calculator" locale="pt">
      <MissedCallCalculator locale="pt" />
    </ToolPage>
  );
}
