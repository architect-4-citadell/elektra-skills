# Registry Distribution Guide

How to get Elektra Skills listed, discoverable, and installable across every major AI agent skill registry.

**Repo:** `architect-4-citadell/elektra-skills`
**Install:** `npx skills add architect-4-citadell/elektra-skills`
**Last updated:** 2026-03-28

---

## Tier 1: High-Impact Registries

### 1. skills.sh (Vercel)

| Field | Detail |
|-------|--------|
| **URL** | https://skills.sh/ |
| **CLI** | https://github.com/vercel-labs/skills |
| **How listing works** | **Telemetry-driven, not submission-based.** Skills appear on the leaderboard automatically when users install via `npx skills add`. More installs = higher ranking. No form, no PR, no approval step. |
| **Our page** | `https://skills.sh/architect-4-citadell/elektra-skills` (live once installs are tracked) |
| **Individual skill pages** | `https://skills.sh/architect-4-citadell/elektra-skills/godspeed`, `.../autoresearch`, etc. |
| **Security badge** | Automatic. Snyk, Gen, and Socket scan skills on install (skills@1.4.0+). Passing = "Security Verified" badge. No author action needed. |
| **"Official" tab** | Curated by Vercel. No public submission process documented. |
| **Rankings** | "All Time", "Trending (24h)", "Hot". Currently 90,000+ skills indexed. |
| **Status** | **LIVE** — repo is already installable. Ranking depends on install volume. |
| **Action needed** | Drive installs (blog posts, social, community mentions citing the `npx skills add` command). |

### 2. Claude Code Plugin Marketplace (Anthropic)

| Field | Detail |
|-------|--------|
| **Docs** | https://code.claude.com/docs/en/plugin-marketplaces |
| **Official directory** | https://github.com/anthropics/claude-plugins-community |
| **Submission** | https://clau.de/plugin-directory-submission |
| **How listing works** | Create a `.claude-plugin/marketplace.json` and `.claude-plugin/plugin.json` per plugin. Submit via Anthropic's form — they review and add to the community directory. PRs to the repo are auto-closed. |
| **Self-hosting** | You can host your own marketplace on GitHub. Users add it with `/plugin marketplace add architect-4-citadell/elektra-skills`. |
| **Status** | **NOT YET SUBMITTED** |
| **Action needed** | Create `.claude-plugin/` directory with marketplace manifest, then submit via the form. See [Artifacts to Create](#artifacts-to-create) below. |

**Required files:**

```
.claude-plugin/
├── marketplace.json          # Lists all plugins in this repo
└── plugins/
    ├── godspeed/
    │   └── plugin.json       # Plugin metadata for godspeed
    ├── autoresearch/
    │   └── plugin.json
    ├── responsible-ai/
    │   └── plugin.json
    ├── standard-orders/
    │   └── plugin.json
    ├── godspeed-resume/
    │   └── plugin.json
    └── project-mgmt/
        └── plugin.json
```

**marketplace.json format:**
```json
{
  "name": "elektra-skills",
  "displayName": "Elektra Skills — AI Governance & Execution",
  "description": "Solutions Architect AI for your codebase. 6 governance skills: structured execution, RAI gates, self-healing workflows.",
  "author": "Citadel Agentic Labs",
  "url": "https://github.com/architect-4-citadell/elektra-skills",
  "plugins": ["godspeed", "autoresearch", "responsible-ai", "standard-orders", "godspeed-resume", "project-mgmt"]
}
```

**plugin.json format (per plugin):**
```json
{
  "name": "godspeed",
  "displayName": "Godspeed — 12-Phase Execution Engine",
  "description": "Idea-to-ship in 12 structured phases with RAI gates, TDD enforcement, and self-healing resume.",
  "version": "1.0.0",
  "author": "Citadel Agentic Labs",
  "license": "CC BY-NC-SA 4.0",
  "keywords": ["execution", "governance", "tdd", "rai", "shipping"]
}
```

### 3. Cursor Marketplace

| Field | Detail |
|-------|--------|
| **URL** | https://cursor.com/marketplace |
| **Publish** | https://cursor.com/marketplace/publish |
| **Contact** | kniparko@anysphere.com |
| **How listing works** | Submit via the publish page or email. Requires `.cursor-plugin/plugin.json` with name, displayName, author, description, keywords, license, version. |
| **Template** | https://github.com/cursor/plugin-template |
| **Supports** | Skills, MCP servers, subagents, hooks, rules — bundled as plugins. |
| **Status** | **NOT YET SUBMITTED** |
| **Action needed** | Create `.cursor-plugin/plugin.json`, submit via publish page. |

**Required file:**

```json
// .cursor-plugin/plugin.json
{
  "name": "elektra-skills",
  "displayName": "Elektra Skills — AI Governance & Execution",
  "author": "Citadel Agentic Labs",
  "description": "Solutions Architect AI for your codebase. 6 governance skills for structured execution, RAI compliance, and self-healing workflows.",
  "keywords": ["governance", "execution", "rai", "tdd", "security", "project-management"],
  "license": "CC BY-NC-SA 4.0",
  "version": "0.5.0"
}
```

### 4. Anthropic Official Skills Repo

| Field | Detail |
|-------|--------|
| **URL** | https://github.com/anthropics/skills (105k+ stars) |
| **How listing works** | Open a PR. Contains the Agent Skills spec, template, and demonstration skills. Getting a skill listed here is high-signal credibility. |
| **Status** | **NOT YET SUBMITTED** |
| **Action needed** | Open a PR adding Elektra Skills as a featured community skill or contribute a reference implementation. |

---

## Tier 2: Secondary Registries

### 5. Gemini CLI Skills (Google)

| Field | Detail |
|-------|--------|
| **Docs** | https://geminicli.com/docs/cli/skills/ |
| **Official repo** | https://github.com/google-gemini/gemini-skills |
| **How listing works** | Uses the same SKILL.md standard. Skills install to `.gemini/skills/` or `~/.gemini/skills/`. |
| **Status** | **COMPATIBLE** — no submission needed. Users can already install our skills manually. |
| **Action needed** | Test installation on Gemini CLI. Consider PR to google-gemini/gemini-skills for visibility. |

### 6. VS Code / GitHub Copilot Agent Skills

| Field | Detail |
|-------|--------|
| **Docs** | https://code.visualstudio.com/docs/copilot/customization/agent-skills |
| **How listing works** | Contribute to community repos like `github/awesome-copilot`. Skills use the same SKILL.md format. Agent plugins are a preview feature. |
| **Default plugin marketplaces** | `copilot-plugins` and `awesome-copilot` repos. |
| **Status** | **COMPATIBLE** — same SKILL.md format works. |
| **Action needed** | Submit to awesome-copilot repo when it accepts external contributions. |

### 7. SkillUse

| Field | Detail |
|-------|--------|
| **URL** | https://skilluse.dev/ |
| **GitHub** | https://github.com/skilluse/skilluse |
| **How listing works** | CLI-based. `skilluse publish <skill-name>` after configuring default repo with `skilluse repo default <owner>/<repo>`. GitHub-based registry. |
| **Status** | **NOT YET SUBMITTED** |
| **Action needed** | Install SkillUse CLI, configure repo, publish each skill. |

### 8. Skild

| Field | Detail |
|-------|--------|
| **URL** | https://skild.sh/ |
| **GitHub** | https://github.com/Peiiii/skild |
| **How listing works** | Positions itself as "npm for AI Agent Skills". CLI-based installer/registry. |
| **Status** | **NOT YET SUBMITTED** |
| **Action needed** | Evaluate CLI, publish skills if the platform has meaningful traffic. |

### 9. Codex CLI (OpenAI)

| Field | Detail |
|-------|--------|
| **Docs** | https://developers.openai.com/codex/skills |
| **How listing works** | Supports the Agent Skills standard directly. |
| **Status** | **COMPATIBLE** — same SKILL.md format works. |
| **Action needed** | Test installation. Publish to any Codex skill directory if one emerges. |

---

## Tier 3: Curated Directories & Awesome Lists

### 10. VoltAgent/awesome-agent-skills

| Field | Detail |
|-------|--------|
| **URL** | https://github.com/VoltAgent/awesome-agent-skills |
| **How listing works** | Submit a PR following CONTRIBUTING.md. Most contributed awesome list for agent skills. |
| **Status** | **NOT YET SUBMITTED** |
| **Action needed** | Open a PR adding Elektra Skills with description, install command, and category tags. |

### 11. heilcheng/awesome-agent-skills

| Field | Detail |
|-------|--------|
| **URL** | https://github.com/heilcheng/awesome-agent-skills |
| **How listing works** | PR submission. |
| **Status** | **NOT YET SUBMITTED** |
| **Action needed** | Open a PR. |

### 12. awesome-skills.com

| Field | Detail |
|-------|--------|
| **URL** | https://awesome-skills.com/ |
| **How listing works** | Curated directory (144+ skills). Check site for submission process. |
| **Status** | **NOT YET SUBMITTED** |
| **Action needed** | Check submission process, submit. |

### 13. agent-skills.md

| Field | Detail |
|-------|--------|
| **URL** | https://agent-skills.md |
| **How listing works** | Browsable directory. Check for submission process. |
| **Status** | **NOT YET SUBMITTED** |

### 14. GitHub Topics

| Field | Detail |
|-------|--------|
| **URL** | https://github.com/topics/agent-skills |
| **How listing works** | Tag your repo with relevant topics. Repo appears in topic searches. |
| **Topics set** | `agent-skills`, `claude-code`, `cursor`, `gemini-cli`, `codex`, `ai-governance`, `ai-agent`, `skills-sh`, `responsible-ai`, `windsurf` |
| **Status** | **DONE** (set 2026-03-28) |

---

## Spec Compliance

Our SKILL.md files follow the [Agent Skills Specification](https://agentskills.io/specification).

**Required fields (all present):**
- `name` — 1-64 chars, lowercase + hyphens, matches directory name
- `description` — 1-1024 chars, describes what + when to use

**Optional fields we include:**
- `license` — CC BY-NC-SA 4.0
- `metadata.author` — citadel-labs
- `version` — semver (non-standard but harmless)
- `compatibility` — agent compatibility statement (added 2026-03-28)

**Validation:** Run `skills-ref validate ./my-skill` from the [agentskills/agentskills](https://github.com/agentskills/agentskills) reference library to verify compliance.

---

## Submission Tracker

| # | Registry | Tier | Status | Date | Notes |
|---|----------|------|--------|------|-------|
| 1 | skills.sh | T1 | LIVE (auto) | — | Ranking depends on installs |
| 2 | Claude Code Plugin Marketplace | T1 | TODO | — | Need .claude-plugin/ dir + form submission |
| 3 | Cursor Marketplace | T1 | TODO | — | Need .cursor-plugin/ + publish page |
| 4 | anthropics/skills | T1 | TODO | — | PR to official repo |
| 5 | Gemini CLI | T2 | COMPATIBLE | — | Test + optional PR |
| 6 | VS Code / Copilot | T2 | COMPATIBLE | — | Submit when accepting |
| 7 | SkillUse | T2 | TODO | — | Publish via CLI |
| 8 | Skild | T2 | TODO | — | Evaluate traffic first |
| 9 | Codex CLI | T2 | COMPATIBLE | — | Same SKILL.md format |
| 10 | VoltAgent/awesome-agent-skills | T3 | TODO | — | PR submission |
| 11 | heilcheng/awesome-agent-skills | T3 | TODO | — | PR submission |
| 12 | awesome-skills.com | T3 | TODO | — | Check process |
| 13 | agent-skills.md | T3 | TODO | — | Check process |
| 14 | GitHub Topics | T3 | DONE | 2026-03-28 | 10 topics set |

---

## Growth Strategy

### Bootstrapping skills.sh Ranking

skills.sh ranking is purely install-volume driven. Strategies:

1. **README install command** — Already prominent: `npx skills add architect-4-citadell/elektra-skills`
2. **Social proof** — Blog posts, Twitter/X threads, LinkedIn posts citing the install command
3. **Community engagement** — Post in Claude Code, Cursor, and AI agent communities
4. **Cross-promotion** — Listed as companion skill in gstack, superpowers, claude-mem ecosystems
5. **Marketing site** — citadellabs.ai/experiments/agent-skills already live
6. **GitHub stars** — Drive stars which appear in skills.sh metadata

### Content to Produce

| Content | Platform | Purpose |
|---------|----------|---------|
| "How I Govern My AI Agent" blog post | Dev.to, Medium, personal blog | Organic discovery |
| Twitter/X thread on governance skills | Twitter/X | Social proof + install mentions |
| LinkedIn post on RAI framework | LinkedIn | Enterprise/professional audience |
| YouTube demo (5 min) | YouTube | Visual walkthrough of /godspeed |
| Reddit post in r/ClaudeAI | Reddit | Community engagement |
| HN Show HN | Hacker News | Developer discovery |

---

## References

- [Agent Skills Specification](https://agentskills.io/specification)
- [Vercel Skills CLI](https://github.com/vercel-labs/skills)
- [skills.sh FAQ](https://skills.sh/docs/faq)
- [Claude Code Plugin Marketplace Docs](https://code.claude.com/docs/en/plugin-marketplaces)
- [Cursor Plugin Template](https://github.com/cursor/plugin-template)
- [Snyk + Vercel Security Audits](https://snyk.io/blog/snyk-vercel-securing-agent-skill-ecosystem/)
