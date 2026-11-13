// «Leggila online»: numero + guida -> cookie `ga_lettore`. Logica in lib/guideLeggi.js (si prova con GHL finto).
// Variabili: GHL_API_KEY, GHL_LOCATION_ID (già su Vercel); la firma del cookie usa GUIDE_GATE_SECRET o,
// in mancanza, GHL_API_KEY (vedi lib/guideGate.js). Il catalogo viene dal bucket via lib/guideCatalogo.js.
import { getCatalogo } from "@/lib/guideCatalogo";
import { handleLeggiAccesso } from "@/lib/guideLeggi";

export const dynamic = "force-dynamic";

export async function POST(req) {
  return handleLeggiAccesso(req, { catalog: await getCatalogo() });
}
