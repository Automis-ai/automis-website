import ToolPage from "@/components/tools/ToolPage";
import WhatsAppLinkGenerator from "@/components/tools/widgets/WhatsAppLinkGenerator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("whatsapp-link-generator", "pt");

export default function Page() {
  return (
    <ToolPage toolKey="whatsapp-link-generator" locale="pt">
      <WhatsAppLinkGenerator locale="pt" />
    </ToolPage>
  );
}
