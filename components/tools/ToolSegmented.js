"use client";

// Button-group replacement for <select> (the site's global select styling
// duplicates native selects), used by the tool widgets.
export default function ToolSegmented({ value, onChange, options, ariaLabel, light = false }) {
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
            light
              ? value === k ? "border-blue-600 bg-blue-50 font-semibold text-blue-900" : "border-gray-300 bg-white text-gray-700 hover:border-gray-500"
              : value === k ? "border-blue-middle bg-blue-middle/25 text-white" : "border-white/15 bg-white/5 text-white/70 hover:border-white/40"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
