#!/bin/bash
# Token Cap Guard -- warns when approaching session context limit
# PreToolUse hook: uses tool call count as proxy (~2K tokens per call average)

set -euo pipefail

STATE_FILE=".context/.session-state.json"

if [[ ! -f "$STATE_FILE" ]]; then
  exit 0
fi

TOOL_CALLS=$(jq -r '.tool_calls // 0' "$STATE_FILE")
EDITS=$(jq -r '.edits // 0' "$STATE_FILE")
PHASE=$(jq -r '.phase // "init"' "$STATE_FILE")

WARN_THRESHOLD=70     # ~70% context
CRITICAL_THRESHOLD=85  # ~85% context
CAP_THRESHOLD=95       # ~95% context

if [[ "$TOOL_CALLS" -ge "$CAP_THRESHOLD" ]]; then
  echo "[TOKEN CAP] SESSION LIMIT. Finish current task, commit, push. Resume: /godspeed-resume" >&2
  echo "[TOKEN CAP] Phase: $PHASE | Tool calls: $TOOL_CALLS | Edits: $EDITS" >&2
elif [[ "$TOOL_CALLS" -ge "$CRITICAL_THRESHOLD" ]]; then
  echo "[TOKEN CAP] Approaching limit. Wrap up current chunk. $((CAP_THRESHOLD - TOOL_CALLS)) calls remaining." >&2
elif [[ "$TOOL_CALLS" -ge "$WARN_THRESHOLD" ]]; then
  LAST_WARNED=$(jq -r '.last_cap_warn // 0' "$STATE_FILE")
  if [[ "$LAST_WARNED" -lt "$WARN_THRESHOLD" ]]; then
    jq --argjson w "$WARN_THRESHOLD" '.last_cap_warn = $w' "$STATE_FILE" > "${STATE_FILE}.tmp" \
      && mv "${STATE_FILE}.tmp" "$STATE_FILE"
    echo "[TOKEN CAP] ~70% context used. Plan your exit: finish task > test > commit > push." >&2
  fi
fi

exit 0
