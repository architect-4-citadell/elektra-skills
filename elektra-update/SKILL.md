---
name: elektra-update
version: 1.0.0
description: |
  Upgrade Elektra Skills to the latest version. Detects global vs vendored install,
  runs the upgrade, and shows what's new. Use when asked to "upgrade elektra",
  "update elektra", or "get latest version".
compatibility: "Claude Code, Cursor, Gemini CLI, Codex, Windsurf, GitHub Copilot, and 30+ compatible agents"
allowed-tools:
  - Bash
  - Read
  - Write
  - AskUserQuestion
---

# /elektra-update

Upgrade Elektra Skills to the latest version and show what's new.

## Inline upgrade flow

This section is referenced by `session-init.sh` when it detects `UPGRADE_AVAILABLE`.

### Step 1: Ask the user (or auto-upgrade)

First, check if auto-upgrade is enabled:
```bash
_ELEKTRA_DIR="${ELEKTRA_DIR:-$(cd "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")/.." 2>/dev/null && pwd || echo "$HOME/.claude/skills/elektra-skills")}"
_AUTO=$("$_ELEKTRA_DIR/bin/elektra-config" get auto_upgrade 2>/dev/null || true)
echo "AUTO_UPGRADE=$_AUTO"
```

**If `AUTO_UPGRADE=true`:** Skip AskUserQuestion. Log "Auto-upgrading Elektra v{old} → v{new}..." and proceed directly to Step 2. If `./setup` fails during auto-upgrade, restore from backup (`.bak` directory) and warn the user: "Auto-upgrade failed — restored previous version. Run `/elektra-update` manually to retry."

**Otherwise**, use AskUserQuestion:
- Question: "Elektra Skills **v{new}** is available (you're on v{old}). Upgrade now?"
- Options: ["Yes, upgrade now", "Always keep me up to date", "Not now", "Never ask again"]

**If "Yes, upgrade now":** Proceed to Step 2.

**If "Always keep me up to date":**
```bash
"$_ELEKTRA_DIR/bin/elektra-config" set auto_upgrade true
```
Tell user: "Auto-upgrade enabled. Future updates will install automatically." Then proceed to Step 2.

**If "Not now":** Write snooze state with escalating backoff (first snooze = 24h, second = 48h, third+ = 1 week), then continue with the current skill. Do not mention the upgrade again.
```bash
_SNOOZE_FILE="$HOME/.elektra/update-snoozed"
_REMOTE_VER="{new}"
_CUR_LEVEL=0
if [ -f "$_SNOOZE_FILE" ]; then
  _SNOOZED_VER=$(awk '{print $1}' "$_SNOOZE_FILE")
  if [ "$_SNOOZED_VER" = "$_REMOTE_VER" ]; then
    _CUR_LEVEL=$(awk '{print $2}' "$_SNOOZE_FILE")
    case "$_CUR_LEVEL" in *[!0-9]*) _CUR_LEVEL=0 ;; esac
  fi
fi
_NEW_LEVEL=$((_CUR_LEVEL + 1))
[ "$_NEW_LEVEL" -gt 3 ] && _NEW_LEVEL=3
echo "$_REMOTE_VER $_NEW_LEVEL $(date +%s)" > "$_SNOOZE_FILE"
```
Note: `{new}` is the remote version from the `UPGRADE_AVAILABLE` output — substitute it from the update check result.

Tell user the snooze duration: "Next reminder in 24h" (or 48h or 1 week, depending on level). Tip: "Set `auto_upgrade: true` in `~/.elektra/config.yaml` for automatic upgrades."

**If "Never ask again":**
```bash
"$_ELEKTRA_DIR/bin/elektra-config" set update_check false
```
Tell user: "Update checks disabled. Run `elektra-config set update_check true` to re-enable (binary at `bin/elektra-config` in your install directory)."
Continue with the current skill.

### Step 2: Detect install type

```bash
if [ -d "$HOME/.claude/skills/elektra-skills/.git" ]; then
  INSTALL_TYPE="global-git"
  INSTALL_DIR="$HOME/.claude/skills/elektra-skills"
elif [ -d ".claude/skills/elektra-skills/.git" ]; then
  INSTALL_TYPE="local-git"
  INSTALL_DIR=".claude/skills/elektra-skills"
elif [ -d ".agents/skills/elektra-skills/.git" ]; then
  INSTALL_TYPE="local-git"
  INSTALL_DIR=".agents/skills/elektra-skills"
elif [ -d ".claude/skills/elektra-skills" ]; then
  INSTALL_TYPE="vendored"
  INSTALL_DIR=".claude/skills/elektra-skills"
elif [ -d "$HOME/.claude/skills/elektra-skills" ]; then
  INSTALL_TYPE="vendored-global"
  INSTALL_DIR="$HOME/.claude/skills/elektra-skills"
else
  echo "ERROR: elektra-skills not found"
  exit 1
fi
echo "Install type: $INSTALL_TYPE at $INSTALL_DIR"
```

The install type and directory path printed above will be used in all subsequent steps.

### Step 3: Save old version

Use the install directory from Step 2's output:

```bash
OLD_VERSION=$(cat "$INSTALL_DIR/VERSION" 2>/dev/null || echo "unknown")
```

### Step 4: Upgrade

Use the install type and directory detected in Step 2:

**For git installs** (global-git, local-git):
```bash
cd "$INSTALL_DIR"
STASH_OUTPUT=$(git stash 2>&1)
git fetch origin
git reset --hard origin/main
./setup
```
If `$STASH_OUTPUT` contains "Saved working directory", warn the user: "Note: local changes were stashed. Run `git stash pop` in the skill directory to restore them."

**For vendored installs** (vendored, vendored-global):
```bash
PARENT=$(dirname "$INSTALL_DIR")
TMP_DIR=$(mktemp -d)
git clone --depth 1 https://github.com/architect-4-citadell/elektra-skills.git "$TMP_DIR/elektra-skills"
mv "$INSTALL_DIR" "$INSTALL_DIR.bak"
mv "$TMP_DIR/elektra-skills" "$INSTALL_DIR"
cd "$INSTALL_DIR" && ./setup
rm -rf "$INSTALL_DIR.bak" "$TMP_DIR"
```
If `./setup` fails, restore from backup and warn the user:
```bash
rm -rf "$INSTALL_DIR"
mv "$INSTALL_DIR.bak" "$INSTALL_DIR"
rm -rf "$TMP_DIR"
```
Tell user: "Vendored upgrade failed — restored previous version. Run `/elektra-update` manually to retry."

### Step 4.5: Sync local vendored copy

Use the install directory from Step 2. Check if there's also a local vendored copy that needs updating:

```bash
_ROOT=$(git rev-parse --show-toplevel 2>/dev/null)
LOCAL_ELEKTRA=""
if [ -n "$_ROOT" ] && [ -d "$_ROOT/.claude/skills/elektra-skills" ]; then
  _RESOLVED_LOCAL=$(cd "$_ROOT/.claude/skills/elektra-skills" && pwd -P)
  _RESOLVED_PRIMARY=$(cd "$INSTALL_DIR" && pwd -P)
  if [ "$_RESOLVED_LOCAL" != "$_RESOLVED_PRIMARY" ]; then
    LOCAL_ELEKTRA="$_ROOT/.claude/skills/elektra-skills"
  fi
fi
echo "LOCAL_ELEKTRA=$LOCAL_ELEKTRA"
```

If `LOCAL_ELEKTRA` is non-empty, update it by copying from the freshly-upgraded primary install:
```bash
mv "$LOCAL_ELEKTRA" "$LOCAL_ELEKTRA.bak"
cp -Rf "$INSTALL_DIR" "$LOCAL_ELEKTRA"
rm -rf "$LOCAL_ELEKTRA/.git"
cd "$LOCAL_ELEKTRA" && ./setup
rm -rf "$LOCAL_ELEKTRA.bak"
```
Tell user: "Also updated vendored copy at `$LOCAL_ELEKTRA` — commit `.claude/skills/elektra-skills/` when you're ready."

If `./setup` fails, restore from backup and warn the user:
```bash
rm -rf "$LOCAL_ELEKTRA"
mv "$LOCAL_ELEKTRA.bak" "$LOCAL_ELEKTRA"
```
Tell user: "Sync failed — restored previous version at `$LOCAL_ELEKTRA`. Run `/elektra-update` manually to retry."

### Step 5: Write marker + clear cache

```bash
mkdir -p ~/.elektra
echo "$OLD_VERSION" > ~/.elektra/just-upgraded-from
rm -f ~/.elektra/last-update-check
rm -f ~/.elektra/update-snoozed
```

### Step 6: Show What's New

Read `$INSTALL_DIR/CHANGELOG.md`. Find all version entries between the old version and the new version. Summarize as 5-7 bullets grouped by theme. Focus on user-facing changes. Skip internal refactors unless significant.

Format:
```
Elektra Skills v{new} — upgraded from v{old}!

What's new:
- [bullet 1]
- [bullet 2]
- ...

Ready to execute.
```

### Step 7: Continue

After showing What's New, continue with whatever the user originally invoked. The upgrade is done.

---

## Standalone usage

When invoked directly as `/elektra-update` (not from session-init):

1. Force a fresh update check (bypass cache):
```bash
_ELEKTRA_DIR="${ELEKTRA_DIR:-$(cd "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")/.." 2>/dev/null && pwd || echo "$HOME/.claude/skills/elektra-skills")}"
"$_ELEKTRA_DIR/bin/elektra-update-check" --force 2>/dev/null || true
```
Use the output to determine if an upgrade is available.

2. If `UPGRADE_AVAILABLE <old> <new>`: follow Steps 2-6 above.

3. If no output (primary is up to date): check for a stale local vendored copy.

Run the Step 2 bash block above to detect the primary install type and directory (`INSTALL_TYPE` and `INSTALL_DIR`). Then run the Step 4.5 detection bash block above to check for a local vendored copy (`LOCAL_ELEKTRA`).

**If `LOCAL_ELEKTRA` is empty** (no local vendored copy): tell the user "You're already on the latest version (v{version}). No local vendored copy to sync."

**If `LOCAL_ELEKTRA` is non-empty**, compare versions:
```bash
PRIMARY_VER=$(cat "$INSTALL_DIR/VERSION" 2>/dev/null || echo "unknown")
LOCAL_VER=$(cat "$LOCAL_ELEKTRA/VERSION" 2>/dev/null || echo "unknown")
echo "PRIMARY=$PRIMARY_VER LOCAL=$LOCAL_VER"
```

**If versions differ:** follow the Step 4.5 sync bash block above to update the local copy from the primary. Tell user: "Global v{PRIMARY_VER} is up to date. Updated local vendored copy from v{LOCAL_VER} → v{PRIMARY_VER}. Commit `.claude/skills/elektra-skills/` when you're ready."

**If versions match:** tell the user "You're on the latest version (v{PRIMARY_VER}). Global and local vendored copy are both up to date."
