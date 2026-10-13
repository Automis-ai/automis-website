import "./v2.css";
import { cx } from "./cx";

/* Cornice per un'immagine o un video (loop, screenshot). `ratio` come "16 / 10", "4 / 3", "1 / 1". */
export default function MediaFrame({ ratio = "16 / 10", className, children }) {
  return (
    <div className={cx("v2-media", className)} style={{ "--v2-ratio": ratio }}>
      {children}
    </div>
  );
}
