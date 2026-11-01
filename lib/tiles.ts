import { journeyProjects, stages, tilePalette } from "./data";

export type Tile = { stage: string; line: string; bg: string; fg: string };

/** The six stage tiles for journeyProjects[project]. Colours shift per project. */
export function journeyTiles(project: number): Tile[] {
  const journey = journeyProjects[project].journey ?? [];
  return stages.map((stage, i) => {
    const [bg, fg] = tilePalette[(i + project * 2) % tilePalette.length];
    return { stage, line: journey[i] ?? "", bg, fg };
  });
}

export function nextProject(project: number): number {
  return (project + 1) % journeyProjects.length;
}
