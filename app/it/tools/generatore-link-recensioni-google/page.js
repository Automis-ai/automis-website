import ToolPage from "@/components/tools/ToolPage";
import ReviewLinkGenerator from "@/components/tools/widgets/ReviewLinkGenerator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("google-review-link-generator", "it");

export default function Page() {
  return (
    <ToolPage toolKey="google-review-link-generator" locale="it">
      <ReviewLinkGenerator locale="it" />
    </ToolPage>
  );
}
