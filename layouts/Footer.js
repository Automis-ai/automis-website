"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, hrefFor, PATHNAMES } from "@/utility/pathnames";
import { openCookieSettings } from "@/lib/cookieConsent";

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

  const pick = (en, it, pt) => (locale === "it" ? it : locale === "pt" ? pt : en);
  const t = {
    tagline: pick(
      "Automis builds the AI systems your business is missing, across marketing, sales, and operations.",
      "Automis costruisce i sistemi di IA che mancano al tuo business, tra marketing, vendite e operations.",
      "A Automis constrói os sistemas de IA que faltam ao seu negócio, entre marketing, vendas e operações."
    ),
    emailLabel: "Email:",
    rights: pick("· All Rights Reserved", "· Tutti i diritti riservati", "· Todos os direitos reservados"),
    privacy: pick("Privacy Policy", "Privacy Policy", "Política de Privacidade"),
    terms: pick("Terms of Service", "Termini di Servizio", "Termos de Serviço"),
    cookies: pick("Cookie Policy", "Cookie Policy", "Política de Cookies"),
    manageCookies: pick("Manage cookies", "Gestisci cookie", "Gerir cookies"),
  };

  const homeHref = hrefFor(PATHNAMES.home, locale);
  // Instagram is split by market: IT audience -> @automis_italia, EN -> @automis.ai
  const instagramHref =
    locale === "it"
      ? "https://www.instagram.com/automis_italia/"
      : "https://www.instagram.com/automis.ai/";
  const linkedinHref =
    locale === "it"
      ? "https://www.linkedin.com/company/automis-italia/"
      : "https://www.linkedin.com/company/automisai";
  const facebookHref =
    locale === "it"
      ? "https://www.facebook.com/profile.php?id=61575356883644"
      : "https://www.facebook.com/automisai";
  const privacyHref = hrefFor(PATHNAMES.pages.privacyPolicy, locale);
  const termsHref = hrefFor(PATHNAMES.pages.termsOfService, locale);
  const cookieHref = hrefFor(PATHNAMES.pages.cookiePolicy, locale);

  return (
    <footer className="container main-footer footer-one relative z-1">
      <div className="max-w-1660 mx-auto px-4 clearfix">
        <div className="max-w-1660 mx-auto footer-content-wrapper flex flex-col lg:flex-row lg:flex-nowrap justify-between items-center lg:items-start pt-20 !pb-16 lg:pt-40">
          {/* LEFT SECTION: LOGO & INFO */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center lg:justify-start">
            <div className="widget-about text-center lg:!text-left flex flex-col items-center lg:items-start">
              <Link href={homeHref}>
                <img
                  src="/assets/images/logos/logo-automis-white.png"
                  alt="Automis AI Logo"
                  style={{ height: "2.5rem" }}
                  className="mb-4 !bg-transparent"
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
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automis on Instagram"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automis on LinkedIn"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href={facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automis on Facebook"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="https://x.com/AutomisAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Automis on X"
              >
                <i className="fab fa-twitter" />
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
              <li>
                <Link href={cookieHref} className="hover:text-white transition">
                  {t.cookies}
                </Link>
              </li>
              {/* Withdrawing consent must be as easy as giving it. */}
              <li>
                <button
                  type="button"
                  onClick={() => openCookieSettings()}
                  className="hover:text-white transition"
                >
                  {t.manageCookies}
                </button>
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