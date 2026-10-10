import { buildMetadata } from "@/lib/v2/meta";
import { getCopy } from "@/components/v2/copy/getCopy";

/* Metadati dell'hub /systems nella lingua `lang` (en | it | pt). */
export function hubMetadata(lang) {
  const { meta } = getCopy("systems", lang);
  return buildMetadata({ path: "/systems", lang, title: meta.title, description: meta.description });
}

/* Metadati di /systems/<slug> nella lingua `lang`. */
export function categoryMetadata(lang, slug) {
  const { meta } = getCopy("systems", lang)[slug];
  return buildMetadata({ path: `/systems/${slug}`, lang, title: meta.title, description: meta.description });
}
