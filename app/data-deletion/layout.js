// Meta App Review requires a public data deletion page. Reached from Meta's
// deletion callback with ?code=, so keep it out of Google (noindex) and out of
// the sitemap / INDEXABLE_PATHS.
export const metadata = {
  title: "Data Deletion | Automis",
  description:
    "How to delete your data from the Automis app, and how to check the status of a deletion request.",
  robots: { index: false, follow: false },
};

export default function DataDeletionLayout({ children }) {
  return children;
}
