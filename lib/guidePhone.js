// Numero di telefono -> E.164 (+393331234567). Serve al modulo «Ce l'hai già?» e alla route.
// Prefisso di default: +39. Accetta spazi, trattini, punti, parentesi, «+», «00».

/**
 * @param {string} raw      quello che scrive la persona
 * @param {string} [defaultCc] prefisso internazionale senza +, default "39"
 * @returns {string|null}   "+39..." oppure null se non è un numero plausibile
 */
export function normalizePhone(raw, defaultCc = "39") {
  if (typeof raw !== "string") return null;
  let s = raw.trim();
  if (!s || s.length > 30) return null;
  if (/[^\d\s().+\-]/.test(s)) return null;

  const hasPlus = s.startsWith("+");
  let digits = s.replace(/\D/g, "");
  if (!digits) return null;

  if (hasPlus) {
    // già internazionale
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (defaultCc === "39" && digits.startsWith("39") && digits.length >= 12 && digits.length <= 13) {
    // 393331234567 scritto senza «+»: un cellulare italiano nazionale ha 10 cifre
  } else {
    digits = defaultCc + digits;
  }

  if (!/^[1-9]\d{7,14}$/.test(digits)) return null;
  if (digits.startsWith("39")) {
    const nat = digits.slice(2);
    // cellulari: 3xx + 6-7 cifre (9-10 in tutto); fissi: 0xx + 5-9 cifre (6-11 in tutto)
    if (!/^(3\d{8,9}|0\d{5,10})$/.test(nat)) return null;
  }
  return "+" + digits;
}
