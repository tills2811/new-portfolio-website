import Link from "next/link";
import type { Project } from "@/lib/types";

export default function PrototypeCard({ project, highlighted }: { project: Project; highlighted: boolean }) {
  return (
    <article
      data-project={project.id}
      data-hl={highlighted}
      className="flex flex-wrap items-center justify-between gap-6 rounded-[10px] border-2 border-dashed border-ink px-6 py-6 min-[900px]:px-9"
    >
      <div>
        <h3 className="text-[28px] leading-none" style={{ fontVariationSettings: '"wdth" 70', fontWeight: 800 }}>
          Prototype: {project.title}
        </h3>
        <p className="mt-2 max-w-[70ch] text-[15px] text-ink-2">{project.summary}</p>
      </div>
      <Link
        href={`/work/${project.id}`}
        className="font-bold underline decoration-2 underline-offset-[5px]"
      >
        How it works
      </Link>
    </article>
  );
}
