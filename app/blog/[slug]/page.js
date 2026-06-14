import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTAButton from "@/components/CTAButton";
import FAQSection from "@/components/FAQSection";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";

// Tell Next.js which slugs exist at build time
export async function generateStaticParams() {
  const slugs = getAllSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug, "en");
  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const BlogPostPage = ({ params }) => {
  const post = getPostBySlug(params.slug, "en");
  if (!post) notFound();

  return (
    <AkpagerLayout>
      {/* ── HERO ── */}
      <section
        className="hero-padding bg-bg-primary relative z-1 bgs-cover text-center"
        style={{
          backgroundImage: `url(${
            post.image || "/assets/images/backgrounds/banner.jpg"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative">
            <h1
              className="hero-heading text-white mb-6"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
              dangerouslySetInnerHTML={{
                __html: post.htmlTitle || post.title,
              }}
            />
            <div
              className="text-yellow-light text-lg"
              data-aos="fade-up"
              data-aos-delay={50}
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              {post.category}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="section-padding bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Markdown body */}
            <div className="blog-prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.body}
              </ReactMarkdown>
            </div>

            {/* ── CTA ── */}
            <div
              className="mt-16 text-center"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="bg-gradient-to-r from-blue-middle/20 to-blue-lightest/20 backdrop-blur-lg border border-blue-middle/30 rounded-3xl p-8 md:p-12 max-w-3xl mx-auto">
                <h2 className="section-heading text-white mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="body-text text-white/90 mb-8 max-w-xl mx-auto">
                  Discover how our AI-powered solutions can help you scale
                  faster, convert more leads, and automate your business
                  operations.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    external={true}
                    variant="primary"
                    size="large"
                  >
                    Book Discovery Call
                  </CTAButton>
                  <CTAButton href="/contact" variant="secondary" size="large">
                    Learn More
                  </CTAButton>
                </div>
              </div>
            </div>

            {/* ── FAQ ── */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-12">
                <FAQSection
                  sectionTitle="Frequently Asked Questions"
                  sectionSubtitle="FAQ"
                  sectionDescription=""
                  iconClass="fas fa-robot"
                  bgColor="bg-black"
                  accentColor="var(--blue-middle)"
                  faqs={post.faqs}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default BlogPostPage;