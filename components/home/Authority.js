"use client";
import { usePathname } from "next/navigation";
import { Section, Reveal, GRAD } from "./_ui";
import { ShieldCheck, Lock, UserCheck, Instagram } from "lucide-react";

const FOUNDERS = [
  {
    name: "Luca Casillo",
    image: "/assets/images/headshots/luca.jpeg",
  },
  {
    name: "Arcangelo Bianco",
    image: "/assets/images/headshots/arcangelo.jpeg",
  },
];

const TRUST_ICONS = [ShieldCheck, Lock, UserCheck];

const COPY = {
  en: {
    eyebrow: "The team behind it",
    heading: "Two founders, hands-on with your build",
    intro:
      "Founder-led and hands-on: we design, build, and ship the systems ourselves, shaped around how your business actually works.",
    roles: ["Co-Founder", "Co-Founder"],
    follow: "Follow @automis.ai",
    trust: [
      {
        title: "The Automis Guarantee",
        body: "A 30-day performance guarantee on every Voice plan, and a setup-fee refund on custom engagements. We de-risk the first step so you don't have to.",
      },
      {
        title: "Privacy-first by design",
        body: "GDPR-aligned, with EU / local server options for healthcare and financial data. Your information stays where it should.",
      },
      {
        title: "Human-in-the-loop",
        body: "Complex or sensitive cases route straight to your team. AI handles the volume; people handle the nuance.",
      },
    ],
  },
  it: {
    eyebrow: "Il team dietro Automis",
    heading: "Due founder, al lavoro sul tuo progetto",
    intro:
      "Ci mettiamo le mani noi founder: progettiamo, costruiamo e mandiamo online i sistemi in prima persona, cuciti su come lavora davvero il tuo business.",
    roles: ["Co-Founder", "Co-Founder"],
    follow: "Seguici su @automis.ai",
    trust: [
      {
        title: "La Garanzia Automis",
        body: "Una garanzia sui risultati di 30 giorni su ogni piano Voice, e il rimborso del costo di setup sui progetti su misura. Ci prendiamo noi il rischio del primo passo, così non devi farlo tu.",
      },
      {
        title: "Privacy al primo posto, da subito",
        body: "In linea con il GDPR, con opzioni di server in UE o locali per dati sanitari e finanziari. Le tue informazioni restano dove devono stare.",
      },
      {
        title: "C'è sempre una persona nel processo",
        body: "I casi complessi o delicati passano direttamente al tuo team. L'IA gestisce i volumi, le persone gestiscono le sfumature.",
      },
    ],
  },
};

export default function Authority() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  return (
    <Section id="authority" className="bg-[#020a12]">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* Founders */}
        <Reveal>
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{t.eyebrow}</span>
            <h2 className="font-display mt-4 text-[1.9rem] font-semibold leading-tight text-white sm:text-[2.2rem]">
              {t.heading}
            </h2>
            <p className="mt-4 text-[14.5px] leading-relaxed text-white/60">
              {t.intro}
            </p>
            <div className="mt-8 flex gap-5">
              {FOUNDERS.map((f, i) => (
                <div key={f.name} className="flex items-center gap-3.5">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="h-14 w-14 rounded-full border border-white/15 object-cover"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-[15px] font-semibold text-white">{f.name}</p>
                    <p className="text-[12.5px] text-white/60">{t.roles[i]}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={locale === "it" ? "https://www.instagram.com/automis_italia/" : "https://www.instagram.com/automis.ai/"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white/85"
            >
              <Instagram className="h-3.5 w-3.5 text-[#8fe0f0]" strokeWidth={2} />
              {t.follow}
            </a>
          </div>
        </Reveal>

        {/* Trust pillars */}
        <div className="flex flex-col gap-4">
          {t.trust.map((item, i) => {
            const Icon = TRUST_ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 100}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(60,145,230,0.12)" }}>
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{item.body}</p>
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
