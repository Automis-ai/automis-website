// Prezzi per regione (solo pagine inglesi): chi arriva dagli Stati Uniti vede il listino in dollari,
// tutti gli altri quello in euro. La regione la decide middleware.js e la passa come header `x-region`
// (?region=us|eu per provare, ricordato in un cookie; altrimenti x-vercel-ip-country). Lettura solo lato server.
import { headers } from "next/headers";

export function getRegion() {
  try {
    return headers().get("x-region") === "us" ? "us" : "eu";
  } catch {
    return "eu";
  }
}

// Sostituisce, nei testi inglesi, "€297/month" con "$497/month" (stringhe annidate comprese).
// Il JSON-LD delle FAQ si costruisce dai testi originali (FaqSection, prop jsonLdItems): resta in euro.
export function usCopy(value) {
  if (typeof value === "string") return value.replace(/€297\/month/g, "$$497/month");
  if (Array.isArray(value)) return value.map(usCopy);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, usCopy(v)]));
  }
  return value;
}
