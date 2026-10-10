"use client";
import VideoPopup from "@/components/VideoPopup";
import { addLangPrefix, publicPath, stripLangPrefix } from "@/lib/locales";
import { akpagerUtility } from "@/utility";
import { Fragment, useEffect, useState } from "react";
import niceSelect from "react-nice-select";
import Footer from "./Footer";
import Header from "./Header";
import CTAButton from "@/components/CTAButton";
import { usePathname } from "next/navigation";

const AkpagerLayout = ({
  children,
  header,
  footer,
  bodyClass,
  onePage,
  hideHeaderNav = false,
}) => {
  const [showStickyButton, setShowStickyButton] = useState(false);

  const pathname = usePathname();
  const supportedLocales = ["it", "en", "fr", "de", "es", "pt"];
  // publicPath: su /pt-site/* il segmento grezzo sarebbe "pt-site", che non e' nella
  // lista e faceva cadere la pagina portoghese sul calendario inglese.
  const localeFromPath = publicPath(pathname)?.split("/")?.[1];
  const locale = supportedLocales.includes(localeFromPath) ? localeFromPath : "en";

  // Sito v2: il bottone fisso porta a /contact (Finder + calendario), con il nome fisso della
  // CTA del menu. Il percorso passa da addLangPrefix, mai scritto a mano col prefisso.
  const STICKY_CTA = {
    en: { label: "Tell us about your business" },
    it: { label: "Raccontaci il tuo caso" },
    pt: { label: "Conte-nos o seu caso" },
  };
  const stickyLocale = STICKY_CTA[locale] ? locale : "en";
  const stickyCtaHref = addLangPrefix("/contact", stickyLocale);
  const stickyCtaLabel = STICKY_CTA[stickyLocale].label;
  // Su /contact il bottone porterebbe alla pagina in cui si e' gia'.
  const onContactPage = stripLangPrefix(pathname) === "/contact";

  useEffect(() => {
    akpagerUtility.animation();
    akpagerUtility.fixedHeader();
  }, []);

  useEffect(() => {
    niceSelect();
    document.querySelector("body").classList = bodyClass;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const footer = document.querySelector(".main-footer");
      const footerTop = footer
        ? footer.getBoundingClientRect().top + scrollY
        : documentHeight - windowHeight * 1.5;

      // Don't cover / compete with the Opportunity Finder or the booking calendar.
      const covered = ["#opportunity-finder", "#book", ".v2-win"].some((sel) => {
        const el = document.querySelector(sel);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top < windowHeight * 0.9 && r.bottom > windowHeight * 0.15;
      });

      // Only after the hero (and its own CTA) has scrolled away.
      const pastHero = scrollY > windowHeight * 0.85;

      setShowStickyButton(pastHero && scrollY < footerTop - windowHeight && !covered);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fragment>
      <VideoPopup />
      <div className="page-wrapper">
        <Header header={header} onePage={onePage} hideHeaderNav={hideHeaderNav} />
        {children}
        <Footer footer={footer} />
      </div>

      {!hideHeaderNav && !onContactPage && (
        <div
          className={`md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
            showStickyButton
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-20 opacity-0 scale-90 pointer-events-none"
          }`}
          style={{ width: "90%", maxWidth: "320px" }}
        >
          <div className="mobile-sticky-glow relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-middle via-yellow-light to-blue-lightest rounded-xl blur-lg opacity-60 group-hover:opacity-90 animate-pulse-glow"></div>
            {/* solid backdrop so page content never bleeds through the pill */}
            <div className="relative rounded-xl bg-[#000a14]">
              <CTAButton
                href={stickyCtaHref}
                variant="v2"
                size="medium"
                className="!text-base !py-4 !px-10 !font-semibold !w-full"
              >
                {stickyCtaLabel}
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AkpagerLayout;