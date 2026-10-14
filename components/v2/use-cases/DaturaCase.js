import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHero from "@/components/v2/ui/PageHero";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Button from "@/components/v2/ui/Button";
import Disclosure from "@/components/v2/ui/Disclosure";
import CtaBand from "@/components/v2/ui/CtaBand";
import Icon from "@/components/v2/ui/icons";
import { getCopy } from "@/components/v2/copy/getCopy";
import { getDaturaCopy } from "@/components/v2/use-cases/daturaCopy";
import { CountUp, InView } from "@/components/v2/use-cases/fx";
import { DayCells, DotsGrid, Pips, Spikes, SystemStage } from "@/components/v2/use-cases/DaturaVisuals";
import Seam from "@/components/v2/use-cases/Seam";
import ModuleRail from "@/components/v2/use-cases/ModuleRail";
import Tile from "@/components/v2/use-cases/Tile";
import { CHAINS, DATURA_SLUG } from "@/components/v2/use-cases/constants";
import { addLangPrefix } from "@/lib/locales";
import "@/components/v2/use-cases/use-cases.css";

/*
  Caso Datura Clothing. Apertura scura con i numeri di testa, corpo chiaro (palette dei casi studio, sotto .v2-caso).
  Fra la hero e il corpo, nella sfumatura, le quattro tessere di vetro della hero 3D (presidio, feed, campagne, report)
  collegate da un filo (Seam); le stesse tornano nello schema del sistema, sulle schede dei risultati e dei moduli, nella
  rotaia che resta ferma mentre si legge (ModuleRail: si accende il modulo di cui stai leggendo la prova, con un pacchetto
  che corre fra una tessera e l'altra) e, in uscita, nella sfumatura verso l'invito (Seam exit).
  Sezioni: il problema (tempi di scoperta) → il sistema (il palco 3D) → i risultati → cosa fa ogni modulo → invito.
  data-mod sui blocchi = quali moduli hanno prodotto la prova (indici di CHAINS: 0 presidio, 1 feed, 2 campagne, 3 report).
  Nessun numero fuori dal copy: ogni cifra viene da components/v2/copy/use-case-datura.<lingua>.js, con la sua finestra.
  Il movimento: le entrate (blocchi, titoli a parole, griglie a scaglioni) e l'inclinazione delle schede sono del kit
  (data-fx, components/v2/wow/fx); i numeri che contano, i disegni che si accendono e il palco 3D sono in fx.js e
  use-cases.css. Senza JavaScript e con prefers-reduced-motion si vede subito tutto, a riposo.
*/
/* Quale modulo ha prodotto ognuno dei tre numeri dei risultati (dal testo: i guasti e gli aggiornamenti dei plugin sono il
   presidio, le 100 inserzioni sono le campagne). */
const RESULT_MODULE = [0, 2, 0];
const GLYPHS = CHAINS[DATURA_SLUG];

export default function DaturaCase({ locale = "en" }) {
  const t = getDaturaCopy(locale);
  const common = getCopy("common", locale);
  const contact = addLangPrefix("/contact", locale);

  return (
    <AutomisEnShell>
      <main id="main">
      {locale === "it" ? (
        <PageHeroV3
          className="v2c-hero"
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          highlight={t.hero.highlight}
          lead={t.hero.lead}
          cta={{ label: "Leggi il caso", href: "#problem" }}
          extra={
            <>
        <div className="v2c-client">
          <span className="v2-tile">
            <Icon name="cart" size={22} />
          </span>
          <p className="v2c-client__name">{t.hero.client}</p>
          <span className="v2c-card__tag">{t.hero.tag}</span>
        </div>
            </>
          }
          belowWide
          below={

          <ul className="v2c-stats" aria-label={t.hero.statsLabel}>
            {t.hero.stats.map((s, i) => (
              <li key={i} className="v2c-stats__li" style={{ "--i": i }}>
                <div className="v2c-stat" data-fx="tilt">
                  <p className="v2c-stat__num">
                    <CountUp text={s.figure} delay={i * 160} />
                  </p>
                  <p className="v2c-stat__label">{s.label}</p>
                  <p className="v2c-stat__basis">{s.basis}</p>
                </div>
              </li>
            ))}
          </ul>
          }
        />
      ) : (
      <PageHero
        size="compact"
        className="v2c-hero"
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        highlight={t.hero.highlight}
        subtitle={t.hero.lead}
        primaryCta={{ label: common.cta, href: contact }}
        below={
          <ul className="v2c-stats" aria-label={t.hero.statsLabel}>
            {t.hero.stats.map((s, i) => (
              <li key={i} className="v2c-stats__li" style={{ "--i": i }}>
                <div className="v2c-stat" data-fx="tilt">
                  <p className="v2c-stat__num">
                    <CountUp text={s.figure} delay={i * 160} />
                  </p>
                  <p className="v2c-stat__label">{s.label}</p>
                  <p className="v2c-stat__basis">{s.basis}</p>
                </div>
              </li>
            ))}
          </ul>
        }
      >
        <div className="v2c-client">
          <span className="v2-tile">
            <Icon name="cart" size={22} />
          </span>
          <p className="v2c-client__name">{t.hero.client}</p>
          <span className="v2c-card__tag">{t.hero.tag}</span>
        </div>
        <div className="v2c-back">
          <Button href={addLangPrefix("/use-cases", locale)} variant="link" arrow={false}>
            {common.ui.allCases}
          </Button>
        </div>
      </PageHero>
      )}
      <div className="v2-caso">
        {/* ---------- Il problema: da quanto restava fermo un guasto ---------- */}
        <Section fx={false} tone="light" id="problem" className="v2c-edge v2c-edge--eb">
          <SectionHeader eyebrow={t.problem.eyebrow} title={t.problem.title} lead={t.problem.lead} />
          <div className="v2c-prob" data-fx="stagger" data-mod="">
            {t.problem.items.map((it, i) => (
              <div key={i} className="v2-card v2c-pc" data-fx="tilt">
                <p className="v2c-pc__num">
                  <CountUp text={it.figure} />
                  <span className="v2c-pc__unit">{it.unit}</span>
                </p>
                <p className="v2c-pc__label">{it.label}</p>
                {it.days ? (
                  <InView>
                    <DayCells days={it.days} />
                  </InView>
                ) : null}
                {it.spikes ? (
                  <InView>
                    <Spikes points={it.spikes} />
                  </InView>
                ) : null}
                <p className="v2c-pc__line">{it.line}</p>
                <p className="v2c-pc__basis">{it.basis}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------- Il sistema: il negozio e i quattro moduli ---------- */}
        <Section fx={false} tone="light" className="v2c-sec" id="system">
          <SectionHeader eyebrow={t.system.eyebrow} title={t.system.title} lead={t.system.lead} />
          <SystemStage copy={t.system} />
        </Section>

        {/* ---------- I risultati: tre numeri con la loro base ---------- */}
        <Section fx={false} tone="light" className="v2c-sec" id="results">
          <SectionHeader eyebrow={t.results.eyebrow} title={t.results.title} />
          <div className="v2c-res" data-fx="stagger">
            {t.results.items.map((r, i) => (
              <div key={i} className="v2-card v2c-rc" data-fx="tilt" data-mod={RESULT_MODULE[i]}>
                <p className="v2c-rc__mod">
                  <Tile glyph={GLYPHS[RESULT_MODULE[i]]} size="xs" />
                  <span>{t.system.nodes[RESULT_MODULE[i]]}</span>
                </p>
                <p className="v2c-rc__num">
                  <CountUp text={r.figure} delay={i * 120} />
                </p>
                <p className="v2c-rc__label">{r.label}</p>
                <InView className="v2c-rc__vis">
                  {i === 0 ? <Pips n={10} kind="dot" /> : null}
                  {i === 1 ? <DotsGrid lit={r.lit} label={r.dotsLabel} /> : null}
                  {i === 2 ? <Pips n={19} kind="check" /> : null}
                </InView>
                <p className="v2c-rc__line">{r.line}</p>
              </div>
            ))}
          </div>
          <p className="v2c-note">{t.results.note}</p>
          <Disclosure summary={t.basis.summary} className="v2c-basis">
            {t.basis.items.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </Disclosure>
        </Section>

        {/* ---------- Cosa fa ogni modulo ---------- */}
        <Section fx={false} tone="light" className="v2c-sec" id="modules">
          <SectionHeader eyebrow={t.modules.eyebrow} title={t.modules.title} />
          <div className="v2c-mods" data-fx="stagger">
            {t.modules.items.map((m, i) => (
              <div key={i} className="v2-card v2c-mod" data-fx="tilt" data-mod={i}>
                <div className="v2c-mod__head">
                  <Tile glyph={GLYPHS[i]} size="md" />
                  <span className="v2c-card__tag">{m.since}</span>
                </div>
                <h3 className="v2c-mod__title">{m.title}</h3>
                <p className="v2c-mod__line">{m.line}</p>
                <Disclosure summary={t.modules.detailLabel} className="v2c-mod__more">
                  {m.more.map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </Disclosure>
              </div>
            ))}
          </div>
        </Section>

        <div className="v2c-cta">
          <CtaBand blue={locale === "it"} title={t.cta.title} line={t.cta.line} button={
              locale === "it"
                ? { label: "Prenota una call", href: `${addLangPrefix("/", locale)}#book` }
                : { label: common.cta, href: contact }
            }
          />
        </div>
        {locale === "it" ? (
          <div className="v2c-back v2c-back--end">
            <Button href={addLangPrefix("/use-cases", locale)} variant="link" arrow={false}>
              {common.ui.allCases}
            </Button>
          </div>
        ) : null}
      </div>
      </main>
    </AutomisEnShell>
  );
}
