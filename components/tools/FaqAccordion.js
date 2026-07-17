// Server component: native <details> accordion (no client JS, fully in DOM for SEO).
export default function FaqAccordion({ faqs }) {
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <details key={i} className="group rounded-xl border border-white/10 bg-white/5 p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-white">
            <span>{f.q}</span>
            <span className="ml-4 text-white/40 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 leading-relaxed text-white/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
