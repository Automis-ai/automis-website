import "./v2.css";
import { cx } from "./cx";

/* Griglia generica di schede: 1 colonna a 390, 2 da 640, `cols` (2, 3 o 4) da 1024. */
export default function CardGrid({ cols = 3, as: Tag = "div", className, children, ...rest }) {
  return (
    <Tag className={cx("v2-grid", `v2-grid--${cols}`, className)} {...rest}>
      {children}
    </Tag>
  );
}
