// Revoca del consenso «Link aperto»: cancella la riga del codice. Logica e difese in lib/guideVisita.js. Solo POST: 204 = fatto, 503 = non riuscita.
import { handleRevoca } from "@/lib/guideVisita";

export const dynamic = "force-dynamic";

export async function POST(req) {
  return handleRevoca(req);
}
