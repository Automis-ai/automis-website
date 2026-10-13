import "@/components/v2/ui/v2.css";
import "./systems.css";
import { renderIcon } from "@/components/v2/ui/icons";

/*
  Elemento visivo dell'apertura di hub e categorie: un'icona grande al centro e, in cerchio, le icone dei
  sistemi della categoria. È solo decorazione (aria-hidden): il testo accanto dice già tutto. Niente
  immagini, niente animazione, nessuna richiesta di rete.
  `icon`: nome dell'icona centrale. `items`: nomi delle icone attorno (da 3 a 6).
*/
export default function CategoryArt({ icon, items = [] }) {
  const sats = items.slice(0, 6);
  return (
    <div className="v2sx-art" aria-hidden="true" style={{ "--n": sats.length }}>
      <span className="v2sx-art__ring" />
      <span className="v2sx-art__core">{renderIcon(icon, 40)}</span>
      {sats.map((name, i) => (
        <span className="v2sx-art__sat" key={`${name}-${i}`} style={{ "--i": i }}>
          {renderIcon(name, 20)}
        </span>
      ))}
    </div>
  );
}
