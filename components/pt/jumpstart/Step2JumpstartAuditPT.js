"use client";
import { Section, SectionHeading, Reveal, GradientText } from "@/components/home/_ui";
import { InteractiveHoverButton } from "@/components/ui/InteractiveHoverButton";
import {
  BarChart3,
  Brain,
  Check,
  Gift,
  Zap,
  Calendar,
  LineChart,
  Shield,
  Award,
  Rocket,
  Activity,
  Target,
  Users,
  Settings,
  CalendarClock,
  Search,
} from "lucide-react";

const BOOKING = "https://api.leadconnectorhq.com/widget/bookings/pt-automis";

/* As duas auditorias completas, fieis a oferta. */
const AUDITS = [
  {
    icon: BarChart3,
    kicker: "Auditoria 1",
    title: "Auditoria de Performance de Marketing",
    items: [
      {
        h: "Identificamos e corrigimos os desperdícios",
        p: "Decisões claras sobre o que parar, otimizar e escalar no Google, Meta e LinkedIn.",
      },
      {
        h: "Targeting e funnel mais eficazes",
        p: "Otimizações de público, oferta e landing para aumentar as conversões.",
      },
      {
        h: "Tracking que diz a verdade",
        p: "Correções simples à atribuição para decisões realmente baseadas nos dados.",
      },
    ],
    deliverables:
      "Scorecard por canal, notas sobre targeting e criatividade, checklist de tracking, Top 3 recomendações.",
  },
  {
    icon: Brain,
    kicker: "Auditoria 2",
    title: "Auditoria de Operações IA",
    items: [
      {
        h: "Vemos onde perde",
        p: "Mapeamos todo o fluxo contacto-marcação (speed-to-lead, chamadas perdidas, follow-up, no-show).",
      },
      {
        h: "Oportunidades de alto ROI",
        p: "Uma shortlist prioritária e curta de automações que fazem a diferença.",
      },
      {
        h: "Seguro de ativar",
        p: "Notas práticas sobre privacidade e conformidade onde for preciso (por exemplo, saúde).",
      },
    ],
    deliverables:
      "Mapa dos fluxos, shortlist de oportunidades (impacto vs esforço), linhas de orientação de implementação.",
  },
];

/* Deliverables prontos para a gestao. */
const DELIVERABLES = [
  {
    icon: LineChart,
    title: "Previsão Money Slide",
    body: "Projeções claras de redução de CPL/CPA e horas poupadas, para que a liderança veja o impacto em euros.",
  },
  {
    icon: Calendar,
    title: "Plano de Ação a 90 Dias",
    body: "Um rollout semana a semana com responsáveis e milestones, pronto a entregar à sua equipa amanhã.",
  },
  {
    icon: Award,
    title: "Pacote Board-Ready",
    body: "Resultados, previsões e plano preparados e polidos para a gestão. Apresentação pronta.",
  },
];

/* 3 bonus, 1.850 euros de valor, gratis. */
const BONUSES = [
  {
    icon: Zap,
    value: "750 euros de valor",
    title: "Implementação Rápida",
    tag: "Chave na mão",
    body: "Construímos e ativamos uma automação à medida, alinhada com o seu problema principal. Setup live com 14 dias de suporte.",
    gold: true,
  },
  {
    icon: Calendar,
    value: "600 euros de valor",
    title: "Plano de Ação a 90 Dias",
    tag: "Roadmap passo a passo",
    body: "Um rollout simples para entregar à sua equipa amanhã: o que fazer primeiro, depois e a seguir, com responsáveis e milestones.",
    gold: false,
  },
  {
    icon: LineChart,
    value: "500 euros de valor",
    title: "Previsão Money Slide",
    tag: "Pronta para a gestão",
    body: "Projeções claras de redução de CPL/CPA e horas poupadas, para que a liderança veja o impacto económico real.",
    gold: true,
  },
];

/* As duas garantias, condicoes fieis a oferta. */
const CLARITY_OUTCOMES = [
  "Redução dos custos de aquisição de 10% ou mais",
  "Aumento das marcações de 5% ou mais",
  "10 ou mais horas por semana poupadas",
];

/* Expectativas honestas: o que a auditoria aprofundada inclui de facto. */
const INVOLVES = [
  {
    icon: Users,
    title: "Entrevistamos a sua equipa",
    body: "Falamos com quem gere marketing, vendas e operações, para que o plano se ajuste à forma como o seu negócio trabalha de verdade.",
  },
  {
    icon: Shield,
    title: "Escavamos nos seus números reais",
    body: "Acesso apenas de leitura a ads, CRM e registos de chamadas para trabalhar sobre os seus dados verdadeiros. Nada muda nas suas contas.",
  },
  {
    icon: CalendarClock,
    title: "Cerca de duas semanas para um plano a sério",
    body: "Uma análise séria leva tempo. Em cerca de duas semanas transformamos o que encontramos num plano claro e baseado nos dados.",
  },
];

/* Timeline de 14 dias, dia a dia, fiel a oferta. */
const TIMELINE = [
  {
    day: "Dia 0-1",
    icon: Rocket,
    title: "Kickoff (objetivos e acessos)",
    body: "Alinhamento sobre objetivos e KPIs; confirmação de ICP, ofertas e critérios de sucesso. Recolhemos os acessos apenas de leitura e enviamos um resumo da chamada mais uma checklist do que falta.",
  },
  {
    day: "Dia 1-3",
    icon: BarChart3,
    title: "Recolha de dados e baseline",
    body: "Extraímos os números reais: contactos, CPL/CPA, speed-to-lead, percentagem de chamadas perdidas, show-rate, close-rate e LTV. Identificamos eventuais falhas de tracking.",
  },
  {
    day: "Dia 3-5",
    icon: Activity,
    title: "Mapeamento do funnel e pontos críticos",
    body: "Mapeamos o fluxo contacto-marcação (ads, aquisição de contactos, contacto, marcação, follow-up). Evidenciamos onde perde: resposta lenta, chamadas perdidas, passos manuais, risco de no-show.",
  },
  {
    day: "Dia 6-9",
    icon: Target,
    title: "Shortlist de oportunidades (impacto vs esforço)",
    body: "Selecionamos 3-6 ações de alto ROI (marketing e IA) e ordenamo-las por impacto e esforço. Correções práticas de targeting, criatividade, landing e tracking; mais automações operacionais.",
  },
  {
    day: "Dia 10",
    icon: Users,
    title: "Alinhamento a meio da auditoria (30-45 min)",
    body: "Revemos o mapa dos fluxos e a shortlist. Validamos as prioridades com a sua equipa e escolhemos juntos o quick win a implementar. Luz verde sobre o que importa, sem suposições.",
  },
  {
    day: "Dia 10-12",
    icon: Settings,
    title: "Criação e teste do quick win",
    body: "Configuramos a implementação rápida acordada e testamo-la de ponta a ponta na sua estrutura.",
  },
  {
    day: "Dia 12-13",
    icon: LineChart,
    title: "Previsões e plano a 90 dias",
    body: "Modelamos poupanças e aumentos esperados mais o payback; preparamos a Previsão Money Slide. Criamos um Plano de Ação a 90 Dias semana a semana com responsáveis e milestones.",
  },
  {
    day: "Dia 14",
    icon: Award,
    title: "Apresentação final, ativação live",
    body: "Apresentamos os resultados, confirmamos o plano e ativamos o quick win em live. Se quiser que executemos o plano a 90 dias, aplicamos um crédito de 500 euros.",
  },
];

export default function Step2JumpstartAuditPT() {
  return (
    <Section id="step-2" className="bg-deep-blue" inner="max-w-6xl">
      {/* Badge da etapa + heading */}
      <div className="mx-auto mb-8 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
          <Search className="h-3.5 w-3.5" strokeWidth={2.2} />
          Etapa 2 &middot; O passo s&eacute;rio seguinte
        </span>
      </div>

      <SectionHeading
        title={<><GradientText>Jumpstart Audit</GradientText></>}
        lead="Esta e a analise profunda, nao uma chamada rapida. Em cerca de duas semanas entrevistamos a sua equipa, analisamos funnel e investimento em publicidade e transformamos o que encontramos em duas auditorias completas mais um plano para agir. Sem suposicoes, sem template generico."
      />

      {/* Expectativas honestas: o que a auditoria inclui */}
      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {INVOLVES.map((v, i) => {
          const Icon = v.icon;
          const cardClass = i % 2 === 0 ? "card-glow" : "card-gold";
          return (
            <Reveal key={v.title} delay={i * 70}>
              <div className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm transition-all hover:-translate-y-1`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-[1.1rem] font-semibold leading-tight text-white">{v.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/60">{v.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* As duas auditorias completas */}
      <h3 className="font-display mt-20 text-center text-[1.5rem] font-semibold text-white sm:text-[1.8rem]">
        O que leva consigo
      </h3>
      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {AUDITS.map((a, i) => {
          const Icon = a.icon;
          const cardClass = i % 2 === 0 ? "card-gold" : "card-glow";
          return (
            <Reveal key={a.title} delay={i * 80}>
              <div
                className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                    <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#57C7E3]">{a.kicker}</p>
                    <h3 className="font-display text-[1.3rem] font-semibold leading-tight text-white">{a.title}</h3>
                  </div>
                </div>
                <ul className="mt-6 space-y-4">
                  {a.items.map((it) => (
                    <li key={it.h} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[#57C7E3]" strokeWidth={2.4} />
                      <span>
                        <span className="block text-[15px] font-semibold text-white">{it.h}</span>
                        <span className="mt-0.5 block text-[14px] leading-relaxed text-white/60">{it.p}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">Deliverable</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/70">{a.deliverables}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Deliverables prontos para a gestao */}
      <Reveal>
        <h3 className="font-display mt-20 text-center text-[1.5rem] font-semibold text-white sm:text-[1.8rem]">
          Mais os <GradientText>deliverables prontos para a gest&atilde;o</GradientText>
        </h3>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {DELIVERABLES.map((d, i) => {
          const Icon = d.icon;
          const cardClass = i % 2 === 0 ? "card-gold" : "card-glow";
          return (
            <Reveal key={d.title} delay={i * 70}>
              <div
                className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                </span>
                <h4 className="font-display mt-6 text-[1.2rem] font-semibold leading-tight text-white">{d.title}</h4>
                <p className="mt-3 text-[14px] leading-relaxed text-white/60">{d.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Preco + credito 500 euros + escassez + CTA */}
      <div className="mt-24">
        <Reveal>
          <div className="card-glow relative overflow-hidden rounded-3xl border border-[#FEC458]/25 bg-white/[0.03] p-8 text-center backdrop-blur-sm sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(254,196,88,0.10), transparent 70%)" }}
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
                <CalendarClock className="h-3.5 w-3.5" strokeWidth={2.2} />
                Apenas 5 auditorias dispon&iacute;veis por m&ecirc;s
              </span>

              <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.16em] text-white/45">O seu investimento</p>
              <div className="mt-3 flex flex-col items-center justify-center gap-2">
                <span className="font-display text-[1.6rem] font-semibold leading-none text-white/40 line-through sm:text-[2rem]">
                  &euro;3.300
                </span>
                <span className="font-display text-[3.4rem] font-bold leading-none tracking-[-0.03em] text-[#FEC458] sm:text-[4.2rem]">
                  &euro;1.450
                </span>
              </div>

              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-[#57C7E3]/20 bg-[#57C7E3]/[0.05] p-5">
                <p className="text-[15px] leading-relaxed text-white/80">
                  Inicie a implementa&ccedil;&atilde;o em 14 dias e aplicamos um{" "}
                  <span className="font-semibold text-[#57C7E3]">cr&eacute;dito de 500 euros</span> na implementa&ccedil;&atilde;o.
                </p>
              </div>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <InteractiveHoverButton href={BOOKING} target="_blank" rel="noopener noreferrer" variant="solid" text="Pedir a Jumpstart Audit" />
                <InteractiveHoverButton href="#book" variant="ghost" text="Primeiro uma chamada gratuita" />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-white/55">
                <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.2} /> Garantias de Elegibilidade e Clareza</span>
                <span className="inline-flex items-center gap-1.5"><Gift className="h-3.5 w-3.5 text-[#FEC458]" strokeWidth={2.2} /> 1.850 euros de b&oacute;nus</span>
                <span className="inline-flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-[#57C7E3]" strokeWidth={2.2} /> Quick win live em 14 dias</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bonus: 1.850 euros de valor, gratis */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
              <Gift className="h-3.5 w-3.5" strokeWidth={2.2} />
              B&oacute;nus (inclu&iacute;dos)
            </span>
            <h3 className="font-display mt-5 text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              <span className="text-[#FEC458]">1.850 euros</span> de valor, gr&aacute;tis
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              Tr&ecirc;s b&oacute;nus inclu&iacute;dos em cada auditoria, para que saia com algo que j&aacute; funciona, n&atilde;o apenas um documento.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {BONUSES.map((b, i) => {
            const Icon = b.icon;
            const cardClass = i % 2 === 0 ? "card-glow" : "card-gold";
            return (
              <Reveal key={b.title} delay={i * 70}>
                <div
                  className={`${cardClass} group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 backdrop-blur-sm transition-all hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
                        b.gold ? "border-[#FEC458]/25 bg-[#FEC458]/[0.08]" : "border-white/10 bg-white/[0.04]"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${b.gold ? "text-[#FEC458]" : "text-[#8fe0f0]"}`} strokeWidth={1.8} />
                    </span>
                    <span
                      className={`rounded-full px-3 py-1 text-[12px] font-semibold ${
                        b.gold ? "bg-[#FEC458]/10 text-[#FEC458]" : "bg-[#3C91E6]/12 text-[#57C7E3]"
                      }`}
                    >
                      {b.value}
                    </span>
                  </div>
                  <h4 className="font-display mt-6 text-[1.2rem] font-semibold leading-tight text-white">{b.title}</h4>
                  <p className={`mt-1.5 text-[13px] font-semibold ${b.gold ? "text-[#FEC458]" : "text-[#57C7E3]"}`}>{b.tag}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/60">{b.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* As duas garantias */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              Duas <GradientText>garantias sem risco</GradientText>
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              Damos a cara. Dois checkpoints, dois modos de reaver o seu dinheiro.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Garantia de Elegibilidade (kickoff) */}
          <Reveal>
            <div className="card-glow group relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Shield className="h-5 w-5 text-[#57C7E3]" strokeWidth={1.8} />
                </span>
                <div>
                  <h4 className="font-display text-[1.3rem] font-semibold text-white">Garantia de Elegibilidade</h4>
                  <p className="text-[13px] font-semibold text-[#57C7E3]">Verificada no kickoff</p>
                </div>
              </div>
              <p className="mt-6 text-[14.5px] leading-relaxed text-white/70">
                Se no kickoff descobrirmos que os seus dados ou o seu stack n&atilde;o nos permitem mover os KPIs
                principais de forma significativa, reembolsamos logo. Nenhuma semana desperdi&ccedil;ada, nenhum risco para si.
              </p>
            </div>
          </Reveal>

          {/* Garantia de Clareza (final) */}
          <Reveal delay={100}>
            <div className="card-gold group relative flex h-full flex-col rounded-2xl border border-[#FEC458]/25 bg-white/[0.03] p-8 backdrop-blur-sm transition-all hover:-translate-y-1">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#FEC458]/25 bg-[#FEC458]/[0.08]">
                  <Award className="h-5 w-5 text-[#FEC458]" strokeWidth={1.8} />
                </span>
                <div>
                  <h4 className="font-display text-[1.3rem] font-semibold text-white">Garantia de Clareza</h4>
                  <p className="text-[13px] font-semibold text-[#FEC458]">Verificada na chamada final</p>
                </div>
              </div>
              <p className="mt-6 text-[14.5px] leading-relaxed text-white/70">
                Se a auditoria n&atilde;o tra&ccedil;ar um caminho baseado nos dados at&eacute; pelo menos um destes resultados, reembolsamos 100%:
              </p>
              <ul className="mt-5 space-y-3">
                {CLARITY_OUTCOMES.map((o) => (
                  <li key={o} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#FEC458]/12">
                      <Check className="h-3.5 w-3.5 text-[#FEC458]" strokeWidth={3} />
                    </span>
                    <span className="text-[14.5px] text-white">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-6 text-center text-[13px] text-white/45">
            As garantias exigem acessos atempados apenas de leitura e dados hist&oacute;ricos rigorosos.
          </p>
        </Reveal>
      </div>

      {/* Timeline 14 dias */}
      <div className="mt-24">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <h3 className="font-display text-[1.75rem] font-semibold leading-tight text-white sm:text-[2.4rem]">
              Do kickoff ao live em <GradientText>14 dias</GradientText>
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">
              Um percurso claro dia a dia. Termina a chamada final com uma automa&ccedil;&atilde;o quick win ativada em live.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-14">
          {/* trilho vertical em md+ */}
          <div
            className="pointer-events-none absolute left-[19px] top-2 bottom-2 hidden w-px md:block"
            style={{ background: "linear-gradient(to bottom, rgba(254,196,88,0.4), rgba(60,145,230,0.4), rgba(254,196,88,0.4))" }}
          />
          <ol className="space-y-4">
            {TIMELINE.map((t, i) => {
              const Icon = t.icon;
              const cardClass = i % 2 === 0 ? "card-gold" : "card-glow";
              return (
                <Reveal key={t.day} delay={i * 40} as="li">
                  <div className="relative flex gap-5">
                    <span className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0b1622]">
                      <Icon className="h-4 w-4 text-[#8fe0f0]" strokeWidth={1.9} />
                    </span>
                    <div
                      className={`${cardClass} group relative w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5`}
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#FEC458]">{t.day}</span>
                        <h4 className="font-display text-[1.05rem] font-semibold text-white">{t.title}</h4>
                      </div>
                      <p className="mt-2 text-[14px] leading-relaxed text-white/60">{t.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>

    </Section>
  );
}
