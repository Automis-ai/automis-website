import ToolPage from "@/components/tools/ToolPage";
import ReceptionistCostCalculator from "@/components/tools/widgets/ReceptionistCostCalculator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("receptionist-cost-calculator", "it");

export default function Page() {
  return (
    <ToolPage toolKey="receptionist-cost-calculator" locale="it">
      <ReceptionistCostCalculator locale="it" />
    </ToolPage>
  );
}
