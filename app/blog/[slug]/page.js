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
  const url = `https://automis.ai/blog/${params.slug}`;
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

const EN_LABELS = {
  minRead: "min read",
  toc: "Contents",
  related: "Related articles",
  faqTitle: "Frequently Asked Questions",
  ctaTitle: "Ready to Transform Your Business?",
  ctaText:
    "See how our AI systems help local businesses answer every call, capture every lead, and automate the busywork.",
  ctaPrimary: "Book Discovery Call",
  ctaSecondary: "Learn More",
};

const BlogPostPage = ({ params }) => {
  const post = getPostBySlug(params.slug, "en");
  if (!post) notFound();

  const toc = extractToc(post.body);
  const minutes = readingTimeMinutes(post.body);
  const related = getRelatedPosts(params.slug, "en", 3);

  return (
    <AutomisEnShell bodyClass="blog-article-page">
      <ArticleLayout
        post={post}
        toc={toc}
        minutes={minutes}
        related={related}
        locale="en"
        labels={EN_LABELS}
        basePath="/blog"
      />
    </AutomisEnShell>
  );
};

export default BlogPostPage;
