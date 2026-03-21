---
name: project-mgmt
version: 1.0.0
description: "SO2 Project Management -- GitHub PM routine. Check issues, PR status, plan progress, triage, backlog grooming. Runs at P0/P8 of Godspeed, or standalone."
license: CC BY-NC-SA 4.0
metadata:
  author: citadel-labs
---

# /project-mgmt -- Project Management

Direct entry to **Standing Order 2** -- GitHub-powered project management.

## What This Does

Standalone PM tasks: status reports, issue triage, plan updates, backlog grooming, PR lifecycle checks.

Also runs automatically at:
- **P0 (pre-session)** -- Check issues, plans, PR status
- **P8 (post-session)** -- Update issues, close resolved, archive plans

## Protocol

1. **Load context** -- Read and follow the Standard Orders protocol: [SKILL.md](../standard-orders/SKILL.md)
2. **Execute SO2** -- Read and follow: [SO2-project-mgmt.md](../standard-orders/orders/SO2-project-mgmt.md)

## Quick Reference

```bash
gh issue list --assignee @me --state open     # Open issues
gh pr list --state open --author @me           # Open PRs
gh pr checks [PR_NUMBER]                        # CI status
```

## Related Commands

| Command | Purpose |
|---------|---------|
| `/godspeed` | Full cycle execution (SO2 runs at P0/P8) |
| `/godspeed-resume` | Resume mid-session |
| `/SO-quality` | Quality gate |
| `/standard-orders` | Meta-protocol |
