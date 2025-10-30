"use client";
import useClickOutside from "@/utility/useClickOutside";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import CTAButton from "@/components/CTAButton";

const Header = ({ header, onePage, hideHeaderNav = false }) => {
  switch (header) {
    case 1:
    default:
      return <DefaultHeader onePage={onePage} hideHeaderNav={hideHeaderNav} />;
  }
};
export default Header;

const DefaultHeader = ({ onePage, hideHeaderNav = false }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Handle route and screen size
  useEffect(() => {
    const path = window.location.pathname;
    setActiveLink(path === "/" ? "home" : path.replace("/", ""));
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Sticky header for non-ITA
  useEffect(() => {
    if (!hideHeaderNav) {
      const handleScroll = () => {
        const scrollPosition = window.scrollY || window.pageYOffset;
        setIsSticky(scrollPosition > 50);
      };
      handleScroll();
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [hideHeaderNav]);

  // ✅ ESC closes mobile menu
  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && setMobileMenuOpen(false);
    if (mobileMenuOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const menus = [
    { id: 1, href: "home", title: "Home" },
    { id: 5, href: "jumpstart-audit", title: "Jumpstart Audit" },
    {
      id: 3,
      href: "",
      title: "Services",
      submenus: [
        { id: 31, href: "paid-ads-management", title: "Paid Ads Management" },
        { id: 32, href: "voice-ai", title: "Voice AI" },
        { id: 33, href: "ai-automations", title: "AI Automations" },
      ],
    },
    { id: 2, href: "use-cases", title: "Case Studies" },
    { id: 6, href: "blog", title: "Blog" },
    { id: 8, href: "about", title: "About" },
    { id: 7, href: "contact", title: "Contact" },
  ];

  // ✅ If hideHeaderNav is true → show simple logo header only
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
        <Link href="/ita" className="flex items-center">
          <img
            src="/assets/images/logos/logo.png"
            alt="Automis AI"
            className="md:h-[50px] h-[62px] md:w-[140px] w-[130px] object-contain"
          />
        </Link>
      </header>
    );
  }

  // ✅ Default (non-ITA) header styling
  return (
    <>
      <header
        className={`container main-header menu-absolute header-white no-border flex items-center fixed-header ${
          isSticky ? "scrolled" : "transparent-header"
        }`}
        style={{
          position: "fixed",
          top: !isMobile
            ? isSticky
              ? "10px"
              : "20px"
            : isSticky
            ? "8px"
            : "12px",
          left: !isMobile ? "20px" : "12px",
          right: !isMobile ? "20px" : "12px",
          width: !isMobile ? "calc(100% - 40px)" : "calc(100% - 24px)",
          height: !isMobile ? "70px" : "56px",
          backgroundColor: isSticky
            ? "rgba(10,61,98,0.98)"
            : "rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: isSticky
            ? "0 8px 32px rgba(0,0,0,.12)"
            : "0 4px 24px rgba(0,0,0,.06)",
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
                <Link href="/" className="flex items-center">
                  <img
                    src="/assets/images/logos/logo.png"
                    alt="Automis AI Logo"
                    className="md:h-[50px] h-[62px] md:w-[140px] w-[130px] object-contain"
                  />
                </Link>
              </div>

              {/* ✅ Desktop Nav */}
              <div className="nav-outer flex-1 hidden menu-break:flex justify-center clearfix">
                <nav className="main-menu navbar-expand-lg">
                  <Nav
                    menus={menus}
                    onePage={onePage}
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                  />
                </nav>
              </div>

              {/* ✅ CTA */}
              <div className="menu-btns !hidden menu-break:!flex">
                <CTAButton
                  href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
                  external={true}
                  variant="primary"
                  size="small"
                >
                  Book Discovery Call
                </CTAButton>
              </div>

              {/* ✅ Mobile Menu Button */}
              <button
                className="menu-break:hidden flex items-center justify-center w-10 h-10 relative rounded-full hover:bg-white/10 transition-all duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <div className="relative w-6 h-5 flex flex-col justify-center">
                  <span
                    className="absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-out"
                    style={{
                      transform: mobileMenuOpen
                        ? "rotate(45deg)"
                        : "translateY(-8px)",
                    }}
                  />
                  <span
                    className="absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-out"
                    style={{ opacity: mobileMenuOpen ? 0 : 1 }}
                  />
                  <span
                    className="absolute block w-6 h-0.5 bg-white transition-all duration-300 ease-out"
                    style={{
                      transform: mobileMenuOpen
                        ? "rotate(-45deg)"
                        : "translateY(8px)",
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Mobile Overlay + Drawer */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 menu-break:hidden ${
          mobileMenuOpen
            ? "opacity-60 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full bg-gradient-to-b from-[#0A3D62] to-[#051f33] shadow-2xl transition-all duration-500 ease-out menu-break:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          width: "85vw",
          maxWidth: "360px",
          borderTopLeftRadius: "24px",
          borderBottomLeftRadius: "24px",
          zIndex: 9999,
        }}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 text-white w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
          aria-label="Close menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <nav className="pt-24 px-6 pb-6 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          <MobileMenuContent
            menus={menus}
            onePage={onePage}
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </nav>
      </div>
    </>
  );
};
const MobileMenuContent = ({
  menus,
  onePage,
  activeLink,
  setActiveLink,
  setMobileMenuOpen,
}) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1">
        {menus.map((menu) => (
          <li key={menu.id} className="mb-2">
            {menu.submenus ? (
              <>
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === menu.id ? null : menu.id
                    )
                  }
                  className="w-full text-left text-white text-lg py-3 px-3 flex items-center justify-between hover:text-[#3C91E6] hover:bg-white/5 rounded-lg transition-all duration-300"
                >
                  {menu.title}
                  <span
                    className={`far fa-angle-down transition-transform ${
                      activeDropdown === menu.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === menu.id && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {menu.submenus.map((submenu) => (
                      <li key={submenu.id}>
                        <Link
                          href={`/${submenu.href}`}
                          onClick={() => {
                            setActiveLink(submenu.href);
                            setMobileMenuOpen(false);
                          }}
                          className="block text-[#EAEAEA] py-2 px-4 hover:text-[#3C91E6] hover:bg-white/5 rounded-lg transition-all duration-300 ml-2"
                        >
                          {submenu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={menu.href === "home" ? "/" : `/${menu.href}`}
                onClick={() => {
                  setActiveLink(menu.href);
                  setMobileMenuOpen(false);
                }}
                className={`block text-white text-lg py-3 px-3 hover:text-[#3C91E6] hover:bg-white/5 rounded-lg transition-all duration-300 ${
                  activeLink === menu.href ? "text-[#3C91E6] bg-white/5" : ""
                }`}
              >
                {menu.title}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6 border-t border-white/10">
        <a
          href="https://api.leadconnectorhq.com/widget/bookings/discover-automis"
          className="block w-full bg-gradient-to-r from-[#3C91E6] to-[#5BA3ED] text-white text-center py-4 rounded-2xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          Book Discovery Call
        </a>
      </div>
    </div>
  );
};

const Nav = ({
  logo = "assets/images/logos/logo.png",
  onePage,
  menus,
  activeLink,
  setActiveLink,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  let domNode = useClickOutside(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  });

  return (
    <Fragment>
      <div className="desktop-menu">
        <div className="navbar-collapse clearfix">
          {onePage ? (
            <ul className="navigation onepage clearfix">
              {menus.map((menu) => (
                <li key={menu.id} className={menu.submenus ? "dropdown" : ""}>
                  <a href={`#${menu.href}`}>{menu.title}</a>
                  {menu.submenus && (
                    <>
                      <ul
                        className="dropdown-menu"
                        style={{
                          backgroundColor: "#000a23",
                          borderRadius: "8px",
                          padding: "10px 0",
                          minWidth: "220px",
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          opacity: activeDropdown === menu.id ? "1" : "0",
                          visibility:
                            activeDropdown === menu.id ? "visible" : "hidden",
                          transform:
                            activeDropdown === menu.id
                              ? "translateY(8px)"
                              : "translateY(0)",
                          transition: "all 0.25s ease",
                          zIndex: "1000",
                        }}
                      >
                        {menu.submenus.map((submenu) => (
                          <li key={submenu.id}>
                            <a
                              href={`#${submenu.href}`}
                              style={{
                                color: "white",
                                padding: "8px 20px",
                                display: "block",
                              }}
                            >
                              {submenu.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <div
                        className="dropdown-btn"
                        style={{
                          transform:
                            activeDropdown === menu.id
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          transition: "transform 0.25s ease",
                        }}
                      >
                        <span className="far fa-angle-down" />
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="navigation clearfix">
              {menus.map((menu) => (
                <li
                  key={menu.id}
                  className={menu.submenus ? "dropdown" : ""}
                  style={{
                    position: "relative",
                    zIndex:
                      menu.submenus && activeDropdown === menu.id
                        ? "9998"
                        : "auto",
                  }}
                  onMouseEnter={() => {
                    if (menu.submenus) {
                      if (hoverTimeout) {
                        clearTimeout(hoverTimeout);
                        setHoverTimeout(null);
                      }
                      setActiveDropdown(menu.id);
                    }
                  }}
                  onMouseLeave={() => {
                    if (menu.submenus) {
                      const timeout = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 150);
                      setHoverTimeout(timeout);
                    }
                  }}
                >
                  <Link
                    href={
                      menu.submenus
                        ? "#"
                        : menu.href === "home"
                        ? "/"
                        : `/${menu.href}`
                    }
                    onClick={(e) => {
                      if (!menu.submenus) {
                        setActiveLink(menu.href);
                      } else {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveDropdown(
                          activeDropdown === menu.id ? null : menu.id
                        );
                      }
                    }}
                    style={{
                      color: activeLink === menu.href ? "#3C91E6" : "",
                      position: "relative",
                      transition: "color 0.2s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (activeLink !== menu.href && !menu.submenus)
                        e.target.style.color = "#3C91E6";
                    }}
                    onMouseLeave={(e) => {
                      if (activeLink !== menu.href && !menu.submenus)
                        e.target.style.color = "";
                    }}
                  >
                    {menu.title}
                    {menu.submenus && (
                      <span
                        className="far fa-angle-down"
                        style={{
                          marginLeft: "5px",
                          fontSize: "12px",
                          transform:
                            activeDropdown === menu.id
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          transition: "transform 0.25s ease",
                          display: "inline-block",
                        }}
                      />
                    )}
                    {activeLink === menu.href && (
                      <span
                        style={{
                          position: "absolute",
                          bottom: "-2px",
                          left: "0",
                          width: "100%",
                          height: "2px",
                          backgroundColor: "#3C91E6",
                        }}
                      />
                    )}
                  </Link>
                  {menu.submenus && (
                    <>
                      <ul
                        className="dropdown-menu"
                        style={{
                          backgroundColor: "rgba(10,61,98,0.98)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          borderRadius: "12px",
                          padding: "12px 0",
                          minWidth: "220px",
                          position: "absolute",
                          top: "100%",
                          left: "0",
                          opacity: activeDropdown === menu.id ? "1" : "0",
                          visibility:
                            activeDropdown === menu.id ? "visible" : "hidden",
                          transform:
                            activeDropdown === menu.id
                              ? "translateY(0)"
                              : "translateY(-5px)",
                          transition: "all 0.25s ease",
                          zIndex: "9999",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          marginTop: "0px",
                        }}
                      >
                        {menu.submenus.map((submenu) => (
                          <li key={submenu.id}>
                            <Link
                              href={`/${submenu.href}`}
                              onClick={() => setActiveLink(submenu.href)}
                              style={{
                                color: "white",
                                padding: "10px 20px",
                                display: "block",
                                transition: "all 0.3s ease",
                                textDecoration: "none",
                                backgroundColor: "transparent",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.color = "#FFFFFF !important";
                                e.target.style.textShadow =
                                  "0 0 12px rgba(60, 145, 230, 0.8), 0 0 20px rgba(60, 145, 230, 0.4)";
                                e.target.style.backgroundColor =
                                  "transparent !important";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.color = "white !important";
                                e.target.style.textShadow = "none";
                                e.target.style.backgroundColor =
                                  "transparent !important";
                              }}
                            >
                              {submenu.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Fragment>
  );
};
