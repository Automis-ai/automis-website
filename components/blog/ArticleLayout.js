import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CTAButton from "@/components/CTAButton";
import BlogToc from "@/components/blog/BlogToc";
import { getAuthor, SOCIAL_ICON } from "@/lib/authors";
import { slugifyHeading } from "@/lib/blog";

/* Flatten a react-markdown node's text content (for heading anchor ids). */
function nodeText(node) {
  if (!node) return "";
  if (node.value) return node.value;
  if (node.children) return node.children.map(nodeText).join("");
  return "";
}

function youtubeEmbed(input) {
  if (!input) return null;
  const s = String(input).trim();
  if (/^[\w-]{11}$/.test(s)) return `https://www.youtube.com/embed/${s}`;
  const m = s.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

const mdComponents = {
  h2: ({ node, children }) => (
    <h2 id={slugifyHeading(nodeText(node))}>{children}</h2>
  ),
  h3: ({ node, children }) => (
    <h3 id={slugifyHeading(nodeText(node))}>{children}</h3>
  ),
  // react-markdown wraps images in a <p>, so use <span>s (display:block via CSS).
  img: ({ src, alt }) =>
    src ? (
      <span className="blog-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ""} loading="lazy" decoding="async" />
        {alt ? <span className="blog-figcaption">{alt}</span> : null}
      </span>
    ) : null,
  a: ({ href, children }) => {
    const external = href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
};

/**
 * moonb-style article: fully light, 2-column hero (text + illustration),
 * sticky "Contents" sidebar with the reading column beside it.
 */
export default function ArticleLayout({
  post,
  toc = [],
  minutes,
  related = [],
  locale = "en",
  labels,
  basePath = "/blog",
}) {
  const author = getAuthor(post.author);
  const authorRole =
    locale === "it" ? author.roleIt || author.role : author.role;
  const authorBio = locale === "it" ? author.bioIt || author.bio : author.bio;
  const socialIcon =
    (author.social && SOCIAL_ICON[author.social.type]) || "fab fa-linkedin";
  const socialUrl = author.social && author.social.url;
  const embed = youtubeEmbed(post.youtube);
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString(
        locale === "it" ? "it-IT" : "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : null;

  // ── JSON-LD ──
  const canonical = `https://automis.ai${basePath}/${post.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.description,
    ...(post.image ? { image: [post.image] } : {}),
    ...(post.date ? { datePublished: post.date, dateModified: post.date } : {}),
    author: {
      "@type": "Person",
      name: author.name,
      ...(socialUrl ? { url: socialUrl } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "Automis",
      logo: {
        "@type": "ImageObject",
        url: "https://automis.ai/assets/images/logos/favicon.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    inLanguage: locale === "it" ? "it-IT" : "en",
  };
  const faqLd =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const authorBlock = (
    <div className="blog-author-row">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={author.avatar} alt={author.name} loading="lazy" />
      <div>
        <span className="blog-author-line">
          {author.name}
          {socialUrl && (
            <a
              href={socialUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${author.name} on ${author.social.type}`}
            >
              <i className={socialIcon} />
            </a>
          )}
        </span>
        <span className="blog-author-sub">{authorRole}</span>
      </div>
    </div>
  );

  return (
    <div className="blog-light">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      )}

      {/* ── HERO (light, 2 columns) ── */}
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <div className="blog-hero-text">
            <div className="blog-hero-meta">
              {post.category && (
                <Link
                  href={`${basePath}?category=${encodeURIComponent(
                    post.category
                  )}`}
                  className="blog-hero-cat"
                >
                  {post.category}
                </Link>
              )}
              {dateStr && <span className="dot">·</span>}
              {dateStr && <span>{dateStr}</span>}
              <span className="dot">·</span>
              <span>
                {minutes} {labels.minRead}
              </span>
            </div>
            <h1 className="blog-hero-title">{post.title}</h1>
            {post.description && (
              <p className="blog-hero-sub">{post.description}</p>
            )}
            {authorBlock}
          </div>
          {post.image && (
            <div className="blog-hero-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} loading="eager" />
            </div>
          )}
        </div>
      </section>

      {/* ── BODY: sticky Contents sidebar + reading column ── */}
      <section className="blog-body">
        <div className="blog-body-inner">
          <aside className="blog-body-aside">
            <BlogToc toc={toc} label={labels.toc} />
          </aside>

          <div className="blog-body-main">
            {embed && (
              <div className="blog-video">
                <iframe
                  src={embed}
                  title={post.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            <div className="blog-article">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                {post.body}
              </ReactMarkdown>
            </div>

            {/* author bio */}
            <div className="blog-author-bio">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={author.avatar} alt={author.name} loading="lazy" />
              <div>
                <p className="blog-author-name">
                  {author.name}
                  {socialUrl && (
                    <a
                      href={socialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${author.name} on ${author.social.type}`}
                    >
                      <i className={socialIcon} />
                    </a>
                  )}
                </p>
                <p className="blog-author-role">{authorRole}</p>
                {authorBio && <p className="blog-author-text">{authorBio}</p>}
              </div>
            </div>

            {/* FAQ (light) */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="blog-faq">
                <h2>{labels.faqTitle}</h2>
                {post.faqs.map((f, i) => (
                  <details key={i} className="blog-faq-item">
                    <summary>{f.question}</summary>
                    <p>{f.answer}</p>
                  </details>
                ))}
              </div>
            )}

            {/* CTA (contained brand card) */}
            <div className="blog-cta">
              <h2>{labels.ctaTitle}</h2>
              <p>{labels.ctaText}</p>
              <div className="blog-cta-actions">
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                  external={true}
                  variant="primary"
                  size="large"
                >
                  {labels.ctaPrimary}
                </CTAButton>
                <CTAButton
                  href={locale === "it" ? "/it/contact" : "/contact"}
                  variant="secondary"
                  size="large"
                >
                  {labels.ctaSecondary}
                </CTAButton>
              </div>
            </div>

            {/* related */}
            {related.length > 0 && (
              <div className="blog-related">
                <h2>{labels.related}</h2>
                <div className="blog-related-grid">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`${basePath}/${r.slug}`}
                      className="blog-related-card"
                    >
                      {r.image && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={r.image} alt={r.title} loading="lazy" />
                      )}
                      <div className="blog-related-body">
                        {r.category && (
                          <span className="blog-related-cat">{r.category}</span>
                        )}
                        <span className="blog-related-title">{r.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
