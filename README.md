# PREIshare Investor Dashboard Shell

The PREIshare investor dashboard, Sprint 3. Built with TanStack Start (a full-stack
React framework with file-based routing) and TypeScript.

This sprint is a **shell only**: layout, navigation, and four investor pages filled
with labeled mock data. There is no sign-in and no live data yet.

- Sprint handoff (what shipped, demo script, limits): [docs/sprint3-handoff.md](docs/sprint3-handoff.md)
- Why it is built this way: [docs/architecture-decisions.md](docs/architecture-decisions.md)

## Prerequisites

- [Node.js](https://nodejs.org/) version **20.19 or newer, or 22.12 or newer** (Vite 8
  requires this). `npm` comes with Node. The last cold start was checked with Node 24.14.1
  and npm 11.12.1.
- Git, to clone the repository.

No database, API keys, or `.env` file is needed. The app uses mock data only.

## Install and run

From the project root (the folder containing this README):

```bash
npm install      # install dependencies (first time, or after pulling changes)
npm run dev      # start the development server
```

Then open **http://localhost:3000/dashboard** in your browser. Stop the server with
`Ctrl+C`. If port 3000 is already in use, Vite prints a different URL; use that one.

The repository uses npm (`package-lock.json` is committed). Do not mix in pnpm or yarn.

## Pages

| URL | What it is |
| --- | --- |
| `/dashboard` | Dashboard home: three stat cards, portfolio summary, recent activity |
| `/dashboard/portfolio` | Table of mock holdings |
| `/dashboard/deals` | List of open deals from the sample listings |
| `/dashboard/profile` | Mock investor profile card |
| `/` and `/about` | The original starter pages, with the starter header and footer |

Every number, list, and profile field on the dashboard pages is **mock data** and is
labeled "Mock data" on screen.

## Commands

These are the scripts in `package.json`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server on port 3000. |
| `npm run build` | Builds the app for production. This is what the Vercel deploy runs. |
| `npm run preview` | Serves the production build locally (run `npm run build` first). |
| `npm run typecheck` | Checks all TypeScript types without building. Must finish with no errors before you ask for review. |
| `npm run typecheck:errors` | Checks the deliberately broken example file. It is **supposed** to report errors (currently exactly 9); see `docs/type-safety/expected-type-errors.md`. |
| `npm run generate-routes` | Regenerates `src/routeTree.gen.ts` from the files in `src/routes/`. Do not edit that generated file by hand. |

There is no test script, lint script, or CI pipeline yet.

## Where things live

| Path | What's there |
| --- | --- |
| `src/routes/` | Pages. Each file is a route, e.g. `src/routes/dashboard/deals.tsx` is `/dashboard/deals`. |
| `src/routes/__root.tsx` | The root document (html, head, body). It renders no header or footer. |
| `src/routes/_site.tsx` | Layout for the starter pages (`/`, `/about`): starter header and footer. Its pages are in `src/routes/_site/`. |
| `src/routes/dashboard.tsx` | Layout for every `/dashboard/*` page: renders `AppShell`. |
| `src/components/layout/` | `AppShell`, `Sidebar`, `Header`, `NavItems`, and `navConfig.ts` (the one list of nav labels and paths). |
| `src/components/dashboard/` | The page widgets: `StatsCard`, `PortfolioSummary`, `RecentActivity`, `PortfolioTable`, `DealsList`, `ProfileCard`. |
| `src/fixtures/` | Mock data: `dashboard-mock.ts` (holdings, profile, activity) and `sample-investor-listings.ts` (deals). |
| `src/types/` | Shared TypeScript types for investor listings. Import from `src/types/index.ts`. |
| `src/styles/dashboard.css` | Responsive and accessibility styles for the dashboard shell. |
| `src/lib/` | Small helpers: `deals.ts` (what counts as an open deal), `format.ts`, `labels.ts`. |
| `vite.config.ts` | Build configuration (TanStack Start, React, Tailwind, Nitro). |
| `docs/` | Planning and handoff documents. |

## Docs

- [docs/sprint3-handoff.md](docs/sprint3-handoff.md): what shipped, how to demo it, known limits, next steps
- [docs/architecture-decisions.md](docs/architecture-decisions.md): why the shell is shaped this way and what the next sprint builds on
- [docs/investor-dashboard-brief.md](docs/investor-dashboard-brief.md): the client brief (what this sprint builds, and what it does not)
- [docs/dashboard-ia.md](docs/dashboard-ia.md): the four dashboard pages, their URLs, and the layout decision
- [docs/component-plan.md](docs/component-plan.md): the components each page uses, and what each must not do
- [docs/verification-checklist.md](docs/verification-checklist.md): the checks run against the shell, with evidence

## Not built yet

Sign-in and authorization, live Supabase/PostgreSQL data, search, and automated CI are
all out of scope for Sprint 3. See the handoff for the recommended order.

## Styling

The app uses [Tailwind CSS](https://tailwindcss.com/) plus `src/styles/dashboard.css`
for the dashboard shell.
