import TrainingPage from "@/components/v2/training/TrainingPage";
import { trainingMetadata } from "@/components/v2/training/meta";

export const metadata = trainingMetadata("it");

export default function TrainingItPage() {
  return <TrainingPage locale="it" />;
}
