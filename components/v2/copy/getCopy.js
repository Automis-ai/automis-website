/* Punto unico di accesso ai testi del sito v2.
   getCopy("home", "it") restituisce l'oggetto del file home.it.js.
   I tre file per pagina (<pagina>.en.js, <pagina>.it.js, <pagina>.pt.js) hanno le STESSE chiavi,
   definite in scratchpad/sito-v2/copy/intenti.md. Una lingua sconosciuta cade sull'inglese,
   come il resto del sito (en senza prefisso).
   "common" non è una pagina: sono i nomi fissi (menu, categorie, prodotti, badge, calendario). */

import commonEn from "./common.en.js";
import commonIt from "./common.it.js";
import commonPt from "./common.pt.js";
import homeEn from "./home.en.js";
import homeIt from "./home.it.js";
import homePt from "./home.pt.js";
import systemsEn from "./systems.en.js";
import systemsIt from "./systems.it.js";
import systemsPt from "./systems.pt.js";
import howEn from "./how-we-work.en.js";
import howIt from "./how-we-work.it.js";
import howPt from "./how-we-work.pt.js";
import trainingEn from "./training.en.js";
import trainingIt from "./training.it.js";
import trainingPt from "./training.pt.js";
import useCasesEn from "./use-cases.en.js";
import useCasesIt from "./use-cases.it.js";
import useCasesPt from "./use-cases.pt.js";
import albumEn from "./use-case-album-ai.en.js";
import albumIt from "./use-case-album-ai.it.js";
import albumPt from "./use-case-album-ai.pt.js";
import aboutEn from "./about.en.js";
import aboutIt from "./about.it.js";
import aboutPt from "./about.pt.js";
import contactEn from "./contact.en.js";
import contactIt from "./contact.it.js";
import contactPt from "./contact.pt.js";
import ecommerceEn from "./ecommerce.en.js";
import ecommerceIt from "./ecommerce.it.js";
import ecommercePt from "./ecommerce.pt.js";

const TABLE = {
  common: { en: commonEn, it: commonIt, pt: commonPt },
  home: { en: homeEn, it: homeIt, pt: homePt },
  systems: { en: systemsEn, it: systemsIt, pt: systemsPt },
  "how-we-work": { en: howEn, it: howIt, pt: howPt },
  training: { en: trainingEn, it: trainingIt, pt: trainingPt },
  "use-cases": { en: useCasesEn, it: useCasesIt, pt: useCasesPt },
  "use-case-album-ai": { en: albumEn, it: albumIt, pt: albumPt },
  about: { en: aboutEn, it: aboutIt, pt: aboutPt },
  contact: { en: contactEn, it: contactIt, pt: contactPt },
  ecommerce: { en: ecommerceEn, it: ecommerceIt, pt: ecommercePt },
};

/** Le pagine che hanno testi: "common" più le nove pagine del sito v2. */
export const COPY_PAGES = Object.keys(TABLE);

/** getCopy("home", "it") -> oggetto dei testi. lang: "en" | "it" | "pt" (altro: "en"). */
export function getCopy(page, lang) {
  const entry = TABLE[page];
  if (!entry) {
    throw new Error(`getCopy: pagina sconosciuta "${page}". Pagine: ${COPY_PAGES.join(", ")}`);
  }
  return entry[lang === "it" || lang === "pt" ? lang : "en"];
}
