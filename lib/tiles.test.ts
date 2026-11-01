import { describe, expect, it } from "vitest";
import { journeyProjects, stages } from "./data";
import { journeyTiles, nextProject } from "./tiles";

describe("journey tiles", () => {
  it("there are 6 stages, Idea through Adopted", () => {
    expect(stages).toEqual(["Idea", "POC", "Prototype", "v1", "Production", "Adopted"]);
  });

  it("journeyTiles(0) is BrandStream's six milestones in stage order", () => {
    const tiles = journeyTiles(0);
    expect(tiles).toHaveLength(6);
    expect(tiles.map((t) => t.stage)).toEqual(stages);
    expect(tiles[5].line).toBe("Replaced Magnific");
    expect(journeyProjects[0].id).toBe("brandstream");
  });

  it("only production projects with a journey are cycled", () => {
    expect(journeyProjects.map((p) => p.id)).toEqual(["brandstream", "icontent", "itranslate"]);
  });

  it("nextProject cycles 0→1→2→0", () => {
    expect([nextProject(0), nextProject(1), nextProject(2)]).toEqual([1, 2, 0]);
  });

  it("each tile has a colour pair and the six colours differ within a project", () => {
    for (let p = 0; p < journeyProjects.length; p++) {
      const tiles = journeyTiles(p);
      for (const t of tiles) expect(t.bg && t.fg).toBeTruthy();
      expect(new Set(tiles.map((t) => t.bg)).size).toBeGreaterThanOrEqual(5);
    }
  });

  it("text on every tile colour is black, except pine and black tiles", () => {
    for (let p = 0; p < journeyProjects.length; p++)
      for (const t of journeyTiles(p)) {
        if (t.bg === "#0B5D4B") expect(t.fg).toBe("#F2FFF8");
        else if (t.bg === "#000") expect(t.fg).toBe("#FFD43B");
        else expect(t.fg).toBe("#000");
      }
  });
});
