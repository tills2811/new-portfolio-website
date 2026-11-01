import Link from "next/link";
import type { Project } from "@/lib/types";
import Frames from "./frames";

export const projectBg: Record<NonNullable<Project["colour"]>, string> = {
  tomato: "bg-tomato text-black",
  lilac: "bg-lilac text-black",
  pine: "bg-pine text-on-pine",
};

export default function CaseCard({ project, highlighted }: { project: Project; highlighted: boolean }) {
  const colour = project.colour ?? "tomato";
  return (
    <article
      data-project={project.id}
      data-hl={highlighted}
      className={`grid grid-cols-[minmax(0,1fr)] gap-10 rounded-[10px] p-6 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] min-[900px]:p-9 ${projectBg[colour]}`}
    >
      <div>
        <span className="text-sm font-semibold opacity-75">
          {project.org}, {project.period}
        </span>
        <h3 className="cond mb-[18px] mt-2 text-[clamp(40px,4.6vw,64px)]">{project.title}</h3>
        <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-2 text-base">
          <dt className="font-semibold opacity-70">Problem</dt>
          <dd>{project.problemShort}</dd>
          <dt className="font-semibold opacity-70">Role</dt>
          <dd>{project.role}</dd>
          {project.outcome && (
            <>
              <dt className="font-semibold opacity-70">Outcome</dt>
              <dd className="font-bold">{project.outcome}</dd>
            </>
          )}
        </dl>
        <Link
          href={`/work/${project.id}`}
          className="mt-[22px] inline-block font-bold underline decoration-2 underline-offset-[5px]"
        >
          Read the case study
        </Link>
      </div>
      <Frames frames={project.frames} loopNote={project.loopNote} tone={colour === "pine" ? "on-dark" : "on-light"} />
    </article>
  );
}
