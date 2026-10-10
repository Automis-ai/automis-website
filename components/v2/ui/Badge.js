import "./v2.css";
import { cx } from "./cx";

/* Etichetta piccola. tone: "blue" (default) | "gold" | "neutral". Il testo arriva dai figli. */
export default function Badge({ children, tone = "blue", className }) {
  return <span className={cx("v2-badge", tone !== "blue" && `v2-badge--${tone}`, className)}>{children}</span>;
}
