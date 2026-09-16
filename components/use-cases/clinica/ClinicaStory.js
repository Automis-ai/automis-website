import "./caso.css";
import { CASO } from "./meta";
import it from "./story.it";
import en from "./story.en";
import pt from "./story.pt";

/*
  Caso studio Clínica Santa Maria dos Olivais: pagina lunga, non il template
  condiviso dei casi. Testo, figure e stile arrivano dal secondo cervello
  (clients/clinica-santa-maria-olivais/anteprima-sito-2026-09-11, `python3 build.py --sito`):
  i file story.*.js, meta.js e caso.css sono generati, si modificano alla sorgente.
  Tutto lo stile vive sotto .caso-clinica, quindi non tocca il resto del sito.
*/
const STORIE = { it, en, pt };

export default function ClinicaStory({ locale = "en" }) {
  const m = CASO[locale];
  return (
    <div className="caso-clinica">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(m.schema) }}
      />
      <div dangerouslySetInnerHTML={{ __html: STORIE[locale] }} />
    </div>
  );
}
