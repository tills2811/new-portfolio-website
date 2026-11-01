import { describe, expect, it } from "vitest";
import { briefs } from "./data";
import { advance, initialTiles, regenerate } from "./tiles";

describe("tiles", () => {
  it("initialTiles has variants 1..6 from brief 0", () => {
    const s = initialTiles();
    expect(s.brief).toBe(0);
    expect(s.tiles.map((t) => t.variant)).toEqual([1, 2, 3, 4, 5, 6]);
    for (const t of s.tiles) expect(briefs[0].lines).toContain(t.line);
  });

  it("advance changes exactly one tile and increments cursor", () => {
    const s = initialTiles();
    const n = advance(s);
    expect(n.cursor).toBe(s.cursor + 1);
    const changed = n.tiles.filter((t, i) => t !== s.tiles[i]);
    expect(changed).toHaveLength(1);
    expect(n.tiles[0].variant).toBe(7);
  });

  it("six advances touch each tile once", () => {
    let s = initialTiles();
    for (let i = 0; i < 6; i++) s = advance(s);
    expect(s.tiles.map((t) => t.variant)).toEqual([7, 8, 9, 10, 11, 12]);
  });

  it("regenerate cycles brief 0→1→2→0 and changes all tiles", () => {
    let s = initialTiles();
    const seen: number[] = [];
    for (let i = 0; i < 3; i++) {
      const prev = s;
      s = regenerate(s);
      seen.push(s.brief);
      s.tiles.forEach((t, j) => {
        expect(t).not.toBe(prev.tiles[j]);
        expect(briefs[s.brief].lines).toContain(t.line);
      });
    }
    expect(seen).toEqual([1, 2, 0]);
  });
});
