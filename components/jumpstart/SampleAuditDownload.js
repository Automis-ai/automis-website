"use client";

import { useState } from "react";
import { Section, Reveal, GradientText } from "@/components/home/_ui";
import { FileText, Download, Check, Target, LineChart, BarChart3 } from "lucide-react";

const PDF_URL = "/assets/downloads/sample-marketing-ai-audit.pdf";

const INSIDE = [
  { icon: Target, t: "Impact vs effort matrix", p: "Every opportunity ranked, so quick wins come first." },
  { icon: LineChart, t: "A money slide with the ROI", p: "Projected return, payback, and hours saved." },
  { icon: BarChart3, t: "A real ad-spend audit", p: "Cost per lead by service and where to reallocate." },
];

export default function SampleAuditDownload() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | done

  const valid =
    name.trim().length > 1 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim());

  function triggerDownload() {
    const a = document.createElement("a");
    a.href = PDF_URL;
    a.download = "Automis-Sample-Marketing-AI-Audit.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!valid || status === "loading") return;
    setStatus("loading");
    try {
      // Capture the lead in GHL (tag "audit form"). Fail soft: still deliver.
      await fetch("/api/audit-sample", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
    } catch (_) {
      /* ignore, still deliver the download */
    }
    setStatus("done");
    triggerDownload();
  }

  return (
    <Section id="sample-audit" className="bg-deep-blue" inner="max-w-6xl">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left: the pitch */}
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FEC458]/30 bg-[#FEC458]/[0.07] px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#FEC458]">
              <FileText className="h-3.5 w-3.5" strokeWidth={2.2} />
              Free sample
            </span>
            <h2 className="font-display mt-5 text-[2rem] font-bold leading-tight text-white sm:text-[2.6rem]">
              See what a <GradientText>real audit</GradientText> looks like
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/65">
              Download a real Jumpstart Audit, anonymized. Nine pages showing where a business leaks time and money, a phased plan, and the projected ROI. It is the exact depth you get for your own business.
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

        {/* Right: the capture form */}
        <Reveal delay={120}>
          <div className="card-glow relative overflow-hidden rounded-3xl border border-[#FEC458]/25 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{ background: "radial-gradient(60% 60% at 50% 0%, rgba(254,196,88,0.10), transparent 70%)" }}
            />
            <div className="relative">
              {status !== "done" ? (
                <>
                  <h3 className="font-display text-[1.5rem] font-semibold text-white">Get the sample audit</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/55">
                    Free. Instant download plus a copy in your inbox.
                  </p>
                  <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.12em] text-white/45">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
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
                        placeholder="you@company.com"
                        className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none transition focus:border-[#57C7E3]/60 focus:bg-white/[0.06]"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!valid || status === "loading"}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEC458] px-6 py-3.5 text-[15px] font-bold text-[#0b1622] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Download className="h-5 w-5" strokeWidth={2.4} />
                      {status === "loading" ? "Preparing..." : "Download the sample audit"}
                    </button>
                    <p className="text-center text-[12px] leading-relaxed text-white/35">
                      We will email you a copy and occasionally share useful AI tips. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="py-6 text-center">
                  <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FEC458]/12">
                    <Check className="h-7 w-7 text-[#FEC458]" strokeWidth={2.6} />
                  </span>
                  <h3 className="font-display mt-5 text-[1.4rem] font-semibold text-white">
                    Your download is ready
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                    If it did not open automatically, use the button below. A copy is on its way to your inbox too.
                  </p>
                  <button
                    onClick={triggerDownload}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FEC458] px-6 py-3 text-[15px] font-bold text-[#0b1622] transition hover:brightness-105"
                  >
                    <Download className="h-5 w-5" strokeWidth={2.4} />
                    Download again
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
