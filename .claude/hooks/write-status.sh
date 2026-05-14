#!/usr/bin/env bash
# write-status.sh — Stop hook for Conductor cities
#
# Captures a mechanical baseline of the current city's git/session state and
# writes it to .context/status.md so Gigi (CHQ @ project-e/puebla) reads it on
# morning-ops sweep.
#
# CONTRACT (System v2.3):
#   - status.md is the SOLE living outbox per city.
#   - The city Claude enriches Goal/Last progress/Blockers/Next action/Ali
#     blocked on either inline or via /status, then sets frontmatter
#     `human_enriched: true` BEFORE session close.
#   - On Stop, this script:
#       * If status.md does NOT exist → writes fresh templated baseline
#       * If exists with `human_enriched: false` → overwrites (no enrichment lost)
#       * If exists with `human_enriched: true` → PRESERVES body, only refreshes
#         frontmatter (mechanical fields) so Gigi reads fresh state without
#         clobbering Claude's enrichment.
#
# Bugs fixed 2026-05-13 (PR follow-up to PR #49):
#   - Gemini #1 (PR #49): `LAST_FILES` `|| echo` fallback was unreachable
#     because pipeline exit = sed's 0. Now uses explicit empty-check.
#   - Gemini #2 (PR #49): `git diff HEAD~1 HEAD` fails on initial-commit
#     repos. Now uses `git log -1 --name-only` (works on first commit).
#   - Design (Gigi 2026-05-13): unconditional overwrite clobbered /status
#     enrichment, leaving outbox empty. Now preserves human-enriched body.
#
# Exit: 0 always (Stop hook should never block close).

set -u

CITY_NAME=$(basename "$(pwd)")
WORKSPACE_NAME=$(basename "$(dirname "$(pwd)")")
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
STATUS=".context/status.md"

BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "?")

PHASE="unknown"
TOOL_CALLS="?"
EDITS="?"
if [ -f ".context/.session-state.json" ]; then
  PHASE=$(python3 -c "import json; print(json.load(open('.context/.session-state.json')).get('phase','?'))" 2>/dev/null || echo "unknown")
  TOOL_CALLS=$(python3 -c "import json; print(json.load(open('.context/.session-state.json')).get('tool_calls','?'))" 2>/dev/null || echo "?")
  EDITS=$(python3 -c "import json; print(json.load(open('.context/.session-state.json')).get('edits','?'))" 2>/dev/null || echo "?")
fi

LAST_COMMIT=$(git log -1 --pretty=format:"%h %ad %s" --date=short 2>/dev/null | head -c 120)
[ -z "$LAST_COMMIT" ] && LAST_COMMIT="(no commits yet)"

# Recently changed files — use git log for initial-commit safety; fall back to status
RAW_FILES=$(git log -1 --name-only --pretty=format:"" 2>/dev/null | sed '/^$/d' | head -5)
if [ -z "$RAW_FILES" ]; then
  RAW_FILES=$(git status --short 2>/dev/null | head -5 | sed 's/^...//')
fi
if [ -z "$RAW_FILES" ]; then
  LAST_FILES="  - (no recent file changes)"
else
  LAST_FILES=$(printf '%s\n' "$RAW_FILES" | sed 's/^/  - /')
fi

mkdir -p .context

# Detect prior enrichment via frontmatter flag
HUMAN_ENRICHED=false
if [ -f "$STATUS" ] && grep -q '^human_enriched: true' "$STATUS" 2>/dev/null; then
  HUMAN_ENRICHED=true
fi

if [ "$HUMAN_ENRICHED" = "true" ]; then
  # Preserve body; refresh frontmatter only
  BODY=$(awk '
    BEGIN { fm_count = 0; in_fm = 0 }
    /^---$/ { fm_count++; if (fm_count == 1) { in_fm = 1; next } else if (fm_count == 2) { in_fm = 0; next } }
    in_fm == 0 && fm_count >= 2 { print }
  ' "$STATUS")
  cat > "$STATUS" <<MDEOF
---
city: ${CITY_NAME}
workspace: ${WORKSPACE_NAME}
branch: ${BRANCH}
updated_at: ${TIMESTAMP}
session_phase: ${PHASE}
generator: write-status.sh (frontmatter refresh; human-enriched body preserved)
human_enriched: true
mechanical_baseline:
  last_commit: "${LAST_COMMIT}"
  tool_calls: ${TOOL_CALLS}
  edits: ${EDITS}
  recently_changed_files:
${LAST_FILES}
---
${BODY}
MDEOF
  echo "Refreshed frontmatter only for '${CITY_NAME}' @ ${TIMESTAMP} (human-enriched body preserved)"
else
  # Fresh write — full templated baseline
  cat > "$STATUS" <<MDEOF
---
city: ${CITY_NAME}
workspace: ${WORKSPACE_NAME}
branch: ${BRANCH}
updated_at: ${TIMESTAMP}
session_phase: ${PHASE}
generator: write-status.sh (mechanical baseline; enrich via /status then set human_enriched:true)
human_enriched: false
---

## Goal

_City Claude — replace with one sentence describing what this city is working toward. After enriching ALL sections, set \`human_enriched: true\` in the frontmatter so the next Stop hook preserves your work._

## Last progress

- Branch: \`${BRANCH}\`
- Session phase: \`${PHASE}\` (tool_calls=${TOOL_CALLS}, edits=${EDITS})
- Last commit: ${LAST_COMMIT}
- Recently changed files:
${LAST_FILES}

## Blockers

_City Claude — categorize as \`technical:\`, \`decision-needed:\`, or \`waiting-on-ali:\`. Leave empty if none._

## Next action

_City Claude — single concrete next step. Mark owner as \`[${CITY_NAME}]\` or \`[ali]\`._

## Ali blocked on

_City Claude — what does Ali specifically need to do to unblock this city? Empty if Ali isn't in the critical path._
MDEOF
  echo "Wrote fresh .context/status.md for '${CITY_NAME}' @ ${TIMESTAMP}"
fi

exit 0
