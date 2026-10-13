import UseCasesIndex from "@/components/use-cases/UseCasesIndex";
import { indexMetadata } from "@/components/v2/use-cases/meta";

export const metadata = indexMetadata("en");

export default function UseCasesPage() {
  return <UseCasesIndex locale="en" />;
}
