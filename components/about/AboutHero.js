"use client";
import { usePathname } from "next/navigation";
import { Reveal, Eyebrow, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const COPY = {
  en: {
    eyebrow: "The team behind Automis",
    h1a: "Two founders, hands-on with ",
    h1b: "your build",
    body:
      "Automis is a strategic AI integrator. We build the AI systems your business is missing, end to end, shaped around how your business actually works. No handoffs to a junior team: the people who design your system are the people who build it.",
    ctaPrimary: "Book a discovery call",
    ctaSecondary: "See how we work",
  },
  it: {
    eyebrow: "Il team dietro Automis",
    h1a: "Due founder, al lavoro sul ",
    h1b: "tuo progetto",
    body:
      "Automis è un integratore strategico di IA. Costruiamo i sistemi di IA che mancano al tuo business, dall'inizio alla fine, modellati sul modo in cui la tua azienda lavora davvero. Nessun passaggio di mano a un team di junior: chi progetta il tuo sistema è chi lo costruisce.",
    ctaPrimary: "Prenota una call",
    ctaSecondary: "Scopri come lavoriamo",
  },
  pt: {
    eyebrow: "A equipa por trás da Automis",
    h1a: "Dois fundadores, envolvidos no ",
    h1b: "seu projeto",
    body:
      "A Automis é um integrador estratégico de IA. Construímos os sistemas de IA que faltam ao seu negócio, de ponta a ponta, moldados à forma como a sua empresa trabalha de facto. Sem entregas a uma equipa júnior: quem desenha o seu sistema é quem o constrói.",
    ctaPrimary: "Agende uma chamada",
    ctaSecondary: "Veja como trabalhamos",
  },
};

export default function AboutHero() {
  const locale = usePathname()?.startsWith("/pt")
    ? "pt"
    : usePathname()?.startsWith("/it")
    ? "it"
    : "en";
  const t = COPY[locale];
  const booking =
    locale === "it"
      ? "https://api.leadconnectorhq.com/widget/bookings/automis-it"
      : locale === "pt"
      ? "https://api.leadconnectorhq.com/widget/bookings/pt-automis"
      : BOOKING;

  return (
    <section className="relative overflow-hidden bg-deep-blue pt-32 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 opacity-50 blur-3xl"
          style={{ background: "radial-gradient(50% 50% at 50% 0%, rgba(60,145,230,0.26), transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-5 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal immediate>
            <Eyebrow>{t.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal immediate delay={60}>
            <h1 className="font-display mt-6 text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white [text-wrap:balance] sm:text-[3rem] md:text-[3.4rem]">
              {t.h1a}<GradientText>{t.h1b}</GradientText>
            </h1>
          </Reveal>
          <Reveal immediate delay={120}>
            <p className="mx-auto mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/65 [text-wrap:pretty]">
              {t.body}
            </p>
          </Reveal>
          <Reveal immediate delay={180}>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <InteractiveHoverButton href={booking} target="_blank" rel="noopener noreferrer" variant="solid" text={t.ctaPrimary} />
              <InteractiveHoverButton href="#process" variant="ghost" text={t.ctaSecondary} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
