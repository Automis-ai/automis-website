"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { PhoneMissed, MoonStar, Clock } from "lucide-react";

const ICONS = [PhoneMissed, MoonStar, Clock];

const COPY = {
  en: {
    eyebrow: "The problem",
    title: <>Every missed call and cold lead is a booking you never see.</>,
    lead: "Calls come in when no one is free to answer, on nights, weekends, and busy afternoons. New leads come in faster than anyone can call back. Either way, the appointment goes to whoever picks up first.",
    pains: [
      {
        title: "Missed calls are lost customers",
        body: "Every unanswered call is a prospect who dials the next business on the list. Voicemail rarely gets a callback, and the booking is gone before you even know it rang.",
      },
      {
        title: "Nobody answers after hours",
        body: "Most inquiries land outside 9-to-5, on nights and weekends. If there is no one to pick up, the after-hours demand you paid to generate quietly leaks away.",
      },
      {
        title: "Slow follow-up kills the deal",
        body: "Leads go cold in minutes. When it takes hours to call back, the intent is gone and the appointment goes to whoever answered first.",
      },
    ],
  },
  it: {
    eyebrow: "Il problema",
    title: <>Ogni chiamata persa e ogni contatto lasciato raffreddare è una prenotazione che non vedrai mai.</>,
    lead: "Le chiamate arrivano quando non c'è nessuno libero a rispondere: di sera, nei weekend, nei pomeriggi più intensi. E i nuovi contatti arrivano più in fretta di quanto chiunque riesca a richiamarli. In entrambi i casi, l'appuntamento va a chi risponde per primo.",
    pains: [
      {
        title: "Una chiamata persa è un cliente perso",
        body: "Ogni chiamata senza risposta è un potenziale cliente che chiama subito il prossimo nome della lista. Alla segreteria quasi nessuno lascia un messaggio, e la prenotazione è già sfumata prima ancora che tu sappia che il telefono ha squillato.",
      },
      {
        title: "Fuori orario non risponde nessuno",
        body: "La maggior parte delle richieste arriva fuori dal 9-18, di sera e nei weekend. Se non c'è nessuno a rispondere, la domanda fuori orario che hai pagato per generare si disperde in silenzio.",
      },
      {
        title: "Un follow-up lento fa saltare la trattativa",
        body: "I contatti si raffreddano in pochi minuti. Se per richiamare ci vogliono ore, l'interesse è già svanito e l'appuntamento va a chi ha risposto per primo.",
      },
    ],
  },
  pt: {
    eyebrow: "O problema",
    title: <>Cada chamada perdida e cada contacto deixado a arrefecer é uma marcação que nunca chega a ver.</>,
    lead: "As chamadas entram quando não há ninguém livre para atender: à noite, aos fins de semana, nas tardes mais preenchidas. E os novos contactos entram mais depressa do que qualquer pessoa consegue ligar de volta. Em ambos os casos, a consulta fica para quem atende primeiro.",
    pains: [
      {
        title: "Uma chamada perdida é um cliente perdido",
        body: "Cada chamada sem resposta é um potencial cliente que liga logo para o próximo nome da lista. Quase ninguém deixa mensagem no atendedor, e a marcação já se perdeu antes mesmo de saber que o telefone tocou.",
      },
      {
        title: "Fora de horário não atende ninguém",
        body: "A maioria dos pedidos chega fora do 9-18, à noite e aos fins de semana. Se não há ninguém para atender, a procura fora de horas que pagou para gerar dissipa-se em silêncio.",
      },
      {
        title: "Um follow-up lento faz perder o negócio",
        body: "Os contactos arrefecem em poucos minutos. Quando demora horas a ligar de volta, o interesse já desapareceu e a consulta fica para quem atendeu primeiro.",
      },
    ],
  },
};

export default function VoiceProblem() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  return (
    <Section id="voice-problem" className="bg-[#020a12]">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        titleClassName="mx-auto max-w-[30ch] sm:max-w-[42ch]"
      />
      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {t.pains.map((p, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={p.title} delay={i * 120}>
              <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-6 text-[1.25rem] font-semibold leading-tight text-white">{p.title}</h3>
                <p className="mt-3.5 text-[14.5px] leading-relaxed text-white/60">{p.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
