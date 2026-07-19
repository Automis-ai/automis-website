"use client";
import { usePathname } from "next/navigation";
import { Section, SectionHeading } from "./_ui";
import SwipeRow from "./SwipeRow";
import { HeartPulse, Scale, Building2, Store, ShoppingBag, UtensilsCrossed, ShieldCheck } from "lucide-react";

const ICONS = [HeartPulse, Scale, Building2, Store, ShoppingBag, UtensilsCrossed];

const COPY = {
  en: {
    eyebrow: "Who we build for",
    title: "Built around your industry, not a template",
    lead: "Bespoke systems shaped around each sector's real bottlenecks, compliance needs, and way of winning customers. Never a one-size template.",
    icps: [
      {
        title: "Healthcare",
        sub: "Clinics · dentists · medspas",
        body: "Privacy-first AI that answers and books 24/7 and handles patient intake, so no call goes to voicemail and no chart gets lost.",
        proven: "Proven with Clínica Santa Maria dos Olivais",
      },
      {
        title: "Professional & Financial Services",
        sub: "Lawyers · accountants · finance",
        body: "Instant lead qualification plus a Company Brain over your legal and financial documents, and voice notes written straight into your CRM.",
        proven: "Proven with Adifesa",
      },
      {
        title: "Real Estate",
        sub: "Agencies · brokers",
        body: "24/7 responses to every inquiry and AI that matches buyer requests to the right listings. Speed-to-lead that wins the deal.",
        proven: null,
      },
      {
        title: "Local Businesses",
        sub: "Services · trades · local shops",
        body: "Stop missing calls and automate the social DMs, with a system that captures every lead while you get on with the work.",
        proven: null,
      },
      {
        title: "E-commerce & Retail",
        sub: "Online stores · retail",
        body: "AI that answers order, shipping, and returns questions around the clock, plus WhatsApp and social flows that turn browsers into buyers.",
        proven: null,
      },
      {
        title: "Hospitality & Restaurants",
        sub: "Restaurants · hotels · bookings",
        body: "A voice agent that takes bookings and answers FAQs 24/7, cutting no-shows and freeing your floor staff to look after guests.",
        proven: null,
      },
    ],
  },
  it: {
    eyebrow: "Per chi costruiamo",
    title: "Su misura per il tuo settore, non un template",
    lead: "Sistemi cuciti sui veri punti critici del tuo settore, sulle sue esigenze di conformità e sul suo modo di conquistare clienti. Mai un template preconfezionato.",
    icps: [
      {
        title: "Sanità",
        sub: "Cliniche · dentisti · medspa",
        body: "IA attenta alla privacy che risponde e prenota 24/7 e gestisce l'accettazione dei pazienti: nessuna chiamata finisce in segreteria e nessuna cartella va persa.",
        proven: "Realizzato con Clínica Santa Maria dos Olivais",
      },
      {
        title: "Servizi Professionali e Finanziari",
        sub: "Avvocati · commercialisti · finanza",
        body: "Contatti qualificati all'istante e un Company Brain sui tuoi documenti legali e finanziari, con le note vocali trascritte direttamente nel CRM.",
        proven: "Realizzato con Adifesa",
      },
      {
        title: "Immobiliare",
        sub: "Agenzie · broker",
        body: "Risposte 24/7 a ogni richiesta e IA che abbina ciò che cerca l'acquirente agli immobili giusti. La rapidità di risposta che chiude la trattativa.",
        proven: null,
      },
      {
        title: "Attività Locali",
        sub: "Servizi · artigiani · negozi locali",
        body: "Basta chiamate perse e DM social gestiti in automatico: un sistema che cattura ogni contatto mentre tu pensi al lavoro.",
        proven: null,
      },
      {
        title: "E-commerce e Retail",
        sub: "Negozi online · retail",
        body: "IA che risponde su ordini, spedizioni e resi 24 ore su 24, più flussi WhatsApp e social che trasformano i curiosi in clienti.",
        proven: null,
      },
      {
        title: "Ospitalità e Ristorazione",
        sub: "Ristoranti · hotel · prenotazioni",
        body: "Un agente vocale IA che prende le prenotazioni e risponde alle domande frequenti 24/7: meno no-show e personale di sala libero di curare gli ospiti.",
        proven: null,
      },
    ],
  },
  pt: {
    eyebrow: "Para quem construímos",
    title: "Feito à volta do seu setor, não de um template",
    lead: "Sistemas à medida, moldados aos verdadeiros pontos críticos de cada setor, às suas exigências de conformidade e à sua forma de conquistar clientes. Nunca um template igual para todos.",
    icps: [
      {
        title: "Saúde",
        sub: "Clínicas · dentistas · medspas",
        body: "IA que põe a privacidade em primeiro lugar, atende e marca 24/7 e gere o acolhimento de pacientes, para que nenhuma chamada vá para o voicemail e nenhuma ficha se perca.",
        proven: "Comprovado com a Clínica Santa Maria dos Olivais",
      },
      {
        title: "Serviços Profissionais e Financeiros",
        sub: "Advogados · contabilistas · finanças",
        body: "Qualificação instantânea de contactos, mais um Company Brain sobre os seus documentos jurídicos e financeiros, e notas de voz escritas diretamente no seu CRM.",
        proven: "Comprovado com a Adifesa",
      },
      {
        title: "Imobiliário",
        sub: "Agências · consultores",
        body: "Respostas 24/7 a cada pedido e IA que cruza o que o comprador procura com os imóveis certos. A rapidez de resposta que fecha o negócio.",
        proven: null,
      },
      {
        title: "Negócios Locais",
        sub: "Serviços · ofícios · lojas locais",
        body: "Deixe de perder chamadas e automatize os DMs das redes sociais, com um sistema que capta cada contacto enquanto se dedica ao trabalho.",
        proven: null,
      },
      {
        title: "E-commerce e Retalho",
        sub: "Lojas online · retalho",
        body: "IA que responde a dúvidas sobre encomendas, envios e devoluções a toda a hora, mais fluxos de WhatsApp e redes sociais que transformam quem só espreita em quem compra.",
        proven: null,
      },
      {
        title: "Hotelaria e Restauração",
        sub: "Restaurantes · hotéis · reservas",
        body: "Um agente de voz que faz reservas e responde às perguntas frequentes 24/7, reduzindo os no-shows e libertando o pessoal de sala para cuidar dos clientes.",
        proven: null,
      },
    ],
  },
};

export default function Industries() {
  const locale = usePathname()?.startsWith("/pt") ? "pt" : usePathname()?.startsWith("/it") ? "it" : "en";
  const t = COPY[locale];
  return (
    <Section id="industries" className="bg-deep-blue">
      <SectionHeading
        eyebrow={t.eyebrow}
        title={<>{t.title}</>}
        lead={t.lead}
      />
      <SwipeRow
        className="mt-14"
        gridClassName="md:grid-cols-2"
        items={t.icps.map((ic, i) => {
          const Icon = ICONS[i];
          return (
              <div key={ic.title} className="card-gold group flex h-full items-start gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 hover:bg-white/[0.05]">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-[#57C7E3]/40">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{ic.title}</h3>
                  <p className="mt-0.5 text-[12.5px] font-medium uppercase tracking-wide text-white/55">{ic.sub}</p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{ic.body}</p>
                  {ic.proven && (
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#8fe0f0]">
                      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.2} />
                      {ic.proven}
                    </span>
                  )}
                </div>
              </div>
          );
        })}
      />
    </Section>
  );
}
