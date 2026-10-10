#!/usr/bin/env bash
# Il "fatto" di automis-website: prima di dire che una modifica funziona, questo esce 0.
#
#   scripts/verify.sh          build di produzione (~20s) in .next-verify, non tocca `next dev`
#   scripts/verify.sh --hook   per l'hook Stop di Claude Code (legge il JSON da stdin):
#                              salta se niente e' cambiato dall'ultimo verde, altrimenti fa
#                              la build; se fallisce esce 2 e l'errore torna all'agente,
#                              che corregge. Dopo 3 rossi di fila nella stessa sessione
#                              smette di bloccare e avvisa: a quel punto decide un umano.
#
# Niente lint: il repo non ha una config ESLint e `next lint` aprirebbe il wizard.
# Niente seo-check in locale: middleware.js tratta localhost come voice host, quindi il
# ramo PT risponde 404 e la sitemap vede meta' delle pagine (86 falsi errori, 10/10/2026).
# Il controllo SEO vero gira in CI su ogni deploy (.github/workflows/seo-check.yml).

set -uo pipefail
cd "$(dirname "$0")/.."

MODE="${1:-}"
DIST=".next-verify"
STATE="$(cd "$(git rev-parse --git-dir)" && pwd)/verify-state"
MAX_RED=3
LOG="$STATE/last-build.log"
mkdir -p "$STATE"
export NEXT_TELEMETRY_DISABLED=1

build() {
  NEXT_DIST_DIR="$DIST" node_modules/.bin/next build >"$LOG" 2>&1
}

# Impronta dello stato del codice: HEAD + modifiche tracciate + file nuovi non ignorati.
fingerprint() {
  {
    git rev-parse HEAD
    git diff HEAD
    git ls-files -o --exclude-standard -z | xargs -0 shasum 2>/dev/null
  } | shasum | cut -d' ' -f1
}

if [ "$MODE" = "--hook" ]; then
  INPUT="$(cat)"
  SESSION="$(printf '%s' "$INPUT" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{process.stdout.write(JSON.parse(s).session_id||"nosession")}catch{process.stdout.write("nosession")}})')"
  RED_FILE="$STATE/red-$SESSION"

  # Niente da verificare: albero pulito e nessun commit oltre main.
  if [ -z "$(git status --porcelain)" ] && [ "$(git rev-list --count origin/main..HEAD 2>/dev/null || echo 1)" = "0" ]; then
    rm -f "$RED_FILE"
    exit 0
  fi

  FP="$(fingerprint)"
  if [ -f "$STATE/last-green" ] && [ "$(cat "$STATE/last-green")" = "$FP" ]; then
    rm -f "$RED_FILE"
    exit 0
  fi

  if build; then
    echo "$FP" >"$STATE/last-green"
    rm -f "$RED_FILE"
    exit 0
  fi

  RED=$(( $(cat "$RED_FILE" 2>/dev/null || echo 0) + 1 ))
  echo "$RED" >"$RED_FILE"
  if [ "$RED" -gt "$MAX_RED" ]; then
    printf '{"systemMessage":"verify.sh: build rossa per %s volte di fila, l%sagente non riesce a sistemarla da solo. Log: %s"}\n' "$MAX_RED" "'" "$LOG"
    exit 0
  fi
  {
    echo "verify.sh: la build di produzione fallisce (tentativo $RED di $MAX_RED). Non dire che e' fatto."
    echo "Correggi la causa e chiudi di nuovo il turno; l'hook rilancia la build da solo."
    echo "--- ultime righe di next build ---"
    tail -40 "$LOG"
  } >&2
  exit 2
fi

if ! build; then
  echo "✗ build fallita — ultime righe:"; tail -40 "$LOG"; exit 1
fi
echo "$(fingerprint)" >"$STATE/last-green"
echo "✓ build ok"

