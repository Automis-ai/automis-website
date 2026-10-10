import "../ui/v2.css";
import "./ecommerce.css";
import Icon from "../ui/icons";

/*
  Elemento visivo dell'apertura: una notte nel negozio, quattro righe fisse. È un esempio illustrativo
  (lo dice la didascalia): nessun dato, nessun numero, nessuna IA dal vivo. Tutto il testo arriva dalle props.
  rows: [{ icon, area, text, state, tone: "done" | "wait" }]
*/
export default function NightReport({ title, caption, rows = [], ariaLabel }) {
  return (
    <figure className="v2e-report" aria-label={ariaLabel || title}>
      <figcaption className="v2e-report__head">
        <span className="v2e-report__dot" aria-hidden="true" />
        {title}
      </figcaption>
      <ul className="v2e-report__list">
        {rows.map((r) => (
          <li key={r.area} className="v2e-row">
            <span className="v2e-row__icon">
              <Icon name={r.icon} size={20} />
            </span>
            <span>
              <span className="v2e-row__area">{r.area}</span>
              {r.text ? <span className="v2e-row__text">{r.text}</span> : null}
            </span>
            <span className={`v2e-chip${r.tone === "wait" ? " v2e-chip--wait" : ""}`}>
              <Icon name={r.tone === "wait" ? "clock" : "check"} size={14} strokeWidth={2.2} />
              {r.state}
            </span>
          </li>
        ))}
      </ul>
      {caption ? <p className="v2e-report__note">{caption}</p> : null}
    </figure>
  );
}
