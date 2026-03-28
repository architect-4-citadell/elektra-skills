"use client";

import { useRef, useEffect, useState } from "react";
import { GITHUB_REPO, INSTALL_CMD } from "@/lib/constants";

export function SceneCtaSkills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 },
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
      className="relative bg-[var(--ks-deep-space)] py-24"
      aria-labelledby="cta-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(76,175,80,0.05) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p
          className="font-mono text-xs tracking-widest text-[var(--cal-green)] mb-4"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          GET STARTED
        </p>

        <h2
          id="cta-heading"
          className="font-display text-2xl font-bold text-[var(--ks-text-primary)] md:text-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "100ms",
          }}
        >
          One command. All skills.
        </h2>

        {/* Install command */}
        <div
          className="mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "200ms",
          }}
        >
          <button
            onClick={handleCopy}
            className="group mx-auto flex w-full max-w-xl items-center gap-3 rounded-xl border border-[var(--cal-green)]/20 bg-[var(--ks-surface)] px-5 py-4 text-left transition-all hover:border-[var(--cal-green)]/50 hover:shadow-[0_0_30px_rgba(76,175,80,0.08)] cursor-pointer"
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
            transitionDelay: "300ms",
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

        {/* Divider */}
        <div
          className="mx-auto my-14 h-px w-full max-w-md"
          style={{
            background: "linear-gradient(90deg, transparent, var(--cal-green)/30, transparent)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease",
            transitionDelay: "400ms",
          }}
        />

        {/* Commercial license */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.7s ease",
            transitionDelay: "500ms",
          }}
        >
          <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--ks-text-muted)]">
            Commercial Use
          </h3>
          <p className="mx-auto mt-3 max-w-lg font-sans text-sm leading-relaxed text-[var(--ks-text-secondary)]">
            Free for individuals and non-commercial projects.
            Building a commercial product with these skills?
          </p>
          <a
            href={`${GITHUB_REPO}/blob/main/COMMERCIAL_LICENSE.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-[var(--cal-green)] transition-colors hover:text-[var(--cal-green-hover)]"
          >
            Get a commercial license
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5" aria-hidden="true">
              <path d="M3 8h10m0 0L9 4m4 4L9 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Built by */}
        <div
          className="mt-14"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease",
            transitionDelay: "600ms",
          }}
        >
          <p className="font-mono text-xs text-[var(--ks-text-muted)]">
            Built by{" "}
            <a
              href="https://citadellabs.ai/about"
              className="text-[var(--ks-text-secondary)] transition-colors hover:text-[var(--cal-green)]"
            >
              Citadel Agentic Labs
            </a>
            {" "}&middot;{" "}
            <a
              href="https://citadellabs.ai"
              className="text-[var(--ks-text-secondary)] transition-colors hover:text-[var(--cal-green)]"
            >
              citadellabs.ai
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
