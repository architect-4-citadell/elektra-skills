#!/bin/bash
# Session Init -- initialize session state for Elektra governance hooks
# SessionStart hook: creates .context/.session-state.json, detects first-run onboarding,
# checks dependency skills on first install, runs update check

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
# Auto-update check
# Detect the elektra-skills install directory and run update check.
# Output is passed through so the agent sees UPGRADE_AVAILABLE or JUST_UPGRADED.
# ---------------------------------------------------------------------------
detect_elektra_dir() {
  # Check common install locations in priority order
  local candidates=(
    "$HOME/.claude/skills/elektra-skills"
    ".claude/skills/elektra-skills"
    ".agents/skills/elektra-skills"
  )
  # Also check if we're running from within the repo itself
  local script_dir
  script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." 2>/dev/null && pwd)"
  if [ -f "$script_dir/VERSION" ] && [ -f "$script_dir/bin/elektra-update-check" ]; then
    echo "$script_dir"
    return 0
  fi
  for dir in "${candidates[@]}"; do
    if [ -d "$dir" ] && [ -f "$dir/VERSION" ]; then
      echo "$dir"
      return 0
    fi
  done
  return 1
}

run_update_check() {
  local elektra_dir
  elektra_dir="$(detect_elektra_dir 2>/dev/null)" || return 0
  if [ -x "$elektra_dir/bin/elektra-update-check" ]; then
    local result
    result=$("$elektra_dir/bin/elektra-update-check" 2>/dev/null || true)
    if [ -n "$result" ]; then
      echo ""
      echo "$result"
      # Tell the agent where to find the upgrade skill
      case "$result" in
        UPGRADE_AVAILABLE*)
          echo "[ELEKTRA] To upgrade, read elektra-update/SKILL.md and follow the Inline upgrade flow."
          ;;
        JUST_UPGRADED*)
          local from to
          read -r _ from to <<< "$result"
          echo "[ELEKTRA] Running Elektra Skills v${to} (just updated from v${from})!"
          ;;
      esac
    fi
  fi
}

# ---------------------------------------------------------------------------
# Dependency skill checker
# Elektra works best with companion skills. Check on first session.
# Emits structured, agent-actionable output with version envelope.
# ---------------------------------------------------------------------------
check_dependency_skills() {
  local LOCAL_SKILLS=".claude/skills"
  local LOCAL_AGENTS=".agents/skills"
  local GLOBAL_SKILLS="$HOME/.claude/skills"
  local PLUGINS_CACHE="$HOME/.claude/plugins/cache"

  local MISSING_REQ_NAMES=()
  local MISSING_REC_NAMES=()
  local MISSING_SLUGS=()
  local INSTALLED=()

  # Check if a skill is installed at any known path (local + global)
  is_skill_installed() {
    local paths="$1"
    IFS=':' read -ra search <<< "$paths"
    for pattern in "${search[@]}"; do
      # shellcheck disable=SC2086
      if ls $pattern 2>/dev/null | head -1 >/dev/null 2>&1; then
        return 0
      fi
    done
    return 1
  }

  # Required companion skills: name|install_slug|search_paths
  local REQUIRED=(
    "gstack|garrytan/gstack|$GLOBAL_SKILLS/gstack:$GLOBAL_SKILLS/*/gstack:$LOCAL_SKILLS/gstack:$LOCAL_AGENTS/gstack"
    "superpowers|obra/superpowers|$GLOBAL_SKILLS/superpowers:$PLUGINS_CACHE/superpowers-dev/superpowers:$LOCAL_SKILLS/superpowers:$LOCAL_AGENTS/superpowers"
  )

  # Recommended companion skills
  local RECOMMENDED=(
    "claude-mem|thedotmack/claude-mem|$GLOBAL_SKILLS/claude-mem:$PLUGINS_CACHE/thedotmack/claude-mem:$LOCAL_SKILLS/claude-mem:$LOCAL_AGENTS/claude-mem"
    "ui-ux-pro-max|ui-ux-pro-max|$GLOBAL_SKILLS/ui-ux-pro-max:$PLUGINS_CACHE/*/ui-ux-pro-max*:$LOCAL_SKILLS/ui-ux-pro-max:$LOCAL_AGENTS/ui-ux-pro-max"
    "everything-claude-code|affaan-m/everything-claude-code|$GLOBAL_SKILLS/everything-claude-code:$PLUGINS_CACHE/*/everything-claude-code:$LOCAL_SKILLS/everything-claude-code:$LOCAL_AGENTS/everything-claude-code"
  )

  for dep in "${REQUIRED[@]}"; do
    IFS='|' read -r name slug paths <<< "$dep"
    if is_skill_installed "$paths"; then
      INSTALLED+=("$name")
    else
      MISSING_REQ_NAMES+=("$name")
      MISSING_SLUGS+=("$slug")
    fi
  done

  for dep in "${RECOMMENDED[@]}"; do
    IFS='|' read -r name slug paths <<< "$dep"
    if is_skill_installed "$paths"; then
      INSTALLED+=("$name")
    else
      MISSING_REC_NAMES+=("$name")
      MISSING_SLUGS+=("$slug")
    fi
  done

  # Resolve elektra-config path for agent instructions
  local config_cmd="elektra-config"
  local elektra_dir
  elektra_dir="$(detect_elektra_dir 2>/dev/null)" || true
  if [[ -n "${elektra_dir:-}" ]] && [[ -x "$elektra_dir/bin/elektra-config" ]]; then
    config_cmd="$elektra_dir/bin/elektra-config"
  fi

  # All installed — compact first-session block
  if [[ ${#MISSING_REQ_NAMES[@]} -eq 0 ]] && [[ ${#MISSING_REC_NAMES[@]} -eq 0 ]]; then
    echo "[ELEKTRA] All dependency skills installed: ${INSTALLED[*]}"
    echo ""
    echo "[ELEKTRA_FIRST_SESSION_BEGIN v1]"
    echo "ACTIONS_COUNT: 1"
    echo "ACTION_1_TYPE: update_notifications"
    echo "ACTION_1_PROMPT: Enable update notifications? Elektra will tell you when new versions are available. [Y/n]"
    echo "ACTION_1_YES_CMD: $config_cmd set update_check true"
    echo "ACTION_1_NO_CMD: $config_cmd set update_check false"
    echo "[ELEKTRA_FIRST_SESSION_END]"
    return
  fi

  # Build install command from missing skills
  local install_cmd
  if command -v npx >/dev/null 2>&1; then
    install_cmd="npx skills add ${MISSING_SLUGS[*]} -g -y"
  else
    install_cmd="(npx not found -- install Node.js first, then: npx skills add ${MISSING_SLUGS[*]} -g -y)"
  fi

  # Compact first-session block (deps + update config)
  echo ""
  echo "[ELEKTRA_FIRST_SESSION_BEGIN v1]"
  echo "ACTIONS_COUNT: 2"
  echo "ACTION_1_TYPE: companion_skills"
  [[ ${#MISSING_REQ_NAMES[@]} -gt 0 ]] && echo "ACTION_1_MISSING_REQUIRED: ${MISSING_REQ_NAMES[*]}"
  [[ ${#MISSING_REC_NAMES[@]} -gt 0 ]] && echo "ACTION_1_MISSING_RECOMMENDED: ${MISSING_REC_NAMES[*]}"
  echo "ACTION_1_INSTALL_CMD: $install_cmd"
  echo "ACTION_2_TYPE: update_notifications"
  echo "ACTION_2_PROMPT: Enable update notifications? [Y/n]"
  echo "ACTION_2_YES_CMD: $config_cmd set update_check true"
  echo "ACTION_2_NO_CMD: $config_cmd set update_check false"
  echo "SEQUENCE: ACTION_1 first, then ACTION_2"
  echo "[ELEKTRA_FIRST_SESSION_END]"
}

# ---------------------------------------------------------------------------
# Session detection: first-run vs returning
# ---------------------------------------------------------------------------
if [[ ! -f "MEMORY.md" ]]; then
  # No memory at all -- full onboarding needed
  echo "[ELEKTRA] First session detected -- no MEMORY.md found."
  echo ""
  echo "Run First Session Protocol (Phases A-E per CLAUDE.md)."
  echo "Batch all onboarding questions in TWO prompts."

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
  # Returning session -- compact status
  BRANCH=$(git branch --show-current 2>/dev/null || echo 'unknown')
  echo "[ELEKTRA] Session initialized. Branch: $BRANCH. Hooks active."
fi

# Always run update check (non-blocking — outputs only if action needed)
run_update_check

exit 0
