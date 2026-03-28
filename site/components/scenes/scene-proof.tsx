"use client";

import { useRef, useEffect, useState } from "react";

const METRICS = [
  { value: 66, suffix: "+", label: "Production sessions", accent: "var(--cal-green)" },
  { value: 200, suffix: "+", label: "Pull requests merged", accent: "var(--cal-green)" },
  { value: 0, suffix: "", label: "Silent failures", accent: "var(--cal-green-light)" },
  { value: 7, suffix: "", label: "RAI governance gates", accent: "var(--cal-blue)" },
] as const;

const CREDITS = [
  {
    name: "gstack",
    role: "Governor Stack \u2014 structured AI agent workflow governance",
    type: "Architecture",
    href: "https://skills.sh/garrytan/gstack",
    avatar: "https://github.com/nicholasq.png",
    publisher: "garrytan",
    source: "skills.sh",
    color: "#4CAF50",
  },
  {
    name: "superpowers",
    role: "AI agent composition, planning, and code review skills",
    type: "Plugin",
    href: "https://skills.sh/obra",
    avatar: "https://github.com/obra.png",
    publisher: "obra",
    source: "skills.sh",
    color: "#90CAF9",
  },
  {
    name: "document-skills",
    role: "Official PDF, DOCX, PPTX, XLSX generation skills",
    type: "Native",
    href: "https://github.com/anthropic-agent-skills/document-skills",
    publisher: "Anthropic",
    source: "Native",
    color: "#D4A574",
    isAnthropicNative: true,
  },
  {
    name: "ui-ux-pro-max",
    role: "50+ styles, 161 color palettes, 99 UX guidelines",
    type: "Plugin",
    href: "https://uupm.cc",
    publisher: "skills.sh",
    source: "skills.sh",
    color: "#FFB74D",
  },
  {
    name: "everything-claude-code",
    role: "100+ Claude Code skills, agents, hooks, and patterns",
    type: "Plugin",
    href: "https://github.com/affaan-m/everything-claude-code",
    avatar: "https://github.com/affaan-m.png",
    publisher: "affaan-m",
    source: "GitHub",
    color: "#7B73FF",
  },
  {
    name: "autoresearch",
    role: "Karpathy\u2019s autonomous iteration loop \u2014 the original inspiration",
    type: "Inspiration",
    href: "https://github.com/karpathy/autoresearch",
    avatar: "https://github.com/karpathy.png",
    publisher: "karpathy",
    source: "GitHub",
    color: "#FF6B6B",
  },
  {
    name: "skills.sh",
    role: "Open agent skills ecosystem \u2014 discovery, distribution, compatibility",
    type: "Ecosystem",
    href: "https://skills.sh",
    publisher: "skills.sh",
    source: "Ecosystem",
    color: "#4DD0E1",
  },
] as const;

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (target === 0) { setCount(0); return; }
    const startTime = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, active]);
  return count;
}

export function SceneProof() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--ks-deep-space)] py-24"
      aria-labelledby="proof-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(76,175,80,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <p
          className="text-center font-mono text-xs tracking-widest text-[var(--cal-green)] mb-4"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          BATTLE-TESTED
        </p>

        <h2
          id="proof-heading"
          className="text-center font-display text-2xl font-bold text-[var(--ks-text-primary)] md:text-3xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "100ms",
          }}
        >
          Born from production, not theory
        </h2>

        {/* Metric counters */}
        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
          {METRICS.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} index={i} visible={visible} />
          ))}
        </div>

        {/* Pull quote */}
        <blockquote className="mx-auto mt-16 max-w-3xl text-center">
          <p
            className="font-display text-xl italic leading-relaxed text-[var(--ks-text-primary)] md:text-2xl"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease",
              transitionDelay: "700ms",
            }}
          >
            &ldquo;Every skill is scar tissue turned into protocol.&rdquo;
          </p>
        </blockquote>

        {/* Built On — Credits */}
        <div
          className="mt-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.7s ease",
            transitionDelay: "800ms",
          }}
        >
          <p className="text-center font-mono text-xs tracking-widest text-[var(--cal-green)] mb-8">
            BUILT ON THE SHOULDERS OF
          </p>

          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-6 px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {CREDITS.map((credit) => (
              <a
                key={credit.name}
                href={credit.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(76,175,80,0.06)] md:w-72"
              >
                <div className="h-[2px] w-full opacity-30 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundColor: credit.color }} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-4 flex items-center gap-3">
                    {"avatar" in credit && credit.avatar ? (
                      <img
                        src={credit.avatar}
                        alt={`${credit.publisher} avatar`}
                        width={36}
                        height={36}
                        className="rounded-full border border-[var(--ks-border-subtle)] grayscale transition-all duration-500 group-hover:grayscale-0"
                        loading="lazy"
                      />
                    ) : "isAnthropicNative" in credit ? (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ks-border-subtle)] bg-[var(--ks-elevated)]">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zm-7.258 0h3.767L16.906 20.48h-3.674l-1.478-3.882H4.727L3.247 20.48H0l6.57-16.96zm4.063 10.15L7.939 6.573l-2.69 7.097h5.383z" fill="#D4A574" />
                        </svg>
                      </div>
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ks-border-subtle)] bg-[var(--ks-elevated)] font-mono text-[10px] font-bold" style={{ color: credit.color }}>
                        {credit.name.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-widest text-[var(--ks-text-muted)]">{credit.publisher}</p>
                      <span className="inline-block mt-0.5 rounded-full border px-1.5 py-px font-mono text-[7px] uppercase" style={{ borderColor: `${credit.color}33`, color: credit.color, backgroundColor: `${credit.color}0D` }}>
                        {credit.source}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-display text-lg italic text-[var(--ks-text-primary)] transition-colors group-hover:text-white">{credit.name}</h3>
                  <p className="mt-2 flex-1 font-sans text-xs leading-relaxed text-[var(--ks-text-muted)]">{credit.role}</p>
                  <div className="mt-4 flex items-center gap-1 font-mono text-[9px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ color: credit.color }}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M4 12L12 4m0 0H6m6 0v6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View on {credit.source}
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

function MetricCard({
  metric,
  index,
  visible,
}: {
  metric: (typeof METRICS)[number];
  index: number;
  visible: boolean;
}) {
  const count = useCountUp(metric.value, 1800, visible);

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-[var(--ks-border-subtle)] bg-[var(--ks-surface)] p-6 text-center transition-all duration-500 hover:border-[var(--cal-green)]/20"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transitionDelay: `${200 + index * 120}ms`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundColor: metric.accent }}
        aria-hidden="true"
      />
      <div
        className="relative font-mono font-bold leading-none"
        style={{ fontSize: "clamp(48px, 6vw, 72px)", color: metric.accent }}
      >
        {count}{metric.suffix}
      </div>
      <p className="relative mt-3 font-sans text-sm text-[var(--ks-text-secondary)]">
        {metric.label}
      </p>
    </div>
  );
}
