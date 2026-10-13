import UseCasesIndex from "@/components/use-cases/UseCasesIndex";
import { indexMetadata } from "@/components/v2/use-cases/meta";

export const metadata = indexMetadata("pt");

export default function UseCasesPagePt() {
  return <UseCasesIndex locale="pt" />;
}
