"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, hrefFor, PATHNAMES } from "@/utility/pathnames";

const Footer = ({ footer }) => {
  return (
    <>
      <style jsx global>{`
        .main-footer .social-style-one {
          display: flex !important;
          flex-wrap: wrap;
          margin: 0 !important;
        }
        .main-footer .social-style-one a {
          margin: 0 !important;
          width: 40px;
          height: 40px;
          line-height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .footer-content-wrapper {
          display: flex !important;
          align-items: flex-end !important;
        }
        @media (min-width: 1024px) {
          .footer-social-wrapper {
            display: flex !important;
            align-items: flex-end !important;
            height: 100% !important;
            justify-content: flex-end !important;
          }
        }
      `}</style>

      {footer === 2 ? <Footer2 /> : <DefaultFooter />}
    </>
  );
};

export default Footer;

const DefaultFooter = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const t = {
    tagline:
      locale === "it"
        ? "Automis combina AI e marketing umano per far crescere il tuo business più velocemente."
        : "Automis combines AI and human marketing expertise to grow your business faster.",
    emailLabel: locale === "it" ? "Email:" : "Email:",
    rights:
      locale === "it" ? "— Tutti i diritti riservati" : "— All Rights Reserved",
    privacy: locale === "it" ? "Privacy Policy" : "Privacy Policy",
    terms: locale === "it" ? "Termini di Servizio" : "Terms of Service",
  };

  const homeHref = hrefFor(PATHNAMES.home, locale);
  const privacyHref = hrefFor(PATHNAMES.pages.privacyPolicy, locale);
  const termsHref = hrefFor(PATHNAMES.pages.termsOfService, locale);

  return (
    <footer className="container main-footer footer-one relative z-1">
      <div className="max-w-1660 mx-auto px-4 clearfix">
        <div className="max-w-1660 mx-auto footer-content-wrapper flex flex-col lg:flex-row lg:flex-nowrap justify-between items-center lg:items-start pt-20 !pb-16 lg:pt-40">
          {/* LEFT SECTION: LOGO & INFO */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center lg:justify-start">
            <div className="widget-about text-center lg:!text-left flex flex-col items-center lg:items-start">
              <Link href={homeHref}>
                <img
                  src="/assets/images/logos/logo.png"
                  alt="Automis AI Logo"
                  style={{ height: "3rem" }}
                  className="mb-4"
                  loading="lazy"
                />
              </Link>

              <p className="mb-3 max-w-md text-white">{t.tagline}</p>

              <p className="mb-0 text-white">
                <strong>{t.emailLabel}</strong>{" "}
                <a
                  href="mailto:info@automis.ai"
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  info@automis.ai
                </a>
              </p>
            </div>
          </div>

          {/* RIGHT SECTION: SOCIAL */}
          <div className="footer-social-wrapper w-full lg:w-1/2 flex justify-center lg:justify-end items-center lg:items-start">
            <div className="social-style-one flex flex-wrap gap-3 justify-center lg:justify-end">
              <a
                href="https://x.com/AutomisAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automis on X"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://www.instagram.com/automis.ai/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automis on Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://www.linkedin.com/company/automisai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automis on LinkedIn"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href="https://www.facebook.com/automisai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automis on Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </div>
        </div>

        {/* === FOOTER BOTTOM (3 COL GRID) === */}
        <div className="footer-bottom py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6">
            {/* LEFT: COPYRIGHT */}
            <p className="text-white text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <Link href={homeHref} className="underline underline-offset-2">
                Automis
              </Link>{" "}
              {t.rights}
            </p>

            {/* CENTER: ELEVEN LABS BADGE */}
            <div className="flex justify-center">
              <a
                href="https://elevenlabs.io/startup-grants"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ElevenLabs Startup Grants"
              >
                <img
                  src="https://eleven-public-cdn.elevenlabs.io/payloadcms/cy7rxce8uki-IIElevenLabsGrants%201.webp"
                  alt="ElevenLabs Grants"
                  className="h-5 md:h-5 w-auto opacity-90 hover:opacity-100 transition"
                />
              </a>
            </div>

            {/* RIGHT: LINKS */}
            <ul className="flex gap-6 justify-center md:justify-end text-white/70">
              <li>
                <Link href={privacyHref} className="hover:text-white transition">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href={termsHref} className="hover:text-white transition">
                  {t.terms}
                </Link>
              </li>
            </ul>
          </div>

          <button className="scroll-top scroll-to-target" data-target="html">
            <span className="far fa-angle-double-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};

const Footer2 = () => {
  return <></>; // non toccato
};