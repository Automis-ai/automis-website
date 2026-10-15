import AutomisEnShell from "@/components/site/AutomisEnShell";
import ShopifyPage from "@/components/home-v3/ShopifyPage";
import { buildMetadata } from "@/lib/v2/meta";

// Ancora in anteprima: non indicizzata finché non parte il negozio pilota (come la landing statica di prima).
export const metadata = buildMetadata({
  path: "/ecommerce/shopify",
  lang: "it",
  title: "Dove Sidekick finisce, iniziamo noi | Automis",
  description:
    "Agenti IA per negozi Shopify che fanno pubblicità: annunci, clienti, catalogo di Meta e incassi controllati ogni notte, dove Sidekick non arriva.",
  languages: ["it"],
  noindex: true,
});

export default function Page({ searchParams }) {
  return (
    <AutomisEnShell>
      <ShopifyPage tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
