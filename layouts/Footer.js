"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/utility/pathnames";
import { addLangPrefix, resolveTarget } from "@/lib/locales";
import { openCookieSettings } from "@/lib/cookieConsent";
import { useDeclaredHrefs } from "@/components/LanguageSwitcher";

// Un'unica fonte per i testi del piede: nomi di pagina identici a quelli del menu (layouts/Header.js).
const NAV_COPY = {
  en: {
    systems: "Systems",
    company: "Company",
    resources: "Resources",
    language: "Language",
    cat: {
      marketing: "Marketing systems",
      sales: "Sales systems",
      support: "Customer service systems",
      admin: "Admin systems",
      hr: "HR systems",
    },
    howWeWork: "How we work",
    training: "Training",
    useCases: "Case studies",
    about: "About",
    contact: "Contact",
    blog: "Blog",
    tools: "Tools",
  },
  it: {
    systems: "Sistemi",
    company: "Azienda",
    resources: "Risorse",
    language: "Lingua",
    cat: {
      marketing: "Sistemi di Marketing",
      sales: "Sistemi di Vendita",
      support: "Sistemi di Assistenza",
      admin: "Sistemi di Amministrazione",
      hr: "Sistemi di Risorse umane",
    },
    howWeWork: "Come lavoriamo",
    training: "Formazione",
    useCases: "Casi studio",
    about: "Chi siamo",
    contact: "Contatti",
    blog: "Blog",
    tools: "Strumenti",
  },
  pt: {
    systems: "Sistemas",
    company: "Empresa",
    resources: "Recursos",
    language: "Idioma",
    cat: {
      marketing: "Sistemas de Marketing",
      sales: "Sistemas de Vendas",
      support: "Sistemas de Apoio ao Cliente",
      admin: "Sistemas de Administração",
      hr: "Sistemas de Recursos Humanos",
    },
    howWeWork: "Como trabalhamos",
    training: "Formação",
    useCases: "Casos de estudo",
    about: "Sobre nós",
    contact: "Contactos",
    blog: "Blog",
    tools: "Ferramentas",
  },
};

const LANG_LINKS = [
  { code: "en", label: "English", hreflang: "en" },
  { code: "it", label: "Italiano", hreflang: "it-IT" },
  { code: "pt", label: "Português", hreflang: "pt-PT" },
];

// Le ancore del piede: 44 px di altezza minima, stile inline perche' il CSS del template
// ridefinisce i nomi delle utility di spaziatura (.p-3, .mb-4, .gap-3...) con altri valori.
const colLinkStyle = {
  display: "flex",
  alignItems: "center",
  minHeight: "44px",
  lineHeight: 1.3,
};
const colLinkClass = "text-[15px] text-white/70 no-underline transition-colors hover:text-white";
const colHeadClass = "m-0 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/50";

const Footer = ({ footer }) => {
  return (
    <>
      <style jsx global>{`
        /* Stesso contenitore del kit v2 (.v2-wrap): 1152 px al centro, 20/24/32 px ai lati. */
        footer.main-footer.container {
          max-width: none;
          margin-left: 0;
          margin-right: 0;
          padding-left: 0 !important;
          padding-right: 0 !important;
        }
        .main-footer .footer-wrap {
          width: 100%;
          max-width: 1152px;
          margin-left: auto;
          margin-right: auto;
          padding-left: 20px;
          padding-right: 20px;
        }
        @media (min-width: 640px) {
          .main-footer .footer-wrap {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
        @media (min-width: 1024px) {
          .main-footer .footer-wrap {
            padding-left: 32px;
            padding-right: 32px;
          }
        }
        @media (min-width: 768px) {
          .main-footer .footer-copy {
            text-align: left !important;
          }
        }
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
  // Stesso indirizzo del selettore del menu: la pagina gemella dichiarata da hreflang (es. un caso studio).
  const declaredHrefs = useDeclaredHrefs(pathname);

  const pick = (en, it, pt) => (locale === "it" ? it : locale === "pt" ? pt : en);
  const t = {
    tagline: pick(
      "We build the systems your business is missing.",
      "Costruiamo il sistema IA che manca alla tua azienda.",
      "Construímos o sistema de IA que falta à sua empresa."
    ),
    emailLabel: "Email:",
    rights: pick("· All Rights Reserved", "· Tutti i diritti riservati", "· Todos os direitos reservados"),
    privacy: pick("Privacy Policy", "Privacy Policy", "Política de Privacidade"),
    terms: pick("Terms of Service", "Termini di Servizio", "Termos de Serviço"),
    cookies: pick("Cookie Policy", "Cookie Policy", "Política de Cookies"),
    manageCookies: pick("Manage cookies", "Gestisci cookie", "Gerir cookies"),
  };

  const homeHref = addLangPrefix("/", locale);
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
  const privacyHref = addLangPrefix("/privacy-policy", locale);
  const termsHref = addLangPrefix("/terms-of-service", locale);
  const cookieHref = addLangPrefix("/cookie-policy", locale);

  const n = NAV_COPY[locale] || NAV_COPY.en;
  const h = (path) => addLangPrefix(path, locale);
  const columns = [
    {
      id: "systems",
      title: n.systems,
      wide: true,
      links: [
        { href: h("/systems/marketing"), label: n.cat.marketing },
        { href: h("/systems/sales"), label: n.cat.sales },
        { href: h("/systems/support"), label: n.cat.support },
        { href: h("/systems/admin"), label: n.cat.admin },
        { href: h("/systems/hr"), label: n.cat.hr },
        { href: h("/voice-ai"), label: "Voice AI" },
        { href: h("/ecommerce"), label: "AI E-commerce Manager" },
      ],
    },
    {
      id: "company",
      title: n.company,
      links: [
        { href: h("/how-we-work"), label: n.howWeWork },
        { href: h("/training"), label: n.training },
        { href: h("/use-cases"), label: n.useCases },
        { href: h("/about"), label: n.about },
        { href: h("/contact"), label: n.contact },
      ],
    },
    {
      id: "resources",
      title: n.resources,
      links: [
        { href: h("/blog"), label: n.blog },
        { href: h("/tools"), label: n.tools },
      ],
    },
  ];

  return (
    <footer className="container main-footer footer-one relative z-1">
      <div className="footer-wrap clearfix">
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
                  className="inline-flex min-h-[44px] items-center text-white hover:text-blue-200 transition-colors"
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

        {/* === COLONNE DI LINK === */}
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-[24px] gap-y-[32px] pb-[40px] lg:grid-cols-[1.4fr_1fr_1fr_1fr]"
        >
          {columns.map((col) => (
            <div key={col.id} className={col.wide ? "col-span-2 lg:col-span-1" : ""}>
              <p className={colHeadClass}>{col.title}</p>
              <ul className="m-0 mt-[8px] list-none p-0">
                {col.links.map((l) => (
                  <li key={l.href} style={{ margin: 0, padding: 0 }}>
                    <Link href={l.href} className={colLinkClass} style={colLinkStyle}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Lingua: tre link veri nell'HTML, visibili, cosi' IT e PT hanno un ingresso che Google segue
              anche quando il selettore del menu e' chiuso. */}
          <div>
            <p className={colHeadClass}>{n.language}</p>
            <ul className="m-0 mt-[8px] list-none p-0">
              {LANG_LINKS.map((l) => (
                <li key={l.code} style={{ margin: 0, padding: 0 }}>
                  <a
                    href={declaredHrefs[l.code] || resolveTarget(pathname || "/", l.code)}
                    hrefLang={l.hreflang}
                    lang={l.code}
                    aria-current={l.code === locale ? "true" : undefined}
                    onClick={() => {
                      try {
                        localStorage.setItem("automis_locale", l.code);
                      } catch {
                        // localStorage puo' essere bloccato: si naviga lo stesso
                      }
                    }}
                    className={`${colLinkClass} ${l.code === locale ? "!text-white font-semibold" : ""}`}
                    style={colLinkStyle}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* === FOOTER BOTTOM (3 COL GRID) === */}
        <div className="footer-bottom py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.8fr] items-center gap-4 md:gap-6">
            {/* LEFT: COPYRIGHT */}
            <p className="footer-copy text-white text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <Link href={homeHref} className="inline-flex min-h-[44px] items-center underline underline-offset-2">
                Automis
              </Link>{" "}
              {t.rights}
            </p>

            {/* CENTER: BADGES (ElevenLabs Grant) */}
            {/* The ShowMeBestAI badge was removed: showmebest.ai now answers 403 to
                every request (image and homepage alike), so it rendered as a broken
                image on all 78 pages and Ahrefs flagged a site-wide broken resource.
                Re-add it only against a self-hosted copy of the image. */}
            <div className="flex flex-col items-center gap-2">
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
            <ul className="grid grid-cols-2 justify-items-center gap-x-4 whitespace-nowrap md:flex md:flex-wrap md:gap-x-6 md:justify-end text-white/70">
              <li>
                <Link href={privacyHref} className="inline-flex min-h-[44px] items-center hover:text-white transition">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link href={termsHref} className="inline-flex min-h-[44px] items-center hover:text-white transition">
                  {t.terms}
                </Link>
              </li>
              <li>
                <Link href={cookieHref} className="inline-flex min-h-[44px] items-center hover:text-white transition">
                  {t.cookies}
                </Link>
              </li>
              {/* Withdrawing consent must be as easy as giving it. */}
              <li>
                <button
                  type="button"
                  onClick={() => openCookieSettings()}
                  className="inline-flex min-h-[44px] items-center hover:text-white transition"
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