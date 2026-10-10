import AutomisEnShell from "@/components/site/AutomisEnShell";
import Hero from "@/components/v2/ui/Hero";
import Accent from "@/components/v2/ui/Accent";
import Section from "@/components/v2/ui/Section";
import SectionHeader from "@/components/v2/ui/SectionHeader";
import ProofStrip from "@/components/v2/ui/ProofStrip";
import CategoryGrid from "@/components/v2/ui/CategoryGrid";
import CategoryCard from "@/components/v2/ui/CategoryCard";
import Steps from "@/components/v2/ui/Steps";
import Button from "@/components/v2/ui/Button";
import CardGrid from "@/components/v2/ui/CardGrid";
import CaseTeaser from "@/components/v2/ui/CaseTeaser";
import Faq from "@/components/v2/ui/Faq";
import CtaBand from "@/components/v2/ui/CtaBand";
import Icon from "@/components/v2/ui/icons";
import OpportunityFinder from "@/components/home/OpportunityFinder";
import FinalCta from "@/components/home/FinalCta";
import { getCopy } from "@/components/v2/copy/getCopy";
import { addLangPrefix } from "@/lib/locales";
import { isProduction } from "@/lib/v2/env";
import CallDemo from "./CallDemo";
import "./home.css";

/*
  Home v2, nelle tre lingue (stessa pagina, testi da getCopy("home", lang)).
  Ordine della §6 del brief: apertura, riga di prova, categorie, come lavoriamo, due casi, Finder, chiusura.
  Toni che si alternano: dark (Hero + prova) · light · deep · light · dark (Finder) · deep · light · dark (calendario).
  Finder e calendario sono i componenti esistenti, avvolti e non toccati: portano i loro testi.
  Il calendario (FinalCta) c'è solo in produzione; sulla preview il suo posto è una CtaBand verso /contact.
*/

const LOGOS = {
  "clinica-santa-maria": { src: "/assets/images/client-logos/clinica-santa-maria.png", width: 67, height: 48, alt: "" },
  adifesa: { src: "/assets/images/client-logos/adifesa.png", width: 89, height: 48, alt: "" },
};

const PHOTOS = {
  "Vincenzo Luca Casillo": "/assets/images/headshots/luca.jpeg",
  "Arcangelo Bianco": "/assets/images/headshots/arcangelo.jpeg",
};

// "Costruiamo il sistema IA che…" con "sistema IA" evidenziato: le parole di `highlight` stanno dentro il titolo.
function withAccent(text, words = []) {
  let nodes = [text];
  words.forEach((w) => {
    nodes = nodes.flatMap((n) => {
      if (typeof n !== "string") return [n];
      const i = n.indexOf(w);
      if (i < 0) return [n];
      return [n.slice(0, i), <Accent key={w}>{w}</Accent>, n.slice(i + w.length)];
    });
  });
  return nodes;
}

export default function HomePage({ lang = "en" }) {
  const L = lang;
  const c = getCopy("home", L);
  const link = (path) => addLangPrefix(path, L);

  return (
    <AutomisEnShell>
      <Hero
        eyebrow={c.hero.eyebrow}
        title={withAccent(c.hero.title, c.hero.highlight)}
        subtitle={c.hero.lead}
        primaryCta={{ label: c.hero.cta, href: link("/contact") }}
        secondaryCta={{ label: c.hero.ctaSecondary, href: link("/use-cases") }}
        media={<CallDemo lang={L} t={c.hero.call} />}
      />

      <Section tone="dark" pad="sm" className="v2h-proofband">
        <ProofStrip
          caption={c.proof.label}
          clients={[
            { name: "Clínica Santa Maria", logo: { src: LOGOS["clinica-santa-maria"].src, width: 67, height: 48, alt: "Clínica Santa Maria" } },
            { name: "ADifesa", logo: { src: LOGOS.adifesa.src, width: 89, height: 48, alt: "ADifesa" } },
          ]}
          number={c.proof.figure}
          numberLabel={c.proof.figureLabel}
        />
      </Section>

      <Section tone="light" id="categories">
        <SectionHeader title={c.categories.title} lead={c.categories.lead} />
        <CategoryGrid>
          {c.categories.items.map((it) => (
            <CategoryCard key={it.slug} title={it.title} line={it.line} icon={it.slug} href={link(`/systems/${it.slug}`)} />
          ))}
        </CategoryGrid>
        <div className="v2h-more">
          <Button href={link("/systems")} variant="link">
            {c.categories.cta}
          </Button>
        </div>
      </Section>

      <Section tone="deep" id="how">
        <SectionHeader title={c.how.title} />
        <Steps items={c.how.steps} />
        <div className="v2h-more">
          <Button href={link("/how-we-work")} variant="secondary">
            {c.how.cta}
          </Button>
        </div>
      </Section>

      <Section tone="light" id="cases">
        <SectionHeader title={c.cases.title} />
        <CardGrid cols={2}>
          {c.cases.items.map((it) => (
            <CaseTeaser
              key={it.slug}
              client={it.client}
              logo={LOGOS[it.slug]}
              number={it.figure}
              numberLabel={it.figureLabel}
              system={it.system}
              href={link(it.href)}
              linkLabel={it.cta}
            />
          ))}
        </CardGrid>
        <div className="v2h-more">
          <Button href={link("/use-cases")} variant="link">
            {c.cases.all}
          </Button>
        </div>
      </Section>

      <div className="v2h-legacy">
        <OpportunityFinder />
      </div>

      <Section tone="deep" id="founders">
        <SectionHeader title={c.founders.title} lead={c.founders.line} />
        <div className="v2h-founders">
          {c.founders.items.map((f) => (
            <article className="v2-card v2h-founder" key={f.name}>
              <img src={PHOTOS[f.name]} alt={f.name} width={72} height={72} loading="lazy" decoding="async" />
              <div>
                <h3 className="v2h-founder__name">{f.name}</h3>
                <p className="v2h-founder__role">{f.role}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="v2-card v2h-guarantee">
          <span className="v2-tile">
            <Icon name="shield" size={24} />
          </span>
          <div>
            <h3 className="v2h-guarantee__title">{c.guarantee.title}</h3>
            <p className="v2h-guarantee__line">{c.guarantee.line}</p>
          </div>
        </div>
      </Section>

      <Section tone="light" width="narrow" id="faq">
        <SectionHeader title={c.faq.title} />
        <Faq jsonLd items={c.faq.items.map((q) => ({ question: q.q, answer: q.a }))} />
      </Section>

      {/* Il calendario (iframe + script di LeadConnector) esce verso l'esterno: lo carica solo la produzione.
          Sulla preview al suo posto c'è l'invito a /contact, così nessuna richiesta parte e nessuno prenota per sbaglio. */}
      {isProduction() ? (
        <FinalCta />
      ) : (
        <CtaBand id="book" title={c.book.title} line={c.book.lead} button={{ label: c.hero.cta, href: link("/contact") }} />
      )}
    </AutomisEnShell>
  );
}
