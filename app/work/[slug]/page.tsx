import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectBg } from "@/components/work/case-card";
import Frames from "@/components/work/frames";
import { getProject, projects } from "@/lib/data";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const p = getProject(params.slug);
  return p ? { title: `${p.title}, Shreyash Arali`, description: p.summary } : {};
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)] gap-4 border-t-[3px] border-ink pt-6 min-[900px]:grid-cols-[minmax(0,280px)_minmax(0,1fr)] min-[900px]:gap-10">
      <h2 className="cond text-[40px]">{title}</h2>
      <div className="max-w-[68ch] text-ink-2">{children}</div>
    </section>
  );
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const prototype = project.kind === "prototype";
  const header = prototype ? "border-2 border-dashed border-ink" : projectBg[project.colour ?? "tomato"];

  const facts: [string, string][] = [
    ["Role", project.role],
    ["Stack", project.stack.join(", ")],
    ["Timeline", `${project.org}, ${project.period}`],
  ];
  if (project.outcome) facts.push(["Outcome", project.outcome]);

  return (
    <main className="wrap pb-10 pt-8">
      <header className={`rounded-[10px] p-6 min-[900px]:p-12 ${header}`}>
        {prototype ? (
          <span className="text-sm font-semibold">Prototype</span>
        ) : (
          <span className="text-sm font-semibold opacity-75">
            {project.org}, {project.period}
          </span>
        )}
        <h1 className="cond mt-3 text-[clamp(64px,8.4vw,120px)]">{project.title}</h1>
        <p className="mt-5 max-w-[48ch] text-lg">{project.summary}</p>
      </header>

      <dl className="my-12 grid grid-cols-1 gap-6 min-[600px]:grid-cols-2 min-[900px]:grid-cols-4">
        {facts.map(([k, v]) => (
          <div key={k}>
            <dt className="text-sm font-semibold text-muted">{k}</dt>
            <dd className="mt-1 font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-16">
        <Section title="The problem">
          <p className="text-lg">{project.problem}</p>
        </Section>
        <Section title="How it works">
          <Frames frames={project.frames} loopNote={project.loopNote} size="page" tone="plain" />
        </Section>
        <Section title="What I built">
          <ul className="grid list-disc gap-2 pl-5 text-lg">
            {project.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </Section>
        {project.outcome && (
          <Section title="Result">
            <p className="text-2xl font-bold text-ink">{project.outcome}</p>
          </Section>
        )}
      </div>

      <Link
        href={`/work/${next.id}`}
        className="mt-20 block rounded-[10px] border-2 border-ink p-6 no-underline transition-transform hover:-translate-y-0.5 min-[900px]:p-9"
      >
        <span className="text-sm font-semibold text-muted">Next case study</span>
        <span className="cond mt-2 block text-[clamp(40px,4.6vw,64px)]">{next.title}</span>
      </Link>
    </main>
  );
}
