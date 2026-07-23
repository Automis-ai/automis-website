import AkpagerLayout from "@/layouts/AkpagerLayout";
import PointerGlow from "@/components/ui/PointerGlow";
import "@/components/site/design-system.css";

/*
  Shared shell for every English page on the new design system.
  Wrap a page's sections in <AutomisEnShell> to get:
    - the `.automis-en` scope (Clash Display / General Sans fonts + card primitives)
    - the shared PointerGlow listener (drives the .card-glow border spotlight)
    - preloads for the two most critical font weights (fast first paint)
    - the old-template Header/Footer/sticky-CTA via AkpagerLayout
  Keep page-level `export const metadata` in the page file (server component).
*/
export default function AutomisEnShell({ children, bodyClass }) {
  return (
    <div className="automis-en">
      <PointerGlow />
      {/* Preload the two most critical font weights for a fast first paint. */}
      <link rel="preload" href="/fonts/clash-display-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/general-sans-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <AkpagerLayout bodyClass={bodyClass}>{children}</AkpagerLayout>
    </div>
  );
}
