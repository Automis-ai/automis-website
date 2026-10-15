import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CtaBand from "@/components/v2/ui/CtaBand";
import MoreCases from "@/components/v2/use-cases/MoreCases";
import { InView, CountUp } from "@/components/v2/use-cases/fx";
import { addLangPrefix } from "@/lib/locales";
import it from "@/components/v2/copy/use-case-adifesa.it";
import { CASO } from "@/components/use-cases/adifesa/meta";
import { Bars, Card, Detail, Faq, LinkRow, Fixes, KeyValue, Plain, Quote, Scene, Shot, Split, Stats, Steps } from "./CasoKit";
import "@/components/v2/use-cases/use-cases.css";

/*
  Caso ADifesa (IT), nello stile di Datura e Album AI: hero v3, corpo blu, una scena per ogni passaggio.
  Testi: components/v2/copy/use-case-adifesa.it.js. Metadati e JSON-LD (con le FAQ) sono quelli dell'articolo lungo
  (components/use-cases/adifesa/meta.js), che resta la pagina per EN e PT.
  Le tre schermate sono quelle vere della casella di ADifesa, con nomi, foto e contatti distrutti nei pixel.
*/

/* Dalle parole di chi scrive al prodotto che decide se la pratica esiste. */
function Pairs({ w }) {
  return (
    <InView className="dsv3-glass cv3-pairs">
      <h3 className="font-display">{w.title}</h3>
      <p className="cv3-kv__lead">{w.lead}</p>
      <ul>
        {w.pairs.map(([say, prod], i) => (
          <li key={prod} style={{ "--i": i }}>
            <q>{say}</q>
            <span className="cv3-pairs__arrow" aria-hidden="true">
              →
            </span>
            <b className="font-display">{prod}</b>
          </li>
        ))}
      </ul>
    </InView>
  );
}

/* Dal commento alla scheda completa: quattro passi che si restringono. L'ultimo è un dato dell'associazione. */
function Funnel({ items, note }) {
  return (
    <InView className="cv3-funnel-wrap">
      <ol className="cv3-funnel">
        {items.map((it, i) => (
          <li key={it.label} className={`dsv3-glass${i === items.length - 1 ? " is-ext" : ""}`} style={{ "--i": i }}>
            <b className="font-display">
              <CountUp text={it.figure} delay={i * 140} />
            </b>
            <p>{it.label}</p>
            {it.note ? <small>{it.note}</small> : null}
          </li>
        ))}
      </ol>
      <p className="dsv3-note">{note}</p>
    </InView>
  );
}

/* Dal commento alla scheda: quattro passi che compaiono uno dopo l'altro, poi la schermata vera della conversazione. */
function FlowScene({ f, shot }) {
  return (
    <InView className="cv3-flow">
      <ol className="cv3-flow__steps" aria-label={f.label}>
        {f.steps.map((st, i) => (
          <li key={st.title} className="dsv3-glass cv3-seq" style={{ "--k": i }}>
            <span className="dsv3-n">{st.n}</span>
            <h3 className="font-display">{st.title}</h3>
            <p>{st.line}</p>
          </li>
        ))}
      </ol>
      <div className="cv3-flow__shot cv3-seq" style={{ "--k": f.steps.length }}>
        <Shot shot={shot} />
      </div>
    </InView>
  );
}

function Head({ s, lead = true }) {
  return <SectionHeader align="center" eyebrow={s.eyebrow} title={s.title} lead={lead ? s.lead : undefined} className="v2c-scenehead cv3-head" />;
}

export default function AdifesaCaseV3({ locale = "it" }) {
  const t = it;
  const m = CASO.it;
  const book = { label: "Prenota una call", href: `${addLangPrefix("/", locale)}#book` };
  const hoursSplit = {
    title: "1.377 messaggi privati fuori orario",
    parts: t.hours.parts.map((p) => ({ value: p.value, label: p.label, line: p.line })),
  };
  return (
    <AutomisEnShell>
      <main id="main">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(m.schema) }} />
        <PageHeroV3
          className="v2c-hero cv3-hero cv3-hero--dark-logo"
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          highlight={t.hero.highlight}
          lead={t.hero.lead}
          cta={{ label: "Leggi il caso", href: "#partenza" }}
          eyebrowLogo={{ src: t.hero.logo, alt: t.hero.client }}
        />
        <div className="v2-caso">
          {/* ---------- 1 · Il punto di partenza ---------- */}
          <Section fx={false} tone="light" className="v2c-edge" id="partenza">
            <Head s={t.start} />
            <Scene>
              <Plain items={t.start.cards} />
              <Quote title={t.start.who.title} line={t.start.who.line} />
            </Scene>
          </Section>

          {/* ---------- 2 · Dal commento alla scheda ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="percorso">
            <Head s={t.flow} />
            <Scene>
              <FlowScene f={t.flow} shot={t.start.shot} />
            </Scene>
          </Section>

          {/* ---------- 3 · Le regole ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="regole">
            <Head s={t.rules} />
            <Scene>
              <Stats items={t.rules.stats} cols={3} />
              <div className="cv3-pair cv3-gap">
                <KeyValue title={t.rules.list.title} lead={t.rules.list.lead} rows={t.rules.list.rows} />
                <Pairs w={t.rules.words} />
              </div>
            </Scene>
          </Section>

          {/* ---------- In numeri ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="numeri">
            <Head s={t.numbers} />
            <Scene>
              <Funnel items={t.numbers.funnel} note={t.numbers.funnelNote} />
              <p className="dsv3-note cv3-focus">{t.numbers.focus}</p>
              <Bars chart={t.numbers.chart} className="cv3-gap" />
              <div className="cv3-pair cv3-gap">
                <KeyValue rows={t.numbers.rows} />
                <Split split={t.numbers.origin} />
              </div>
            </Scene>
          </Section>

          {/* ---------- 4 · Fuori orario ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="fuori-orario">
            <Head s={t.hours} />
            <Scene>
              <div className="cv3-pair">
                <Card figure={t.hours.figure} figureLabel={t.hours.figureLabel} className="cv3-card--fig" />
                <Split split={hoursSplit} />
              </div>
              <p className="cv3-night">
                <b className="font-display">{t.hours.night.value}</b> {t.hours.night.label}
              </p>
              <p className="dsv3-note">{t.hours.line}</p>
            </Scene>
          </Section>

          {/* ---------- 5 · La persona ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="persona">
            <Head s={t.handoff} />
            <Scene>
              <div className="cv3-pair cv3-pair--center">
                <Card figure={t.handoff.figure} figureLabel={t.handoff.figureLabel} className="cv3-card--fig" />
                <Shot shot={t.handoff.shot} />
              </div>
              <Plain items={[{ tag: t.handoff.control.tag, title: t.handoff.control.title, line: t.handoff.control.line }, { tag: t.handoff.fee.tag, title: t.handoff.fee.title, line: t.handoff.fee.line }]} />
            </Scene>
          </Section>

          {/* ---------- 6 · Gli errori ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="errori">
            <Head s={t.mistakes} />
            <Scene>
              <Fixes items={t.mistakes.items} tags={t.mistakes.tags} />
            </Scene>
          </Section>

          {/* ---------- 7 · I clienti ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="clienti">
            <Head s={t.clients} />
            <Scene>
              <Card figure={t.clients.figure} figureLabel={t.clients.figureLabel} line={t.clients.line} className="cv3-card--fig cv3-card--wide" />
              <Plain items={[{ tag: t.clients.limits.tag, line: t.clients.limits.lines[0] }, { line: t.clients.limits.lines[1] }]} />
            </Scene>
          </Section>

          {/* ---------- Nel dettaglio ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="dettaglio">
            <Head s={t.detail} />
            <Scene>
              <Detail
                items={[
                  {
                    id: "privacy",
                    tag: t.privacy.eyebrow,
                    summary: t.privacy.title,
                    children: (
                      <>
                        <p className="cv3-lead">{t.privacy.lead}</p>
                        <Steps items={t.privacy.steps} />
                        <p className="dsv3-note">{t.privacy.note}</p>
                        <Card figure={t.privacy.wait.figure} title={t.privacy.wait.title} line={t.privacy.wait.line} className="cv3-card--fig cv3-card--wide cv3-gap" />
                      </>
                    ),
                  },
                  {
                    id: "instagram",
                    tag: t.instagram.eyebrow,
                    summary: t.instagram.title,
                    children: (
                      <>
                        <p className="cv3-lead">{t.instagram.lead}</p>
                        <div className="cv3-pair">
                          <div className="cv3-stack">
                            <Steps items={t.instagram.steps} className="cv3-steps--two cv3-steps--stack" />
                            <Card tag={t.instagram.odd.tag} line={t.instagram.odd.line} />
                          </div>
                          <Bars chart={t.instagram.chart} className="cv3-chart--solid" />
                        </div>
                        <Shot shot={t.instagram.shot} className="cv3-gap cv3-shot--center" />
                      </>
                    ),
                  },
                  {
                    id: "costo",
                    tag: t.cost.eyebrow,
                    summary: t.cost.title,
                    children: (
                      <>
                        <p className="cv3-lead">{t.cost.lead}</p>
                        <div className="cv3-pair">
                          <Card figure={t.cost.problem.figure} figureLabel={t.cost.problem.label} line={t.cost.problem.line} className="cv3-card--fig cv3-card--alert" />
                          <Card tag={t.cost.fix.tag} title={t.cost.fix.title} line={t.cost.fix.line} />
                        </div>
                        <Stats items={t.cost.stats} cols={2} />
                        <Card tag={t.cost.safe.tag} lines={[t.cost.safe.line, t.cost.safe.test]} className="cv3-card--wide cv3-gap" />
                      </>
                    ),
                  },
                ]}
              />
            </Scene>
          </Section>

          {/* ---------- Domande frequenti ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="domande">
            <Head s={t.faq} lead={false} />
            <Scene>
              <Faq items={t.faq.items} />
              <LinkRow more={{ ...t.cta.more, href: addLangPrefix(t.cta.more.href, locale) }} />
            </Scene>
          </Section>

          <div className="v2c-cta">
            <CtaBand blue title={t.cta.title} line={t.cta.line} button={book} />
          </div>
          <div className="v2c-more-wrap">
            <MoreCases href={addLangPrefix("/use-cases", locale)} />
          </div>
        </div>
      </main>
    </AutomisEnShell>
  );
}
