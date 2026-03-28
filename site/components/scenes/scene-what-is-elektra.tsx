"use client";

import { useRef, useEffect, useState } from "react";

const FILE_TREE = `your-project/
├── CLAUDE.md              # Elektra persona + coding standards
├── .claude/
│   ├── settings.json      # Hook registry + enabled plugins
│   ├── hooks/
│   │   ├── session-init.sh        # Session lifecycle tracking
│   │   ├── cycle-guard.sh         # Plan→Build→Test→Review→Ship
│   │   ├── token-cap-guard.sh     # Context window warnings
│   │   ├── rai-check.sh           # RAI guardrail on edits
│   │   └── quality-gate.sh        # Async lint + format checks
│   └── skills/
│       ├── standard-orders/       # 14-phase execution engine
│       ├── responsible-ai/        # 7-pillar RAI governance
│       └── autoresearch/          # Autonomous iteration loop`;

const USE_CASES = [
  {
    command: "/SO-godspeed",
    title: "Ship a feature across multiple sessions",
    description: "14-phase execution: Context \u2192 Review \u2192 Plan \u2192 Design Review \u2192 Execute \u2192 QA \u2192 Code Review \u2192 Accept \u2192 Ship. Hooks enforce the sequence \u2014 you can\u2019t skip QA.",
    accent: "var(--cal-green)",
  },
  {
    command: "/SO-godspeed-resume",
    title: "Resume where you left off after a crash",
    description: "Reads git status, branch, commits, plan checkboxes, and PR status to auto-detect your phase. If ambiguous, it asks.",
    accent: "var(--cal-blue)",
  },
  {
    command: "/responsible-ai",
    title: "Prevent hallucinated financial figures",
    description: "7-pillar framework: LLMs NEVER compute financial figures (deterministic only). Citations mandatory. Confidence scores surfaced. Every fallback logged.",
    accent: "var(--cal-green-light)",
  },
  {
    command: "/plan-design-review",
    title: "Catch design gaps before writing code",
    description: "P3.5 gate: architecture review + UI/UX gap analysis. Powered by gstack + ui-ux-pro-max.",
    accent: "var(--cal-blue)",
  },
] as const;

export function SceneWhatIsElektra() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--ks-deep-space)] py-24"
      aria-labelledby="elektra-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 40%, rgba(76,175,80,0.03) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Section label */}
        <p
          className="text-center font-mono text-xs tracking-widest text-[var(--cal-green)] mb-4"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          WHAT IS ELEKTRA?
        </p>

        <h2
          id="elektra-heading"
          className="mx-auto max-w-3xl text-center font-display text-2xl font-bold text-[var(--ks-text-primary)] md:text-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "100ms",
          }}
        >
          A delivery-focused AI persona that lives in your <code className="rounded bg-[var(--cal-green-bg)] px-2 py-0.5 font-mono text-[0.85em] text-[var(--cal-green)]">.claude/</code> directory
        </h2>

        <p
          className="mx-auto mt-4 max-w-2xl text-center font-sans text-base leading-relaxed text-[var(--ks-text-secondary)]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s ease",
            transitionDelay: "200ms",
          }}
        >
          Elektra is a <code className="font-mono text-sm text-[var(--cal-green)]">CLAUDE.md</code> persona
          with shell hooks that automatically enforce governance.
          Install once &mdash; every session runs through structured phases with RAI gates.
        </p>

        {/* Journey: Install → Configure → Execute → Ship */}
        <p
          className="mt-12 mb-5 text-center font-mono text-xs tracking-widest text-[var(--cal-green)]"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease",
            transitionDelay: "250ms",
          }}
        >
          YOUR WORKFLOW
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: "1",
              title: "Install",
              desc: "One command. Two minutes. Drop into any project.",
              color: "var(--cal-green)",
            },
            {
              step: "2",
              title: "Configure",
              desc: "CLAUDE.md persona + hooks auto-detect your stack.",
              color: "var(--cal-blue)",
            },
            {
              step: "3",
              title: "Execute",
              desc: "/godspeed runs 14 phases. Plan \u2192 Build \u2192 Test \u2192 Review.",
              color: "var(--cal-green-light)",
            },
            {
              step: "4",
              title: "Ship",
              desc: "Every PR passes governance. RAI gates. Zero silent failures.",
              color: "var(--cal-green)",
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className="relative rounded-xl border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] p-5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.5s ease",
                transitionDelay: `${300 + i * 100}ms`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: item.color }} />
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </span>
                <span className="font-sans text-sm font-semibold text-[var(--ks-text-primary)]">
                  {item.title}
                </span>
              </div>
              <p className="font-mono text-[11px] leading-relaxed text-[var(--ks-text-muted)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column: terminal + use cases */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Terminal mockup — file tree */}
          <div
            className="overflow-hidden rounded-xl border border-[var(--cal-green)]/15 bg-[var(--ks-surface)]"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease",
              transitionDelay: "300ms",
            }}
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-[var(--ks-border-subtle)] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[var(--cal-green)]" />
              <span className="ml-3 font-mono text-[10px] text-[var(--ks-text-muted)]">
                After install &mdash; what you get
              </span>
            </div>
            {/* File tree */}
            <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-[var(--ks-text-secondary)]">
              <code>{FILE_TREE}</code>
            </pre>
          </div>

          {/* How hooks work */}
          <div
            className="space-y-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease",
              transitionDelay: "400ms",
            }}
          >
            <h3 className="font-sans text-lg font-semibold text-[var(--ks-text-primary)]">
              How it works
            </h3>

            {/* Hook flow steps */}
            {[
              { step: "1", title: "Session starts", desc: "session-init.sh creates lifecycle state, tracks phase + tool calls", color: "var(--cal-green)" },
              { step: "2", title: "Before every edit", desc: "Cycle guard enforces Plan \u2192 Build \u2192 Test \u2192 Review \u2192 Ship. RAI check classifies sensitive files.", color: "var(--cal-blue)" },
              { step: "3", title: "After every edit", desc: "Quality gate runs async lint checks. Token guard warns at 140K/170K/190K context.", color: "var(--cal-green-light)" },
              { step: "4", title: "At RAI gates (P2.5, P5.5)", desc: "Files classified into tiers. Critical paths get 7-pillar checklist. No silent bypasses.", color: "var(--cal-green)" },
              { step: "5", title: "At review gates (P3.5, P4.5)", desc: "Plan review validates architecture + design. UAT/QA reviews implementation before merge.", color: "var(--cal-blue)" },
            ].map((item, i) => (
              <div
                key={item.step}
                className="flex gap-4 rounded-lg border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] p-4 transition-all hover:border-[var(--cal-green)]/20"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(20px)",
                  transition: "all 0.5s ease",
                  transitionDelay: `${450 + i * 100}ms`,
                }}
              >
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </span>
                <div>
                  <p className="font-sans text-sm font-medium text-[var(--ks-text-primary)]">{item.title}</p>
                  <p className="mt-0.5 font-mono text-[11px] leading-relaxed text-[var(--ks-text-muted)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use cases */}
        <div className="mt-16">
          <p
            className="text-center font-mono text-xs tracking-widest text-[var(--cal-green)] mb-8"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.6s ease",
              transitionDelay: "700ms",
            }}
          >
            USE CASES
          </p>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((uc, i) => (
              <div
                key={uc.command}
                className="group relative overflow-hidden rounded-xl border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] p-6 transition-all duration-500 hover:border-[var(--cal-green)]/25"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${750 + i * 120}ms`,
                }}
              >
                {/* Accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: uc.accent }} />
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ backgroundColor: uc.accent }}
                  aria-hidden="true"
                />

                <code className="relative inline-block rounded-md bg-[var(--cal-green-bg)] px-2.5 py-1 font-mono text-xs font-bold text-[var(--cal-green)]">
                  {uc.command}
                </code>
                <h4 className="relative mt-3 font-sans text-sm font-semibold text-[var(--ks-text-primary)]">
                  {uc.title}
                </h4>
                <p className="relative mt-2 font-sans text-xs leading-relaxed text-[var(--ks-text-secondary)]">
                  {uc.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
