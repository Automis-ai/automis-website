"use client";
import { useState } from "react";
import { Stethoscope, Landmark } from "lucide-react";

// Real client logo on a light chip (logos read best on white), with an
// icon fallback if the file is missing. Icon is picked per slug.
const ICONS = {
  "clinica-santa-maria": Stethoscope,
  adifesa: Landmark,
};

export default function ClientMark({ slug, logo, name, size = "md" }) {
  const [failed, setFailed] = useState(false);
  const Icon = ICONS[slug] || Landmark;
  const h = size === "lg" ? "h-16" : "h-12";
  const imgH = size === "lg" ? "max-h-11" : "max-h-8";

  if (logo && !failed) {
    return (
      <span className={`flex ${h} items-center justify-center rounded-xl bg-white px-3`}>
        <img
          src={logo}
          alt={name}
          onError={() => setFailed(true)}
          className={`${imgH} w-auto object-contain`}
        />
      </span>
    );
  }
  return (
    <span className={`flex ${h} w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]`}>
      <Icon className="h-5 w-5 text-[#8fe0f0]" strokeWidth={1.8} />
    </span>
  );
}
