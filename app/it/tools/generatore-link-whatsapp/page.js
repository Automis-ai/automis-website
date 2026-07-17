import ToolPage from "@/components/tools/ToolPage";
import WhatsAppLinkGenerator from "@/components/tools/widgets/WhatsAppLinkGenerator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("whatsapp-link-generator", "it");

export default function Page() {
  return (
    <ToolPage toolKey="whatsapp-link-generator" locale="it">
      <WhatsAppLinkGenerator locale="it" />
    </ToolPage>
  );
}
