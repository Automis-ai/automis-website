import HtmlLang from "@/components/HtmlLang";

// Declares this subtree's language to the browser, assistive tech, and the
// cookie banner (which reads <html lang> to pick its own language).
//
// Voice-AI lander (voice.automis.ai). Kept out of Google (noindex): it is sent to
// prospects privately, must not be publicly discoverable/scraped, and must not
// duplicate the main site. Paired with a sitemap exclude in next-sitemap.config.js.
export const metadata = { robots: { index: false, follow: false } };

export default function PtLayout({ children }) {
  return (
    <>
      <HtmlLang lang="pt" />
      {children}
    </>
  );
}
