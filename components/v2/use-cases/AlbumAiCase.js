import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import AlbumGlassScene from "@/components/home-v3/AlbumGlassScene";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Button from "@/components/v2/ui/Button";
import MoreCases from "@/components/v2/use-cases/MoreCases";
import CtaBand from "@/components/v2/ui/CtaBand";
import { InView } from "@/components/v2/use-cases/fx";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import "@/components/v2/use-cases/use-cases.css";

/*
  Caso Album AI. Apertura v3 (PageHeroV3), corpo chiaro (palette dei casi studio, sotto .v2-caso).
  Solo cosa fa il sistema: nessun risultato, nessun nome, nessun evento. Testi da getCopy.
  Movimento: le foto si compongono, le miniature scelte si accendono; le entrate allo scroll sono del kit (data-fx).
  Nella sfumatura sotto la hero, le tessere di vetro dei tre moduli (scatti → scelta → album) collegate da un filo (Seam);
  la stessa fila torna in uscita, nella sfumatura verso l'invito (Seam exit).
  La scena 3D della hero chiede il preset «album» (components/v2/wow/fx/scene/presets.js, richiesta in coda al giro):
  finché non c'è il motore ripiega su «generic».
*/
export default function AlbumAiCase({ locale = "en" }) {
  const t = getCopy("use-case-album-ai", locale);
  const common = getCopy("common", locale);

  return (
    <AutomisEnShell>
      <main id="main">
      <PageHeroV3
        className="v2c-hero"
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        highlight={t.hero.highlight}
        lead={t.hero.lead}
        cta={{ label: common.ui.readCase, href: "#flusso" }}
        eyebrowLogo={t.hero.logo ? { src: t.hero.logo, alt: t.hero.client } : null}
      />
      <div className="v2-caso">
        <Section fx={false} tone="light" className="v2c-edge" id="flusso">
          <SectionHeader align="center" title={t.scene.title} lead={t.scene.lead} className="v2c-scenehead" />
          <AlbumGlassScene steps={t.scene.steps} label={t.scene.label} photos={t.scene.photos} />
          <p className="v2c-scenenote">{t.scene.note}</p>
        </Section>

          <>
            <Section fx={false} tone="light" className="v2c-sec" id="tempi">
              <SectionHeader align="center" title={t.time.title} lead={t.time.lead} className="v2c-scenehead" />
              <InView className="v2c-ba">
                {[t.time.before, t.time.after].map((c, i) => (
                  <div key={i} className={`v2-card v2c-ba__card${i ? " v2c-ba__card--new" : " v2c-ba__card--old"}`}>
                    {c.badge ? <span className="v2c-ba__badge">{c.badge}</span> : null}
                    <p className="v2c-ba__label">{c.label}</p>
                    <p className="v2c-ba__fig">{c.figure}</p>
                    {c.bar ? (
                      <div className="v2c-ba__bar" aria-hidden="true">
                        <i style={{ "--w": `${c.bar}%` }} />
                      </div>
                    ) : null}
                    {c.line ? <p className="v2c-ba__line">{c.line}</p> : null}
                    {c.rows ? (
                      <ul className="v2c-ba__rows">
                        {c.rows.map(([k, v]) => (
                          <li key={k}>
                            <span>{k}</span>
                            <b>{v}</b>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </InView>
            </Section>

            <Section fx={false} tone="light" className="v2c-sec">
              <SectionHeader align="center" title={t.online.title} lead={t.online.lead} className="v2c-scenehead" />
              <div className="v2c-site v2-card">
                <div className="v2c-site__text">
                  <span className="v2c-online__status v2c-online__status--on">{t.online.site.status}</span>
                  <h3>{t.online.site.title}</h3>
                  <p>{t.online.site.line}</p>
                  {t.online.site.features ? (
                    <ul className="v2c-site__features">
                      {t.online.site.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="v2c-site__links">
                    {t.online.site.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </div>
                  <Button href={t.online.site.url} external variant="primary">
                    {t.online.site.cta}
                  </Button>
                  <p className="v2c-site__note">{t.online.site.note}</p>
                </div>
                <div className="v2c-site__shots">
                  {t.online.site.shots.map((it) => (
                    <img key={it.src} className={`v2c-site__img v2c-site__img--${it.kind}`} src={it.src} alt={it.alt} loading="lazy" />
                  ))}
                </div>
              </div>
              <div className="v2c-online v2c-online--two">
                {t.online.items.map((it) => (
                  <div key={it.title} className="v2-card v2c-online__card">
                    <span className="v2c-online__status">{it.status}</span>
                    <h3>{it.title}</h3>
                    <p>{it.line}</p>
                  </div>
                ))}
              </div>
            </Section>
          </>

        <div className="v2c-cta">
          <CtaBand blue title={t.cta.title} line={t.cta.line} button={{ label: common.booking.cta, href: `${addLangPrefix("/", locale)}#book` }} />
        </div>
        <div className="v2c-more-wrap">
          <MoreCases href={addLangPrefix("/use-cases", locale)} locale={locale} />
        </div>
      </div>
      </main>
    </AutomisEnShell>
  );
}
