// Visita di un link personale delle guide (beacon dal browser). Logica e difese in lib/guideVisita.js. Solo POST, risponde sempre 204.
import { handleVisita } from "@/lib/guideVisita";

export const dynamic = "force-dynamic";

export async function POST(req) {
  return handleVisita(req);
}
