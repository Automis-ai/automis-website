import AutomisEnShell from "@/components/site/AutomisEnShell";
import WooCommercePage from "@/components/home-v3/WooCommercePage";
import { buildMetadata } from "@/lib/v2/meta";

// Ancora in anteprima: non indicizzata finché non si decide il deploy (come la versione IT).
export const metadata = buildMetadata({
  path: "/ecommerce/woocommerce",
  lang: "en",
  title: "Who's watching your WooCommerce while you sleep? | Automis",
  description:
    "AI agents for WooCommerce stores: scheduled tasks, updates, catalog and site checked every night. Live at Datura Clothing.",
  noindex: true,
});

export default function Page({ searchParams }) {
  return (
    <AutomisEnShell>
      <WooCommercePage locale="en" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
