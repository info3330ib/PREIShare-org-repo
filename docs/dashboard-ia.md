# PREIshare Investor Dashboard — Information Architecture

## Purpose

Map of the investor-facing pages for the Sprint 3 dashboard shell. Mock data only.
No sign-in, no admin tools, and no live API or database contracts this sprint.

Source of scope: `docs/investor-dashboard-brief.md`.
Component names referenced here are defined in `docs/component-plan.md`.

## URL map and page purposes

| URL path | Route name | Nav label | Page purpose | Primary content |
| --- | --- | --- | --- | --- |
| `/dashboard` | Dashboard home | Home | Let an investor see their portfolio's size and recent activity on the first screen, with no clicks | Three `StatsCard`s (total portfolio value, number of holdings, open deals count), `PortfolioSummary`, `RecentActivity` |
| `/dashboard/portfolio` | Portfolio | Portfolio | Show every holding the investor owns, one row each | `PortfolioTable` of mock holdings: property name, property type, value, ownership share |
| `/dashboard/deals` | Deals | Deals | Show the listings an investor could currently act on | `DealsList` of open deals only (see Deals rule below) |
| `/dashboard/profile` | Profile | Profile | Show the investor's own contact details | `ProfileCard`: name, email, phone, investor-since date |

Four pages, four unique URLs, four nav labels of one word each. No other page is in scope.

### Deals rule: what counts as "open"

Deal data comes from `sampleInvestorListings` in `src/fixtures/sample-investor-listings.ts`.
Those five listings cover every status, but not every status belongs on an investor's
screen. Per `docs/domain/investor-listing-domain-brief.md`:

| Status | Show on Deals page? | Why |
| --- | --- | --- |
| `published` | Yes | Visible to investors |
| `under_offer` | Yes | Active interest, still structured like a published listing |
| `draft` | No | Internal only, never visible to investors |
| `sold` | No | Closed deal, not something to act on |
| `archived` | No | Removed from active browse |

With the current fixtures, that means two deals appear, and the home page's
"open deals" stat card reads 2. Both numbers come from the same filter, so they
cannot disagree.

## Navigation rules

- **Shared chrome:** a sidebar for navigation, a dashboard header showing the page
  title, and a main content region. All four pages use the same chrome.
- **Active state:** the nav item matching the current URL is visually highlighted.
- **Page title:** the visible page title equals the nav label (Home, Portfolio,
  Deals, Profile). Both are read from one nav config, so they cannot drift.
- **Desktop (1280px):** sidebar stays visible on the left at all times.
- **Phone (375px):** the sidebar collapses or stacks above the content. Nothing
  overlaps and nothing needs sideways scrolling.
- **Nesting:** every page sits under `/dashboard`, so one parent layout wraps them all.

## Mock data rule

Every number, table row, list item, and profile field shown is mock data and
carries a visible "Mock data" label. Investors and stakeholders must never mistake
a placeholder for a live figure.

## Out of scope for this shell

- Sign-in, sign-up, sessions, and any role or permission checks
- Live Supabase or PostgreSQL queries
- Admin or sponsor tools
- Settings, notifications, and preferences pages
- Payments, subscriptions, and document vaults
- Acting on a deal or editing the profile (buttons may appear but do nothing)

## Notes for later route files

Parent layout route: `dashboard`, wrapping `AppShell` around its children.
Child routes: index (home), `portfolio`, `deals`, `profile`.

The parent must not use an `_authed` segment or any auth guard. Pages are public
this sprint.

### Decision: dashboard pages show only the dashboard chrome

**Decided 2026-10-03.** `/dashboard/*` pages render `AppShell` only, with no starter
`Header` or `Footer`. This follows the common pattern of separating a public site
layout from an app layout, and keeps a single navigation on screen, as the brief's
success criteria require.

**Problem it solves:** `src/routes/__root.tsx` currently wraps every route in the
starter `Header` and `Footer`, which would put two headers on dashboard pages.

**How:** use a TanStack Start pathless layout route (a route whose name starts
with `_`, which groups pages without adding anything to the URL):

```text
src/routes/
  __root.tsx        trimmed to <html>, <head>, <body>, and scripts only
  _site.tsx         renders the starter Header + Footer around its children
  _site/
    index.tsx       moved from routes/index.tsx   (URL stays /)
    about.tsx       moved from routes/about.tsx   (URL stays /about)
  dashboard.tsx     dashboard layout, renders AppShell (with an <Outlet />)
  dashboard/
    index.tsx  portfolio.tsx  deals.tsx  profile.tsx
```

`dashboard.tsx` beside the `dashboard/` folder is equivalent to `dashboard/route.tsx`
inside it. The flat form was chosen when the routes were built.

**Rejected alternative:** checking the URL inside `__root.tsx` ("skip the header
if the path starts with `/dashboard`"). It works, but it is string matching that
has to be updated by hand whenever a new section is added.

**Tradeoffs accepted:**
- The starter `/` and `/about` files move into `_site/`. Their URLs and content do
  not change, but their file locations do, so "untouched" here means unchanged in
  behavior, not in location.
- `ThemeToggle` lives in the starter `Header`, so dashboard pages will not have
  one. The brief does not require it.

**Acceptance for the routing step:** `/` and `/about` still show the starter header
and footer; all four `/dashboard` pages show only the dashboard header and sidebar;
`npm run typecheck` and `npm run build` both pass.
