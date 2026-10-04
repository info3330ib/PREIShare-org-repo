# PREIshare Investor Dashboard — Component Inventory

## Scope

Reusable UI pieces for a responsive dashboard shell with **mock data only**.
Components present structure and placeholder content. None of them call real APIs,
query a database, or check who the user is.

Page map: `docs/dashboard-ia.md`. Scope: `docs/investor-dashboard-brief.md`.

## Where these files go

All dashboard components live in **`src/components/dashboard/`**, not directly in
`src/components/`. The starter app already has `src/components/Header.tsx`, used by
`src/routes/__root.tsx`. Putting the dashboard `Header` in its own folder keeps the
locked component name without overwriting or shadowing the starter file.

**As built:** the widgets and page-level components are in `src/components/dashboard/`,
as planned. The layout components (`AppShell`, `Sidebar`, `Header`) and `navConfig.ts`
ended up in `src/components/layout/` instead, next to a small helper, `NavItems.tsx`,
that `Sidebar` uses to render the links. The dashboard `Header` still does not collide
with the starter `src/components/Header.tsx`.

## Data rule: pages own data, components only display it

Route page files hold or import the mock data and pass it to components as props.
Components are presentational: they never import fixtures, define mock data, or
fetch anything. This keeps "where does this number come from?" answerable in one
place per page.

## Layout components (shared chrome)

| Component | Responsibility | Used on | Must NOT do |
| --- | --- | --- | --- |
| `AppShell` | Arranges `Sidebar`, `Header`, and the main content region into one responsive frame | All four `/dashboard` pages, via the parent layout route | Render any page widget, hold mock data, or define nav items |
| `Sidebar` | Renders the nav items from `navConfig`, highlights the active one, and collapses or stacks at phone width | `AppShell` | Define its own list of labels or paths; show the page title |
| `Header` | Shows the current page title, looked up from `navConfig` by URL | `AppShell` | Render nav links; show a user menu, avatar, or sign-out control |
| `navConfig` | The single list of nav labels and paths: Home `/dashboard`, Portfolio `/dashboard/portfolio`, Deals `/dashboard/deals`, Profile `/dashboard/profile` | `Sidebar` and `Header` | Contain any route not in `docs/dashboard-ia.md`; render anything (it is data, not a component) |

## Dashboard home widgets

| Component | Responsibility | Used on | Must NOT do |
| --- | --- | --- | --- |
| `StatsCard` | Shows one headline metric: a label, a value, and a "Mock data" label. Home uses three: total portfolio value, number of holdings, open deals count | Dashboard home | Compute its own value, fetch data, or show more than one metric |
| `PortfolioSummary` | Shows how holdings break down by property type (for example 2 multifamily, 1 office), with a "Mock data" label | Dashboard home | Repeat the total portfolio value (that belongs to a `StatsCard`); list individual holdings (that belongs to `PortfolioTable`) |
| `RecentActivity` | Lists about five mock recent events, with a "Mock data" label | Dashboard home | Link to pages outside the four in the IA; include navigation |

## Page-level components

| Component | Responsibility | Used on | Must NOT do |
| --- | --- | --- | --- |
| `PortfolioTable` | Lists mock holdings one per row: property name, property type, value, ownership share, with a "Mock data" label | Portfolio | Show market data, sorting controls backed by a server, or a total-value summary |
| `DealsList` | Lists the open deals it is given as `InvestorListing` values from `src/types/index.ts`, with a "Mock data" label | Deals | Decide which statuses count as open (the page filters); offer invest, checkout, or subscribe actions; redefine the listing shape |
| `ProfileCard` | Shows mock name, email, phone, and investor-since date, with a "Mock data" label | Profile | Edit fields, change passwords, or show any auth state |

## Composition rules

1. One job per component. If two rows describe the same job, merge or delete one.
2. Layout components wrap pages; page widgets never re-implement the shell.
3. Nav labels and paths exist in exactly one place: `navConfig`.
4. Pages own data; components receive it as props.
5. Listing data is typed with `InvestorListing` from `src/types/index.ts`. No component redeclares it.
6. Names above are locked for later prompts. Renaming requires updating both docs.

## Mapping check (IA ↔ components)

| Page | Components inside `AppShell` |
| --- | --- |
| Home `/dashboard` | `StatsCard` ×3, `PortfolioSummary`, `RecentActivity` |
| Portfolio `/dashboard/portfolio` | `PortfolioTable` |
| Deals `/dashboard/deals` | `DealsList` |
| Profile `/dashboard/profile` | `ProfileCard` |

Every page has at least one component. Every component is used by at least one
page or by `AppShell`. No component is unused.

## Review notes: fixes applied after the critique pass

The first draft was compared against `docs/dashboard-ia.md` for overlapping jobs,
pages without components, and components without pages. Fixes applied:

| Problem found | Fix |
| --- | --- |
| `PortfolioSummary` and the "total portfolio value" `StatsCard` both showed total value | `PortfolioSummary` now shows only the breakdown by property type |
| Who builds the "Mock data" label was unassigned | Each data-showing component owns its own label; no extra component added |
| `Header` had a "user/placeholder area" that invites a user menu or sign-out button | Removed; `Header` shows the page title only |
| Page title and nav label could drift | Both read from `navConfig` |
| `ProfileCard` listed "preferences", which the brief never asked for | Removed; fields now match the brief exactly |
| Deals described as "open / featured"; "featured" is not in the brief | Reduced to open deals, with the status rule defined in the IA |
| Unclear whether `DealsList` or the page decides what "open" means | The page filters; `DealsList` only displays |
| No component owned the phone-width layout | `Sidebar` owns collapsing or stacking; no separate mobile nav component |
| A dashboard `Header.tsx` would collide with the starter `src/components/Header.tsx` | Dashboard components live in `src/components/dashboard/` |

All page and component checks above pass: every page has a component, and every component is used somewhere.
