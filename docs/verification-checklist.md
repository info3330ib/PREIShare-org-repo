# PREIshare Investor Dashboard Shell: Verification Checklist

**Sprint:** 3 (TanStack Start UI shell)
**Verifier:** Isaac B
**Date:** 2026-10-03
**Commit tested:** `bfb7889` (main) plus the `_site` layout change that fixes D1 (see section 6). The whole walkthrough was re-run on the final tree.
**App URL tested:** http://localhost:3000 (dev server, `npm run dev`)
**Sources of truth:** `docs/investor-dashboard-brief.md`, `docs/dashboard-ia.md`, `docs/component-plan.md`

## How to use this checklist

- **Pass:** requirement met; evidence describes what was seen.
- **Fail:** in-scope shell issue; fix before handoff or note the fix commit.
- **Deferred:** intentionally out of scope for this sprint; reason required.

## Method (read this before trusting the evidence)

Loaded every page at 1280px, 1024px, 900px, 768px, 767px, 640px and 375px wide, clicked the nav links, pressed Tab and Enter, resized a live window wide to narrow to wide, and looked at full-page screenshots.

Gates at the tested commit: `npm run typecheck` exit 0, `npm run typecheck:errors` reports exactly 9 errors, `npm run build` exit 0.

---

## 1. Routing and information architecture

| ID | Check | Status | Evidence |
|----|--------|--------|----------|
| R1 | `/dashboard` loads dashboard home inside AppShell | Pass | Opened /dashboard. Page title (h1) reads "Home". Three cards show $543,000, 4 holdings, 2 open deals, then "Holdings by property type" and "Recent activity" with 5 items. |
| R2 | `/dashboard/portfolio` loads portfolio page shell | Pass | Title "Portfolio". A table with 4 holdings (Oak Ridge Apartments, Bluebonnet Flats, Gateway Office Center, Trinity Logistics Hub). |
| R3 | `/dashboard/deals` loads deals page shell | Pass | Title "Deals". Two cards: Riverfront Multifamily (Open) and Cedar Industrial Park (Under offer). |
| R4 | `/dashboard/profile` loads profile page shell | Pass | Title "Profile". Card shows Morgan Ellis, example email, phone, "Investor since Mar 12, 2024". |
| R5 | Unknown paths do not break the whole app | Pass | `/nope` returns HTTP 404 with the framework "Not Found" page (after the `_site` change it no longer has the starter header or footer, because the root route no longer renders them). `/dashboard/nope` returns 404 inside the dashboard shell with title "Dashboard" and "Not Found", and no nav item highlighted. Neither crashes. The dev console warns that no `notFoundComponent` is configured (see D5). |
| R6 | Dashboard pages show only the dashboard chrome, no starter header or footer (decision recorded in `docs/dashboard-ia.md`, 2026-10-03) | Pass (was Fail, fixed, see D1) | Re-walked after the `_site` layout. All four `/dashboard/*` pages: no footer element, no "TanStack Start" or "Your name here" text, no theme button, and the dashboard header and sidebar start at the top. `/` and `/about` still show the starter header (Home / About / Docs links, theme button) and footer. Starter "Open investor dashboard" link goes to `/dashboard` without a reload. |
| R7 | No route exists beyond the four plus the starter pages | Pass | Generated route tree has 7 full paths: `/`, `/about`, `/dashboard`, `/dashboard/portfolio`, `/dashboard/deals`, `/dashboard/profile` (plus the `/dashboard/` index form). Nothing else. |

**IA notes:** URLs, nav labels and page purposes match `docs/dashboard-ia.md`. The one mismatch found, R6 (the `_site` pathless layout the IA doc records as decided), was built and re-checked; see D1.

---

## 2. Navigation labels and active states

| ID | Check | Status | Evidence |
|----|--------|--------|----------|
| N1 | Sidebar labels match brief/IA (Home, Portfolio, Deals, Profile) | Pass | Four links: Home, Portfolio, Deals, Profile, pointing to the four IA paths. One word each. |
| N2 | Active nav item highlights the current route | Pass | On each page exactly one link carried `aria-current="page"` and the highlighted background, and it was the matching one. Home is not highlighted on the other three pages. |
| N3 | Header page title updates when changing routes | Pass | Clicked Portfolio, Deals, Profile, Home in turn. The title changed to match each time. One h1 per page. |
| N4 | Nav links use client routing (no full reload) | Pass | Set a marker on the window object, clicked all four links, marker was still there after every click, so the page was never reloaded. |
| N5 | Logo/home control lands on the expected place | Pass (note) | The "PREIshare" brand in the sidebar is plain text, not a link, and the brief does not ask for one. The starter "TanStack Start" logo link no longer appears on dashboard pages (D1 fixed); it remains on `/` and `/about`, where it goes to `/`. |

---

## 3. Layout shell and responsiveness

| ID | Check | Status | Evidence |
|----|--------|--------|----------|
| L1 | AppShell shows sidebar + header + main on desktop (1280px) | Pass | Sidebar is a 256px column on the left, the header and main sit to its right. All four pages. Exactly one `<main>` per page. |
| L2 | Narrow viewport: nav remains usable | Pass | At 767px and below the sidebar stacks above the content and the links sit behind a "Menu" button (44px high). At 768px the sidebar becomes a left column and the button disappears. In a live resize 1280 to 700 to 375 to 1280 the nav was visible, then hidden behind Menu, then back. |
| L2a | Mobile menu opens, closes, and closes after navigating | Pass | Enter on the button opened it (`aria-expanded` true, 4 links visible). Clicking Deals went to /dashboard/deals without a reload and the menu closed itself. Clicking the button again opened and closed it. |
| L3 | No permanent horizontal scroll at ~375px on any page | Pass | At 375px the page width equals the window width on all four pages and at 640, 767, 768, 900, 1024, 1280. |
| L4 | Main content readable; cards/tables stack or scroll intentionally | Pass (polish noted) | Stat cards: 1 column at 375px, 2 at 640 to 1023px, 3 from 1024px. The portfolio table keeps a 30rem minimum and scrolls inside its own box (480px of content in a 309px box) while the page stays still. At 375px the Value and Your share columns start off-screen until you scroll the table sideways (D3). |
| L5 | Links/buttons keyboard-focusable with accessible names | Pass | Nav links are real links, 44px tall, with a solid 2px teal focus ring. The Menu button has the visible name "Menu", `aria-expanded`, and `aria-controls` pointing at the link list. With the menu closed, Tab skips the hidden links (focus left the Menu button without landing on any hidden link). The table box takes a Tab stop and has the label "Holdings table, scrollable". After the D1 fix, the first Tab stops on /dashboard/deals are the four nav links (Home, Portfolio, Deals, Profile), then the page content; there are no starter header stops. |

---

## 4. Mock content clarity (demo readiness)

| ID | Check | Status | Evidence |
|----|--------|--------|----------|
| M1 | Home stats cards show labeled mock investor metrics | Pass | "Total portfolio value $543,000", "Number of holdings 4", "Open deals 2", each with a hint line and a "MOCK DATA" label. |
| M2 | Portfolio summary / table shows clear placeholder holdings | Pass | Summary: Multifamily 2, Office 1, Industrial 1. Table: names, types, dollar values, share percentages. Both labeled "MOCK DATA". Values add to $543,000 and the count to 4, matching Home. |
| M3 | Deals list shows open-deal placeholders | Pass | Two open deals with city, asking price and status badge. Count matches the Home "Open deals 2" card. Draft, sold and archived listings are not shown. |
| M4 | Profile card shows member-style placeholder fields | Pass | Name, email (example.com address), phone, investor-since date, labeled "MOCK DATA". Read-only, no edit controls. |
| M5 | No raw "TODO" / empty broken panels on primary views | Pass | Searched each page's main text for TODO, lorem ipsum, undefined, NaN and [object: none found. Screenshots show no empty boxes. |
| M6 | Every data component carries a visible "Mock data" label | Pass | Label count: Home 5 (3 cards, summary, activity), Portfolio 1, Deals 1, Profile 1. |

---

## 5. Out-of-scope boundaries (must stay deferred)

| ID | Check | Status | Evidence / reason |
|----|--------|--------|-------------------|
| O1 | No real authentication / login gate | Deferred | Shell only; pages are public by design (`docs/dashboard-ia.md`). Auth is a later sprint. |
| O2 | No live Supabase/PostgreSQL data, mock data only | Deferred | All numbers come from `src/fixtures/`. No Supabase client exists in the repo. |
| O3 | No production deploy required for this verification | Deferred | Local dev server is enough. A production build ran clean (`npm run build` exit 0). Not deployed here. |
| O4 | No payments, document vault, or admin tools beyond the brief | Pass | Searched components and routes: no invest, checkout, subscribe or edit controls. The only button is the mobile Menu toggle. |

---

## 5b. Brief success criteria, mapped to the checks above

| Brief criterion | Result | Checks |
|-----------------|--------|--------|
| Reach the other three pages in one click from any page | Pass | N1, N3, N4 |
| Each route has its own page with a visible title matching its nav label | Pass | R1 to R4, N3 |
| Current page highlighted in the navigation | Pass | N2 |
| Every page shares the same shell: navigation, header, main | Pass | L1, R6 |
| 375px: nav collapses, no overlap, no sideways scroll; 1280px: persistent sidebar | Pass | L2, L3 |
| Every mock number, table and list carries a visible "Mock data" label | Pass | M1 to M4, M6 |
| No route beyond the four (plus starter pages) | Pass | R7 |
| `npm run typecheck` and `npm run build` pass | Pass | Gates above |

---

## 6. Defects found and resolution

| ID | Defect | Severity | Resolution | Re-check |
|----|--------|----------|------------|----------|
| D1 | Starter header and footer wrapped every dashboard page. Effects: a second banner landmark and `<nav>`, an extra "TanStack Start" heading, a starter "Auto" theme button, footer text "Your name here", 7 starter Tab stops before the sidebar, and the dashboard starting about 73px down the page. | Blocker (decided in `docs/dashboard-ia.md`, acceptance not met) | **Fixed** with the `_site` pathless layout from the IA doc: new `src/routes/_site.tsx` renders the starter Header and Footer around an Outlet; `index.tsx` and `about.tsx` moved to `src/routes/_site/` (URLs unchanged; the "Edit src/routes/index.tsx" hint on the starter home page now names the new path); `__root.tsx` no longer renders Header or Footer; `routeTree.gen.ts` regenerated. | Re-walked: `/` and `/about` keep header and footer; all four dashboard pages show none. `npm run typecheck` exit 0, `typecheck:errors` still exactly 9, `npm run build` exit 0. |
| D2 | Browser console error "Cannot use 'in' operator to search for 'subscribe' in undefined" on every page load in dev mode. | Polish | Not caused by dashboard code. The stack points into the starter's router devtools panel, and it also fires on `/` and `/about`. Production preview shows 0 page errors on `/`, `/about`, `/dashboard`. Likely tied to the `"latest"` @tanstack versions in `package.json` (existing housekeeping item). Left alone. | Dev: still fires. Prod: 0 errors |
| D3 | At 375px the portfolio table's Value and Your share columns are off-screen until the table is scrolled sideways, with no visual hint. | Polish | Left as is. Scrolling inside a labelled, keyboard-focusable box meets the brief. A stacked card layout on phones would be a design decision. | n/a |
| D4 | Browser tab title is "TanStack Start Starter" on every page. | Polish | The brief only requires the visible page title, which passes. Per-route tab titles were not requested. | n/a |
| D5 | Unknown `/dashboard/...` URLs show the default Not Found inside the shell with title "Dashboard"; dev console warns no `notFoundComponent` is set. Side effect of D1's fix: an unknown top-level URL such as `/nope` now shows the default Not Found with no starter header or footer. | Polish | Behaves safely (HTTP 404, no crash). A designed 404 was not requested. | n/a |

---

## 7. Sign-off for handoff

- [x] All **blocker** fails fixed or explicitly accepted with reason (D1 fixed)
- [x] Deferred items only cover agreed out-of-scope work (auth, live data, deploy)
- [x] Shell is demoable against the PREIshare client story for Sprint 3 (pending the verifier's own real-browser click-through, which this automated pass does not replace)

**Overall result:** Every in-scope check passes. No open blockers. Four polish items (D2 to D5) remain, none required by the brief.

**Verifier signature:** ___Isaac B_______________
