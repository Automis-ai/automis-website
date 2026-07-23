import { Suspense } from "react";
import AutomisEnShell from "@/components/site/AutomisEnShell";
import BlogIndex from "@/components/blog/BlogIndex";
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
    <AutomisEnShell>
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
            backgroundImage: "url(/assets/images/backgrounds/wave-shape.png)",
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

      {/* ── POSTS + CATEGORY FILTER ── */}
      <Suspense fallback={null}>
        <BlogIndex
          posts={posts}
          basePath="/blog"
          labels={{ readMore: "Read More", empty: "No articles published yet. Check back soon." }}
        />
      </Suspense>
    </AutomisEnShell>
  );
};

export default BlogPage;
