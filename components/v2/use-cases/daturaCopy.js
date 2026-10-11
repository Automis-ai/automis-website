/* Testi del caso Datura Clothing nella lingua `lang` (en | it | pt). Accesso locale (la voce "use-case-datura"
   sta anche nel registro components/v2/copy/getCopy.js). Una lingua sconosciuta cade sull'inglese. */
import en from "@/components/v2/copy/use-case-datura.en";
import it from "@/components/v2/copy/use-case-datura.it";
import pt from "@/components/v2/copy/use-case-datura.pt";

export function getDaturaCopy(lang) {
  return lang === "it" ? it : lang === "pt" ? pt : en;
}
