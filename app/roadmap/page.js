"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const T = {
  en: {
    ready: "Your AI Opportunity Roadmap",
    sub: "Here is your personalised roadmap. Your download should start automatically.",
    focus: "Focus pillar",
    hours: "Time back / week",
    download: "Download my roadmap",
    building: "Preparing your roadmap…",
    book: "Want us to build these? Book a call",
    booking: "https://api.leadconnectorhq.com/widget/bookings/discover-automis",
    hrs: "hrs",
  },
  it: {
    ready: "La tua Roadmap di Opportunità IA",
    sub: "Ecco la tua roadmap personalizzata. Il download dovrebbe partire in automatico.",
    focus: "Pilastro prioritario",
    hours: "Tempo risparmiato / settimana",
    download: "Scarica la mia roadmap",
    building: "Sto preparando la tua roadmap…",
    book: "Vuoi che le costruiamo noi? Prenota una call",
    booking: "https://api.leadconnectorhq.com/widget/bookings/automis-it",
    hrs: "ore",
  },
};

function RoadmapInner() {
  const q = useSearchParams();
  const locale = q.get("l") === "it" ? "it" : "en";
  const t = T[locale];
  const params = {
    name: q.get("n") || "",
    sector: q.get("s") || "",
    primary: q.get("p") || "sales",
    secondary: q.get("x") || null,
    hoursLow: q.get("lo") || "4",
    hoursHigh: q.get("hi") || "8",
    locale,
  };
  const [busy, setBusy] = useState(false);
  const [pillar, setPillar] = useState("");

  const download = async () => {
    setBusy(true);
    try {
      const mod = await import("@/components/home/roadmapPdf");
      setPillar(mod.pillarLabel(params.primary, locale));
      await mod.generateRoadmapPdf(params);
    } catch (err) {
      console.error("Roadmap download error", err);
    }
    setBusy(false);
  };

  // Auto-start the download once when the page opens (from the emailed link).
  useEffect(() => {
    import("@/components/home/roadmapPdf").then((mod) => setPillar(mod.pillarLabel(params.primary, locale)));
    download();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      style={{ background: "#000A14", color: "#fff", minHeight: "100vh" }}
      className="flex items-center justify-center px-6 py-24"
    >
      <div className="w-full max-w-xl text-center">
        <div style={{ letterSpacing: "0.28em", color: "#3C91E6" }} className="text-xs font-semibold uppercase mb-4">
          Automis
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{t.ready}</h1>
        <p style={{ color: "#B4C2FF" }} className="mb-8">{t.sub}</p>

        <div
          style={{ border: "1px solid rgba(60,145,230,.3)", background: "linear-gradient(135deg,rgba(10,61,98,.5),rgba(5,31,51,.35))" }}
          className="rounded-2xl p-6 mb-8 flex items-center justify-between gap-4 text-left"
        >
          <div>
            <div style={{ color: "#FEC458" }} className="text-3xl font-extrabold leading-none">
              {params.hoursLow}-{params.hoursHigh} {t.hrs}
            </div>
            <div style={{ color: "#B4C2FF" }} className="text-xs uppercase tracking-wider mt-2">{t.hours}</div>
          </div>
          <div className="text-right text-sm" style={{ color: "rgba(255,255,255,.75)" }}>
            <div className="uppercase tracking-wider text-xs" style={{ color: "#B4C2FF" }}>{t.focus}</div>
            <div className="font-semibold">{pillar}</div>
          </div>
        </div>

        <button
          onClick={download}
          disabled={busy}
          style={{ background: "#FEC458", color: "#000A14" }}
          className="inline-block font-bold rounded-xl px-7 py-3 disabled:opacity-60"
        >
          {busy ? t.building : t.download}
        </button>

        <div className="mt-8">
          <a href={t.booking} target="_blank" rel="noopener noreferrer" style={{ color: "#3C91E6" }} className="font-semibold underline">
            {t.book}
          </a>
        </div>
      </div>
    </main>
  );
}

export default function RoadmapPage() {
  return (
    <Suspense fallback={<main style={{ background: "#000A14", minHeight: "100vh" }} />}>
      <RoadmapInner />
    </Suspense>
  );
}
