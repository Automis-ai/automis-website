import Link from "next/link";
import { nb } from "@/components/v2/ui/nb";
import ModuleTile from "./ModuleTile";

/*
  Le cinque categorie come cinque moduli di una stessa rete (al posto di CategoryGrid / CategoryCard del kit).
  - Ogni scheda è un vetro scuro con bordo sfumato di 1 px, luce interna al passaggio del mouse o al focus,
    e il suo modulo in rilievo (la piastrella sta più vicina a chi guarda: translateZ con la scheda inclinata).
  - Fra le schede passano i fili (stages/cats.js li crea misurando la griglia): pacchetti di luce che corrono da un
    modulo all'altro e accendono il bordo di chi riceve. Senza JavaScript, o con prefers-reduced-motion, restano solo le schede.
  - La scheda intera è cliccabile (il link «Scopri di più» stende il suo ::after su tutta la scheda) e si legge da tastiera.
  Testi: tutto arriva dalla pagina (items, cta). Il kit non ha testo.
*/
export default function CatNetwork({ items, cta, hrefFor }) {
  return (
    <div className="v2hp-net" data-wow-net>
      <div className="v2hp-net__wires" data-wires aria-hidden="true" />
      <ul className="v2hp-catgrid" role="list" data-wow-catgrid>
        {items.map((it) => (
          <li key={it.slug} className="v2hp-cat" data-wow-cat data-slug={it.slug}>
            <article className="v2hp-cat__card">
              <i className="v2hp-cat__lit" aria-hidden="true" />
              <ModuleTile glyph={it.slug} size="lg" className="v2hp-cat__mod" />
              <h3 className="v2hp-cat__title">{nb(it.title)}</h3>
              <p className="v2hp-cat__line">{nb(it.line)}</p>
              <Link href={hrefFor(it.slug)} className="v2hp-cat__more">
                <span className="v2hp-cat__more-t">{cta}</span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
                <span className="v2-sr">: {it.title}</span>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
