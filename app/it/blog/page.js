import AutomisEnShell from "@/components/site/AutomisEnShell";
import PageHeroV3 from "@/components/home-v3/PageHeroV3";
import BlogIndex from "@/components/blog/BlogIndex";
import BlogLanguageLinks from "@/components/blog/BlogLanguageLinks";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog | Guide su automazione e IA per il tuo business | Automis",
  description:
    "Guide pratiche su agenti vocali IA, automazioni e sistemi per i contatti, pensate per attività locali e professionisti. Dal team di Automis.",
  alternates: {
    canonical: "https://automis.ai/it/blog",
    languages: {
      en: "https://automis.ai/blog",
      "it-IT": "https://automis.ai/it/blog",
      "pt-PT": "https://automis.ai/pt/blog",
      "x-default": "https://automis.ai/blog",
    },
  },
  openGraph: {
    title: "Blog Automis | Guide su automazione e IA per il tuo business",
    description:
      "Guide pratiche su agenti vocali IA, automazioni e sistemi per i contatti, per attività locali e professionisti.",
    url: "https://automis.ai/it/blog",
    siteName: "Automis",
    type: "website",
    images: ["/assets/og/home-en.png"],
  },
};

const BlogPage = async () => {
  const posts = getAllPosts("it");

  return (
    <AutomisEnShell>
      {/* ── HERO (v3) ── */}
      <PageHeroV3
        eyebrow="Articoli & Aggiornamenti"
        title="Scopri le nostre ultime novità"
        highlight="ultime novità"
        lead="Esplora articoli su marketing potenziato dall'AI, strategie di automazione e tattiche di crescita per trasformare il tuo business"
        cta={{ label: "Vai agli articoli", href: "#articoli" }}
      />

      {/* ── POSTS + CATEGORY FILTER ── */}
      <BlogLanguageLinks locale="it" />

      {/* Niente <Suspense> qui: BlogIndex non usa piu' useSearchParams,
          e un boundary attorno a un componente che non sospende e' solo una
          trappola — chi reintroducesse un hook dinamico perderebbe i link
          agli articoli dall'HTML servito in silenzio, invece di far
          fallire la build. */}
      <BlogIndex
        posts={posts}
        basePath="/it/blog"
        labels={{ readMore: "Leggi di più", empty: "Nessun articolo pubblicato. Torna presto." }}
      />
    </AutomisEnShell>
  );
};

export default BlogPage;
