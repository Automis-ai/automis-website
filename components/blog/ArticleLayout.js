import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CTAButton from "@/components/CTAButton";
import FAQSection from "@/components/FAQSection";
import { getAuthor } from "@/lib/authors";
import { slugifyHeading } from "@/lib/blog";

/* Flatten a react-markdown node's text content (for heading anchor ids). */
function nodeText(node) {
  if (!node) return "";
  if (node.value) return node.value;
  if (node.children) return node.children.map(nodeText).join("");
  return "";
}

/* Accepts a YouTube id or any YouTube URL, returns the embed URL (or null). */
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
  // Images are enabled here (the old template stripped them). Alt doubles as caption.
  img: ({ src, alt }) =>
    src ? (
      <figure className="blog-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt || ""} loading="lazy" />
        {alt ? <figcaption>{alt}</figcaption> : null}
      </figure>
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
 * Full moonb-style article page.
 * Dark brand shell (hero band + FAQ/CTA footer) with a LIGHT reading column.
 *
 * @param post    frontmatter + body
 * @param toc     [{ level, text, id }]
 * @param minutes reading time
 * @param related related posts
 * @param locale  "en" | "it"
 * @param labels  UI strings for the locale
 * @param basePath "/blog" | "/it/blog"
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
  const embed = youtubeEmbed(post.youtube);
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString(
        locale === "it" ? "it-IT" : "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      )
    : null;

  return (
    <>
      {/* ── DARK HERO BAND (on-brand) ── */}
      <section className="bg-bg-primary relative z-1 pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {post.category && (
              <Link
                href={`${basePath}?category=${encodeURIComponent(post.category)}`}
                className="inline-block text-yellow-light text-sm font-semibold uppercase tracking-wide mb-4 hover:opacity-80 transition"
              >
                {post.category}
              </Link>
            )}
            <h1
              className="hero-heading text-white mb-6"
              dangerouslySetInnerHTML={{ __html: post.htmlTitle || post.title }}
            />

            {/* meta row: author + date + reading time */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-11 h-11 rounded-full object-cover border border-white/20"
                  loading="lazy"
                />
                <div className="leading-tight">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{author.name}</span>
                    {author.linkedin && (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${author.name} on LinkedIn`}
                        className="text-white/60 hover:text-yellow-light transition"
                      >
                        <i className="fab fa-linkedin" />
                      </a>
                    )}
                  </div>
                  <span className="text-white/60 text-sm">{author.role}</span>
                </div>
              </div>
              <span className="text-white/30">•</span>
              <span className="text-white/70 text-sm">
                {dateStr}
                {dateStr ? " · " : ""}
                {minutes} {labels.minRead}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIGHT READING COLUMN ── */}
      <section className="blog-article-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* hero image */}
            {post.image && (
              <figure className="blog-hero-figure">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt={post.title} loading="eager" />
              </figure>
            )}

            {/* table of contents */}
            {toc.length > 1 && (
              <nav className="blog-toc" aria-label={labels.toc}>
                <p className="blog-toc-title">{labels.toc}</p>
                <ol>
                  {toc.map((h, i) => (
                    <li
                      key={`${h.id}-${i}`}
                      className={h.level === 3 ? "toc-sub" : ""}
                    >
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}

            {/* optional video */}
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

            {/* article body (light prose) */}
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
                  {author.linkedin && (
                    <a
                      href={author.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${author.name} on LinkedIn`}
                    >
                      <i className="fab fa-linkedin" />
                    </a>
                  )}
                </p>
                <p className="blog-author-role">{author.role}</p>
                {author.bio && <p className="blog-author-text">{author.bio}</p>}
              </div>
            </div>

            {/* related posts */}
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

      {/* ── DARK FOOTER BAND: FAQ + CTA (brand shell resumes) ── */}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {post.faqs && post.faqs.length > 0 && (
              <FAQSection
                sectionTitle={labels.faqTitle}
                sectionSubtitle="FAQ"
                sectionDescription=""
                iconClass="fas fa-robot"
                bgColor="bg-bg-primary"
                accentColor="var(--blue-middle)"
                faqs={post.faqs}
              />
            )}

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-blue-middle/20 to-blue-lightest/20 backdrop-blur-lg border border-blue-middle/30 rounded-3xl p-8 md:p-12">
                <h2 className="section-heading text-white mb-4">
                  {labels.ctaTitle}
                </h2>
                <p className="body-text text-white/90 mb-8 max-w-xl mx-auto">
                  {labels.ctaText}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
