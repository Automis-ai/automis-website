import Hero from "@/components/v2/ui/Hero";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import Icon from "@/components/v2/ui/icons";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import ContactForm from "@/components/contact/ContactForm";
import { getCopy } from "@/components/v2/copy/getCopy";
import { withAccent } from "@/components/v2/about/withAccent";
import CallBooking from "./CallBooking";
import ReachUs from "./ReachUs";
import "./contact.css";

/* Parliamo: in alto il Finder, poi il calendario per prenotare la call, in fondo e più piccolo il modulo.
   Il Finder e il modulo sono i componenti di oggi (portano il loro testo e la loro lingua).
   Il ritmo: scuro (Hero), blu (Finder), chiaro (calendario), blu (modulo). Cornice e metadati stanno nel file di rotta. */
export default function ContactView({ lang }) {
  const t = getCopy("contact", lang);
  const c = getCopy("common", lang);

  return (
    <>
      <Hero
        className="v2c-hero"
        eyebrow={t.hero.eyebrow}
        title={withAccent(t.hero.title, t.hero.accent)}
        subtitle={t.hero.lead}
        primaryCta={{ label: c.booking.cta, href: "#book" }}
        media={
          <div className="v2-card v2c-herocard">
            <span className="v2-tile" aria-hidden="true">
              <Icon name="calendar" size={24} />
            </span>
            <p className="v2c-herocard__title">{c.booking.availability}</p>
            <ul className="v2c-checks">
              {[c.booking.instant, c.booking.noObligation].map((b) => (
                <li key={b}>
                  <span className="v2c-tick" aria-hidden="true">
                    <Icon name="check" size={15} strokeWidth={2.6} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <OpportunityFinder title={t.finder.title} lead={t.finder.lead} />

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

      <Section tone="deep" id="message">
        <SectionHeader className="v2c-formhead" title={t.form.title} />
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
    </>
  );
}
