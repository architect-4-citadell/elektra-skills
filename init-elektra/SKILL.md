---
name: init-elektra
version: 1.0.0
description: "Run or re-run Elektra onboarding. Executes First Session Protocol (project discovery + user onboarding + memory init). Use on first install or to reset onboarding."
license: CC BY-NC-SA 4.0
compatibility: "Claude Code, Cursor, Gemini CLI, Codex, Windsurf, GitHub Copilot, and 30+ compatible agents"
metadata:
  author: citadel-labs
---

# /init-elektra

Run or re-run Elektra's First Session Protocol.

## When to use

- First session in a new project (runs automatically via session-init hook)
- User wants to re-onboard: changed role, new team member, different project context
- Reset after cloning into a new machine or workspace

## Behavior

### Mode detection

Check for existing onboarding state:

```
if MEMORY.md exists AND contains user_profile:
  MODE = "reset"
else:
  MODE = "fresh"
```

### Fresh mode (no prior onboarding)

Run the full First Session Protocol from CLAUDE.md:

1. **Phase A: Self-Onboard** -- read README, package.json/pyproject.toml, git history, directory structure. Save to `project_discovery.md`.
2. **Phase B: Onboard User** -- ask all questions in TWO batched prompts (role, experience band, team context, current work, git workflow, testing philosophy, deployment target). Save to `user_profile.md`.
3. **Phase C: Initialize Memory** -- create MEMORY.md with index entries.
4. **Phase D: Configure Standing Orders** -- adapt behavior based on discovered context.
5. **Phase E: Dispatch** -- classify user's current task and route to the right Standing Order.

### Reset mode (re-onboarding)

1. Inform the user that existing onboarding data was found.
2. Ask: **"Re-run full onboarding (project + user), or just update your user profile?"**
   - **Full reset**: archive existing `project_discovery.md` and `user_profile.md` (rename with `_prev_YYYYMMDD_HHMMSS` timestamp suffix), then run Phases A-E.
   - **Profile only**: archive `user_profile.md` (timestamp suffix), re-run Phase B only, update MEMORY.md index.
3. After re-onboarding completes, confirm the new register (S1-S4) and announce readiness.

## Rules

- Never delete memory files outright -- archive with `_prev_YYYYMMDD_HHMMSS` timestamp suffix so nothing is lost.
- Always run Phase A before Phase B in full reset -- project context informs which Phase B questions to skip.
- Batch all onboarding questions in TWO prompts, never one-by-one.
- After completing onboarding, announce: `[ELEKTRA] Onboarding complete. Register: {band}. Ready.`
