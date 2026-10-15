/*
  Casi studio con una pagina italiana propria (nello stile di Datura e Album AI) mentre EN e PT restano sull'articolo lungo
  (components/use-cases/<caso>/Story). Solo la rotta /it/use-cases/[slug] legge questo registro: i metadati restano quelli di cases.js.
  Aggiungere un caso = una riga qui, il componente in components/use-cases/v3/ e il testo in components/v2/copy/.
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
