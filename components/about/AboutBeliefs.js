"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Boxes, ShieldCheck, UserCheck } from "lucide-react";

const ICONS = [Boxes, ShieldCheck, UserCheck];

const COPY = {
  en: {
    eyebrow: "Who we are",
    title: "We build the systems your business is missing",
    lead: "Automis started from a simple frustration: businesses wanted AI to actually run their operations, but got demos and dashboards instead of working systems. So we build the real thing, end to end, and we build it around how your business already works.",
    beliefs: [
      {
        title: "Systems you own",
        body: "We build bespoke, interconnected systems that belong to you, not a black box you rent. When we're done, the infrastructure is yours: no vendor lock-in, no subscription you can't see inside.",
      },
      {
        title: "Privacy-first by design",
        body: "GDPR-aligned from day one, with EU and local server options for healthcare and financial data. Your information stays where it should, handled the way regulated businesses need it handled.",
      },
      {
        title: "Human-in-the-loop",
        body: "AI handles the volume; people handle the nuance. Complex or sensitive cases route straight to your team, so nothing important gets lost to automation.",
      },
    ],
  },
  it: {
    eyebrow: "Chi siamo",
    title: "Costruiamo i sistemi che mancano al tuo business",
    lead: "Automis nasce da una frustrazione semplice: le aziende volevano un'IA che gestisse davvero le loro operazioni, ma ricevevano demo e dashboard invece di sistemi funzionanti. Così costruiamo la cosa reale, dall'inizio alla fine, e la costruiamo intorno a come il tuo business già lavora.",
    beliefs: [
      {
        title: "Sistemi che sono tuoi",
        body: "Costruiamo sistemi su misura e interconnessi che appartengono a te, non una scatola nera che noleggi. Quando abbiamo finito, l'infrastruttura è tua: nessun vincolo con il fornitore, nessun abbonamento di cui non vedi l'interno.",
      },
      {
        title: "Privacy al centro, per scelta",
        body: "Allineati al GDPR fin dal primo giorno, con opzioni di server nell'UE e in locale per dati sanitari e finanziari. Le tue informazioni restano dove devono restare, gestite come un business regolamentato ha bisogno che siano gestite.",
      },
      {
        title: "La persona resta nel processo",
        body: "L'IA gestisce i volumi, le persone gestiscono le sfumature. I casi complessi o delicati arrivano direttamente al tuo team, così niente di importante si perde nell'automazione.",
      },
    ],
  },
  pt: {
    eyebrow: "Quem somos",
    title: "Construímos os sistemas que faltam ao seu negócio",
    lead: "A Automis nasceu de uma frustração simples: as empresas queriam que a IA gerisse de facto as suas operações, mas recebiam demos e dashboards em vez de sistemas a funcionar. Por isso construímos a coisa real, de ponta a ponta, e construímo-la em torno da forma como o seu negócio já trabalha.",
    beliefs: [
      {
        title: "Sistemas que são seus",
        body: "Construímos sistemas à medida e interligados que lhe pertencem, não uma caixa negra que aluga. Quando terminamos, a infraestrutura é sua: sem dependência de fornecedor, sem uma subscrição cujo interior não consegue ver.",
      },
      {
        title: "Privacidade primeiro, por princípio",
        body: "Alinhados com o RGPD desde o primeiro dia, com opções de servidor na UE e locais para dados de saúde e financeiros. As suas informações ficam onde devem ficar, tratadas como um negócio regulado precisa que sejam tratadas.",
      },
      {
        title: "A pessoa mantém-se no processo",
        body: "A IA trata do volume, as pessoas tratam da nuance. Os casos complexos ou sensíveis chegam diretamente à sua equipa, para que nada de importante se perca na automação.",
      },
    ],
  },
};

export default function AboutBeliefs() {
  const locale = usePathname()?.startsWith("/pt")
    ? "pt"
    : usePathname()?.startsWith("/it")
    ? "it"
    : "en";
  const t = COPY[locale];
  return (
    <Section id="who-we-are" className="bg-[#020a12]">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.beliefs.map((b, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={b.title} delay={i * 100}>
              <div className="card-glow group flex h-full flex-col items-start rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm">
                <span
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl border border-white/10"
                  style={{ background: "rgba(60,145,230,0.10)" }}
                >
                  <Icon className="h-6 w-6 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-6 text-xl font-semibold text-white">{b.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{b.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
