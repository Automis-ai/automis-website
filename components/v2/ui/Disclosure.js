import "./v2.css";
import { cx } from "./cx";
import Icon from "./icons";

/* Testo in più che si apre a richiesta (<details>, nessun JavaScript). `summary` è l'etichetta che si clicca. */
export default function Disclosure({ summary, children, open = false, className }) {
  return (
    <details className={cx("v2-disc", className)} {...(open ? { open: true } : {})}>
      <summary className="v2-disc__sum">
        <span>{summary}</span>
        <Icon name="chevron" size={18} strokeWidth={2.2} />
      </summary>
      <div className="v2-disc__body">{children}</div>
    </details>
  );
}
