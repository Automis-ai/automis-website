import ToolPage from "@/components/tools/ToolPage";
import WhatsAppLinkGenerator from "@/components/tools/widgets/WhatsAppLinkGenerator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("whatsapp-link-generator", "en");

export default function Page() {
  return (
    <ToolPage toolKey="whatsapp-link-generator" locale="en">
      <WhatsAppLinkGenerator locale="en" />
    </ToolPage>
  );
}
