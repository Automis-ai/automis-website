import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHero from "@/components/v2/ui/PageHero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import CategoryGrid from "@/components/v2/ui/CategoryGrid";
import CategoryCard from "@/components/v2/ui/CategoryCard";
import { toneClass } from "@/components/v2/ui/toneClass";
import LoopVideo from "@/components/ui/LoopVideo";
import HowWeWork from "@/components/home/HowWeWork";
import Authority from "@/components/home/Authority";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import { isProduction } from "@/lib/v2/env";
import CasesClassic from "./CasesClassic";
import OpportunityFinderClassic from "./OpportunityFinderClassic";
import FinalCtaClassic from "./FinalCtaClassic";
import "./home.css";

/*
  Home v2, giro 2 (decisioni di Luca, §13 del brief). Stessa pagina nelle tre lingue.
  Ordine: hero centrata · categorie con l'animazione «journey» sotto il titolo · come lavoriamo ·
  casi studio (quattro) · Opportunity Finder · founder · call in fondo. Niente FAQ, niente settori.

  Dal sito originale, come sono: HowWeWork (i tempi dentro sono già «~7 giorni / su misura»), Authority (founder).
  Copie in questa cartella: CasesClassic (quattro casi, meno testo), OpportunityFinderClassic (la versione di origin/main),
  FinalCtaClassic (la call in fondo; il calendario si carica solo in produzione).

  Toni: la pagina sta dentro .v2-tone-a (default) o .v2-tone-b (?tono=b). L'unica fascia chiara è quella delle categorie
  (A: blu medio, B: grigio-azzurro); tutto il resto è il blu notte del sito originale. La sfumatura fra la fascia chiara
  e le sezioni originali la fa il «ponte» (.v2hp-bridge): le sezioni originali non sono fasce del kit e la sfumatura
  d'ingresso del kit non le vede.
*/

export default function HomePage({ lang = "en", tono }) {
  const L = lang;
  const c = getCopy("home", L);
  const common = getCopy("common", L);
  const link = (path) => addLangPrefix(path, L);
  // Senza ?tono= vale il tono A; qualunque altro valore (es. "x") è il sito di oggi, senza toni.
  const tone = toneClass(tono === undefined ? "a" : tono);

  return (
    <AutomisEnShell>
      <div className={tone}>
        <PageHero
          size="full"
          eyebrow={c.hero.eyebrow}
          title={c.hero.title}
          highlight={c.hero.highlight}
          subtitle={c.hero.lead}
          primaryCta={{ label: c.hero.cta, href: link("/contact") }}
          secondaryCta={{ label: c.hero.ctaSecondary, href: "#sistemi" }}
          bg={
            // Sfondo statico e sobrio: due nastri sfocati nei colori del brand. Qui andrà il loop HyperFrames scelto da Luca.
            <div className="v2hp-aurora">
              <i />
              <i />
            </div>
          }
        />

        <Section tone="light" id="sistemi" className="v2hp-cats">
          <SectionHeader align="center" title={c.categories.title} lead={c.categories.lead} />
          <div className="v2hp-journey" role="img" aria-label={c.categories.journeyLabel}>
            <LoopVideo base={`/media/homepage-journey/${L}`} />
          </div>
          <CategoryGrid>
            {c.categories.items.map((it) => (
              <CategoryCard
                key={it.slug}
                title={it.title}
                line={it.line}
                icon={it.slug}
                cta={common.ui.learnMore}
                href={link(`/systems/${it.slug}`)}
              />
            ))}
          </CategoryGrid>
        </Section>

        <div className="v2hp-bridge" aria-hidden="true" />

        <HowWeWork />
        <CasesClassic locale={L} copy={c.cases} />
        <OpportunityFinderClassic />
        <Authority />
        <FinalCtaClassic live={isProduction()} />
      </div>
    </AutomisEnShell>
  );
}
