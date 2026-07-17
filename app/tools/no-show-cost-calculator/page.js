import ToolPage from "@/components/tools/ToolPage";
import NoShowCalculator from "@/components/tools/widgets/NoShowCalculator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("no-show-calculator", "en");

export default function Page() {
  return (
    <ToolPage toolKey="no-show-calculator" locale="en">
      <NoShowCalculator locale="en" />
    </ToolPage>
  );
}
