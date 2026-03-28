#!/bin/bash
# Cycle Guard -- enforces Plan > Implement > Test > Review > Ship workflow
# PreToolUse hook: tracks phases, warns on workflow violations

set -euo pipefail

STATE_FILE=".context/.session-state.json"

# Init if missing
if [[ ! -f "$STATE_FILE" ]]; then
  mkdir -p ".context"
  echo '{"phase":"init","tool_calls":0,"edits":0,"tests_run":false,"review_done":false,"plan_loaded":false,"last_cap_warn":0,"started_at":"","last_tool":""}' > "$STATE_FILE"
fi

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Read current state once
STATE=$(cat "$STATE_FILE")
PHASE=$(echo "$STATE" | jq -r '.phase // "init"')
TOOL_CALLS=$(echo "$STATE" | jq -r '.tool_calls // 0')
EDITS=$(echo "$STATE" | jq -r '.edits // 0')
TESTS_RUN=$(echo "$STATE" | jq -r '.tests_run // false')
REVIEW_DONE=$(echo "$STATE" | jq -r '.review_done // false')
PLAN_LOADED=$(echo "$STATE" | jq -r '.plan_loaded // false')

# Build jq update expression
NEW_COUNT=$((TOOL_CALLS + 1))
JQ_UPDATE=".tool_calls = $NEW_COUNT | .last_tool = \"$TOOL_NAME\""

case "$TOOL_NAME" in
  Skill)
    SKILL_NAME=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')
    case "$SKILL_NAME" in
      standard-orders|SO-godspeed|godspeed|godspeed-resume)
        JQ_UPDATE="$JQ_UPDATE | .phase = \"plan\" | .plan_loaded = true"
        ;;
      responsible-ai)
        JQ_UPDATE="$JQ_UPDATE | .phase = \"audit\""
        ;;
      SO-pm|project-mgmt)
        JQ_UPDATE="$JQ_UPDATE | .phase = \"review\" | .review_done = true"
        ;;
    esac
    ;;
  Edit|Write)
    NEW_EDITS=$((EDITS + 1))
    JQ_UPDATE="$JQ_UPDATE | .edits = $NEW_EDITS | .phase = \"implement\""
    # Warn if 3+ edits without plan (regardless of current phase)
    if [[ "$PLAN_LOADED" == "false" && "$NEW_EDITS" -ge 3 ]]; then
      echo "[CYCLE GUARD] 3+ edits without loading a plan. Consider /standard-orders or /godspeed first." >&2
    fi
    ;;
  Bash)
    # Generic test runner detection
    if echo "$COMMAND" | grep -qE '(pytest|jest|vitest|mocha|cargo test|go test|npm test|pnpm test|yarn test|ruff check|pyright|tsc --noEmit|mix test|bundle exec rspec)'; then
      JQ_UPDATE="$JQ_UPDATE | .tests_run = true | .phase = \"test\""
    fi
    # Warn before push without review/tests
    if echo "$COMMAND" | grep -qE '^git push'; then
      if [[ "$REVIEW_DONE" == "false" && "$EDITS" -gt 0 ]]; then
        echo "[CYCLE GUARD] Pushing without review. Consider running tests and review first." >&2
      fi
      if [[ "$TESTS_RUN" == "false" && "$EDITS" -gt 0 ]]; then
        echo "[CYCLE GUARD] Pushing without running tests." >&2
      fi
    fi
    ;;
  Agent)
    JQ_UPDATE="$JQ_UPDATE | .phase = \"implement\""
    ;;
esac

# Single write to state file
echo "$STATE" | jq "$JQ_UPDATE" > "${STATE_FILE}.tmp" && mv "${STATE_FILE}.tmp" "$STATE_FILE"

exit 0
