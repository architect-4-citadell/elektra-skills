"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { CaLPrism } from "@/components/logo/cal-prism";
import { GITHUB_REPO, INSTALL_CMD } from "@/lib/constants";

/**
 * Fixed navigation bar for the Elektra Skills marketing site.
 * Transparent at top, frosted glass on scroll.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { copied, copy } = useCopyToClipboard();

  useEffect(() => {
    const onScroll = () => setScrolled(globalThis.scrollY > 32);
    onScroll();
    globalThis.addEventListener("scroll", onScroll, { passive: true });
    return () => globalThis.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Site navigation"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--ks-deep-space)]/80 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-[1200px] flex items-center justify-between px-6 py-3">
        {/* Brand — logo + name */}
        <a
          href="#main"
          aria-label="Elektra Skills home"
          className="flex items-center gap-2.5 shrink-0"
        >
          <CaLPrism size={24} />
          <span className="font-display text-sm font-medium text-[var(--ks-text-primary)]">
            Elektra Skills
          </span>
        </a>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-sans font-medium text-[var(--ks-text-secondary)] hover:text-[var(--ks-text-primary)] transition-colors"
          >
            GitHub
          </a>
          <button
            type="button"
            onClick={() => copy(INSTALL_CMD)}
            className={cn(
              "px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors",
              "bg-[var(--cal-green)] text-white hover:bg-[var(--cal-green-hover)]"
            )}
          >
            {copied ? "Copied!" : "Install"}
          </button>
        </div>
      </div>
    </nav>
  );
}
