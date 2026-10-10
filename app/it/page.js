import HomePage from "@/components/v2/home/HomePage";
import { getCopy } from "@/components/v2/copy/getCopy";
import { buildMetadata } from "@/lib/v2/meta";

const { meta } = getCopy("home", "it");

export const metadata = buildMetadata({
  path: "/",
  lang: "it",
  title: meta.title,
  description: meta.description,
});

// ?tono=b mostra la variante B dei toni; senza parametro vale la A (vedi components/v2/ui/toneClass.js).
export default function HomeIt({ searchParams }) {
  return <HomePage lang="it" tono={searchParams?.tono} />;
}
