#!/bin/bash
# RAI Check -- guardrail on sensitive file edits
# PreToolUse hook: detects RAI-sensitive file paths and injects governance context

set -euo pipefail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Generic RAI-sensitive path patterns (covers any project)
RAI_PATHS=(
  # AI/ML pipeline
  "llm" "model" "pipeline" "inference" "prompt" "embedding"
  "council" "orchestrat" "agent" "rag" "vector"
  # Data layer
  "graph" "tenant" "isolation" "pii" "personal" "user_data"
  "multi_tenant" "rls" "security"
  # Document/output rendering
  "render" "document" "export" "generate" "template"
  # Computation
  "compute" "financial" "calculation" "deterministic"
  # Auth & compliance
  "auth" "compliance" "audit" "gdpr" "privacy"
)

MATCH=false
TRIGGER=""

for pattern in "${RAI_PATHS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    MATCH=true
    TRIGGER="$pattern"
    break
  fi
done

if [[ "$MATCH" == "true" ]]; then
  CONTEXT="[RAI GUARDRAIL -- trigger: ${TRIGGER}] "
  CONTEXT+="This file touches RAI-sensitive code. "
  CONTEXT+="Invoke /responsible-ai and review the 7-pillar checklist: "
  CONTEXT+="tenant isolation, PII protection, citation integrity, "
  CONTEXT+="confidence scoring, hallucination prevention, bias mitigation, content provenance. "
  CONTEXT+="See: responsible-ai/SKILL.md and responsible-ai/references/rai-checklist.md"

  printf '{"hookSpecificOutput":{"hookEventName":"PreToolUse","additionalContext":"%s"}}' "$CONTEXT"
fi

exit 0
