import AkpagerLayout from "@/layouts/AkpagerLayout";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | AI automation insights for local business | Automis",
  description:
    "Practical guides on AI voice agents, automation, and lead systems for local businesses and professionals, from the Automis team.",
  alternates: {
    canonical: "https://automis.ai/blog",
    languages: {
      en: "https://automis.ai/blog",
      "it-IT": "https://automis.ai/it/blog",
      "x-default": "https://automis.ai/blog",
    },
  },
  openGraph: {
    title: "Automis Blog | AI automation insights for local business",
    description:
      "Practical guides on AI voice agents, automation, and lead systems for local businesses and professionals.",
    url: "https://automis.ai/blog",
    siteName: "Automis",
    type: "website",
  },
};

const BlogPage = async () => {
  const posts = getAllPosts("en");

  return (
    <AkpagerLayout>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-bg-primary hero-padding">
        {/* background blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-middle/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-lightest/5 rounded-full blur-3xl" />
        </div>

        {/* gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary pointer-events-none" />

        {/* subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "url(assets/images/backgrounds/wave-shape.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span
              className="inline-flex items-center gap-2 bg-blue-darkest/30 backdrop-blur-lg text-blue-middle px-6 py-3 rounded-xl small-text font-medium mb-6 border border-blue-middle/20"
              data-aos="fade-up"
              data-aos-duration={1500}
            >
              <i className="fas fa-blog" />
              Insights &amp; Updates
            </span>

            <h1
              className="hero-heading mb-6"
              data-aos="fade-up"
              data-aos-delay={100}
              data-aos-duration={1500}
            >
              <span className="text-white">Discover Our</span>{" "}
              <span className="text-text-blue">Latest Insights</span>
            </h1>

            <p
              className="sub-heading text-white/90 mb-8 leading-relaxed"
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={1500}
            >
              Explore expert articles on AI-powered marketing, automation
              strategies, and <br />
              growth tactics to transform your business
            </p>
          </div>
        </div>
      </section>

      {/* ── POSTS ── */}
      <section className="section-padding bg-bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            {/* LEFT: posts */}
            <div className="px-4 lg:w-2/3">
              <div className="space-y-8">
                {posts.map((post, index) => (
                  <div
                    key={post.slug}
                    className="bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 rounded-2xl overflow-hidden hover:bg-yellow-light/30 hover:border-yellow-light/30 transition-all duration-300 group"
                    data-aos="fade-up"
                    data-aos-duration={800}
                    data-aos-delay={100 + index * 100}
                    data-aos-offset={50}
                  >
                    {/* Image */}
                    {post.image && (
                      <div className="relative overflow-hidden h-80">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-8">
                      <ul className="flex flex-wrap items-center gap-4 mb-4">
                        {post.category && (
                          <li>
                            <span className="px-3 py-1 bg-blue-middle/20 text-blue-middle rounded-full hover:bg-yellow-light/20 hover:text-yellow-light transition-all duration-300 small-text">
                              {post.category}
                            </span>
                          </li>
                        )}
                        {post.date && (
                          <li className="flex items-center gap-2 text-white/90">
                            <i className="far fa-calendar-alt" />
                            <span className="small-text">
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          </li>
                        )}
                      </ul>

                      <h2 className="card-heading font-medium mb-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-white hover:text-yellow-light transition-all duration-300"
                          dangerouslySetInnerHTML={{
                            __html: post.htmlTitle || post.title,
                          }}
                        />
                      </h2>

                      <p className="body-text text-white/90 mb-6 leading-relaxed">
                        {post.description}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-blue-middle hover:text-yellow-light transition-all duration-300 font-medium group"
                      >
                        Read More{" "}
                        <i className="far fa-arrow-right transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                ))}

                {posts.length === 0 && (
                  <p className="body-text text-white/60 text-center py-12">
                    No articles published yet. Check back soon.
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT: CTA sidebar */}
            <div className="px-4 lg:w-1/3">
              <div className="space-y-8 mt-8 lg:mt-0">
                <div
                  className="relative bg-blue-darkest/30 backdrop-blur-lg border border-blue-middle/20 p-8 rounded-2xl overflow-hidden hover:border-yellow-light/30 transition-all duration-300 group"
                  data-aos="fade-left"
                  data-aos-delay={400}
                  data-aos-duration={800}
                  data-aos-offset={50}
                >
                  <h3 className="sub-heading font-medium text-white mb-4 relative z-10">
                    Ready to Transform Your Business with AI?
                  </h3>
                  <p className="body-text text-white/90 mb-6 relative z-10">
                    Book a free consultation to discover how AI automations can
                    help you scale faster and more efficiently.
                  </p>
                  <CTAButton
                    href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                    external={true}
                    variant="primary"
                    size="medium"
                    icon="fas fa-angle-double-right"
                    className="relative z-10"
                  >
                    Book Discovery Call
                  </CTAButton>
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30">
                    <img
                      src="assets/images/widget/cta-man.png"
                      alt="Call-to-action promotional graphic"
                      className="w-full h-full object-contain opacity-60"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "url(assets/images/widget/cta-bg.png)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AkpagerLayout>
  );
};

export default BlogPage;
