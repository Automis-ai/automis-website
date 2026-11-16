import { notFound } from "next/navigation";
import AutomisItShell from "@/components/site/AutomisItShell";
import GuideCatalog from "@/components/guide-catalogo/GuideCatalog";
import { getCatalogo } from "@/lib/guideCatalogo";
import { parseSource } from "@/lib/guideWa";
import { relatedFor, TARGETS } from "@/lib/guideCorrelate";

// Pagina breve per i link dell'outreach: /it/guide/cfo, /it/guide/ceo, /it/guide/studi.
// Stessa pagina di /it/guide?g=CODICE (guida promessa in alto + correlate), con la fonte «LinkedIn» già impostata.
// Non è per la ricerca: noindex, canonical sul catalogo, fuori dalla sitemap.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const code = TARGETS[params.target];
  const guida = code ? (await getCatalogo()).find((g) => g.code === code) : null;
  const title = guida ? `${guida.titolo} | Luca Casillo, Automis` : "Guide pratiche sull'IA | Luca Casillo, Automis";
  return {
    title: { absolute: title },
    alternates: { canonical: "https://automis.ai/it/guide" },
    robots: { index: false, follow: false },
  };
}

export default async function GuideTargetPage({ params, searchParams }) {
  const code = TARGETS[params.target];
  if (!code) notFound();
  const catalogo = await getCatalogo();
  const source = parseSource(searchParams?.da) || "LO";
  const focusCode = catalogo.some((g) => g.code === code) ? code : "";
  return (
    <AutomisItShell hideStickyCta>
      <GuideCatalog guide={catalogo} source={source} focusCode={focusCode} related={focusCode ? relatedFor(focusCode, catalogo) : []} />
    </AutomisItShell>
  );
}
