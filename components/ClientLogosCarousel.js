'use client';
import React from "react";

const ClientLogosCarousel = ({ title = "Trusted by Leading Brands Worldwide" }) => {
  /**
   * Optional: set tone: "dark" for logos that are too dark on a dark background.
   * This will apply stronger brightness/contrast to improve readability.
   *
   * Examples:
   * { id: 2, src: "/assets/images/client-logos/logo-2.png", alt: "...", tone: "dark" }
   */
  const clientLogos = [
    { id: 1, src: "/assets/images/client-logos/logo-1.jpg", alt: "Partner company logo - trusted brand using Automis AI solutions" },
    { id: 2, src: "/assets/images/client-logos/logo-2.png", alt: "Partner company logo - trusted brand using Automis AI solutions", tone: "dark" },
    { id: 3, src: "/assets/images/client-logos/logo-3.svg", alt: "Partner company logo - trusted brand using Automis AI solutions", tone: "dark" },
    { id: 4, src: "/assets/images/client-logos/logo-4.png", alt: "Partner company logo - trusted brand using Automis AI solutions" },
    { id: 6, src: "/assets/images/client-logos/logo-6.jpg", alt: "Partner company logo - trusted brand using Automis AI solutions" },
    { id: 7, src: "/assets/images/client-logos/logo-7.jpg", alt: "Partner company logo - trusted brand using Automis AI solutions" },
  ];

  const getToneClass = (tone) => {
    // Default: mild boost for most logos
    if (!tone) return "brightness-110 contrast-110";
    // Dark logos: stronger boost
    if (tone === "dark") return "brightness-150 contrast-125";
    // Light logos: keep more neutral
    if (tone === "light") return "brightness-100 contrast-100";
    return "brightness-110 contrast-110";
  };

  // We duplicate the list so the animation can scroll seamlessly to -50%
  const trackLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .logos-track {
          display: flex;
          width: max-content;
          animation: scroll 25s linear infinite;
        }

        .logos-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .logos-track {
            animation: none;
            transform: translateX(0);
          }
        }

        @media (max-width: 767px) {
          .swipe-container {
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .swipe-container::-webkit-scrollbar {
            display: none;
          }
          .swipe-item {
            scroll-snap-align: center;
          }
        }
      `}</style>

      {/* Title */}
      <div
        className="text-center mb-8 md:mb-12 px-4"
        data-aos="fade-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-200">
          {title}
        </h4>
      </div>

      {/* Desktop: auto-scrolling carousel */}
      <div className="relative hidden md:block">
        <div className="flex overflow-hidden">
          <div className="logos-track">
            {trackLogos.map((logo, idx) => (
              <div key={`${logo.id}-${idx}`} className="flex-shrink-0 px-8">
                {/* Logo "pill" background to improve readability */}
                <div className="w-[220px] h-24 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center px-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 hover:border-white/20 transition">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`h-10 w-auto max-w-[160px] object-contain opacity-90 hover:opacity-100 transition ${getToneClass(logo.tone)}`}
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Softer edge fades (avoid hiding logos too much) */}
        <div className="absolute left-0 top-0 w-48 h-full bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-10" />
      </div>

      {/* Mobile: swipeable row */}
      <div className="md:hidden relative">
        <div
          className="swipe-container flex gap-4 px-4 pb-2"
          style={{
            background: "rgba(255,255,255,0.03)",
            borderRadius: "12px",
            padding: "12px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {clientLogos.map((logo) => (
            <div key={`mobile-${logo.id}`} className="swipe-item flex-shrink-0">
              <div className="w-[140px] h-20 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/10 p-3">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={`max-h-14 max-w-[110px] object-contain opacity-90 ${getToneClass(logo.tone)}`}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-2">
          ← Swipe to see more →
        </p>
      </div>
    </section>
  );
};

export default ClientLogosCarousel;