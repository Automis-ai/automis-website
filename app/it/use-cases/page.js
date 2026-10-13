import UseCasesIndex from "@/components/use-cases/UseCasesIndex";
import { indexMetadata } from "@/components/v2/use-cases/meta";

export const metadata = indexMetadata("it");

export default function UseCasesPageIt() {
  return <UseCasesIndex locale="it" />;
}
