import "./v2.css";
import { cx } from "./cx";

/*
  Parola di enfasi dentro un titolo. Giallo caldo, UNA volta per sezione.
  Su fondo scuro è testo giallo; su fondo chiaro è un evidenziatore giallo dietro il testo scuro.
  tone="blue": enfasi in azzurro, senza giallo.
*/
export default function Accent({ children, tone, className }) {
  return <mark className={cx("v2-accent", tone === "blue" && "v2-accent--blue", className)}>{children}</mark>;
}
