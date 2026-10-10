import { buildMetadata } from "@/lib/v2/meta";
import { getCopy } from "@/components/v2/copy/getCopy";
import EcommercePage from "@/components/v2/ecommerce/EcommercePage";

const copy = getCopy("ecommerce", "it");

export const metadata = buildMetadata({
  path: "/ecommerce",
  lang: "it",
  title: copy.meta.title,
  description: copy.meta.description,
});

export default function Page() {
  return <EcommercePage locale="it" />;
}
