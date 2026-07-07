"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import {
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  CalendarCheck,
  HelpCircle,
  Filter,
  PhoneMissed,
  Zap,
  RefreshCw,
  BellRing,
  PhoneCall,
  Star,
} from "lucide-react";

/* Two specialized voice agents that work as one system:
   INBOUND = the 24/7 receptionist (answers the calls coming in)
   OUTBOUND = the growth engine (makes the calls going out)
   Icons are structural and stay aligned by index with the localized copy below. */
const INBOUND_HEAD_ICON = PhoneIncoming;
const INBOUND_ITEM_ICONS = [PhoneIncoming, Clock, CalendarCheck, HelpCircle, Filter, PhoneMissed];

const OUTBOUND_HEAD_ICON = PhoneOutgoing;
const OUTBOUND_ITEM_ICONS = [Zap, RefreshCw, BellRing, PhoneOutgoing, PhoneCall, Star];

const COPY = {
  en: {
    heading: {
      eyebrow: "Inbound and outbound",
      title: (
        <>
          One system, <GradientText>two specialized agents</GradientText>.
        </>
      ),
      lead: "One agent answers the calls coming in like a 24/7 receptionist. A second works the calls going out, turning the leads you already paid for into booked appointments.",
    },
    inbound: {
      eyebrow: "Inbound",
      title: "Your 24/7 receptionist",
      intro:
        "Answers every incoming call in a natural voice, day or night, so no caller hits voicemail or dials a competitor.",
      items: [
        {
          title: "Answer every call instantly",
          what: "Picks up on the first ring in a natural voice, so callers are helped right away instead of waiting on hold or hitting voicemail.",
          outcome: "No caller lost to a busy or ringing phone",
        },
        {
          title: "After-hours and weekend cover",
          what: "Handles calls on nights, weekends, and holidays, capturing the inquiries that would go unanswered when the office is closed.",
          outcome: "Coverage when your team is offline",
        },
        {
          title: "Book and reschedule appointments",
          what: "Checks live calendar availability and books, moves, or cancels appointments, then confirms and syncs to your scheduling system.",
          outcome: "More slots filled without staff effort",
        },
        {
          title: "Answer common questions",
          what: "Responds to routine questions like hours, location, services, and typical pricing, so your staff are not interrupted.",
          outcome: "Fewer routine calls tying up your team",
        },
        {
          title: "Qualify and route callers",
          what: "Asks a few qualifying questions, captures why the person is calling, and routes hot or urgent callers to the right person.",
          outcome: "The right caller reaches the right person",
        },
        {
          title: "Catch missed and overflow calls",
          what: "Steps in when staff are on another line or with a client, taking the caller's details so nothing slips through when it is busy.",
          outcome: "Every inquiry captured, not lost",
        },
      ],
    },
    outbound: {
      eyebrow: "Outbound",
      title: "Your growth engine",
      intro:
        "Calls the leads you already paid for: new leads in seconds, cold ones revived, and follow-ups so nothing goes cold.",
      items: [
        {
          title: "Instant speed-to-lead callback",
          what: "The moment a form, ad, or web lead comes in, the agent calls back within seconds to qualify and book while interest is hot.",
          outcome: "Reach leads before your competitors do",
        },
        {
          title: "Reactivate cold leads",
          what: "Works through old or dormant CRM lists, re-engages past inquiries in a natural voice, and re-books the ones still interested.",
          outcome: "New appointments from leads already in your database",
        },
        {
          title: "Reminders and confirmations",
          what: "Calls ahead of each appointment to confirm, answer quick questions, and reschedule instead of losing the slot.",
          outcome: "Fewer no-shows, a fuller calendar",
        },
        {
          title: "Quote and estimate follow-up",
          what: "After a quote, proposal, or treatment plan goes out, the agent follows up by phone to handle objections and move it forward.",
          outcome: "More estimates turn into signed clients",
        },
        {
          title: "Missed-call auto-callback",
          what: "Every missed or abandoned call triggers an automatic callback, so the caller is reached in minutes, not lost to voicemail.",
          outcome: "Recover revenue that would walk to a competitor",
        },
        {
          title: "Review and re-booking calls",
          what: "After a visit the agent asks for feedback or a review, and reaches out to lapsed customers to bring them back in.",
          outcome: "More reviews and repeat business",
        },
      ],
    },
  },
  it: {
    heading: {
      eyebrow: "Inbound e outbound",
      title: (
        <>
          Un sistema, <GradientText>due agenti specializzati</GradientText>.
        </>
      ),
      lead: "Un agente risponde alle chiamate in entrata come un assistente vocale attivo 24/7. Un secondo lavora le chiamate in uscita, trasformando i contatti che hai già pagato in appuntamenti fissati.",
    },
    inbound: {
      eyebrow: "Inbound",
      title: "Il tuo assistente vocale attivo 24/7",
      intro:
        "Risponde a ogni chiamata in entrata con una voce naturale, giorno e notte, così nessuno finisce in segreteria o chiama un concorrente.",
      items: [
        {
          title: "Rispondi a ogni chiamata all'istante",
          what: "Risponde al primo squillo con una voce naturale, così chi chiama viene aiutato subito invece di restare in attesa o finire in segreteria.",
          outcome: "Nessuna chiamata persa per il telefono occupato o che squilla a vuoto",
        },
        {
          title: "Copertura di sere e weekend",
          what: "Gestisce le chiamate di sera, nei weekend e nei giorni festivi, intercettando le richieste che resterebbero senza risposta a ufficio chiuso.",
          outcome: "Copertura anche quando il tuo team è offline",
        },
        {
          title: "Prenota e sposta gli appuntamenti",
          what: "Controlla in tempo reale la disponibilità del calendario e prenota, sposta o annulla gli appuntamenti, poi conferma e sincronizza con il tuo sistema di prenotazione.",
          outcome: "Più slot riempiti senza sforzo per il team",
        },
        {
          title: "Rispondi alle domande più comuni",
          what: "Risponde alle domande di routine come orari, indirizzo, servizi e prezzi indicativi, così il tuo personale non viene interrotto.",
          outcome: "Meno chiamate di routine che intasano il tuo team",
        },
        {
          title: "Qualifica e smista chi chiama",
          what: "Fa qualche domanda di qualifica, capisce il motivo della chiamata e indirizza i contatti caldi o urgenti alla persona giusta.",
          outcome: "Chi chiama arriva sempre alla persona giusta",
        },
        {
          title: "Recupera le chiamate perse e in eccesso",
          what: "Interviene quando il personale è già al telefono o con un cliente, raccogliendo i dati di chi chiama così nulla va perso nei momenti di picco.",
          outcome: "Ogni richiesta intercettata, non persa",
        },
      ],
    },
    outbound: {
      eyebrow: "Outbound",
      title: "Il tuo motore di crescita",
      intro:
        "Chiama i contatti che hai già pagato: i nuovi in pochi secondi, quelli freddi riattivati e i follow-up per non lasciare raffreddare nulla.",
      items: [
        {
          title: "Richiamo immediato al nuovo contatto",
          what: "Nel momento in cui arriva un contatto da un form, un'inserzione o dal sito, l'agente richiama in pochi secondi per qualificarlo e fissare l'appuntamento mentre l'interesse è alto.",
          outcome: "Raggiungi i contatti prima dei tuoi concorrenti",
        },
        {
          title: "Riattiva i contatti freddi",
          what: "Lavora le liste CRM vecchie o dormienti, riaccende i contatti passati con una voce naturale e riprenota chi è ancora interessato.",
          outcome: "Nuovi appuntamenti da contatti già presenti nel tuo database",
        },
        {
          title: "Promemoria e conferme",
          what: "Chiama prima di ogni appuntamento per confermare, rispondere a domande veloci e riprogrammare invece di perdere lo slot.",
          outcome: "Meno assenze, un calendario più pieno",
        },
        {
          title: "Follow-up su preventivi e stime",
          what: "Dopo l'invio di un preventivo, una proposta o un piano di trattamento, l'agente fa follow-up al telefono per gestire le obiezioni e far avanzare la trattativa.",
          outcome: "Più preventivi che diventano clienti acquisiti",
        },
        {
          title: "Richiamo automatico alle chiamate perse",
          what: "Ogni chiamata persa o abbandonata attiva un richiamo automatico, così chi chiama viene raggiunto in pochi minuti invece di finire in segreteria.",
          outcome: "Recuperi fatturato che sarebbe finito a un concorrente",
        },
        {
          title: "Chiamate per recensioni e nuove prenotazioni",
          what: "Dopo una visita l'agente chiede un parere o una recensione, e ricontatta i clienti persi per farli tornare.",
          outcome: "Più recensioni e clienti che tornano",
        },
      ],
    },
  },
};

function ModePanel({ data, accent }) {
  const Head = data.headIcon;
  const isGold = accent === "gold";
  const ring = isGold ? "border-[#FEC458]/25" : "border-white/[0.08]";
  const chipText = isGold ? "text-[#FEC458]" : "text-[#57C7E3]";
  const chipBg = isGold ? "bg-[#FEC458]/[0.08] border-[#FEC458]/25" : "bg-[#57C7E3]/[0.08] border-[#57C7E3]/25";
  const iconColor = isGold ? "text-[#FEC458]" : "text-[#8fe0f0]";
  const dot = isGold ? "text-[#FEC458]" : "text-[#57C7E3]";
  return (
    <div className={`${isGold ? "card-gold" : "card-glow"} group relative flex h-full flex-col rounded-2xl border ${ring} bg-white/[0.03] p-7 backdrop-blur-sm sm:p-8`}>
      {/* Panel header */}
      <div className="flex items-center gap-4">
        <span className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${chipBg}`}>
          <Head className={`h-5 w-5 ${iconColor}`} strokeWidth={1.8} />
        </span>
        <div>
          <p className={`text-[12px] font-semibold uppercase tracking-[0.16em] ${chipText}`}>{data.eyebrow}</p>
          <h3 className="font-display text-[1.4rem] font-semibold leading-tight text-white">{data.title}</h3>
        </div>
      </div>
      <p className="mt-4 text-[14.5px] leading-relaxed text-white/60">{data.intro}</p>

      {/* Use-case list */}
      <ul className="mt-7 space-y-5">
        {data.items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.title} className="flex gap-4">
              <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                <Icon className={`h-[18px] w-[18px] ${iconColor}`} strokeWidth={1.9} />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-white">{it.title}</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-white/55">{it.what}</p>
                <p className={`mt-1.5 text-[13px] font-medium ${chipText}`}>{it.outcome}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function InboundOutbound() {
  const locale = usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];

  const inbound = {
    eyebrow: t.inbound.eyebrow,
    title: t.inbound.title,
    intro: t.inbound.intro,
    headIcon: INBOUND_HEAD_ICON,
    items: t.inbound.items.map((it, i) => ({ ...it, icon: INBOUND_ITEM_ICONS[i] })),
  };
  const outbound = {
    eyebrow: t.outbound.eyebrow,
    title: t.outbound.title,
    intro: t.outbound.intro,
    headIcon: OUTBOUND_HEAD_ICON,
    items: t.outbound.items.map((it, i) => ({ ...it, icon: OUTBOUND_ITEM_ICONS[i] })),
  };

  return (
    <Section id="voice-modes" className="bg-[#000a14]">
      <SectionHeading
        eyebrow={t.heading.eyebrow}
        title={t.heading.title}
        lead={t.heading.lead}
      />

      <div className="mt-14 grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <Reveal>
          <ModePanel data={inbound} accent="blue" />
        </Reveal>
        <Reveal delay={100}>
          <ModePanel data={outbound} accent="gold" />
        </Reveal>
      </div>
    </Section>
  );
}
