import "./v2.css";

/* Logo cliente su pastiglia bianca (interno al kit: lo usano CaseTeaser e ProofStrip). */
export default function Logo({ logo, name }) {
  if (!logo || !logo.src) return null;
  return (
    <span className="v2-logo">
      <img
        src={logo.src}
        alt={logo.alt ?? name ?? ""}
        {...(logo.width ? { width: logo.width } : {})}
        {...(logo.height ? { height: logo.height } : {})}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}
