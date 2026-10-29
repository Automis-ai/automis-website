import "@css/fontawesome-5.14.0.min.css";
import "./guide-article.css";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import BlogToc from "@/components/blog/BlogToc";
import CTAButton from "@/components/CTAButton";
import { getAuthor, getAuthorRole, getAuthorSocials, SOCIAL_ICON, SOCIAL_LABEL } from "@/lib/authors";

// Testi e immagini che dipendono solo dalla lingua. Il resto arriva da `t` (page.js).
const LOCALE = {
  it: {
    avatar: "/luca-ig/luca-linkedin.jpg",
    facts: ["14 passi", "Codice completo", "Prove incluse", "PDF scaricabile"],
    start: "Inizia dal primo passo",
  },
  en: {
    avatar: "/manychat-alternative/arcangelo.jpg",
    facts: ["14 steps", "Full code", "Tests included", "Downloadable PDF"],
    start: "Start with step 1",
  },
};

// «…su Instagram, passo per passo» -> il titolo, e la coda in evidenza
function splitTitle(title) {
  const i = title.lastIndexOf(", ");
  return i > 0 ? [title.slice(0, i + 1), title.slice(i + 2)] : [title, ""];
}

// Pagina della guida (dietro cookie) con menu del sito, indice laterale che segue la lettura e colonna
// chiara. L'apertura è chiara e con il ritratto dell'autore; resta noindex: è la parte riservata.
export default function GuideArticle({ locale, t, children }) {
  const L = LOCALE[locale];
  const author = getAuthor(t.authorKey);
  const role = getAuthorRole(author, locale);
  const socials = getAuthorSocials(author);
  const [head, accent] = splitTitle(t.title);

  return (
    <AutomisEnShell bodyClass="blog-article-page">
      <div className="blog-light g-page">
        <section className="g-hero">
          <div className="g-hero-inner">
            <div className="g-hero-text">
              <p className="g-eyebrow">
                <span>{t.category}</span>
                <i aria-hidden="true" />
                <span>{t.updated}</span>
              </p>
              <h1>
                {head} {accent ? <em>{accent}</em> : null}
              </h1>
              <p className="g-lead">{t.lead}</p>

              <ul className="g-facts">
                {L.facts.map((f) => <li key={f}>{f}</li>)}
              </ul>

              <div className="g-author">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={L.avatar} alt={author.name} width="46" height="46" />
                <div>
                  <b>
                    {author.name}
                    {socials.map((s) => (
                      <a
                        key={s.url}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${author.name} on ${SOCIAL_LABEL[s.type] || s.type}`}
                      >
                        <i className={SOCIAL_ICON[s.type] || "fab fa-link"} />
                      </a>
                    ))}
                  </b>
                  <span>{role}</span>
                </div>
              </div>
            </div>

            <aside className="g-side">
              <a className="g-pdf" href={t.pdf} download>
                <span>
                  <b>{t.pdfTitle}</b>
                  <small>{t.pdfSub}</small>
                </span>
                <span className="g-go" aria-hidden="true">↓</span>
              </a>
              <a className="g-ghost" href="#step-1">{L.start} ↓</a>
              <p className="g-note">
                <b>{t.noteTitle}</b> {t.note}
              </p>
            </aside>
          </div>
        </section>

        <section className="g-body">
          <div className="blog-body-inner">
            <aside className="blog-body-aside">
              <BlogToc toc={t.toc} label={t.tocLabel} />
            </aside>

            <div className="blog-body-main">
              <div className="blog-article">{children}</div>

              <div className="blog-cta">
                <h2>{t.ctaTitle}</h2>
                <p>{t.ctaText}</p>
                <div className="blog-cta-actions">
                  <CTAButton href={t.call} external={true} variant="primary" size="large">
                    {t.ctaButton}
                  </CTAButton>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </AutomisEnShell>
  );
}
