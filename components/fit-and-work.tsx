"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import type { ProjectId } from "@/lib/types";
import ExperienceStack from "./experience-stack";
import SectionHead from "./section-head";
import CaseCard from "./work/case-card";
import PrototypeCard from "./work/prototype-card";

export default function FitAndWork() {
  // null = no highlight. A skill no project uses (empty list) also means no highlight.
  const [active, setActive] = useState<ProjectId[] | null>(null);
  const onSkill = (uses: ProjectId[] | null) => setActive(uses && uses.length > 0 ? uses : null);
  const dim = active !== null;

  return (
    <>
      <section id="exp" className="wrap pt-[110px]">
        <SectionHead title="Experience and stack" hint="Hover a skill to see which projects use it." />
        <ExperienceStack onSkill={onSkill} />
      </section>
      <section id="work" className="wrap pt-[110px]">
        <SectionHead title="Selected work" hint="All three were built from scratch and taken from POC to production." />
        <div data-testid="work-list" data-dim={dim} className="work-list grid gap-[18px]">
          {projects.map((p) => {
            const hl = dim && active.includes(p.id);
            return p.kind === "prototype" ? (
              <PrototypeCard key={p.id} project={p} highlighted={hl} />
            ) : (
              <CaseCard key={p.id} project={p} highlighted={hl} />
            );
          })}
        </div>
      </section>
    </>
  );
}
