"use client";

import Marquee from "react-fast-marquee";

/* Client logos, boxless. Unified monochrome treatment so mixed-source logos
   read as one clean row on the dark field. `light` marks logos that are already
   pale (invert would erase them). */
const LOGOS = [
  { src: "/assets/images/client-logos/logo-1.jpg", alt: "Dati Ascensori" },
  { src: "/assets/images/client-logos/logo-2.png", alt: "Cube Digital Agency" },
  { src: "/assets/images/client-logos/logo-3.svg", alt: "Crescere Digitale", light: true },
  { src: "/assets/images/client-logos/logo-4.png", alt: "Last Minute Click", light: true },
  { src: "/assets/images/client-logos/logo-6.jpg", alt: "Client" },
  { src: "/assets/images/client-logos/logo-7.jpg", alt: "Client" },
];

export default function LogoStrip({ title }) {
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-12">
      {title && (
        <p className="mb-8 px-4 text-center font-plex-mono text-[0.7rem] uppercase tracking-[0.22em] text-white/40">
          {title}
        </p>
      )}
      <div className="relative">
        <Marquee speed={38} gradient={false} pauseOnHover autoFill>
          {LOGOS.map((logo, i) => (
            <div key={`${logo.alt}-${i}`} className="mx-10 flex items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                className={`h-9 w-auto max-w-[160px] object-contain opacity-55 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 md:h-10 ${
                  logo.light ? "invert" : ""
                }`}
              />
            </div>
          ))}
        </Marquee>
        {/* edge fades blended to the page background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-deep-blue to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-deep-blue to-transparent" />
      </div>
    </section>
  );
}
