import AutomisEnShell from "@/components/site/AutomisEnShell";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/blog/ArticleLayout";
import {
  getPostBySlug,
  getAllSlugs,
  extractToc,
  readingTimeMinutes,
  getRelatedPosts,
  buildBlogAlternates,
} from "@/lib/blog";

// Served publicly at /pt/blog/<slug> (middleware rewrites /pt/* -> /pt-site/*).

// Rendered per-request. The root layout reads headers() for <html lang>, so the
// app is dynamic anyway; forcing it here also keeps unknown slugs returning a
// clean 404 while content/blog/pt is still filling up. With an empty
// generateStaticParams the SSG path instead tried to prerender the not-found
// page and threw DYNAMIC_SERVER_USAGE (a 500), which we must never serve to a
// crawler. Revisit once the PT queue is publishing steadily.
export const dynamic = "force-dynamic";

// Tell Next.js which slugs exist at build time
export function generateStaticParams() {
  const slugs = getAllSlugs("pt");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug, "pt");
  if (!post) {
    return {
      title: "Artigo não encontrado",
      description: "O artigo pedido não está disponível.",
    };
  }
  const url = `https://automis.ai/pt/blog/${params.slug}`;
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.description,
    alternates: buildBlogAlternates(params.slug, "pt"),
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

const PT_LABELS = {
  minRead: "min de leitura",
  toc: "Índice",
  related: "Artigos relacionados",
  faqTitle: "Perguntas frequentes",
  ctaTitle: "Pronto para transformar o seu negócio?",
  ctaText:
    "Veja como os nossos sistemas de IA ajudam os negócios locais a atender todas as chamadas, a captar todos os contactos e a automatizar o trabalho repetitivo.",
  ctaPrimary: "Agende uma chamada",
  ctaSecondary: "Saber mais",
};

const BlogPostPage = ({ params }) => {
  const post = getPostBySlug(params.slug, "pt");
  if (!post) notFound();

  const toc = extractToc(post.body);
  const minutes = readingTimeMinutes(post.body);
  const related = getRelatedPosts(params.slug, "pt", 3);

  return (
    <AutomisEnShell bodyClass="blog-article-page">
      <ArticleLayout
        post={post}
        toc={toc}
        minutes={minutes}
        related={related}
        locale="pt"
        labels={PT_LABELS}
        basePath="/pt/blog"
      />
    </AutomisEnShell>
  );
};

export default BlogPostPage;
