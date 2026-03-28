"use client";

import { useRef, useEffect, useState } from "react";

const GITHUB_BASE = "https://github.com/architect-4-citadell/elektra-skills/tree/main";

interface Skill {
  name: string;
  version: string;
  description: string;
  detail?: string;
  useCase?: string;
  href: string;
  flagship?: boolean;
}

const SKILLS: Skill[] = [
  {
    name: "responsible-ai",
    version: "v1.0.0",
    description: "7-pillar governance framework",
    detail: "PII protection · Citation integrity · Hallucination prevention · Confidence scoring · Bias mitigation · Content provenance · Human-in-the-loop",
    useCase: "\"LLMs should NEVER compute financial figures. Use deterministic computation.\"",
    href: `${GITHUB_BASE}/responsible-ai`,
    flagship: true,
  },
  {
    name: "standard-orders",
    version: "v4.1.1",
    description: "14-phase idea-to-ship execution engine",
    detail: "P0 Context → P1 Review → P2 Eng → P3 Plan → P4 Execute → P4.5 QA → P5 Code Review → P6 Accept → P7 Ship → P8 Close",
    useCase: "Every feature goes through 14 phases. You can\u2019t skip QA. You can\u2019t ship without review.",
    href: `${GITHUB_BASE}/standard-orders`,
    flagship: true,
  },
  {
    name: "autoresearch",
    version: "v1.4.0",
    description: "Autonomous goal-directed iteration",
    href: `${GITHUB_BASE}/autoresearch`,
  },
  {
    name: "godspeed",
    version: "v1.0.0",
    description: "Direct entry to 14-phase execution",
    href: `${GITHUB_BASE}/godspeed`,
  },
  {
    name: "godspeed-resume",
    version: "v1.1.0",
    description: "Self-healing cross-session resume",
    href: `${GITHUB_BASE}/godspeed-resume`,
  },
  {
    name: "project-mgmt",
    version: "v1.0.0",
    description: "GitHub-powered PM routine",
    href: `${GITHUB_BASE}/project-mgmt`,
  },
];

interface CompanionSkill {
  name: string;
  badge: "required" | "recommended" | "optional";
  description: string;
  color: string;
  href: string;
}

const COMPANION_SKILLS: CompanionSkill[] = [
  {
    name: "gstack",
    badge: "required",
    description: "Governor Stack: QA, review, browser testing, ship workflows",
    color: "#4CAF50",
    href: "https://skills.sh/garrytan/gstack",
  },
  {
    name: "superpowers",
    badge: "required",
    description: "Planning, code review, parallel agent dispatch",
    color: "#90CAF9",
    href: "https://skills.sh/obra/superpowers",
  },
  {
    name: "ui-ux-pro-max",
    badge: "recommended",
    description: "50+ styles, 161 color palettes, 99 UX guidelines",
    color: "#FFB74D",
    href: "https://uupm.cc",
  },
  {
    name: "claude-mem",
    badge: "recommended",
    description: "Persistent memory search across sessions",
    color: "#E0E0E0",
    href: "https://skills.sh/thedotmack/claude-mem",
  },
  {
    name: "everything-claude-code",
    badge: "optional",
    description: "100+ agent meta-skills: TDD, build resolution, code review",
    color: "#7B73FF",
    href: "https://github.com/affaan-m/everything-claude-code",
  },
];

export function SceneSkillsShowcase() {
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

  const flagships = SKILLS.filter((s) => s.flagship);
  const supporting = SKILLS.filter((s) => !s.flagship);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--ks-deep-space)] py-24"
      aria-labelledby="skills-heading"
    >
      <div className="relative mx-auto max-w-6xl px-6">
        <p
          className="text-center font-mono text-xs tracking-widest text-[var(--cal-green)] mb-4"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          THE SKILLS
        </p>

        <h2
          id="skills-heading"
          className="text-center font-display text-2xl font-bold text-[var(--ks-text-primary)] md:text-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "100ms",
          }}
        >
          What you get
        </h2>

        {/* Flagship skills */}
        <div className="mt-14 space-y-5">
          {flagships.map((skill, i) => (
            <a
              key={skill.name}
              href={skill.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className="relative overflow-hidden rounded-xl border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] p-8 transition-all duration-500 hover:border-[var(--cal-green)]/30 hover:shadow-[0_0_40px_rgba(76,175,80,0.04)] md:p-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: "all 0.7s ease",
                  transitionDelay: `${200 + i * 150}ms`,
                }}
              >
                {/* Green gradient top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: "linear-gradient(90deg, var(--cal-green), var(--cal-blue))" }}
                />
                <div
                  className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.06]"
                  style={{ backgroundColor: "var(--cal-green)" }}
                  aria-hidden="true"
                />

                <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-mono text-lg font-bold text-[var(--ks-text-primary)]">
                        {skill.name}
                      </h3>
                      <span className="rounded-full border border-[var(--cal-green)]/20 bg-[var(--cal-green-bg)] px-2.5 py-0.5 font-mono text-[10px] text-[var(--cal-green)]">
                        {skill.version}
                      </span>
                    </div>
                    <p className="mt-2 font-sans text-base text-[var(--ks-text-secondary)]">
                      {skill.description}
                    </p>
                    {skill.detail && (
                      <p className="mt-3 font-mono text-xs leading-relaxed text-[var(--ks-text-muted)]">
                        {skill.detail}
                      </p>
                    )}
                    {skill.useCase && (
                      <div className="mt-4 rounded-lg border border-[var(--cal-green)]/10 bg-[var(--cal-green-bg)] px-4 py-2.5">
                        <p className="font-mono text-xs text-[var(--cal-green)]">
                          {skill.useCase}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2 text-sm font-medium text-[var(--cal-green)] opacity-60 transition-opacity group-hover:opacity-100">
                    View on GitHub
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4" aria-hidden="true">
                      <path d="M3 8h10m0 0L9 4m4 4L9 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Supporting skills — 2x2 */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {supporting.map((skill, i) => (
            <a
              key={skill.name}
              href={skill.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div
                className="relative overflow-hidden rounded-xl border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] p-6 transition-all duration-500 hover:border-[var(--cal-green)]/25"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(24px)",
                  transition: "all 0.6s ease",
                  transitionDelay: `${500 + i * 100}ms`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-mono text-sm font-bold text-[var(--ks-text-primary)]">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-[10px] text-[var(--ks-text-muted)]">
                      {skill.version}
                    </span>
                  </div>
                  <svg viewBox="0 0 16 16" fill="none" stroke="var(--ks-text-muted)" strokeWidth="1.5" className="h-3.5 w-3.5 transition-colors group-hover:stroke-[var(--cal-green)]" aria-hidden="true">
                    <path d="M3 8h10m0 0L9 4m4 4L9 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="mt-2 font-sans text-sm text-[var(--ks-text-secondary)]">
                  {skill.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Companion Skill Ecosystem */}
        <div
          className="mt-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "900ms",
          }}
        >
          <p className="text-center font-mono text-xs tracking-widest text-[var(--cal-green)] mb-8">
            WORKS WITH
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPANION_SKILLS.map((companion) => (
              <a
                key={companion.name}
                href={companion.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative overflow-hidden rounded-xl border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] p-5 transition-all duration-500 hover:border-opacity-40 hover:shadow-[0_0_30px_rgba(76,175,80,0.04)]"
                  style={{ ["--companion-color" as string]: companion.color }}
                >
                  {/* Accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ backgroundColor: companion.color }}
                  />
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.06]"
                    style={{ backgroundColor: companion.color }}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-mono text-sm font-bold text-[var(--ks-text-primary)]">
                        {companion.name}
                      </h3>
                      <span
                        className="rounded-full border px-2 py-px font-mono text-[9px] uppercase tracking-wide"
                        style={{
                          borderColor: `${companion.color}33`,
                          color: companion.color,
                          backgroundColor: `${companion.color}0D`,
                        }}
                      >
                        {companion.badge}
                      </span>
                    </div>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-[var(--ks-text-muted)]">
                      {companion.description}
                    </p>
                    <div
                      className="mt-3 flex items-center gap-1 font-mono text-[9px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ color: companion.color }}
                    >
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M4 12L12 4m0 0H6m6 0v6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Install
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
