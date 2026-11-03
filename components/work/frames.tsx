"use client";

import type { Frame } from "@/lib/types";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Tone = "on-light" | "on-dark" | "plain";

const toneClass: Record<Tone, string> = {
  "on-light": "bg-white/55",
  "on-dark": "bg-white/[0.12]",
  plain: "border-2 border-ink",
};

export default function Frames({
  frames,
  loopNote,
  size = "card",
  tone = "on-light",
}: {
  frames: Frame[];
  loopNote?: string;
  size?: "card" | "page";
  tone?: Tone;
}) {
  const [ref, inView] = useInView<HTMLOListElement>({ rootMargin: "0px 0px -35% 0px", once: true });
  const reduced = useReducedMotion();
  const page = size === "page";

  return (
    <div className="self-end">
      <ol
        ref={ref}
        data-testid="frames"
        className={`frames grid gap-2 ${inView || reduced ? "in" : ""} ${
          page ? "grid-cols-1 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-[repeat(var(--n),minmax(0,1fr))]" : "grid-cols-2 min-[600px]:grid-cols-3 min-[900px]:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
        }`}
        style={{ ["--n" as string]: frames.length }}
      >
        {frames.map((f, i) => (
          <li
            key={f.title}
            className={`fr flex flex-col justify-between gap-3 rounded-md p-2.5 ${toneClass[tone]} ${
              page ? "min-h-[150px] p-4 min-[600px]:min-h-[220px]" : "aspect-[3/4]"
            }`}
          >
            <span data-testid="frame-n" className="text-xs font-bold">
              {i + 1}
            </span>
            <span>
              <span
                className={`block leading-none ${page ? "text-2xl" : "text-[clamp(14px,1.35vw,18px)]"}`}
                style={{ fontVariationSettings: '"wdth" 75', fontWeight: 800 }}
              >
                {f.title}
              </span>
              {page && <span className="mt-2 block text-[15px] leading-snug text-ink-2">{f.detail}</span>}
            </span>
          </li>
        ))}
      </ol>
      {loopNote && <p className="mt-2 text-[13px] font-semibold opacity-75">{loopNote}</p>}
    </div>
  );
}
