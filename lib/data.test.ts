import { describe, expect, it } from "vitest";
import { getProject, projects, skillLayers, tilePalette } from "./data";

describe("content", () => {
  it('every skill "uses" id exists in projects', () => {
    const ids = new Set(projects.map((p) => p.id));
    for (const layer of skillLayers)
      for (const s of layer.skills) for (const u of s.uses) expect(ids.has(u)).toBe(true);
  });

  it('project ids are unique and getProject("brandstream") returns BrandStream', () => {
    const ids = projects.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toEqual(["brandstream", "icontent", "itranslate", "rag-prototype"]);
    expect(getProject("brandstream")?.title).toBe("BrandStream");
    expect(getProject("nope")).toBeUndefined();
  });

  it("prototype has no outcome; every production project has an outcome", () => {
    for (const p of projects) {
      if (p.kind === "prototype") expect(p.outcome).toBeUndefined();
      else expect(p.outcome).toBeTruthy();
    }
    expect(getProject("rag-prototype")?.kind).toBe("prototype");
  });

  it("every production project has a 6-step journey; the prototype has none", () => {
    for (const p of projects) {
      if (p.kind === "production") expect(p.journey).toHaveLength(6);
      else expect(p.journey).toBeUndefined();
    }
  });

  it("tilePalette has 8 pairs", () => {
    expect(tilePalette).toHaveLength(8);
  });

  it("Node.js uses []", () => {
    const node = skillLayers.flatMap((l) => l.skills).find((s) => s.name === "Node.js");
    expect(node?.uses).toEqual([]);
  });

  it('brandstream.loopNote === "Step 4 feeds back into step 2."', () => {
    expect(getProject("brandstream")?.loopNote).toBe("Step 4 feeds back into step 2.");
  });
});
