"use client";

import { useRef, useEffect, useState } from "react";
import { GITHUB_REPO, INSTALL_CMD } from "@/lib/constants";

const AGENTS = [
  { name: "Claude Code", icon: "CC", color: "#D4A574" },
  { name: "Cursor", icon: "Cu", color: "#A855F7" },
  { name: "Windsurf", icon: "Ws", color: "#06B6D4" },
  { name: "GitHub Copilot", icon: "Cp", color: "#6E7681" },
  { name: "Cline", icon: "Cl", color: "#EF4444" },
  { name: "Roo Code", icon: "Rc", color: "#22C55E" },
  { name: "Aider", icon: "Ai", color: "#F59E0B" },
  { name: "Codex", icon: "Cx", color: "#3B82F6" },
] as const;

export function SceneHeroSkills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] flex items-center bg-[var(--ks-deep-space)] pt-28 pb-24 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* CaL green/blue radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 50% 40% at 50% 35%, rgba(76,175,80,0.07) 0%, transparent 70%)",
            "radial-gradient(ellipse 40% 30% at 60% 45%, rgba(144,202,249,0.04) 0%, transparent 60%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(76,175,80,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(76,175,80,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Experiment + org badge */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--cal-green)]/25 bg-[var(--cal-green-bg)] px-4 py-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--cal-green)]" style={{ animation: "pulse 2s ease-in-out infinite" }} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--cal-green)]">
              Experiment 002 &middot; Citadel Agentic Labs
            </span>
          </span>
        </div>

        {/* Title with gradient text */}
        <h1
          id="hero-heading"
          className="mt-8 font-display font-bold tracking-tight"
          style={{
            fontSize: "clamp(48px, 8vw, 88px)",
            lineHeight: 0.95,
            background: "linear-gradient(135deg, var(--cal-green-light) 0%, var(--cal-green) 40%, var(--cal-blue) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "100ms",
          }}
        >
          Elektra Skills
        </h1>

        {/* Subtitle */}
        <p
          className="mt-5 font-sans text-lg font-medium tracking-wide text-[var(--cal-green-light)] md:text-xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "200ms",
          }}
        >
          Governance skills for AI coding agents
        </p>

        {/* Tagline */}
        <p
          className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-[var(--ks-text-secondary)] md:text-lg"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "300ms",
          }}
        >
          Install a <code className="rounded bg-[var(--cal-green-bg)] px-1.5 py-0.5 font-mono text-sm text-[var(--cal-green)]">CLAUDE.md</code> persona
          that enforces governance automatically. 14-phase execution engine.
          <br className="hidden md:block" />
          RAI gates. Design review. Quality checks. Zero silent failures.
        </p>

        {/* Install command */}
        <div
          className="mx-auto mt-10 max-w-xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "400ms",
          }}
        >
          <button
            onClick={handleCopy}
            className="group flex w-full items-center gap-3 rounded-xl border border-[var(--cal-green)]/20 bg-[var(--ks-surface)] px-5 py-4 text-left transition-all hover:border-[var(--cal-green)]/50 hover:shadow-[0_0_30px_rgba(76,175,80,0.08)] cursor-pointer"
            aria-label="Copy install command"
          >
            <span className="font-mono text-sm text-[var(--cal-green)]">$</span>
            <code className="flex-1 font-mono text-sm text-[var(--ks-text-primary)]">
              {INSTALL_CMD}
            </code>
            <span className="shrink-0 rounded-md bg-[var(--cal-green-bg)] px-2.5 py-1 font-mono text-xs text-[var(--cal-green)] transition-all group-hover:bg-[var(--cal-green)]/20">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>

        {/* Action buttons */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "500ms",
          }}
        >
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--cal-green)] px-6 py-3 font-sans text-sm font-semibold text-white transition-all hover:bg-[var(--cal-green-hover)] hover:shadow-[0_0_24px_rgba(76,175,80,0.35)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
          <a
            href="https://skills.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--ks-border-medium)] px-6 py-3 font-sans text-sm font-medium text-[var(--ks-text-secondary)] transition-all hover:border-[var(--cal-green)]/40 hover:text-[var(--ks-text-primary)]"
          >
            View on skills.sh
          </a>
        </div>

        {/* Agent compatibility */}
        <div
          className="mt-16"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease",
            transitionDelay: "600ms",
          }}
        >
          <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-[var(--ks-text-muted)]">
            Works with 30+ AI coding agents
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6">
            {AGENTS.map((agent, i) => (
              <div
                key={agent.name}
                className="flex flex-col items-center gap-2"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: "all 0.5s ease",
                  transitionDelay: `${650 + i * 60}ms`,
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--ks-surface)] transition-all duration-300 hover:bg-[var(--ks-elevated)]"
                  style={{ border: `1px solid ${agent.color}25` }}
                >
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: agent.color }}
                  >
                    {agent.icon}
                  </span>
                </div>
                <span className="font-mono text-[8px] text-[var(--ks-text-muted)] whitespace-nowrap">
                  {agent.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
