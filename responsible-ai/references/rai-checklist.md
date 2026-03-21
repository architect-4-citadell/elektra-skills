# RAI Pre-Merge Checklist -- Detailed Gate Reference

Detailed pre-merge checklist for Tier 1 and Tier 2 changes. Use this during code review and before merging any PR that touches the AI output pipeline.

## How to Use

1. Determine the **risk tier** of your change (see SKILL.md for tier definitions)
2. For **Tier 1 (Critical)** changes: complete the FULL checklist below
3. For **Tier 2 (Significant)** changes: complete items marked with [T2]
4. For **Tier 3 (Standard)** changes: standard code review, no RAI-specific requirements

## Tier 1 -- Full Pre-Merge Checklist

### Tenant / Data Isolation

- [ ] [T2] Session-level or row-level security variables set before all queries
- [ ] [T2] Graph/database queries scoped by tenant identifier -- MERGE, MATCH, CREATE all include tenant
- [ ] Data visibility model enforced (personal / active client / other clients separation)
- [ ] No cross-tenant data in generated output
- [ ] No tenant identifiers or user data in log messages or error responses
- [ ] Cross-tenant query tested: verify User A cannot access User B's data through this code path

### PII Protection

- [ ] [T2] User PII (name, email, phone, address) masked before sending to external LLM APIs
- [ ] [T2] PII not present in observability traces (e.g., Langfuse, OpenTelemetry spans)
- [ ] PII not present in application error logs
- [ ] Vector embeddings and cache entries tagged with data retention policies
- [ ] Prompt injection defenses in place: user-controlled text cannot override system instructions
- [ ] PII masking failure mode: request FAILS rather than proceeding with unmasked data

### Citation Integrity

- [ ] Factual claims in generated text traceable to retrieved source chunks
- [ ] Citation markers (e.g., `[cite: chunk_id]`) present in generation prompts
- [ ] Post-generation citation audit runs: each citation maps to a real retrieved chunk
- [ ] No citations fabricated from LLM parametric memory
- [ ] Source metadata (url, title, publisher, access_date) preserved through the full pipeline
- [ ] Dead/stale citations handled: flagged or removed, not silently included

### Confidence Scoring

- [ ] Section-level confidence scores computed with multiple signals:
  - Source alignment (does the text match the sources?)
  - Token match (how closely does output follow retrieved text?)
  - Model agreement (do multiple models agree?)
  - Data freshness (how recent are the sources?)
- [ ] Scores below 0.50 block content from appearing in final output
- [ ] Amber zone (0.70-0.84): user sees warning indicator
- [ ] Red zone (0.50-0.69): user sees strong warning indicator
- [ ] Output metadata (e.g., generation receipt) included in document

### Hallucination Prevention

- [ ] Generation prompts include explicit grounding instruction: "Only include information from provided context"
- [ ] All financial/numerical figures produced by deterministic computation, NOT LLM
- [ ] Generated text cross-validated against deterministic computed values for math consistency
- [ ] Self-Critique pass enabled for high-stakes document types
- [ ] Revision pass enabled for documents with confidence scores in amber zone

### Bias Mitigation

- [ ] [T2] Prompt templates include balanced framing constraints (no one-sided framing)
- [ ] Competitive analysis sections require 2+ independent sources per competitor claim
- [ ] People-related sections prohibit assumptions about demographics, gender, ethnicity
- [ ] Multi-model consensus used to reduce single-model bias
- [ ] No hardcoded sentiment or opinion in prompt templates

### Content Provenance

- [ ] AI disclosure footer present in all generated documents
- [ ] Output metadata (models used, sources consulted, confidence scores) accessible in web preview
- [ ] Verification URL generated for each document (if your application supports it)
- [ ] Document metadata includes `ai_generated: true` flag
- [ ] Content provenance chain: user can trace from output back to source data

### Disclaimers

- [ ] Disclaimer footer present on all exported documents
- [ ] Disclaimer text appropriate for the application's tier/context
- [ ] Terms of Service professional liability exclusion intact
- [ ] Disclaimer cannot be silently removed by export process

### Audit Trail

- [ ] [T2] Generation requests logged: user_id, document_type, sources_used, models_used
- [ ] Model decisions logged: which models were consulted, which agreed/disagreed
- [ ] PII masking actions logged: what was masked, when, for which request
- [ ] Human review/edit actions logged: what the user changed after generation
- [ ] [T2] Data source fetch events logged: source, timestamp, freshness

## Tier 2 -- Reduced Checklist

For changes touching external data sources, prompt templates, or output formatting:

- [ ] [T2] **Source Attribution:** Data source provenance tracked through pipeline
- [ ] [T2] **Prompt Safety:** No hardcoded PII in prompt templates. Injection guards present.
- [ ] [T2] **Channel Integrity:** Per-channel formatting preserves citation markers
- [ ] [T2] **Audit Trail:** Source fetch events logged
- [ ] [T2] **Tenant Isolation:** Queries respect tenant scoping
- [ ] [T2] **PII Protection:** No PII leaks to external services
- [ ] [T2] **Bias Review:** Prompt changes reviewed for balanced framing

## Quick Decision Matrix

| Question | If YES | If NO |
|----------|--------|-------|
| Does this code query user/tenant data? | Check Tenant Isolation | Skip |
| Does this code send data to an external LLM? | Check PII Protection | Skip |
| Does this code generate text with factual claims? | Check Citation Integrity | Skip |
| Does this code render documents for users? | Check Content Provenance + Disclaimers | Skip |
| Does this code compute financial figures? | Verify deterministic engine used, NOT LLM | Skip |
| Does this code modify prompt templates? | Check Bias Mitigation + Prompt Safety | Skip |
| Does this code log or trace request data? | Verify no PII in logs/traces | Skip |
