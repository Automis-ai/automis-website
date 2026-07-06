"use client";

import { usePathname } from "next/navigation";
import { Mail, Calendar, Clock } from "lucide-react";
import { GRAD } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

/*
  Right column of the /contact page: direct contact methods + a short prompt
  toward the booking calendar. The live booking calendar itself is rendered
  ONCE on this page, in the FinalCta section at the bottom (the last, most
  prominent block). This aside intentionally does NOT embed a second calendar;
  it links down to it via the #book anchor on FinalCta.
*/

const COPY = {
  en: {
    reachTitle: "Reach us directly",
    emailLabel: "Email",
    followLabel: "Follow",
    talkTitle: "Prefer to talk?",
    talkBody:
      "Skip the form and grab a time on the calendar. It's a 30-minute, no-pressure discovery call, with instant confirmation.",
    duration: "30 minutes · no obligation",
    cta: "See available times",
    socials: [
      { name: "Instagram", href: "https://www.instagram.com/automis.ai/", label: "automis.ai" },
      { name: "LinkedIn", href: "https://www.linkedin.com/company/automisai", label: "automisai" },
      { name: "Facebook", href: "https://www.facebook.com/automisai", label: "automisai" },
      { name: "X", href: "https://x.com/AutomisAI", label: "@AutomisAI" },
    ],
  },
  it: {
    reachTitle: "Contattaci direttamente",
    emailLabel: "Email",
    followLabel: "Seguici",
    talkTitle: "Preferisci parlarne?",
    talkBody:
      "Salta il form e scegli un orario sul calendario. È una call conoscitiva di 30 minuti, senza pressioni, con conferma immediata.",
    duration: "30 minuti · senza impegno",
    cta: "Vedi gli orari disponibili",
    socials: [
      { name: "Instagram", href: "https://www.instagram.com/automis_italia/", label: "automis_italia" },
      { name: "LinkedIn", href: "https://www.linkedin.com/company/automis-italia/", label: "automis-italia" },
      { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61575356883644", label: "Automis Italia" },
      { name: "X", href: "https://x.com/AutomisAI", label: "@AutomisAI" },
    ],
  },
};

export default function ContactAside() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];

  return (
    <div className="space-y-6">
      {/* Direct contact */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
        <h3 className="font-display text-[1.25rem] text-white">{t.reachTitle}</h3>
        <a
          href="mailto:info@automis.ai"
          className="mt-4 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-colors duration-300 hover:border-[#3C91E6]/40 hover:bg-white/[0.05]"
        >
          <span
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
            style={{ background: GRAD }}
          >
            <Mail className="h-5 w-5 text-[#04101c]" />
          </span>
          <span>
            <span className="block text-[12px] uppercase tracking-[0.14em] text-white/45">{t.emailLabel}</span>
            <span className="block text-[15px] font-medium text-white">info@automis.ai</span>
          </span>
        </a>

        <div className="mt-5">
          <span className="text-[12px] uppercase tracking-[0.14em] text-white/45">{t.followLabel}</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {t.socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[13px] text-white/70 transition-colors duration-300 hover:border-[#3C91E6]/40 hover:text-white"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Prefer to talk? Point down to the single booking calendar in FinalCta. */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: GRAD }}
        >
          <Calendar className="h-5 w-5 text-[#04101c]" />
        </span>
        <h3 className="font-display mt-4 text-[1.25rem] text-white">{t.talkTitle}</h3>
        <p className="mt-2 text-[14px] leading-relaxed text-white/60">
          {t.talkBody}
        </p>
        <div className="mt-3 flex items-center gap-2 text-[13px] text-white/55">
          <Clock className="h-4 w-4 text-[#57C7E3]" />
          <span>{t.duration}</span>
        </div>
        <div className="mt-5">
          <InteractiveHoverButton href="#book" variant="solid" text={t.cta} />
        </div>
      </div>
    </div>
  );
}
