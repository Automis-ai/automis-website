import { notFound } from "next/navigation";
import AutomisItShell from "@/components/site/AutomisItShell";
import GuideCatalog from "@/components/guide-catalogo/GuideCatalog";
import { getCatalogo } from "@/lib/guideCatalogo";
import { parseSource, parseRif } from "@/lib/guideWa";
import { relatedFor, TARGETS } from "@/lib/guideCorrelate";
import { guideOg } from "@/lib/guideOg";

// Pagina breve per i link dell'outreach: /it/guide/cfo, /it/guide/ceo, /it/guide/studi.
// Stessa pagina di /it/guide?g=CODICE (guida promessa in alto + correlate), con la fonte «LinkedIn» già impostata.
// Non è per la ricerca: noindex, canonical sul catalogo, fuori dalla sitemap.
export const dynamic = "force-dynamic";

// Video «Company Brain» (50 s, con la voce, parte solo al click) sotto la guida promessa, su tutte e tre le pagine.
// Versione guide: la scheda finale non cita il sito (regola del 12/11). File in public/media/company-brain/guide-*.
const VIDEO = {
  base: "/media/company-brain/guide",
  title: "Guarda un Company Brain al lavoro",
  lead: "Contratti, fatture, buste paga: l’assistente risponde solo dai documenti e ti mostra la frase esatta.",
  label: "Video di 50 secondi: un assistente che risponde sui documenti di un’azienda di esempio, con file, sezione e citazione.",
};

export async function generateMetadata({ params }) {
  const code = TARGETS[params.target];
  const guida = code ? (await getCatalogo()).find((g) => g.code === code) : null;
  const title = guida ? `${guida.titolo} | Luca Casillo, Automis` : "Guide pratiche sull'IA | Luca Casillo, Automis";
  return {
    title: { absolute: title },
    alternates: { canonical: "https://automis.ai/it/guide" },
    ...guideOg({ guida, title, url: `https://automis.ai/it/guide/${params.target}` }),
    robots: { index: false, follow: false },
  };
}

export default async function GuideTargetPage({ params, searchParams }) {
  const code = TARGETS[params.target];
  if (!code) notFound();
  const catalogo = await getCatalogo();
  const source = parseSource(searchParams?.da) || "LO";
  const rif = parseRif(searchParams?.p);
  const focusCode = catalogo.some((g) => g.code === code) ? code : "";
  return (
    <AutomisItShell hideStickyCta landing>
      <GuideCatalog guide={catalogo} source={source} rif={rif} focusCode={focusCode} related={focusCode ? relatedFor(focusCode, catalogo) : []} video={focusCode ? VIDEO : null} landing />
    </AutomisItShell>
  );
}
