import type { Project, QuickAnswer, Role, SkillLayer } from "./types";

export const contactLinks = {
  email: "shreyasharali2811@gmail.com",
  linkedin: "https://www.linkedin.com/in/shreyash-arali-974498213/",
  github: "https://github.com/tills2811",
};

export const fitBand: { value: string; label: string }[] = [
  { value: "3+ years", label: "shipping production apps" },
  { value: "Next.js, React, TS", label: "front end" },
  { value: "Python, FastAPI, LangGraph", label: "back end and AI" },
  { value: "Pune or remote", label: "2-month notice" },
];

export const roles: Role[] = [
  {
    when: "Oct 2025 – now",
    title: "Software Engineer",
    org: "THG Ingenuity",
    line: "Full-stack on BrandStream, an AI creative and Meta campaign platform built from scratch.",
  },
  {
    when: "Jul 2023 – Oct 2025",
    title: "Software Developer",
    org: "Harbinger Group",
    line: "Took iContent and iTranslate from POC to product, with 5–6 corporate clients onboarded.",
  },
  { when: "Feb – Nov 2022", title: "Web Developer / Designer Intern", org: "Aniworks Pvt. Ltd." },
  { when: "2019 – 2023", title: "B.E. Computer Engineering", org: "MMCOE Pune, CGPA 8.8" },
];

export const skillLayers: SkillLayer[] = [
  {
    name: "Interface",
    colour: "tomato",
    skills: [
      { name: "Next.js", uses: ["brandstream", "icontent", "itranslate"] },
      { name: "React", uses: ["brandstream", "icontent", "itranslate"] },
      { name: "TypeScript", uses: ["brandstream", "icontent", "itranslate"] },
      { name: "Tailwind", uses: ["brandstream", "icontent"] },
    ],
  },
  {
    name: "Services",
    colour: "lilac",
    skills: [
      { name: "Python", uses: ["brandstream", "icontent", "itranslate", "rag-prototype"] },
      { name: "FastAPI", uses: ["brandstream", "icontent", "itranslate", "rag-prototype"] },
      { name: "Node.js", uses: [] },
    ],
  },
  {
    name: "AI",
    colour: "butter",
    skills: [
      { name: "LangChain", uses: ["brandstream", "icontent", "itranslate", "rag-prototype"] },
      { name: "LangGraph", uses: ["brandstream", "icontent", "itranslate"] },
      { name: "OpenAI", uses: ["icontent", "itranslate", "rag-prototype"] },
      { name: "Gemini", uses: ["brandstream"] },
      { name: "Freepik models", uses: ["brandstream"] },
      { name: "RAG", uses: ["rag-prototype"] },
    ],
  },
  {
    name: "Data and cloud",
    colour: "pine",
    skills: [
      { name: "PostgreSQL", uses: ["brandstream"] },
      { name: "Redis", uses: ["brandstream"] },
      { name: "MongoDB", uses: ["icontent"] },
      { name: "GCP", uses: ["brandstream"] },
      { name: "FAISS", uses: ["rag-prototype"] },
    ],
  },
];

export const projects: Project[] = [
  // DRAFT: review with Shreyash (problem, frame details, built)
  {
    id: "brandstream",
    title: "BrandStream",
    org: "THG Ingenuity",
    period: "Oct 2025 – now",
    colour: "tomato",
    kind: "production",
    summary:
      "An AI creative and campaign platform: brief in, ad creatives out, launched on Meta and improved from the results.",
    problemShort:
      "Hundreds of beauty and fitness products need fresh ad creatives, and the tools making them weren't connected to ad results.",
    problem:
      "THG runs paid campaigns for hundreds of beauty and fitness products. Every product needs a steady stream of fresh ad creatives, and the tools the team used to make them, such as Magnific, sat apart from the ad accounts. Nobody could see which creative actually performed and feed that straight back into the next round.",
    role: "Full-stack: Next.js front end, FastAPI services, model and Meta integrations.",
    stack: [
      "Next.js",
      "Python",
      "FastAPI",
      "LangChain",
      "LangGraph",
      "PostgreSQL",
      "Redis",
      "GCP",
      "Gemini",
      "Freepik (Mystic, Seedream)",
    ],
    outcome: "Replaced Magnific for every internal team.",
    frames: [
      {
        title: "Brief and product photo",
        detail: "A brand team writes a short brief and uploads the product image.",
      },
      {
        title: "Generate creatives",
        detail:
          "LangGraph workflows prompt Gemini and Freepik's image models (Mystic, Seedream) to produce on-brand variants.",
      },
      {
        title: "Launch on Meta",
        detail: "Chosen creatives go straight into a Meta campaign, created from inside BrandStream.",
      },
      {
        title: "Read results, optimise",
        detail:
          "Campaign performance flows back in, and the next round of creatives is tuned towards what worked.",
      },
    ],
    loopNote: "Step 4 feeds back into step 2.",
    built: [
      "Built the product from an empty repo, from POC to the tool every internal team uses.",
      "Next.js interface for briefs, creative review and campaign monitoring.",
      "FastAPI services that orchestrate generation across Gemini and Freepik models.",
      "Meta integration to create campaigns and pull performance data back in.",
    ],
  },
  // DRAFT: review with Shreyash (problem, frame details, built)
  {
    id: "icontent",
    title: "iContent",
    org: "Harbinger Group",
    period: "Jul 2023 – Oct 2025",
    colour: "lilac",
    kind: "production",
    summary: "An AI course production platform that turns a source document into a finished L&D course.",
    problemShort: "Each corporate L&D course took the creative team 1–1.5 days of manual work.",
    problem:
      "Harbinger's creative team builds L&D courses for corporate clients. Turning a client's source document into chapters, a storyboard and finished creatives took 1–1.5 days of manual work for every course.",
    role: "Full-stack, including the LangGraph agent workflow.",
    stack: ["Next.js", "Python", "FastAPI", "LangChain", "LangGraph", "MongoDB", "OpenAI"],
    outcome: "Courses in 2–4 hours (~60% faster). 50+ produced, 20+ internal users, 5–6 clients onboarded.",
    frames: [
      { title: "Upload document", detail: "The team uploads the client's course material." },
      { title: "Split into chapters", detail: "An agent breaks the document into a chapter structure." },
      { title: "Storyboard", detail: "Each chapter gets a storyboard and outline the team can edit." },
      {
        title: "Generate creatives",
        detail: "Creatives are generated for the storyboard, such as an AI presenter.",
      },
      { title: "Package course", detail: "Everything is packaged into a finished course." },
    ],
    built: [
      "Took the platform from POC to a product used by 20+ people and external clients.",
      "Agent workflows in LangChain and LangGraph for outlines, storyboards and quizzes.",
      "Next.js interface and FastAPI microservices for real-time generation.",
    ],
  },
  // DRAFT: review with Shreyash (problem, frame details, built)
  {
    id: "itranslate",
    title: "iTranslate",
    org: "Harbinger Group",
    period: "Jul 2023 – Oct 2025",
    colour: "pine",
    kind: "production",
    summary: "Course localisation: upload a course once and get it back in 30+ languages.",
    problemShort: "Clients need every course in many languages, and manual translation is slow and expensive.",
    problem:
      "Corporate clients need every course in many languages, and translating each one by hand is slow and expensive.",
    role: "Full-stack, from Next.js to the Python translation workflow.",
    stack: ["Next.js", "Python", "FastAPI", "LangChain", "LangGraph"],
    outcome: "One upload, 30+ languages. Shipped to the same 5–6 client base.",
    frames: [
      { title: "Upload course", detail: "The team uploads a finished course." },
      { title: "Extract text and structure", detail: "Text is pulled out with its structure kept intact." },
      { title: "LLM translation", detail: "An LLM workflow translates the content into each target language." },
      { title: "Rebuild in 30+ languages", detail: "The course is rebuilt in every language." },
    ],
    built: [
      "Took the product from POC to client delivery.",
      "LangGraph translation workflow behind a FastAPI service.",
      "Next.js interface for uploads and language selection.",
    ],
  },
  // DRAFT: review with Shreyash
  {
    id: "rag-prototype",
    title: "RAG knowledge bot",
    org: "Harbinger Group",
    period: "R&D",
    colour: null,
    kind: "prototype",
    summary:
      "An R&D proof of concept: FastAPI, LangChain, OpenAI and FAISS, with hybrid retrieval that combines vector search and keyword matching.",
    problemShort: "A question-answering bot over internal documents, built to test retrieval strategies.",
    problem:
      "A question-answering bot over an internal document set, built to explore how retrieval choices affect answer quality.",
    role: "Built the prototype end to end.",
    stack: ["Python", "FastAPI", "LangChain", "OpenAI", "FAISS"],
    frames: [
      { title: "Documents", detail: "Internal documents are loaded." },
      { title: "Chunk and embed", detail: "Documents are split into chunks and embedded." },
      {
        title: "Hybrid retrieval",
        detail: "Vector search in FAISS is combined with keyword matching to find relevant chunks.",
      },
      { title: "Answer with sources", detail: "The LLM answers from the retrieved chunks." },
    ],
    built: [
      "Chunking and embedding pipeline.",
      "Hybrid retrieval combining FAISS vector search with keyword matching.",
      "FastAPI endpoint for questions and answers.",
    ],
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const quickAnswers: QuickAnswer[] = [
  { q: "Notice period?", a: "Two months." },
  {
    q: "Remote or relocation?",
    a: "Yes. I'm open to remote or Pune-based teams, and I'd relocate for a strong opportunity.",
  },
  {
    q: "Strongest project?",
    a: "BrandStream. I built it full-stack from an empty repo to the tool every internal team at THG now uses instead of Magnific.",
  },
  {
    q: "What role next?",
    a: "Full-stack or AI engineering roles where I own features end to end, from the React interface to the Python services and LLM workflows behind it.",
  },
];

export const tilePalette: [bg: string, fg: string][] = [
  ["#FF4D2E", "#000"],
  ["#BFA8FF", "#000"],
  ["#FFD43B", "#000"],
  ["#0B5D4B", "#F2FFF8"],
  ["#8EC9FF", "#000"],
  ["#000", "#FFD43B"],
  ["#F4D6CC", "#000"],
  ["#BFA8FF", "#000"],
];

// How Shreyash takes a product from an empty repo to production. DRAFT: review with Shreyash
export const method: { stage: string; line: string }[] = [
  { stage: "Idea", line: "Start from the user's problem, not the model" },
  { stage: "POC", line: "A working demo on real data, fast" },
  { stage: "Prototype", line: "In front of real users early" },
  { stage: "v1", line: "Hardened: auth, errors, edge cases" },
  { stage: "Production", line: "Deployed, monitored, kept running" },
  { stage: "Adopted", line: "Success means people switch to it" },
];
