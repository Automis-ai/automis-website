import TrainingPage from "@/components/v2/training/TrainingPage";
import { trainingMetadata } from "@/components/v2/training/meta";

export const metadata = trainingMetadata("en");

export default function TrainingEnPage() {
  return <TrainingPage locale="en" />;
}
