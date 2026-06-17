#!/usr/bin/env bash
#
# Accessibility audit: build the site, serve it locally, and run pa11y
# (axe-core + HTML_CodeSniffer, WCAG 2.1 AA) over every page in the sitemap, in
# both light and dark color schemes.
#
# Usage: npm run a11y
# Env:   A11Y_PORT     listen port (default 8080)
#        A11Y_DIST     build output dir (default .a11y-site — kept separate from
#                      the deploy's public/ since we build with a localhost URL)
#        A11Y_LOG_ONLY when set, report findings but always exit 0 (CI logging)
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PORT="${A11Y_PORT:-8080}"
BASE="http://localhost:${PORT}"
DIST="${A11Y_DIST:-.a11y-site}"

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT

echo "▶ Building site (baseURL=${BASE}/, dist=${DIST}) …"
hugo --gc --minify --baseURL "${BASE}/" --destination "${DIST}"

echo "▶ Serving ${DIST} on port ${PORT} …"
npx http-server "${DIST}" -p "${PORT}" -s -c-1 >/dev/null 2>&1 &
SERVER_PID=$!

echo "▶ Waiting for server …"
for _ in $(seq 1 40); do
  if curl -sf "${BASE}/sitemap.xml" >/dev/null 2>&1; then
    break
  fi
  sleep 0.25
done

if ! curl -sf "${BASE}/sitemap.xml" >/dev/null 2>&1; then
  echo "✗ Server did not become ready at ${BASE}" >&2
  exit 1
fi

echo "▶ Auditing every page in light and dark modes …"
# Custom runner (instead of pa11y-ci) so we can emulate prefers-color-scheme
# and exercise the dark theme. Writes pa11y-report.json.
node scripts/a11y-run.js "${BASE}" pa11y-report.json

echo "▶ Classifying results …"
node scripts/a11y-report.js pa11y-report.json
