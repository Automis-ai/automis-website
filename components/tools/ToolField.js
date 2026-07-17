"use client";

// Presentational field wrapper for tool inputs.
export default function ToolField({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-white/80">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-white/40">{hint}</span> : null}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
