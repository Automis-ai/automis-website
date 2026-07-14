import AkpagerLayout from "@/layouts/AkpagerLayout";
import PointerGlow from "@/components/ui/PointerGlow";
import "@/components/site/design-system.css";

/*
  Shared shell for Italian pages on the new design system. Mirrors
  AutomisEnShell: same `.automis-en` scope (that's where design-system.css is
  keyed there; the class name is a styling hook, not a locale), plus PointerGlow
  listener, critical-font preloads, and the language-aware AkpagerLayout
  (Header/Footer follow <html lang="it">, set by app/it/layout.js).
  Keep page-level `export const metadata` in the page file (server component).
*/
export default function AutomisItShell({ children }) {
  return (
    <div className="automis-en">
      <PointerGlow />
      <link rel="preload" href="/fonts/clash-display-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/fonts/general-sans-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <AkpagerLayout>{children}</AkpagerLayout>
    </div>
  );
}
