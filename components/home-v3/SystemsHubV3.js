import Link from "next/link";
import { addLangPrefix } from "@/lib/locales";
import { getCopy } from "@/components/v2/copy/getCopy";
import PageHeroV3 from "./PageHeroV3";
import { Icon } from "./HomeV3";
import { homeCopy } from "./copy";
import "./home-v3.css";

/*
  /systems nella versione v3 (solo IT per ora): hero compatta, le cinque aree in vetro con «Il problema» (stessi testi delle
  schede della home), i due prodotti, chiusura con il Finder. Mockup approvato il 13-14/10: ~/Automations/sandbox/web-motion/systems-v3/hub.html.
*/
export default function SystemsHubV3({ locale = "it" }) {
  const h = homeCopy(locale);
  const t = h.hub;
  const products = getCopy("systems", locale).hub.products.items;
  const productHref = { voice: "/voice-ai", ecommerce: "/ecommerce" };

  return (
    <main id="main">
      <PageHeroV3
        eyebrow={t.hero.eyebrow}
        title={t.hero.title}
        highlight={t.hero.highlight}
        lead={t.hero.lead}
        cta={{ label: t.hero.cta, href: "#aree" }}
      />

      <section id="aree" className="hv3 hv3-tone hv3-hub">
        <div className="hv3-head">
          <span className="hv3-eyebrow">{t.areas.eyebrow}</span>
          <h2 className="hv3-h2 font-display">{t.areas.title}</h2>
        </div>
        <div className="hv3-hub__grid">
          {h.systems.items.map((s) => (
            <article key={s.slug} className="hv3-scard">
              <span className="hv3-scard__ico">
                <Icon k={s.slug} />
              </span>
              <h3 className="font-display">{s.title}</h3>
              <p className="hv3-scard__line">{s.line}</p>
              <div className="hv3-scard__pain">
                <b>{h.systems.pain}</b>
                <span>{s.pain}</span>
              </div>
              <Link className="hv3-scard__go" href={addLangPrefix(`/systems/${s.slug}`, locale)}>
                {h.systems.more} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="hv3 hv3-products" aria-labelledby="hub-prodotti">
        <div className="hv3-head">
          <span className="hv3-eyebrow">{t.products.eyebrow}</span>
          <h2 id="hub-prodotti" className="hv3-h2 font-display">
            {t.products.title}
          </h2>
        </div>
        <div className="hv3-products__grid">
          {products.map((p) => (
            <Link key={p.id} href={addLangPrefix(productHref[p.id], locale)} className="hv3-pcard">
              <span className="hv3-pcard__tag">{p.price || t.products.tagFallback}</span>
              <h3 className="font-display">{p.name}</h3>
              <p>{p.line}</p>
              <span className="hv3-scard__go">
                {p.cta} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="hv3 hv3-hubcta">
        <div className="hv3-head">
          <span className="hv3-eyebrow">{t.cta.eyebrow}</span>
          <h2 className="hv3-h2 font-display">{t.cta.title}</h2>
          <p className="hv3-lead">{t.cta.line}</p>
          <div className="hv3-ctas">
            <Link className="hv3-btn hv3-btn--p" href={`${addLangPrefix("/", locale)}#opportunity-finder`}>
              {t.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
