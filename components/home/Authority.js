"use client";
import { Section, Reveal, GRAD } from "./_ui";
import { ShieldCheck, Lock, UserCheck, Instagram } from "lucide-react";

const FOUNDERS = [
  {
    name: "Luca Casillo",
    role: "Co-Founder · Italy",
    image: "/assets/images/headshots/luca.jpeg",
  },
  {
    name: "Arcangelo Bianco",
    role: "Co-Founder · Portugal",
    image: "/assets/images/headshots/arcangelo.jpeg",
  },
];

const TRUST = [
  {
    icon: ShieldCheck,
    title: "The Automis Guarantee",
    body: "A 30-day performance guarantee on every Voice plan, and a setup-fee refund on custom engagements. We de-risk the first step so you don't have to.",
  },
  {
    icon: Lock,
    title: "Privacy-first by design",
    body: "GDPR-aligned, with EU / local server options for healthcare and financial data. Your information stays where it should.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop",
    body: "Complex or sensitive cases route straight to your team. AI handles the volume; people handle the nuance.",
  },
];

export default function Authority() {
  return (
    <Section id="authority" className="bg-[#020a12]">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Founders */}
        <Reveal>
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">The team behind it</span>
            <h2 className="font-display mt-4 text-[1.9rem] font-semibold leading-tight text-white sm:text-[2.2rem]">
              Two founders, on the ground in your market
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/60">
              We build in Portugal and Italy, close enough to understand how European businesses
              actually run, and hands-on enough to build systems that fit them.
            </p>
            <div className="mt-8 flex gap-5">
              {FOUNDERS.map((f) => (
                <div key={f.name} className="flex items-center gap-3.5">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="h-14 w-14 rounded-full border border-white/15 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-[15px] font-semibold text-white">{f.name}</p>
                    <p className="text-[12.5px] text-white/60">{f.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://www.instagram.com/automis.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white/85"
            >
              <Instagram className="h-3.5 w-3.5 text-[#8fe0f0]" strokeWidth={2} />
              Follow @automis.ai
            </a>
          </div>
        </Reveal>

        {/* Trust pillars */}
        <div className="flex flex-col gap-4">
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <Reveal key={t.title} delay={i * 100}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(60,145,230,0.12)" }}>
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{t.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
