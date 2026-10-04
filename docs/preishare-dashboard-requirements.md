# PREIshare Investor Dashboard — Requirements Brief

**Date:** 2026-10-04
**Sprint:** 3 (dashboard shell)
**Audience:** anyone planning or reviewing this sprint, including people who have not written code. Later steps (routes, components, prompts) use this file as the scope contract.

**How to use this file:** if a proposal, prompt, or agent output adds something that is not in sections 3 and 5 "Must-have", compare it to section 5 "Later" and section 8 "Scope-creep watch list". If it is listed there, or not listed at all, the answer is no until the scope is changed here on purpose.

Related, more detailed documents: the client brief [investor-dashboard-brief.md](investor-dashboard-brief.md), the page map [dashboard-ia.md](dashboard-ia.md), and the component list [component-plan.md](component-plan.md). If they ever disagree with this file, stop and reconcile them; do not pick one silently.

**Hard constraint for this sprint:** the deliverable is a **demoable shell** only. No live portfolio data, no payments, and no authentication flows.

## 1. Product context

PREIshare is an investment product for real estate. This sprint builds an **investor-facing dashboard shell**: a clear home base where an investor can eventually see portfolio metrics, recent activity, and get into deeper tools. A *shell* is the frame of the product (header, navigation, page layout) filled with placeholder content, so stakeholders can react to the layout before any real data exists.

Everything an investor sees this sprint is placeholder ("mock") data, and it is labeled "Mock data" on screen. Nothing is connected to a database, and there is no sign-in.

## 2. Primary actor and goals

- **Actor:** the **investor**: one person looking at their own dashboard. For this sprint we assume a single investor and no account switching. Because there is no sign-in yet, anyone who opens the address sees the same demo content.
- **Not an actor this sprint:** administrators who manage deals and investors. They are named only so nobody builds for them yet.

**Goals on first visit** (what the investor needs, in order):

1. **Know where they are.** Recognize the PREIshare investor area from the branding and a page title.
2. **Move around without getting lost.** Reach every dashboard section from persistent navigation, and always see which one is current.
3. **See portfolio metrics at a glance.** Total value, number of holdings and open deals on the first screen, with no clicks.
4. **Scan recent activity.** See a short list of recent events about their investments.
5. **Trust what they see.** Tell instantly that the numbers are placeholders, on a phone as well as a laptop.

## 3. Screens (this sprint)

| Screen | URL | Purpose | In this sprint? |
| --- | --- | --- | --- |
| Dashboard home | `/dashboard` | Metrics cards, portfolio breakdown, recent activity (placeholders) | Yes |
| Portfolio | `/dashboard/portfolio` | Table of placeholder holdings | Yes (minimal) |
| Deals | `/dashboard/deals` | Open deals from the sample listings | Yes (minimal) |
| Profile | `/dashboard/profile` | Read-only placeholder name, email, phone, investor-since date | Yes (minimal) |
| Sign-in / sign-up | none | Authentication | **No** (later) |
| Live portfolio detail, trades | none | Deep investment tools | **No** (later) |

Exactly these four dashboard pages. They prove that routing and navigation work. No other dashboard page is in scope.

## 4. Layout regions

Every dashboard page uses the same frame. The four regions the investor sees, plus the area they live in:

| # | Region | What it is | Not this sprint |
| --- | --- | --- | --- |
| 1 | **Header** | The PREIshare name or logo area and the current page title | A user menu, avatar, or sign-out control (see section 8) |
| 2 | **Navigation** | A sidebar on desktop; collapses or stacks behind a menu control on small screens. Labels: Home, Portfolio, Deals, Profile. Current page is highlighted | Nested menus, search, notifications |
| 3 | **Metrics region** | Cards with summary numbers (total portfolio value, number of holdings, open deals) and a breakdown of holdings by property type. Placeholders | Live balances, charts needing time-series data |
| 4 | **Activity region** | A list of about five recent items. Placeholders | Filters, pagination, links into deeper tools |
| – | **Main content area** | The container inside the shell where the page-specific content renders. The metrics and activity regions sit here on Home; Portfolio, Deals and Profile fill it with their own content | |

Metrics and activity appear on **Home**. On the other three pages the header, navigation and main content area are the same.

## 5. Must-have vs later

### Must-have (demoable shell)

- File-based routes under `/dashboard` (one per page in section 3).
- One app shell that composes header, navigation and main content for every dashboard page.
- Responsive behavior: usable on phone (375px), tablet, and laptop (1280px) widths, with no sideways page scrolling.
- Placeholder metric cards and a recent-activity list on the home page.
- A visible **"Mock data" label** on every placeholder number, table and list.
- Clear navigation labels an investor would understand (one word each) and a highlighted current page.
- Empty-state wording is allowed where a section has no data, but is not required, because the placeholder data is always present.

### Later (explicitly out of scope now)

- Real Supabase or PostgreSQL queries, balances, or pgvector search
- Authentication, roles and permissions, including a user menu, avatar or sign-out
- Payments, subscriptions, e-signature, document vault, tax exports
- Acting on a deal (invest, offer, checkout) and editing the profile
- Admin tools for managing investors or deals
- A polished design system or final brand beyond a clean functional layout
- Charts that need live time-series data
- Production hardening: CI, error boundaries, loading states, accessibility audit

## 6. Success criteria

Each item is observable in a browser with no database and no login.

- [ ] Open `/dashboard` in the browser and it loads. The page title reads "Home".
- [ ] On a desktop width (1280px), the header, a persistent sidebar, the metrics cards and the recent-activity list are all visible on Home.
- [ ] From any of the four pages, click once in the navigation to reach each of the other three; the page title changes to match the nav label and the current nav item is highlighted.
- [ ] At phone width (375px), the navigation collapses behind a Menu control, opens, and closes after you choose a page. Nothing overlaps and the page does not scroll sideways.
- [ ] Every number, table and list on every dashboard page shows a visible "Mock data" label.
- [ ] No sign-in, payment, invest, edit or checkout control appears anywhere.
- [ ] No page exists beyond the four in section 3 (the starter app's `/` and `/about` pages are the only others).
- [ ] `npm run typecheck` and `npm run build` still pass.
- [ ] A teammate can read this brief and understand the scope in under five minutes.

**Status at Sprint 3 handoff:** the evidence for each of these is recorded in [verification-checklist.md](verification-checklist.md) and the demo steps in [sprint3-handoff.md](sprint3-handoff.md). This file defines the criteria; those files record the results.

## 7. Notes for the AI-assisted build

- Every implementation prompt should quote or attach this file as scope control.
- Build in small milestones, reviewing each before the next: routes, then shell, then navigation, then widgets, then compose pages, then responsive QA.
- One area or component per prompt, not one prompt for the whole dashboard.
- Use TypeScript, TanStack Start file-based routes, and mock data with visible labels. Reuse the existing Sprint 2 listing types and fixtures for deals; do not redefine them.
- Reject agent output that adds out-of-scope fintech features without asking. When in doubt, move the idea to "Later" rather than building it.

## 8. Scope-creep watch list

Things a drafting assistant or coding agent tends to add, and the decision for each:

| Tempting addition | Decision |
| --- | --- |
| "Signed-in user" wording, login or signup pages, route guards | **No.** There is no sign-in this sprint. The actor is an investor viewing demo content |
| User name, avatar or account dropdown in the header | **No.** Moved to Later. It implies authentication. The header shows branding and the page title only |
| Wire transfers, funding, withdrawals, payments | **No.** Later |
| Tax reports or exports, document vault | **No.** Later |
| Live prices, crypto or stock ticker, market data | **No.** Not a product goal |
| Time-series charts, analytics dashboards | **No.** Static cards only |
| Invest, make an offer, or edit-profile buttons | **No.** The client brief allowed inert buttons, but none are needed and none were built; this contract is the stricter of the two |
| An admin area | **No.** Named as a future actor only |
| Extra pages (settings, notifications, messages, search) | **No.** Only the four in section 3 |
| New dependencies for UI kits, charts or state management | **No** without a decision recorded here first |
