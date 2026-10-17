import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHero from "@/components/v2/ui/PageHero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import { toneClass } from "@/components/v2/ui/toneClass";
import LoopVideo from "@/components/ui/LoopVideo";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import { isProduction } from "@/lib/v2/env";
import CasesClassic from "./CasesClassic";
import OpportunityFinderClassic from "./OpportunityFinderClassic";
import FinalCtaClassic from "./FinalCtaClassic";
import NetworkHeroBg from "@/components/v2/wow/hero/NetworkHeroBg";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import HowWeWorkWow from "./HowWeWorkWow";
import AuthorityWow from "./AuthorityWow";
import HomeStory from "./HomeStory";
import CatNetwork from "./CatNetwork";
import Spine from "./Spine";
import "./home.css";

/*
  Home v2, giro 2 (decisioni di Luca, §13 del brief). Stessa pagina nelle tre lingue.
  Ordine: hero centrata · categorie con l'animazione «journey» sotto il titolo · come lavoriamo ·
  casi studio (quattro) · Opportunity Finder · founder · call in fondo. Niente FAQ, niente settori.

  Dal sito originale (testi identici, copie animate in questa cartella): HowWeWorkWow (i tempi dentro sono già
  «circa 7 giorni / su misura»), AuthorityWow (founder). Gli originali components/home/HowWeWork.js e Authority.js non si toccano.
  Altre copie: CasesClassic (quattro casi), OpportunityFinderClassic (la versione di origin/main),
  FinalCtaClassic (la call in fondo; il calendario si carica solo in produzione).

  Fase WOW: la pagina è raccontata dallo scroll. SmoothScroll (Lenis agganciato a ScrollTrigger) e HomeStory (le
  coreografie gsap, sezione per sezione) non disegnano nulla: il HTML è già lo stato finale, visibile anche senza JavaScript.
  Il testo della hero arriva dal server; la hero 3D non è in questo file (components/v2/wow/hero).
  La fascia delle categorie ha fx={false}: gli effetti generici del kit (components/v2/wow/fx: titolo a parole, schede
  che si inclinano, griglia a cascata) qui li fa HomeStory a modo suo, e due motori sullo stesso titolo si pesterebbero.

  Il filo (Spine, stages/spine.js): una linea-segnale al margine sinistro con un pacchetto di luce che scende con lo scroll e
  accende un nodo per sezione, fino al bottone della call. È l'ultimo figlio della pagina e si posiziona misurando le sezioni.

  Toni: la pagina sta dentro .v2-tone-a (default) o .v2-tone-b (?tono=b). Le categorie NON sono più una fascia chiara: il
  blu medio dei toni dava una lastra piatta appena sotto la hero. Ora la fascia è scura (tone="dark"), con una sfumatura
  lunga navy -> blu -> navy; il blu è solo un bagliore dietro la carta «journey», che comincia ben sotto la prima schermata.
  Su questa fascia i due toni sono quindi uguali; cambiano ancora nelle altre pagine del kit.
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
      <main id="main" className={`${tone} v2hp-page`.trim()}>
        <SmoothScroll />
        <HomeStory />
        <PageHero
          size="full"
          eyebrow={c.hero.eyebrow}
          title={c.hero.title}
          highlight={c.hero.highlight}
          subtitle={c.hero.lead}
          primaryCta={{ label: c.hero.cta, href: link("/contact") }}
          secondaryCta={{ label: c.hero.ctaSecondary, href: "#sistemi" }}
          bg={<NetworkHeroBg lang={L} />}
        />

        <Section tone="dark" id="sistemi" className="v2hp-cats" data-wow="cats" fx={false}>
          <div className="v2hp-catstack">
            <SectionHeader align="center" title={c.categories.title} lead={c.categories.lead} />
            <div className="v2hp-journey" role="img" aria-label={c.categories.journeyLabel} data-wow-journey>
              <span className="v2hp-journey__glow" data-journey-glow aria-hidden="true" />
              <div className="v2hp-journey__card" data-wow-journey-card>
                {/* La carta ha il materiale delle tessere: bordo sfumato di 1 px, spessore a gradini, bordo interno luminoso, un riflesso che
                    scorre. Si inclina al mouse (stages/journey.js) dal suo involucro, non dalla carta che lo scroll scala. */}
                <div className="v2hp-journey__tilt" data-journey-tilt>
                  <LoopVideo base={`/media/homepage-journey/${L}`} />
                  <div className="v2hp-journey__clip" aria-hidden="true">
                    <i className="v2hp-journey__sheen" data-journey-sheen />
                    <i className="v2hp-journey__sheen" data-journey-ping />
                  </div>
                  <i className="v2hp-journey__lit" data-journey-lit aria-hidden="true" />
                </div>
                <i className="v2hp-corner v2hp-corner--tl" data-corner aria-hidden="true" />
                <i className="v2hp-corner v2hp-corner--tr" data-corner aria-hidden="true" />
                <i className="v2hp-corner v2hp-corner--bl" data-corner aria-hidden="true" />
                <i className="v2hp-corner v2hp-corner--br" data-corner aria-hidden="true" />
              </div>
            </div>
            <CatNetwork items={c.categories.items} cta={common.ui.learnMore} hrefFor={(slug) => link(`/systems/${slug}`)} />
            {/* i fili fra le card Marketing / Vendita / Amministrazione e la carta «journey» (stages/journey.js, solo schermo largo) */}
            <div className="v2hp-jwires" data-journey-wires aria-hidden="true" />
          </div>
        </Section>

        <HowWeWorkWow lang={L} />
        <CasesClassic locale={L} copy={c.cases} />
        <OpportunityFinderClassic />
        <AuthorityWow lang={L} />
        <FinalCtaClassic live={isProduction()} />
        <Spine />
      </main>
    </AutomisEnShell>
  );
}
