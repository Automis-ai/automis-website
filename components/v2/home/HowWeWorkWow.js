import { GRAD } from "@/components/home/_ui";
import { WowSection, WowHeading } from "./WowParts";
import ModuleTile from "./ModuleTile";
import { getCopy } from "@/components/v2/copy/getCopy";

/*
  Copia animata di components/home/HowWeWork.js (l'originale non si tocca). Testi identici, tempi della §3 già dentro
  (in italiano il titolo e la riga di apertura sono scritti senza il contrasto «partner, non fornitore»).
  Cambia la forma: i tre passi sono tre MODULI (piastrelle di vetro, come quelle della hero) uniti da un filo che
  passa dal centro di ciascuna, con un pacchetto di luce che li attraversa: ogni modulo si accende quando il pacchetto
  arriva. Da 768 px il filo è orizzontale e passa dentro le schede; sul telefono i passi sono in colonna e a
  collegarli è il filo della pagina (stages/spine.js: un nodo per passo).
  Senza JavaScript il filo è già tutto disegnato. La coreografia sta in stages/how.js.
  In italiano e in portoghese i titoli e la numerazione dei tre passi sono quelli di /how-we-work (copy/how-we-work.*.js,
  si leggono da lì: una promessa sola, a un clic di distanza): «01 Ascolto e diagnosi» e così via. In inglese restano quelli del sito originale.
*/

const COPY = {
  en: {
    eyebrow: "How we work",
    title: "A strategic integrator, not a vendor",
    lead: "We diagnose the bottleneck before we build. You own the infrastructure we deliver. It's your system, not a subscription you're locked into blind.",
    steps: [
      {
        step: "Step 1",
        title: "Discover & Diagnose",
        body: "We learn your business before touching a single tool. We map exactly where you lose time and money, then decide what's worth automating first.",
        meta: "Discovery call + audit",
      },
      {
        step: "Step 2",
        title: "Design, Build & Deploy",
        body: "We build your system and you test it before it goes live. Nothing ships until it works the way your business actually runs.",
        meta: "About 7 days for Voice & simple · custom for complex",
      },
      {
        step: "Step 3",
        title: "Launch, Monitor & Optimize",
        body: "We don't disappear after go-live. Continuous monthly improvement with human oversight, so your system gets sharper every month, not stale.",
        meta: "Ongoing, with human-in-the-loop",
      },
    ],
  },
  it: {
    eyebrow: "Come lavoriamo",
    title: "Prima ascoltiamo, poi costruiamo",
    lead: "Prima di costruire, individuiamo il punto critico. L'infrastruttura che realizziamo è tua e sai sempre cosa c'è dentro.",
    steps: [
      {
        step: "01",
        title: "Ascolto e diagnosi",
        body: "Prima di mettere mano a qualsiasi strumento, studiamo la tua azienda. Individuiamo con precisione dove perdi tempo e soldi, poi decidiamo cosa conviene automatizzare per primo.",
        meta: "Call conoscitiva + audit",
      },
      {
        step: "02",
        title: "Progettazione e attivazione",
        body: "Costruiamo il tuo sistema e tu lo provi prima che vada online. Niente parte finché non funziona come lavora davvero la tua attività.",
        meta: "Circa 7 giorni per Voice e progetti semplici · su misura per i complessi",
      },
      {
        step: "03",
        title: "Gestione e miglioramento",
        body: "Dopo il lancio restiamo con te. Ogni mese miglioriamo il sistema con supervisione umana, così diventa sempre più preciso invece di restare fermo.",
        meta: "In continuo, con supervisione umana",
      },
    ],
  },
  pt: {
    eyebrow: "Como trabalhamos",
    title: "Primeiro ouvimos, depois construímos",
    lead: "Diagnosticamos o ponto crítico antes de construir. A infraestrutura que construímos é sua, e fica sempre a saber o que tem lá dentro.",
    steps: [
      {
        step: "01",
        title: "Ouvir e diagnosticar",
        body: "Conhecemos o seu negócio antes de tocar numa única ferramenta. Mapeamos exatamente onde perde tempo e dinheiro, depois decidimos o que vale a pena automatizar primeiro.",
        meta: "Chamada de descoberta + auditoria",
      },
      {
        step: "02",
        title: "Desenhar e ativar",
        body: "Construímos o seu sistema e testa-o antes de entrar em produção. Nada arranca até funcionar como o seu negócio realmente funciona.",
        meta: "Cerca de 7 dias para Voice e sistemas simples · à medida nos complexos",
      },
      {
        step: "03",
        title: "Gerir e melhorar",
        body: "Não desaparecemos depois do arranque. Melhoria mensal contínua com supervisão humana, para que o seu sistema fique mais afinado todos os meses, em vez de estagnar.",
        meta: "Contínuo, com supervisão humana",
      },
    ],
  },
};

const STEP_GLYPHS = ["search", "build", "grow"];

export default function HowWeWorkWow({ lang = "en" }) {
  const base = COPY[lang] || COPY.en;
  // it/pt: stessi titoli e stessa numerazione («01», «02», «03») di /how-we-work
  const shared = lang === "it" || lang === "pt" ? getCopy("how-we-work", lang).steps.items : null;
  const t = shared
    ? { ...base, steps: base.steps.map((s, i) => ({ ...s, step: String(i + 1).padStart(2, "0"), title: shared[i] ? shared[i].title : s.title })) }
    : base;
  const last = t.steps.length - 1;
  return (
    <WowSection id="how" wow="how" className="bg-deep-blue v2hp-how">
      <WowHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <ol className="v2hp-steps" role="list" data-wow-steps>
        {t.steps.map((s, i) => (
            <li key={s.step} className="v2hp-step" data-wow-step>
              {/* Il filo: tratto verso il passo dopo e pacchetto di luce. Decorativo; da 768 px passa dal centro dei moduli. */}
              <div className="v2hp-rail" aria-hidden="true">
                {i < last ? <span className="v2hp-rail__track" /> : null}
                {i < last ? <span className="v2hp-rail__seg" data-seg /> : null}
                {i < last ? <i className="v2hp-rail__packet" data-packet /> : null}
              </div>
              <div className="v2hp-step__card card-gold group flex h-full flex-col items-start rounded-2xl border border-white/[0.08]">
                <ModuleTile glyph={STEP_GLYPHS[i]} size="lg" className="v2hp-step__mod" data-node />
                <span
                  className="mt-6 font-plex-mono text-[12px] uppercase tracking-[0.16em]"
                  style={{ backgroundImage: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}
                >
                  {s.step}
                </span>
                <h3 className="font-display mt-2 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{s.body}</p>
                <p className="mt-auto pt-4">
                  <span className="inline-block rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-2 text-[12.5px] font-medium text-white/55">
                    {s.meta}
                  </span>
                </p>
              </div>
            </li>
        ))}
      </ol>
    </WowSection>
  );
}
