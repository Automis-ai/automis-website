import { Fragment } from "react";
import Hero from "@/components/v2/ui/Hero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CardGrid from "@/components/v2/ui/CardGrid";
import Button from "@/components/v2/ui/Button";
import CtaBand from "@/components/v2/ui/CtaBand";
import ScriptedChat from "@/components/v2/ui/ScriptedChat";
import { getCopy } from "@/components/v2/copy/getCopy";
import { CASES } from "@/components/use-cases/cases";
import { addLangPrefix } from "@/lib/locales";
import Highlighted from "./Highlighted";
import SystemTile from "./SystemTile";
import ProductCard from "./ProductCard";
import ProductBand from "./ProductBand";
import CaseBand from "./CaseBand";
import CategoryArt from "./CategoryArt";
import BrainPicker from "./BrainPicker";
import { CARD_ICONS, ART_EXTRA, BAND_CARD, CARD_SPLIT, colsFor, caseSlug } from "./data";

/*
  Un solo template per le cinque pagine /systems/<categoria> (marketing, sales, support, admin, hr).
  Dati e testi: components/v2/copy/systems.<lingua>.js.
  Ritmo: apertura scura con il suo visivo e il bottone; schede su chiaro (al massimo 4 per gruppo: le categorie
  più lunghe si dividono in due gruppi con una fascia in mezzo: il prodotto, o il caso reale); poi, dove c'è,
  demo o rimando su fondo blu; chiusura con un solo invito verso /contact.
*/
export default function CategoryBody({ locale, slug }) {
  const all = getCopy("systems", locale);
  const common = getCopy("common", locale);
  const c = all[slug];
  const L = locale;
  const caseInfo = c.case ? CASES.find((x) => x.slug === caseSlug(c.case.href)) : null;

  // La scheda-prodotto che diventa una fascia a sé (Marketing: AI E-commerce Manager) esce dalla griglia.
  const bandId = BAND_CARD[slug];
  const bandCard = bandId ? c.cards.find((x) => x.id === bandId) : null;
  const gridCards = bandId ? c.cards.filter((x) => x.id !== bandId) : c.cards;
  const split = CARD_SPLIT[slug];
  const groups = split && gridCards.length > split ? [gridCards.slice(0, split), gridCards.slice(split)] : [gridCards];
  // Il caso reale sta in mezzo ai due gruppi (Vendita); altrimenti chiude la pagina, dopo le demo.
  const caseInMiddle = Boolean(split && !bandCard && c.case);
  const caseTone = c.chat ? "light" : "deep";
  const artItems = ART_EXTRA[slug] || c.cards.map((x) => CARD_ICONS[x.id]).filter(Boolean);

  const caseBand = c.case ? (
    <CaseBand
      eyebrow={c.case.eyebrow}
      client={c.case.title}
      line={c.case.line}
      cta={c.case.cta}
      href={addLangPrefix(c.case.href, L)}
      logo={caseInfo ? { src: caseInfo.logo, alt: caseInfo.shortClient } : undefined}
    />
  ) : null;

  const tile = (card) => (
    <SystemTile
      key={card.id}
      title={card.title}
      kicker={card.kicker}
      line={card.short}
      detail={card.line}
      more={card.more}
      moreLabel={all.labels.more}
      icon={CARD_ICONS[card.id] || slug}
      href={card.href ? addLangPrefix(card.href, L) : undefined}
      caseHref={card.caseHref ? addLangPrefix(card.caseHref, L) : undefined}
      caseLabel={card.caseHref ? common.caseBadge : undefined}
      price={card.price || undefined}
    />
  );

  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        title={<Highlighted text={c.hero.title} highlight={c.hero.highlight} />}
        subtitle={c.hero.lead}
        primaryCta={{ label: common.cta, href: addLangPrefix("/contact", L) }}
        media={<CategoryArt icon={slug} items={artItems} />}
      />

      {groups.map((cards, gi) => {
        const isLast = gi === groups.length - 1;
        return (
          <Fragment key={gi}>
            <Section
              tone="light"
              {...(gi === 0
                ? { "aria-labelledby": `sx-${slug}-cards` }
                : { "aria-label": common.categories[slug] })}
            >
              {gi === 0 ? (
                <h2 id={`sx-${slug}-cards`} className="v2-sr">
                  {common.categories[slug]}
                </h2>
              ) : null}
              {cards.length === 1 ? (
                <div className="v2sx-solo">{tile(cards[0])}</div>
              ) : (
                <CardGrid cols={colsFor(cards.length)} className="v2sx-grid">
                  {cards.map(tile)}
                </CardGrid>
              )}
              {isLast ? (
                <div className="v2sx-back">
                  <Button href={addLangPrefix("/systems", L)} variant="link">
                    {common.nav.allSystems}
                  </Button>
                </div>
              ) : null}
            </Section>

            {/* Fascia in mezzo ai due gruppi: il prodotto (Marketing) o il caso reale (Vendita). */}
            {!isLast && bandCard ? (
              <Section tone="deep">
                <ProductBand
                  title={bandCard.title}
                  line={bandCard.short}
                  cta={getCopy("ecommerce", L).hero.cta}
                  href={addLangPrefix(bandCard.href, L)}
                  report={getCopy("ecommerce", L).hero.visual}
                />
              </Section>
            ) : null}
            {!isLast && caseInMiddle ? <Section tone="deep">{caseBand}</Section> : null}
          </Fragment>
        );
      })}

      {c.chat ? (
        <Section tone="deep">
          <div className="v2sx-split">
            <div>
              <SectionHeader title={c.chat.title} lead={c.chat.caption} />
              <p className="v2sx-note">{common.ui.scriptNote}</p>
            </div>
            <div className="v2sx-split__demo v2sx-split__demo--chat">
              <ScriptedChat
                name={c.chat.header}
                ariaLabel={c.chat.title}
                replayLabel={common.ui.replay}
                preload={2}
                script={c.chat.messages.map((m) => ({
                  from: m.role === "customer" ? "user" : "agent",
                  text: m.text,
                }))}
              />
            </div>
          </div>
        </Section>
      ) : null}

      {c.brain ? (
        <Section tone="deep">
          <div className="v2sx-split">
            <div>
              <SectionHeader title={c.brain.title} lead={c.brain.caption} />
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
      ) : null}

      {c.crossLink ? (
        <Section tone="deep">
          <div className="v2sx-solo">
            <ProductCard
              as="h2"
              icon="brain"
              title={c.crossLink.title}
              line={c.crossLink.line}
              cta={c.crossLink.cta}
              href={addLangPrefix(c.crossLink.href, L)}
            />
          </div>
        </Section>
      ) : null}

      {c.case && !caseInMiddle ? <Section tone={caseTone}>{caseBand}</Section> : null}

      <CtaBand
        tone="light"
        title={c.cta.title}
        line={c.cta.line}
        button={{ label: common.cta, href: addLangPrefix("/contact", L) }}
      />
    </>
  );
}
