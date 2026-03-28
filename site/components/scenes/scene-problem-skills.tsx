"use client";

import { useRef, useEffect, useState } from "react";

const PROBLEMS = [
  {
    quote: "AI wrote the code but nobody reviewed the AI",
    detail: "66% of developers skip review on AI-generated code. Silent hallucinations, missing edge cases, and unverified claims ship to production.",
    solution: "responsible-ai",
    accent: "var(--cal-green)",
  },
  {
    quote: "Tests pass but the feature was never wired up",
    detail: "The #1 root cause of \u201cdone but not shipped.\u201d Unit tests green, but the endpoint was never created. The button was never connected.",
    solution: "standard-orders",
    accent: "var(--cal-blue)",
  },
  {
    quote: "We shipped and data leaked across tenants",
    detail: "Silent failures are the most dangerous. No logs, no alerts, no confidence score. The LLM hallucinated a financial figure and nobody caught it.",
    solution: "rai-gates",
    accent: "#EF4444",
  },
] as const;

export function SceneProblemSkills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--ks-deep-space)] py-24"
      aria-labelledby="problem-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(76,175,80,0.03) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <p
          className="text-center font-mono text-xs tracking-widest text-[var(--cal-green)] mb-4"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          THE PROBLEM
        </p>

        <h2
          id="problem-heading"
          className="text-center font-display text-2xl font-bold text-[var(--ks-text-primary)] md:text-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "100ms",
          }}
        >
          Why governance?
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {PROBLEMS.map((problem, i) => (
            <div
              key={problem.solution}
              className="group relative overflow-hidden rounded-xl border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] p-8 transition-all duration-700 hover:border-[var(--ks-border-medium)]"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${200 + i * 150}ms`,
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: problem.accent }} />
              <div
                className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ backgroundColor: problem.accent }}
                aria-hidden="true"
              />

              <p className="relative font-display text-xl italic leading-snug text-[var(--ks-text-primary)]">
                &ldquo;{problem.quote}&rdquo;
              </p>
              <p className="relative mt-4 font-sans text-sm leading-relaxed text-[var(--ks-text-secondary)]">
                {problem.detail}
              </p>
              <div className="relative mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--ks-border-subtle)] px-3 py-1.5">
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: problem.accent }} />
                <span className="font-mono text-[10px] text-[var(--ks-text-muted)]">
                  Solved by <span style={{ color: problem.accent }}>{problem.solution}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <blockquote className="mx-auto mt-14 max-w-3xl text-center">
          <p
            className="font-display text-xl italic leading-relaxed text-[var(--ks-text-primary)] md:text-2xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease",
              transitionDelay: "700ms",
            }}
          >
            We learned each of these the hard way.
          </p>
          <p
            className="mt-3 font-mono text-xs text-[var(--ks-text-muted)]"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s ease",
              transitionDelay: "800ms",
            }}
          >
            &mdash; Citadel Agentic Labs
          </p>
        </blockquote>
      </div>
    </section>
  );
}
