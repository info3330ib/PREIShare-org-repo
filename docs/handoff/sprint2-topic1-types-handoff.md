# Sprint 2 Topic 1 — Types Handoff: PREIshare Investor Listings

**Audience:** next sprint topic owners, PREIshare engineering, and product partners who did not watch this get built
**Status:** Topic 1 (TypeScript foundations) complete. Implementation topics not started.
**Date:** 2026-09-19

## 1. Client story recap

PREIshare was shipping investor listing data as loose objects and ad-hoc JSON. That let
bad data reach production: a listing with no asking price, the same status spelled three
different ways so filters disagreed across screens, and nested address fields that
existed on one page and vanished on another. Investors make financial decisions from
this data, so a listing that *looks* complete but is not is worse than no listing at all.
Sprint 2 Topic 1 modeled investor listings as strict TypeScript types, so those mistakes
now fail at **compile time**, while a developer is still writing the code, rather than in
front of an investor.

## 2. What we shipped this topic

| Deliverable | Path | Why it matters |
| --- | --- | --- |
| Domain brief | `docs/domain/investor-listing-domain-brief.md` | Actors, lifecycle statuses, and what makes a listing valid, in business language |
| Field inventory | `docs/domain/listing-field-inventory.md` | Field-by-field shapes and required-vs-optional rules |
| Types barrel | `src/types/index.ts` | Single import path. Exports 13 public types |
| Core listing type | `src/types/investor-listing.ts` | `InvestorListingBase` plus the `InvestorListing` discriminated union |
| Closed vocabularies | `listing-status.ts`, `property-type.ts`, `contact-role.ts`, `ownership-relationship.ts`, `currency-code.ts` (all in `src/types/`) | Five string unions; none of these fields can be free text |
| Nested shapes | `address.ts`, `financial-summary.ts`, `investor-contact.ts`, `ownership.ts` (all in `src/types/`) | Address, money, contacts, and ownership stay structured groups |
| Valid fixtures | `src/fixtures/sample-investor-listings.ts` | Five realistic listings, one per status, proving good data compiles |
| Invalid fixtures | `src/fixtures/invalid-listings.errors.ts` | Nine deliberately broken listings, proving bad data is rejected |
| Expected errors | `docs/type-safety/expected-type-errors.md` | Maps each broken case to its business problem and real compiler message |
| Verification checklist | `docs/type-safety/verification-checklist.md` | The acceptance gate to walk before review |
| Decision record | `docs/decisions/ADR-001-investor-listing-types.md` | Why each type is shaped the way it is, for stakeholders |
| Types README | `src/types/README.md` | Beginner instructions for running the gate |

### The three decisions that matter most

1. **Every "pick from a list" field is a closed list, never free text.** Five of them:
   listing status, property type, contact role, ownership relationship, currency.
2. **A sold listing must record when it closed.** The type cannot represent a sold
   listing without a close date, nor a draft that has one.
3. **Identifiers and timestamps cannot be overwritten** once a listing exists
   (`readonly id`, `createdAt`, `updatedAt`).

### How to verify locally

```bash
npm run typecheck          # must PASS (exit 0). This is the gate.
npm run typecheck:errors   # must FAIL, reporting 9 errors. That failure is the proof.
```

Then walk `docs/type-safety/verification-checklist.md`.

## 3. What we must NOT claim is done yet

- **No UI.** No TanStack Start forms, pages, or components are wired to these types.
- **No database.** No Supabase or PostgreSQL tables, migrations, or row types exist from
  this model. There is no Supabase client in the repo at all yet.
- **No API.** No HTTP routes, no request/response validation at the network boundary.
- **No runtime validation.** No Zod or equivalent. Nothing checks values at run time.
- **No auth.** No authorization or multi-tenant rules.
- **Nothing deployed.** No listing create/edit flow is in production.

### The honest limitation to state out loud

A green typecheck does **not** mean the data is valid. TypeScript checks *shape*, not
*values*. Nine categories of bad data still compile today, including an ownership share
of 150 percent, shares that do not total 100, a `primaryContactId` pointing at a contact
that does not exist, an empty contacts list on a published listing, and a negative asking
price. They are listed in the "Known holes" table of
`docs/type-safety/expected-type-errors.md`, and they are runtime-validation work.

If a demo shows green typecheck on fixtures, the correct sentence is:
**"the data model is typed and verified; product surfaces and value-level validation are next."**

## 4. Next sprint pickups (use the types, do not reinvent them)

### A. TanStack Start forms (UI)

- Build create/edit listing forms whose fields **import from `src/types/index.ts`**. Do
  not copy status or property-type strings into components as literals.
- Drive dropdown options from the unions (`ListingStatus`, `PropertyType`, `ContactRole`,
  `OwnershipRelationship`, `CurrencyCode`) so a new value added to a union appears in the
  UI instead of drifting from it.
- Use `src/fixtures/sample-investor-listings.ts` as realistic form defaults and examples.
- Remember the discriminated union: a form that sets status to `sold` must also collect
  `closedAt`, and must not collect one for any other status.
- Acceptance sketch: a form cannot submit a status outside the union without failing
  typecheck during development.

### B. Supabase / PostgreSQL schema alignment (data)

- Draft columns that mirror the required fields on `InvestorListingBase`, with the five
  closed vocabularies as CHECK constraints or enum types, not free `text`.
- Model `contacts` and `ownership` as related tables, since both are arrays in the type.
- `financialSummary` is **optional** in TypeScript. Decide deliberately whether the
  database mirrors that as nullable columns, and record the answer in a follow-up ADR.
  Do not let the two silently diverge.
- Generated row types must be mapped to the types in `src/types/index.ts`, not used as a
  second, competing definition of a listing.
- Acceptance sketch: a row that would fail `InvestorListing` assignment is also rejected
  by database constraints.

### C. API boundaries (server)

- Define request/response shapes that **import from `src/types/index.ts`** and compose
  those types, rather than declaring anonymous JSON shapes.
- Never widen `status` or any other union back to plain `string` at the boundary. If an
  escape hatch is genuinely needed, document it in an ADR first.
- This is the right layer for the "Known holes" runtime checks: percentage ranges,
  share totals, id references, non-empty contacts, positive prices.
- Acceptance sketch: tests send fixture-shaped payloads (accepted) and known-bad payloads
  (rejected) at the boundary.

```text
Client pain (loose JSON)
        |
        v
 Domain brief + field inventory
        |
        v
 Strict TS types + fixtures + typecheck + ADR-001   <-- you are here
        |
        +--> TanStack Start forms (UI)
        +--> Supabase/PostgreSQL schema (data)
        +--> API routes & runtime validation (boundary)
```

## 5. Prompting and review self-assessment

> Written in first person by the learner. This is a record of how the work was
> actually done, not an assistant's summary of it.

- **Prompting habit that helped:**
I pasted the scaffold and diffed against the actual repo to see of anything needed to be adjusted.
- **Second prompting habit that helped:**
When a scaffold conflicted I would trust the inventory every time so types and docs could stay synced.
- **Review habit that caught an agent mistake:**
Pushed back on listing ownership as Ownership[] of contact-linked rows instead of a required Ownership with ownerName, just ensuring output matches whats expected and not allowing significant changes without review.
- **What I would do differently next topic:**
Repeating context to the AI instead of stating it one time I mention to stay true to the inventory several times.
- **Confidence (1-5) explaining `InvestorListing` to a teammate:**
4

## 6. Handoff checklist for the next owner

- [ ] Read `docs/decisions/ADR-001-investor-listing-types.md` and this handoff before opening a UI or SQL PR
- [ ] Import listing types from `src/types/index.ts` only, never redefine the listing shape
- [ ] Keep `npm run typecheck` green on valid fixtures
- [ ] Keep `npm run typecheck:errors` failing; those failures are the safety evidence
- [ ] Do not delete `src/fixtures/invalid-listings.errors.ts`; it documents what the types reject
- [ ] Treat the "Known holes" table as the runtime-validation backlog, not as solved
- [ ] File a new ADR if product changes allowed statuses, required fields, or optionality
