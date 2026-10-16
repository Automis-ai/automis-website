import "./voice.css";
import PageHero from "@/components/v2/ui/PageHero";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CardGrid from "@/components/v2/ui/CardGrid";
import Icon from "@/components/v2/ui/icons";
import { nb } from "@/components/v2/ui/nb";
import { pageClass } from "@/components/v2/ui/toneClass";
import { getCopy } from "@/components/v2/copy/getCopy";
import Rail, { RailCell } from "@/components/v2/wow/fx/Rail";
import SystemTile from "@/components/v2/systems/SystemTile";
import FaqSection from "@/components/v2/systems/FaqSection";
import { heroTitle } from "@/components/v2/systems/heroTitle";
import copy, { UI, BOOKING_URL, VIDEO_ID, SHOTS } from "./copy";
import { Agents, Win, Plans, Close } from "./Parts";
import VideoFacade from "./VideoFacade";
import BookingEmbed from "./BookingEmbed";

/*
  Voice AI, il prodotto di punta, nella famiglia del sito v2: stessa hero con i moduli (chiamata → qualifica → calendario → CRM),
  stesso filo di pagina a sinistra, stesse schede di vetro con inclinazione 3D, la stessa catena di moduli, la chiusura con il
  pulsante come nodo. I testi sono quelli della pagina di prima (copy.js), il contenuto non cambia: cambia la forma, e la pagina
  è più corta di un terzo (le voci lunghe stanno dietro «Cosa fa, nel dettaglio»; il video parte a richiesta).
  Ritmo (tono A, tutto nel blu notte): hero · il problema · un sistema, due agenti · come funziona (catena) · la dashboard ·
  il CRM a tre livelli (catena con le schermate) · i piani · le domande · il calendario · chiusura.
  `locale`: "en" | "it" | "pt". `tono`: ?tono= della preview. Cornice (AutomisEnShell) e metadati stanno nel file di rotta.
*/

// «Prima frase» e «resto» di un testo: la riga che si legge subito e quello che si apre a richiesta, parola per parola lo stesso testo
function firstSentence(text) {
  const m = /^(.+?[.!?])(\s+)(.+)$/s.exec(text);
  return m ? { line: m[1], rest: m[3] } : { line: text, rest: "" };
}

const PAIN_ICONS = ["phone", "clock", "bolt"];

export default function VoicePage({ locale = "en", tono }) {
  const t = copy[locale] || copy.en;
  const ui = UI[locale] || UI.en;
  const booking = BOOKING_URL[locale] || BOOKING_URL.en;
  const moreLabel = getCopy("systems", locale).labels.more;
  const shots = SHOTS[locale] || SHOTS.en;

  return (
    <main id="main" className={`${pageClass(tono)} v2-calm`}>

      <PageHeroV3
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        highlight={t.hero.highlight}
        lead={t.hero.subtitle}
        cta={{ label: t.hero.cta, href: "#book" }}
        below={
          <div className="v2vo-herovideo">
            <div className="v2vo-herovideo__frame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID[locale] || VIDEO_ID.en}?rel=0`}
                title={t.hero.videoTitle}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p>{t.hero.videoTitle}</p>
          </div>
        }
        belowWide
      />

      {/* Il problema: tre schede corte (la prima frase), il resto a richiesta */}
      <Section tone="light" className="v2vo-sec" aria-labelledby="vo-problem">
        <SectionHeader id="vo-problem" eyebrow={t.problem.eyebrow} title={t.problem.title} lead={t.problem.lead} />
        <CardGrid cols={3} className="v2sx-grid">
          {t.problem.pains.map((pain, i) => {
            const { line, rest } = firstSentence(pain.body);
            return (
              <SystemTile
                key={pain.title}
                title={pain.title}
                line={line}
                more={rest || undefined}
                moreLabel={moreLabel}
                icon={PAIN_ICONS[i] || "spark"}
              />
            );
          })}
        </CardGrid>
      </Section>

      {/* Un sistema, due agenti */}
      <Section tone="deep" className="v2vo-sec" aria-labelledby="vo-modes">
        <SectionHeader id="vo-modes" eyebrow={t.modes.eyebrow} title={t.modes.title} lead={t.modes.lead} />
        <Agents modes={t.modes} ui={ui} />
      </Section>

      {/* Come funziona: la catena dei cinque passi, un modulo ciascuno; il video parte a richiesta */}
      <Section tone="dark" className="v2vo-sec" aria-labelledby="vo-how">
        <SectionHeader id="vo-how" eyebrow={t.how.eyebrow} title={t.how.title} lead={t.how.lead} />
        <Rail
          ariaLabel={t.how.title}
          steps={t.how.steps.map((s, i) => ({ glyph: ["phone", "check", "calendar", "contact", "repeat"][i] || "spark", label: s.title, text: s.body }))}
        />
      </Section>

      {/* La dashboard: tutto quello che fa l'IA, visibile */}
      <Section tone="light" className="v2vo-sec" aria-labelledby="vo-dash">
        <SectionHeader id="vo-dash" eyebrow={t.dash.eyebrow} title={t.dash.title} lead={t.dash.lead} />
        <div className="v2vo-dash">
          <div className="v2vo-dash__a">
            <figure>
              <Win shot={shots.overview} alt={t.dash.leadCaption} />
              <figcaption aria-hidden="true">{nb(t.dash.leadCaption)}</figcaption>
            </figure>
            <div className="v2vo-detail__txt">
              <h3 className="v2vo-detail__title">{nb(t.dash.detailTitle)}</h3>
              <p className="v2vo-detail__body">{nb(t.dash.detailBody)}</p>
              <ul className="v2vo-chips" role="list">
                <li>
                  <Icon name="mic" size={15} strokeWidth={2} />
                  {t.dash.tagRecording}
                </li>
                <li>
                  <Icon name="doc" size={15} strokeWidth={2} />
                  {t.dash.tagTranscript}
                </li>
                <li>
                  <Icon name="spark" size={15} strokeWidth={2} />
                  {t.dash.tagSummary}
                </li>
              </ul>
            </div>
          </div>
          <figure className="v2vo-dash__b">
            <Win shot={shots.callDetail} alt={t.dash.callDetailAlt} />
            <figcaption aria-hidden="true">{nb(t.dash.callDetailCaption)}</figcaption>
          </figure>
        </div>
      </Section>

      {/* Il CRM a tre livelli: tre moduli che si compongono, ognuno con la sua schermata */}
      <Section tone="deep" className="v2vo-sec" aria-labelledby="vo-crm">
        <SectionHeader id="vo-crm" eyebrow={t.crm.eyebrow} title={t.crm.title} lead={t.crm.lead} />
        <Rail
          cards
          pin={false}
          className="v2vo-tiersrail"
          ariaLabel={t.crm.title}
          steps={t.crm.tiers.map((tier, i) => ({ glyph: ["calendar", "contact", "chart"][i] || "spark", label: tier.title }))}
        >
          <div className="v2vo-tiers v2fx-netgrid">
            {t.crm.tiers.map((tier, i) => (
              <RailCell key={tier.title} index={i}>
                <article className="v2-card v2vo-tier" data-fx="tilt">
                  <div className="v2vo-tier__txt">
                    <p className="v2vo-tier__kicker">{tier.kicker}</p>
                    <h3 className="v2vo-tier__title">{nb(tier.title)}</h3>
                    <p className="v2vo-tier__body">{nb(tier.body)}</p>
                    <ul className="v2vo-tier__pts" role="list">
                      {tier.points.map((pt) => (
                        <li key={pt}>
                          <Icon name="check" size={16} strokeWidth={2.4} />
                          <span>{nb(pt)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figure className="v2vo-tier__shot">
                    <Win shot={shots.tiers[i]} alt={tier.caption} tilt={false} />
                  </figure>
                </article>
              </RailCell>
            ))}
          </div>
        </Rail>
        <p className="v2vo-privacy">
          <Icon name="shield" size={14} strokeWidth={2} />
          {t.crm.privacy}
        </p>
      </Section>

      {/* I piani */}
      <Section tone="dark" className="v2vo-sec" aria-labelledby="vo-plans">
        <SectionHeader id="vo-plans" eyebrow={t.pricing.eyebrow} title={t.pricing.title} lead={t.pricing.lead} />
        <Plans p={t.pricing} booking={booking} />
      </Section>

      <FaqSection
        tone="light"
        id="vo-faq"
        title={t.faq.title}
        items={t.faq.faqs.map((f) => ({ q: f.q, a: f.a }))}
      />

      {/* Prenota: il calendario vero */}
      <Section tone="deep" id="book" className="v2vo-sec" aria-labelledby="vo-book">
        <div className="v2vo-book">
          <div className="v2vo-book__pitch">
            <SectionHeader
              id="vo-book"
              eyebrow={t.booking.eyebrow}
              title={t.booking.headingPre + t.booking.headingGrad + t.booking.headingPost}
              lead={t.booking.paragraph}
            />
            <ul className="v2vo-book__list" role="list">
              {t.booking.bullets.map((b) => (
                <li key={b}>
                  <Icon name="check" size={16} strokeWidth={2.4} />
                  <span>{nb(b)}</span>
                </li>
              ))}
            </ul>
          </div>
          <BookingEmbed
            booking={booking}
            header={t.booking.calHeader}
            confirm={t.booking.calConfirm}
            loadingLabel={t.booking.calLoading}
            iframeTitle={t.booking.iframeTitle}
            badges={[t.booking.guarantee, t.booking.gdpr, t.booking.noObligation]}
          />
        </div>
      </Section>

      {/* Chiusura: la catena e il pacchetto che arriva sul pulsante */}
      <Section tone="dark" pad="sm" className="v2vo-sec">
        <Close title={ui.chainTitle} labels={ui.chain} chainLabel={ui.chainLabel} cta={t.hero.cta} href="#book" />
      </Section>
    </main>
  );
}
