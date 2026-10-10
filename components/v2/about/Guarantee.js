import "./about.css";
import { nb } from "@/components/v2/ui/nb";

/* La garanzia: il numero grande e la frase intera. `number` e `unit` (es. «30», «giorni») dal copy. */
export default function Guarantee({ title, number, unit, line }) {
  return (
    <div className="v2-card v2a-guarantee">
      <div className="v2a-guarantee__num" aria-hidden="true">
        <span className="v2a-guarantee__n">{number}</span>
        <span className="v2a-guarantee__unit">{unit}</span>
      </div>
      <div>
        <h2 className="v2a-guarantee__title">{title}</h2>
        <p className="v2a-guarantee__line">{nb(line)}</p>
      </div>
    </div>
  );
}
