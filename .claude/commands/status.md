---
name: status
description: Write or update this city's STATUS.md for Gigi (CaL-HQ overseer) to read.
---

You are a Conductor city Claude. Your overseer (Gigi, in `project-e/puebla`) reads each city's `.context/status.md` during morning-ops to brief Ali.

## Your job right now

Update (or create) `.context/status.md` in this workspace's root with the **current** state of your work. Be honest — Gigi uses this file to give Ali an accurate read.

## Schema (mandatory)

```yaml
---
city: <city-name>
workspace: <workspace-name>  # zypher-os-v1 | ibkr-trading | elektra-skills
branch: <current-git-branch>
updated_at: <ISO-8601 UTC, e.g. 2026-05-12T18:30:00Z>
session_phase: init | plan | implement | test | review | done
---

## Goal
One sentence — what is this city working toward right now? Example:
"Ship v1r3 Context Library LOCK PR with Sonnet 4.6 model-pin."

## Last progress
2-3 bullets. What shipped or moved since the last status update.

## Blockers
What is blocking forward motion. Categorize as `technical:`, `decision-needed:`, or `waiting-on-ali:`.
Empty list if nothing is blocking.

## Next action
The single concrete next step. State the owner explicitly: `[city]` or `[ali]`.

## Ali blocked on
What Ali specifically needs to do to unblock this city. Use this when Gigi should surface it as a Top-3 decision. Empty if Ali isn't in the critical path.
```

## Rules

- **Concrete, not aspirational.** "Tests run, 2 failing" beats "almost done."
- **No prose walls.** Bullets ≤ 2 sentences each.
- **Be honest about session-restarts.** If you re-init'd with 0 tool calls, say so: it tells Gigi "Ali was offline," not "branch dead."
- **Timezone-stamp in UTC.** Gigi normalizes to ET for Ali.
- **Don't invent.** If you don't know branch state, run `git rev-parse --abbrev-ref HEAD` first.

## When to write this file

- End of every working session (before you close).
- After any major commit or PR.
- When you discover a blocker that needs Ali's eyes.

## Where it goes

Write to `.context/status.md` relative to this workspace root. Gigi reads from there.
