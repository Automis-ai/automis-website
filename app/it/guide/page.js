import AutomisItShell from "@/components/site/AutomisItShell";
import GuideCatalog from "@/components/guide-catalogo/GuideCatalog";
import { getCatalogo } from "@/lib/guideCatalogo";
import { parseCode, parseSource } from "@/lib/guideWa";
import { relatedFor } from "@/lib/guideCorrelate";
import { guideOg } from "@/lib/guideOg";

const TITLE = "Guide pratiche sull'IA per le aziende | Luca Casillo, Automis";
const DESC = `Guide pratiche sull'IA per ruolo, settore e strumento, con conti e passi pratici. Le ricevi su WhatsApp, le leggi online e, se ti blocchi, risponde Luca.`;

export async function generateMetadata({ searchParams }) {
  const code = parseCode(searchParams?.g);
  const guida = code ? (await getCatalogo()).find((g) => g.code === code) : null;
  const title = guida ? `${guida.titolo} | Luca Casillo, Automis` : TITLE;
  const url = guida ? `https://automis.ai/it/guide?g=${guida.code}` : "https://automis.ai/it/guide";
    return {
    title: { absolute: title },
    alternates: { canonical: "https://automis.ai/it/guide", languages: { "it-IT": "https://automis.ai/it/guide" } },
    ...guideOg({ guida, title, url, fallback: DESC }),
    robots: { index: true, follow: true },
  };
}

// ?g=R1  -> la guida R1 in evidenza in alto, con poche correlate sotto e il catalogo a un link (lib/guideCorrelate.js);
//           se la guida è «in arrivo» resta il catalogo intero con la scheda evidenziata
// ?da=lo -> fonte (li, lo, ig, tt, sito) che finisce nel messaggio WhatsApp: «· dal messaggio su LinkedIn»
// Il catalogo arriva dal bucket Supabase (cache 5 minuti): la pagina è dinamica, niente deploy per una guida nuova.
export const dynamic = "force-dynamic";

export default async function GuidePage({ searchParams }) {
  const catalogo = await getCatalogo();
  const code = parseCode(searchParams?.g);
  const focusCode = catalogo.some((g) => g.code === code) ? code : "";
  const source = parseSource(searchParams?.da);
  return (
    <AutomisItShell hideStickyCta>
      <GuideCatalog guide={catalogo} source={source} focusCode={focusCode} related={focusCode ? relatedFor(focusCode, catalogo) : []} />
    </AutomisItShell>
  );
}
