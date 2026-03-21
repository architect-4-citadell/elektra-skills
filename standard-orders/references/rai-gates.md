# RAI Gates -- Pre and Post Execution

## RAI Risk Tiers

| Tier | Categories | Impact | Gate |
|------|-----------|--------|------|
| **Tier 1 (Critical)** | User data / graph layer, deterministic computation, LLM orchestration, AI pipeline, document rendering | Full Pre-Merge Checklist | Mandatory P2.5 + P5.5 |
| **Tier 2 (Significant)** | External data sources, prompt templates, channel/output formatting | Checklist items marked [T2] | P2.5 + P5.5 (reduced) |
| **Tier 3 (Standard)** | API gateway, web UI-only, infrastructure | Standard review | Log tier only, skip checklists |

## Pre-Execution Gate (P2.5)

Runs after Eng Review, before Plan Writing.

### Input
- Validated decision list from P2
- File paths being touched (from P2 analysis)

### Process
1. Classify each file into RAI tier based on what it does:
   - **Tier 1:** Files touching user data, graph queries, deterministic computation, LLM orchestration, AI pipeline, document rendering
   - **Tier 2:** Files touching external data sources, prompt templates, output channel formatting
   - **Tier 3:** Everything else (API gateway, web UI-only, infrastructure, configs)
2. Generate RAI checklist for the highest tier detected
3. Log to `.context/rai-log.json`:
   ```json
   {
     "session_id": "YYYY-MM-DD-feature",
     "plan_file": "docs/plans/YYYY-MM-DD-feature.md",
     "rai_tier": 1,
     "files_by_tier": {"tier1": [...], "tier2": [...], "tier3": [...]},
     "checklist": [
       {"item": "Tenant isolation: session-level security vars set", "status": "pending"},
       {"item": "PII: No PII in LLM prompts or traces", "status": "pending"}
     ]
   }
   ```
4. Inject reminders into P3 plan for relevant chunks

### Skip Condition
If ALL files are Tier 3, log the classification but do not generate a checklist.

## Post-Execution Gate (P5.5)

Runs after Final Review, before CEO Acceptance.

### Input
- `.context/rai-log.json` from P2.5
- Git diff of all changes

### Process
1. Read the RAI log and its checklist
2. For each checklist item, verify against the actual code changes:
   - **Tenant isolation:** Grep for tenant_id / user_id scoping in data queries
   - **PII protection:** Grep for PII field names in LLM prompt strings
   - **Citation integrity:** Check for citation markers in document output code
   - **Confidence scoring:** Verify threshold checks exist
   - **Hallucination prevention:** Check grounding instructions in prompts
   - **Bias mitigation:** Check for balanced framing patterns
   - **Content provenance:** Check for AI disclosure and output metadata
   - **Disclaimers:** Check for footer generation
   - **Audit trail:** Check for logging of generation events
3. Update `.context/rai-log.json` with findings
4. Generate summary for P6 acceptance report

### If Violations Found
- Block P6 until violations are resolved
- Return to P4 for targeted fixes
- Re-run P5 review on the fixes
- Re-run P5.5 audit

## Pre-Merge RAI Checklist (Tier 1)

- [ ] **Tenant Isolation:** Session-level security variables set before queries. Graph/database queries scoped by tenant. Data visibility model enforced.
- [ ] **PII Protection:** PII masked before LLM API calls. No PII in observability traces or application logs. User names/emails never in prompt strings.
- [ ] **Citation Integrity:** Citation markers present in generated content. Post-generation citation audit runs. Source metadata preserved through pipeline.
- [ ] **Confidence Scoring:** Section-level scores computed (source_alignment, token_match, model_agreement, data_freshness). Scores <0.50 block content. Warning indicators rendered.
- [ ] **Hallucination Prevention:** Grounding instruction present ("only use information from provided context"). Deterministic engine used for ALL financial figures -- LLM never computes. Self-Critique pass enabled.
- [ ] **Bias Mitigation:** Balanced framing in generated content. 2+ sources per competitor claim. No demographic assumptions.
- [ ] **Content Provenance:** AI disclosure footer present. Output metadata generated. Document metadata flag set.
- [ ] **Disclaimers:** Footer present on all generated documents. Context-appropriate disclaimer text.
- [ ] **Audit Trail:** Generation events logged (user_id, doc_type, sources, models). Model decisions logged. PII masking logged.

## Tier 2 Checklist (Reduced)

- [ ] [T2] **Source Attribution:** Data source provenance tracked through pipeline
- [ ] [T2] **Prompt Safety:** No hardcoded PII in prompt templates. Injection guards present.
- [ ] [T2] **Channel Integrity:** Per-channel formatting preserves citation markers
- [ ] [T2] **Audit Trail:** Source fetch events logged

## Critical Rules (Non-Negotiable)

1. LLM NEVER computes financial figures -- use deterministic computation
2. No silent fallbacks on safety controls -- every fallback logs at WARNING
3. Cross-tenant leakage is catastrophic failure -- halt and investigate
4. Citations mandatory for factual claims in generated documents
5. Confidence <0.50 = do not include content
