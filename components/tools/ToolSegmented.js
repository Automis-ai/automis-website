"use client";

// Button-group replacement for <select> (the site's global select styling
// duplicates native selects), used by the tool widgets.
export default function ToolSegmented({ value, onChange, options, ariaLabel }) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {options.map(([k, label]) => (
        <button
          key={k}
          type="button"
          role="radio"
          aria-checked={value === k}
          onClick={() => onChange(k)}
          className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
            value === k ? "border-blue-middle bg-blue-middle/25 text-white" : "border-white/15 bg-white/5 text-white/70 hover:border-white/40"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
