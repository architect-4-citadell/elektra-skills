# SO2: Project Management -- GitHub PM Routine

Pre/post session GitHub issue, plan, and PR lifecycle management. Ensures work is tracked, visible, and connected to the project plan.

## When This Runs

- **Pre-session (P0):** Automatically as part of SO1 context loading
- **Post-session (P8):** Automatically as part of SO1 close
- **On demand:** `/SO-pm` for standalone PM tasks

## Pre-Session Routine

### 1. Check Open Issues

```bash
gh issue list --assignee @me --state open
```

Review open issues -- any blockers? Any newly assigned work?

### 2. Check Active Plan

Read your project's session tracking document (e.g., `docs/project_management/session_plan.md`):
- What phase are we in?
- What's the next eligible session with all dependencies satisfied?
- Are there parallel-eligible sessions?

### 3. Check PR Status

```bash
gh pr list --state open --author @me
```

- Any pending reviews or CI failures on open PRs?
- Any review comments that need addressing before new work?

### 4. Set Session Context

Update `.context/.session-state.json` with:
- Active issue ID (if working from an issue)
- Active plan file path
- Current phase in session tracking document

## Post-Session Routine

### 1. Update GitHub Issue

If working from a GitHub issue, add a comment with:
- Commits made (SHA + message)
- Blockers hit and how they were resolved
- What's done vs remaining
- Next steps

```bash
gh issue comment [ID] --body "Session update: [summary]"
```

### 2. Close Resolved Issues

If the session fully resolves an issue:
```bash
gh issue close [ID] --reason completed --comment "Fixed in [commit/PR]"
```

### 3. Archive Completed Plans

If a plan is fully executed:
```bash
mv docs/plans/YYYY-MM-DD-<feature>.md docs/plans/completed/
```

### 4. Update Session Plan

In your session tracking document:
- Mark completed sessions with date
- Update dependencies if new work was discovered
- Add new sessions if follow-on work identified

### 5. PR Lifecycle

If a PR was created or updated:
- Verify CI status: `gh pr checks [PR_NUMBER]`
- Review any automated comments
- Flag any CI failures for next session

## Standalone PM Tasks

When invoked directly via `/SO-pm`:

- **Status report:** Summarize open issues, PRs, plan progress
- **Triage:** Review new issues, assign priorities, update labels
- **Plan update:** Revise session tracking document based on new information
- **Backlog grooming:** Close stale issues, consolidate duplicates
