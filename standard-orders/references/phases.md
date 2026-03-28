# Godspeed Phase Checklists (14 Phases)

## P0: Context Load Checklist

- [ ] MEMORY.md loaded (automatic)
- [ ] Relevant memory files read (max 3)
- [ ] Git branch identified, status checked
- [ ] Active plan found in `docs/plans/`
- [ ] SO2 pre-session: `gh issue list --assignee @me`
- [ ] PR status checked: `gh pr list --state open`
- [ ] Domain classified, skills loaded per project's dispatch table
- [ ] `.context/.session-state.json` initialized

---

## P1: CEO Review Checklist

- [ ] Root cause analysis (not just symptoms)
- [ ] Numbered decisions D1..Dn with A/B/C options
- [ ] Each decision: problem statement, options, recommendation, rationale
- [ ] Dependency ordering between decisions
- [ ] Scope mode confirmed (EXPANSION / HOLD / REDUCTION)
- [ ] User approves all decisions

**Output:** Approved decisions + dependency chain + parallel-safe groupings.

---

## P2: Eng Review Checklist

- [ ] Each decision validated against actual codebase (read the files)
- [ ] Hidden complexity identified
- [ ] New decisions Dn+1.. surfaced if needed, with user approval
- [ ] Dependency chain validated or corrected
- [ ] File count estimate (>8 files = smell)
- [ ] Existing code that partially solves each sub-problem identified

**Output:** Validated decisions + corrected dependency chain + "what exists" + session count.

---

## P2.5: RAI Review Checklist

- [ ] Files classified into RAI tiers (Tier 1/2/3)
- [ ] RAI checklist generated (if Tier 1 or 2)
- [ ] Checklist logged to `.context/rai-log.json`
- [ ] RAI reminders injected for relevant P3 plan chunks
- [ ] If all Tier 3: logged and skipped

**Output:** RAI tier classification + checklist (if applicable).

---

## P3: Plan Writing Checklist

- [ ] Header with goal, architecture, tech stack
- [ ] Chunks sized to manageable context sessions
- [ ] Each chunk: files to create/modify, tests, steps with checkboxes
- [ ] Dependency chain respected in chunk ordering
- [ ] Parallel-safe chunks identified for concurrent execution
- [ ] RAI checklist items embedded in relevant chunks
- [ ] TDD pattern: test first, implement, verify

**Output:** Plan doc saved to `docs/plans/YYYY-MM-DD-<feature>.md`.

---

## P3.5: Plan Review Gate Checklist

### Scope assessment
- [ ] Classify scope: Large feature / Standard feature / Small fix
- [ ] Large: invoke `/plan-ceo-review` (gstack). Standard: invoke `/plan-eng-review` (gstack). Small: skip P3.5.

### Architecture review (large/standard)
- [ ] Data flow validated with shadow paths (nil, empty, error, concurrent)
- [ ] State machines identified with transition rules
- [ ] Security & threat model: attack surface, input validation, authorization
- [ ] Error & rescue map: exception classes, user impact
- [ ] NOT in scope list explicit

### Design review (if frontend in plan)
- [ ] Invoke `/plan-design-review` (gstack) for UI/UX gap analysis
  - [ ] Missing interaction patterns identified
  - [ ] Incomplete user flows flagged
  - [ ] Responsive strategy gaps caught
  - [ ] Component reuse opportunities surfaced
  - [ ] Design system violations in approach flagged
- [ ] Invoke `/ui-ux-pro-max` to lock design decisions
  - [ ] Accessibility approach locked (contrast, keyboard nav, screen reader)
  - [ ] Layout & responsive strategy confirmed (breakpoints, mobile-first)
  - [ ] Typography & color tokens selected
  - [ ] Navigation patterns decided
  - [ ] Animation approach agreed (durations, easing, reduced-motion)

### Test matrix
- [ ] New UX/data/code paths identified for coverage
- [ ] Integration test scope defined
- [ ] Performance benchmarks identified (if applicable)

### Approval
- [ ] Plan review findings addressed or deferred with rationale
- [ ] Plan doc updated in place with review notes
- [ ] User approves plan -> P4

**Gate:** Plan approved -> P4. Plan needs rework -> update, re-review.

---

## P4: Execute Loop Checklist

Per chunk, in a single session:

### Setup
- [ ] Read plan doc, find current chunk
- [ ] Create task entries for each step
- [ ] Set up feature branch if not exists

### Execute (per task)
- [ ] Write failing test
- [ ] Implement minimal code to pass
- [ ] Verify test passes
- [ ] Run local CI: `<your-lint-command> && <your-format-command> && <your-typecheck-command> && <your-test-command>`
- [ ] Mark task completed

### Review
- [ ] All tasks in chunk completed
- [ ] All tests pass
- [ ] Self-review or invoke code review skill
- [ ] Address all CRITICAL feedback
- [ ] Re-run tests after fixes

### Commit
- [ ] Stage specific files (not `git add .`)
- [ ] Descriptive commit message with Co-Authored-By
- [ ] Push to feature branch
- [ ] Update plan doc checkboxes

### Memory
- [ ] Recurring gotcha discovered? -> Add to MEMORY.md
- [ ] User corrected approach? -> Save to `feedback_*.md` immediately

### Session Boundary
- [ ] If context near capacity: finish current task, commit, update plan, resume next session

---

## P4.5: UAT + QA + Design Review Checklist

### Functional validation
- [ ] Autonomous UAT -- bug hunting against the feature
- [ ] Systematic QA via `/qa` (gstack): full/quick/regression based on scope
- [ ] E2E Integration Smoke Test:
  - Backend: `<your-test-command> -m "integration" <your-test-directory> -v`
  - Frontend: `cd <your-frontend-app> && <your-build-command>`

### Design review (if frontend/UI work)
- [ ] Browser dogfooding via `/qa` (gstack) -- screenshots with evidence
- [ ] Visual QA via `/design-review` (gstack) -- spacing, hierarchy, AI slop, iterative fixes
- [ ] Design audit via `/ui-ux-pro-max` -- 10-priority checklist:
  - [ ] P1: Accessibility (contrast, keyboard, aria, focus)
  - [ ] P2: Touch & Interaction (target size, spacing, feedback)
  - [ ] P3: Performance (images, CLS, lazy loading)
  - [ ] P4: Style (palette consistency, SVG icons, platform-adaptive)
  - [ ] P5: Layout & Responsive (mobile-first, breakpoints, spacing)
  - [ ] P6: Typography & Color (semantic tokens, dark mode)
  - [ ] P7: Animation (duration, transform-only, reduced-motion)
  - [ ] P8: Forms & Feedback (labels, errors, empty states)
  - [ ] P9: Navigation (bottom nav, back behavior, deep links)
  - [ ] P10: Charts & Data (chart type, accessible colors, empty state)

### Brand & content quality
- [ ] SO3 quality gate (if branded/document work):
  - [ ] Color tokens match design system
  - [ ] No banned terms or sycophantic patterns
  - [ ] Typography uses designated fonts
  - [ ] Content formatting rules followed

- [ ] If bugs or design issues found: loop back to P4 for targeted fixes

---

## P5: Final Review Checklist

- [ ] `git fetch origin main --quiet`
- [ ] `git diff origin/main --stat` for full scope
- [ ] Two-pass: CRITICAL (SQL safety, LLM trust, IDOR) then INFORMATIONAL
- [ ] All CRITICAL issues fixed
- [ ] External reviewer comments addressed
- [ ] Verification checklist:
  - Routes registered in main app entry point?
  - New packages in dependency manifest?
  - CHECK constraint values match code?
  - ORM nullable matches DDL NOT NULL?
  - IDOR -- queries include user_id filter?

---

## P5.5: RAI Audit Checklist

- [ ] Read `.context/rai-log.json` from P2.5
- [ ] Verify each checklist item against actual code changes
- [ ] Update RAI log with findings
- [ ] Generate compliance summary for P6
- [ ] If violations: block P6, return to P4 for fixes
- [ ] If all Tier 3: log "Tier 3 -- no audit required"

---

## P6: CEO Acceptance Checklist (APPROVAL GATE)

**BLOCKED until user says "approved".** Do NOT auto-proceed.

### 6a. Delivery Summary
- [ ] Every numbered issue from input -> status (DONE / PARTIAL / DEFERRED) + files

### 6b. Deferred Items
- [ ] Everything NOT done + reason + effort + follow-on session

### 6c. TODOs Remaining
- [ ] `# TODO` and `# FIXME` in committed code
- [ ] Type-ignore suppressions with justification
- [ ] Test coverage gaps

### 6d. Follow-On Sessions
- [ ] Concrete next sessions with scope + dependencies + priority

### 6e. Known Risks
- [ ] Works-in-test but might break in prod
- [ ] External reviewer feedback not addressed
- [ ] Schema/seed changes needing prod application

### 6f. RAI Summary
- [ ] RAI tier of files touched
- [ ] Checklist compliance status
- [ ] Any RAI findings logged

**Gate:** "approved" -> P7. Rework -> loop to P4.

---

## P7: Ship Checklist (2-PART)

### P7a: PR Creation
- [ ] PR created: `gh pr create` with summary + test plan
- [ ] Push latest code
- [ ] Present PR URL
- [ ] **STOP.** Wait for user.

### P7b: Merge (after explicit approval)
- [ ] All CI checks green
- [ ] All user-requested changes addressed
- [ ] User said "merge" or "ship it"
- [ ] Execute merge
- [ ] Confirm merge URL

---

## P8: Close Checklist

### Doc Sync
- [ ] Schema changes -> update schema documentation
- [ ] Data flow changes -> relevant architecture docs
- [ ] Voice/personality -> validate against project's voice guidelines

### SO2 Post-Session
- [ ] Update GitHub issue with session notes
- [ ] Close resolved issues
- [ ] Archive completed plans to `docs/plans/completed/`
- [ ] Update session tracking document

### Memory
- [ ] Recurring gotcha? -> MEMORY.md
- [ ] New feedback? -> `feedback_*.md`
- [ ] Cross-session decision? -> `project_*.md`

### Verification
- [ ] All tests pass
- [ ] Plan doc updated with execution notes
- [ ] Final commit + push

---

## Edge Cases + Recovery

### Mid-session crash
1. Check git status -- uncommitted work?
2. Commit with "[WIP] godspeed P4 chunk N"
3. Update plan doc
4. Resume: `/SO-godspeed-resume P4`

### CEO rejects at P6
1. Capture rework items
2. Create mini-plan
3. Execute as P4 chunk(s)
4. Return to P4.5 -> P5 -> P5.5 -> P6

### CI fails after local tests pass
1. Read CI logs
2. Fix in dedicated commit
3. Do NOT merge with failing CI

### External reviewer conflicts with plan
1. Verify claim against code (don't blindly implement)
2. Valid: fix. Invalid: reply with reasoning. Conflicts with approved decision: ask user.

### UAT/QA finds regressions at P4.5
1. Classify severity (P0/P1/P2)
2. P0/P1: Fix before P5 (loop back to P4)
3. P2: Log in P6 acceptance, fix in follow-on
