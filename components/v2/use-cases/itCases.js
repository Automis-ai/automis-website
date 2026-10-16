/*
  Casi studio con pagina propria nello stile di Datura e Album AI, in italiano, inglese e portoghese (prop `locale`).
  Le tre rotte /[lingua]/use-cases/[slug] leggono questo registro; i metadati restano quelli di cases.js / longform.js.
  L'articolo lungo (components/use-cases/<caso>/Story) resta nel repo ma non è più montato.
  Aggiungere un caso = una riga qui, il componente in components/use-cases/v3/ e i tre testi in components/v2/copy/.
*/
import ClinicaCaseV3 from "@/components/use-cases/v3/ClinicaCaseV3";
import AdifesaCaseV3 from "@/components/use-cases/v3/AdifesaCaseV3";

const IT_CASES = {
  "clinica-santa-maria": ClinicaCaseV3,
  adifesa: AdifesaCaseV3,
};

export function getItCase(slug) {
  return IT_CASES[slug];
}
