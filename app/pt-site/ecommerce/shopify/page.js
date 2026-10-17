import AutomisEnShell from "@/components/site/AutomisEnShell";
import ShopifyPage from "@/components/home-v3/ShopifyPage";
import { buildMetadata } from "@/lib/v2/meta";

// Ancora in anteprima: non indicizzata finché non parte il negozio pilota (come la versione IT).
export const metadata = buildMetadata({
  path: "/ecommerce/shopify",
  lang: "pt",
  title: "Onde o Sidekick acaba, começamos nós | Automis",
  description:
    "Agentes de IA para lojas Shopify com publicidade: anúncios, clientes, catálogo do Meta e receitas verificados todas as noites, onde o Sidekick não chega.",
  noindex: true,
});

export default function Page({ searchParams }) {
  return (
    <AutomisEnShell>
      <ShopifyPage locale="pt" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
