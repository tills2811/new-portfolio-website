# Shreyash Arali — portfolio

Next.js 14 (App Router), TypeScript and Tailwind. The design is the "Campaign board" direction. See `docs/superpowers/specs/2026-11-01-portfolio-redesign-design.md` and the visual reference next to it.

## Commands

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # Vitest + Testing Library
npm run lint
npm run build
```

## Where things live

- `lib/data.ts`: all copy (roles, skills, case studies, quick answers, hero briefs). Edit content here.
- `components/`: page sections. `hero/tile-grid.tsx`, `fit-and-work.tsx` and `contact/*` are the interactive parts.
- `app/work/[slug]/page.tsx`: case study pages, generated statically from `lib/data.ts`.
- `app/globals.css`: colour tokens (light and dark) and motion keyframes.
- `actions/sendEmail.ts`: contact form server action (Resend).

## Environment

Create `.env.local` with:

```
RESEND_API_KEY=your_key
```

Never commit it.
