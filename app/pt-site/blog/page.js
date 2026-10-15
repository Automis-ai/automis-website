import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import BlogIndex from "@/components/blog/BlogIndex";
import BlogLanguageLinks from "@/components/blog/BlogLanguageLinks";
import { getAllPosts } from "@/lib/blog";

// Served publicly at /pt/blog (middleware rewrites /pt/* -> /pt-site/*).
export const metadata = {
  title: "Blog | Guias de automação e IA para o seu negócio | Automis",
  description:
    "Guias práticos sobre agentes de voz com IA, automações e sistemas de contactos, pensados para negócios locais e profissionais. Da equipa da Automis.",
  alternates: {
    canonical: "https://automis.ai/pt/blog",
    languages: {
      en: "https://automis.ai/blog",
      "it-IT": "https://automis.ai/it/blog",
      "pt-PT": "https://automis.ai/pt/blog",
      "x-default": "https://automis.ai/blog",
    },
  },
  openGraph: {
    title: "Blog Automis | Guias de automação e IA para o seu negócio",
    description:
      "Guias práticos sobre agentes de voz com IA, automações e sistemas de contactos, para negócios locais e profissionais.",
    url: "https://automis.ai/pt/blog",
    siteName: "Automis",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
};

const BlogPage = async () => {
  const posts = getAllPosts("pt");

  return (
    <AutomisEnShell>
      {/* ── HERO (v3) ── */}
      <PageHeroV3
        eyebrow="Artigos & Novidades"
        title="Descubra as nossas últimas novidades"
        highlight="últimas novidades"
        lead="Explore artigos sobre marketing potenciado por IA, estratégias de automação e táticas de crescimento para transformar o seu negócio"
        cta={{ label: "Ver artigos", href: "#articoli" }}
      />

      {/* ── POSTS + CATEGORY FILTER ── */}
      <BlogLanguageLinks locale="pt" />

      {/* Niente <Suspense> qui: BlogIndex non usa piu' useSearchParams,
          e un boundary attorno a un componente che non sospende e' solo una
          trappola — chi reintroducesse un hook dinamico perderebbe i link
          agli articoli dall'HTML servito in silenzio, invece di far
          fallire la build. */}
      <BlogIndex
        posts={posts}
        basePath="/pt/blog"
        labels={{
          readMore: "Ler mais",
          empty: "Ainda não há artigos publicados. Volte em breve.",
        }}
      />
    </AutomisEnShell>
  );
};

export default BlogPage;
