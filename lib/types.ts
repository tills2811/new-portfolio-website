export type ProjectId = "brandstream" | "icontent" | "itranslate" | "rag-prototype";

export type Colour = "tomato" | "lilac" | "butter" | "pine" | "sky" | "blush";

export type Frame = { title: string; detail: string };

export type Project = {
  id: ProjectId;
  title: string;
  org: string;
  period: string;
  /** null = outlined prototype card */
  colour: "tomato" | "lilac" | "pine" | null;
  kind: "production" | "prototype";
  summary: string;
  /** one-line problem for the home card */
  problemShort: string;
  /** longer problem text for the case study page */
  problem: string;
  role: string;
  stack: string[];
  /** absent for prototypes */
  outcome?: string;
  frames: Frame[];
  loopNote?: string;
  built: string[];
  screenshots?: { src: string; alt: string }[];
};

export type Role = { when: string; title: string; org: string; line?: string };

export type Skill = { name: string; uses: ProjectId[] };

export type SkillLayer = { name: string; colour: Colour; skills: Skill[] };

export type QuickAnswer = { q: string; a: string };

export type Brief = { text: string; lines: string[] };
