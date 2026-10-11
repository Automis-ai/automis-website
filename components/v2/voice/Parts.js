import "./voice.css";
import Icon from "@/components/v2/ui/icons";
import Disclosure from "@/components/v2/ui/Disclosure";
import Button from "@/components/v2/ui/Button";
import { nb } from "@/components/v2/ui/nb";
import FxTile from "@/components/v2/wow/fx/FxTile";
import Live from "@/components/v2/wow/fx/Live";

/* ---------- «Un sistema, due agenti»: due moduli grandi uniti da un filo su cui i pacchetti corrono nei due versi ----------
   L'agente che risponde (inbound) e quello che chiama (outbound) sono moduli dello stesso sistema: un contatto perso diventa una
   chiamata in uscita, una chiamata in uscita che trova segreteria torna in entrata. Il filo con i pacchetti è solo CSS (transform e
   opacità), gira solo mentre il blocco si vede (Live). Le sei voci di ogni agente sono righe corte; tutto il dettaglio (cosa fa e che
   risultato dà, parola per parola quello della pagina precedente) si apre a richiesta. */
function Agent({ side, data, glyph, ui, end }) {
  return (
    <article className={`v2-card v2vo-agent v2vo-agent--${side}`} data-fx="tilt">
      <header className="v2vo-agent__head">
        <FxTile glyph={glyph} size="md" className={`v2vo-agent__tile${end ? " is-end" : ""}`} />
        <div>
          <p className="v2vo-agent__eyebrow">{data.eyebrow}</p>
          <h3 className="v2vo-agent__title">{nb(data.title)}</h3>
        </div>
      </header>
      <p className="v2vo-agent__intro">{nb(data.intro)}</p>
      <ul className="v2vo-agent__list" role="list">
        {data.items.map((it) => (
          <li key={it.title}>
            <Icon name="check" size={16} strokeWidth={2.4} />
            <span>{nb(it.title)}</span>
          </li>
        ))}
      </ul>
      <Disclosure summary={ui.detailLabel}>
        <dl className="v2vo-agent__dl">
          {data.items.map((it) => (
            <div key={it.title}>
              <dt>{nb(it.title)}</dt>
              <dd>{nb(it.what)}</dd>
              <dd className="v2vo-agent__out">{nb(it.outcome)}</dd>
            </div>
          ))}
        </dl>
      </Disclosure>
    </article>
  );
}

export function Agents({ modes, ui }) {
  return (
    <Live className="v2vo-duo" data-fx="stagger">
      <Agent side="in" data={modes.inbound} glyph="phone" ui={ui} />
      <div className="v2vo-link" aria-hidden="true">
        <i className="v2vo-link__wire" />
        <b className="v2vo-link__pkt v2vo-link__pkt--a" />
        <b className="v2vo-link__pkt v2vo-link__pkt--b" />
        <i className="v2vo-link__port v2vo-link__port--a" />
        <i className="v2vo-link__port v2vo-link__port--b" />
      </div>
      <Agent side="out" data={modes.outbound} glyph="bolt" ui={ui} end />
    </Live>
  );
}

/* ---------- Una finestra con una schermata della dashboard (vetro, bordo che si schiarisce, inclinazione 3D al mouse) ---------- */
export function Win({ shot, alt, tilt = true, className = "", loading = "lazy" }) {
  return (
    <div className={`v2-card v2vo-win ${className}`.trim()} data-fx={tilt ? "tilt" : undefined}>
      <div className="v2vo-win__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>app.automis.ai/dashboard</span>
      </div>
      <img className="v2vo-win__img" src={shot.src} alt={alt} width={shot.w} height={shot.h} loading={loading} decoding="async" />
    </div>
  );
}

/* ---------- I piani (prezzi: solo qui, come dice la §3 del brief per la Voice) ---------- */
export function Plans({ p, booking }) {
  return (
    <>
      <div className="v2vo-plans" data-fx="stagger">
        {p.tiers.map((tier) => (
          <article key={tier.name} className={`v2-card v2vo-plan${tier.featured ? " v2vo-plan--feat" : ""}`} data-fx="tilt">
            {tier.featured ? <span className="v2vo-plan__flag">{p.mostPopular}</span> : null}
            <p className="v2vo-plan__name">{tier.name}</p>
            <p className="v2vo-plan__price">
              <span className="v2vo-plan__amt">{tier.price}</span>
              <span className="v2vo-plan__per">{tier.period}</span>
            </p>
            <p className="v2vo-plan__tag">{nb(tier.tagline)}</p>
            <ul className="v2vo-plan__list" role="list">
              {tier.features.map((f) => (
                <li key={f}>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  <span>{nb(f)}</span>
                </li>
              ))}
            </ul>
            <div className="v2vo-plan__cta">
              <Button href={booking} variant={tier.featured ? "primary" : "secondary"} external>
                {p.bookCta}
              </Button>
            </div>
          </article>
        ))}
      </div>
      <div className="v2vo-aside">
      <div className="v2vo-ent">
        <div>
          <p className="v2vo-ent__label">{p.enterprise.label}</p>
          <h3 className="v2vo-ent__head">{nb(p.enterprise.heading)}</h3>
          <p className="v2vo-ent__body">{nb(p.enterprise.body)}</p>
        </div>
        <Button href={booking} variant="secondary" external arrow>
          {p.enterprise.cta}
        </Button>
      </div>
      <div className="v2vo-guar">
        <span className="v2vo-guar__tile" aria-hidden="true">
          <Icon name="shield" size={22} strokeWidth={1.9} />
        </span>
        <div>
          <h3 className="v2vo-guar__title">{nb(p.guarantee.title)}</h3>
          <p className="v2vo-guar__body">{nb(p.guarantee.body)}</p>
        </div>
      </div>
      </div>
    </>
  );
}

/* ---------- La chiusura: la catena chiamata → appuntamento → calendario → CRM e il pacchetto che arriva sul pulsante ----------
   Quattro moduli riconoscibili e il pulsante «Prenota una call» come quinto nodo (l'oro è suo, una volta). Ogni ~5 s un pacchetto
   percorre i fili uno dopo l'altro, ogni modulo si accende quando arriva e, in fondo, il pacchetto entra nel pulsante, che
   scatta (anello d'oro). Solo CSS: transform e opacità; fermo fuori schermo, fermo con prefers-reduced-motion (resta il disegno).
   Il pannello è un .v2-cta: il filo della pagina (spine) ci arriva e lo accende. */
const CHAIN_GLYPHS = ["phone", "check", "calendar", "contact"];

export function Close({ title, labels, chainLabel, cta, href }) {
  return (
    <div className="v2-cta v2vo-close">
      <h2 className="v2-cta__title v2vo-close__title">{nb(title)}</h2>
      <Live className="v2vo-chain" role="group" aria-label={chainLabel}>
        <ol className="v2vo-chain__row" role="list">
          {labels.map((label, i) => (
            <li className="v2vo-chain__item" key={label} style={{ "--k": i }}>
              <span className="v2vo-chain__node">
                <FxTile glyph={CHAIN_GLYPHS[i]} size="md" />
                <i className="v2vo-chain__ping" aria-hidden="true" />
              </span>
              <span className="v2vo-chain__label">{label}</span>
              <span className="v2vo-chain__wire" aria-hidden="true">
                <b />
              </span>
            </li>
          ))}
        </ol>
        <div className="v2vo-chain__end">
          <span className="v2vo-chain__drop" aria-hidden="true">
            <b />
          </span>
          <span className="v2vo-chain__btn">
            <i className="v2vo-chain__halo" aria-hidden="true" />
            <Button href={href} variant="gold" magnetic>
              {cta}
            </Button>
          </span>
        </div>
      </Live>
    </div>
  );
}
