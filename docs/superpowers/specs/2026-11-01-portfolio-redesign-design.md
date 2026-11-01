# Portfolio redesign: "Campaign board"

Date: 2026-11-01
Status: approved direction, awaiting spec review
Visual reference: [`assets/2026-11-01-campaign-board-preview.html`](assets/2026-11-01-campaign-board-preview.html). Open it in a browser. It is the source of truth for look and motion; this document is the source of truth for scope, content and structure.

## 1. Goal

Replace the current tutorial-template portfolio with a site that gets Shreyash shortlisted for full-stack and AI engineering roles.

- **Audience:** recruiters and hiring managers at product companies.
- **What they need, in order:** (1) does this candidate match the role (stack, years, location, notice)? (2) proof: real shipped work with outcomes. (3) a fast way to make contact.
- **Success:** within one screen a recruiter sees role, years, core stack and availability. Within one scroll they see three production case studies with concrete outcomes. The site must not read as a template or as AI-generated.

## 2. Design direction

The hero shows the product Shreyash builds. BrandStream turns a brief into ad creatives, so the page borrows from an ad campaign board: white and black with several bold campaign colours, heavy extra-condensed headlines, and colour-field blocks instead of grey cards.

- One personality throughout, with no decorative blur blobs, gradients or glassmorphism.
- No personal photo anywhere.
- Motion appears only where it explains something (see §6).

## 3. Visual system

### Colour tokens

Defined as CSS variables in `app/globals.css` and exposed to Tailwind under `theme.extend.colors`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `page` | `#FFFFFF` | `#000000` | page background |
| `ink` | `#000000` | `#FFFFFF` | headings, primary text, primary pills, rules |
| `ink-2` | `#2A2A2A` | `#D6D6D6` | body text |
| `muted` | `#5E5E5E` | `#9A9A9A` | dates, captions, hints |
| `hair` | `#DCDCDC` | `#2E2E2E` | thin dividers, tile outlines |
| `tomato` | `#FF4D2E` | same | BrandStream, Interface layer |
| `lilac` | `#BFA8FF` | same | iContent, Services layer |
| `butter` | `#FFD43B` | same | Contact block, AI layer |
| `pine` | `#0B5D4B` | same | iTranslate, Data layer (white text on top) |
| `sky` | `#8EC9FF` | same | hero tiles only |
| `blush` | `#F4D6CC` | same | hero tiles only |

The campaign colours stay the same in both themes. Colour blocks always use black text, except pine, which uses `#F2FFF8`.

### Typography

- One family: **Archivo** (variable: `wdth` 62–125, `wght` 300–900), loaded with `next/font/google` and the width axis enabled.
- **Display** (h1, section headings, case-study titles, role titles): `wdth 62`, weight 800, line-height 0.88.
  - h1: `clamp(64px, 8.4vw, 120px)`
  - Section headings: `clamp(48px, 6vw, 84px)`
  - Case-study titles: `clamp(40px, 4.6vw, 64px)`
  - Role titles: 34px
- **Sub-display** (tile lines, frame titles, band values): `wdth 70–75`, weight 800.
- **Body:** `wdth 100`, weight 400, 17px / 1.55. Lede 18px. Small text 13–15px.
- Sentence case everywhere. No all-caps labels and no eyebrow labels above headings.

### Shape and layout

- Max width 1240px, 40px side gutter (16px on mobile). Left-aligned.
- Pills (buttons, skills, quick-answer chips): fully rounded, 2px ink border.
- Colour blocks: 10px radius. Hero tiles and frames: 6px.
- Section heads: large heading on the left, short hint on the right, 3px ink rule below.
- Breakpoint at 900px: every two-column grid stacks, the fit band becomes 2×2, and nav links collapse so only the CV pill and theme toggle remain.

## 4. Information architecture

### Home (`/`), top to bottom

1. **Nav:** "Shreyash Arali" on the left. Work, Experience and Contact (anchor links), the theme toggle and a "Download CV" pill on the right. Sticky, gaining a page-coloured background once scrolled.
2. **Hero** (two columns):
   - Left: h1 "I build the AI tools that make the creative.", then the lede: "Software Engineer at THG Ingenuity. I build BrandStream, which turns a brief and a product photo into campaign-ready creatives, launches them on Meta and learns from the results." Below it, a brief pill showing a brief in quotes and a **Generate** button.
   - Right: a 3×2 grid of illustrative ad tiles, captioned "Illustrative variants, not client work."
3. **Fit band:** a full-width ink strip with four cells:
   - 3+ years, shipping production apps
   - Next.js, React, TS: front end
   - Python, FastAPI, LangGraph: back end and AI
   - Pune or remote: 2-month notice
4. **Experience and stack** (`#exp`):
   - Left: a list of roles (date, role title, organisation, one line).
   - Right: four stack layers, each with a colour key and skill pills.
   - Hint: "Hover a skill to see which projects use it."
5. **Selected work** (`#work`):
   - Three full-width colour-block case cards: BrandStream (tomato), iContent (lilac), iTranslate (pine). Each has a meta line, title, Problem / Role / Outcome, a "Read the case study" link, and a row of numbered pipeline frames.
   - Below them, a dashed-outline **Prototype** card for the RAG bot.
6. **Contact** (`#contact`): a butter block. Left: "Hiring for a full-stack or AI role?", one sentence, and Email / LinkedIn / GitHub pills. Right: the Quick answers widget.
7. **Footer:** name and city on the left, text links on the right.

### Case study pages (`/work/[slug]`)

Slugs: `brandstream`, `icontent`, `itranslate`, `rag-prototype`. They are statically generated from `lib/data.ts`, with the same nav and footer as home. Each page has:

1. A header colour block in the project colour: meta line, title, one-sentence summary.
2. Facts row: Role, Stack, Timeline, Outcome.
3. "The problem": 1–2 short paragraphs.
4. "How it works": the pipeline frames at full size, each with a 1–2 sentence explanation.
5. "What I built": 3–5 bullet points.
6. "Result": the outcome text, with numbers where they are real.
7. A link to the next case study.

There is no image gallery for now. A `screenshots` field in the data stays optional, so images can be added later if THG and Harbinger allow it.

The RAG prototype page uses the same template, but its header is outlined rather than filled, it is labelled "Prototype", and it has **no** Outcome or Result section.

## 5. Content (copy source)

### Experience

| When | Role | Organisation | Line |
|---|---|---|---|
| Oct 2025 – now | Software Engineer | THG Ingenuity | Full-stack on BrandStream, an AI creative and Meta campaign platform built from scratch. |
| Jul 2023 – Oct 2025 | Software Developer | Harbinger Group | Took iContent and iTranslate from POC to product, with 5–6 corporate clients onboarded. |
| Feb – Nov 2022 | Web Developer / Designer Intern | Aniworks Pvt. Ltd. | (no line) |
| 2019 – 2023 | B.E. Computer Engineering | MMCOE Pune | CGPA 8.8 |

### Stack layers

Project usage is listed in brackets: BS = BrandStream, IC = iContent, IT = iTranslate, RAG = RAG prototype.

- **Interface:** Next.js [BS IC IT], React [BS IC IT], TypeScript [BS IC IT], Tailwind [BS IC]
- **Services:** Python [all], FastAPI [all], Node.js [none]
- **AI:** LangChain [all], LangGraph [BS IC IT], OpenAI [IC IT RAG], Gemini [BS], Freepik models (Mystic, Seedream) [BS], RAG [RAG]
- **Data and cloud:** PostgreSQL [BS], Redis [BS], MongoDB [IC], GCP [BS], FAISS [RAG]

> To verify with Shreyash before launch: Tailwind and TypeScript usage per project, and whether iTranslate used MongoDB.

### Case studies

**BrandStream** (THG Ingenuity, Oct 2025 – now)
- **Problem:** Hundreds of beauty and fitness products need fresh ad creatives, and the tools making them weren't connected to ad results.
- **Role:** Full-stack: Next.js front end, FastAPI services, model and Meta integrations.
- **Stack:** Next.js, Python, FastAPI, LangChain, LangGraph, PostgreSQL, Redis, GCP, Gemini, Freepik (Mystic, Seedream).
- **Outcome:** Replaced Magnific for every internal team.
- **Frames:** 1 Brief and product photo → 2 Generate creatives → 3 Launch on Meta → 4 Read results, optimise. Note: "Step 4 feeds back into step 2."

**iContent** (Harbinger Group, Jul 2023 – Oct 2025)
- **Problem:** Each corporate L&D course took the creative team 1–1.5 days of manual work.
- **Role:** Full-stack, including the LangGraph agent workflow.
- **Stack:** Next.js, Python, FastAPI, LangChain, LangGraph, MongoDB, OpenAI.
- **Outcome:** Courses in 2–4 hours (~60% faster). 50+ produced, 20+ internal users, 5–6 clients onboarded.
- **Frames:** 1 Upload document → 2 Split into chapters → 3 Storyboard → 4 Generate creatives (e.g. AI presenter) → 5 Package course.

**iTranslate** (Harbinger Group, Jul 2023 – Oct 2025)
- **Problem:** Clients need every course in many languages, and manual translation is slow and expensive.
- **Role:** Full-stack, from Next.js to the Python translation workflow.
- **Stack:** Next.js, Python, FastAPI, LangChain, LangGraph.
- **Outcome:** One upload, 30+ languages. Shipped to the same 5–6 client base.
- **Frames:** 1 Upload course → 2 Extract text and structure → 3 LLM translation → 4 Rebuild in 30+ languages.

> To verify with Shreyash: the middle steps (glossary, QA or human review?).

**RAG knowledge bot (Prototype)** (Harbinger R&D)
- An R&D proof of concept: FastAPI, LangChain, OpenAI and FAISS, with hybrid retrieval that combines vector search and keyword matching.
- **Frames:** 1 Documents → 2 Chunk and embed → 3 Hybrid retrieval → 4 Answer with sources.
- No metrics or outcome claims.

The long-form text for the case study pages (problem paragraphs, frame explanations, "What I built" bullets) is drafted during implementation from the facts above and reviewed by Shreyash. Nothing gets invented beyond these facts.

### Quick answers

| Question | Answer |
|---|---|
| Notice period? | Two months. |
| Remote or relocation? | Yes. I'm open to remote or Pune-based teams, and I'd relocate for a strong opportunity. |
| Strongest project? | BrandStream. I built it full-stack from an empty repo to the tool every internal team at THG now uses instead of Magnific. |
| What role next? | Full-stack or AI engineering roles where I own features end to end, from the React interface to the Python services and LLM workflows behind it. |

### Hero briefs

Three preset briefs. Each has 8 ad lines and cycles on **Generate**. Copy is as in the reference preview: summer serum, protein bar, vitamin gummies. All products are fictional, with no real brand names.

### Metadata

- Title: "Shreyash Arali, Full-stack and AI Engineer".
- Description: one sentence summarising the hero lede.
- Open Graph image: a static 1200×630 PNG of the hero headline and tile grid, rendered with `next/og`.
- The CV is still served from `/public/CV.pdf`.

> Shreyash should update it to match this content, especially the RAG claims.

## 6. Motion and interaction

All motion respects `prefers-reduced-motion`. When reduced motion is on, everything renders in its final state and nothing loops.

1. **Hero tile regeneration** (the signature moment):
   - Every 1.6s, one tile wipes (clip-path out, then in, 0.6s) and repaints with the next colourway and ad line, cycling through the 6 tiles.
   - Pauses while the pointer is over the grid, while the tab is hidden, and while the hero is off-screen (IntersectionObserver).
   - **Generate** swaps to the next brief and repaints all 6 tiles with a 90ms stagger.
2. **Case frames:** when a frame row enters the viewport (35% visible), the frames rise in once, 0.5s each with a 120ms stagger. They don't animate again.
3. **Skill → project highlight:** on hover or focus of a skill pill, the case cards that don't use it fade to 25% opacity and matching cards scale to 1.01. Keyboard focus triggers the same effect.
4. **Quick answers:** tapping a chip marks it pressed and streams its answer at about 16ms per character, ending with a blinking caret. Tapping another chip cancels the current stream. The answer region is `aria-live="polite"`.
5. **Small feedback:** pills lift 2px on hover. Nav links underline on hover.

There are no scroll-triggered fade-ins on sections, no parallax and no cursor effects.

Implementation: plain React state with CSS keyframes for 1, 2, 4 and 5. Framer Motion is not needed. It gets removed unless the case study pages turn out to need route transitions (they don't for now).

## 7. Technical design

### Kept

- Next.js 14 (App Router), TypeScript, Tailwind.
- The Resend contact server action (`actions/sendEmail.ts`), unchanged.
- React Email template, react-hot-toast.

### Removed

- `react-vertical-timeline-component` and its types
- `react-intersection-observer` (replaced by a small `useInView` hook)
- `framer-motion`
- Unused images: `rmtdev.png`, `wordanalytics.png`, `corpcomment.png`, `portfolio.png`, `notetakingapp.png`, `shreyasharali.png`
- `ActiveSectionContext`, plus the old components: `intro`, `About`, `Projects`, `Project`, `Skills`, `Experience`, `section-divider`, `SectionHeading`, `header`, `Footer`, `theme-switch`

### Contact form

The new design shows Email / LinkedIn / GitHub pills and Quick answers. The existing message form moves under the pills as a compact form (email + message + "Send message"), styled to match, so recruiters can write without leaving the page. After sending, the toast says "Message sent". On failure it shows the server's error text.

### Theme

- `ThemeContextProvider` keeps the `class="dark"` strategy, but adds an inline script in `<head>` that sets the class before paint. This fixes the current flash of light theme.
- The default follows the system setting, and a manual choice persists in `localStorage`.
- Token variables switch under `.dark`.

### File structure

```
app/
  layout.tsx            fonts, theme script, nav, footer, toaster
  page.tsx              home: composes sections
  work/[slug]/page.tsx  case study template + generateStaticParams
  globals.css           tokens, base, keyframes
  opengraph-image.tsx
components/
  nav.tsx
  theme-toggle.tsx
  hero/hero.tsx
  hero/tile-grid.tsx    regeneration logic (client)
  fit-band.tsx
  experience-stack.tsx  roles + layers; owns hovered-skill state
  work/case-card.tsx
  work/frames.tsx       shared by home + case pages
  work/prototype-card.tsx
  contact/contact.tsx
  contact/quick-answers.tsx (client)
  contact/contact-form.tsx  (client, uses sendEmail)
  footer.tsx
lib/
  data.ts               all content (typed)
  types.ts
  use-in-view.ts
  use-reduced-motion.ts
```

The hovered-skill state is shared between `experience-stack` and the work list. Both sit inside a small client wrapper (`components/fit-and-work.tsx`) that holds `hoveredSkill` and passes it down. Everything else stays a server component.

### Data model (`lib/data.ts`)

```ts
type ProjectId = "brandstream" | "icontent" | "itranslate" | "rag-prototype";
type Project = {
  id: ProjectId; title: string; org: string; period: string;
  colour: "tomato" | "lilac" | "pine" | null;   // null = outlined prototype
  kind: "production" | "prototype";
  summary: string; problem: string; role: string; stack: string[];
  outcome?: string;                               // absent for prototype
  frames: { title: string; detail: string }[];
  loopNote?: string;
  built: string[];                                // "What I built" bullets
  screenshots?: { src: string; alt: string }[];
};
type Role = { when: string; title: string; org: string; line?: string };
type SkillLayer = { name: string; colour: string; skills: { name: string; uses: ProjectId[] }[] };
type QuickAnswer = { q: string; a: string };
type Brief = { text: string; lines: string[] };
```

## 8. Quality floor

- **Accessibility:**
  - Semantic landmarks, and one h1 per page.
  - Visible focus rings (3px tomato outline).
  - All interactions work by keyboard.
  - Tiles are `aria-hidden`, with the caption as text.
  - Contrast AA: text on colour blocks is black (pine uses `#F2FFF8`), and muted grey `#5E5E5E` on white is 6.4:1.
- **Responsive:** checked at 375, 768, 1024 and 1440px, with no horizontal scroll.
- **Performance:** fonts self-hosted through `next/font`, no images above the fold, client JS limited to the hero tiles, skill highlight, quick answers, form and theme toggle. Target Lighthouse score of 95+ for performance and accessibility on the home page.
- **SEO:** metadata per page, static generation for all routes, and `sitemap.ts`.

## 9. Verification

- `npm run lint` and `npm run build` pass.
- Run locally, then screenshot home and one case study in light and dark mode, at mobile and desktop widths. Compare against the reference preview.
- Manually check:
  - Generate cycles briefs.
  - Tiles pause on hover.
  - Skill hover and focus highlights the right cards.
  - Quick answers stream, and cancel when another is tapped.
  - The contact form sends, tested against Resend with the real key in `.env.local`.
  - Reduced-motion mode shows everything in its final state.
  - Theme persists across reloads with no flash.

## 10. Out of scope

A blog, a CMS, analytics, a live LLM chat, internationalisation, real client creatives or screenshots (the screenshot field is optional, for later), and deployment changes (Vercel stays as is).

## 11. Open items for Shreyash

1. Confirm the per-project stack usage flagged in §5.
2. Confirm iTranslate's middle pipeline steps.
3. Update `CV.pdf` to match, and present the RAG bot as a prototype.
4. Review the drafted long-form case study copy during implementation.
