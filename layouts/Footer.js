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

const ElevenBadge = () => (
  <a
    href="https://elevenlabs.io/startup-grants"
    target="_blank"
    rel="noopener noreferrer"
    className="flex justify-center"
  >
    <img
      src="https://eleven-public-cdn.elevenlabs.io/payloadcms/cy7rxce8uki-IIElevenLabsGrants%201.webp"
      alt="ElevenLabs Startup Grant"
      className="w-36 md:w-44 opacity-90 hover:opacity-100 transition"
    />
  </a>
);

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
                  alt="Automis AI"
                  style={{ height: "3rem" }}
                  className="mb-4"
                  loading="lazy"
                />
              </Link>
              <p className="mb-3 max-w-md text-white">
                <strong>About Company:</strong> Automis combines AI-driven
                marketing with human expertise to accelerate growth for SMEs and
                startups.
              </p>
              <p className="mb-0 text-white">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:info@automis.ai"
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  info@automis.ai
                </a>
              </p>
            </div>
          </div>

          <div className="footer-social-wrapper w-full lg:w-1/2 flex justify-center lg:justify-end items-center lg:items-start">
            <div className="social-style-one flex flex-wrap gap-3 justify-center lg:justify-end">
              <a href="https://x.com/AutomisAI" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
              <a href="https://www.instagram.com/automis.ai/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a>
              <a href="https://www.linkedin.com/company/automisai" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in" /></a>
              <a href="https://www.facebook.com/automisai" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a>
            </div>
          </div>
        </div>

        {/* ✅ AREA FINALE */}
        <div className="footer-bottom py-10 flex flex-col items-center gap-4">

          {/* COPYRIGHT */}
          <p className="text-white text-center">
            © {new Date().getFullYear()} <Link href="#home" className="text-white underline-offset-2">Automis</Link> — All Rights Reserved
          </p>

          {/* ✅ BADGE ELEVEN LABS (CENTRATO E RIDOTTO) */}
          <ElevenBadge />

          {/* PRIVACY + TERMS */}
          <ul className="flex gap-6 justify-center text-white/70">
            <li><Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>

        </div>

        <button className="scroll-top scroll-to-target" data-target="html">
          <span className="far fa-angle-double-up" />
        </button>
      </div>
    </footer>
  );
};

const Footer2 = () => {
  return (
    <footer className="container main-footer footer-one relative z-1">
      <div className="max-w-1660 mx-auto px-4 clearfix">
        <ElevenBadge />
      </div>
    </footer>
  );
};
