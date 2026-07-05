"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Linkedin, Instagram } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/booking/3Nvnzsvjaw89VWsdBBXF";

const FOUNDERS = [
  {
    name: "Vincenzo Luca Casillo",
    role: "Digital Marketing & AI Growth Strategy",
    image: "/assets/images/headshots/luca.jpeg",
    bio: "Turns paid traffic into predictable revenue with conversion-first funnels, lead follow-up systems, and performance-driven strategy.",
    linkedin: "https://www.linkedin.com/in/vincenzo-luca-casillo/",
  },
  {
    name: "Arcangelo Bianco",
    role: "Performance Advertising",
    image: "/assets/images/headshots/arcangelo.jpeg",
    bio: "Builds and scales ad systems that improve CAC and ROAS across Meta, Google, and multi-channel acquisition.",
    linkedin: "https://www.linkedin.com/in/biancoarcangelo/",
  },
];

export default function AboutFounders() {
  return (
    <Section id="founders" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="The founders"
        title={<>The people who build your system</>}
        lead="Founder-led and hands-on: we design, build, and ship the systems ourselves. When you work with Automis, you work directly with us."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FOUNDERS.map((f, i) => (
          <Reveal key={f.name} delay={i * 100}>
            <div className="card-glow group flex h-full flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-sm">
              <img
                src={f.image}
                alt={f.name}
                className="h-40 w-40 rounded-full border border-white/15 object-cover object-top"
                loading="lazy"
              />
              <h3 className="font-display mt-6 text-xl font-semibold text-white">{f.name}</h3>
              <p className="mt-1 text-[13.5px] font-medium text-[#8fe0f0]">{f.role}</p>
              <p className="mt-4 max-w-sm text-[14.5px] leading-relaxed text-white/60">{f.bio}</p>
              <div className="mt-auto flex items-center gap-3 pt-6">
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LinkedIn profile of ${f.name}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/70 transition-colors hover:border-white/25 hover:text-white"
                >
                  <Linkedin className="h-4 w-4" strokeWidth={1.9} />
                </a>
                <a
                  href={BOOKING}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-[13.5px] font-semibold text-white/85 transition-colors hover:border-white/25 hover:text-white"
                >
                  Book a discovery call
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-10 flex justify-center">
          <a
            href="https://www.instagram.com/automis.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white/85"
          >
            <Instagram className="h-3.5 w-3.5 text-[#8fe0f0]" strokeWidth={2} />
            Follow @automis.ai
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
