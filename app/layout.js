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

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
});

const openSans = Open_Sans({
  weight: ['400'],
  subsets: ["latin"],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata = {
  title: {
    template: "Automis - AI Powered Marketing and booking",
    default: "Automis - AI Powered Marketing and booking ",
  },
  description: "Automis is an AI powered marketing and booking platform that helps businesses automate their marketing efforts and streamline their booking processes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${openSans.variable} bg-[#000a14]`} style={{ color: 'white' }}>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
