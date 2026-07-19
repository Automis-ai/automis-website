"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Section, SectionHeading, Reveal } from "@/components/home/_ui";
import { Plus, Minus } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
    faqs: [
      {
        q: "So, what is this Voice AI thing all about?",
        a: "Think of Automis Voice AI as a super-smart virtual receptionist for your business. It handles customer calls, books appointments, answers questions, and even makes outbound calls, all while sounding surprisingly human. It is like an extra team member who never sleeps.",
      },
      {
        q: "Can it really understand what customers are saying?",
        a: "Yes. Our Voice AI uses advanced speech tech to understand context, accents, and even industry jargon. It is not just hearing words, it is getting the meaning behind them. So whether your customer has a strong accent or uses a lot of technical terms, the AI has it covered.",
      },
      {
        q: "Will it work with the systems we already use?",
        a: "Absolutely. Voice AI integrates with your CRM, calendar, and other business tools. Our team sets everything up so it fits right into your current workflow, no need to overhaul your entire system.",
      },
      {
        q: "What if the AI gets stumped by a question?",
        a: "While the AI is smart, we know it cannot handle everything. If it hits a question it cannot answer, it smoothly hands the call to a human. Your customers always get the help they need, one way or another.",
      },
      {
        q: "How do we keep track of how well it is doing?",
        a: "You get a full analytics dashboard: call volumes, resolution rates, customer satisfaction, and more. It is a bird's-eye view of your customer interactions that helps you spot trends and areas to improve, with every call recorded, transcribed, and summarized.",
      },
    ],
  },
  it: {
    eyebrow: "Domande frequenti",
    title: "Le tue domande, con risposta.",
    faqs: [
      {
        q: "Allora, di cosa si tratta esattamente questo assistente vocale?",
        a: "Immagina l'assistente vocale di Automis come una segretaria virtuale super intelligente per il tuo business. Gestisce le chiamate dei clienti, prende appuntamenti, risponde alle domande e fa persino chiamate in outbound, il tutto con una voce sorprendentemente umana. È come avere un membro del team in più che non dorme mai.",
      },
      {
        q: "Capisce davvero cosa dicono i clienti?",
        a: "Sì. Il nostro assistente vocale usa tecnologie di riconoscimento vocale avanzate per capire il contesto, gli accenti e persino il gergo del settore. Non si limita a sentire le parole: ne coglie il significato. Così, che il tuo cliente abbia un accento marcato o usi tanti termini tecnici, l'IA se la cava senza problemi.",
      },
      {
        q: "Funziona con i sistemi che già usiamo?",
        a: "Assolutamente. L'assistente vocale si integra con il tuo CRM, il calendario e gli altri strumenti aziendali. Il nostro team configura tutto in modo che si inserisca perfettamente nel tuo flusso di lavoro attuale, senza bisogno di rivoluzionare l'intero sistema.",
      },
      {
        q: "E se l'IA si trova spiazzata da una domanda?",
        a: "Per quanto sia intelligente, sappiamo che l'IA non può gestire tutto. Quando incontra una domanda a cui non sa rispondere, passa la chiamata a una persona in modo naturale, senza attriti. I tuoi clienti ricevono sempre l'aiuto di cui hanno bisogno, in un modo o nell'altro.",
      },
      {
        q: "Come teniamo traccia dei risultati?",
        a: "Hai a disposizione una dashboard di analisi completa: volume delle chiamate, tassi di risoluzione, soddisfazione dei clienti e molto altro. È una visione d'insieme delle interazioni con i tuoi clienti che ti aiuta a individuare tendenze e aree da migliorare, con ogni chiamata registrata, trascritta e riassunta.",
      },
    ],
  },
  pt: {
    eyebrow: "Perguntas frequentes",
    title: "As suas perguntas, respondidas.",
    faqs: [
      {
        q: "Então, o que é ao certo este assistente de voz?",
        a: "Imagine o assistente de voz da Automis como uma rececionista virtual super inteligente para o seu negócio. Trata as chamadas dos clientes, marca consultas, responde a perguntas e até faz chamadas outbound, tudo com uma voz surpreendentemente humana. É como ter um membro da equipa a mais que nunca dorme.",
      },
      {
        q: "Percebe mesmo o que os clientes estão a dizer?",
        a: "Sim. O nosso assistente de voz usa tecnologia de reconhecimento de voz avançada para perceber o contexto, os sotaques e até o jargão do setor. Não se limita a ouvir as palavras: capta o significado por detrás delas. Por isso, quer o seu cliente tenha um sotaque marcado ou use muitos termos técnicos, a IA safa-se sem problemas.",
      },
      {
        q: "Funciona com os sistemas que já usamos?",
        a: "Sem dúvida. O assistente de voz integra-se com o seu CRM, a agenda e as restantes ferramentas do negócio. A nossa equipa configura tudo para que encaixe perfeitamente no seu fluxo de trabalho atual, sem necessidade de revolucionar todo o sistema.",
      },
      {
        q: "E se a IA ficar sem resposta para uma pergunta?",
        a: "Por muito inteligente que seja, sabemos que a IA não consegue tratar de tudo. Quando encontra uma pergunta a que não sabe responder, passa a chamada a uma pessoa de forma natural, sem atritos. Os seus clientes recebem sempre a ajuda de que precisam, de uma maneira ou de outra.",
      },
      {
        q: "Como acompanhamos os resultados?",
        a: "Tem à disposição uma dashboard de análise completa: volume de chamadas, taxas de resolução, satisfação dos clientes e muito mais. É uma visão de conjunto das interações com os seus clientes que o ajuda a identificar tendências e áreas a melhorar, com cada chamada gravada, transcrita e resumida.",
      },
    ],
  },
};

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="card-gold overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-[1.05rem] font-semibold text-white">{item.q}</span>
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04]">
          {isOpen ? (
            <Minus className="h-4 w-4 text-[#57C7E3]" strokeWidth={2.4} />
          ) : (
            <Plus className="h-4 w-4 text-[#57C7E3]" strokeWidth={2.4} />
          )}
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[14.5px] leading-relaxed text-white/60">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function VoiceFaq() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  const [open, setOpen] = useState(0);
  return (
    <Section id="voice-faq" className="bg-[#000a14]" inner="max-w-3xl">
      <SectionHeading eyebrow={t.eyebrow} title={<>{t.title}</>} />
      <div className="mt-12 space-y-3">
        {t.faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 70}>
            <FaqItem item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
