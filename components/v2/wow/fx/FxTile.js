import "./story.css";
import Icon from "../../ui/icons";

/*
  Il «modulo»: una piastrella di vetro con spessore, la stessa famiglia di quelle che si accendono nella hero 3D e nella
  home (là è components/v2/home/ModuleTile; qui una copia con prefisso v2fx-, perché le pagine interne non caricano home.css).
  Parti, tutte decorative (aria-hidden): glow (alone), body (la faccia con l'icona), ring (anello dell'attivazione: parte
  a opacità 0). `glyph` è un nome del kit (components/v2/ui/icons.js). `size`: sm 40 · md 56 · lg 72 · xl 92 (px, --s).
  Lo stato «acceso» è la classe is-on sul contenitore o sulla piastrella. Server component: nessun hook.
*/
export default function FxTile({ glyph = "spark", size = "md", className = "", ...rest }) {
  return (
    <span className={`v2fx-mod v2fx-mod--${size} ${className}`.trim()} data-mod {...rest}>
      <i className="v2fx-mod__glow" aria-hidden="true" />
      <span className="v2fx-mod__body" aria-hidden="true">
        <Icon name={glyph} size={32} strokeWidth={1.7} />
      </span>
      <i className="v2fx-mod__ring" aria-hidden="true" />
    </span>
  );
}
