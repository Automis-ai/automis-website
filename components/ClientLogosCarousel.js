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
      scale: 1.45,
    },
    {
      id: 2,
      src: "/assets/images/client-logos/logo-2.png",
      alt: "Cube Digital Agency",
      scale: 1.2,
    },
    {
      id: 3,
      src: "/assets/images/client-logos/logo-3.svg",
      alt: "Crescere Digitale",
      scale: 1.35,
      mode: "invert",
    },
    {
      id: 4,
      src: "/assets/images/client-logos/logo-4.png",
      alt: "Last Minute Click",
      scale: 1.4,
      mode: "invert",
    },
    {
      id: 6,
      src: "/assets/images/client-logos/logo-6.jpg",
      alt: "Client Logo",
      scale: 1.15,
    },
    {
      id: 7,
      src: "/assets/images/client-logos/logo-7.jpg",
      alt: "Client Logo",
      scale: 1.2,
    },
  ];

  return (
    <section className="py-14 md:py-20 overflow-hidden">
      {/* ANIMATION */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-320px * ${clientLogos.length}));
          }
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
      <div
        className="text-center mb-10 md:mb-14 px-4"
        data-aos="fade-up"
        data-aos-duration={1200}
      >
        <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-200">
          {title}
        </h4>
      </div>

      {/* DESKTOP */}
      <div className="relative hidden md:block">
        <div className="overflow-hidden">
          <div className="logos-track">
            {[...clientLogos, ...clientLogos].map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 px-6"
              >
                <div className="w-[260px] lg:w-[300px] h-[110px] rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-white/10">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    className={`
                      max-h-[64px]
                      max-w-[200px]
                      object-contain
                      transition-all
                      duration-300
                      opacity-90
                      hover:opacity-100
                      ${logo.mode === "invert" ? "invert brightness-110" : ""}
                    `}
                    style={{
                      transform: `scale(${logo.scale || 1})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDGE FADES */}
        <div className="absolute left-0 top-0 w-40 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
        <div className="absolute right-0 top-0 w-40 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
      </div>

      {/* MOBILE */}
      <div className="md:hidden px-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide">
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className="snap-center flex-shrink-0"
            >
              <div className="w-[200px] h-[96px] rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  loading="lazy"
                  className={`
                    max-h-[56px]
                    max-w-[150px]
                    object-contain
                    opacity-90
                    ${logo.mode === "invert" ? "invert brightness-110" : ""}
                  `}
                  style={{
                    transform: `scale(${logo.scale || 1})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-3">
          ← Swipe to see more →
        </p>
      </div>
    </section>
  );
};

export default ClientLogosCarousel;