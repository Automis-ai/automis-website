import ToolPage from "@/components/tools/ToolPage";
import NoShowCalculator from "@/components/tools/widgets/NoShowCalculator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("no-show-calculator", "pt");

export default function Page() {
  return (
    <ToolPage toolKey="no-show-calculator" locale="pt">
      <NoShowCalculator locale="pt" />
    </ToolPage>
  );
}
