# Contributing to Elektra Skills

Thanks for your interest in contributing. These skills were built across 66+ production sessions — every addition should meet that standard.

## How to contribute

### Report issues

Found a gap in a checklist? A phase that doesn't account for your workflow? Open an issue describing:

1. Which skill is affected
2. What the gap or problem is
3. How you discovered it (what went wrong)

### Suggest improvements

Open an issue with the `enhancement` label. Include:

1. The specific skill and section
2. What you'd change
3. Why — ideally with a real-world scenario

### Submit a pull request

1. Fork the repository
2. Create a branch: `git checkout -b improve-rai-checklist`
3. Make your changes
4. Validate: `npx skills validate ./your-skill/`
5. Submit a PR with a clear description of what and why

## Quality bar

Every change must:

- **Solve a real problem.** Not theoretical — something that actually caused a bug, a missed review, or a silent failure.
- **Be framework-agnostic.** No references to specific projects, companies, or proprietary systems.
- **Follow the SKILL.md spec.** Valid frontmatter, clear trigger descriptions, progressive disclosure via `references/`.
- **Pass validation.** `npx skills validate` must pass on all modified skills.

## Responsible AI — Community-Driven

Elektra's RAI governance is open for community hardening. The 7-pillar framework, kill switches, hook detection, and checklists all accept contributions.

### How to contribute RAI improvements

1. **Use the issue template.** Click "New Issue" > "Responsible AI Improvement" on [GitHub](https://github.com/architect-4-citadell/elektra-skills/issues/new/choose). The template asks for the pillar, the component, the real-world scenario, and the proposed change.

2. **Real incidents only.** Every RAI rule in Elektra was born from a production bug, a near-miss, or a compliance gap. Theoretical proposals without real scenarios will be deprioritized.

3. **Framework-agnostic.** RAI rules must work across Python, TypeScript, Go, Rust — any stack. Include language-specific detection as optional appendices, not core rules.

### What we're looking for

| Area | Examples |
|------|---------|
| **Kill switch triggers** | New halt conditions for agent execution |
| **Hook detection patterns** | File path or code patterns for `rai-check.sh` |
| **Checklist items** | Additions to `responsible-ai/references/rai-checklist.md` |
| **Layer mappings** | Which RAI pillars apply to which architectural layers |
| **Subagent review patterns** | Systematic AI-generated code mistakes |
| **Fallback logging rules** | Silent failure detection and logging mandates |

### Active RAI issues

Browse issues labeled [`responsible-ai`](https://github.com/architect-4-citadell/elektra-skills/labels/responsible-ai) for open work. Issues marked [`community`](https://github.com/architect-4-citadell/elektra-skills/labels/community) are specifically designed for external contributors.

---

## What we won't merge

- Skills that are project-specific (not generalizable)
- Marketing or promotional content
- Changes that break existing skill activation patterns
- Additions without clear "why" documentation

## License

By contributing, you agree that your contributions will be licensed under [CC BY-NC-SA 4.0](./LICENSE). Citadel Agentic Labs retains copyright.

## Questions?

Open a discussion or email contributors@citadellabs.ai.
