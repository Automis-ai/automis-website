import { Children } from "react";
import "./v2.css";
import { cx } from "./cx";

/*
  Griglia di CategoryCard. 1 colonna a 390, 2 da 640, a 1024+ tre per riga:
  con 5 schede diventa 3 + 2 a tutta larghezza, senza buchi.
  `fx`: l'entrata delle schede (default "stagger"); "own" quando la griglia si gestisce da sola (la rete di schede, fx/NetGrid).
*/
export default function CategoryGrid({ className, fx = "stagger", children }) {
  const count = Children.toArray(children).length;
  return (
    <div className={cx("v2-catgrid", className)} data-count={count} data-fx={fx}>
      {children}
    </div>
  );
}
