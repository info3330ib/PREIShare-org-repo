# Sprint 3 Handoff: PREIshare Investor Dashboard Shell

**Date:** 2026-10-03
**Status:** Shell complete and checked. Mock data only.
**Audience:** stakeholders (Summary, Demo script) and the engineers who build Sprint 4 (everything else)

## Summary for stakeholders

We built the investor dashboard **shell**: the frame an investor will use to see what
they own, which deals are open, and their own details. An investor can move between
four pages (Home, Portfolio, Deals, Profile) from a menu that is always in reach, and
always knows which page they are on. It works on a laptop and on a phone-width screen.

**Every number, table and name on these pages is placeholder data, and each one is
labeled "Mock data" on screen.** The portfolio value of $543,000, the four holdings, and
"Morgan Ellis" are invented. Nothing here is connected to a database, and there is no
sign-in, so anyone who opens the address sees the same demo content. That is deliberate:
the goal of this sprint was a layout stakeholders can react to before any live
financial data is wired in.

What this means for planning: the look, navigation and page structure can be reviewed
now. Real balances, real deals, and personal accounts come in later sprints.

## What shipped

### Routes

| URL | Page title and nav label | What it shows | File |
| --- | --- | --- | --- |
| `/dashboard` | Home | 3 stat cards (total portfolio value, number of holdings, open deals), portfolio breakdown by property type, 5 recent activity items | `src/routes/dashboard/index.tsx` |
| `/dashboard/portfolio` | Portfolio | Table of 4 mock holdings: property name, type, value, ownership share | `src/routes/dashboard/portfolio.tsx` |
| `/dashboard/deals` | Deals | The 2 open deals from the sample listings: Riverfront Multifamily (Open) and Cedar Industrial Park (Under offer) | `src/routes/dashboard/deals.tsx` |
| `/dashboard/profile` | Profile | Read-only card: name, email, phone, investor-since date | `src/routes/dashboard/profile.tsx` |
| `/` and `/about` | (starter pages) | The original starter app, unchanged in content, with the starter header and footer | `src/routes/_site/index.tsx`, `src/routes/_site/about.tsx` |

`src/routes/dashboard.tsx` is the layout shared by the four dashboard pages. They show
only the dashboard chrome (sidebar and dashboard header). `src/routes/_site.tsx` gives the
starter pages their own header and footer. No other routes exist.

### Component inventory

| Component | File | Job |
| --- | --- | --- |
| `AppShell` | `src/components/layout/AppShell.tsx` | The frame: sidebar, header, and the page's single `<main>` |
| `Sidebar` | `src/components/layout/Sidebar.tsx` | Navigation; collapses behind a "Menu" button below 768px wide |
| `NavItems` | `src/components/layout/NavItems.tsx` | Renders the four links and the current-page highlight |
| `Header` | `src/components/layout/Header.tsx` | Shows the page title (the page's only `<h1>`) |
| `navConfig` | `src/components/layout/navConfig.ts` | The only list of nav labels and paths |
| `StatsCard` | `src/components/dashboard/StatsCard.tsx` | One headline number, with a "Mock data" label |
| `PortfolioSummary` | `src/components/dashboard/PortfolioSummary.tsx` | Holdings count by property type |
| `RecentActivity` | `src/components/dashboard/RecentActivity.tsx` | List of 5 mock events |
| `PortfolioTable` | `src/components/dashboard/PortfolioTable.tsx` | Holdings table; scrolls sideways inside its own box on phones |
| `DealsList` | `src/components/dashboard/DealsList.tsx` | Cards for the open deals it is given |
| `ProfileCard` | `src/components/dashboard/ProfileCard.tsx` | Mock profile fields |

Styling for the shell is in `src/styles/dashboard.css` (loaded from `src/styles.css`).

### What we checked

The full evidence is in [docs/verification-checklist.md](verification-checklist.md).
Highlights:

- All four routes load and show the page title matching their nav label.
- The current nav item is highlighted on each page, and nav clicks do not reload the page.
- At 767px wide and below, the sidebar sits above the content behind a "Menu" button;
  at 768px and above it is a persistent left column. No sideways page scroll at 375px.
- Every data component shows a "Mock data" label (5 on Home, 1 each on the other pages).
- No invest, checkout, edit or sign-in controls exist anywhere.
- `npm run typecheck` passes, `npm run typecheck:errors` reports exactly the 9 expected
  errors, and `npm run build` passes.
- The checks above were run in a scripted headless Microsoft Edge walkthrough at seven
  widths (375 to 1280px) plus the verifier's own testing. The scripted pass did not cover Safari,
  Firefox, a physical phone, a screen reader, or a color-contrast audit.
- A fresh clone followed by `npm install` and `npm run dev` served all six routes
  (HTTP 200, expected "Mock data" counts) on 2026-10-03.
- The production deploy (`https://prei-share-org-repo-self.vercel.app/`, recorded in
  `docs/vercel-hobby-setup.md`) was spot-checked the same day with `curl`: `/dashboard`
  returns 200 with 5 "Mock data" labels and no starter footer, while `/` still has it.

## How to run locally (cold start)

Needs Node.js 20.19+ or 22.12+ (Vite 8 requirement). No database, keys, or `.env` file.

```bash
git clone https://github.com/info3330ib/PREIShare-org-repo.git
cd PREIShare-org-repo
npm install
npm run dev
```

Open **http://localhost:3000/dashboard**. The project uses npm (`package-lock.json`).

Before asking for review:

```bash
npm run typecheck          # must exit 0
npm run typecheck:errors   # must report exactly 9 errors (intentional)
npm run build              # must exit 0
```

## Demo script

About five minutes. Start at `http://localhost:3000/` or the production URL above.

1. **Open `/`** and click "Open investor dashboard". This is the original starter page;
   the dashboard is the new work.
2. **Home (`/dashboard`).** Without scrolling you see three numbers: $543,000 total
   value, 4 holdings, 2 open deals, then the breakdown (Multifamily 2, Office 1,
   Industrial 1) and 5 recent events. Point at the "Mock data" label on each.
3. **Portfolio.** Click it in the sidebar. Four holdings, with value and ownership
   share. Total of the values matches Home's $543,000.
4. **Deals.** Two open deals. Point out that the "open deals" count on Home (2) comes
   from the same rule, so the two cannot disagree. Draft, sold and archived sample
   listings are deliberately hidden.
5. **Profile.** Read-only name, email, phone and investor-since date.
6. **Phone width.** Narrow the browser below 768px (or use the browser's device
   toolbar at 375px). The sidebar becomes a "Menu" button; open it, pick a page, and
   it closes itself. On Portfolio, scroll the table sideways inside its box.
7. **Say it clearly:** all values are placeholders, there is no sign-in, and nothing
   on screen is live.

## Known limitations

Mock data and missing features (by design for Sprint 3):

- **No authentication or authorization.** The dashboard is public. `src/lib/user.ts` has a
  `getUser()` stub that always returns `null`; nothing calls it.
- **All content is static.** Holdings, profile and activity come from
  `src/fixtures/dashboard-mock.ts`. Deals come from `sampleInvestorListings` in
  `src/fixtures/sample-investor-listings.ts` (5 listings; 2 pass the open-deal filter).
- **No holdings type.** `MockHolding` is a local shape in `src/fixtures/dashboard-mock.ts`;
  `src/types/` has none yet. The Sprint 2 "Known holes" are still unchecked at runtime
  (see `docs/handoff/sprint2-topic1-types-handoff.md`).
- **No Supabase, PostgreSQL or pgvector.** None is installed or configured.
- **No CI, tests or lint.** There is no `.github/` folder and `package.json` has no test or
  lint script. The only gates are the three commands above, run by hand.
- **No actions.** There are no invest, edit or save buttons at all (the brief allowed
  inert ones; we built none).

Shell polish gaps (recorded as D2 to D5 in the checklist, none required by the brief):

- Browser tab title is "TanStack Start Starter" on every page.
- Unknown URLs show the framework's default Not Found page (inside the shell under
  `/dashboard/`; with no header or footer elsewhere).
- On a 375px phone, the portfolio table's Value and Your share columns are off-screen
  until the table is scrolled sideways.
- In development only, the console shows "Cannot use 'in' operator to search for
  'subscribe' in undefined" from the router devtools panel. The production build showed 0
  page errors.
- The dashboard has no theme toggle (it lived in the starter header).
- There is no "skip to content" link.
- Not production-hardened: no error boundaries, loading or empty states.

Repository housekeeping:

- `package.json` pins `@tanstack/*` and `@tanstack/devtools-vite` to `"latest"`. `package-lock.json`
  holds the working versions, so a lockfile install is repeatable, but an update could
  change behavior unnoticed.
- `app.config.ts` only re-exports `vite.config.ts` (a leftover from older TanStack Start);
  `package.json` has a `pnpm` block although the repo uses npm.
- `npm run typecheck:errors` is *supposed* to report errors. Do not "fix" the 9 errors in
  `src/fixtures/invalid-listings.errors.ts`.

## Next-sprint recommendations

In suggested order, with why:

1. **Housekeeping and gates first (small).** Pin the `"latest"` dependencies to the
   versions in `package-lock.json`, remove the dead `app.config.ts`, and add a
   `test` and `lint` script if you want CI to enforce them.
2. **Add GitHub Actions CI.** On pull requests: `npm ci`, `npm run typecheck`,
   `npm run typecheck:errors` (assert exactly 9 errors, not zero), `npm run build`.
   Do this before the large changes below, so they are checked automatically.
3. **Decide the data model, then validate at the boundary.** Add a holdings type to
   `src/types/`, and add runtime validation (the "Known holes" backlog) where data enters the app.
4. **Supabase auth and protected routes.** Replace the `src/lib/user.ts` stub, guard the
   routes under `src/routes/dashboard.tsx`, and show the signed-in investor in the
   profile and header. Note `docs/dashboard-ia.md` says no auth guard *this sprint*; that
   rule ends here.
5. **Replace mocks with live data.** Swap `src/fixtures/dashboard-mock.ts` and the sample
   listings for route loaders or server functions, one page at a time, keeping the
   components unchanged (they only take props).
6. **Empty, loading and error states** for every data widget, and error pages
   (including a designed Not Found and per-route browser titles).
7. **pgvector-powered search** for deals or documents, only once the data lives in
   Postgres.
8. **Accessibility pass before production:** screen-reader test, color-contrast audit,
   skip link, and a phone layout for the portfolio table.

## References

- Client brief: [docs/investor-dashboard-brief.md](investor-dashboard-brief.md)
- Information architecture: [docs/dashboard-ia.md](dashboard-ia.md)
- Component plan: [docs/component-plan.md](component-plan.md)
- Verification checklist: [docs/verification-checklist.md](verification-checklist.md)
- Architecture decisions: [docs/architecture-decisions.md](architecture-decisions.md)
- Sprint 2 types handoff: [docs/handoff/sprint2-topic1-types-handoff.md](handoff/sprint2-topic1-types-handoff.md)
- Listing types decision (ADR-001): [docs/decisions/ADR-001-investor-listing-types.md](decisions/ADR-001-investor-listing-types.md)
- Hosting notes: [docs/vercel-hobby-setup.md](vercel-hobby-setup.md)
- README (cold start): [README.md](../README.md)
