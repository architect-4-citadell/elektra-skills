import { cn } from "@/lib/cn";

/**
 * Citadel Agentic Labs prism mark.
 *
 * Multi-layered wireframe tetrahedron: outer triangle (blue left edge,
 * green right/bottom), inner front face (dark green), central pentagon
 * (darkest green). Creates 3D depth through overlapping geometric planes.
 *
 * Traced from docs/CaL_logos/slack-app-icon.png — the canonical brand mark.
 */

interface CaLPrismProps {
  size?: number;
  className?: string;
}

export function CaLPrism({ size = 32, className }: CaLPrismProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("cal-prism", className)}
      aria-label="Citadel Agentic Labs"
      role="img"
    >
      <defs>
        <linearGradient id="cal-green" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7CB342" />
          <stop offset="50%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>
        <linearGradient id="cal-blue-edge" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#90CAF9" />
          <stop offset="100%" stopColor="#7CB342" />
        </linearGradient>
      </defs>

      {/* Outer triangle — left edge blue, rest light green */}
      <line x1="45" y1="5" x2="8" y2="88" stroke="url(#cal-blue-edge)" strokeWidth="1.5" />
      <line x1="45" y1="5" x2="88" y2="88" stroke="#4CAF50" strokeWidth="1" opacity="0.6" />
      <line x1="8" y1="88" x2="88" y2="88" stroke="#7CB342" strokeWidth="1" opacity="0.5" />

      {/* Inner front face — dark green, thicker */}
      <path
        d="M43 15 L20 72 L78 72 Z"
        stroke="url(#cal-green)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Connecting edges — depth lines */}
      <line x1="45" y1="5" x2="43" y2="15" stroke="#2E7D32" strokeWidth="1.2" />
      <line x1="8" y1="88" x2="20" y2="72" stroke="#4CAF50" strokeWidth="1.2" />
      <line x1="88" y1="88" x2="78" y2="72" stroke="#1B5E20" strokeWidth="1.5" />

      {/* Central pentagon — darkest, thickest */}
      <path
        d="M36 46 L50 42 L58 58 L48 66 L28 58 Z"
        stroke="#1B5E20"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Pentagon to inner triangle connections */}
      <line x1="43" y1="15" x2="36" y2="46" stroke="#2E7D32" strokeWidth="1" opacity="0.7" />
      <line x1="43" y1="15" x2="50" y2="42" stroke="#2E7D32" strokeWidth="1" opacity="0.7" />
      <line x1="20" y1="72" x2="28" y2="58" stroke="#4CAF50" strokeWidth="1" opacity="0.7" />
      <line x1="78" y1="72" x2="58" y2="58" stroke="#1B5E20" strokeWidth="1.2" />
      <line x1="20" y1="72" x2="48" y2="66" stroke="#388E3C" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}
