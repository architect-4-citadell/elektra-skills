import { CaLPrism } from "@/components/logo/cal-prism";
import { GITHUB_REPO, SKILLS_SH_URL } from "@/lib/constants";

const RESOURCE_LINKS = [
  { label: "GitHub", href: GITHUB_REPO, external: true },
  { label: "skills.sh", href: SKILLS_SH_URL, external: true },
  {
    label: "License (CC BY-NC-SA 4.0)",
    href: `${GITHUB_REPO}/blob/main/LICENSE`,
    external: true,
  },
  {
    label: "Commercial License",
    href: `${GITHUB_REPO}#commercial-license`,
    external: true,
  },
] as const;

const CONNECT_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/citadel-agentic-labs",
  },
  {
    label: "GitHub Org",
    href: "https://github.com/architect-4-citadell",
  },
] as const;

/**
 * Site footer for the Elektra Skills marketing site.
 * 3-column grid: brand, resources, connect.
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--ks-border-subtle)]">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CaLPrism size={32} />
              <span className="text-sm font-sans font-medium text-[var(--ks-text-primary)]">
                Citadel Agentic Labs
              </span>
            </div>
            <p className="text-sm text-[var(--ks-text-secondary)] leading-relaxed">
              Governance skills for AI coding agents.
            </p>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-[var(--ks-text-muted)] mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--ks-text-secondary)] hover:text-[var(--ks-text-primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="text-xs font-sans font-semibold uppercase tracking-widest text-[var(--ks-text-muted)] mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--ks-text-secondary)] hover:text-[var(--ks-text-primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--ks-border-subtle)]">
          <p className="text-xs text-[var(--ks-text-muted)] text-center">
            &copy; 2026 Citadel Agentic Labs &middot; CC BY-NC-SA 4.0
          </p>
        </div>
      </div>
    </footer>
  );
}
