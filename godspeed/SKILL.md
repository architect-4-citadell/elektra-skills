---
name: godspeed
version: 1.0.0
description: "SO1 Godspeed -- 12-phase idea-to-ship execution engine. Triggers on \"godspeed\", \"plan and execute\", \"let's build\", \"fix this\", or any work initiation requiring full cycle execution."
license: CC BY-NC-SA 4.0
compatibility: "Claude Code, Cursor, Gemini CLI, Codex, Windsurf, GitHub Copilot, and 30+ compatible agents"
metadata:
  author: citadel-labs
---

# /godspeed -- Godspeed Execution

Direct entry to **Standing Order 1** -- the 12-phase idea-to-ship execution engine.

## What This Does

Starts the full Godspeed cycle from P0 (Context Load):

```
P0 Context -> P1 CEO Review -> P2 Eng Review -> P2.5 RAI ->
P3 Plan -> P3.5 Plan Review (architecture + design) -> P4 Execute -> P4.5 UAT/QA/Design ->
P5 Review -> P5.5 RAI Audit -> P6 CEO Accept -> P7 Ship -> P8 Close
```

## Protocol

1. **Load context** -- Read and follow the Standard Orders protocol: [SKILL.md](../standard-orders/SKILL.md)
2. **Execute SO1** -- Read and follow: [SO1-godspeed.md](../standard-orders/orders/SO1-godspeed.md)
3. **Phase checklists** -- Reference: [phases.md](../standard-orders/references/phases.md)
4. **RAI gates** -- Reference: [rai-gates.md](../standard-orders/references/rai-gates.md)
5. **Memory protocol** -- Reference: [memory-protocol.md](../standard-orders/references/memory-protocol.md)

## Start Point

**P0: Context Load.** Begin by loading memory, git state, plan state, and skills.

## Pre/Post Execution Review Gates

Godspeed includes two review gates powered by companion skills:

### Pre-Execution: P3.5 Plan Review

After the plan is written (P3), review it before writing code:
- **Large scope:** Invoke `/plan-ceo-review` (gstack) -- 10-section architecture review
- **Standard scope:** Invoke `/plan-eng-review` (gstack) -- 4-section engineering review
- **Frontend in scope:** Invoke `/plan-design-review` (gstack) for UI/UX gap analysis + `/ui-ux-pro-max` for design decisions
- **Small fix:** Skip P3.5

### Post-Execution: P4.5 UAT + QA + Design Review

After code is written (P4), validate before code review:
- **Functional:** Invoke `/qa` (gstack) for systematic browser-based QA testing
- **Visual QA:** Invoke `/design-review` (gstack) for live site design polish — spacing, hierarchy, AI slop patterns
- **Design Audit:** Invoke `/ui-ux-pro-max` for 10-priority design audit (accessibility through charts)
- **Brand:** Invoke `/SO-quality` for brand voice and content quality gate

## Related Commands

| Command | Purpose |
|---------|---------|
| `/godspeed-resume` | Resume mid-session at a specific phase |
| `/project-mgmt` | GitHub project management (runs automatically at P0/P8) |
| `/SO-quality` | Quality gate (runs automatically at P4.5/P5) |
| `/plan-ceo-review` | CEO-mode plan review (gstack, runs at P3.5) |
| `/plan-eng-review` | Eng-mode plan review (gstack, runs at P3.5) |
| `/plan-design-review` | UI/UX gap analysis (gstack, runs at P3.5) |
| `/ui-ux-pro-max` | 10-priority design audit (P3.5 + P4.5) |
| `/qa` | Systematic QA testing (gstack, runs at P4.5) |
| `/review` | Pre-landing code review (gstack, runs at P5) |
| `/standard-orders` | Meta-protocol -- classify intent and dispatch |
