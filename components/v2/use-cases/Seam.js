import Tile from "@/components/v2/use-cases/Tile";
import { LiveStage } from "@/components/v2/use-cases/fx";

/*
  Il filo che scende dalla hero nel corpo della pagina. Una fila di tessere di vetro (le stesse della hero 3D) sporge nella
  sfumatura che porta dal blu notte al chiaro, collegate da un filo: un pacchetto di dati le attraversa da sinistra a destra,
  ogni tessera si accende al suo arrivo e sull'ultima compare l'anello d'oro (oro solo sull'ultimo nodo). Ogni 6 secondi.
  Decorativa: aria-hidden, non prende il puntatore. Sta fra la hero e la prima fascia chiara (altezza zero, i figli sporgono),
  e per questo non cade mai sul testo: la fascia sotto ha il padding alto che la lascia libera (.v2c-edge in use-cases.css).
  `exit`: la stessa fila in uscita, nella sfumatura chiaro → blu notte sopra la chiusura (.v2c-cta): la catena arriva all'invito.
  Su fondo chiaro l'alone è più discreto e il filo più scuro (.v2c-seam--exit).
  Movimento: solo transform e opacity, in pausa fuori schermo e a scheda nascosta (LiveStage); fermo con prefers-reduced-motion.
*/
export default function Seam({ glyphs, exit = false }) {
  return (
    <div className={`v2c-seam${exit ? " v2c-seam--exit" : ""}`} aria-hidden="true" data-fx="skip">
      <LiveStage max={0} className="v2c-seam__row" style={{ "--n": glyphs.length }}>
        <span className="v2c-seam__wire" />
        {glyphs.map((g, i) => (
          <span key={`${g}-${i}`} className="v2c-seam__slot" style={{ "--k": i, "--ry": `${((i - (glyphs.length - 1) / 2) * -9).toFixed(1)}deg` }}>
            <Tile glyph={g} size="lg" className={i === glyphs.length - 1 ? "v2c-tile--last" : undefined} />
          </span>
        ))}
        {[0, 1, 2].map((b) => (
          <i key={b} className="v2c-seam__pkt" style={{ "--b": b }} />
        ))}
      </LiveStage>
    </div>
  );
}
