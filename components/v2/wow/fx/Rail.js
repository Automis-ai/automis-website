import "./story.css";
import "./fx.css";
import FxTile from "./FxTile";
import { nb } from "../../ui/nb";

/*
  La catena di moduli di una pagina (la coreografia sta in stages/rail.js, montata da PageStory).
  Moduli di vetro riconoscibili in fila (un'etichetta sotto ciascuno), uniti da fili con pacchetti di luce; ogni modulo si accende
  quando il pacchetto arriva. È il motivo di una pagina: «messaggio → qualifica → CRM → dashboard», «documenti → lettura →
  contabilità → back office», «chiamata → appuntamento → calendario → CRM». Mai cervelli: moduli veri, dati che corrono.

  steps     [{ glyph, label, text? }]  glyph = nome del kit (components/v2/ui/icons.js). Con `text` il passo è «ricco»: titolo + riga
            sotto il modulo (Come funziona); senza, solo l'etichetta (le pagine dei sistemi).
  result    { value, unit, src } opzionale: l'ultimo nodo, il numero vero del caso (oro, una sola volta). Compare a fine catena;
            le cifre arrivano come tessere (il valore vero è sempre nel DOM).
  cards     true: i figli sono le schede della catena, ciascuna dentro <RailCell index={k}>: la scheda k entra quando si accende il
            modulo k, e la sezione resta fissata (da 1100 px con il mouse) finché la catena non è completa. `pin={false}` toglie
            il blocco (scrub senza pin): per catene alte, dove il blocco allungherebbe la pagina.
  Il server manda lo stato finale (tutto visibile e leggibile): con JavaScript spento o con prefers-reduced-motion resta così;
  fili e pacchetti li crea lo script, solo se il movimento è consentito.
*/
export default function Rail({ steps = [], result, cards = false, pin = true, ariaLabel, className = "", children }) {
  const n = steps.length;
  const rich = steps.some((s) => s.text);
  return (
    <div
      className={`v2fx-rail${rich ? " v2fx-rail--rich" : ""}${cards ? " v2fx-rail--cards" : ""}${result ? " v2fx-rail--res" : ""} ${className}`.trim()}
      data-story="rail"
      data-fx="own"
      data-rail-pin={cards && pin ? "1" : "0"}
      style={{ "--n": n, "--cols": n + (result ? 1 : 0) }}
    >
      <ol className="v2fx-rail__list" role="list" aria-label={ariaLabel} data-rail-list>
        {steps.map((s, i) => (
          <li className="v2fx-rail__step" key={s.label} data-rail-step>
            <FxTile glyph={s.glyph || "spark"} size="md" className="v2fx-rail__node" data-node />
            <span className="v2fx-rail__label" data-rail-x>
              {rich ? <span className="v2fx-rail__n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span> : null}
              <span className="v2-sr">{i + 1}. </span>
              {nb(s.label)}
            </span>
            {s.text ? (
              <p className="v2fx-rail__text" data-rail-x>
                {nb(s.text)}
              </p>
            ) : null}
          </li>
        ))}
        {result ? (
          <li className="v2fx-rail__step v2fx-rail__step--result" data-rail-step data-rail-result>
            <div className="v2fx-rail__res" data-node>
              <i className="v2fx-rail__resglow" aria-hidden="true" />
              <span className="v2fx-rail__num" data-rail-num>
                {result.value}
              </span>
              <span className="v2fx-rail__unit">{nb(result.unit)}</span>
              {result.src ? <span className="v2fx-rail__src">{nb(result.src)}</span> : null}
            </div>
          </li>
        ) : null}
      </ol>
      <div className="v2fx-rail__wires" data-rail-wires aria-hidden="true" />
      {children}
    </div>
  );
}

/* La scheda del modulo `index` (la scheda dentro continua a inclinarsi al mouse). */
export function RailCell({ index, children }) {
  return (
    <div className="v2fx-cell" data-rail-card={index}>
      {children}
    </div>
  );
}
