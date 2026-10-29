import "@css/fontawesome-5.14.0.min.css";
import "./guide-article.css";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import BlogToc from "@/components/blog/BlogToc";
import CTAButton from "@/components/CTAButton";
import { getAuthor, getAuthorRole, getAuthorSocials, SOCIAL_ICON, SOCIAL_LABEL } from "@/lib/authors";

// Pagina della guida (dietro cookie) con lo scheletro degli articoli del blog: menu del sito, hero scuro
// con autore, indice laterale che segue la lettura, colonna chiara. Resta noindex: è la parte riservata.
export default function GuideArticle({ locale, t, children }) {
  const author = getAuthor(t.authorKey);
  const role = getAuthorRole(author, locale);
  const socials = getAuthorSocials(author);

  return (
    <AutomisEnShell bodyClass="blog-article-page">
      <div className="blog-light">
        <section className="blog-hero">
          <div className="blog-hero-inner">
            <div className="blog-hero-text">
              <div className="blog-hero-meta">
                <span className="blog-hero-cat">{t.category}</span>
                <span className="dot">·</span>
                <span>{t.updated}</span>
                <span className="dot">·</span>
                <span>{t.steps}</span>
              </div>
              <h1 className="blog-hero-title">{t.title}</h1>
              <p className="blog-hero-sub">{t.lead}</p>
              <div className="blog-author-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.avatar} alt={author.name} width="46" height="46" />
                <div>
                  <span className="blog-author-line">
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
                  </span>
                  <span className="blog-author-sub">{role}</span>
                </div>
              </div>
            </div>
            <div className="g-hero-card">
              <a className="g-pdf" href={t.pdf} download>
                <span>
                  <b>{t.pdfTitle}</b>
                  <small>{t.pdfSub}</small>
                </span>
                <span className="g-go" aria-hidden="true">↓</span>
              </a>
              <p className="g-note">
                <b>{t.noteTitle}</b> {t.note}
              </p>
            </div>
          </div>
        </section>

        <section className="blog-body">
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
