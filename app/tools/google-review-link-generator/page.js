import ToolPage from "@/components/tools/ToolPage";
import ReviewLinkGenerator from "@/components/tools/widgets/ReviewLinkGenerator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("google-review-link-generator", "en");

export default function Page() {
  return (
    <ToolPage toolKey="google-review-link-generator" locale="en">
      <ReviewLinkGenerator locale="en" />
    </ToolPage>
  );
}
