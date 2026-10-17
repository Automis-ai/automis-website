// Server component: native <details> accordion (no client JS, fully in DOM for SEO).
export default function FaqAccordion({ faqs }) {
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <details key={i} className="hv3-faqi">
          <summary>
            <span>{f.q}</span>
            <i aria-hidden="true">+</i>
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
