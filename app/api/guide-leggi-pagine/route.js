// Link firmati (10 minuti) per un gruppo di pagine della guida, solo con il cookie `ga_lettore`.
// Variabili: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (solo lato server). Logica in lib/guideLeggi.js.
import { getCatalogo } from "@/lib/guideCatalogo";
import { handleLeggiPagine } from "@/lib/guideLeggi";

export const dynamic = "force-dynamic";

export async function POST(req) {
  return handleLeggiPagine(req, { catalog: await getCatalogo() });
}
