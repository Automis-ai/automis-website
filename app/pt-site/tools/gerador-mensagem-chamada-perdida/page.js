import ToolPage from "@/components/tools/ToolPage";
import AwayMessageGenerator from "@/components/tools/widgets/AwayMessageGenerator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("missed-call-text-back-generator", "pt");

export default function Page() {
  return (
    <ToolPage toolKey="missed-call-text-back-generator" locale="pt">
      <AwayMessageGenerator locale="pt" />
    </ToolPage>
  );
}
