import ToolPage from "@/components/tools/ToolPage";
import ReminderMessageGenerator from "@/components/tools/widgets/ReminderMessageGenerator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("appointment-reminder-generator", "pt");

export default function Page() {
  return (
    <ToolPage toolKey="appointment-reminder-generator" locale="pt">
      <ReminderMessageGenerator locale="pt" />
    </ToolPage>
  );
}
