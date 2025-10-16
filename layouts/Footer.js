import Link from "next/link";

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
  return (
    <footer className="container main-footer footer-one relative z-1">
      <div className="max-w-1660 mx-auto px-4 clearfix">
        <div className="max-w-1660 mx-auto footer-content-wrapper flex flex-col lg:flex-row lg:flex-nowrap justify-between items-center lg:items-start pt-20 !pb-16 lg:pt-40">
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center lg:justify-start">
            <div className="widget-about text-center lg:!text-left flex flex-col items-center lg:items-start">
              <Link href="#home">
                <img
                  src="/assets/images/logos/logo.png"
                  alt="Automis AI - AI-powered marketing and automation solutions"
                  style={{ height: "3rem" }}
                  className="mb-4"
                  loading="lazy"
                />
              </Link>
              <p className="mb-3 max-w-md text-white">
                <strong>About Company:</strong> Automis combines AI-driven marketing with human expertise to accelerate growth for SMEs and startups.
              </p>
              <p className="mb-0 text-white">
                <strong>Email:</strong> <a href="mailto:info@automis.ai" className="text-white hover:text-blue-200 transition-colors">info@automis.ai</a>
              </p>
            </div>
          </div>
          <div className="footer-social-wrapper w-full lg:w-1/2 flex justify-center lg:justify-end items-center lg:items-start">
            <div className="social-style-one flex flex-wrap gap-3 justify-center lg:justify-end">
              <a
                href="https://x.com/AutomisAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://www.instagram.com/automis.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://www.linkedin.com/company/automisai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href="https://www.facebook.com/automisai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom py-15">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="copyright-text text-center lg:text-left">
                <p className="mb-0 text-white">
                  Copyright © {new Date().getFullYear()} <Link href="#home" className="text-white">Automis </Link> All Rights
                  Reserved
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="footer-bottom-menu text-center lg:!text-right">
                <ul className="flex gap-4 sm:gap-6 justify-center lg:justify-end mb-0">
                  <li>
                    <Link href="privacy-policy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="terms-of-service" className="text-white/70 hover:text-white transition-colors">Terms of Service</Link>
                  </li>
                </ul>
              </div>
            </div>
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
  return (
    <footer className="container main-footer footer-one relative z-1">
      <div className="max-w-1660 mx-auto px-4 clearfix">
        <div className="max-w-1660 mx-auto flex flex-col lg:flex-row justify-between items-center pt-20 pb-12 lg:pt-40">
          <div className="w-full lg:w-1/3 mb-8 lg:mb-0 flex items-center justify-center lg:justify-start">
            <div className="widget-about text-center lg:text-left">
              <Link href="#home">
                <img
                  src="/assets/images/logos/logo.png"
                  alt="Automis AI - AI-powered marketing and automation solutions"
                  style={{ height: "3rem" }}
                  className="mb-2"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex justify-center lg:justify-end items-center">
            <div className="social-style-one flex flex-wrap gap-3 justify-center lg:justify-end">
              <a
                href="https://x.com/AutomisAI"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="https://www.instagram.com/automis.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-instagram" />
              </a>
              <a
                href="https://www.linkedin.com/company/automisai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href="https://www.facebook.com/automisai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <i className="fab fa-facebook-f" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom py-15">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
              <div className="copyright-text text-center lg:text-left">
                <p className="mb-0 text-white/80">
                  Copyright @2024 <Link href="#home" className="text-white">Automis </Link> Tutti i diritti
                  riservati.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="footer-bottom-menu text-center lg:text-right">
                <ul className="flex gap-4 sm:gap-6 justify-center lg:justify-end mb-0">
                  <li>
                    <Link href="/privacy-policy" className="text-white/45 hover:text-white transition-colors">Informativa sulla Privacy</Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service" className="text-white/45 hover:text-white transition-colors">Termini di Servizio</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <button className="scroll-top scroll-to-target" data-target="html">
            <span className="far fa-angle-double-up" />
          </button>
        </div>
      </div>
    </footer>
  );
};