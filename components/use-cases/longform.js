/*
  Registro dei casi studio con pagina scritta per intero (`longForm: true` in cases.js).
  Ogni caso porta il suo componente e il suo meta (title, description, immagine social,
  schema), generati dal secondo cervello: non si modificano a mano.
*/
import ClinicaStory from "./clinica/ClinicaStory";
import { CASO as CASO_CLINICA } from "./clinica/meta";
import AdifesaStory from "./adifesa/AdifesaStory";
import { CASO as CASO_ADIFESA } from "./adifesa/meta";

const LONGFORM = {
  "clinica-santa-maria": { Story: ClinicaStory, caso: CASO_CLINICA },
  adifesa: { Story: AdifesaStory, caso: CASO_ADIFESA },
};

export function storiaLongForm(slug) {
  return LONGFORM[slug]?.Story || null;
}

export function metaLongForm(slug, locale) {
  return LONGFORM[slug]?.caso[locale] || null;
}
