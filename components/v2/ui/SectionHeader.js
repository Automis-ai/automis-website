import "./v2.css";
import { cx } from "./cx";
import { nb } from "./nb";

/* Intestazione di sezione: sopratitolo, titolo, una riga di apertura. */
export default function SectionHeader({ eyebrow, title, lead, align = "start", as: Tag = "h2", id, className }) {
  return (
    <div className={cx("v2-head", align === "center" && "v2-head--center", className)} data-fx="own">
      {eyebrow ? (
        <p className="v2-eyebrow" data-fx="rise">
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className="v2-title" data-fx="split">
        {nb(title)}
      </Tag>
      {lead ? (
        <p className="v2-lead" data-fx="rise">
          {nb(lead)}
        </p>
      ) : null}
    </div>
  );
}
