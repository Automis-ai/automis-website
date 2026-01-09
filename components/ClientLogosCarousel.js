'use client';
import React from "react";

const ClientLogosCarousel = ({ title = "Trusted by Leading Brands Worldwide" }) => {
  const clientLogos = [
    { id: 1, src: "/assets/images/client-logos/logo-1.jpg", alt: "Partner company logo - trusted brand using Automis AI solutions" },
    { id: 2, src: "/assets/images/client-logos/logo-2.png", alt: "Partner company logo - trusted brand using Automis AI solutions" },
    { id: 3, src: "/assets/images/client-logos/logo-3.svg", alt: "Partner company logo - trusted brand using Automis AI solutions" },
    { id: 4, src: "/assets/images/client-logos/logo-4.png", alt: "Partner company logo - trusted brand using Automis AI solutions" },
    { id: 6, src: "/assets/images/client-logos/logo-6.jpg", alt: "Partner company logo - trusted brand using Automis AI solutions" },
    { id: 7, src: "/assets/images/client-logos/logo-7.jpg", alt: "Partner company logo - trusted brand using Automis AI solutions" },
  ];

  return (
    <section className="py-12 md:py-16 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-180px * 7));
          }
        }
        @media (min-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-250px * 7));
            }
          }
        }
        .logos-slide {
          display: flex;
          animation: scroll 25s linear infinite;
        }
        .logos-slide:hover {
          animation-play-state: paused;
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

      <div
        className="text-center mb-8 md:mb-12 px-4"
        data-aos="fade-up"
        data-aos-duration={1500}
        data-aos-offset={50}
      >
        <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-200">{title}</h4>
      </div>

      <div className="relative hidden md:block">
        <div className="flex overflow-hidden">
          <div className="logos-slide">
            {clientLogos.map((logo) => (
              <div key={`first-${logo.id}`} className="flex-shrink-0 px-8">
                <div className="w-[200px] h-24 flex items-center justify-center transition-all duration-300">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-16 max-w-[160px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
            {clientLogos.map((logo) => (
              <div key={`second-${logo.id}`} className="flex-shrink-0 px-8">
                <div className="w-[200px] h-24 flex items-center justify-center transition-all duration-300">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="max-h-16 max-w-[160px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-0 top-0 w-48 h-full bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10"></div>

        <div className="absolute right-0 top-0 w-48 h-full bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10"></div>
      </div>

      <div className="md:hidden relative">
        <div className="swipe-container flex gap-4 px-4 pb-2" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '12px' }}>
          {clientLogos.map((logo) => (
            <div key={`mobile-${logo.id}`} className="swipe-item flex-shrink-0">
              <div className="w-[120px] h-20 flex items-center justify-center bg-white/5 rounded-lg p-3">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-14 max-w-[100px] object-contain opacity-80"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-2">← Swipe to see more →</p>
      </div>
    </section>
  );
};

export default ClientLogosCarousel;