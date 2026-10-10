import "@/components/v2/ui/v2.css";
import "./how-we-work.css";
import Disclosure from "@/components/v2/ui/Disclosure";
import { nb } from "@/components/v2/ui/nb";

/*
  I tre passi con il loro contesto. Stesse classi di <Steps> del kit (verticale a 390, in riga da 768),
  più la riga dei tempi (`meta`) e il testo che si apre a richiesta (`more`).
  `items`: [{ title, line, more, meta }]. `moreLabel`: l'etichetta del Disclosure.
*/
export default function HowSteps({ items = [], moreLabel }) {
  return (
    <ol className="v2-steps" style={{ "--v2-n": items.length }}>
      {items.map((s, i) => (
        <li className="v2-step v2h-step" key={s.title}>
          <span className="v2-step__n" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3 className="v2-step__title">{nb(s.title)}</h3>
            <p className="v2-step__line">{nb(s.line)}</p>
            {s.meta ? <p className="v2h-meta">{nb(s.meta)}</p> : null}
            {s.more ? (
              <Disclosure summary={moreLabel}>
                <p>{nb(s.more)}</p>
              </Disclosure>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
