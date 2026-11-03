"use client";

import Link from "next/link";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { projects } from "@/lib/data";
import { methodTiles, type Tile } from "@/lib/tiles";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const TILES = methodTiles();
/** When the staggered reveal has finished and the highlight starts walking. */
const REVEAL = TILES.length * 120 + 600;
const STEP = 1600;

const proof = projects.filter((p) => p.kind === "production");

function TileCard({ tile, index, active }: { tile: Tile; index: number; active: boolean }) {
  return (
    <div
      data-testid="tile"
      data-stage={tile.stage}
      data-active={active}
      className="mt relative flex aspect-[5/4] flex-col min-[480px]:aspect-[4/5] justify-between overflow-hidden rounded-md p-3.5 shadow-[inset_0_0_0_1px_var(--hair)]"
      style={{ background: tile.bg, color: tile.fg }}
    >
      <span className="flex items-baseline justify-between text-xs font-semibold">
        <span className="opacity-75">{tile.stage}</span>
        <span className="opacity-60">{index + 1}</span>
      </span>
      <span
        className="text-[17px] leading-[0.98] min-[480px]:text-[clamp(15px,1.45vw,20px)]"
        style={{ fontVariationSettings: '"wdth" 72', fontWeight: 800 }}
      >
        {tile.line}
      </span>
    </div>
  );
}

/**
 * The hero layout. `children` is the left column (headline, lede, calls to action).
 * The tiles show the six stages from an empty repo to production: they rise in once,
 * then a highlight walks through the stages.
 */
export default function TileGrid({ children }: { children?: ReactNode }) {
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2, once: true });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);
  const hovered = useRef(false);

  useEffect(() => {
    if (reduced || !inView) return;
    let interval: number | undefined;
    const start = window.setTimeout(() => {
      setActive(0);
      interval = window.setInterval(() => {
        if (hovered.current || document.hidden) return;
        setActive((a) => (a + 1) % TILES.length);
      }, STEP);
    }, REVEAL);
    return () => {
      window.clearTimeout(start);
      if (interval !== undefined) window.clearInterval(interval);
    };
  }, [reduced, inView]);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-12 pb-16 pt-7 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] min-[900px]:pt-14">
      <div>{children}</div>
      <div>
        <div
          ref={gridRef}
          data-testid="tiles"
          aria-hidden="true"
          className={`method grid grid-cols-2 gap-2.5 min-[480px]:grid-cols-3 ${inView || reduced ? "in" : ""}`}
          // Touch screens fire mouseenter on tap but no mouseleave, which would freeze the walk.
          onMouseEnter={() => {
            if (window.matchMedia("(hover: hover)").matches) hovered.current = true;
          }}
          onMouseLeave={() => (hovered.current = false)}
        >
          {TILES.map((tile, i) => (
            <TileCard key={tile.stage} tile={tile} index={i} active={!reduced && active === i} />
          ))}
        </div>
        <p className="mt-3 text-[15px] text-ink-2">
          Done three times:{" "}
          {proof.map((p, i) => (
            <span key={p.id}>
              <Link href={`/work/${p.id}`} className="font-semibold text-ink underline decoration-2 underline-offset-4">
                {p.title}
              </Link>
              {i < proof.length - 2 ? ", " : i === proof.length - 2 ? " and " : "."}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
