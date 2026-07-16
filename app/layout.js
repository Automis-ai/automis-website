import Preloader from "@/components/Preloader";
import LocaleBootstrapper from "@/components/LocaleBootstrapper";
import "./globals.css";
import "@css/aos.css";
import "@css/flaticon.min.css";
import "@css/fontawesome-5.14.0.min.css";
import "@css/magnific-popup.min.css";
import "@css/nice-select.min.css";
import "@css/slick.min.css";
import "@css/style.css";
import { Montserrat, Open_Sans } from "next/font/google";
import Script from "next/script";
import ChatWidgets from "@/components/ChatWidgets";
import AnalyticsListeners from "@/components/AnalyticsListeners";
import ConsentModeInit from "@/components/consent/ConsentModeInit";
import ConsentBanner from "@/components/consent/ConsentBanner";
import { headers } from "next/headers";

/*
  Our first-party consent banner ships behind a flag, so this can be merged and
  deployed without changing production. Turn NEXT_PUBLIC_CONSENT_V2 on only
  AFTER the CookieYes tag is removed from the GTM container: otherwise two
  banners, and two `consent default` calls, would fight each other.
*/
const CONSENT_V2 = process.env.NEXT_PUBLIC_CONSENT_V2 === "true";

const montserrat = Montserrat({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://automis.ai"),
  title: {
    default: "Automis | AI Automation Agency for Business",
  },
  description:
    "Automis is a strategic AI automation agency. We build the AI voice agents, automations, and company-brain systems your business is missing, end to end.",
  openGraph: {
    type: "website",
    siteName: "Automis",
    url: "https://automis.ai",
    locale: "en_US",
    images: [{ url: "/assets/og/home-en.png", width: 1200, height: 630, alt: "Automis - strategic AI automation agency" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og/home-en.png"],
  },
};

// Map the request path (exposed by middleware.js as the `x-pathname` header) to a
// language, so the SERVER-rendered <html lang> is correct per locale. Crawlers read
// this SSR value; it was previously hard-coded "en", so every Italian page shipped
// lang="en" and Ahrefs flagged an hreflang/HTML-lang mismatch on the 13 /it/* URLs.
// Reading headers() opts the app into dynamic rendering (accepted trade-off).
function localeFromPath(pathname) {
  if (pathname === "/it" || pathname.startsWith("/it/")) return "it";
  if (pathname === "/ita" || pathname.startsWith("/ita/")) return "it";
  if (pathname === "/pt" || pathname.startsWith("/pt/")) return "pt";
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  if (pathname === "/de" || pathname.startsWith("/de/")) return "de";
  if (pathname === "/es" || pathname.startsWith("/es/")) return "es";
  return "en";
}

export default function RootLayout({ children }) {
  const lang = localeFromPath(headers().get("x-pathname") || "");
  return (
    <html lang={lang}>
      <body
        className={`${montserrat.variable} ${openSans.variable} bg-[#000a14]`}
        style={{ color: "white" }}
      >
        {/* Consent Mode v2 defaults. Must execute before GTM loads. */}
        {CONSENT_V2 && <ConsentModeInit />}

        {/* Google Tag Manager */}
        <Script
          id="gtm-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MKNX6CK9');
            `,
          }}
        />

        <Preloader />
        <LocaleBootstrapper />
        <AnalyticsListeners />
        {children}

        {/* LeadConnector Chatbot */}
        <ChatWidgets />

        {CONSENT_V2 && <ConsentBanner />}
      </body>
    </html>
  );
}