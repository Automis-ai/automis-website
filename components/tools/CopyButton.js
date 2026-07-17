"use client";

import { useState } from "react";

export default function CopyButton({ value, label, copiedLabel = "Copied", className = "" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; ignore silently
    }
  }

  return (
    <button type="button" onClick={copy} className={className}>
      {copied ? copiedLabel : label}
    </button>
  );
}
