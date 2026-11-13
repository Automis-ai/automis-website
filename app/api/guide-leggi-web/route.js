// «Guida web» nel lettore online: l'HTML dal bucket privato, solo con il cookie `ga_lettore` che abilita quella guida.
// Variabili: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (solo lato server). Logica in lib/guideLeggi.js.
import { getCatalogo } from "@/lib/guideCatalogo";
import { handleLeggiWeb } from "@/lib/guideLeggi";

export const dynamic = "force-dynamic";

export async function GET(req) {
  return handleLeggiWeb(req, { catalog: await getCatalogo() });
}
