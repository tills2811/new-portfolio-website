import { briefs, tilePalette } from "./data";

export type Tile = { variant: number; line: string; bg: string; fg: string };
export type TileState = { brief: number; cursor: number; nextVariant: number; tiles: Tile[] };

const TILE_COUNT = 6;

function makeTile(brief: number, variant: number, cursor: number): Tile {
  const lines = briefs[brief].lines;
  const [bg, fg] = tilePalette[(variant + cursor) % tilePalette.length];
  return { variant, line: lines[variant % lines.length], bg, fg };
}

export function initialTiles(): TileState {
  const tiles = Array.from({ length: TILE_COUNT }, (_, i) => makeTile(0, i + 1, 0));
  return { brief: 0, cursor: 0, nextVariant: TILE_COUNT + 1, tiles };
}

/** Repaint the tile at cursor % 6 with the next variant. */
export function advance(s: TileState): TileState {
  const slot = s.cursor % TILE_COUNT;
  const tiles = s.tiles.slice();
  tiles[slot] = makeTile(s.brief, s.nextVariant, s.cursor);
  return { ...s, tiles, cursor: s.cursor + 1, nextVariant: s.nextVariant + 1 };
}

/** Switch to the next brief and repaint all six tiles. */
export function regenerate(s: TileState): TileState {
  const brief = (s.brief + 1) % briefs.length;
  const tiles = s.tiles.map((_, i) => makeTile(brief, s.nextVariant + i, s.cursor));
  return { ...s, brief, tiles, nextVariant: s.nextVariant + TILE_COUNT };
}

