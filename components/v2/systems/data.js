/* Dati senza lingua delle pagine /systems: slug delle categorie e icone delle schede.
   I testi stanno in components/v2/copy/systems.{en,it,pt}.js. */

export const CATEGORY_SLUGS = ["marketing", "sales", "support", "admin", "hr"];

export function isCategory(slug) {
  return CATEGORY_SLUGS.includes(slug);
}

// Icona di ogni scheda, per id (nomi del catalogo components/v2/ui/icons.js).
export const CARD_ICONS = {
  // marketing
  "animated-sites": "web",
  "ecommerce-manager": "cart",
  "ads-creative": "target",
  "seo-geo": "search",
  reviews: "star",
  "content-social": "pen",
  reactivation: "repeat",
  "product-listings": "camera",
  "video-editing": "video",
  // vendita
  "custom-crm": "contact",
  "dashboards-pipeline": "chart",
  "sales-management": "sliders",
  "social-dms": "chat",
  "lead-qualification": "sales",
  "property-matching": "home",
  "voice-notes": "mic",
  // assistenza
  "voice-receptionist": "voice",
  "missed-call-recovery": "phone",
  "answers-247": "clock",
  "ecommerce-support": "cart",
  // amministrazione
  "accounting-software": "receipt",
  "scan-to-brain": "scan",
  "document-intake": "inbox",
  "back-office": "repeat",
  // risorse umane
  "company-brain": "brain",
};

// Colonne della griglia in base a quante schede ha il gruppo (a 1024+; sotto è 1 colonna a 390 e 2 da 640):
// 4 schede in 2 colonne (2 x 2), 3 schede in 3, così nessuna scheda resta sola in fondo.
export function colsFor(n) {
  if (n <= 2) return 2;
  if (n === 3) return 3;
  if (n === 4) return 2;
  return 3;
}

// Categorie con troppe schede per una sola griglia: le schede si dividono in due gruppi dopo le prime N,
// con una fascia (il prodotto o il caso reale) in mezzo, così ogni sezione resta corta e il ritmo cambia.
export const CARD_SPLIT = { marketing: 4, sales: 4 };

// Scheda che nella categoria diventa una fascia a sé (con il suo esempio), invece di stare nella griglia.
export const BAND_CARD = { marketing: "ecommerce-manager" };

// Icone attorno a quella centrale nel visivo dell'apertura, quando la categoria ha poche schede.
export const ART_EXTRA = { hr: ["brain", "doc", "search", "contact"] };

/* "/use-cases/adifesa" -> "adifesa" (gli slug dei casi sono uguali nelle tre lingue). */
export function caseSlug(href) {
  return String(href || "").split("/").filter(Boolean).pop() || "";
}
