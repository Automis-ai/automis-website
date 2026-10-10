import TrainingPage from "@/components/v2/training/TrainingPage";
import { trainingMetadata } from "@/components/v2/training/meta";

export const metadata = trainingMetadata("pt");

export default function TrainingPtPage() {
  return <TrainingPage locale="pt" />;
}
