import "./v2.css";
import { cx } from "./cx";

const WIDTHS = { narrow: "v2-wrap--narrow", default: "", wide: "v2-wrap--wide" };
const PADS = { md: "", sm: "v2-section--sm", lg: "v2-section--lg", none: "v2-section--flush" };

/*
  Fascia di pagina. Decide il tono (colori di tutto ciò che contiene) e il contenitore.
  tone: "dark" | "light" | "deep"   width: "narrow" | "default" | "wide"   pad: "sm" | "md" | "lg" | "none"
*/
export default function Section({
  tone = "dark",
  id,
  as: Tag = "section",
  width = "default",
  pad = "md",
  className,
  children,
  ...rest
}) {
  return (
    <Tag id={id} className={cx("v2-section", `v2-tone-${tone}`, PADS[pad], className)} {...rest}>
      <div className={cx("v2-wrap", WIDTHS[width])}>{children}</div>
    </Tag>
  );
}
