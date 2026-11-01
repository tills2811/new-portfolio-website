import { roles, skillLayers } from "@/lib/data";
import type { Colour, ProjectId } from "@/lib/types";

const swatch: Record<Colour, string> = {
  tomato: "bg-tomato",
  lilac: "bg-lilac",
  butter: "bg-butter",
  pine: "bg-pine",
  sky: "bg-sky",
  blush: "bg-blush",
};

export default function ExperienceStack({ onSkill }: { onSkill: (uses: ProjectId[] | null) => void }) {
  const clear = () => onSkill(null);
  return (
    <div className="grid gap-14 min-[900px]:grid-cols-[1.1fr_0.9fr]">
      <ol>
        {roles.map((r) => (
          <li
            key={r.title}
            data-testid="role"
            className="grid gap-1 border-b border-hair py-[22px] first:pt-0 min-[900px]:grid-cols-[150px_1fr] min-[900px]:gap-[18px]"
          >
            <span className="pt-1.5 text-sm text-muted">{r.when}</span>
            <div>
              <h3 className="cond text-[34px]">{r.title}</h3>
              <span className="mt-1.5 block font-semibold">{r.org}</span>
              {r.line && <p className="mt-1.5 max-w-[52ch] text-ink-2">{r.line}</p>}
            </div>
          </li>
        ))}
      </ol>
      <div>
        {skillLayers.map((layer) => (
          <div
            key={layer.name}
            data-testid="layer"
            className="grid grid-cols-[14px_1fr] gap-3.5 border-b border-hair py-4 first:pt-0"
          >
            <i className={`mt-[5px] h-3.5 w-3.5 rounded-[3px] ${swatch[layer.colour]}`} aria-hidden="true" />
            <div>
              <h3 className="mb-2.5 text-[15px] font-semibold">{layer.name}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {layer.skills.map((s) => (
                  <li key={s.name}>
                    <button
                      type="button"
                      className="cursor-default rounded-full border-[1.5px] border-ink px-3 py-1.5 text-[15px] font-medium transition-colors hover:bg-ink hover:text-page focus-visible:bg-ink focus-visible:text-page"
                      onMouseEnter={() => onSkill(s.uses)}
                      onFocus={() => onSkill(s.uses)}
                      onMouseLeave={clear}
                      onBlur={clear}
                    >
                      {s.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <p className="mt-3.5 text-sm text-muted">Try Gemini or LangGraph.</p>
      </div>
    </div>
  );
}
