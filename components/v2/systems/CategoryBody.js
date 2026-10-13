import { Fragment } from "react";
import PageHero from "@/components/v2/ui/PageHero";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import { homeCopy } from "@/components/home-v3/copy";
import CategoryStagesV3 from "@/components/home-v3/CategoryStagesV3";
import { STAGES } from "@/components/home-v3/stages";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CardGrid from "@/components/v2/ui/CardGrid";
import Button from "@/components/v2/ui/Button";
import CtaBand from "@/components/v2/ui/CtaBand";
import ScriptedChat from "@/components/v2/ui/ScriptedChat";
import { pageClass } from "@/components/v2/ui/toneClass";
import { getCopy } from "@/components/v2/copy/getCopy";
import { CASES } from "@/components/use-cases/cases";
import { addLangPrefix } from "@/lib/locales";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import { NetGrid, NetCell } from "@/components/v2/wow/fx/NetGrid";
import Rail, { RailCell } from "@/components/v2/wow/fx/Rail";
import SystemTile from "./SystemTile";
import ProductCard from "./ProductCard";
import ProductBand from "./ProductBand";
import CaseBand from "./CaseBand";
import BrainPicker from "./BrainPicker";
import FaqSection from "./FaqSection";
import { heroTitle } from "./heroTitle";
import { CARD_ICONS, BAND_CARD, CARD_SPLIT, colsFor, caseSlug } from "./data";

/*
  Un solo template per le cinque pagine /systems/<categoria> (marketing, sales, support, admin, hr).
  Dati e testi: components/v2/copy/systems.<lingua>.js. `tono`: ?tono= della preview (toneClass; senza parametro vale il tono A).
  Ritmo: apertura centrata (PageHero compact); il primo gruppo di schede è l'unico momento più chiaro (blu medio) della
  pagina, tutto il resto sta nei blu notte, con sfumature lunghe fra le fasce (classe v2-pg); le schede sono di vetro
  scuro. Al massimo 4 schede per gruppo: le categorie più lunghe si dividono in due gruppi con una fascia in mezzo
  (il prodotto, o il caso reale); poi, dove c'è, demo o rimando; le domande frequenti; chiusura con un solo invito
  verso /contact, su fondo scuro come il piede.
  Risorse umane ha una scheda sola: sta nella stessa riga della demo (stessa colonna delle schede delle altre pagine).
*/
export default function CategoryBody({ locale, slug, tono }) {
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
  // Una scheda sola e una demo (Risorse umane): scheda e demo stanno affiancate.
  const brainBeside = L !== "it" && Boolean(c.brain && c.cards.length === 1);

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
      cta={card.href ? common.ui.learnMore : undefined}
      caseHref={card.caseHref ? addLangPrefix(card.caseHref, L) : undefined}
      caseLabel={card.caseHref ? common.caseBadge : undefined}
      price={card.price || undefined}
    />
  );

  const brainPicker = c.brain ? (
    <BrainPicker
      queries={c.brain.queries}
      windowTitle={c.brain.windowTitle || "Company Brain"}
      sourceLabel={c.brain.sourceLabel}
      ariaLabel={c.brain.title}
      groupLabel={c.brain.caption}
      replayLabel={common.ui.replay}
    />
  ) : null;

  // IT: corpo a tappe (components/home-v3). Il sistema in primo piano può avere una piccola animazione; il resto sta nei dettagli.
  const VIZ = {
    "ads-creative": { viz: "bars", vizCaption: "Esempio illustrativo: il budget si sposta sulla creatività che converte" },
    reviews: { viz: "stars", vizCaption: "Esempio illustrativo: la risposta pubblica aspetta il tuo ok", vizRows: ["Risposta pronta: «Grazie, ci fa piacere…»"] },
    "ecommerce-manager": {
      viz: "night",
      vizCaption: `${getCopy("ecommerce", L).hero.visual.title} · ${getCopy("ecommerce", L).hero.visual.caption}`,
      vizRows: getCopy("ecommerce", L).hero.visual.rows.map((r) => [r.area, r.state, r.tone === "done"]),
    },
  };
  const itV3 = L === "it";
  // Company Brain: la scheda sarebbe un doppione della hero, la pagina parte dalla demo «Chiedi al Brain».
  const itStages =
    itV3 && slug !== "company-brain"
      ? (STAGES[slug] || []).map((st) => ({
          title: st.title,
          line: st.line,
          items: st.ids
            .map((id) => c.cards.find((x) => x.id === id))
            .filter(Boolean)
            .map((x) => ({
              ...x,
              href: x.href ? addLangPrefix(x.href, L) : null,
              cta: x.id === "ecommerce-manager" ? getCopy("ecommerce", L).hero.cta : common.ui.learnMore,
              ...(VIZ[x.id] || {}),
            })),
        }))
      : null;

  return (
    <main id="main" className={pageClass(tono)}>
      <SmoothScroll />
      <PageStory />
      {L === "it" ? (
        /* Hero v3 (14/10): luce della home, «Il problema» della scheda, un solo bottone che scende alle schede. EN e PT restano sul v2. */
        <PageHeroV3
          eyebrow={c.hero.eyebrow}
          title={c.hero.title}
          highlight={c.hero.highlight}
          lead={c.hero.lead}
          pain={homeCopy(L).systems.items.find((x) => x.slug === slug)?.pain}
          painLabel={homeCopy(L).systems.pain}
          cta={{ label: "Scopri i sistemi", href: "#sistemi" }}
        />
      ) : (
        <PageHero
          size="compact"
          eyebrow={c.hero.eyebrow}
          {...heroTitle(c.hero.title, c.hero.highlight)}
          subtitle={c.hero.lead}
          primaryCta={{ label: common.cta, href: addLangPrefix("/contact", L) }}
        />
      )}

      {itStages ? (
        <CategoryStagesV3 stages={itStages} labels={{ pain: homeCopy(L).systems.pain, more: all.labels.more }} />
      ) : null}

      {(itV3 ? [] : groups).map((cards, gi) => {
        const isLast = gi === groups.length - 1;
        return (
          <Fragment key={gi}>
            <Section
              id={gi === 0 ? "sistemi" : undefined}
              tone={gi === 0 ? "light" : "dark"}
              {...(gi === 0
                ? { "aria-labelledby": `sx-${slug}-cards` }
                : { "aria-label": common.categories[slug] })}
            >
              {gi === 0 ? (
                <h2 id={`sx-${slug}-cards`} className="v2-sr">
                  {common.categories[slug]}
                </h2>
              ) : null}
              {brainBeside ? (
                <div className="v2sx-duo">
                  <div className="v2sx-duo__card">
                    {tile(cards[0])}
                    <p className="v2sx-note">
                      {c.brain.caption} {common.ui.scriptNote}
                    </p>
                  </div>
                  <div className="v2sx-duo__demo">{brainPicker}</div>
                </div>
              ) : (
                gi === 0 && c.moment ? (
                  /* il primo gruppo è il momento fissato della pagina, con il suo motivo (copy: `moment`): una catena di moduli
                     riconoscibili (messaggio → qualifica → CRM → dashboard, documenti → lettura → fatture → back office, …) uniti da
                     fili con pacchetti. Ogni modulo che si accende porta con sé la sua scheda; a catena chiusa, dove c'è un caso,
                     il numero vero (fx/Rail.js + stages/rail.js) */
                  <Rail steps={c.moment.steps} result={c.moment.result} ariaLabel={c.moment.label} cards>
                    <CardGrid cols={colsFor(cards.length)} fx="own" className="v2sx-grid v2fx-netgrid">
                      {cards.map((card) => {
                        const k = c.moment.steps.findIndex((st) => st.card === card.id);
                        return k >= 0 ? (
                          <RailCell key={card.id} index={k}>
                            {tile(card)}
                          </RailCell>
                        ) : (
                          <div key={card.id} className="v2fx-cell">
                            {tile(card)}
                          </div>
                        );
                      })}
                    </CardGrid>
                  </Rail>
                ) : gi === 0 ? (
                  /* il primo gruppo è la catena (il momento fissato della pagina): le schede entrano una dopo l'altra,
                     unite da fili (fx/stages/net.js, mode chain) */
                  <NetGrid mode="chain">
                    <CardGrid cols={colsFor(cards.length)} fx="own" className="v2sx-grid v2fx-netgrid">
                      {cards.map((card) => (
                        <NetCell key={card.id}>{tile(card)}</NetCell>
                      ))}
                    </CardGrid>
                  </NetGrid>
                ) : (
                  <CardGrid cols={colsFor(cards.length)} className="v2sx-grid">
                    {cards.map(tile)}
                  </CardGrid>
                )
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
            {!isLast && caseInMiddle ? (
              <Section tone="deep" className="v2sx-casesec">
                {caseBand}
              </Section>
            ) : null}
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

      {c.brain && !brainBeside ? (
        <Section tone="deep">
          <div className="v2sx-split">
            <div>
              <SectionHeader title={c.brain.title} lead={c.brain.caption} />
              <p className="v2sx-note">{common.ui.scriptNote}</p>
            </div>
            <div className="v2sx-split__demo">{brainPicker}</div>
          </div>
        </Section>
      ) : null}

      {c.crossLink ? (
        <Section tone="dark" pad="sm">
          <ProductCard
            as="h2"
            wide
            icon="brain"
            title={c.crossLink.title}
            line={c.crossLink.line}
            cta={c.crossLink.cta}
            href={addLangPrefix(c.crossLink.href, L)}
          />
        </Section>
      ) : null}

      {c.case && (!caseInMiddle || itV3) ? (
        <Section tone="deep" className="v2sx-casesec">
          {caseBand}
        </Section>
      ) : null}

      <FaqSection title={c.faq.title} items={c.faq.items} tone="dark" />

      <CtaBand
        tone="dark"
        title={c.cta.title}
        line={c.cta.line}
        button={
          L === "it"
            ? { label: "Prenota una call", href: `${addLangPrefix("/", L)}#book` }
            : { label: common.cta, href: addLangPrefix("/contact", L) }
        }
      />
    </main>
  );
}
