import "./caso.css";
import { CASO } from "./meta";
import it from "./story.it";
import en from "./story.en";
import pt from "./story.pt";

/*
  Caso studio ADifesa: pagina lunga, non il template
  condiviso dei casi. Testo, figure e stile arrivano dal secondo cervello
  (clients/adifesa/anteprima-sito-2026-09-18, `python3 build.py --sito`):
  i file story.*.js, meta.js e caso.css sono generati, si modificano alla sorgente.
  Tutto lo stile vive sotto .caso-adifesa, quindi non tocca il resto del sito.
*/
const STORIE = { it, en, pt };

export default function AdifesaStory({ locale = "en" }) {
  const m = CASO[locale];
  return (
    <div className="caso-adifesa">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(m.schema) }}
      />
      <div dangerouslySetInnerHTML={{ __html: STORIE[locale] }} />
    </div>
  );
}
