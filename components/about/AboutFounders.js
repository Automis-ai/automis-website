"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Linkedin, Instagram } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const COPY = {
  en: {
    eyebrow: "The founders",
    title: "The people who build your system",
    lead: "Founder-led and hands-on: we design, build, and ship the systems ourselves. When you work with Automis, you work directly with us.",
    bookCta: "Book a discovery call",
    follow: "Follow @automis.ai",
    profileAria: (label, name) => `${label} profile of ${name}`,
    founders: [
      {
        name: "Vincenzo Luca Casillo",
        role: "AI Growth Strategy & Marketing Systems",
        image: "/assets/images/headshots/luca.jpeg",
        bio: "Vincenzo has spent years building AI systems, agents, and automations that turn messy, manual growth work into predictable revenue engines. He has a sharp eye for the bottleneck: he walks into a business, maps where time and money leak, and pinpoints exactly which processes are ready to be automated. From conversion-first funnels to AI-driven lead follow-up, he designs and ships the whole system end to end. Clients don't get slides and theory; they get a working machine they own and can rely on.",
        social: {
          type: "linkedin",
          url: "https://www.linkedin.com/in/vincenzo-luca-casillo/",
          label: "LinkedIn",
        },
      },
      {
        name: "Arcangelo Bianco",
        role: "AI Automation & Performance Systems",
        image: "/assets/images/headshots/arcangelo.jpeg",
        bio: "Arcangelo is hands-on with every layer of an AI build, from custom agents and multi-step automations to the acquisition systems that feed them. He's obsessed with finding the highest-leverage place to automate: the repetitive task, the slow handoff, the follow-up that never happens, and turning it into a system that runs on its own. He pairs that with performance advertising that measurably improves CAC and ROAS across Meta, Google, and beyond. The result is real, owned infrastructure that keeps delivering results long after the build is done.",
        social: {
          type: "instagram",
          url: "https://instagram.com/arcangelo.automis",
          label: "Instagram",
        },
      },
    ],
  },
  it: {
    eyebrow: "I fondatori",
    title: "Le persone che costruiscono il tuo sistema",
    lead: "Guidata dai fondatori e operativa sul campo: progettiamo, costruiamo e rilasciamo i sistemi in prima persona. Quando lavori con Automis, lavori direttamente con noi.",
    bookCta: "Prenota una call",
    follow: "Segui @automis_italia",
    profileAria: (label, name) => `Profilo ${label} di ${name}`,
    founders: [
      {
        name: "Vincenzo Luca Casillo",
        role: "Strategia di crescita IA e sistemi di marketing",
        image: "/assets/images/headshots/luca.jpeg",
        bio: "Vincenzo ha passato anni a costruire sistemi IA, agenti e automazioni che trasformano il lavoro di crescita disordinato e manuale in motori di fatturato prevedibili. Ha un occhio chirurgico per i colli di bottiglia: entra in un business, individua dove si perdono tempo e denaro e capisce con precisione quali processi sono pronti per essere automatizzati. Dai funnel orientati alla conversione al follow-up dei lead guidato dall'IA, progetta e rilascia l'intero sistema dall'inizio alla fine. I clienti non ricevono slide e teoria: ricevono una macchina che funziona, che possiedono e su cui possono contare.",
        social: {
          type: "linkedin",
          url: "https://www.linkedin.com/in/vincenzo-luca-casillo/",
          label: "LinkedIn",
        },
      },
      {
        name: "Arcangelo Bianco",
        role: "Automazione IA e sistemi di performance",
        image: "/assets/images/headshots/arcangelo.jpeg",
        bio: "Arcangelo è operativo su ogni livello di un progetto IA, dagli agenti su misura alle automazioni a più passaggi, fino ai sistemi di acquisizione che li alimentano. È ossessionato dal trovare il punto in cui automatizzare rende di più: l'attività ripetitiva, il passaggio di consegne lento, il follow-up che non parte mai, e dal trasformarlo in un sistema che gira da solo. A questo affianca campagne pubblicitarie a performance che migliorano in modo misurabile CAC e ROAS su Meta, Google e oltre. Il risultato è un'infrastruttura reale e di tua proprietà che continua a produrre risultati molto dopo la fine del progetto.",
        social: {
          type: "instagram",
          url: "https://instagram.com/arcangelo.automis",
          label: "Instagram",
        },
      },
    ],
  },
};

const SOCIAL_ICONS = { linkedin: Linkedin, instagram: Instagram };

export default function AboutFounders() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const booking =
    locale === "it"
      ? "https://api.leadconnectorhq.com/widget/bookings/automis-it"
      : BOOKING;
  const brandInstagram =
    locale === "it"
      ? "https://www.instagram.com/automis_italia/"
      : "https://www.instagram.com/automis.ai";

  return (
    <Section id="founders" className="bg-[#020a12]">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {t.founders.map((f, i) => {
          const SocialIcon = SOCIAL_ICONS[f.social.type];
          return (
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
                    href={f.social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.profileAria(f.social.label, f.name)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/70 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <SocialIcon className="h-4 w-4" strokeWidth={1.9} />
                  </a>
                  <InteractiveHoverButton
                    href={booking}
                    variant="ghost"
                    text={t.bookCta}
                    className="px-5 py-2.5 text-[13.5px]"
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={200}>
        <div className="mt-10 flex justify-center">
          <a
            href={brandInstagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/55 transition-colors hover:text-white/85"
          >
            <Instagram className="h-3.5 w-3.5 text-[#8fe0f0]" strokeWidth={2} />
            {t.follow}
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
