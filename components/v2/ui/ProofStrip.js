import "./v2.css";
import { cx } from "./cx";
import Logo from "./Logo";
import { nb } from "./nb";

/*
  Riga di prova: i clienti (logo o solo nome) e UN numero con la sua etichetta.
  `clients`: [{ name, logo?: { src, alt?, width?, height? } }]   `caption`: riga sopra i clienti (opzionale).
  Va dentro una <Section pad="sm">.
*/
export default function ProofStrip({ caption, clients = [], number, numberLabel, className }) {
  return (
    <div className={cx("v2-proof", className)}>
      <div>
        {caption ? <p className="v2-proof__caption">{caption}</p> : null}
        <ul className="v2-proof__list">
          {clients.map((c) => (
            <li key={c.name}>{c.logo ? <Logo logo={c.logo} name={c.name} /> : <span className="v2-proof__name">{c.name}</span>}</li>
          ))}
        </ul>
      </div>
      {number ? (
        <div className="v2-proof__stat">
          <p className="v2-proof__fig">{number}</p>
          {numberLabel ? <p className="v2-proof__figlabel">{nb(numberLabel)}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
