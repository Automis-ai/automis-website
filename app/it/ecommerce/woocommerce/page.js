import AutomisEnShell from "@/components/site/AutomisEnShell";
import WooCommercePage from "@/components/home-v3/WooCommercePage";
import { buildMetadata } from "@/lib/v2/meta";

// Ancora in anteprima: non indicizzata finché non si decide il deploy (come la landing statica di prima).
export const metadata = buildMetadata({
  path: "/ecommerce/woocommerce",
  lang: "it",
  title: "Chi guarda il tuo WooCommerce mentre dormi? | Automis",
  description:
    "Agenti IA per negozi WooCommerce: attività programmate, aggiornamenti, catalogo e sito controllati ogni notte. In produzione su Datura Clothing.",
  noindex: true,
});

export default function Page({ searchParams }) {
  return (
    <AutomisEnShell>
      <WooCommercePage locale="it" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
