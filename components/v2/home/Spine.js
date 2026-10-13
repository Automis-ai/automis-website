import ModuleTile from "./ModuleTile";

/*
  Il filo della pagina («spine»): una linea-segnale al margine sinistro che racconta la home sotto la hero.
  Un pacchetto di luce scende con lo scroll e accende un nodo per sezione (e, su telefono, uno per ogni passo e per
  ogni caso): categorie -> come lavoriamo -> casi -> finder -> founder -> bottone finale. In fondo il filo gira
  l'angolo ed entra nel bottone della call, che è il nodo centrale della rete.

  Qui c'è solo l'involucro: nodi in numero fisso (il pool), nessun testo. Posizioni, accensioni e pacchetti li fa
  stages/spine.js, che misura la pagina. Decorativo (aria-hidden); senza JavaScript o con prefers-reduced-motion
  resta nascosto (v2hp-spine è invisibile finché non lo prepara lo script).
*/
const GLYPH_ORDER = ["phone", "calendar", "invoice", "client", "chat", "ads", "social", "calendar", "phone", "invoice", "client", "chat"];

export default function Spine() {
  return (
    <div className="v2hp-spine" data-wow="spine" aria-hidden="true">
      <i className="v2hp-spine__track" data-s-track />
      <i className="v2hp-spine__fill" data-s-fill />
      <i className="v2hp-spine__feed" data-s-feed />
      <i className="v2hp-spine__feedfill" data-s-feedfill />
      <span className="v2hp-spine__run" data-s-run />
      {GLYPH_ORDER.map((g, i) => (
        <span className="v2hp-spine__node" data-s-node key={i}>
          <ModuleTile glyph={g} size="sm" />
        </span>
      ))}
      <span className="v2hp-spine__pkt" data-s-pkt>
        <b className="v2hp-spine__trail" data-s-trail />
        <b className="v2hp-spine__head" />
      </span>
      <b className="v2hp-spine__head v2hp-spine__feedhead" data-s-feedhead />
    </div>
  );
}
