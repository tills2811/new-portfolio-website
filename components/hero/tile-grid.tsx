"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { briefs } from "@/lib/data";
import { advance, initialTiles, regenerate, type Tile, type TileState } from "@/lib/tiles";
import { useInView } from "@/lib/use-in-view";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const INTERVAL = 1600;
const REPAINT_AT = 280;
const SWAP_LENGTH = 600;
const STAGGER = 90;

function Bottle({ colour }: { colour: string }) {
  return (
    <svg viewBox="0 0 40 70" className="absolute right-3.5 top-3.5 w-[28%]" aria-hidden="true">
      <rect x="14" y="2" width="12" height="12" rx="2" fill={colour} />
      <rect x="6" y="14" width="28" height="54" rx="8" fill="none" stroke={colour} strokeWidth="3" />
      <rect x="11" y="34" width="18" height="12" rx="2" fill={colour} />
    </svg>
  );
}

function TileCard({ tile, swapping }: { tile: Tile; swapping: boolean }) {
  return (
    <div
      data-testid="tile"
      data-variant={tile.variant}
      className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-md p-3.5 shadow-[inset_0_0_0_1px_var(--hair)] ${
        swapping ? "swap animate-[wipe_0.6s_cubic-bezier(.7,0,.2,1)]" : ""
      }`}
      style={{ background: tile.bg, color: tile.fg }}
    >
      <span className="relative text-xs font-semibold opacity-75">variant {tile.variant}</span>
      <span
        className="relative text-[clamp(17px,1.9vw,24px)] leading-[0.95]"
        style={{ fontVariationSettings: '"wdth" 72', fontWeight: 800 }}
      >
        {tile.line}
      </span>
      <Bottle colour={tile.fg} />
    </div>
  );
}

/**
 * The hero's interactive part. `children` is the left column (headline, lede);
 * the brief pill sits under it and shares state with the tiles on the right.
 */
export default function TileGrid({ children }: { children?: ReactNode }) {
  const [state, setState] = useState<TileState>(initialTiles);
  const [swapping, setSwapping] = useState<ReadonlySet<number>>(() => new Set());
  const [gridRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const stateRef = useRef(state);
  stateRef.current = state;
  const hovered = useRef(false);
  const timers = useRef<number[]>([]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  const markSwap = (slot: number, on: boolean) =>
    setSwapping((prev) => {
      const next = new Set(prev);
      if (on) next.add(slot);
      else next.delete(slot);
      return next;
    });

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => {
      if (hovered.current || document.hidden) return;
      const slot = stateRef.current.cursor % 6;
      markSwap(slot, true);
      later(() => setState(advance), REPAINT_AT);
      later(() => markSwap(slot, false), SWAP_LENGTH);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [reduced, inView]);

  const generate = () => {
    clearTimers();
    setSwapping(new Set());
    const target = regenerate(stateRef.current);
    if (reduced) {
      setState(target);
      return;
    }
    // Switch the brief now; repaint tiles one by one.
    setState((s) => ({ ...s, brief: target.brief, nextVariant: target.nextVariant }));
    target.tiles.forEach((tile, i) => {
      later(() => markSwap(i, true), i * STAGGER);
      later(
        () =>
          setState((cur) => {
            const tiles = cur.tiles.slice();
            tiles[i] = tile;
            return { ...cur, tiles };
          }),
        i * STAGGER + REPAINT_AT
      );
      later(() => markSwap(i, false), i * STAGGER + SWAP_LENGTH);
    });
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-12 pb-16 pt-7 min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] min-[900px]:pt-14">
      <div>
        {children}
        <div className="mt-[26px] flex max-w-[480px] items-center gap-2.5 rounded-full border-2 border-ink py-1.5 pl-[18px] pr-1.5">
          <span className="min-w-0 flex-1 truncate text-[15px] text-ink-2">{briefs[state.brief].text}</span>
          <button type="button" className="pill" onClick={generate}>
            Generate
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
          {state.tiles.map((tile, i) => (
            <TileCard key={i} tile={tile} swapping={swapping.has(i)} />
          ))}
        </div>
        <p className="mt-2.5 text-[13px] text-muted">Illustrative variants, not client work.</p>
      </div>
    </div>
  );
}
