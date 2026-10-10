import { buildMetadata } from "@/lib/v2/meta";
import { getCopy } from "@/components/v2/copy/getCopy";
import { ALBUM_AI_SLUG } from "@/components/v2/use-cases/constants";

/* Metadati dell'indice /use-cases nella lingua `lang` (en | it | pt). */
export function indexMetadata(lang) {
  const { meta } = getCopy("use-cases", lang);
  return buildMetadata({ path: "/use-cases", lang, title: meta.title, description: meta.description });
}

/* Metadati di /use-cases/album-ai nella lingua `lang`. Lo slug è lo stesso in tutte le lingue. */
export function albumMetadata(lang) {
  const { meta } = getCopy("use-case-album-ai", lang);
  return buildMetadata({
    path: `/use-cases/${ALBUM_AI_SLUG}`,
    lang,
    title: meta.title,
    description: meta.description,
  });
}
