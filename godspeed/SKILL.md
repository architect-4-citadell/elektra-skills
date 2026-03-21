---
name: godspeed
version: 1.0.0
description: "SO1 Godspeed -- 12-phase idea-to-ship execution engine. Triggers on \"godspeed\", \"plan and execute\", \"let's build\", \"fix this\", or any work initiation requiring full cycle execution."
license: CC BY-NC-SA 4.0
metadata:
  author: citadel-labs
---

# /godspeed -- Godspeed Execution

Direct entry to **Standing Order 1** -- the 12-phase idea-to-ship execution engine.

## What This Does

Starts the full Godspeed cycle from P0 (Context Load):

```
P0 Context -> P1 CEO Review -> P2 Eng Review -> P2.5 RAI ->
P3 Plan -> P4 Execute -> P4.5 UAT/QA -> P5 Review ->
P5.5 RAI Audit -> P6 CEO Accept -> P7 Ship -> P8 Close
```

## Protocol

1. **Load context** -- Read and follow the Standard Orders protocol: [SKILL.md](../standard-orders/SKILL.md)
2. **Execute SO1** -- Read and follow: [SO1-godspeed.md](../standard-orders/orders/SO1-godspeed.md)
3. **Phase checklists** -- Reference: [phases.md](../standard-orders/references/phases.md)
4. **RAI gates** -- Reference: [rai-gates.md](../standard-orders/references/rai-gates.md)
5. **Memory protocol** -- Reference: [memory-protocol.md](../standard-orders/references/memory-protocol.md)

## Start Point

**P0: Context Load.** Begin by loading memory, git state, plan state, and skills.

## Related Commands

| Command | Purpose |
|---------|---------|
| `/godspeed-resume` | Resume mid-session at a specific phase |
| `/project-mgmt` | GitHub project management (runs automatically at P0/P8) |
| `/SO-quality` | Quality gate (runs automatically at P4.5/P5) |
| `/standard-orders` | Meta-protocol -- classify intent and dispatch |
