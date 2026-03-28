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

# Read current state
PHASE=$(jq -r '.phase // "init"' "$STATE_FILE")
TOOL_CALLS=$(jq -r '.tool_calls // 0' "$STATE_FILE")
EDITS=$(jq -r '.edits // 0' "$STATE_FILE")
TESTS_RUN=$(jq -r '.tests_run // false' "$STATE_FILE")
REVIEW_DONE=$(jq -r '.review_done // false' "$STATE_FILE")
PLAN_LOADED=$(jq -r '.plan_loaded // false' "$STATE_FILE")

# Increment tool calls
NEW_COUNT=$((TOOL_CALLS + 1))
jq --argjson tc "$NEW_COUNT" --arg lt "$TOOL_NAME" \
  '.tool_calls = $tc | .last_tool = $lt' "$STATE_FILE" > "${STATE_FILE}.tmp" \
  && mv "${STATE_FILE}.tmp" "$STATE_FILE"

case "$TOOL_NAME" in
  Skill)
    SKILL_NAME=$(echo "$INPUT" | jq -r '.tool_input.skill // empty')
    case "$SKILL_NAME" in
      standard-orders|SO-godspeed|godspeed|godspeed-resume)
        jq '.phase = "plan" | .plan_loaded = true' "$STATE_FILE" > "${STATE_FILE}.tmp" \
          && mv "${STATE_FILE}.tmp" "$STATE_FILE"
        ;;
      responsible-ai)
        jq '.phase = "audit"' "$STATE_FILE" > "${STATE_FILE}.tmp" \
          && mv "${STATE_FILE}.tmp" "$STATE_FILE"
        ;;
      SO-pm|project-mgmt)
        jq '.phase = "review" | .review_done = true' "$STATE_FILE" > "${STATE_FILE}.tmp" \
          && mv "${STATE_FILE}.tmp" "$STATE_FILE"
        ;;
    esac
    ;;
  Edit|Write)
    NEW_EDITS=$((EDITS + 1))
    jq --argjson e "$NEW_EDITS" '.edits = $e | .phase = "implement"' "$STATE_FILE" > "${STATE_FILE}.tmp" \
      && mv "${STATE_FILE}.tmp" "$STATE_FILE"
    # Warn if 3+ edits without plan (regardless of current phase)
    if [[ "$PLAN_LOADED" == "false" && "$NEW_EDITS" -ge 3 ]]; then
      echo "[CYCLE GUARD] 3+ edits without loading a plan. Consider /standard-orders or /godspeed first." >&2
    fi
    ;;
  Bash)
    # Generic test runner detection
    if echo "$COMMAND" | grep -qE '(pytest|jest|vitest|mocha|cargo test|go test|npm test|pnpm test|yarn test|ruff check|pyright|tsc --noEmit|mix test|bundle exec rspec)'; then
      jq '.tests_run = true | .phase = "test"' "$STATE_FILE" > "${STATE_FILE}.tmp" \
        && mv "${STATE_FILE}.tmp" "$STATE_FILE"
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
    jq '.phase = "implement"' "$STATE_FILE" > "${STATE_FILE}.tmp" \
      && mv "${STATE_FILE}.tmp" "$STATE_FILE"
    ;;
esac

exit 0
