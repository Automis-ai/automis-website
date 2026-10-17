import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import BlogIndex from "@/components/blog/BlogIndex";
import BlogLanguageLinks from "@/components/blog/BlogLanguageLinks";
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
      "pt-PT": "https://automis.ai/pt/blog",
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
    images: ["/assets/og/home-en.png"],
  },
};

const BlogPage = async () => {
  const posts = getAllPosts("en");

  return (
    <AutomisEnShell>
      {/* ── HERO (v3) ── */}
      <PageHeroV3
        eyebrow="Insights & Updates"
        title="Discover Our Latest Insights"
        highlight="Latest Insights"
        lead="Explore expert articles on AI-powered marketing, automation strategies, and growth tactics to transform your business"
        cta={{ label: "Browse articles", href: "#articoli" }}
      />

      {/* ── POSTS + CATEGORY FILTER ── */}
      <BlogLanguageLinks locale="en" />

      {/* Niente <Suspense> qui: BlogIndex non usa piu' useSearchParams,
          e un boundary attorno a un componente che non sospende e' solo una
          trappola — chi reintroducesse un hook dinamico perderebbe i link
          agli articoli dall'HTML servito in silenzio, invece di far
          fallire la build. */}
      <BlogIndex
        posts={posts}
        basePath="/blog"
        labels={{ readMore: "Read More", empty: "No articles published yet. Check back soon." }}
      />
    </AutomisEnShell>
  );
};

export default BlogPage;
