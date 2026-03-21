# SO3: Quality Delivery -- Front-to-Back Quality Gate

Ensures every deliverable (code, UI, document output) meets your project's quality standards, design system, and front-to-back functional validation. This is the quality governance layer for AI-delivered work.

**Customize this for your project.** Replace the placeholder sections below with your project's specific brand tokens, typography, design philosophy, and voice guidelines.

## When This Runs

- **P4.5 (UAT/QA):** Automatically for any work touching frontend or document output
- **P5 (Review):** Quality checklist verification on all UI changes
- **On demand:** `/SO-quality` for standalone design reviews

## Design Philosophy

**Define your project's design philosophy here.** Example: "Clarity over decoration. Every visual element earns its place."

Source: `<your-project>/docs/branding/design_philosophy.md`

## Brand Identity Tokens

Customize these for your project:

| Token | Value | Usage |
|-------|-------|-------|
| Background (dark) | `#______` | Hero, product UI, dark sections |
| Primary Accent | `#______` | CTAs, marks, badges, links |
| Secondary | `#______` | Sub-labels, muted text |
| Text (on dark) | `#______` | Headlines and body on dark backgrounds |

Source: `<your-project>/docs/branding/brand_guide.md`

## Typography

Customize for your project:

| Role | Spec |
|------|------|
| Headlines (display) | Your display font |
| Body | Your body font |
| Monospace | Your monospace font |
| Wordmark | Your brand font |

## Brand Voice Checklist

Before any frontend or document output work passes P4.5/P5:

### Content Quality
- [ ] No banned terms (define your project's banned word list)
- [ ] No sycophantic patterns: "Great question!", "I'd be happy to", "Certainly!", "Absolutely!"
- [ ] No credit-claiming: "I wrote", "I created", "I generated"
- [ ] Product names capitalized correctly (list your product names and correct casing)
- [ ] No inappropriate emoji in branded content (configure per your brand rules)
- [ ] Exclamation mark budget enforced (e.g., max 1 per page in marketing)

### Visual Quality
- [ ] Primary accent color used consistently on CTAs, marks, badges, links
- [ ] Background colors match your design system
- [ ] Typography uses your designated font families
- [ ] No decorative gradients unless they serve a structural purpose
- [ ] Logo system: correct variant for each background context

### Tone Calibration
- [ ] Product UI: Direct and clear. State facts, show status.
- [ ] Marketing: Confident, compelling. Show value, not hype.
- [ ] Error states: Warm and helpful. Use your product's voice, not system language.
- [ ] Humor budget: Define where humor is appropriate (conversation, never documents, etc.)

### Structural Quality
- [ ] Consistent punctuation style (e.g., Oxford comma)
- [ ] Headings in your chosen case style (sentence case, title case, etc.)
- [ ] Number formatting rules applied (spell out 1-9, numerals 10+, etc.)
- [ ] Currency formatting applied (symbol placement, spacing)
- [ ] Em dash style consistent (with or without surrounding spaces)

## Front-to-Back Validation

SO3 ensures features work end-to-end, not just in isolation. The validation chain:

```
Unit Tests (P4)
    -> Integration Test (P4)
        -> UAT Bug Hunting (P4.5)
            -> QA Systematic Testing (P4.5)
                -> Quality + Design Review SO3 (P4.5)
                    -> Code Review (P5)
                        -> Ship Readiness (P7)
```

**The lesson learned:** "Every session passed unit tests, but the feature was dead in production." This validation chain prevents that.

## RAI Integration

When SO3 runs alongside RAI gates (P2.5/P5.5), additional checks:

- Confidence indicators visible in UI where applicable
- Citation display working (hover, footnotes, etc.)
- Disclaimer footer present on generated documents (per your application's rules)
- AI disclosure visible where required

## How to Customize This File

1. Replace all `#______` color values with your brand tokens
2. Replace font names with your project's typography
3. Define your banned terms list
4. Set your product name capitalization rules
5. Configure your humor/emoji/exclamation policies
6. Link to your project's branding documentation
7. Add project-specific quality checks as needed
