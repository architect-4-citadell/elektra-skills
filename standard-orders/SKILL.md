---
name: standard-orders
version: 4.1.1
description: "Operating protocol -- single entry point for all Human + AI Agent collaboration. Three Standing Orders: SO1 Godspeed (idea-to-ship), SO2 Project Management (GitHub PM), SO3 Quality Delivery (quality gate). Triggers on session start, \"godspeed\", \"standard orders\", \"plan and execute\", \"let's build\", \"fix this\"."
license: CC BY-NC-SA 4.0
metadata:
  author: citadel-labs
---

# Standard Orders -- Operating Protocol

The operating protocol for how Human and AI Agent work together. One protocol, one entry point, one workflow.

**Purpose:** AI delivery governance for every session. All work flows through Standing Orders.

```
 User brings idea / bug / feature / "godspeed"
                    |
         +----------v----------+
         |     RECEIVE          |  Parse intent, load context
         +----------+----------+
                    |
         +----------v----------+
         |     CLASSIFY         |  Which Standing Order applies?
         +----------+----------+
                    |
    +-------+-------+-------+
    |       |               |
    v       v               v
   SO1     SO2             SO3
Godspeed  Project Mgmt   Quality Delivery
```

## The Contract

| Role | Human | AI Agent |
|------|-------|----------|
| **Decides** | WHAT and WHY | HOW and executes |
| **Approves** | Review gates, ship decisions | Self-reviews at checkpoints |
| **Blocks** | Can reject at P6 (acceptance) | Can block on RAI violation |
| **Learns** | Provides feedback, corrections | Captures to memory system |

## Standing Orders

### SO1: Godspeed -- Idea-to-Ship Execution

The 12-phase execution engine. Invoked for any feature work, bug fix, or multi-session initiative.

**Trigger:** "godspeed", "plan and execute", "full cycle", "multi-session", "batch execute", UAT report, feature request, bug batch.

**Phases:** P0 (Context) -> P1 (CEO) -> P2 (Eng) -> P2.5 (RAI) -> P3 (Plan) -> P4 (Execute) -> P4.5 (UAT/QA) -> P5 (Review) -> P5.5 (RAI Audit) -> P6 (CEO Accept) -> P7 (Ship) -> P8 (Close)

**Detail:** See [orders/SO1-godspeed.md](orders/SO1-godspeed.md)

### SO2: Project Management -- GitHub PM Routine

Pre/post session GitHub issue, plan, and PR lifecycle management. Runs automatically at P0 (pre) and P8 (post) of any SO1 execution.

**Trigger:** Session start, session end, "check issues", "update plan", "project status".

**Detail:** See [orders/SO2-project-mgmt.md](orders/SO2-project-mgmt.md)

### SO3: Quality Delivery -- Front-to-Back Quality Gate

Ensures every deliverable meets quality standards. Customize the checklist for your project's brand, design system, and quality bar.

**Trigger:** Automatically during P4.5 (UAT/QA) and P5 (Review) for any work touching frontend or document output. Also invoked explicitly for design reviews.

**Detail:** See [orders/SO3-quality-delivery.md](orders/SO3-quality-delivery.md)

## Invocation

```
/standard-orders              # Start fresh -- classify intent, dispatch SO
/SO-godspeed                  # Direct to SO1 (12-phase execution)
/SO-godspeed-resume P4        # Resume SO1 at a specific phase
/SO-pm                        # Direct to SO2 (GitHub PM)
/SO-quality                   # Direct to SO3 (quality gate)
```

## Context Loading (P0 -- runs for every SO)

1. **Memory** -- Read `MEMORY.md` (auto-loaded). Scan index for relevant memory files based on session topic. Read up to 3 relevant files.
2. **Git state** -- Branch, status, recent commits, diff against main.
3. **Plan state** -- Check your project's `docs/plans/` for active plans and any session tracking document.
4. **Skill loading** -- Domain-classify the work, load matching skills per your project's domain-to-skill map.
5. **SO2 pre-session** -- Check GitHub issues, PR status, open blockers.

## Session Boundary Rules

Token cap (configurable) enforces session budget:
- **Yellow (~70% capacity):** Finish current task, plan exit
- **Red (~85% capacity):** No new chunks, commit what's done
- **Critical (~95% capacity):** Commit NOW, tell user to resume

At EVERY phase transition, check context budget. If in red/critical zone:
```
"Session cap approaching. Phase N complete. Resume: /SO-godspeed-resume P{N+1}"
```

## Memory Protocol

See [references/memory-protocol.md](references/memory-protocol.md) for the full protocol.

**On P0 (load):** Read MEMORY.md + relevant topic files.
**During execution:** Save feedback immediately, save decisions with absolute dates.
**On P8 (close):** Review session for memorable patterns, update or create memory files.

## What This Replaces

| Legacy | Replaced By |
|--------|-------------|
| `/session-start` | SO1 P0 (Context Load) + SO2 (pre-session PM) |
| `/session-close` | SO1 P8 (Close) + SO2 (post-session PM) |
| `/godspeed` | SO1 (Godspeed -- 12 phases, enhanced) |
