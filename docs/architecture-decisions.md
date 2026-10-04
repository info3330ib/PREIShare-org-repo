# Architecture Decisions: PREIshare Investor Dashboard Shell (Sprint 3)

**Date:** 2026-10-03
**Audience:** engineers who build on the shell in Sprint 4 and later
**Numbering:** continues the repo's ADR series. ADR-001 is the Sprint 2 listing types
decision in [docs/decisions/ADR-001-investor-listing-types.md](decisions/ADR-001-investor-listing-types.md).
This file holds ADR-002 to ADR-006.

Each entry says what we decided, why, and what it costs. The "Do not rip out" lines
name the parts that later work should build on rather than replace.

---

## ADR-002: File-based routes, a dashboard layout route, and a pathless `_site` layout

**Status:** Accepted and implemented.

**Context.** The brief needs one URL per investor area and room to grow into
loaders and server functions. The starter app also already had `/` and `/about`, and
`src/routes/__root.tsx` wrapped every route in the starter `Header` and `Footer`. That put
two headers on dashboard pages, which the brief's success criteria forbid. The same
decision is recorded in `docs/dashboard-ia.md` (decided 2026-10-03).

**Decision.**
- Use TanStack Start file-based routing under `src/routes/`. The route tree
  (`src/routeTree.gen.ts`) is generated from those files.
- `src/routes/dashboard.tsx` is the layout route for every `/dashboard/*` page. It renders
  `AppShell` around an `<Outlet />`. The four pages sit beside it in `src/routes/dashboard/`.
- `src/routes/__root.tsx` is only the HTML document (html, head, body, scripts, devtools).
  It renders no chrome.
- `src/routes/_site.tsx` is a pathless layout (the `_` prefix groups routes without adding to
  the URL). It renders the starter `Header` and `Footer` around the starter pages,
  which moved to `src/routes/_site/index.tsx` and `src/routes/_site/about.tsx`. Their URLs
  (`/`, `/about`) did not change.

**Alternative rejected.** Checking `pathname.startsWith('/dashboard')` inside `__root.tsx` to skip
the header. It works, but it is string matching that has to be edited by hand for
every new section.

**Consequences.**
- Adding a section means adding a layout route, not editing the root.
- A page that needs the dashboard chrome goes under `src/routes/dashboard/`. A public
  marketing-style page goes under `src/routes/_site/`.
- The dashboard pages have no theme toggle (it lives in the starter header). The brief does
  not need one.
- Because the root renders no chrome, an unknown top-level URL such as `/nope` shows the
  default Not Found page with no header or footer. A designed 404 is a follow-up.
- Moving or renaming files in `src/routes/` changes `src/routeTree.gen.ts`. Run
  `npm run generate-routes` (or start the dev server) and commit the result. Do not
  hand-edit it.
- There is deliberately **no** auth guard or `_authed` segment yet. Pages are public
  this sprint.

**Do not rip out:** the `dashboard.tsx` layout route (it is where an auth guard goes
next) and the `_site` split (it is why the dashboard has exactly one header and one
navigation).

---

## ADR-003: One `AppShell` owns the page frame, `<main>` and `<h1>`

**Status:** Accepted and implemented.

**Context.** All four pages need the same chrome. Without a rule about who owns which
landmark, pages tend to add their own `<main>` and `<h1>`, and screen-reader users get
duplicates.

**Decision.** `src/components/layout/AppShell.tsx` renders `Sidebar`, `Header` and
the **only** `<main>` (`id="main-content"`) on a dashboard page.
`src/components/layout/Header.tsx` renders the **only** `<h1>`, taking the title from
`navConfig`. `AppShell` takes no title prop, so there is one source for the title. `Sidebar`
owns the phone-width collapse (a "Menu" button with `aria-expanded` and
`aria-controls`; it closes when the route changes); there is no separate mobile-nav
component. The dashboard `Header` has no user menu, avatar or sign-out control.

**Consequences.**
- Page files in `src/routes/dashboard/` must not render `<main>` or `<h1>`.
- Layout fixes happen in one place.
- When auth arrives, the signed-in user belongs in the `Header` (or a new component beside it),
  which is a deliberate change to a component rule in `docs/component-plan.md`, not a drive-by edit.

**Do not rip out:** the single-owner rule for `<main>` and `<h1>`. If you replace
`AppShell`, keep that property.

**Layout of the code:** these files live in `src/components/layout/`. The component
plan originally said `src/components/dashboard/`; it has been corrected to match.

---

## ADR-004: Nav labels, paths and titles live only in `navConfig`

**Status:** Accepted and implemented.

**Context.** The brief requires the page title to match the nav label, and the current
page to be highlighted. Two hand-kept lists would drift.

**Decision.** `src/components/layout/navConfig.ts` is the only place that lists the four
nav items (`label`, `path`, `title`, `exact`). `NavItems` renders links from it and `Header`
looks up the title from it. `DashboardPath` is a union type, so a mistyped path fails
`npm run typecheck`. Home is `exact: true`, because every dashboard path starts with
`/dashboard` and prefix matching would highlight Home everywhere. The same `exact` flag
is given to the router's `Link`, so its own `aria-current` agrees with `isNavItemActive`.

**Consequences.** Adding a page is two edits: a route file and a `navConfig` entry (and the
`DashboardPath` type). Nothing else lists nav items. A nested page such as
`/dashboard/deals/123` will highlight Deals and show the title "Deals" without extra code.
A path outside the dashboard gets the title "Dashboard" and no active item (this is what the
dashboard's Not Found page shows).

**Do not rip out:** the single list. Do not add a second list of paths for breadcrumbs or
a mobile menu; read from `navConfig`.

---

## ADR-005: Mock data is imported by pages and passed down as props

**Status:** Accepted for Sprint 3. Designed to be replaced.

**Context.** Sprint 3 is a trustworthy UI shell, not live finance data. The danger is mock
numbers that look real, or mock data buried inside components so that nobody can tell
where a number comes from.

**Decision.**
- Mock data lives in `src/fixtures/`: `dashboard-mock.ts` (holdings, profile, activity;
  every value invented) and the Sprint 2 `sample-investor-listings.ts` (deals, typed as
  `InvestorListing` from `src/types/index.ts`).
- **Pages own data; components only display it.** Route files in `src/routes/dashboard/`
  import fixtures, compute what they need, and pass finished props. Components in
  `src/components/dashboard/` never import fixtures or fetch.
- Every data-showing component renders a visible "Mock data" label itself.
- No fake API layer. There is no `fetch` of local JSON and no mock server, so nothing pretends
  to be a backend.
- "Open deal" is defined once, in `src/lib/deals.ts` (`isOpenDeal`: `published` or
  `under_offer`). The Home count and the Deals page both use it, so they cannot disagree.
  `DealsList` does not decide what is open; the page filters.
- Holdings have no type in `src/types/` yet; `MockHolding` is a local shape in
  `src/fixtures/dashboard-mock.ts`. We did not invent a domain type during a UI sprint.

**Consequences.**
- Going live means changing each route file's data source (a loader or server function) and
  leaving the components alone. Each page can switch independently.
- When a page goes live, remove its "Mock data" labels in the same change. A label on live
  data is as misleading as a missing label on mock data.
- The labels are a stakeholder-safety feature, not decoration. Do not remove them from
  components that still show fixture data.
- `src/lib/user.ts` is an unused `getUser()` stub returning `null`, kept as the future seam
  for the signed-in user.

**Do not rip out:** the pages-own-data rule and `isOpenDeal`. They are what make the swap to
live data a small change.

---

## ADR-006: Responsive and accessibility baseline in one stylesheet

**Status:** Accepted and implemented. A baseline, not an audit.

**Context.** Investors will use phones and laptops. The brief requires a collapsing nav
at 375px, a persistent sidebar at 1280px, and no sideways page scroll.

**Decision.** Shell styles are in `src/styles/dashboard.css`, imported from
`src/styles.css` right after Tailwind. It provides:
- A persistent 16rem sidebar from 768px up. Below 768px the sidebar stacks above the
  content and the links sit behind the "Menu" button.
- A card grid (`.dash-card-grid`) of 1, 2 (from 640px) and 3 (from 1024px) columns.
- Tables scroll sideways inside their own box (`.dash-table-wrap`, minimum table width
  30rem), so the page itself never scrolls sideways. The box is keyboard-focusable and has an
  accessible name ("Holdings table, scrollable").
- Nav links at least 44px tall; a visible `:focus-visible` ring on links and buttons in
  the shell; a `prefers-reduced-motion` rule.
- Landmarks and labels: one `<main>`, one `<h1>`, `<nav aria-label="Dashboard">`,
  `aria-current="page"` on the active link, and `aria-labelledby` on each data section.

**Why it is built this way.**
- CSS media queries cannot read CSS variables, so the breakpoints (640, 768, 1024px) are
  written out where used. If you change one, change every place; the file comments
  mark them.
- `dashboard.css` is unlayered, so it beats Tailwind's layered utilities on the same
  element. Keep that in mind when a Tailwind class seems to be ignored on a shell element.
- Phone-width collapse is owned by `Sidebar` (see ADR-003), not by a second mobile component.

**Consequences.**
- Good enough to demo and to review against the brief. **Not** covered: a screen-reader test,
  a color-contrast audit, a "skip to content" link, or testing in Safari, Firefox or on a real
  phone. These are needed before production.
- On a 375px phone, the portfolio table's right-hand columns are off-screen until scrolled.
  A stacked card layout is a design decision for later.

**Do not rip out:** the 44px targets, focus ring, and landmark ownership. New components
should meet the same baseline.

---

## Next-sprint foundations

None of the following exists yet. The table says what each builds on and what to keep.

| Foundation | Builds on | What to keep or watch |
| --- | --- | --- |
| GitHub Actions CI | The three manual gates in `package.json`: `typecheck`, `typecheck:errors`, `build`. No workflow exists today, and there is no test or lint script. | `typecheck:errors` must be asserted to report exactly 9 errors, not zero. Pin dependencies first (see below) so CI results are repeatable. |
| Supabase auth | The `src/routes/dashboard.tsx` layout route (add the guard there), the `src/lib/user.ts` stub, and the `Header` (ADR-003). | Public `/` and `/about` stay under `_site`. Update the "no auth guard" rule in `docs/dashboard-ia.md` and the "no user menu" rule in `docs/component-plan.md` in the same change. Secrets go in the Vercel dashboard, never in git. |
| Live portfolio and deals data | Route files own the data (ADR-005); components take props and stay unchanged. `isOpenDeal` in `src/lib/deals.ts` stays the single definition of "open". | Add a holdings type to `src/types/` first. Validate at the boundary: the Sprint 2 "Known holes" are the runtime-validation backlog. Remove "Mock data" labels page by page as each goes live. |
| pgvector search | Needs data in Postgres first (the step above). A search UI would be a new component under `src/components/dashboard/`, added to a page in `navConfig`'s existing area, not a new nav system. | Do not start before live data exists. Add any new route through `navConfig` (ADR-004). |
| Dependency pinning | `package-lock.json`, which already holds the working versions. | `@tanstack/*` and `@tanstack/devtools-vite` are set to `"latest"` in `package.json`. Pin them to the locked versions so a fresh install cannot silently change behavior. |

## Explicit non-goals for Sprint 3

- Sign-in, sign-up, sessions, or any authorization rule
- Live Supabase or PostgreSQL data, or pgvector
- Payments, subscriptions, e-signature, or any action on a deal
- Admin tools, profile editing, charts or analytics beyond static cards
- A final brand system, deployment hardening, or CI beyond the existing Vercel setup
