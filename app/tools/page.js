import ToolsHub from "@/components/tools/ToolsHub";
import { hubMetadata } from "@/utility/toolsData";

export const metadata = hubMetadata("en");

export default function Page() {
  return <ToolsHub locale="en" />;
}
