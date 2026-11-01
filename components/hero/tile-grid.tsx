"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { journeyProjects } from "@/lib/data";
import { journeyTiles, nextProject, type Tile } from "@/lib/tiles";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const CYCLE = 8000;
const REPAINT_AT = 280;
const SWAP_LENGTH = 600;
const STAGGER = 90;

function TileCard({ tile, index, swapping }: { tile: Tile; index: number; swapping: boolean }) {
  return (
    <div
      data-testid="tile"
      data-stage={tile.stage}
      data-line={tile.line}
      className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-md p-3.5 shadow-[inset_0_0_0_1px_var(--hair)] ${
        swapping ? "swap animate-[wipe_0.6s_cubic-bezier(.7,0,.2,1)]" : ""
      }`}
      style={{ background: tile.bg, color: tile.fg }}
    >
      <span className="flex items-baseline justify-between text-xs font-semibold">
        <span className="opacity-75">{tile.stage}</span>
        <span className="opacity-60">{index + 1}</span>
      </span>
      <span
        className="text-[clamp(15px,1.45vw,20px)] leading-[0.98]"
        style={{ fontVariationSettings: '"wdth" 72', fontWeight: 800 }}
      >
        {tile.line}
      </span>
    </div>
  );
}

/**
 * The hero's interactive part. `children` is the left column (headline, lede).
 * The tiles show one product's path from idea to adoption and cycle through
 * the production projects.
 */
export default function TileGrid({ children }: { children?: ReactNode }) {
  const [project, setProject] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>(() => journeyTiles(0));
  const [swapping, setSwapping] = useState<ReadonlySet<number>>(() => new Set());
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const projectRef = useRef(project);
  projectRef.current = project;
  const hovered = useRef(false);
  const timers = useRef<Set<number>>(new Set());
  const [cycleKey, setCycleKey] = useState(0);

  const later = (fn: () => void, ms: number) => {
    const id = window.setTimeout(() => {
      timers.current.delete(id);
      fn();
    }, ms);
    timers.current.add(id);
  };
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current.clear();
  };
  const markSwap = (slot: number, on: boolean) =>
    setSwapping((prev) => {
      const next = new Set(prev);
      if (on) next.add(slot);
      else next.delete(slot);
      return next;
    });

  useEffect(() => clearTimers, []);

  const show = (target: number) => {
    clearTimers();
    setSwapping(new Set());
    setProject(target);
    const next = journeyTiles(target);
    if (reduced) {
      setTiles(next);
      return;
    }
    next.forEach((tile, i) => {
      later(() => markSwap(i, true), i * STAGGER);
      later(
        () =>
          setTiles((cur) => {
            const copy = cur.slice();
            copy[i] = tile;
            return copy;
          }),
        i * STAGGER + REPAINT_AT
      );
      later(() => markSwap(i, false), i * STAGGER + SWAP_LENGTH);
    });
  };

  // Auto-advance; restarts whenever the visitor picks a project (cycleKey).
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => {
      if (hovered.current || document.hidden) return;
      show(nextProject(projectRef.current));
    }, CYCLE);
    return () => window.clearInterval(id);
    // show is recreated each render but only reads refs and setters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, inView, cycleKey]);

  const current = journeyProjects[project];

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-12 pb-16 pt-7 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] min-[900px]:pt-14">
      <div>
        {children}
        <div className="mt-[26px] flex max-w-[480px] items-center gap-2.5 rounded-full border-2 border-ink py-1.5 pl-[18px] pr-1.5">
          <span data-testid="journey-project" className="min-w-0 flex-1 truncate text-[15px] text-ink-2">
            <b className="font-semibold text-ink">{current.title}</b>, {current.org}
          </span>
          <button
            type="button"
            className="pill"
            onClick={() => {
              show(nextProject(project));
              setCycleKey((k) => k + 1);
            }}
          >
            Next project
          </button>
        </div>
      </div>
      <div>
        <div
          ref={gridRef}
          data-testid="tiles"
          aria-hidden="true"
          className="grid grid-cols-3 gap-2.5"
          onMouseEnter={() => (hovered.current = true)}
          onMouseLeave={() => (hovered.current = false)}
        >
          {tiles.map((tile, i) => (
            <TileCard key={i} tile={tile} index={i} swapping={swapping.has(i)} />
          ))}
        </div>
        <p className="mt-2.5 text-[13px] text-muted">How each product went from idea to production.</p>
      </div>
    </div>
  );
}
