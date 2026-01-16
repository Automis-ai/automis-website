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
  title: {
    template: "Automis - AI Powered Marketing and booking",
    default: "Automis - AI Powered Marketing and booking ",
  },
  description:
    "Automis is an AI powered marketing and booking platform that helps businesses automate their marketing efforts and streamline their booking processes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable} bg-[#000a14]`}
        style={{ color: "white" }}
      >
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
              })(window,document,'script','dataLayer','GTM-XXXXXXX');
            `,
          }}
        />

        <Preloader />
        <LocaleBootstrapper />
        {children}

        {/* LeadConnector Chatbot */}
        <ChatWidgets />
      </body>
    </html>
  );
}