/*
  Sets <html lang> for a locale subtree.

  In the App Router only the ROOT layout may render <html>, and it is shared by
  every locale, so it is hard-coded to lang="en". Reading the pathname there
  (via headers()) would opt the whole site into dynamic rendering and lose the
  static generation we get today.

  Instead each locale subtree renders this inline script. It executes while the
  HTML is being parsed, which is *before* GTM and the CookieYes banner load
  (they are strategy="afterInteractive"), so the consent banner can pick up the
  right language, and assistive tech reads the correct language too.

  Trade-off: the initial SSR markup still says lang="en" until this runs. Search
  engines execute JS and we also declare the language via hreflang, so the SEO
  impact is negligible. The fully correct fix is per-locale root layouts (route
  groups), which is a larger restructure.
*/

export default function HtmlLang({ lang }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang=${JSON.stringify(lang)};`,
      }}
    />
  );
}
