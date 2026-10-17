import AutomisEnShell from "@/components/site/AutomisEnShell";
import WooCommercePage from "@/components/home-v3/WooCommercePage";
import { buildMetadata } from "@/lib/v2/meta";

// Ancora in anteprima: non indicizzata finché non si decide il deploy (come la versione IT).
export const metadata = buildMetadata({
  path: "/ecommerce/woocommerce",
  lang: "pt",
  title: "Quem vigia o seu WooCommerce enquanto dorme? | Automis",
  description:
    "Agentes de IA para lojas WooCommerce: tarefas agendadas, atualizações, catálogo e site verificados todas as noites. Em produção na Datura Clothing.",
  noindex: true,
});

export default function Page({ searchParams }) {
  return (
    <AutomisEnShell>
      <WooCommercePage locale="pt" tono={searchParams?.tono} />
    </AutomisEnShell>
  );
}
