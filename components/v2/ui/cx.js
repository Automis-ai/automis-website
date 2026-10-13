// Unisce classi ignorando i valori falsi.
export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
