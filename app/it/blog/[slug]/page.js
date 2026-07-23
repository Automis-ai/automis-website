import AutomisEnShell from "@/components/site/AutomisEnShell";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/blog/ArticleLayout";
import {
  getPostBySlug,
  getAllSlugs,
  extractToc,
  readingTimeMinutes,
  getRelatedPosts,
} from "@/lib/blog";

// Tell Next.js which slugs exist at build time
export function generateStaticParams() {
  const slugs = getAllSlugs("it");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug, "it");
  if (!post) {
    return {
      title: "Articolo non trovato",
      description: "L'articolo richiesto non è disponibile.",
    };
  }
  const url = `https://automis.ai/it/blog/${params.slug}`;
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    alternates: {
      canonical: url,
      languages: {
        en: `https://automis.ai/blog/${params.slug}`,
        "it-IT": `https://automis.ai/it/blog/${params.slug}`,
        "x-default": `https://automis.ai/blog/${params.slug}`,
      },
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.description,
      url,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

const IT_LABELS = {
  minRead: "min di lettura",
  toc: "Indice",
  related: "Articoli correlati",
  faqTitle: "Domande frequenti",
  ctaTitle: "Pronto a trasformare la tua attività?",
  ctaText:
    "Scopri come i nostri sistemi di IA aiutano le attività locali a rispondere a ogni chiamata, raccogliere ogni contatto e automatizzare il lavoro ripetitivo.",
  ctaPrimary: "Prenota una call",
  ctaSecondary: "Scopri di più",
};

const BlogPostPage = ({ params }) => {
  const post = getPostBySlug(params.slug, "it");
  if (!post) notFound();

  const toc = extractToc(post.body);
  const minutes = readingTimeMinutes(post.body);
  const related = getRelatedPosts(params.slug, "it", 3);

  return (
    <AutomisEnShell bodyClass="blog-article-page">
      <ArticleLayout
        post={post}
        toc={toc}
        minutes={minutes}
        related={related}
        locale="it"
        labels={IT_LABELS}
        basePath="/it/blog"
      />
    </AutomisEnShell>
  );
};

export default BlogPostPage;
