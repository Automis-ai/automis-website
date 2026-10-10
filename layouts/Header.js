"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import useClickOutside from "@/utility/useClickOutside";
import { getLocaleFromPathname } from "@/utility/pathnames";
import { addLangPrefix, stripLangPrefix } from "@/lib/locales";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/*
  Menu del sito v2: Sistemi ▾ · Formazione · Casi studio · Chi siamo · CTA verso /contact.

  - I nomi sono quelli fissati nel brief (inbox/sito-v2-brief.md): non si riscrivono qui.
  - Ogni href passa da addLangPrefix() di lib/locales.js, mai un prefisso di lingua scritto a mano.
  - La lingua della prima visita la decide LocaleBootstrapper (app/layout.js): qui non si
    reindirizza niente. Una copia di quella logica viveva in questo file e non conosceva le
    pagine in una lingua sola, quindi poteva rimandare un visitatore su un 404.
  - Su mobile il menu e' un drawer: aree da toccare di almeno 44 px, Esc e tocco fuori lo
    chiudono, da chiuso e' fuori dall'ordine del Tab (visibility) e il focus torna al pulsante.
*/

const COPY = {
  en: {
    systems: "Systems",
    training: "Training",
    useCases: "Case studies",
    about: "About",
    cta: "Tell us about your business",
    categories: "Categories",
    products: "Products",
    cat: {
      marketing: "Marketing systems",
      sales: "Sales systems",
      support: "Customer service systems",
      admin: "Admin systems",
      hr: "HR systems",
    },
    nav: "Main",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleSystems: "Show or hide the systems",
    language: "Language",
  },
  it: {
    systems: "Sistemi",
    training: "Formazione",
    useCases: "Casi studio",
    about: "Chi siamo",
    cta: "Raccontaci il tuo caso",
    categories: "Categorie",
    products: "Prodotti",
    cat: {
      marketing: "Sistemi di Marketing",
      sales: "Sistemi di Vendita",
      support: "Sistemi di Assistenza",
      admin: "Sistemi di Amministrazione",
      hr: "Sistemi di Risorse umane",
    },
    nav: "Principale",
    menu: "Menù",
    openMenu: "Apri il menù",
    closeMenu: "Chiudi il menù",
    toggleSystems: "Mostra o nascondi i sistemi",
    language: "Lingua",
  },
  pt: {
    systems: "Sistemas",
    training: "Formação",
    useCases: "Casos de estudo",
    about: "Sobre nós",
    cta: "Conte-nos o seu caso",
    categories: "Categorias",
    products: "Produtos",
    cat: {
      marketing: "Sistemas de Marketing",
      sales: "Sistemas de Vendas",
      support: "Sistemas de Apoio ao Cliente",
      admin: "Sistemas de Administração",
      hr: "Sistemas de Recursos Humanos",
    },
    nav: "Principal",
    menu: "Menu",
    openMenu: "Abrir o menu",
    closeMenu: "Fechar o menu",
    toggleSystems: "Mostrar ou esconder os sistemas",
    language: "Idioma",
  },
};

// Il percorso `path` e' quello senza prefisso di lingua; `match` dice quando la voce e' "attiva".
function buildMenu(locale) {
  const t = COPY[locale] || COPY.en;
  const h = (path) => addLangPrefix(path, locale);
  return {
    t,
    systems: {
      title: t.systems,
      href: h("/systems"),
      match: ["/systems", "/voice-ai", "/ecommerce"],
      groups: [
        {
          id: "categories",
          heading: t.categories,
          items: [
            { key: "marketing", title: t.cat.marketing, href: h("/systems/marketing") },
            { key: "sales", title: t.cat.sales, href: h("/systems/sales") },
            { key: "support", title: t.cat.support, href: h("/systems/support") },
            { key: "admin", title: t.cat.admin, href: h("/systems/admin") },
            { key: "hr", title: t.cat.hr, href: h("/systems/hr") },
          ],
        },
        {
          id: "products",
          heading: t.products,
          items: [
            { key: "voice-ai", title: "Voice AI", href: h("/voice-ai") },
            { key: "ecommerce", title: "AI E-commerce Manager", href: h("/ecommerce") },
          ],
        },
      ],
    },
    links: [
      { key: "training", title: t.training, href: h("/training"), match: ["/training"] },
      { key: "use-cases", title: t.useCases, href: h("/use-cases"), match: ["/use-cases"] },
      { key: "about", title: t.about, href: h("/about"), match: ["/about"] },
    ],
    cta: { title: t.cta, href: h("/contact") },
    home: h("/"),
  };
}

// Il template mette text-transform: capitalize e display: block su ogni `.navbar-collapse li a`:
// i nomi del menu sono fissati nel brief ("Casi studio", non "Casi Studio"), quindi stile inline.
const navLinkStyle = { textTransform: "none", whiteSpace: "nowrap" };
const panelLinkStyle = {
  display: "flex",
  alignItems: "center",
  minHeight: "44px",
  padding: "0 12px",
  color: "#fff",
  fontFamily: "'Open Sans', sans-serif",
  fontSize: "15px",
  fontWeight: 400,
  letterSpacing: "0.2px",
  textTransform: "none",
  textDecoration: "none",
};

const isUnder = (path, bases) => bases.some((b) => path === b || path.startsWith(`${b}/`));

const Header = ({ header, onePage, hideHeaderNav = false }) => {
  switch (header) {
    case 1:
    default:
      return <DefaultHeader onePage={onePage} hideHeaderNav={hideHeaderNav} />;
  }
};

export default Header;

const Chevron = ({ open, className = "" }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .25s ease" }}
  >
    <path d="M2.5 4.5 6 8l3.5-3.5" />
  </svg>
);

const DefaultHeader = ({ hideHeaderNav = false }) => {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  // Percorso senza prefisso di lingua (gestisce anche /pt-site/*): serve a capire quale voce e' attiva.
  const path = useMemo(() => stripLangPrefix(pathname || "/"), [pathname]);

  const menu = useMemo(() => buildMenu(locale), [locale]);
  const { t } = menu;

  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggleRef = useRef(null);
  const closeRef = useRef(null);

  const systemsActive = isUnder(path, menu.systems.match);

  useEffect(() => {
    const compute = () => setIsMobile(window.innerWidth <= 768);
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    if (hideHeaderNav) return;
    const handleScroll = () => setIsSticky((window.scrollY || window.pageYOffset) > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideHeaderNav]);

  // Cambio pagina: il drawer si chiude da solo.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Drawer aperto: Esc lo chiude, la pagina dietro non scorre, il focus entra e poi torna al pulsante.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Sopra i 1232 px il drawer non esiste piu' (menu-break): se la finestra si allarga con il drawer aperto, si chiude.
    const onResize = () => {
      if (window.innerWidth >= 1232) setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Il focus entra nel drawer DOPO che e' diventato visibile: su un elemento ancora visibility:hidden
    // focus() non fa niente, e un effetto subito dopo il render arriva troppo presto.
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => closeRef.current?.focus()));
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  // Logo-only header (quando hideHeaderNav = true)
  if (hideHeaderNav) {
    return (
      <header
        style={{
          position: "absolute",
          top: 0,
          left: !isMobile ? "20px" : "12px",
          right: !isMobile ? "20px" : "12px",
          height: "60px",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          zIndex: 999,
        }}
      >
        <Link href={menu.home} className="flex items-center">
          <img
            src="/assets/images/logos/logo.png"
            alt="Automis AI"
            className="md:h-[50px] h-[62px] md:w-[140px] w-[130px] object-contain"
          />
        </Link>
      </header>
    );
  }

  return (
    <>
      <header
        className={`container main-header menu-absolute header-white no-border flex items-center fixed-header ${
          isSticky ? "scrolled" : "transparent-header"
        }`}
        style={{
          position: "fixed",
          top: !isMobile ? (isSticky ? "10px" : "20px") : isSticky ? "8px" : "12px",
          left: !isMobile ? "20px" : "12px",
          right: !isMobile ? "20px" : "12px",
          width: !isMobile ? "calc(100% - 40px)" : "calc(100% - 24px)",
          height: !isMobile ? "70px" : "56px",
          backgroundColor: isSticky ? "rgba(10,61,98,0.98)" : "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isSticky ? "0 8px 32px rgba(0,0,0,.12)" : "0 4px 24px rgba(0,0,0,.06)",
          borderRadius: !isMobile ? "35px" : "25px",
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 1000,
          overflow: "visible",
        }}
      >
        <div
          className="header-upper"
          style={{
            backgroundColor: "transparent",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="w-full mx-auto px-3 md:px-5 clearfix">
            <div className="header-inner w-full mx-auto relative flex items-center justify-between h-full">
              <div className="logo-outer flex items-center">
                <Link href={menu.home} className="flex items-center">
                  <img
                    src="/assets/images/logos/logo.png"
                    alt="Automis AI Logo"
                    className="md:h-[50px] h-[62px] md:w-[140px] w-[130px] object-contain"
                  />
                </Link>
              </div>

              {/* Desktop nav */}
              <div className="nav-outer flex-1 hidden menu-break:flex justify-center clearfix">
                <nav className="main-menu navbar-expand-lg" aria-label={t.nav}>
                  <DesktopNav menu={menu} path={path} systemsActive={systemsActive} />
                </nav>
              </div>

              {/* Desktop: lingua + CTA */}
              <div className="menu-btns !hidden menu-break:!flex items-center gap-3">
                <LanguageSwitcher label={t.language} />
                <Link
                  href={menu.cta.href}
                  className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#3C91E6] via-[#57C7E3] to-[#8FD3F4] px-[20px] text-[15px] font-semibold !text-[#00121f] no-underline shadow-lg shadow-[#3C91E6]/20 transition-all duration-300 hover:from-[#F5CD79] hover:via-[#F5CD79] hover:to-[#F5CD79] hover:!text-[#000a14]"
                >
                  {menu.cta.title}
                </Link>
              </div>

              {/* Barra mobile: lingua (dai 640 px in su) + pulsante del menu */}
              <div className="menu-break:hidden flex items-center gap-2">
                <LanguageSwitcher label={t.language} className="hidden sm:inline-flex" />
                <button
                  ref={toggleRef}
                  id="site-menu-toggle"
                  type="button"
                  className="relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10"
                  onClick={() => setMobileMenuOpen((v) => !v)}
                  aria-label={mobileMenuOpen ? t.closeMenu : t.openMenu}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="site-drawer"
                >
                  <span className="relative block h-5 w-6" aria-hidden="true">
                    <span
                      className="absolute left-0 top-1/2 block h-0.5 w-6 bg-white transition-all duration-300 ease-out"
                      style={{ transform: mobileMenuOpen ? "rotate(45deg)" : "translateY(-8px)" }}
                    />
                    <span
                      className="absolute left-0 top-1/2 block h-0.5 w-6 bg-white transition-all duration-300 ease-out"
                      style={{ opacity: mobileMenuOpen ? 0 : 1 }}
                    />
                    <span
                      className="absolute left-0 top-1/2 block h-0.5 w-6 bg-white transition-all duration-300 ease-out"
                      style={{ transform: mobileMenuOpen ? "rotate(-45deg)" : "translateY(8px)" }}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Velo dietro al drawer (solo sotto i 1232 px) */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 menu-break:hidden ${
          mobileMenuOpen ? "opacity-60 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer mobile. Da chiuso e' visibility:hidden: fuori dal Tab e dai lettori di schermo. */}
      <div
        id="site-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t.menu}
        className={`fixed top-0 right-0 h-full bg-gradient-to-b from-[#0A3D62] to-[#051f33] shadow-2xl menu-break:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          width: "85vw",
          maxWidth: "360px",
          borderTopLeftRadius: "24px",
          borderBottomLeftRadius: "24px",
          zIndex: 9999,
          visibility: mobileMenuOpen ? "visible" : "hidden",
          transition: `transform 0.4s ease-out, visibility 0s linear ${mobileMenuOpen ? "0s" : "0.4s"}`,
        }}
      >
        {/* NB: niente transition-all sugli elementi del drawer. `all` include `visibility`, che il drawer
            cambia: il pulsante restava hidden per il primo fotogramma e focus() non lo raggiungeva. */}
        <button
          ref={closeRef}
          id="site-drawer-close"
          type="button"
          onClick={() => {
            setMobileMenuOpen(false);
            toggleRef.current?.focus();
          }}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3C91E6]"
          aria-label={t.closeMenu}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="flex h-full flex-col overflow-y-auto px-[20px] pb-[24px] pt-[76px]">
          <MobileMenuContent menu={menu} path={path} systemsActive={systemsActive} />
        </div>
      </div>
    </>
  );
};

/* ---------- Desktop ---------- */

const DesktopNav = ({ menu, path, systemsActive }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const { t } = menu;

  const domNode = useClickOutside(() => setOpen(false));

  useEffect(() => () => clearTimeout(timer.current), []);

  const show = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const hideSoon = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 150);
  };

  const linkColor = (active) => (active ? "#3C91E6" : undefined);

  return (
    <div className="desktop-menu" ref={domNode}>
      <div className="navbar-collapse clearfix">
        <ul
          className="navigation clearfix"
          style={{ display: "flex", alignItems: "center", flexWrap: "nowrap", whiteSpace: "nowrap", gap: "8px" }}
        >
          {/* Sistemi: il testo e' un link vero al hub, il chevron apre il pannello */}
          <li
            style={{ position: "relative", display: "flex", alignItems: "center", zIndex: open ? 9998 : "auto" }}
            onMouseEnter={show}
            onMouseLeave={hideSoon}
            onKeyDown={(e) => {
              if (e.key === "Escape") setOpen(false);
            }}
          >
            <Link
              id="nav-systems"
              href={menu.systems.href}
              style={{ ...navLinkStyle, color: linkColor(systemsActive), paddingRight: 0 }}
              onClick={() => setOpen(false)}
            >
              {menu.systems.title}
            </Link>
            <button
              type="button"
              aria-label={t.toggleSystems}
              aria-expanded={open}
              aria-controls="systems-panel"
              onClick={() => setOpen((v) => !v)}
              className="flex h-11 w-9 items-center justify-center text-white/80 hover:text-white"
              style={{ color: linkColor(systemsActive), background: "none", border: "none", cursor: "pointer" }}
            >
              <Chevron open={open} />
            </button>

            {/* Il contenitore esterno ha un padding in alto trasparente: il mouse passa dal link al
                pannello senza uscire dal <li>, quindi il pannello non si chiude a meta' strada. */}
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "-12px",
                width: "560px",
                paddingTop: "10px",
                opacity: open ? 1 : 0,
                visibility: open ? "visible" : "hidden",
                transform: open ? "translateY(0)" : "translateY(-6px)",
                transition: "opacity .25s ease, transform .25s ease, visibility 0s linear " + (open ? "0s" : ".25s"),
                zIndex: 9999,
              }}
            >
              <div
                id="systems-panel"
                className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-x-6 rounded-2xl p-[16px]"
                style={{
                  backgroundColor: "rgba(10,61,98,0.98)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
                }}
              >
                {/* div e non ul/li: il CSS del template nasconde ogni ul dentro .navbar-collapse e mette
                    text-transform: capitalize su ogni link, quindi i link qui hanno stile inline. */}
                {menu.systems.groups.map((group) => (
                  <div key={group.id}>
                    <p className="mb-1 px-[12px] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                      {group.heading}
                    </p>
                    {group.items.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg transition-colors hover:bg-white/10"
                        style={panelLinkStyle}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </li>

          {menu.links.map((link) => {
            const active = isUnder(path, link.match);
            return (
              <li key={link.key} style={{ position: "relative" }}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  style={{ ...navLinkStyle, color: linkColor(active) }}
                >
                  {link.title}
                  {active && (
                    <span
                      aria-hidden="true"
                      style={{ position: "absolute", bottom: "-2px", left: 0, width: "100%", height: "2px", backgroundColor: "#3C91E6" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

/* ---------- Mobile ---------- */

const rowClass =
  "flex min-h-[48px] items-center rounded-lg px-[12px] text-lg text-white no-underline transition-colors hover:bg-white/5 hover:text-[#3C91E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3C91E6]";

const MobileMenuContent = ({ menu, path, systemsActive }) => {
  const [systemsOpen, setSystemsOpen] = useState(false);
  const { t } = menu;

  return (
    <div className="flex min-h-full flex-col">
      {/* Lingua */}
      <div className="mb-[16px] flex items-center justify-between">
        <span className="text-sm font-semibold text-white/70">{t.language}</span>
        <LanguageSwitcher label={t.language} />
      </div>

      <nav aria-label={t.nav}>
        <ul className="m-0 list-none p-0">
          {/* Sistemi: link al hub + pulsante che apre l'elenco */}
          <li className="mb-[4px]">
            <div className="flex items-center">
              <Link
                href={menu.systems.href}
                className={`${rowClass} flex-1 ${systemsActive ? "!text-[#3C91E6] bg-white/5" : ""}`}
              >
                {menu.systems.title}
              </Link>
              <button
                id="drawer-systems-toggle"
                type="button"
                aria-label={t.toggleSystems}
                aria-expanded={systemsOpen}
                aria-controls="drawer-systems-list"
                onClick={() => setSystemsOpen((v) => !v)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3C91E6]"
              >
                <Chevron open={systemsOpen} className="h-4 w-4" />
              </button>
            </div>

            <div id="drawer-systems-list" hidden={!systemsOpen} className="pb-[8px] pl-[12px]">
              {menu.systems.groups.map((group) => (
                <div key={group.id} className="mt-[8px]">
                  <p className="px-[12px] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{group.heading}</p>
                  <ul className="m-0 list-none p-0">
                    {group.items.map((item) => (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          className="flex min-h-[44px] items-center rounded-lg px-[12px] text-[16px] text-[#EAEAEA] no-underline transition-colors hover:bg-white/5 hover:text-[#3C91E6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3C91E6]"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>

          {menu.links.map((link) => {
            const active = isUnder(path, link.match);
            return (
              <li key={link.key} className="mb-[4px]">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`${rowClass} ${active ? "!text-[#3C91E6] bg-white/5" : ""}`}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* CTA */}
      <div className="mt-auto border-t border-white/10 pt-6">
        <Link
          href={menu.cta.href}
          className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#3C91E6] via-[#57C7E3] to-[#8FD3F4] px-[16px] text-center text-base font-semibold !text-[#00121f] no-underline transition-shadow duration-300 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {menu.cta.title}
        </Link>
      </div>
    </div>
  );
};
