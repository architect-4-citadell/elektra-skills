#!/bin/bash
# Quality Gate -- async post-edit checks
# PostToolUse hook: non-blocking quality feedback after edits

set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ -z "$FILE_PATH" || ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Language-specific checks
case "$FILE_PATH" in
  *.py)
    if command -v ruff &>/dev/null; then
      if ! ruff format --check "$FILE_PATH" 2>/dev/null; then
        echo "[QUALITY] $FILE_PATH has formatting issues. Run: ruff format $FILE_PATH" >&2
      fi
    fi
    ;;
  *.ts|*.tsx|*.js|*.jsx)
    if [[ "$FILE_PATH" != *test* && "$FILE_PATH" != *spec* && "$FILE_PATH" != *__tests__* ]]; then
      if grep -q 'console\.log' "$FILE_PATH" 2>/dev/null; then
        echo "[QUALITY] $FILE_PATH contains console.log -- remove before shipping." >&2
      fi
    fi
    ;;
  *.go)
    if command -v gofmt &>/dev/null; then
      if [[ -n "$(gofmt -l "$FILE_PATH" 2>/dev/null)" ]]; then
        echo "[QUALITY] $FILE_PATH has formatting issues. Run: gofmt -w $FILE_PATH" >&2
      fi
    fi
    ;;
  *.rs)
    if command -v rustfmt &>/dev/null; then
      if ! rustfmt --check "$FILE_PATH" 2>/dev/null; then
        echo "[QUALITY] $FILE_PATH has formatting issues. Run: rustfmt $FILE_PATH" >&2
      fi
    fi
    ;;
esac

# TODO/FIXME detection (all file types)
if [[ "$TOOL_NAME" == "Edit" || "$TOOL_NAME" == "Write" ]]; then
  TODO_COUNT=$(grep -cE '(TODO|FIXME|HACK|XXX)' "$FILE_PATH" 2>/dev/null || echo "0")
  if [[ "$TODO_COUNT" -gt 0 ]]; then
    echo "[QUALITY] $FILE_PATH has $TODO_COUNT TODO/FIXME markers." >&2
  fi
fi

exit 0
