import "@/components/v2/ui/v2.css";
import "@/components/v2/wow/fx/story.css";
import Disclosure from "@/components/v2/ui/Disclosure";
import { nb } from "@/components/v2/ui/nb";
import FxTile from "@/components/v2/wow/fx/FxTile";

// Un modulo per passo: la lente (ascolto), la chiave inglese (progetto), il grafico (risultati).
const STEP_GLYPHS = ["search", "wrench", "chart"];

/*
  I passi del metodo come una catena di moduli: tre piastrelle di vetro (lente, chiave, grafico) unite da un filo che passa dal
  loro centro, con un pacchetto di luce che le attraversa, e sotto ognuna la sua scheda. È la catena della home, qui con il
  contenuto della pagina. Con lo scroll il filo si disegna e i moduli arrivano uno dopo l'altro; da 1100 px con il mouse la sezione
  resta fissata finché la catena non è completa (fx/stages/steps.js, montata da PageStory). Senza JavaScript, con
  prefers-reduced-motion o sul tocco la catena è già tutta lì.
  `items`: [{ title, line, more, meta }]. `moreLabel`: l'etichetta del Disclosure. data-fx="own": l'entrata generale del kit la
  salta, la coreografia è quella dello stage.
*/
export default function HowSteps({ items = [], moreLabel }) {
  const last = items.length - 1;
  return (
    <div className="v2fx-steps" data-story="steps" data-fx="own">
      <ol className="v2fx-steps__list" role="list" data-steps-list>
        {items.map((s, i) => (
          <li className="v2fx-step" key={s.title} data-step>
            <div className="v2fx-step__rail" aria-hidden="true">
              {i < last ? <span className="v2fx-step__track" /> : null}
              {i < last ? <span className="v2fx-step__seg" data-seg /> : null}
              {i < last ? <i className="v2fx-step__packet" data-packet /> : null}
            </div>
            <FxTile glyph={STEP_GLYPHS[i] || "spark"} size="md" className="v2fx-step__node" data-node />
            <div className="v2-card v2fx-step__card" data-fx="tilt">
              <div className="v2fx-step__head">
                <span className="v2fx-step__n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="v2fx-step__title">
                <span className="v2-sr">{i + 1}. </span>
                {nb(s.title)}
              </h3>
              <p className="v2fx-step__line">{nb(s.line)}</p>
              {s.meta ? <p className="v2fx-step__meta">{nb(s.meta)}</p> : null}
              {s.more ? (
                <Disclosure summary={moreLabel}>
                  <p>{nb(s.more)}</p>
                </Disclosure>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
