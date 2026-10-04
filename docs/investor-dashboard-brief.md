# PREIshare Investor Dashboard — Client Brief (Sprint 3 Shell)

## Product summary

PREIshare investors need one place to check what they own, see which deals are
open, and confirm their own details, without hunting through cluttered pages.
This sprint delivers the **shell only**: a responsive layout, one file-based route
per investor area, and reusable React components filled with clearly labeled mock
data. There is no sign-in and no live data this sprint.

## Primary actors

| Actor | Role in this sprint | In scope to build? |
| --- | --- | --- |
| Investor (member) | Opens the dashboard to scan portfolio value, browse open deals, and review their profile | Yes, the only user this sprint |
| Future admin | Will manage deals and investors later | No, named here only so nobody builds for them yet |

## Investor goals

1. Open the dashboard and see a portfolio snapshot and recent activity on the first screen, with no clicks.
2. Move between Portfolio, Deals, and Profile without leaving the app shell or losing the navigation.
3. Tell at a glance which page they are on and which numbers are mock, on both a phone and a laptop.

## Must-have dashboard areas (this sprint)

Only these four. Anything else is out of scope.

| Area | Route idea (for later steps) | What the investor should see |
| --- | --- | --- |
| Home overview | `/dashboard` | Three stat cards (total portfolio value, number of holdings, open deals count), a portfolio summary placeholder, and a recent activity list of about five mock items |
| Portfolio | `/dashboard/portfolio` | A table or list of mock holdings: property name, property type, value, and ownership share |
| Deals | `/dashboard/deals` | A list of open deals using mock listings. The Sprint 2 fixtures in `src/fixtures/sample-investor-listings.ts`, typed by `src/types/index.ts`, are the preferred mock source so deal cards use real PREIshare field names and statuses |
| Profile | `/dashboard/profile` | A profile card with placeholder name, email, phone, and investor-since date |

## Success criteria (demo-ready shell)

Each item can be checked in a live demo with no database and no login.

- [ ] From any of the four pages, the investor can reach the other three in one click using persistent navigation.
- [ ] Each of the four routes renders its own page with a visible page title matching its nav label.
- [ ] The current page is visually highlighted in the navigation.
- [ ] Every page shares the same shell: navigation, header, and a main content region.
- [ ] At 375px wide (phone) the navigation collapses or stacks, nothing overlaps, and no sideways scrolling is needed. At 1280px wide (laptop) the navigation is a persistent sidebar.
- [ ] Every mock number, table, and list carries a visible "Mock data" label so stakeholders do not mistake it for live figures.
- [ ] No route exists beyond the four listed above (plus the starter app's existing pages, see Open questions).
- [ ] `npm run typecheck` and `npm run build` both still pass, so the existing Vercel production deploy is not broken.

## Out of scope (explicit non-goals for this sprint)

- Sign-in, sign-up, sessions, and any authorization rules
- Live Supabase or PostgreSQL data for portfolio, deals, or profile
- Payments, subscriptions, and document e-signature
- Admin tools for creating, editing, or deleting investors or deals
- Editing the profile or acting on a deal (buttons may appear, but do nothing)
- Charts or analytics beyond static placeholder cards
- Deployment hardening and CI beyond the existing Vercel setup

## Prompting notes for later AI steps

When directing a coding-agent or ide-copilot, attach or quote this brief and require:

- TypeScript and TanStack Start file-based routes under `src/routes/`.
- Reusable React components under `src/components/`, one concern per component.
- Mock data only, with a visible "Mock data" label wherever it appears.
- Listing data imported from `src/types/index.ts` and `src/fixtures/sample-investor-listings.ts`, never redefined inline.
- One area or component per prompt, then review, rather than one mega-prompt for the whole dashboard.

Reject output that adds a page, feature, or dependency listed under Out of scope, or that makes `npm run typecheck` or `npm run build` fail.

## Open questions / assumptions

- **Where the dashboard lives:** the starter app already has `/` and `/about` routes and a shared `Header`/`Footer`. Assumption: the dashboard lives under `/dashboard` and those starter pages stay untouched this sprint. Confirm before routing work starts.
- **Portfolio mock source:** there is no holdings type in `src/types/` yet. Assumption: portfolio mock rows are a small local array for now, and a proper type is a later decision, not invented during this sprint.
- **One persona:** assume a single investor viewing their own data, with no switching between portfolios or accounts.
- **Copy and brand:** assume English UI copy and a simple, professional look using the existing Tailwind setup. A full brand system is not required.
