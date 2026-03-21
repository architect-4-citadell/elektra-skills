# Memory Protocol -- Cross-Session Persistence

How and when the AI Agent reads and writes persistent memory across sessions.

## Memory Location

```
<your-memory-directory>/
+-- MEMORY.md              # Index file (auto-loaded into every conversation)
+-- feedback_*.md          # How the user wants the AI to behave
+-- project_*.md           # Active project context and decisions
+-- user_*.md              # User's role, preferences, working style
+-- reference_*.md         # External system pointers
```

## When to Read

### P0 (Context Load -- every session)
1. **MEMORY.md** -- auto-loaded (no action needed)
2. **Scan index** -- identify memory files relevant to session topic
3. **Read up to 3** relevant files to control context budget
4. **Priority:** feedback > project > user > reference

### During Execution (P4)
- Read specific memory files when touching a domain they cover
- Example: touching auth code -> read `feedback_pre_ci_check.md` if relevant

## When to Write

### Immediately (during session)
- **User corrects approach** -> save to `feedback_*.md`
  - Lead with the rule, then **Why:** and **How to apply:**
  - Example: "Don't mock the database" -> `feedback_no_db_mocks.md`

### P8 (Session Close)
- **Recurring gotcha discovered** -> add to MEMORY.md "Recurring Gotchas" section
  - Only if: (1) it caused a bug, (2) it's not obvious from reading the code, (3) it's not already captured
- **Architecture decision made** -> save to `project_*.md` with absolute date
  - Convert relative dates ("Thursday") to absolute dates ("2026-03-05")
  - Include **Why:** (the motivation) and **How to apply:** (when it matters)
- **New user preference learned** -> save to `user_*.md`
  - Example: "User prefers terse responses" -> `user_communication_style.md`

## What NOT to Save

- Code patterns discoverable from the codebase
- Git history (use `git log` / `git blame`)
- Debugging solutions (the fix is in the code)
- Anything already in CLAUDE.md or project instructions
- Session-specific progress (that's in `docs/plans/`)
- Ephemeral task details

## File Format

Every memory file uses frontmatter:

```markdown
---
name: {{memory name}}
description: {{one-line description for relevance matching}}
type: {{user | feedback | project | reference}}
---

{{content}}
```

## MEMORY.md Rules

- **Always auto-loaded** -- this is the only file guaranteed in context
- **Index only** -- contains links to memory files with brief descriptions, not full content
- **Under 200 lines** -- lines after 200 are truncated
- **Semantic organization** -- by topic, not chronologically
- **No duplicates** -- check before adding new entries

## Memory Types

| Type | Contains | When to Save | When to Read |
|------|----------|-------------|-------------|
| **feedback** | User corrections, approach guidance | When user corrects the AI | Before proposing approaches |
| **project** | Ongoing work, goals, decisions | When cross-session decision made | When session touches that domain |
| **user** | User's role, preferences, knowledge | When learning about the user | At session start |
| **reference** | External system pointers | When learning about external resources | When touching integrations |

## Integration with Standard Orders

| Phase | Memory Action |
|-------|--------------|
| P0 | Read MEMORY.md + 3 relevant files |
| P4 | Save feedback immediately when user corrects |
| P6 | Include memory-worthy patterns in acceptance report |
| P8 | Write new memories, update existing, prune stale |
