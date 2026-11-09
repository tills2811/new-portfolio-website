import { describe, expect, it } from "vitest";
import { method } from "./data";
import { methodTiles } from "./tiles";

describe("method tiles", () => {
  it("there are 6 stages, Idea through Adopted, each with a line", () => {
    expect(method.map((m) => m.stage)).toEqual(["Idea", "POC", "Prototype", "v1", "Production", "Adopted"]);
    for (const m of method) expect(m.line.length).toBeGreaterThan(0);
  });

  it("methodTiles follows the method order and gives each tile its own colour", () => {
    const tiles = methodTiles();
    expect(tiles.map((t) => t.stage)).toEqual(method.map((m) => m.stage));
    expect(tiles[0].line).toBe("Start from the user's problem, not the model");
    expect(new Set(tiles.map((t) => t.bg)).size).toBe(6);
  });

  it("text is black on every colour except pine and black tiles", () => {
    for (const t of methodTiles()) {
      if (t.bg === "#0B5D4B") expect(t.fg).toBe("#F2FFF8");
      else if (t.bg === "#000") expect(t.fg).toBe("#FFD43B");
      else expect(t.fg).toBe("#000");
    }
  });
});
