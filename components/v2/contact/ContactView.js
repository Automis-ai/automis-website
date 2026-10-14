import PageHero from "@/components/v2/ui/PageHero";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Icon from "@/components/v2/ui/icons";
import { pageClass } from "@/components/v2/ui/toneClass";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import ContactForm from "@/components/contact/ContactForm";
import { getCopy } from "@/components/v2/copy/getCopy";
import { isProduction } from "@/lib/v2/env";
import SmoothScroll from "@/components/v2/wow/scroll/SmoothScroll";
import PageStory from "@/components/v2/wow/fx/PageStory";
import CallBooking from "./CallBooking";
import { heroTitle } from "@/components/v2/systems/heroTitle";
import ReachUs from "./ReachUs";
import "./contact.css";

/* Parliamo: in alto il Finder, poi il calendario per prenotare la call, in fondo e più piccolo il modulo.
   Il Finder e il modulo sono i componenti di oggi (portano il loro testo e la loro lingua).
   Il ritmo: scuro (apertura e Finder), un solo momento blu (calendario), scuro (modulo). Cornice e metadati stanno nel file
   di rotta. `tono`: ?tono= della preview. */
export default function ContactView({ lang, tono }) {
  const t = getCopy("contact", lang);
  const c = getCopy("common", lang);

  return (
    <main id="main" className={pageClass(tono)}>
      <SmoothScroll />
      <PageStory />
      {lang === "it" ? (
        <PageHeroV3
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          highlight={t.hero.accent}
          lead={t.hero.lead}
          cta={{ label: c.booking.cta, href: "#book" }}
        />
      ) : (
        <PageHero
          size="compact"
          className="v2c-hero"
          eyebrow={t.hero.eyebrow}
          {...heroTitle(t.hero.title, t.hero.accent)}
          subtitle={t.hero.lead}
          primaryCta={{ label: c.booking.cta, href: "#book" }}
        >
          {/* Le due rassicurazioni promettono un calendario vero: in anteprima (calendario spento) non si mostrano. */}
          {isProduction() ? (
            <ul className="v2c-heroline">
              {[c.booking.instant, c.booking.noObligation].map((b) => (
                <li key={b}>
                  <Icon name="check" size={15} strokeWidth={2.6} />
                  {b}
                </li>
              ))}
            </ul>
          ) : null}
        </PageHero>
      )}

      {/* Il Finder è una sezione del sito originale, non una fascia del kit: il contenitore con la classe del tono scuro
          dice alla fascia che segue da che colore partire (sfumatura, mai un taglio netto). */}
      <div className="v2-tone-dark v2c-finder">
        <OpportunityFinder title={t.finder.title} lead={t.finder.lead} />
      </div>

      <Section tone="light" id="book">
        <div className="v2c-book">
          <div className="v2c-book__intro">
            <SectionHeader title={t.booking.title} lead={t.booking.lead} />
            <ul className="v2c-checks">
              {c.booking.bullets.map((b) => (
                <li key={b}>
                  <span className="v2c-tick" aria-hidden="true">
                    <Icon name="check" size={15} strokeWidth={2.6} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="v2c-frame">
            <CallBooking loadingLabel={c.booking.loading} previewNote={t.booking.previewNote} />
          </div>
        </div>
      </Section>

      {/* id "write-us" e non "message": il textarea del modulo ha id="message" e la sua etichetta (for="message") puntava alla fascia */}
      <Section tone="dark" id="write-us" aria-labelledby="write-us-title">
        <SectionHeader className="v2c-formhead" id="write-us-title" title={t.form.title} />
        <div className="v2c-form">
          <ContactForm copy={t.form} />
          <ReachUs
            lang={lang}
            title={t.aside.reachTitle}
            emailLabel={t.aside.emailLabel}
            followLabel={t.aside.followLabel}
          />
        </div>
      </Section>
    </main>
  );
}
