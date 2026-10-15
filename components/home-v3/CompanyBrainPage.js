import "@/components/v2/ui/v2.css";
import "@/components/v2/systems/systems.css";
import "./company-brain.css";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CardGrid from "@/components/v2/ui/CardGrid";
import SystemCard from "@/components/v2/ui/SystemCard";
import CtaBand from "@/components/v2/ui/CtaBand";
import { pageClass } from "@/components/v2/ui/toneClass";
import FaqSection from "@/components/v2/systems/FaqSection";
import BrainPicker from "@/components/v2/systems/BrainPicker";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import { CB } from "./companyBrainCopy";

/*
  Company Brain come prodotto (solo IT, 14/10/2026), sul modello di /it/ecommerce: hero v3, per chi è, la demo «Chiedi al Brain»,
  cosa facciamo noi, dove stanno i dati (tre livelli), da remoto o in sede, domande, chiusura. Titolo, lead, demo e meta stanno in
  components/v2/copy/systems.it.js ("company-brain"); il resto in companyBrainCopy.js. La rotta resta /it/systems/company-brain.
*/
export default function CompanyBrainPage({ tono }) {
  const locale = "it";
  const c = getCopy("systems", locale)["company-brain"];
  const common = getCopy("common", locale);

  return (
    <main id="main" className={pageClass(tono)}>
      <SmoothScroll />
      <PageStory />
      <PageHeroV3
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        highlight={c.hero.highlight}
        lead={c.hero.lead}
        cta={{ label: CB.hero.cta, href: "#demo" }}
      />

      <Section tone="light" aria-labelledby="cb-who">
        <SectionHeader id="cb-who" eyebrow={CB.who.eyebrow} title={CB.who.title} />
        <CardGrid cols={3}>
          {CB.who.items.map((it) => (
            <SystemCard key={it.title} icon={it.icon} title={it.title} line={it.line} />
          ))}
        </CardGrid>
        <p className="hcb-note">
          <b>{CB.who.noteTitle}</b> {CB.who.note}
        </p>
      </Section>

      <Section tone="deep" id="demo" aria-labelledby="cb-demo">
        <div className="v2sx-split">
          <div>
            <SectionHeader id="cb-demo" title={c.brain.title} lead={c.brain.caption} />
            <p className="v2sx-note">{common.ui.scriptNote}</p>
          </div>
          <div className="v2sx-split__demo">
            <BrainPicker
              queries={c.brain.queries}
              windowTitle="Company Brain"
              sourceLabel={c.brain.sourceLabel}
              ariaLabel={c.brain.title}
              groupLabel={c.brain.caption}
              replayLabel={common.ui.replay}
            />
          </div>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="cb-work">
        <SectionHeader id="cb-work" eyebrow={CB.work.eyebrow} title={CB.work.title} lead={CB.work.lead} />
        <CardGrid cols={2}>
          {CB.work.items.map((it) => (
            <SystemCard key={it.title} icon={it.icon} title={it.title} line={it.line} />
          ))}
        </CardGrid>
      </Section>

      <Section tone="light" aria-labelledby="cb-data">
        <SectionHeader id="cb-data" eyebrow={CB.data.eyebrow} title={CB.data.title} lead={CB.data.lead} />
        <div className="hcb-levels" data-fx="stagger">
          {CB.data.items.map((lv, i) => (
            <article key={lv.title} className="v2-card hcb-level">
              <span className="hcb-level__n" aria-hidden="true">
                {i + 1}
              </span>
              <p className="hcb-level__tag">{lv.tag}</p>
              <h3 className="hcb-level__title">{lv.title}</h3>
              <p className="hcb-level__line">{lv.line}</p>
              <p className="hcb-level__who">{lv.who}</p>
            </article>
          ))}
        </div>
        <p className="hcb-note">{CB.data.note}</p>
      </Section>

      <Section tone="deep" aria-labelledby="cb-place">
        <SectionHeader id="cb-place" eyebrow={CB.place.eyebrow} title={CB.place.title} lead={CB.place.lead} />
        <div className="v2-card hcb-tablewrap">
          <table className="hcb-table">
            <thead>
              <tr>
                <td />
                {CB.place.cols.map((col) => (
                  <th key={col} scope="col">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CB.place.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td data-l={CB.place.cols[0]}>{row.remote}</td>
                  <td data-l={CB.place.cols[1]}>{row.onsite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <FaqSection title={CB.faq.title} items={CB.faq.items} tone="dark" />

      <CtaBand
        blue
        tone="dark"
        title={c.cta.title}
        line={c.cta.line}
        button={{ label: "Prenota una call", href: `${addLangPrefix("/", locale)}#book` }}
      />
    </main>
  );
}
