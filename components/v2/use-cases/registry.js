/*
  Registro dei casi studio costruiti sul kit v2 (uno per slug). Le tre rotte [slug] (EN, IT, PT) lo leggono:
    - V2_CASE_SLUGS      gli slug da aggiungere a generateStaticParams (oltre a quelli di cases.js)
    - getV2Case(slug)    { Case, metadata(lang) } oppure undefined se lo slug è di un altro tipo di caso
  Aggiungere un caso nuovo = una riga qui, il componente e i tre file di testo.
*/
import AlbumAiCase from "@/components/v2/use-cases/AlbumAiCase";
import DaturaCase from "@/components/v2/use-cases/DaturaCase";
import { ALBUM_AI_SLUG, DATURA_SLUG } from "@/components/v2/use-cases/constants";
import { albumMetadata, daturaMetadata } from "@/components/v2/use-cases/meta";

const V2_CASES = {
  [ALBUM_AI_SLUG]: { Case: AlbumAiCase, metadata: albumMetadata },
  [DATURA_SLUG]: { Case: DaturaCase, metadata: daturaMetadata },
};

export const V2_CASE_SLUGS = Object.keys(V2_CASES);

export function getV2Case(slug) {
  return V2_CASES[slug];
}
