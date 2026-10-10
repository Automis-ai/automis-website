import "./v2.css";
import Section from "./Section";
import Button from "./Button";
import { nb } from "./nb";

/*
  Chiusura con un solo invito. Pannello blu notte con il bottone giallo: il giallo della sezione è questo.
  `button` / `secondary`: { label, href, external? }. `tone` è il fondo della fascia attorno al pannello.
*/
export default function CtaBand({ title, line, button, secondary, tone = "dark", id }) {
  return (
    <Section tone={tone} id={id} pad="sm">
      <div className="v2-cta">
        <div>
          <h2 className="v2-cta__title">{nb(title)}</h2>
          {line ? <p className="v2-cta__line">{nb(line)}</p> : null}
        </div>
        <div className="v2-cta__actions">
          {button ? (
            <Button href={button.href} external={button.external} variant="gold">
              {button.label}
            </Button>
          ) : null}
          {secondary ? (
            <Button href={secondary.href} external={secondary.external} variant="secondary">
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
