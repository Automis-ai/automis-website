import ToolsHub from "@/components/tools/ToolsHub";
import { hubMetadata } from "@/utility/toolsData";

export const metadata = hubMetadata("pt");

export default function Page() {
  return <ToolsHub locale="pt" />;
}
