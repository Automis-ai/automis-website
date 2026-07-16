// Transactional results/download page: reached only via an emailed link carrying
// query params (?n=&s=&p=...), and its content is rendered inside a searchParams
// Suspense boundary, so a bare crawl sees an empty shell. It is not a search page.
// Keep it out of Google (noindex) and out of the sitemap (next-sitemap.config.js);
// this also dissolves the "page has no outgoing links" flag since it leaves the
// indexable set.
export const metadata = { robots: { index: false, follow: false } };

export default function RoadmapLayout({ children }) {
  return children;
}
