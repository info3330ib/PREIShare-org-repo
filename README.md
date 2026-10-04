# PREIshare Investor Dashboard Shell

The PREIshare investor dashboard, Sprint 3. Built with TanStack Start (a full-stack
React framework with file-based routing) and TypeScript.

This sprint builds a **shell only**: layout, navigation, and pages filled with
labeled mock data. There is no sign-in and no live data yet.

## Setup

You need [Node.js](https://nodejs.org/) (the LTS version) installed.

From the project root (the folder containing this README):

```bash
npm install      # install dependencies (first time, or after pulling changes)
npm run dev      # start the development server
```

Then open **http://localhost:3000** in your browser. Stop the server with `Ctrl+C`.

## Other commands

| Command | What it does |
| --- | --- |
| `npm run typecheck` | Checks all TypeScript types without building. Must finish with no errors before you ask for review. |
| `npm run typecheck:errors` | Checks the deliberately broken example file. It is **supposed** to report errors; see `src/types/README.md`. |
| `npm run build` | Builds the app for production. This is what the Vercel deploy runs. |
| `npm run preview` | Serves the production build locally. |

## Where things live

| Path | What's there |
| --- | --- |
| `src/routes/` | Pages. Each file is a route, e.g. `src/routes/about.tsx` is `/about`. |
| `src/routes/__root.tsx` | The root layout that wraps every page. |
| `src/components/` | Reusable React components. |
| `src/types/` | Shared TypeScript types for investor listings. Import from `src/types/index.ts`. |
| `src/fixtures/` | Sample listing data used as mock data. |
| `vite.config.ts` | Build configuration (TanStack Start, React, Tailwind, Nitro). |
| `docs/` | Planning documents. Read these before building anything. |

## Planning docs (read these first)

- `docs/investor-dashboard-brief.md` — what this sprint builds, and what it does not
- `docs/dashboard-ia.md` — the four dashboard pages, their URLs, and the layout decision
- `docs/component-plan.md` — the components each page uses, and what each must not do

## What's coming next

The dashboard pages (`/dashboard`, `/dashboard/portfolio`, `/dashboard/deals`,
`/dashboard/profile`) are **not built yet**. They are added in a later step, following
`docs/dashboard-ia.md`. Do not add other pages; the brief limits this sprint to those four.

## Styling

The app uses [Tailwind CSS](https://tailwindcss.com/).
