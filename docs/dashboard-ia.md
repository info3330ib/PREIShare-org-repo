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

### Open question: the starter app's root chrome

`src/routes/__root.tsx` currently wraps **every** route, including future
`/dashboard/*` routes, in the starter app's `Header` and `Footer`. Unless that
changes, dashboard pages will render the starter header *and* the dashboard header.

Decide before the routing step, for example:
- leave the starter chrome and accept a two-header look for now, or
- render the starter `Header`/`Footer` only outside `/dashboard`.

Either way, the existing `/` and `/about` pages stay working and untouched.
