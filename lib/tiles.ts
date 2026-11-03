import { method, tilePalette } from "./data";

export type Tile = { stage: string; line: string; bg: string; fg: string };

/** The six hero tiles: one per stage of going from an empty repo to production. */
export function methodTiles(): Tile[] {
  return method.map(({ stage, line }, i) => {
    const [bg, fg] = tilePalette[i % tilePalette.length];
    return { stage, line, bg, fg };
  });
}
