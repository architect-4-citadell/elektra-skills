[![GitHub stars](https://img.shields.io/github/stars/architect-4-citadell/elektra-skills?style=flat-square&logo=github)](https://github.com/architect-4-citadell/elektra-skills)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg?style=flat-square)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![skills.sh](https://img.shields.io/badge/skills.sh-listed-blue?style=flat-square)](https://skills.sh)
[![Compatible](https://img.shields.io/badge/agents-30%2B%20compatible-green?style=flat-square)](https://agentskills.io)

# Elektra Skills

**A Solutions Architect AI for your codebase.**

Install once. Elektra onboards herself to your project, onboards you, then governs every session with structured execution, RAI gates, and self-healing workflows.

Built across 66+ production sessions. 200+ PRs. Zero silent failures.

> *"Every skill is scar tissue turned into protocol."*

---

## What Happens When You Install

```bash
npx skills add architect-4-citadell/elektra-skills
```

Your project gets a Solutions Architect that:

1. **Self-onboards** -- reads your README, package config, git history, CI setup. Learns your stack in 60 seconds.
2. **Onboards you** -- asks your role, experience, team context, current task. Adapts register (Coach / Peer / Advisor / Chief of Staff).
3. **Checks dependencies** -- reports missing companion skills, gives you install commands.
4. **Configures itself** -- enables RAI gates if you touch AI/ML code, TDD if no tests exist, quality gates for frontend work.
5. **Dispatches** -- routes your first task to the right Standing Order and starts executing.

Every session after that: loads your profile, checks git state, announces status, picks up where you left off.

---

## What You Get

```
your-project/
├── CLAUDE.md                        # Elektra persona + governance protocol
├── .claude/
│   ├── settings.json                # 5 hooks across 3 lifecycle points
│   └── hooks/
│       ├── session-init.sh          # Onboarding detection + dependency check
│       ├── cycle-guard.sh           # Plan → Build → Test → Review → Ship
│       ├── token-cap-guard.sh       # Context budget warnings (70/85/95%)
│       ├── rai-check.sh             # RAI guardrail on sensitive file edits
│       └── quality-gate.sh          # Async lint + format + TODO checks
└── skills/
    ├── standard-orders/             # 3 Standing Orders (meta-framework)
    ├── responsible-ai/              # 7-pillar RAI governance
    ├── autoresearch/                # Autonomous iteration loop
    ├── godspeed/                    # 12-phase execution engine
    ├── godspeed-resume/             # Cross-session self-healing resume
    └── project-mgmt/               # GitHub-powered PM routine
```

**Hooks fire automatically.** No manual invocation. Edit an LLM pipeline file? RAI check triggers. 3 edits without a plan? Cycle guard warns. Approaching context limit? Token cap tells you to commit and resume.

---

## Quick Start

### 1. Install Elektra

```bash
npx skills add architect-4-citadell/elektra-skills
```

### 2. Install companion skills

```bash
npx skills add garrytan/gstack obra/superpowers thedotmack/claude-mem ui-ux-pro-max -g -y
```

| Skill | Required? | What It Adds |
|-------|-----------|-------------|
| **[gstack](https://skills.sh/garrytan/gstack)** | Required | QA, plan review, code review, browser testing, ship workflows |
| **[superpowers](https://skills.sh/obra)** | Required | Planning, code review, parallel agent dispatch |
| **[claude-mem](https://skills.sh/thedotmack/claude-mem)** | Recommended | Persistent memory search across sessions |
| **[ui-ux-pro-max](https://skills.sh)** | Recommended | 50+ styles, 161 palettes, 99 UX guidelines, design review |
| **[everything-claude-code](https://github.com/affaan-m/everything-claude-code)** | Optional | 100+ meta-skills (TDD, build resolution, code review agents) |

### 3. Start a session

Open your agent. Elektra detects the first session, onboards herself and you, then asks what you're working on.

### 4. (Optional) Pair with Conductor

For multi-agent orchestration, parallel execution, and cross-workspace coordination:

```bash
# https://docs.conductor.build/
```

Elektra auto-detects Conductor and enables peer communication, worktree isolation, and parallel chunk dispatch.

---

## Adaptive Persona

Elektra adapts to both the **work** and the **worker**.

### Modes (auto-detected from context)

| Mode | Trigger | Behavior |
|------|---------|----------|
| **Architect** | Coding, Infra, DB | Strict types, test-driven, self-healing |
| **Founder** | Planning, Product | ROI-focused, challenges scope creep |
| **Auditor** | Compliance, Security | Paranoid checking, halts on violations |
| **Reviewer** | "Review PR" | Code smells, DRY, harsh on tech debt |
| **QA Engineer** | "Test this" | E2E first, never assumes it works |
| **Shipper** | "Ship it" | Pre-ship validation, changelog, release readiness |

### Seniority (set during onboarding)

| Band | Experience | Register |
|------|-----------|----------|
| **S1 Coach** | 0-3 yrs | Explains why, teaches frameworks |
| **S2 Peer** | 3-8 yrs | Assumes competence, flags trade-offs |
| **S3 Advisor** | 8-15 yrs | Ultra-concise, depth on pull only |
| **S4 Chief of Staff** | 15+ yrs | Anticipates, every word earned |

Override anytime: *"Switch to S3."*

---

## Standing Orders

All work flows through Standing Orders. Say what you want, Elektra routes it.

| Command | What It Does |
|---------|-------------|
| `/godspeed` | 14-phase idea-to-ship: Context → Review → Plan → **Plan Review** (`/plan-design-review` + `/ui-ux-pro-max`) → Execute → **QA + Design Review** → Code Review → Accept → Ship |
| `/godspeed-resume` | Self-healing resume. Reads 8 signals, picks up where you left off |
| `/project-mgmt` | GitHub PM: issues, PRs, plan progress |
| `/responsible-ai` | 7-pillar RAI governance |
| `/autoresearch` | Autonomous iteration loop (Modify → Verify → Keep/Discard → Repeat) |
| `/autoresearch:security` | STRIDE + OWASP Top 10 audit |
| `/autoresearch:ship` | Universal 8-phase shipping workflow |
| `/autoresearch:debug` | Autonomous bug-hunting loop |
| `/autoresearch:fix` | Iterative error repair until zero remain |
| `/plan-ceo-review` | CEO-mode plan review -- architecture, security, 10 sections (gstack) |
| `/plan-eng-review` | Eng-mode plan review -- scope challenge, 4 sections (gstack) |
| `/plan-design-review` | UI/UX gap analysis -- interaction patterns, responsive strategy, design system (gstack) |
| `/design-review` | Live site visual QA -- spacing, hierarchy, AI slop detection, iterative fixes (gstack) |
| `/qa` | Systematic browser QA -- full/quick/regression modes (gstack) |
| `/review` | Pre-landing PR code review -- SQL safety, race conditions, LLM trust (gstack) |
| `/ui-ux-pro-max` | 10-priority design audit -- accessibility through data viz |

**Natural language works too:** "let's build", "fix this", "ship it", "check issues", "debug this", "review the plan", "design review" -- Elektra classifies intent and dispatches.

---

## Use Cases

### Ship a feature across multiple sessions

```
/godspeed
```

14-phase execution engine with hooks enforcing the sequence. Includes **P3.5 Plan Review** (architecture + design review before code) and **P4.5 Design Review** (10-priority UI audit after code). Cross-session? `/godspeed-resume` reads git status, branch, commits, plan checkboxes, and PR status to auto-detect where you left off.

### Prevent AI hallucinations in production

```
/responsible-ai
```

LLMs NEVER compute financial figures (deterministic computation only). Citations mandatory. Confidence scores surfaced. Every fallback logged. No silent bypasses.

### Autonomous bug hunting

```
/autoresearch:debug
```

Inspired by [Karpathy's autoresearch](https://github.com/karpathy/autoresearch). Core loop: Modify → Verify → Keep/Discard → Repeat. Bounded or unbounded. Works for security audits, shipping, and iterative error repair.

### Resume after a crash

```
/godspeed-resume
```

Reads 8 signals in parallel. If confident, resumes immediately with a diagnosis. If ambiguous, presents options and asks.

---

## Governance Hooks

Hooks fire automatically via `.claude/settings.json`. No manual invocation required.

| Hook | When | What It Does |
|------|------|-------------|
| **session-init** | Session start | Creates session state, detects first-run, checks companion skill dependencies |
| **cycle-guard** | Before Edit/Write/Bash | Enforces Plan → Build → Test → Review → Ship. Warns after 3+ edits without a plan |
| **token-cap-guard** | Before any tool | Context budget warnings at 70%, 85%, 95%. At critical: "Commit NOW. Resume: `/godspeed-resume`" |
| **rai-check** | Before Edit/Write | Detects RAI-sensitive file paths (LLM, auth, PII, financial). Injects 7-pillar checklist reminder |
| **quality-gate** | After Edit/Write | Async format checks, console.log detection, TODO/FIXME counter |

---

## Skills Reference

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

Three Standing Orders governing all Human + AI Agent collaboration:

- **SO1: Godspeed** -- 14-phase idea-to-ship (P0 Context → P1 Review → P2 Eng → P2.5 RAI → P3 Plan → **P3.5 Plan Review** → P4 Execute → **P4.5 QA + Design** → P5 Review → P5.5 RAI Audit → P6 Accept → P7 Ship → P8 Close)
- **SO2: Project Management** -- GitHub-powered pre/post session PM routine
- **SO3: Quality Delivery** -- Customizable brand + design + QA gate, integrated with `/ui-ux-pro-max`

### autoresearch

Autonomous goal-directed iteration. Inspired by [Karpathy's autoresearch](https://github.com/karpathy/autoresearch).

**Core loop:** Modify → Verify → Keep/Discard → Repeat.

Subcommands: `/autoresearch`, `/autoresearch:plan`, `/autoresearch:security`, `/autoresearch:ship`, `/autoresearch:debug`, `/autoresearch:fix`

### godspeed + godspeed-resume

Direct entry to the 12-phase execution engine + self-healing cross-session resume.

### project-mgmt

Standalone GitHub project management. Issues, PRs, plan progress. Runs at session start/end or on demand.

---

## Memory System

Elektra persists context across sessions using a file-based memory protocol:

```
MEMORY.md              # Index (auto-loaded every session)
user_profile.md        # Your role, seniority, preferences
project_discovery.md   # Stack, tooling, conventions
feedback_*.md          # Your corrections and guidance
project_*.md           # Architecture decisions with dates
```

Memory is created during onboarding and updated throughout sessions. Corrections are saved immediately. Architecture decisions include absolute dates and rationale.

Pair with **[claude-mem](https://skills.sh/thedotmack/claude-mem)** for search across memory files.

---

## Built On

| Name | Role |
|------|------|
| **[gstack](https://skills.sh/garrytan/gstack)** | Governor Stack -- structured AI agent workflow governance |
| **[superpowers](https://skills.sh/obra)** | AI agent composition, planning, and code review |
| **[claude-mem](https://skills.sh/thedotmack/claude-mem)** | Persistent memory search across sessions |
| **[ui-ux-pro-max](https://skills.sh)** | 50+ styles, 161 color palettes, 99 UX guidelines, design review |
| **[everything-claude-code](https://github.com/affaan-m/everything-claude-code)** | 100+ Claude Code meta-skills, agents, and hooks |
| **[autoresearch (Karpathy)](https://github.com/karpathy/autoresearch)** | Autonomous iteration loop -- the original inspiration |
| **[skills.sh](https://skills.sh)** | Open agent skills ecosystem -- discovery + distribution |
| **[Agent Skills Specification](https://agentskills.io)** | The format standard these skills follow |

---

## Why These Exist

We built these skills to govern how our AI agent builds production software. Over 66+ sessions and 200+ PRs, we learned:

1. **AI writes code. Nobody reviews the AI.** -- `responsible-ai` enforces a 7-pillar checklist before any merge.
2. **Tests pass but the feature was never wired up.** -- `standard-orders` ensures every feature goes through 12 phases from context to ship.
3. **Silent failures are the most dangerous.** -- Every fallback is logged. Every confidence score is surfaced. Every gate blocks on failure.

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

Best experience with [Conductor](https://docs.conductor.build/) for multi-agent orchestration.

---

## License

**CC BY-NC-SA 4.0** -- Free for individuals and non-commercial projects.

Building a commercial product with these skills? See [COMMERCIAL_LICENSE.md](./COMMERCIAL_LICENSE.md) or email licensing@citadellabs.ai.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Every contribution must solve a real problem -- not a theoretical one.

---

## Links

- [Citadel Agentic Labs](https://citadellabs.ai) -- The team behind Elektra
- [Experiment 002: Agent Skills](https://citadellabs.ai/experiments/agent-skills) -- Full showcase
- [Conductor](https://docs.conductor.build/) -- Multi-agent orchestration
- [skills.sh](https://skills.sh) -- Open agent skills ecosystem
- [Agent Skills Specification](https://agentskills.io/specification) -- The format standard

---

<p align="center">
  <sub>Built by <a href="https://citadellabs.ai">Citadel Agentic Labs</a></sub>
</p>
