[![GitHub stars](https://img.shields.io/github/stars/architect-4-citadell/elektra-skills?style=flat-square&logo=github)](https://github.com/architect-4-citadell/elektra-skills)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![skills.sh](https://img.shields.io/badge/skills.sh-listed-blue?style=flat-square)](https://skills.sh)
[![Compatible](https://img.shields.io/badge/agents-30%2B%20compatible-green?style=flat-square)](https://agentskills.io)

# Elektra Skills

**Governance skills for AI coding agents.**

Built across 66+ production sessions. 200+ PRs. Zero silent failures.

> *"Every skill is scar tissue turned into protocol."*

---

## Install

```bash
npx skills add architect-4-citadell/elektra-skills
```

Works with Claude Code, Cursor, Windsurf, GitHub Copilot, Cline, Roo Code, Aider, Codex, and [30+ more agents](https://agentskills.io).

---

## Skills

### responsible-ai

7-pillar AI governance framework for any project shipping AI-generated output.

| Pillar | What It Prevents |
|--------|-----------------|
| Data Isolation | Cross-user data leakage in multi-tenant systems |
| PII Protection | Personal data exposure in LLM calls and logs |
| Citation Integrity | Unverifiable claims in generated documents |
| Confidence Scoring | Low-confidence content presented as fact |
| Hallucination Prevention | LLMs making up numbers, dates, or sources |
| Bias Mitigation | Single-source or demographically biased output |
| Content Provenance | Users unable to distinguish AI from human content |

**Critical rule:** *"LLMs should NEVER compute financial figures. Use deterministic computation."*

### standard-orders

Standing Orders protocol — a meta-framework for Human + AI Agent collaboration. Classify intent, dispatch to the right execution engine, enforce quality gates.

Three Standing Orders:
- **SO1: Godspeed** — 12-phase idea-to-ship execution (P0 Context → P1 Review → P2 Eng → P3 Plan → P4 Execute → P5 Review → P6 Accept → P7 Ship → P8 Close)
- **SO2: Project Management** — GitHub-powered pre/post session PM routine
- **SO3: Quality Delivery** — Customizable brand + design + QA gate

### godspeed

Direct entry to the 12-phase execution engine. Start any feature, bug fix, or initiative with structured phases and review gates.

### godspeed-resume

Self-healing phase resume with automatic detection. Reads git status, branch, commits, plan checkboxes, and PR status to determine where you left off — or asks if ambiguous.

### project-mgmt

Standalone GitHub project management. Check issues, PRs, plan progress. Runs automatically at session start/end, or on demand.

### autoresearch

Autonomous goal-directed iteration. Inspired by [Karpathy's autoresearch](https://github.com/karpathy/autoresearch).

**Core loop:** Modify → Verify → Keep/Discard → Repeat.

Subcommands:
- `/autoresearch` — Autonomous improvement loop (bounded or unbounded)
- `/autoresearch:plan` — Interactive wizard to build scope, metric, and verify command
- `/autoresearch:security` — STRIDE + OWASP Top 10 autonomous security audit
- `/autoresearch:ship` — Universal 8-phase shipping workflow
- `/autoresearch:debug` — Autonomous bug-hunting loop
- `/autoresearch:fix` — Iterative error repair until zero remain

---

## Why These Exist

We built these skills to govern how our AI agent builds production software. Over 66+ sessions and 200+ PRs, we learned:

1. **AI writes code. Nobody reviews the AI.** → `responsible-ai` enforces a 7-pillar checklist before any merge.
2. **Tests pass but the feature was never wired up.** → `standard-orders` ensures every feature goes through 12 phases from context to ship.
3. **Silent failures are the most dangerous.** → Every fallback is logged. Every confidence score is surfaced. Every gate blocks on failure.

These aren't theoretical frameworks. They're protocols born from real production bugs, near-misses, and "never again" moments.

---

## How It Works

```
You bring an idea, bug, or feature request
                    │
         ┌──────────▼──────────┐
         │   CLASSIFY INTENT    │  What kind of work is this?
         └──────────┬──────────┘
                    │
    ┌───────┬───────┴───────┐
    │       │               │
    ▼       ▼               ▼
   SO1     SO2             SO3
Godspeed  Project Mgmt   Quality Gate

SO1: 12 Phases
P0 Context → P1 Review → P2 Eng Review →
P3 Plan → P4 Execute → P4.5 QA →
P5 Code Review → P6 Acceptance → P7 Ship → P8 Close
```

---

## Compatibility

These skills follow the [Agent Skills specification](https://agentskills.io/specification) and work with any compatible agent:

| Agent | Status |
|-------|--------|
| Claude Code | Tested |
| Cursor | Compatible |
| Windsurf | Compatible |
| GitHub Copilot | Compatible |
| Cline | Compatible |
| Roo Code | Compatible |
| Aider | Compatible |
| Codex | Compatible |

---

## License

**CC BY-NC-SA 4.0** — Free for individuals and non-commercial projects.

Building a commercial product with these skills? See [COMMERCIAL_LICENSE.md](./COMMERCIAL_LICENSE.md) or email licensing@citadellabs.ai.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Every contribution must solve a real problem — not a theoretical one.

---

## Links

- [Citadel Labs](https://citadellabs.ai) — The team behind these skills
- [skills.sh](https://skills.sh) — The open agent skills ecosystem
- [Agent Skills Specification](https://agentskills.io/specification) — The format these skills follow

---

<p align="center">
  <sub>Built by <a href="https://citadellabs.ai">Citadel Labs</a></sub>
</p>
