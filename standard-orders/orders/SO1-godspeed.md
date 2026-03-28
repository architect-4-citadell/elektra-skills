# SO1: Godspeed -- 12-Phase Idea-to-Ship Execution Engine

Full-cycle orchestrator: analysis to merged PR in structured phases with RAI gates and UAT/QA validation.

```
 Input (UAT report / feature / bug batch)
              |
   +----------v----------+
   |  P0: CONTEXT LOAD   |  Memory, git, plan, skills, SO2 pre-session
   +----------+----------+
              |
   +----------v----------+
   |  P1: CEO REVIEW     |  Vision, scope, decisions D1..Dn
   +----------+----------+
              |
   +----------v----------+
   |  P2: ENG REVIEW     |  Feasibility, hidden complexity
   +----------+----------+
              |
   +----------v----------+
   |  P2.5: RAI REVIEW   |  Risk tier, checklist generation
   +----------+----------+
              |
   +----------v----------+
   |  P3: WRITE PLAN     |  Chunked implementation plan
   +----------+----------+
              |
   +----------v----------+
   |  P3.5: PLAN REVIEW  |  /plan-ceo-review OR /plan-eng-review + /plan-design-review + /ui-ux-pro-max
   +----------+----------+
              |
   +----------v----------+
   |  P4: EXECUTE LOOP   |  TDD per chunk, parallel dispatch for independent chunks
   |  +----------------+ |
   |  | Chunk N         | |  1. Write failing test
   |  | Test -> Impl    | |  2. Implement minimal code
   |  | Local CI        | |  3. Verify green
   |  | Commit + push   | |  4. Commit + push
   |  +-------+--------+ |
   +----------+----------+
              |
   +----------v----------+
   |  P4.5: UAT + QA     |  Front-to-back validation + design review
   +----------+----------+
              |
   +----------v----------+
   |  P5: FINAL REVIEW   |  Full diff against main, CRITICAL fixes
   +----------+----------+
              |
   +----------v----------+
   |  P5.5: RAI AUDIT    |  Post-execution compliance check
   +----------+----------+
              |
   +----------v----------+
   |  P6: CEO ACCEPTANCE |  Delivery summary -- APPROVAL GATE (user must approve)
   +----------+----------+
              |
   +----------v----------+
   |  P7: SHIP           |  PR -> CI -> merge on explicit user approval
   +----------+----------+
              |
   +----------v----------+
   |  P8: CLOSE          |  SO2 post-session, memory save, plan archive
   +----------+----------+
```

## Invocation

```
/SO-godspeed                  # Start from P0 with user's input
/SO-godspeed-resume P4        # Resume at execute loop (cross-session)
/SO-godspeed-resume P3        # Resume at plan writing (skip reviews)
```

---

## P0: Context Load

Runs automatically at session start.

1. **Memory load** -- MEMORY.md auto-loaded. Read relevant memory files (max 3) based on session topic.
2. **Git state** -- Branch, status, diff against main, recent commits.
3. **Plan state** -- Check `docs/plans/` for active plans. If resuming, read the plan doc.
4. **SO2 pre-session** -- `gh issue list --assignee @me`, check PR status, open blockers.
5. **Skill loading** -- Domain-classify the work, load matching skills per your project's domain-to-skill map.
6. **Session state** -- Initialize `.context/.session-state.json` with phase, tool_calls, plan reference.

---

## P1: CEO Review

Review the user's input from a product/strategic lens.

- Default mode: **SCOPE EXPANSION** (target maximum value delivery)
- Present numbered decisions D1..Dn with options A/B/C
- Each decision has: problem statement, options, recommendation, rationale
- Record approved decisions in plan doc header
- If user says "hold scope" or "reduce", switch mode accordingly
- Dependency ordering identified between decisions

**Output:** Approved decisions list with chosen options + dependency chain.

---

## P2: Eng Review

Stress-test the CEO-approved decisions from a technical lens.

- Validate each decision against actual codebase (read the files)
- Identify hidden complexity the CEO review missed
- May surface NEW decisions (Dn+1, Dn+2...) -- get user approval
- File count estimate (>8 files = smell, challenge scope)
- Identify existing code that partially solves each sub-problem

**Output:** Validated decision list + corrected dependency chain + "what already exists" + estimated session count.

---

## P2.5: RAI Review

See [../references/rai-gates.md](../references/rai-gates.md) for gate definitions.

- Classify all files being touched into RAI risk tiers (Tier 1/2/3)
- Generate a RAI checklist specific to this execution
- Log: `{session_id, plan_file, rai_tier, checklist_items}` to `.context/rai-log.json`
- If Tier 1 files detected: inject mandatory RAI reminders into context

**Skip condition:** If ALL files are Tier 3 (API gateway, web UI-only, infrastructure), RAI review logs the tier classification but does not generate a checklist.

**Output:** RAI tier classification + checklist (if Tier 1/2).

---

## P3: Write Plan

Create a chunked implementation plan.

- Chunk into sessions of manageable context size
- Each chunk = one logical unit of work
- Dependency chain determines chunk ordering
- Parallel-safe chunks identified for concurrent execution
- Each task has exact file paths and code snippets
- TDD pattern: test first, implement, verify
- RAI checklist items embedded in relevant chunks

**Output:** Plan doc saved to `docs/plans/YYYY-MM-DD-<feature>.md`.

---

## P3.5: Plan Review Gate

**Pre-execution review.** The plan must survive scrutiny before code is written.

Three review dimensions, invoked based on scope:

### 1. Architecture review (gstack)

| Scope | Review Skill | What It Checks |
|-------|-------------|----------------|
| Large feature / new system | `/plan-ceo-review` | Architecture, security, data flow, error rescue, observability, deployment, long-term trajectory. 10 sections. |
| Standard feature / bug batch | `/plan-eng-review` | Scope challenge, architecture, code quality, test coverage, performance. 4 sections. |
| Small fix / single-file change | Skip P3.5 | Plan is the change description itself. |

**Review modes** (gstack `/plan-ceo-review`):
- **SCOPE EXPANSION** (default) -- dream big, find the 10-star product
- **HOLD SCOPE** -- maximum rigor, bulletproof plan
- **SCOPE REDUCTION** -- strip to essentials

**Architecture review produces:**
1. Data flow shadow paths, state machines, failure scenarios
2. Error & rescue map -- exception classes, rescued vs unrescued, user impact
3. Security & threat model -- attack surface, input validation, authorization
4. Test matrix -- new UX/data/code paths that need coverage
5. Performance review -- N+1 queries, memory, indexes, caching
6. NOT in scope -- explicit exclusion list
7. Diagrams -- system architecture, data flow, state machines (mandatory for large features)

### 2. Design review (gstack + ui-ux-pro-max)

When the plan includes UI/frontend work, run the **two-layer design review**:

**Layer 1: `/plan-design-review` (gstack)** -- Identifies UI/UX gaps in the plan:
- Missing interaction patterns, incomplete user flows
- Accessibility requirements not addressed in plan
- Responsive strategy gaps
- Component reuse opportunities missed
- Design system violations in proposed approach

**Layer 2: `/ui-ux-pro-max`** -- Locks design decisions before code:
- **Accessibility** -- 4.5:1 contrast, keyboard nav, screen reader, focus management
- **Layout & responsive** -- mobile-first, systematic breakpoints, spacing scale
- **Typography & color** -- font pairing, semantic tokens, dark mode
- **Navigation patterns** -- bottom nav limits, predictable back, deep linking
- **Animation** -- 150-300ms, transform/opacity only, reduced-motion support

`/plan-design-review` finds the gaps. `/ui-ux-pro-max` fills them with concrete design decisions.

### 3. Approval

**Output:** Reviewed plan with architecture validation, security model, test matrix, and design decisions locked. Plan doc updated in place.

**Gate:** Plan approved -> P4. Plan needs rework -> update plan, re-review.

---

## P4: Execute Loop

**Two execution modes** based on chunk dependency analysis from P3:

### Mode A: Sequential (dependent chunks)

For EACH chunk, in a single session:

1. **Token checkpoint** -- Read `.context/.session-state.json` tool_calls. If near capacity, defer to next session.
2. **Set up tasks** -- Create task entries for each step in the chunk.
3. **Execute with TDD** -- Write failing test -> implement minimal code -> verify green.
4. **Local CI** -- `<your-lint-command>`, `<your-format-command>`, `<your-typecheck-command>`, `<your-test-command>`.
5. **Chunk code review** -- Self-review or invoke a code review skill.
6. **Fix review feedback** -- Address all critical issues.
7. **Commit + push** -- Descriptive commit message, push to feature branch.
8. **Save memory** -- Update MEMORY.md if recurring gotcha discovered.

### Mode B: Parallel (independent chunks)

When P3 identifies parallel-safe chunks (no shared file dependencies):

1. **Token checkpoint** -- Same as Mode A.
2. **Dispatch agents** -- Spawn agents in isolated worktrees -- one per chunk.
3. **Each agent follows TDD** -- Write test, implement, verify green.
4. **Merge verification** -- After all agents complete, run full test suite on merged result.
5. **Combined review** -- Review on the unified diff.
6. **Commit + push** -- Single commit per batch, or one per chunk (user preference).

### Session boundary rule

Token cap warns at progressive thresholds:
- **Yellow (~70%):** Finish current task, plan your exit
- **Red (~85%):** No new chunks. Commit what's done.
- **Critical (~95%):** Commit NOW. Tell user: `/SO-godspeed-resume P4`

### Cross-session continuity

- Task checkboxes in plan doc (`- [x]` completed, `- [ ]` pending)
- Git commits (each chunk = 1+ commits)
- `.context/.session-state.json` (reset per session, plan doc persists)
- Memory saves for gotchas discovered during execution

---

## P4.5: UAT + QA + Design Review

**After code is written, before code review.** Validates front-to-back that the feature works, looks right, and meets design standards.

### Functional validation

1. **Autonomous UAT** -- Test actual user flows, not mocked paths.
2. **Systematic QA** -- Mode depends on scope (invoke `/qa` from gstack):
   - `full` -- For new features (systematic exploration, 5-15 min, health score)
   - `quick` -- For bug fixes (30-second smoke test, homepage + top 5 nav targets)
   - `regression` -- For refactors (compare against baseline, show delta)
3. **E2E Integration Smoke Test** -- At least one integration test proving the feature works through the API endpoint.

```bash
# Backend smoke test pattern
<your-test-command> -m "integration" <your-test-directory> -v

# Frontend smoke test pattern
cd <your-frontend-app> && <your-build-command>
```

### Design review (if frontend/UI work)

When execution touched frontend code, run the design review pipeline:

1. **Browser dogfooding** -- Use `/qa` (gstack) to visually inspect the UI, capture screenshots with before → action → after evidence.
2. **Visual QA** -- Invoke `/design-review` (gstack) to find spacing issues, hierarchy problems, AI slop patterns, and fix iteratively with before/after evidence.
3. **Design system audit** -- Invoke `/ui-ux-pro-max` to review against the 10-priority design checklist:

| Priority | Category | Key Checks |
|----------|----------|------------|
| 1 | Accessibility | 4.5:1 contrast, alt text, keyboard nav, aria-labels, focus rings, screen reader |
| 2 | Touch & Interaction | 44x44pt targets, 8px+ spacing, loading feedback, press states |
| 3 | Performance | WebP/AVIF images, lazy loading, CLS <0.1, font loading, code splitting |
| 4 | Style Selection | Match product type, consistent palette, SVG icons, platform-adaptive |
| 5 | Layout & Responsive | Mobile-first, systematic breakpoints, 16px+ mobile font, 4pt/8dp spacing |
| 6 | Typography & Color | Line-height 1.5+, 65-75 char width, semantic color tokens, dark mode |
| 7 | Animation | 150-300ms, transform/opacity only, reduced-motion, meaningful motion |
| 8 | Forms & Feedback | Visible labels, error near field, empty states, progressive disclosure |
| 9 | Navigation | Bottom nav ≤5 items, predictable back, deep linking, nav state highlight |
| 10 | Charts & Data | Correct chart type, accessible colors, legend visible, empty data state |

4. **SO3 Quality Gate** -- If work touches branded content or documents, run SO3 quality checklist (see SO3-quality-delivery.md).

### Design review output

- List of design issues found (categorized by priority 1-10)
- Evidence: screenshots or browser output
- Fix recommendations with specific CSS/component changes

**If bugs or design issues found:** Fix before proceeding to P5. Loop back into P4 for targeted fixes.

---

## P5: Final Review

Full diff review against `origin/main`.

- `git fetch origin main --quiet`
- `git diff origin/main --stat` to see full scope
- Two-pass review: CRITICAL (SQL safety, LLM trust, IDOR) then INFORMATIONAL
- All CRITICAL issues must be fixed before proceeding
- External reviewer comments addressed
- Verification checklist:
  - Routes registered in main app entry point?
  - New packages in dependency manifest?
  - CHECK constraint values match code?
  - ORM nullable matches DDL NOT NULL?
  - IDOR -- queries include user_id filter?

---

## P5.5: RAI Audit

Post-execution compliance check. See [../references/rai-gates.md](../references/rai-gates.md).

1. Read `.context/rai-log.json` (generated at P2.5)
2. Verify each checklist item was addressed in the code
3. Generate RAI compliance summary
4. Log findings (if Tier 1/2 files touched)
5. **If violations found:** Block P6 until resolved. Return to P4 for fixes.

**Skip condition:** Same as P2.5 -- if all files were Tier 3, log "Tier 3 -- no audit required."

---

## P6: CEO Acceptance (APPROVAL GATE)

**User's explicit approval required. Do NOT proceed without it.**

Present a structured acceptance report:

### 6a. Delivery Summary
- Map every numbered issue from original input to what was implemented
- For each: status (DONE / PARTIAL / DEFERRED) + file references

### 6b. Deferred Items
- List everything explicitly NOT done in this cycle
- For each: reason for deferral + estimated effort + suggested follow-on session

### 6c. TODOs Remaining
- Grep committed code for `# TODO` and `# FIXME`
- List all type-ignore suppressions added (with justification)
- Test coverage gaps acknowledged

### 6d. Follow-On Sessions
- Concrete next session candidates with scope
- Dependencies between follow-on sessions
- Priority recommendation

### 6e. Known Risks
- Works-in-test-but-might-break-in-prod items
- External reviewer feedback not yet addressed
- Schema/seed changes needing manual prod application

### 6f. RAI Summary (if applicable)
- RAI tier of files touched
- Checklist compliance status
- Any RAI findings logged

**Gate:** User says "approved" -> P7. User provides rework -> loop to P4.

---

## P7: Ship (2-PART)

### P7a: PR Creation
- Create PR: `gh pr create` with summary + test plan
- Push latest code
- Present PR URL to user
- **STOP.** Wait for user -- they may feed CI logs, review comments, or request rework.

### P7b: Merge (only after explicit user approval)
- All CI checks green
- All user-requested changes addressed
- User has explicitly said "merge" or "ship it"
- Execute merge
- Confirm merge URL to user

---

## P8: Close

Session finalization.

### Doc Sync
- Schema changes -> update your schema documentation
- Data flow changes -> update relevant architecture docs
- Voice/personality changes -> validate against your project's voice guidelines

### SO2 Post-Session (Project Management)
- Update GitHub issue with session notes (commits, blockers, next steps)
- Close issues if resolved
- Archive completed plans to `docs/plans/completed/`
- Update session tracking document with progress

### Memory Save
- Review session for memorable patterns (gotchas, decisions, user preferences)
- Update MEMORY.md if recurring pattern found AND not already captured
- Save feedback memories immediately when user corrects approach

### Verification
- All tests pass: `<your-test-command>`, `<your-lint-command>`, `<your-format-command>`, `<your-typecheck-command>`
- Plan doc updated with execution notes
- Final commit + push

---

## Edge Cases + Recovery

### Mid-session crash or context overflow
1. Check git status -- uncommitted work?
2. If yes: commit with "[WIP] godspeed P4 chunk N"
3. Update plan doc with done vs remaining
4. New session: `/SO-godspeed-resume P4`

### CEO rejects at P6
1. Capture specific rework items
2. Create mini-plan for rework
3. Execute as additional P4 chunk(s)
4. Return to P4.5 -> P5 -> P5.5 -> P6

### CI fails after local tests pass
1. Read CI logs (user may attach them)
2. Common causes: strict type checking, missing test fixtures, env differences
3. Fix in dedicated commit, push, re-check
4. Do NOT merge with failing CI

### External reviewer feedback conflicts with plan
1. Verify claim against actual code (don't blindly implement)
2. If valid: fix and note in plan
3. If invalid: reply with technical reasoning
4. If conflicts with approved decision: ask user

### Eng review surfaces scope-breaking complexity
1. Present to user: (A) Proceed with workaround, (B) Reduce scope, (C) Split into separate PR
2. Update plan accordingly
3. Memory save if the complexity pattern is reusable

### UAT/QA finds regressions at P4.5
1. Classify as P0/P1/P2 severity
2. P0/P1: Fix before proceeding to P5 (loop back to P4)
3. P2: Log as known issue in P6 acceptance report, fix in follow-on
