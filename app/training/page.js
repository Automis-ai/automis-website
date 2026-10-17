import TrainingPage from "@/components/v2/training/TrainingPage";
import { trainingMetadata } from "@/components/v2/training/meta";

export const metadata = trainingMetadata("en");

export default function TrainingEnPage({ searchParams }) {
  return <TrainingPage locale="en" tono={searchParams?.tono} />;
}
