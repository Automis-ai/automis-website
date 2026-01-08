"use client";
import VideoPopup from "@/components/VideoPopup";
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
  const localeFromPath = pathname?.split("/")?.[1];
  const locale = supportedLocales.includes(localeFromPath) ? localeFromPath : "en";

  const stickyCtaHref =
    locale === "it"
      ? "https://api.leadconnectorhq.com/widget/bookings/automis-it"
      : "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

  const stickyCtaLabel = locale === "it" ? "Prenota una call" : "Book Discovery Call";

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
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const footerTop = footerRect.top + scrollY;

        setShowStickyButton(scrollY > 300 && scrollY < footerTop - windowHeight);
      } else {
        setShowStickyButton(scrollY > 300 && scrollY < documentHeight - windowHeight * 1.5);
      }
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

      {!hideHeaderNav && (
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
            <div className="relative">
              <CTAButton
                href={stickyCtaHref}
                variant="secondary"
                size="medium"
                external={true}
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