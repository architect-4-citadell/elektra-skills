[![GitHub stars](https://img.shields.io/github/stars/architect-4-citadell/elektra-skills?style=flat-square&logo=github)](https://github.com/architect-4-citadell/elektra-skills)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![skills.sh](https://img.shields.io/badge/skills.sh-listed-blue?style=flat-square)](https://skills.sh)
[![Compatible](https://img.shields.io/badge/agents-30%2B%20compatible-green?style=flat-square)](https://agentskills.io)

# Elektra Skills

**Responsible AI engineering and execution automation for AI coding agents.**

A delivery-focused `CLAUDE.md` persona with governance hooks, RAI gates, and a 12-phase execution engine.

Built across 66+ production sessions. 200+ PRs. Zero silent failures.

> *"Every skill is scar tissue turned into protocol."*

---

## What is Elektra?

Elektra is a **delivery-focused AI persona** defined in `CLAUDE.md` — a set of `.claude/` files that govern how your AI coding agent builds software.

After install, your project gets:

```
your-project/
├── CLAUDE.md                    # Elektra persona + coding standards
├── .claude/
│   ├── settings.json            # Hook registry + enabled plugins
│   ├── hooks/
│   │   ├── session-init.sh      # Session lifecycle tracking
│   │   ├── cycle-guard.sh       # Plan → Build → Test → Review → Ship
│   │   ├── token-cap-guard.sh   # Context window warnings (140K/170K/190K)
│   │   ├── rai-check.sh         # RAI guardrail on sensitive file edits
│   │   └── quality-gate.sh      # Async lint + format checks
│   └── skills/
│       ├── standard-orders/     # 12-phase execution engine
│       ├── responsible-ai/      # 7-pillar RAI governance
│       ├── autoresearch/        # Autonomous iteration loop
│       ├── godspeed/            # Direct entry to execution
│       ├── godspeed-resume/     # Cross-session phase resume
│       └── project-mgmt/       # GitHub-powered PM routine
```

**How hooks work:** Shell scripts fire automatically on session start, before/after every edit, and at RAI gates — enforcing the workflow without manual invocation.

---

## Install

```bash
npx skills add architect-4-citadell/elektra-skills
```

Works with Claude Code, Cursor, Windsurf, GitHub Copilot, Cline, Roo Code, Aider, Codex, and [30+ more agents](https://agentskills.io).

---

## Use Cases

### Ship a feature across multiple sessions

```
/SO-godspeed
```

Runs a 12-phase execution engine: Context → Review → Plan → Execute → QA → Code Review → Accept → Ship. Hooks enforce the sequence — you can't skip QA. Cross-session? `/SO-godspeed-resume` auto-detects where you left off by reading git status, branch, commits, and plan checkboxes.

### Prevent AI hallucinations in generated documents

```
/responsible-ai
```

7-pillar governance framework: LLMs NEVER compute financial figures (deterministic computation only). Citations are mandatory. Confidence scores are surfaced. Every fallback is logged. No silent bypasses.

### Autonomous bug hunting and iteration

```
/autoresearch:debug
```

Inspired by [Karpathy's autoresearch](https://github.com/karpathy/autoresearch). Core loop: Modify → Verify → Keep/Discard → Repeat. Bounded or unbounded. Subcommands for security audits (`/autoresearch:security`), shipping (`/autoresearch:ship`), and iterative error repair (`/autoresearch:fix`).

### Resume after a crash or context limit

```
/SO-godspeed-resume
```

Self-healing phase resume. Reads 8 signals in parallel (git status, branch, commits, diff, plan checkboxes, session state, PR status). If confident — resumes immediately with a diagnosis. If ambiguous — presents options and asks.

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

## Built On

Elektra Skills stands on the shoulders of these ecosystems and tools. Credit where it's due.

| Name | Role | Source |
|------|------|--------|
| **[gstack](https://skills.sh/garrytan/gstack)** | Governor Stack — structured AI agent workflow governance | [skills.sh](https://skills.sh/garrytan/gstack) |
| **[superpowers](https://skills.sh/obra)** | AI agent composition, planning, and code review skills | [skills.sh](https://skills.sh/obra) |
| **[document-skills](https://skills.sh)** | Document and code skills (PDF, DOCX, PPTX, XLSX) | [skills.sh](https://skills.sh) |
| **[ui-ux-pro-max](https://skills.sh)** | 50+ styles, 161 color palettes, 99 UX guidelines | [skills.sh](https://skills.sh) |
| **[everything-claude-code](https://github.com/affaan-m/everything-claude-code)** | Claude Code meta-skills — 100+ skills, agents, and hooks | [GitHub](https://github.com/affaan-m/everything-claude-code) |
| **[autoresearch (Karpathy)](https://github.com/karpathy/autoresearch)** | Autonomous iteration loop — the original inspiration | [GitHub](https://github.com/karpathy/autoresearch) |
| **[skills.sh](https://skills.sh)** | Open agent skills ecosystem — discovery + distribution | [Site](https://skills.sh) |
| **[Agent Skills Specification](https://agentskills.io)** | The format standard these skills follow | [Spec](https://agentskills.io/specification) |

---

## Why These Exist

We built these skills to govern how our AI agent builds production software. Over 66+ sessions and 200+ PRs, we learned:

1. **AI writes code. Nobody reviews the AI.** → `responsible-ai` enforces a 7-pillar checklist before any merge.
2. **Tests pass but the feature was never wired up.** → `standard-orders` ensures every feature goes through 12 phases from context to ship.
3. **Silent failures are the most dangerous.** → Every fallback is logged. Every confidence score is surfaced. Every gate blocks on failure.

These aren't theoretical frameworks. They're protocols born from real production bugs, near-misses, and "never again" moments.

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

- [Citadel Agentic Labs](https://citadellabs.ai) — The team behind these skills
- [Experiment 002 Landing Page](https://citadellabs.ai/experiments/agent-skills) — Full showcase
- [skills.sh](https://skills.sh) — The open agent skills ecosystem
- [Agent Skills Specification](https://agentskills.io/specification) — The format these skills follow

---

<p align="center">
  <sub>Built by <a href="https://citadellabs.ai">Citadel Agentic Labs</a></sub>
</p>
