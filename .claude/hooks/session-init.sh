#!/bin/bash
# Session Init -- initialize session state for Elektra governance hooks
# SessionStart hook: creates .context/.session-state.json, detects first-run onboarding,
# checks dependency skills on first install

set -euo pipefail

STATE_DIR=".context"
STATE_FILE="$STATE_DIR/.session-state.json"

mkdir -p "$STATE_DIR"

# Fresh state per session
cat > "$STATE_FILE" << INIT
{
  "phase": "init",
  "tool_calls": 0,
  "edits": 0,
  "tests_run": false,
  "review_done": false,
  "plan_loaded": false,
  "last_cap_warn": 0,
  "started_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')"
}
INIT

# ---------------------------------------------------------------------------
# Dependency skill checker
# Elektra works best with companion skills. Check on first session.
# ---------------------------------------------------------------------------
check_dependency_skills() {
  local SKILLS_DIR="$HOME/.claude/skills"
  local PLUGINS_CACHE="$HOME/.claude/plugins/cache"
  local MISSING=()
  local INSTALLED=()

  # Dependency table: name|install_cmd|description|search_patterns (colon-separated glob paths)
  local DEPS=(
    "gstack|npx skills add garrytan/gstack -g -y|Governor Stack -- QA, review, browser testing, ship workflows|$SKILLS_DIR/gstack:$SKILLS_DIR/*/gstack"
    "superpowers|npx skills add obra/superpowers -g -y|Planning, code review, parallel agent dispatch|$SKILLS_DIR/superpowers:$PLUGINS_CACHE/superpowers-dev/superpowers"
    "claude-mem|npx skills add thedotmack/claude-mem -g -y|Persistent memory search across sessions (recommended)|$SKILLS_DIR/claude-mem:$PLUGINS_CACHE/thedotmack/claude-mem"
    "ui-ux-pro-max|npx skills add ui-ux-pro-max -g -y|50+ styles, 99 UX guidelines, design review for P3.5/P4.5 (recommended)|$SKILLS_DIR/ui-ux-pro-max:$PLUGINS_CACHE/*/ui-ux-pro-max*"
    "everything-claude-code|npx skills add affaan-m/everything-claude-code -g -y|100+ agent skills -- TDD, code review, build resolution (optional)|$SKILLS_DIR/everything-claude-code:$PLUGINS_CACHE/*/everything-claude-code"
  )

  for dep in "${DEPS[@]}"; do
    IFS='|' read -r name cmd desc paths <<< "$dep"
    local found=false
    IFS=':' read -ra SEARCH_PATHS <<< "$paths"
    for pattern in "${SEARCH_PATHS[@]}"; do
      # shellcheck disable=SC2086
      if ls $pattern 2>/dev/null | head -1 >/dev/null 2>&1; then
        found=true
        break
      fi
    done
    if [[ "$found" == "true" ]]; then
      INSTALLED+=("$name")
    else
      MISSING+=("$name|$cmd|$desc")
    fi
  done

  # Report
  if [[ ${#MISSING[@]} -gt 0 ]]; then
    echo ""
    echo "[ELEKTRA] Dependency Check:"
    echo ""
    for skill in "${INSTALLED[@]}"; do
      echo "  [x] $skill"
    done
    for entry in "${MISSING[@]}"; do
      IFS='|' read -r name cmd desc <<< "$entry"
      echo "  [ ] $name -- $desc"
      echo "      Install: $cmd"
    done
    echo ""
    echo "Install all missing with:"
    echo "  npx skills add garrytan/gstack obra/superpowers thedotmack/claude-mem ui-ux-pro-max -g -y"
    echo ""
  else
    echo "[ELEKTRA] All dependency skills installed: ${INSTALLED[*]}"
  fi
}

# ---------------------------------------------------------------------------
# Session detection: first-run vs returning
# ---------------------------------------------------------------------------
if [[ ! -f "MEMORY.md" ]]; then
  # No memory at all -- full onboarding needed
  cat << 'CONTEXT'
[ELEKTRA] First session detected -- no MEMORY.md found.

Run First Session Protocol:
  Phase A: Self-onboard (read README, package.json/pyproject.toml, git history, directory structure)
  Phase B: Onboard user (batch-ask: role, experience band S1-S4, team context, current work)
  Phase C: Initialize memory (project_discovery.md, user_profile.md, MEMORY.md)
  Phase D: Configure Standing Orders based on discovered context
  Phase E: Dispatch to appropriate Standing Order based on user's current task

Do NOT skip any phase. Ask all onboarding questions in TWO batched prompts.
CONTEXT

  # First install -- check dependencies
  check_dependency_skills

elif ! grep -q "user_profile" "MEMORY.md" 2>/dev/null; then
  # Memory exists but no user profile -- partial onboarding
  cat << 'CONTEXT'
[ELEKTRA] Returning project, new user. MEMORY.md found but no user profile.
Run User Onboarding (Phase B of First Session Protocol).
Ask all questions in TWO batched prompts, then save to user_profile.md.
CONTEXT

else
  # Returning session -- announce status
  BRANCH=$(git branch --show-current 2>/dev/null || echo 'unknown')
  cat << CONTEXT
[ELEKTRA] Session initialized.
Branch: $BRANCH
Hooks active: cycle-guard, token-cap, rai-check, quality-gate
Skills: /standard-orders, /godspeed, /godspeed-resume, /project-mgmt, /responsible-ai, /autoresearch, /plan-design-review
Standing Orders: Plan > Implement > Test > Review > Ship
CONTEXT
fi

exit 0
