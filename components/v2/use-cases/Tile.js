import { ICON_BODY } from "@/components/v2/wow/fx/scene/icons";

/*
  La tessera di vetro con spessore: lo stesso materiale e le stesse icone dei moduli della hero 3D
  (components/v2/wow/fx/scene/icons.js) e di .v2hp-mod nella home. Qui è fatta di CSS (.v2c-tile in use-cases.css, perché
  home.css non si carica nelle pagine dei casi). Decorativa (aria-hidden): il significato sta nel testo accanto.
  glyph  id di ICON_BODY (call, calendar, social, chat, crm, check, book, shield, spark, ads, chart, store…) o «camera»
  size   xs 32 · sm 44 · md 56 · lg 72 · xl 92 (px, --s)
  Parti: glow (alone che si accende), body (la faccia con l'icona), ring (anello d'oro dell'ultimo nodo, parte a opacità 0).
  Stato «acceso» = classe is-lit (o l'animazione dei contenitori .v2c-live).
*/
const EXTRA = {
  camera:
    '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
};

export default function Tile({ glyph, size = "md", className = "", style }) {
  const body = EXTRA[glyph] || ICON_BODY[glyph] || "";
  return (
    <span className={`v2c-tile v2c-tile--${size}${className ? ` ${className}` : ""}`} style={style} aria-hidden="true">
      <i className="v2c-tile__glow" />
      <span className="v2c-tile__body">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </span>
      <i className="v2c-tile__ring" />
    </span>
  );
}
