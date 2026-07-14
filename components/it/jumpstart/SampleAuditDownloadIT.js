"use client";

import { useState } from "react";
import { Section, Reveal, GradientText } from "@/components/home/_ui";
import { FileText, Download, Check, Target, LineChart, BarChart3 } from "lucide-react";

const PDF_URL = "/assets/downloads/sample-audit-marketing-ia-it.pdf";
const LEAD_TAG = "audit form IT";
const LEAD_SOURCE = "jumpstart-audit-sample-it";

const INSIDE = [
  { icon: Target, t: "Matrice impatto vs sforzo", p: "Ogni opportunita' ordinata, cosi' i quick win vengono per primi." },
  { icon: LineChart, t: "Una money slide con il ritorno", p: "Ritorno stimato, ammortamento e ore risparmiate." },
  { icon: BarChart3, t: "Un vero audit della spesa ads", p: "Costo per contatto per servizio e dove riallocare." },
];

export default function SampleAuditDownloadIT() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done

  const valid =
    name.trim().length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  function triggerDownload() {
    const a = document.createElement("a");
    a.href = PDF_URL;
    a.download = "Automis-Audit-Marketing-IA-Esempio.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!valid || status === "loading") return;
    setStatus("loading");
    try {
      // Cattura il contatto in GHL (tag "audit form IT"). Fail soft: consegna comunque.
      await fetch("/api/audit-sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          tags: [LEAD_TAG],
          source: LEAD_SOURCE,
        }),
      });
    } catch (_) {
      /* ignora, consegna comunque il download */
    }
    setStatus("done");
    triggerDownload();
  }

  return (
    <Section id="sample-audit" className="bg-deep-blue" inner="max-w-6xl">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Sinistra: il pitch */}
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
              <FileText className="h-3.5 w-3.5" strokeWidth={2.2} />
              Campione gratuito
            </span>
            <h2 className="font-display mt-5 text-[2rem] font-bold leading-tight text-white sm:text-[2.6rem]">
              Guarda com&apos;e&apos; fatto un <GradientText>vero audit</GradientText>
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/65">
              Scarica un vero Jumpstart Audit, reso anonimo. Nove pagine che mostrano dove un&apos;attivita&apos; perde tempo e denaro, un piano a fasi e il ritorno stimato. E&apos; esattamente la profondita&apos; che ottieni per la tua attivita&apos;.
            </p>
            <ul className="mt-8 space-y-4">
              {INSIDE.map((v) => {
                const Icon = v.icon;
                return (
                  <li key={v.t} className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
                    </span>
                    <span>
                      <span className="block text-[15px] font-semibold text-white">{v.t}</span>
                      <span className="mt-0.5 block text-[13.5px] leading-relaxed text-white/55">{v.p}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* Destra: il form di cattura */}
        <Reveal delay={120}>
          <div className="card-glow relative overflow-hidden rounded-3xl border border-[#FEC458]/25 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(254,196,88,0.10), transparent 70%)" }}
            />
            <div className="relative">
              {status !== "done" ? (
                <>
                  <h3 className="font-display text-[1.5rem] font-semibold text-white">Ricevi l&apos;audit di esempio</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                    Gratis. Download immediato piu&apos; una copia nella tua inbox.
                  </p>
                  <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/45">
                        Nome
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Il tuo nome"
                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none transition focus:border-[#57C7E3]/60 focus:bg-white/[0.06]"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/45">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@azienda.com"
                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none transition focus:border-[#57C7E3]/60 focus:bg-white/[0.06]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!valid || status === "loading"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEC458] px-6 py-3.5 text-[15px] font-bold text-[#0b1622] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Download className="h-5 w-5" strokeWidth={2.4} />
                      {status === "loading" ? "Preparazione..." : "Scarica l'audit di esempio"}
                    </button>
                    <p className="text-center text-[12px] leading-relaxed text-white/35">
                      Ti inviamo una copia via email e ogni tanto qualche consiglio utile sull&apos;IA. Disiscrizione quando vuoi.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-6 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FEC458]/12">
                    <Check className="h-7 w-7 text-[#FEC458]" strokeWidth={2.6} />
                  </span>
                  <h3 className="font-display mt-5 text-[1.4rem] font-semibold text-white">
                    Il tuo download e&apos; pronto
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                    Se non si e&apos; aperto in automatico, usa il pulsante qui sotto. Una copia sta arrivando anche nella tua inbox.
                  </p>
                  <button
                    onClick={triggerDownload}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FEC458] px-6 py-3 text-[15px] font-bold text-[#0b1622] transition hover:brightness-105"
                  >
                    <Download className="h-5 w-5" strokeWidth={2.4} />
                    Scarica di nuovo
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
