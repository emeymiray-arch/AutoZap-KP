#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/KP-AutoZap-ARMTEK.pdf"
CHROME="${CHROME_PATH:-google-chrome-stable}"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --hide-scrollbars \
  --allow-file-access-from-files \
  --print-to-pdf="$OUT" \
  "file://$ROOT/docs/kp.html"

cp "$OUT" "$ROOT/docs/KP-AutoZap-ARMTEK.pdf"
echo "Wrote $OUT"
