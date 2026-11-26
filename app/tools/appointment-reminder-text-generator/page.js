import ToolPage from "@/components/tools/ToolPage";
import ReminderMessageGenerator from "@/components/tools/widgets/ReminderMessageGenerator";
import { toolMetadata } from "@/utility/toolsData";

export const metadata = toolMetadata("appointment-reminder-generator", "en");

export default function Page() {
  return (
    <ToolPage toolKey="appointment-reminder-generator" locale="en">
      <ReminderMessageGenerator locale="en" />
    </ToolPage>
  );
}
