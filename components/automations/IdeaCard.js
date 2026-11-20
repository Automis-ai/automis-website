import { Wrench, LifeBuoy } from "lucide-react";

// Scheda di un'idea di automazione: etichetta («Con il nostro aiuto» / «Da solo, con la guida»), titolo, testo.
const MODE = {
  aiuto: { label: "Con il nostro aiuto", Icon: LifeBuoy, cls: "border-[#F5CD79]/30 bg-[#F5CD79]/10 text-[#F5CD79]" },
  solo: { label: "Da solo, con la guida", Icon: Wrench, cls: "border-[#8fe0f0]/30 bg-[#8fe0f0]/10 text-[#8fe0f0]" },
};

export default function IdeaCard({ mode, titolo, testo }) {
  const m = MODE[mode];
  return (
    <div className="card-gold relative flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-sm">
      <span className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[12px] font-semibold ${m.cls}`}>
        <m.Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
        {m.label}
      </span>
      <h3 className="font-display mt-4 text-[1.2rem] font-semibold leading-tight text-white">{titolo}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-white/65">{testo}</p>
    </div>
  );
}
