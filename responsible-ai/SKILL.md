---
name: responsible-ai
version: 1.0.0
description: >-
  Responsible AI governance skill for software development. Enforces a 7-pillar
  RAI framework (tenant/data isolation, PII protection, citation integrity,
  confidence scoring, hallucination prevention, bias mitigation, content
  provenance) during development. Use when building or reviewing code touching
  LLM pipelines, AI-generated output, data source connectors, user data
  queries, multi-tenant isolation, disclaimers, or transparency features. Use
  for auditing RAI compliance before releases. Triggers on "responsible AI",
  "RAI", "citation", "hallucination", "bias", "PII", "confidence score",
  "content provenance", "disclaimer", "trust page".
license: CC BY-NC-SA 4.0
metadata:
  author: citadel-labs
---

# Responsible AI Harness -- Development Enforcement Skill

## When This Skill Activates

This skill triggers during development when ANY change touches the AI output pipeline:

| Trigger | What to Check |
|---------|--------------|
| Code touching LLM orchestration / model selection | Multi-model consensus, confidence scoring, model selection transparency |
| Code touching AI pipeline / DAG execution | Citation audit, RAG grounding, self-critique pass, source attribution |
| Code touching prompt templates | Balanced framing constraints, grounding instructions, citation markers |
| Code touching document rendering / export | AI disclosure footer, metadata, disclaimer system |
| Code touching deterministic computation modules | Computation integrity -- LLM NEVER computes financial figures |
| Code touching external data sources / connectors | Source reliability assessment, data freshness metadata |
| Code touching user data / graph queries | Tenant isolation, data visibility rules, PII in queries |
| New data source integration | Source reliability, bias assessment, PII risk, freshness guarantees |
| Prompt template changes | Bias review, grounding constraints, citation requirements |
| Document export changes | Disclaimer presence, AI disclosure, provenance metadata |

## RAI Risk Tiers

Determine the tier of your change, then apply the corresponding controls:

**Tier 1 -- Critical** (User data layer, deterministic computation, LLM orchestration, AI pipeline, document rendering):
Apply the FULL Pre-Merge Checklist below.

**Tier 2 -- Significant** (External data sources, prompt templates, channel/output formatting):
Apply the checklist items marked with [T2].

**Tier 3 -- Standard** (API gateway, web UI-only, infrastructure):
Standard code review. No RAI-specific requirements.

## Pre-Merge RAI Checklist

Run through each applicable item before marking work as complete:

### 1. Tenant / Data Isolation [T1] [T2]
- [ ] Session-level or row-level security variables respected in all queries
- [ ] Graph/database queries scoped by tenant identifier (MERGE, MATCH, CREATE all include tenant)
- [ ] Data visibility model maintained (e.g., personal / active client / other clients)
- [ ] No cross-tenant data in generated output, logs, or error messages

### 2. PII Protection [T1] [T2]
- [ ] User PII masked before sending to external LLM APIs
- [ ] PII not present in observability traces or error logs
- [ ] Vector embeddings and cache entries inherit source data retention policies
- [ ] Prompt injection defenses in place for any user-facing input to LLM path

### 3. Citation Integrity [T1]
- [ ] Factual claims in generated text traceable to retrieved source chunks
- [ ] Citation markers (e.g., `[cite: chunk_id]`) required in generation prompts
- [ ] Post-generation citation audit verifies each citation maps to a real chunk
- [ ] No citations generated from LLM parametric memory (retrieve-then-generate only)
- [ ] Source metadata (url, title, publisher, access_date) preserved through pipeline

### 4. Confidence Scoring [T1]
- [ ] Section-level confidence scores computed (source_alignment, token_match, model_agreement, data_freshness)
- [ ] Scores below 0.50 block content from appearing in output
- [ ] Amber (0.70-0.84) and Red (0.50-0.69) indicators trigger user warnings
- [ ] Output metadata (e.g., Intelligence Receipt) included in document output

### 5. Hallucination Prevention [T1]
- [ ] Generation prompts include grounding instruction: "Only include information from provided context"
- [ ] Financial/numerical figures computed by deterministic engine, NOT by LLM
- [ ] Generated text validated against deterministic computed values (math consistency)
- [ ] Self-Critique and Revision pass for high-stakes document types

### 6. Bias Mitigation [T1] [T2]
- [ ] Prompt templates include balanced framing constraints
- [ ] Competitive analysis requires 2+ sources per competitor claim
- [ ] People-related sections prohibit assumptions about demographics
- [ ] Multi-model consensus reduces single-model bias

### 7. Content Provenance [T1]
- [ ] AI disclosure footer present in all generated documents
- [ ] Output metadata accessible in web preview
- [ ] Verification URL generated for each document (if applicable)
- [ ] Document metadata includes AI-generated content flag

### Disclaimers [T1]
- [ ] Disclaimer footer present in exported documents (configurable per application tier)
- [ ] Terms of Service professional liability exclusion intact

### Audit Trail [T1] [T2]
- [ ] Generation requests logged with user_id, document_type, sources_used, models_used
- [ ] Model decisions logged (which models agreed/disagreed)
- [ ] PII masking actions logged
- [ ] Human review/edit actions logged

## Critical Rules (Non-Negotiable)

1. **LLM NEVER computes financial figures.** All calculations (DCF, WACC, CAGR, Monte Carlo, NPS, churn, penalty estimations) MUST use deterministic computation -- never LLM inference.
2. **No silent fallbacks on safety controls.** If PII masking fails, the request MUST fail -- not silently proceed with unmasked PII.
3. **Cross-tenant data leakage is catastrophic failure.** Every graph query, every RAG retrieval, every generation context MUST be tenant-scoped.
4. **Citations are mandatory for factual claims.** "According to..." without a verifiable source is a hallucination, not a citation.
5. **Confidence below 0.50 = do not include.** Thin evidence is worse than no evidence in professional documents.
