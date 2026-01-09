'use client';
import React from "react";

const ClientLogosCarousel = ({
  title = "Trusted by Leading Brands Worldwide",
}) => {
  const clientLogos = [
    {
      id: 1,
      src: "/assets/images/client-logos/logo-1.jpg",
      alt: "Dati Ascensori",
      scaleDesktop: 1.20,
      scaleMobile: 1.1,
    },
    {
      id: 2,
      src: "/assets/images/client-logos/logo-2.png",
      alt: "Cube Digital Agency",
      scaleDesktop: 1.2,
      scaleMobile: 1.05,
    },
    {
      id: 3,
      src: "/assets/images/client-logos/logo-3.svg",
      alt: "Crescere Digitale",
      scaleDesktop: 1.35,
      scaleMobile: 1.1,
      white: true,
    },
    {
      id: 4,
      src: "/assets/images/client-logos/logo-4.png",
      alt: "Last Minute Click",
      scaleDesktop: 1.4,
      scaleMobile: 1.1,
      white: true,
    },
    {
      id: 6,
      src: "/assets/images/client-logos/logo-6.jpg",
      alt: "Client Logo",
      scaleDesktop: 1.15,
      scaleMobile: 1,
    },
    {
      id: 7,
      src: "/assets/images/client-logos/logo-7.jpg",
      alt: "Client Logo",
      scaleDesktop: 1.2,
      scaleMobile: 1,
    },
  ];

  return (
    <section className="py-14 md:py-20 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * ${clientLogos.length})); }
        }
        .logos-track {
          display: flex;
          animation: scroll 30s linear infinite;
        }
        .logos-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* TITLE */}
      <div className="text-center mb-10 md:mb-14 px-4">
        <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200">
          {title}
        </h4>
      </div>

      {/* DESKTOP */}
      <div className="relative hidden md:block">
        <div className="overflow-hidden">
          <div className="logos-track">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div key={`${logo.id}-${index}`} className="flex-shrink-0 px-6">
                <div className="w-[300px] h-[120px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className={`
                      max-h-[70px]
                      max-w-[220px]
                      object-contain
                      opacity-90
                      transition-all
                      ${logo.white ? "invert grayscale brightness-[1.4]" : ""}
                    `}
                    style={{
                      transform: `scale(${logo.scaleDesktop})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
      </div>

      {/* MOBILE */}
      <div className="md:hidden px-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
          {clientLogos.map((logo) => (
            <div key={logo.id} className="snap-center flex-shrink-0">
              <div className="w-[220px] h-[90px] rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center overflow-hidden">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className={`
                    max-h-[56px]
                    max-w-[180px]
                    object-contain
                    opacity-90
                    ${logo.white ? "invert grayscale brightness-[1.4]" : ""}
                  `}
                  style={{
                    transform: `scale(${logo.scaleMobile})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosCarousel;