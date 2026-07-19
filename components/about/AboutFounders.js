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
        role: "AI-Driven Growth & Marketing",
        image: "/assets/images/headshots/luca.jpeg",
        bio: "Vincenzo owns growth and marketing, powered by AI at every step. He runs and optimizes AI-driven advertising across Meta and Google (measurably improving CAC and ROAS), uses AI to win visibility in Google and AI search (SEO and GEO), and builds the conversion-first funnels and content that turn attention into booked demand. He pairs paid acquisition with AI-driven follow-up, so the traffic he generates never goes cold. Clients don't get vanity metrics; they get an AI-powered marketing engine that brings in real, qualified demand.",
        social: {
          type: "linkedin",
          url: "https://www.linkedin.com/in/vincenzo-luca-casillo/",
          label: "LinkedIn",
        },
      },
      {
        name: "Arcangelo Bianco",
        role: "AI Automation & Audit",
        image: "/assets/images/headshots/arcangelo.jpeg",
        bio: "Arcangelo is hands-on with every layer of an AI build, from custom agents and multi-step automations to the Second Brain systems that run on your own data. He's obsessed with finding the highest-leverage place to automate: he walks into a business, maps where time and money leak, and pinpoints exactly which processes are ready to be automated, the repetitive task, the slow handoff, the follow-up that never happens. That audit-first approach turns into real, owned infrastructure that keeps delivering results long after the build is done.",
        social: {
          type: "instagram",
          url: "https://instagram.com/arcangelobianco.ai",
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
        role: "Crescita e marketing guidati dall'IA",
        image: "/assets/images/headshots/luca.jpeg",
        bio: "Vincenzo guida crescita e marketing, con l'IA in ogni passaggio. Gestisce e ottimizza le campagne pubblicitarie guidate dall'IA su Meta e Google (migliorando in modo misurabile CAC e ROAS), usa l'IA per guadagnare visibilità su Google e nelle ricerche IA (SEO e GEO), e costruisce i funnel orientati alla conversione e i contenuti che trasformano l'attenzione in domanda concreta. All'acquisizione a pagamento affianca un follow-up guidato dall'IA, così il traffico che genera non si raffredda mai. Niente metriche di vanità: i clienti ricevono un motore di marketing potenziato dall'IA che porta domanda reale e qualificata.",
        social: {
          type: "linkedin",
          url: "https://www.linkedin.com/in/vincenzo-luca-casillo/",
          label: "LinkedIn",
        },
      },
      {
        name: "Arcangelo Bianco",
        role: "Automazione IA e audit",
        image: "/assets/images/headshots/arcangelo.jpeg",
        bio: "Arcangelo è operativo su ogni livello di un progetto IA, dagli agenti su misura alle automazioni a più passaggi, fino ai sistemi di Second Brain che girano sui dati della tua azienda. È ossessionato dal trovare il punto in cui automatizzare rende di più: entra in un business, individua dove si perdono tempo e denaro e capisce con precisione quali processi sono pronti per essere automatizzati, l'attività ripetitiva, il passaggio di consegne lento, il follow-up che non parte mai. Questo approccio che parte dall'audit diventa un'infrastruttura reale e di tua proprietà, che continua a produrre risultati molto dopo la fine del progetto.",
        social: {
          type: "instagram",
          url: "https://instagram.com/arcangelobianco.ai",
          label: "Instagram",
        },
      },
    ],
  },
  pt: {
    eyebrow: "Os fundadores",
    title: "As pessoas que constroem o seu sistema",
    lead: "Liderada pelos fundadores e no terreno: desenhamos, construímos e lançamos os sistemas nós próprios. Quando trabalha com a Automis, trabalha diretamente connosco.",
    bookCta: "Agende uma chamada",
    follow: "Siga @automis.ai",
    profileAria: (label, name) => `Perfil de ${label} de ${name}`,
    founders: [
      {
        name: "Vincenzo Luca Casillo",
        role: "Crescimento e marketing orientados por IA",
        image: "/assets/images/headshots/luca.jpeg",
        bio: "O Vincenzo lidera o crescimento e o marketing, com IA em cada passo. Gere e otimiza a publicidade orientada por IA no Meta e no Google (melhorando de forma mensurável o CAC e o ROAS), usa a IA para ganhar visibilidade no Google e nas pesquisas por IA (SEO e GEO), e constrói os funnels orientados à conversão e os conteúdos que transformam atenção em procura marcada. Combina a aquisição paga com follow-up orientado por IA, para que o tráfego que gera nunca arrefeça. Os clientes não recebem métricas de vaidade: recebem um motor de marketing potenciado por IA que traz procura real e qualificada.",
        social: {
          type: "linkedin",
          url: "https://www.linkedin.com/in/vincenzo-luca-casillo/",
          label: "LinkedIn",
        },
      },
      {
        name: "Arcangelo Bianco",
        role: "Automação de IA e auditoria",
        image: "/assets/images/headshots/arcangelo.jpeg",
        bio: "O Arcangelo está envolvido em cada camada de um projeto de IA, desde agentes à medida e automações de vários passos até aos sistemas de Second Brain que correm sobre os seus próprios dados. É obcecado por encontrar o ponto de maior alavancagem para automatizar: entra num negócio, mapeia onde escorrem tempo e dinheiro, e identifica com precisão quais os processos prontos para serem automatizados, a tarefa repetitiva, a passagem lenta, o follow-up que nunca acontece. Essa abordagem que parte da auditoria transforma-se em infraestrutura real e sua, que continua a produzir resultados muito depois de o projeto terminar.",
        social: {
          type: "instagram",
          url: "https://instagram.com/arcangelobianco.ai",
          label: "Instagram",
        },
      },
    ],
  },
};

const SOCIAL_ICONS = { linkedin: Linkedin, instagram: Instagram };

export default function AboutFounders() {
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
                    target="_blank"
                    rel="noopener noreferrer"
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
