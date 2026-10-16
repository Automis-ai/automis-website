import AutomisEnShell from "@/components/site/AutomisEnShell";
import ShopifyPage from "@/components/home-v3/ShopifyPage";
import { buildMetadata } from "@/lib/v2/meta";

// Ancora in anteprima: non indicizzata finché non parte il negozio pilota (come la versione IT).
export const metadata = buildMetadata({
  path: "/ecommerce/shopify",
  lang: "en",
  title: "Where Sidekick ends, we begin | Automis",
  description:
    "AI agents for Shopify stores that run ads: ads, customers, Meta catalog and revenue checked every night, where Sidekick can't reach.",
  noindex: true,
});

export default function Page({ searchParams }) {
  return (
    <AutomisEnShell>
      <ShopifyPage locale="en" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
