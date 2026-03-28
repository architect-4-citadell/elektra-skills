"use client";

import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { SceneHeroSkills } from "@/components/scenes/scene-hero-skills";
import { SceneWhatIsElektra } from "@/components/scenes/scene-what-is-elektra";
import { SceneProblemSkills } from "@/components/scenes/scene-problem-skills";
import { SceneSkillsShowcase } from "@/components/scenes/scene-skills-showcase";
import { SceneProof } from "@/components/scenes/scene-proof";
import { SceneCtaSkills } from "@/components/scenes/scene-cta-skills";

/**
 * Elektra Skills — Responsible AI Engineering & Execution Automation
 * 6-scene narrative scroll optimized for GitHub star conversion.
 * By Citadel Agentic Labs.
 */
export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--cal-green)] focus:text-white focus:rounded"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main" data-brand="elektra">
        <SceneHeroSkills />
        <SceneWhatIsElektra />
        <SceneProblemSkills />
        <SceneSkillsShowcase />
        <SceneProof />
        <SceneCtaSkills />
      </main>

      <Footer />
    </>
  );
}
