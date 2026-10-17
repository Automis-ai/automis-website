import { buildMetadata } from "@/lib/v2/meta";
import { getCopy } from "@/components/v2/copy/getCopy";

/* Metadati di /training nella lingua `lang` (en | it | pt). */
export function trainingMetadata(lang) {
  const { meta } = getCopy("training", lang);
  // Formazione è nascosta per ora (16/10/2026): non si indicizza e non è in sitemap. Per riaccenderla basta togliere noindex.
  return buildMetadata({ path: "/training", lang, title: meta.title, description: meta.description, noindex: true });
}
