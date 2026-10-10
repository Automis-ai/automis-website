import "./v2.css";
import { cx } from "./cx";
import { nb } from "./nb";

/* 3-4 passi numerati. Verticale a 390, in riga da 768. `items`: [{ title, line }]. */
export default function Steps({ items = [], className }) {
  return (
    <ol className={cx("v2-steps", className)} style={{ "--v2-n": items.length }}>
      {items.map((s, i) => (
        <li className="v2-step" key={s.title}>
          <span className="v2-step__n" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3 className="v2-step__title">{nb(s.title)}</h3>
            {s.line ? <p className="v2-step__line">{nb(s.line)}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
