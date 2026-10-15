import Link from "next/link";
import "./blog-v3.css";

/**
 * The one line that links the three blog indexes to each other.
 *
 * Deliberately a server component rendered by the page, NOT a block inside
 * BlogIndex: BlogIndex is a client component sitting behind <Suspense
 * fallback={null}> because it reads useSearchParams() for the category filter.
 * That boundary only resolves during SSR while the whole app is dynamic. The day
 * the root layout stops reading headers() and the site goes back to being static,
 * Next bails that boundary out to the client and everything inside it disappears
 * from the served HTML. Links that matter for crawling must live outside it.
 *
 * Why it exists at all: /it/blog and /pt/blog were both sitting in Search Console
 * as "Discovered - currently not indexed", never crawled, because no page linked
 * to them - the language switcher navigated with router.push and emitted no
 * anchor. An index nobody links to cannot pass anything to the articles under it.
 */

const LOCALES = [
  { code: "en", href: "/blog", label: "English" },
  { code: "it", href: "/it/blog", label: "Italiano" },
  { code: "pt", href: "/pt/blog", label: "Português" },
];

const INTRO = {
  en: "Also available in",
  it: "Disponibile anche in",
  pt: "Também disponível em",
};

export default function BlogLanguageLinks({ locale = "en" }) {
  const others = LOCALES.filter((l) => l.code !== locale);

  return (
    <div className="hv3 hv3-blog-langs">
      <p>
        {INTRO[locale] || INTRO.en}:{" "}
        {others.map((l, i) => (
          <span key={l.code}>
            {i > 0 && <span> · </span>}
            <Link href={l.href}>{l.label}</Link>
          </span>
        ))}
      </p>
    </div>
  );
}
