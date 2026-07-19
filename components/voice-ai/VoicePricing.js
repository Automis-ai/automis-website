"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal, GRAD } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import { Check, ShieldCheck } from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/discover-automis";

const COPY = {
  en: {
    eyebrow: "Pricing",
    title: "Simple plans that pay for themselves in booked appointments.",
    lead: "Pick the level that matches how you sell. Upgrade any time as you grow.",
    mostPopular: "Most popular",
    bookCta: "Book a Discovery Call",
    enterprise: {
      label: "Enterprise / Custom",
      heading: "High volume, multiple locations, or bespoke integrations?",
      body: "Custom call volume, dedicated support, and a system scoped and priced around exactly how your business runs.",
      cta: "Let's talk",
    },
    guarantee: {
      title: "30-day performance guarantee",
      body: "Every plan is backed by our 30-day performance guarantee. If it does not perform, you are covered.",
    },
    tiers: [
      {
        name: "Starter",
        price: "€297",
        period: "/mo",
        tagline: "Everything you need to stop missing calls.",
        features: [
          "200 minutes / month",
          "24/7 inbound call answering",
          "Booking + calendar sync",
          "Missed-call recovery",
          "Call notifications",
        ],
        featured: false,
      },
      {
        name: "Growth",
        price: "€497",
        period: "/mo",
        tagline: "Turn answered calls into a follow-up machine.",
        features: [
          "600 minutes / month",
          "Everything in Starter",
          "CRM sync (GoHighLevel / HubSpot)",
          "SMS & WhatsApp reminders",
          "Automated follow-ups",
          "Multi-calendar / multi-staff",
        ],
        featured: true,
      },
      {
        name: "Scale",
        price: "€697",
        period: "/mo",
        tagline: "A full acquisition engine, voice and beyond.",
        features: [
          "1,500 minutes / month",
          "Everything in Growth",
          "WhatsApp chatbot",
          "Outbound campaigns",
          "Custom integrations",
          "Priority + human-in-the-loop",
          "Advanced analytics",
        ],
        featured: false,
      },
    ],
  },
  it: {
    eyebrow: "Prezzi",
    title: "Piani semplici che si ripagano da soli in appuntamenti prenotati.",
    lead: "Scegli il livello adatto a come vendi. Passa a un piano superiore quando vuoi, man mano che cresci.",
    mostPopular: "Il più scelto",
    bookCta: "Prenota una call",
    enterprise: {
      label: "Enterprise / Su misura",
      heading: "Grandi volumi, più sedi o integrazioni su misura?",
      body: "Volume di chiamate personalizzato, supporto dedicato e un sistema progettato e quotato esattamente su come lavora la tua azienda.",
      cta: "Parliamone",
    },
    guarantee: {
      title: "Garanzia sui risultati a 30 giorni",
      body: "Ogni piano è coperto dalla nostra garanzia sui risultati a 30 giorni. Se non funziona, sei coperto.",
    },
    tiers: [
      {
        name: "Starter",
        price: "€297",
        period: "al mese",
        tagline: "Tutto ciò che ti serve per non perdere più chiamate.",
        features: [
          "200 minuti / mese",
          "Risposta alle chiamate inbound 24/7",
          "Prenotazioni + sincronizzazione del calendario",
          "Recupero delle chiamate perse",
          "Notifiche delle chiamate",
        ],
        featured: false,
      },
      {
        name: "Growth",
        price: "€497",
        period: "al mese",
        tagline: "Trasforma le chiamate in una macchina di follow-up.",
        features: [
          "600 minuti / mese",
          "Tutto ciò che include Starter",
          "Sincronizzazione CRM (GoHighLevel / HubSpot)",
          "Promemoria via SMS e WhatsApp",
          "Follow-up automatici",
          "Multi-calendario / multi-operatore",
        ],
        featured: true,
      },
      {
        name: "Scale",
        price: "€697",
        period: "al mese",
        tagline: "Un motore di acquisizione completo: voce e non solo.",
        features: [
          "1.500 minuti / mese",
          "Tutto ciò che include Growth",
          "Chatbot WhatsApp",
          "Campagne outbound",
          "Integrazioni su misura",
          "Priorità + supervisione umana",
          "Statistiche avanzate",
        ],
        featured: false,
      },
    ],
  },
  pt: {
    eyebrow: "Preços",
    title: "Planos simples que se pagam a si próprios em consultas marcadas.",
    lead: "Escolha o nível que corresponde à forma como vende. Passe a um plano superior quando quiser, à medida que cresce.",
    mostPopular: "O mais escolhido",
    bookCta: "Agende uma chamada",
    enterprise: {
      label: "Enterprise / À medida",
      heading: "Grandes volumes, várias localizações ou integrações à medida?",
      body: "Volume de chamadas personalizado, suporte dedicado e um sistema pensado e orçamentado exatamente à volta de como o seu negócio funciona.",
      cta: "Vamos falar",
    },
    guarantee: {
      title: "Garantia de resultados de 30 dias",
      body: "Cada plano é coberto pela nossa garantia de resultados de 30 dias. Se não funcionar, está protegido.",
    },
    tiers: [
      {
        name: "Starter",
        price: "€297",
        period: "/mês",
        tagline: "Tudo o que precisa para deixar de perder chamadas.",
        features: [
          "200 minutos / mês",
          "Atendimento de chamadas inbound 24/7",
          "Marcação + sincronização da agenda",
          "Recuperação de chamadas perdidas",
          "Notificações de chamadas",
        ],
        featured: false,
      },
      {
        name: "Growth",
        price: "€497",
        period: "/mês",
        tagline: "Transforme as chamadas atendidas numa máquina de follow-up.",
        features: [
          "600 minutos / mês",
          "Tudo o que inclui o Starter",
          "Sincronização com CRM (GoHighLevel / HubSpot)",
          "Lembretes por SMS e WhatsApp",
          "Follow-ups automáticos",
          "Multi-agenda / multi-profissional",
        ],
        featured: true,
      },
      {
        name: "Scale",
        price: "€697",
        period: "/mês",
        tagline: "Um motor de aquisição completo: voz e muito mais.",
        features: [
          "1.500 minutos / mês",
          "Tudo o que inclui o Growth",
          "Chatbot WhatsApp",
          "Campanhas outbound",
          "Integrações à medida",
          "Prioridade + supervisão humana",
          "Estatísticas avançadas",
        ],
        featured: false,
      },
    ],
  },
};

export default function VoicePricing() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const booking = locale === "it" ? "https://api.leadconnectorhq.com/widget/bookings/automis-it" : locale === "pt" ? "https://api.leadconnectorhq.com/widget/bookings/pt-automis" : BOOKING;

  return (
    <Section id="voice-pricing" className="bg-[#020a12]">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {t.tiers.map((tier, i) => (
          <Reveal key={tier.name} delay={i * 110}>
            <div
              className={`group relative flex h-full flex-col rounded-2xl border p-7 backdrop-blur-sm hover:-translate-y-1 ${
                tier.featured
                  ? "card-glow border-[#3C91E6]/35 bg-white/[0.05]"
                  : "card-gold border-white/[0.08] bg-white/[0.03]"
              }`}
            >
              {tier.featured && (
                <span
                  className="absolute right-5 top-5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#04101c]"
                  style={{ background: GRAD }}
                >
                  {t.mostPopular}
                </span>
              )}
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{tier.name}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-[2.6rem] font-bold leading-none text-white">{tier.price}</span>
                <span className="text-[15px] text-white/50">{tier.period}</span>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-white/60">{tier.tagline}</p>
              <ul className="mt-6 space-y-2.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[14px] text-white/80">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex pt-8">
                <InteractiveHoverButton
                  href={booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={tier.featured ? "solid" : "ghost"}
                  text={t.bookCta}
                  className="w-full"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Enterprise / Custom — 4th tier as a full-width band */}
      <Reveal delay={130}>
        <div className="mt-5 flex flex-col items-start gap-5 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-7 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{t.enterprise.label}</p>
            <p className="font-display mt-2 text-[1.3rem] font-semibold leading-snug text-white">
              {t.enterprise.heading}
            </p>
            <p className="mt-1.5 max-w-xl text-[14px] leading-relaxed text-white/60">
              {t.enterprise.body}
            </p>
          </div>
          <InteractiveHoverButton
            href={booking}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            text={t.enterprise.cta}
            className="w-full flex-shrink-0 sm:w-auto"
          />
        </div>
      </Reveal>

      {/* 30-day performance guarantee, all tiers */}
      <Reveal delay={120}>
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-[#FEC458]/25 bg-[#FEC458]/[0.05] p-6 text-center sm:flex-row sm:justify-center sm:text-left">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#FEC458]/30 bg-[#FEC458]/10">
            <ShieldCheck className="h-5 w-5 text-[#FEC458]" strokeWidth={2} />
          </span>
          <div>
            <p className="font-display text-[1.1rem] font-semibold text-white">{t.guarantee.title}</p>
            <p className="mt-1 text-[14px] text-white/60">
              {t.guarantee.body}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
