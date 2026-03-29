---
name: godspeed-resume
version: 1.1.0
description: "Self-healing Godspeed resume -- auto-detects phase from git/plan/commits, resumes or asks. Use when continuing from a previous session or recovering from a crash."
license: CC BY-NC-SA 4.0
compatibility: "Claude Code, Cursor, Gemini CLI, Codex, Windsurf, GitHub Copilot, and 30+ compatible agents"
metadata:
  author: citadel-labs
---

# /godspeed-resume -- Self-Healing Godspeed Resume

Resume **Standing Order 1** with automatic phase detection. Reads all available signals to determine where to pick up -- or asks if ambiguous.

## Usage

```
/godspeed-resume           # Auto-detect phase and resume (or ask)
/godspeed-resume P4        # Force resume at execute loop (skip detection)
```

## Self-Healing Protocol

When invoked **without** an explicit phase arg, run the diagnostic sequence below. When invoked **with** a phase arg (e.g., `P4`), skip detection and jump directly to Step 4.

### Step 1: Gather Signals

Run ALL of the following in parallel to build a diagnostic picture:

| Signal | How to Read | What It Reveals |
|--------|-------------|-----------------|
| **Git status** | `git status` | Uncommitted WIP? Staged changes? Clean? |
| **Git branch** | `git branch --show-current` | Feature branch name -> linked to plan? |
| **Recent commits** | `git log --oneline -10` | `[WIP]` markers? Phase references? Last commit message? |
| **Diff against main** | `git diff origin/main --stat` | Scope of work already done |
| **Active plans** | `ls docs/plans/*.md` (exclude completed/) | Which plan is active? |
| **Plan checkboxes** | Read active plan, count `- [x]` vs `- [ ]` | How far through execution? |
| **Session state** | Read `.context/.session-state.json` (if exists) | Last known phase (may be stale -- resets per session) |
| **PR status** | `gh pr list --state open --head $(git branch --show-current)` | PR already created? CI status? |

### Step 2: Infer Phase

Use this decision tree to determine the most likely resume point:

```
PR exists and CI green?
  -> P7b (merge gate -- waiting for user approval)

PR exists and CI failing?
  -> P5 (fix CI issues, then re-review)

PR exists, no CI issues, review comments pending?
  -> P5 (address review feedback)

All plan checkboxes checked, no PR?
  -> P4.5 (UAT/QA -- code done, needs validation)

Some plan checkboxes checked, some pending?
  -> P4 (execute loop -- continue from next unchecked chunk)

Plan exists but zero checkboxes checked?
  -> P4 (execute loop -- start first chunk)

Plan exists as file but has no chunks/tasks?
  -> P3 (plan writing -- plan is incomplete)

No plan file found, but branch has commits with decisions?
  -> P2 (eng review -- decisions made but no plan written)

No plan file, no decision commits, clean branch?
  -> P1 (CEO review -- start fresh, but on existing branch)

Uncommitted WIP detected?
  -> HEAL: commit WIP first, then infer phase from above

No branch, no plan, no commits?
  -> Redirect to /godspeed (fresh start, not a resume)
```

### Step 3: Present Diagnosis

**If confident (single clear signal):** Present the diagnosis and resume immediately.

Format:
```
**[RESUME] Phase detected: P4 (Execute Loop)**

Signals:
- Branch: `feat/studio-3phase`
- Plan: `docs/plans/2026-03-16-studio-3phase.md` -- 3/7 chunks done
- Last commit: `feat: implement phase 1 planning view`
- Git status: clean

Resuming at P4 -- next chunk is Chunk 4.
```

**If ambiguous (conflicting signals):** Ask the user explicitly.

Format:
```
**[RESUME] Multiple phases possible -- need your call.**

Signals:
- Branch: `feat/studio-3phase`
- Plan: 7/7 chunks checked
- But: no PR found, no UAT evidence in commits
- Git status: clean

Options:
  (A) P4.5 -- Run UAT/QA (code done, no validation evidence)
  (B) P5 -- Skip to review (assume UAT passed in prior session)
  (C) P7 -- Skip to ship (assume everything passed)

Which phase?
```

### Step 4: Execute Resume

Once phase is determined (auto or user-chosen):

1. **Load context (abbreviated P0):**
   - Read MEMORY.md + relevant memory files (max 3)
   - Read the active plan doc
   - If uncommitted WIP found in Step 1: commit it now with `[WIP] godspeed resume -- auto-heal`
2. **Skip to target phase** -- Follow [SO1-godspeed.md](../standard-orders/orders/SO1-godspeed.md) starting from that phase
3. **Continue normally** through remaining phases

## Self-Healing Actions

These are taken automatically when issues are detected during Step 1:

| Issue Detected | Auto-Heal Action |
|----------------|------------------|
| Uncommitted changes | `git add` + `git commit -m "[WIP] godspeed resume -- auto-heal"` |
| Unstaged new files | List them, ask user: commit or discard? |
| Plan doc has no checkboxes | Treat as P3 incomplete -- resume plan writing |
| Branch diverged from main | `git fetch origin main` -- note divergence, don't auto-merge |
| `.context/.session-state.json` missing | Normal for new session -- rely on git/plan signals instead |
| Multiple active plans found | Ask user which plan to resume |

## References

- [SO1-godspeed.md](../standard-orders/orders/SO1-godspeed.md)
- [phases.md](../standard-orders/references/phases.md)
- [memory-protocol.md](../standard-orders/references/memory-protocol.md)

## Related Commands

| Command | Purpose |
|---------|---------|
| `/godspeed` | Start fresh from P0 |
| `/project-mgmt` | GitHub project management |
| `/SO-quality` | Quality gate |
