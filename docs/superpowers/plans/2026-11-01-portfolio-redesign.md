# Portfolio Redesign ("Campaign board") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the tutorial-template portfolio with the approved "Campaign board" design: a recruiter-first home page plus four statically generated case study pages.

**Architecture:**
- All content lives in one typed module (`lib/data.ts`). Pages are server components that compose small section components.
- Only four interactive islands are client components: tile grid, skill↔work highlight wrapper, quick answers, contact form. The theme toggle is a fifth.
- Motion is CSS keyframes driven by class changes. Pure state logic lives in testable functions separate from the components.

**Tech Stack:** Next.js 14.2 (App Router), TypeScript, Tailwind 3.4, `next/font` (Archivo variable), Resend server action (existing), react-hot-toast, Vitest + Testing Library + jsdom (new, dev only).

**Spec:** `docs/superpowers/specs/2026-11-01-portfolio-redesign-design.md`
**Visual reference:** `docs/superpowers/specs/assets/2026-11-01-campaign-board-preview.html`. Port its CSS values; don't reinvent them.

## Global Constraints

- **Colour tokens** (light / dark):
  - page `#FFFFFF`/`#000000`, ink `#000000`/`#FFFFFF`, ink-2 `#2A2A2A`/`#D6D6D6`, muted `#5E5E5E`/`#9A9A9A`, hair `#DCDCDC`/`#2E2E2E`.
  - Same in both themes: tomato `#FF4D2E`, lilac `#BFA8FF`, butter `#FFD43B`, pine `#0B5D4B`, sky `#8EC9FF`, blush `#F4D6CC`. Text on pine is `#F2FFF8`; on every other colour block it is black.
- **Font:** Archivo only. Display is `wdth 62`, weight 800, line-height 0.88. Sub-display is `wdth 70–75`, weight 800. Body is `wdth 100`, weight 400, 17px/1.55.
- **Sizes:** h1 `clamp(64px, 8.4vw, 120px)`, section headings `clamp(48px, 6vw, 84px)`, case titles `clamp(40px, 4.6vw, 64px)`, role titles 34px.
- **Layout:** max width 1240px, side gutter 40px (16px below 900px), single breakpoint at 900px.
- **Copy:** sentence case everywhere. No all-caps labels, no eyebrow labels, no personal photo.
- **Motion:** every animation honours `prefers-reduced-motion`. Under reduce, everything renders in its final state with no intervals or loops.
- **Truthfulness:** the RAG prototype never shows an outcome or result. No metrics beyond those in spec §5.
- **Focus ring:** 3px tomato outline, 3px offset.
- **Dependencies:** remove `framer-motion`, `react-vertical-timeline-component`, `@types/react-vertical-timeline-component` and `react-intersection-observer`. Add only the dev test tooling listed in Task 1.
- **Contact action:** `actions/sendEmail.ts` stays behaviourally unchanged.

## Review Focus

1. **Unknown case study URL** (`/work/foo`): renders the Next 404 and never crashes. Tested in Task 8.
2. **Storage blocked** (private mode or blocked site data, so `localStorage` throws): the theme still toggles and the page doesn't crash. Tested in Task 2.
3. **Skill used by no project** (Node.js): hovering or focusing it dims nothing and highlights nothing. Tested in Task 5.
4. **Rapid quick-answer taps:** only the most recently tapped answer streams, with no interleaved characters. Tested in Task 7.
5. **Contact send failure** (Resend error or missing key): an error toast shows the server's message, and the user's typed message is **not** cleared. Tested in Task 7.

---

### Task 1: Test tooling and typed content module

**Files:**
- Modify: `package.json` (scripts + devDependencies)
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Replace: `lib/types.ts`, `lib/data.ts`
- Test: `lib/data.test.ts`

**Interfaces:**
- Produces, in `lib/types.ts`:
  - `ProjectId`, `Project`, `Role`, `SkillLayer`, `QuickAnswer`, `Brief`, exactly as in spec §7 "Data model".
  - `Colour = "tomato" | "lilac" | "butter" | "pine" | "sky" | "blush"`. `SkillLayer.colour` uses it.
- Produces, in `lib/data.ts`:
  - `projects: Project[]` in the order brandstream, icontent, itranslate, rag-prototype.
  - `roles: Role[]`, `skillLayers: SkillLayer[]`, `quickAnswers: QuickAnswer[]`, `briefs: Brief[]`.
  - `tilePalette: [bg: string, fg: string][]`, the 8 pairs from the reference preview's `palette`.
  - `fitBand: { value: string; label: string }[]`.
  - `contactLinks: { email: string; linkedin: string; github: string }`, taken from the existing intro and actions: `shreyasharali2811@gmail.com`, `https://www.linkedin.com/in/shreyash-arali-974498213/`, `https://github.com/tills2811`.
  - `getProject(id: string): Project | undefined`.

- [ ] **Step 1: Add the dev tooling.**
  - Run: `npm i -D vitest@2.1.9 @vitejs/plugin-react@4.3.4 vite-tsconfig-paths@5.1.4 jsdom@25.0.1 @testing-library/react@16.1.0 @testing-library/dom@10.4.0 @testing-library/user-event@14.5.2 @testing-library/jest-dom@6.6.3`
  - Add the script `"test": "vitest run"`.
  - `vitest.config.ts`: plugins `react()` and `tsconfigPaths()`, `environment: "jsdom"`, `setupFiles: ["./vitest.setup.ts"]`.
  - `vitest.setup.ts`: imports `@testing-library/jest-dom/vitest`, and defines a `matchMedia` stub that returns `matches: false` unless `window.__reduceMotion === true`.
- [ ] **Step 2: Write `lib/data.test.ts`.**
  - `every skill "uses" id exists in projects`
  - `project ids are unique and getProject("brandstream") returns BrandStream`
  - `prototype has no outcome; every production project has an outcome`
  - `each brief has exactly 8 lines and there are 3 briefs`
  - `tilePalette has 8 pairs`
  - `Node.js uses []`
  - `brandstream.loopNote === "Step 4 feeds back into step 2."`
- [ ] **Step 3:** Run `npm test`. Expected: FAIL, because the exports are missing.
- [ ] **Step 4: Write the content.**
  - Copy everything verbatim from spec §5.
  - Brief lines come from the reference preview's `briefs` array.
  - Long-form fields (`problem` paragraphs, `frames[].detail`, `built[]`) are drafted from §5 facts only, with a `// DRAFT: review with Shreyash` comment above each project.
- [ ] **Step 5:** Run `npm test`. Expected: PASS.
- [ ] **Step 6:** Commit with `feat: typed content module and test tooling`.

---

### Task 2: Tokens, font, theme (no flash) and app shell

**Files:**
- Replace: `app/globals.css`, `tailwind.config.js`, `app/layout.tsx`, `context/theme-context.tsx`
- Create: `components/theme-toggle.tsx`, `lib/theme-script.ts`
- Replace: `app/page.tsx`, temporarily rendering `<main id="top" />`
- Delete: `components/*` (all old files), `context/active-section-context.tsx`, `lib/hooks.ts`
- Test: `components/theme-toggle.test.tsx`

**Interfaces:**
- Produces:
  - **Tailwind colours** `page, ink, ink-2, muted, hair, tomato, lilac, butter, pine, sky, blush`. Each maps to `var(--<name>)`.
  - **CSS utilities** in globals.css: `.cond` (display style), `.subcond` (`wdth 72`, weight 800), `.pill`, `.pill-ghost`, plus keyframes `wipe`, `up`, `blink`.
  - **Theme:** `useTheme(): { theme: "light" | "dark"; toggleTheme(): void }`, with the `dark` class on `<html>`.
  - **No-flash script:** `themeScript: string`, an IIFE that reads `localStorage.theme` inside try/catch, falls back to `prefers-color-scheme`, and adds `dark` to `document.documentElement`.

- [ ] **Step 1: Write `theme-toggle.test.tsx`.**
  - `clicking toggles the dark class on <html> and aria-pressed`
  - `persists "dark" to localStorage`
  - `still toggles when localStorage.setItem throws`: mock `Storage.prototype.setItem` to throw. No exception, and the class still changes.
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3: Implement the shell.**
  - **Font:** Archivo in `layout.tsx` via `next/font/google` with `{ subsets: ["latin"], axes: ["wdth"], variable: "--font-archivo" }` (no `weight`, so the variable font is used).
  - **`<html>`:** gets `suppressHydrationWarning`, and `<head>` gets `<script dangerouslySetInnerHTML={{ __html: themeScript }} />`.
  - **Tokens:** `:root` holds the light values and `.dark` the dark ones. `body` has an explicit `background: var(--page)`.
  - **Theme provider:** wraps all storage access in try/catch. Its initial state is read from the `dark` class, not from storage, which avoids hydration mismatch.
  - **Toaster:** stays in the layout.
- [ ] **Step 4: Remove the old dependencies.**
  - Run: `npm rm framer-motion react-vertical-timeline-component @types/react-vertical-timeline-component react-intersection-observer`
  - Delete the old components and context, and delete `public/{rmtdev,wordanalytics,corpcomment,portfolio,notetakingapp,shreyasharali}.png`.
- [ ] **Step 5:** Run `npm test` and `npm run build`. Expected: both PASS (the page is empty but builds).
- [ ] **Step 6:** Commit with `feat: design tokens, Archivo, no-flash theme; remove template`.

---

### Task 3: Nav, footer, fit band

**Files:**
- Create: `components/nav.tsx` (client: sticky, adds `data-scrolled` after `scrollY > 8`), `components/footer.tsx`, `components/fit-band.tsx`
- Modify: `app/layout.tsx` (render Nav and Footer around children), `app/page.tsx` (render FitBand)
- Test: `components/nav.test.tsx`

**Interfaces:**
- Consumes: `contactLinks` and `fitBand` from `lib/data`, `ThemeToggle` from Task 2.
- Produces: `<Nav />`, `<Footer />`, `<FitBand />` (no props).
- Nav links use `/#work`, `/#exp` and `/#contact`, so they work from case study pages too. "Download CV" is `<a href="/CV.pdf" download>`.

- [ ] **Step 1: Write `nav.test.tsx`.**
  - `links point to /#work, /#exp, /#contact`
  - `CV link has download attribute and href /CV.pdf`
  - `sets data-scrolled after scroll > 8`
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3: Implement the three components.**
  - Port the styles from the reference preview: nav, band, footer.
  - Below 900px, nav text links are hidden; the CV pill and toggle remain.
  - The fit band is 4 columns, or 2×2 below 900px.
- [ ] **Step 4:** Run `npm test`. Expected: PASS.
- [ ] **Step 5:** Commit with `feat: nav, footer, fit band`.

---

### Task 4: Hero with regenerating tile grid

**Files:**
- Create: `lib/tiles.ts` (pure state), `components/hero/hero.tsx` (server), `components/hero/tile-grid.tsx` (client), `lib/use-reduced-motion.ts`, `lib/use-in-view.ts`
- Modify: `app/page.tsx` (Hero above FitBand)
- Test: `lib/tiles.test.ts`, `components/hero/tile-grid.test.tsx`

**Interfaces:**
- Produces, in `lib/tiles.ts`:
  - `type Tile = { variant: number; line: string; bg: string; fg: string }`
  - `type TileState = { brief: number; cursor: number; nextVariant: number; tiles: Tile[] }`
  - `initialTiles(): TileState` returns 6 tiles, variants 1–6, all from brief 0.
  - `advance(s: TileState): TileState` repaints the tile at `cursor % 6` with the next variant, then increments `cursor`.
  - `regenerate(s: TileState): TileState` moves to `brief = (brief + 1) % 3` and repaints all 6.
  - Lines come from `briefs[brief].lines[variant % 8]` and colours from `tilePalette[(variant + cursor) % 8]`.
- Produces, hooks:
  - `useReducedMotion(): boolean`, which subscribes to `(prefers-reduced-motion: reduce)`.
  - `useInView<T extends Element>(opts?: { threshold?: number; once?: boolean }): [RefObject<T>, boolean]`.
- Produces, components:
  - `<TileGrid />`, with the brief pill (text + Generate) rendered inside it so they share state.
  - `<Hero />` renders the h1, lede and `<TileGrid />`.
- Timing: the interval is 1600ms. Each swap adds the class `swap` for 600ms, and the repaint happens at 280ms. On Generate, tile `i` swaps after `i * 90`ms.

- [ ] **Step 1: Write `tiles.test.ts`.**
  - `initialTiles has variants 1..6 from brief 0`
  - `advance changes exactly one tile and increments cursor`
  - `six advances touch each tile once`
  - `regenerate cycles brief 0→1→2→0 and changes all tiles`
- [ ] **Step 2: Write `tile-grid.test.tsx`** (fake timers).
  - `renders 6 tiles server-safe on first render` (initial markup has no dependency on effects)
  - `advances one tile every 1600ms`
  - `does not advance while pointer is over the grid`
  - `does not advance when document.hidden`
  - `does not advance when out of view` (mock IntersectionObserver as not intersecting)
  - `with reduced motion: no interval, Generate repaints instantly without swap class`
  - `Generate updates brief text to the next brief`
  - Tiles container is `aria-hidden="true"`, and the caption text "Illustrative variants, not client work." is present.
- [ ] **Step 3:** Run `npm test`. Expected: FAIL.
- [ ] **Step 4: Implement.**
  - Store `TileState` in `useState(initialTiles)`.
  - Use one interval, gated by `hovered || document.hidden || !inView || reduced`.
  - Clear any pending swap timeouts on unmount and on Generate, so a tile never stays mid-wipe.
- [ ] **Step 5:** Run `npm test`. Expected: PASS.
- [ ] **Step 6:** Commit with `feat: hero with regenerating creative tiles`.

---

### Task 5: Experience & stack, work cards, frames, skill↔work highlight

**Files:**
- Create:
  - `components/experience-stack.tsx`
  - `components/work/case-card.tsx`
  - `components/work/frames.tsx` (client: uses `useInView`)
  - `components/work/prototype-card.tsx`
  - `components/fit-and-work.tsx` (client wrapper holding `hoveredSkill`)
- Modify: `app/page.tsx`
- Test: `components/fit-and-work.test.tsx`, `components/work/frames.test.tsx`

**Interfaces:**
- Consumes: `roles`, `skillLayers`, `projects`, `useInView`, `useReducedMotion`.
- Produces:
  - `<ExperienceStack onSkill(uses: ProjectId[] | null) />`
  - `<CaseCard project highlighted: boolean | null />`, where `null` means no highlight is active.
  - `<PrototypeCard project highlighted />`
  - `<Frames frames: Project["frames"] loopNote?: string size?: "card" | "page" />`
  - `<FitAndWork />`, which renders `#exp` and `#work` with their section heads.
- Every card's "Read the case study" link goes to `/work/<id>`. The prototype card's link text is "How it works".
- Highlight state: the work list gets `data-dim="true"` while active. A matching card gets `data-hl="true"`. CSS sets opacity 0.25 on non-matching cards and scale 1.01 on matching ones.

- [ ] **Step 1: Write `fit-and-work.test.tsx`.**
  - `hovering "Gemini" highlights only BrandStream`
  - `focusing "LangGraph" via keyboard highlights brandstream, icontent, itranslate and not rag-prototype`
  - `mouse leave / blur clears highlight`
  - `hovering "Node.js" (uses []) sets no data-dim and no data-hl` (Review Focus 3)
  - `renders 4 roles and 4 layers`
  - `prototype card shows "Prototype" and no "Outcome"`
- [ ] **Step 2: Write `frames.test.tsx`.**
  - `frames get "in" class once intersecting at threshold 0.35, and keep it after leaving`
  - `reduced motion renders frames visible immediately`
  - `frames are numbered 1..n`
  - `loopNote renders when given`
- [ ] **Step 3:** Run `npm test`. Expected: FAIL.
- [ ] **Step 4: Implement.**
  - Port the reference preview styles: `.role`, `.layer`, `.case`, `.frames`, `.fr`, `.proto`.
  - Card colour comes from `project.colour`, with pine using `text-[#F2FFF8]`.
  - Skill pills are `<button type="button">`.
- [ ] **Step 5:** Run `npm test`. Expected: PASS.
- [ ] **Step 6:** Commit with `feat: experience, stack and case study cards with skill highlight`.

---

### Task 6: Visual check of the home page so far

- [ ] **Step 1:** Run `npm run dev`. Open `http://localhost:3000` at 1440px and 375px, in light and dark mode.
- [ ] **Step 2: Compare against the reference preview.** Check headline sizes, the tile grid, the band, section heads and rules, card colours and the frame animation. Fix any drift in CSS only.
- [ ] **Step 3:** Run `npm run lint`. Expected: no errors.
- [ ] **Step 4:** Commit with `style: align home sections with reference`. Skip this if nothing changed.

---

### Task 7: Contact — quick answers and restyled form

**Files:**
- Create: `components/contact/contact.tsx`, `components/contact/quick-answers.tsx` (client), `components/contact/contact-form.tsx` (client)
- Modify: `app/page.tsx`. `email/contact-form-email.tsx` is restyled only if needed (optional).
- Test: `components/contact/quick-answers.test.tsx`, `components/contact/contact-form.test.tsx`

**Interfaces:**
- Consumes: `quickAnswers`, `contactLinks`, `sendEmail(formData): Promise<{ data?: unknown; error?: string }>` from `actions/sendEmail.ts`.
- Produces: `<Contact />` (section `#contact`, butter block), `<QuickAnswers />`, `<ContactForm />`.
- Streaming: 16ms per character. The answer element is `aria-live="polite"`. While streaming it has the class `typing` (blinking caret).
- Form fields: `senderEmail` (type email, required, maxLength 500) and `message` (required, maxLength 5000). Button text "Send message".
- Toasts: "Message sent" on success. On failure, the server's `error` string.

- [ ] **Step 1: Write `quick-answers.test.tsx`** (fake timers).
  - `initial text is "Pick a question."`
  - `tapping "Notice period?" streams to "Two months." and sets aria-pressed`
  - `tapping a second chip mid-stream shows only the second answer's prefix, never mixed text` (Review Focus 4)
  - `reduced motion shows full answer immediately`
- [ ] **Step 2: Write `contact-form.test.tsx`.** Mock `@/actions/sendEmail` and `react-hot-toast`.
  - `success: toast.success("Message sent") and fields cleared`
  - `error {error:"Invalid sender email"}: toast.error with that text and message field keeps its value` (Review Focus 5)
  - `button disabled while pending`
- [ ] **Step 3:** Run `npm test`. Expected: FAIL.
- [ ] **Step 4: Implement.**
  - The form uses `useFormStatus` for the pending state and calls `sendEmail` in its action.
  - The form resets only when `error` is undefined.
- [ ] **Step 5:** Run `npm test`. Expected: PASS.
- [ ] **Step 6:** Commit with `feat: contact block with quick answers and form`.

---

### Task 8: Case study pages

**Files:**
- Create: `app/work/[slug]/page.tsx`
- Test: `app/work/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `projects`, `getProject`, `<Frames size="page" />`.
- Produces:
  - `generateStaticParams(): { slug: ProjectId }[]`
  - `generateMetadata({ params }): Metadata`, with the title `"<Project title>, Shreyash Arali"`
  - The default page component
  - `export const dynamicParams = false`
- Section order (spec §4):
  1. Header block (filled in the project colour, or outlined with "Prototype" for the prototype)
  2. Facts row: Role, Stack, Timeline, plus Outcome for production projects only
  3. "The problem"
  4. "How it works" (frames with `detail`)
  5. "What I built"
  6. "Result" (production only)
  7. Next case study link, in `projects` order, wrapping from last to first

- [ ] **Step 1: Write `page.test.tsx`.** Mock `next/navigation` `notFound` to throw.
  - `generateStaticParams returns the 4 slugs in order`
  - `unknown slug calls notFound` (Review Focus 1)
  - `brandstream page shows "Result" and "Replaced Magnific for every internal team."`
  - `rag-prototype page shows "Prototype" and has no "Result" or "Outcome" heading`
  - `next link on itranslate points to /work/rag-prototype and on rag-prototype to /work/brandstream`
- [ ] **Step 2:** Run `npm test`. Expected: FAIL.
- [ ] **Step 3: Implement.** Render each `project.frames[i].detail` under its frame, and give the page one h1 (the project title).
- [ ] **Step 4:** Run `npm test` and `npm run build`. Expected: PASS, and the build output lists `/work/[slug]` with 4 static paths.
- [ ] **Step 5:** Commit with `feat: case study pages`.

---

### Task 9: Metadata, OG image, sitemap, final verification

**Files:**
- Modify: `app/layout.tsx` (`metadata`: title "Shreyash Arali, Full-stack and AI Engineer", plus a description from the hero lede and `metadataBase`)
- Create: `app/opengraph-image.tsx` (`next/og`, 1200×630: the headline in black on white, with a 3×2 grid of tile colour blocks), `app/sitemap.ts` (home plus 4 case study URLs)
- Modify: `README.md` (replace the create-next-app text with: run, test and build commands, and where content lives, `lib/data.ts`)

- [ ] **Step 1:** Implement the three files. `metadataBase` is `https://shreyasharali.vercel.app`, the existing deployed URL from the old data.
- [ ] **Step 2:** Run `npm test`, `npm run lint` and `npm run build`. Expected: all pass.
- [ ] **Step 3: Manual checklist** with `npm run dev`. Cover the spec §9 list:
  - Generate cycles briefs.
  - Tiles pause on hover.
  - Skill highlight works with mouse and keyboard.
  - Quick answers stream and cancel.
  - The form sends using the real `RESEND_API_KEY` in `.env.local`. Ask Shreyash to provide it; never commit it.
  - Reduced-motion emulation in DevTools shows the final states.
  - The theme persists across reload with no flash.
  - No horizontal scroll at 375, 768, 1024 or 1440px.
  - A Lighthouse run on `npm run build && npm start` scores ≥95 for Performance and Accessibility on `/`.
- [ ] **Step 4:** Take screenshots of home and `/work/brandstream`, in light and dark mode, at mobile and desktop widths, and share them with Shreyash.
- [ ] **Step 5:** Commit with `feat: metadata, OG image, sitemap; docs`.
