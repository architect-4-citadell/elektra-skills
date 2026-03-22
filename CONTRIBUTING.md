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

## What we won't merge

- Skills that are project-specific (not generalizable)
- Marketing or promotional content
- Changes that break existing skill activation patterns
- Additions without clear "why" documentation

## License

By contributing, you agree that your contributions will be licensed under [CC BY-NC-SA 4.0](./LICENSE). Citadel Agentic Labs retains copyright.

## Questions?

Open a discussion or email contributors@citadellabs.ai.
