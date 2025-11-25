import Preloader from "@/components/Preloader";
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
        <Preloader />

        {/* GTranslate Switcher */}
        <div className="gtranslate_wrapper"></div>

        {children}

        {/* Microsoft Clarity */}
        <Script id="clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "r97o757a1j");
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
              t=b.createElement(e);t.async=!0;t.src=v;
              s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','3659071671051477');
            fbq('track','PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3659071671051477&ev=PageView&noscript=1"
            alt="fb-pixel"
          />
        </noscript>

        {/* LeadConnector Chatbot */}
        <ChatWidgets />

        {/* GTranslate settings */}
        <Script id="gtranslate-settings" strategy="afterInteractive">
          {`
            window.gtranslateSettings = {
              default_language: "en",
              detect_browser_language: true,
              languages: ["en","fr","it","es","pt","de"],
              wrapper_selector: ".gtranslate_wrapper",
              flag_size: 24,
              switcher_horizontal_position: "right",
              switcher_vertical_position: "top",
              flag_style: "3d"
            };
          `}
        </Script>

        {/* GTranslate script */}
        <Script
          src="https://cdn.gtranslate.net/widgets/latest/dwf.js"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}