"use client";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Linkedin, Instagram } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const FOUNDERS = [
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
];

const SOCIAL_ICONS = { linkedin: Linkedin, instagram: Instagram };

export default function AboutFounders() {
  return (
    <Section id="founders" className="bg-[#020a12]">
      <SectionHeading
        eyebrow="The founders"
        title={<>The people who build your system</>}
        lead="Founder-led and hands-on: we design, build, and ship the systems ourselves. When you work with Automis, you work directly with us."
      />
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {FOUNDERS.map((f, i) => {
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
                    aria-label={`${f.social.label} profile of ${f.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/70 transition-colors hover:border-white/25 hover:text-white"
                  >
                    <SocialIcon className="h-4 w-4" strokeWidth={1.9} />
                  </a>
                  <InteractiveHoverButton
                    href={BOOKING}
                    variant="ghost"
                    text="Book a discovery call"
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
