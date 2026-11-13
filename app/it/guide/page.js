import AutomisItShell from "@/components/site/AutomisItShell";
import GuideCatalog from "@/components/guide-catalogo/GuideCatalog";
import { getCatalogo } from "@/lib/guideCatalogo";
import { parseCode, parseSource } from "@/lib/guideWa";

const TITLE = "Guide pratiche sull'IA per le aziende | Luca Casillo, Automis";
const DESC = `Guide pratiche sull'IA per ruolo, settore e strumento, con conti e passi pratici. Le ricevi su WhatsApp, le leggi online e, se ti blocchi, risponde Luca.`;

export const metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: {
    canonical: "https://automis.ai/it/guide",
    languages: { "it-IT": "https://automis.ai/it/guide" },
  },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://automis.ai/it/guide",
    siteName: "Automis",
    type: "website",
    locale: "it_IT",
    images: [{ url: "/assets/og/home-en.png", width: 1200, height: 630, alt: "Le guide di Luca Casillo, Automis" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/assets/og/home-en.png"] },
  robots: { index: true, follow: true },
};

// ?g=R1  -> la guida R1 in primo piano
// ?da=li -> fonte (li, lo, ig, tt, sito) che finisce nel messaggio WhatsApp: (R1·LI)
// Il catalogo arriva dal bucket Supabase (cache 5 minuti): la pagina è dinamica, niente deploy per una guida nuova.
export const dynamic = "force-dynamic";

export default async function GuidePage({ searchParams }) {
  const catalogo = await getCatalogo();
  const code = parseCode(searchParams?.g);
  const focusCode = catalogo.some((g) => g.code === code) ? code : "";
  const source = parseSource(searchParams?.da);
  return (
    <AutomisItShell hideStickyCta>
      <GuideCatalog guide={catalogo} source={source} focusCode={focusCode} />
    </AutomisItShell>
  );
}
