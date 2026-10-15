import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CtaBand from "@/components/v2/ui/CtaBand";
import MoreCases from "@/components/v2/use-cases/MoreCases";
import { InView } from "@/components/v2/use-cases/fx";
import { addLangPrefix } from "@/lib/locales";
import it from "@/components/v2/copy/use-case-clinica.it";
import { CASO } from "@/components/use-cases/clinica/meta";
import { Bars, Card, Chips, Detail, Faq, LinkRow, Fixes, BarRows, Plain, Quote, Scene, Split, Stats, Steps, Strip } from "./CasoKit";
import "@/components/v2/use-cases/use-cases.css";

/*
  Caso Clínica Santa Maria dos Olivais (IT), nello stile di Datura e Album AI: hero v3, corpo blu, una scena per ogni passaggio.
  Testi: components/v2/copy/use-case-clinica.it.js. Metadati e JSON-LD (con le FAQ) sono quelli dell'articolo lungo
  (components/use-cases/clinica/meta.js), che resta la pagina per EN e PT.
*/

/* Settimana tipo: un pallino acceso nei giorni in cui il trattamento c'è. */
function Week({ week }) {
  return (
    <InView className="dsv3-glass cv3-week">
      <span className="dsv3-lab">{week.title}</span>
      <div className="cv3-week__grid" role="img" aria-label={week.ariaLabel}>
        <span />
        {week.days.map((d) => (
          <span key={d} className="cv3-week__d">
            {d}
          </span>
        ))}
        {week.rows.map((r, ri) => (
          <div key={r.name} className="cv3-week__row" style={{ "--r": ri }}>
            <span className="cv3-week__n">{r.name}</span>
            {week.days.map((d, di) => (
              <span key={d} className={`cv3-week__c${r.on.includes(di) ? " is-on" : ""}`} style={{ "--d": di }}>
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="cv3-chart__note">{week.note}</p>
    </InView>
  );
}

/* Dal listino alla stima: tre pezzi che si sommano, il totale pieno e il tetto sfumato. */
function Estimate({ e }) {
  let from = 0;
  return (
    <InView className="dsv3-glass cv3-est">
      {e.steps.map((s, i) => {
        const left = from;
        from += s.value;
        return (
          <div key={s.label} className="cv3-est__row" style={{ "--i": i }}>
            <span className="cv3-est__l">{s.label}</span>
            <span className="cv3-est__track" aria-hidden="true">
              <i style={{ "--from": left / e.max, "--w": s.value / e.max }} />
            </span>
            <b className="font-display">{s.text}</b>
          </div>
        );
      })}
      <div className="cv3-est__row cv3-est__row--total" style={{ "--i": 3 }}>
        <span className="cv3-est__l">{e.total.label}</span>
        <span className="cv3-est__track" aria-hidden="true">
          <i style={{ "--from": 0, "--w": e.total.value / e.max }} />
          <i className="is-ghost" style={{ "--from": e.total.value / e.max, "--w": 1 - e.total.value / e.max }} />
        </span>
        <b className="font-display">{e.total.text}</b>
      </div>
      <p className="cv3-est__ceiling">{e.ceiling}</p>
    </InView>
  );
}

/* Una chiamata d'esempio: la conversazione si scrive a mano a mano e le quattro cose da far combaciare si accendono. */
function CallScene({ c }) {
  return (
    <InView className="dsv3-glass cv3-call">
      <div className="cv3-call__top">
        <b className="font-display">{c.live}</b>
        <span className="cv3-call__tag">{c.tag}</span>
      </div>
      <div className="cv3-call__grid" role="group" aria-label={c.ariaLabel}>
        <ol className="cv3-chat">
          {c.lines.map((l, i) => (
            <li key={l.text} className={`cv3-msg cv3-msg--${l.who} cv3-seq`} style={{ "--k": i }}>
              <small>{c.who[l.who]}</small>
              <span>{l.text}</span>
            </li>
          ))}
        </ol>
        <div className="cv3-checks">
          <span className="dsv3-lab">{c.checksLabel}</span>
          <ul>
            {c.checks.map((x, i) => (
              <li key={x} className="cv3-check" style={{ "--k": i * 0.6 + 0.5 }}>
                <i aria-hidden="true" />
                {x}
              </li>
            ))}
          </ul>
          <span className="cv3-done">{c.done}</span>
        </div>
      </div>
      <p className="cv3-call__note">{c.note}</p>
    </InView>
  );
}

function Head({ s, lead = true }) {
  return <SectionHeader align="center" eyebrow={s.eyebrow} title={s.title} lead={lead ? s.lead : undefined} className="v2c-scenehead cv3-head" />;
}

export default function ClinicaCaseV3({ locale = "it" }) {
  const t = it;
  const m = CASO.it;
  const book = { label: "Prenota una call", href: `${addLangPrefix("/", locale)}#book` };
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
          eyebrowLogo={{ src: t.hero.logo, alt: t.hero.client, name: t.hero.client }}
        />
        <div className="v2-caso">
          {/* ---------- 1 · Il punto di partenza ---------- */}
          <Section fx={false} tone="light" className="v2c-edge" id="partenza">
            <Head s={t.start} />
            <Scene>
              <Strip items={t.start.cards} />
              <Quote tag={t.start.trust.tag} title={t.start.trust.title} line={t.start.trust.lines[0]} />
            </Scene>
          </Section>

          {/* ---------- 2 · La fiducia ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="fiducia">
            <Head s={t.trust} />
            <Scene>
              <Bars chart={t.trust.chart} />
              <Plain items={t.trust.phases.map((p) => ({ tag: p.tag, title: p.title, line: p.line }))} />
              <p className="dsv3-note">{t.trust.note}</p>
            </Scene>
          </Section>

          {/* ---------- In numeri ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="numeri">
            <Head s={t.numbers} />
            <Scene>
              <Stats items={t.numbers.items} label={t.numbers.label} cols={3} />
              <Split split={t.numbers.split} className="cv3-gap" />
              <Stats items={t.numbers.more} cols={4} compact />
            </Scene>
          </Section>

          {/* ---------- 3 · Una chiamata ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="chiamata">
            <Head s={t.call} />
            <Scene>
              <CallScene c={t.call} />
            </Scene>
          </Section>

          {/* ---------- 4 · La segretaria ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="segretaria">
            <Head s={t.handoff} />
            <Scene>
              <BarRows table={t.handoff.table} />
              <Plain items={[{ tag: t.handoff.own.tag, title: t.handoff.own.title, line: t.handoff.own.line }, { tag: t.handoff.hidden.tag, line: t.handoff.hidden.line }]} />
            </Scene>
          </Section>

          {/* ---------- 5 · Gli errori ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="errori">
            <Head s={t.mistakes} />
            <Scene>
              <Fixes items={t.mistakes.items} tags={t.mistakes.tags} />
            </Scene>
          </Section>

          {/* ---------- 6 · La stima ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="stima">
            <Head s={t.estimate} />
            <Scene>
              <Estimate e={t.estimate} />
              <p className="dsv3-note">{t.estimate.note}</p>
              <Quote tag="In sette mesi" title={`${t.estimate.key.figure} prime visite per impianti`} line={t.estimate.key.line} />
            </Scene>
          </Section>

          {/* ---------- Nel dettaglio ---------- */}
          <Section fx={false} tone="light" className="v2c-sec" id="dettaglio">
            <Head s={t.detail} />
            <Scene>
              <Detail
                items={[
                  {
                    id: "lingue",
                    tag: t.languages.eyebrow,
                    summary: t.languages.title,
                    children: (
                      <>
                        <p className="cv3-lead">{t.languages.lead}</p>
                        <Chips items={t.languages.chips} note={t.languages.chipsNote} />
                        <Steps items={t.languages.steps} />
                      </>
                    ),
                  },
                  {
                    id: "agenda",
                    tag: t.agenda.eyebrow,
                    summary: t.agenda.title,
                    children: (
                      <>
                        <p className="cv3-lead">{t.agenda.lead}</p>
                        <Week week={t.agenda.week} />
                        <div className="cv3-pair cv3-gap">
                          <Card tag={t.agenda.match.title} title={t.agenda.match.lead} className="cv3-card--match">
                            <ol className="cv3-match">
                              {t.agenda.match.items.map((x, i) => (
                                <li key={x}>
                                  <span>{i + 1}</span>
                                  {x}
                                </li>
                              ))}
                            </ol>
                          </Card>
                          <Card tag={t.agenda.words.tag} title={t.agenda.words.title} lines={t.agenda.words.lines} figure={t.agenda.words.figure} figureLabel={t.agenda.words.figureLabel} />
                        </div>
                        <Card tag={t.agenda.search.tag} title={t.agenda.search.title} className="cv3-card--wide cv3-gap">
                          <ol className="cv3-list">
                            {t.agenda.search.steps.map((x, i) => (
                              <li key={x}>
                                <span>{i + 1}</span>
                                {x}
                              </li>
                            ))}
                          </ol>
                        </Card>
                        <p className="dsv3-note">{t.agenda.search.note}</p>
                      </>
                    ),
                  },
                  {
                    id: "urgenze",
                    tag: t.urgent.eyebrow,
                    summary: t.urgent.title,
                    children: (
                      <>
                        <p className="cv3-lead">{t.urgent.lead}</p>
                        <Card tag={t.urgent.case.tag} title={t.urgent.case.title} line={t.urgent.case.line} className="cv3-card--wide cv3-card--alert" />
                        <Steps items={t.urgent.ways} className="cv3-steps--two cv3-gap" />
                        <p className="dsv3-note">{t.urgent.note}</p>
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
