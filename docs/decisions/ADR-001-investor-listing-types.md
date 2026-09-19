# ADR-001: Investor listing TypeScript types (PREIshare)

- **Status:** Accepted (Sprint 2, Topic 1)
- **Date:** 2026-09-19
- **Owners:** PREIshare types working group (learner + coach)
- **Related code:** `src/types/index.ts` (single import path for the types package)

## Context

PREIshare investor listings were previously passed around as loose objects and
ad-hoc JSON. That allowed a specific family of production bugs: a listing with no
asking price, the same status spelled three different ways so filters disagreed
across screens, and nested address fields that existed on one page and vanished
on another. Investors make financial decisions from this data, so a listing that
*looks* complete but is not is worse than no listing at all.

Sprint 2 Topic 1 models the listing domain in strict TypeScript so those bad
shapes fail when the code is compiled, before anyone sees them.

Business inputs that drove the model:

- Domain brief: `docs/domain/investor-listing-domain-brief.md`
- Field inventory: `docs/domain/listing-field-inventory.md`
- Safety evidence: `docs/type-safety/expected-type-errors.md`
- Acceptance gate: `docs/type-safety/verification-checklist.md`

## Decision

We adopt a small, explicit types package centered on `InvestorListing`, with
supporting types for status, property type, address, financial summary, investor
contacts, ownership, contact role, ownership relationship, and currency.

Everything public is re-exported from `src/types/index.ts`, so other code imports
from one stable path rather than reaching into individual files.

Three decisions matter most, and are the ones worth being able to explain back:

1. **Every "pick from a list" field is a closed list, never free text.** Five of
   them: listing status, property type, contact role, ownership relationship, and
   currency.
2. **A sold listing must record when it closed.** The type physically cannot
   represent a sold listing without a close date, or a draft that has one.
3. **Identifiers and timestamps cannot be overwritten** once a listing exists.

## Type choices mapped to business rules

Every row below was checked against the actual type files on 2026-09-19.

| Business rule (plain language) | Type choice | Why this shape |
| --- | --- | --- |
| A listing always has an id, a title, a summary, a property type, an address, contacts, ownership, and created/updated timestamps | Required properties on `InvestorListingBase` (no `?`) | Optional core fields are how "missing data" bugs get reintroduced |
| Pricing may legitimately be missing early in a deal | `financialSummary?: FinancialSummary` is **optional** | Matches the field inventory. Note the tradeoff: an asking price is therefore *not* guaranteed on every listing |
| Listing status may only be one of five known values | `ListingStatus` string union: `draft`, `published`, `under_offer`, `sold`, `archived` | Free `string` allows typos and three spellings of one status |
| Property category is a closed vocabulary | `PropertyType` string union: `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, `land` | Same reason as status |
| A contact's role is a closed vocabulary | `ContactRole` string union: `broker`, `owner_rep`, `asset_manager`, `investor_relations` | Keeps role-based filtering reliable |
| An owner's relationship to the asset is a closed vocabulary | `OwnershipRelationship` string union: `primary_owner`, `co_owner`, `broker`, `property_manager` | Distinguishes who *owns* from who merely *brokers* |
| A price is always stated in a supported currency | `CurrencyCode` string union: `USD`, `CAD`, `EUR`, `GBP` | A price with an unknown currency cannot be displayed or converted |
| Street, city, region, postal code and country travel together | Nested `Address` object; all required except `unit` | Prevents half-present addresses; a property must be locatable |
| Money figures are a structured group, not one loose number | Nested `FinancialSummary`: `askingPrice` and `currency` required, `projectedIrrPercent` and `capRatePercent` optional | Keeps a price and its currency inseparable |
| A listing is never anonymous | `contacts: InvestorContact[]` plus `primaryContactId` naming one of them | A listing nobody can be reached about is not usable |
| A property can have several owners with different stakes | `ownership: Ownership[]`, each row linking a `contactId` to a `relationship` and an optional `sharePercent` | One owner field could not represent a co-owner *and* a broker |
| A sold listing must record when it closed; other statuses must not | `InvestorListing` is a **discriminated union** on `status`: the `sold` branch requires `closedAt: string`, all other branches type it as absent | Prevents both "closed deal with no close date" and "draft counted as a completed deal" |
| Identity and audit values must not be reassigned after creation | `readonly id`, `readonly createdAt`, `readonly updatedAt` on `InvestorListingBase` | Reassigning an id silently breaks every reference to that listing |

## Alternatives considered

1. **Keep listings as loose objects / `any` / untyped JSON.**
   Rejected. Fastest in the short term, but every bug then surfaces in production
   instead of at compile time, which is the exact situation this work replaces.

2. **One flat interface with dozens of optional fields.**
   Rejected. Optional-everything recreates the missing-field bugs, and flat
   fields hide the fact that an address or a price+currency belong together.

3. **`enum` for every closed vocabulary.**
   Not chosen. String unions read more plainly in fixtures and in error messages
   (`Type '"availble"' is not assignable to type '"draft" | "published" | ...'`
   names the real allowed values). Revisit only if a runtime enum object is needed.

4. **A single `Ownership` object per listing instead of a list.**
   Rejected after review. The domain brief explicitly describes a primary owner,
   a co-owner, and a broker, which one object cannot represent.

5. **A runtime validation library (for example Zod) as the source of truth now.**
   Deferred, see Out of scope. Compile-time types and fixtures come first;
   runtime validators can mirror these same decisions later.

## Consequences

**Positive**

- `src/fixtures/sample-investor-listings.ts` holds five realistic listings, one
  per status, proving a real listing can actually be built from these types.
- `src/fixtures/invalid-listings.errors.ts` holds nine deliberately broken
  listings, and the compiler rejects every one. Documented in
  `docs/type-safety/expected-type-errors.md`.
- `npm run typecheck` is the shared green gate before review.
  `npm run typecheck:errors` is the matching proof that bad data is rejected;
  that command is *supposed* to fail.

**Tradeoffs**

- Authors must use exact union members. An "almost right" status fails the build
  by design.
- Nested objects mean fixtures and any future API mapper must supply a whole
  `Address` or `FinancialSummary`, not scattered loose fields.
- Because `financialSummary` is optional, an asking price is not guaranteed on
  every listing. Code that needs a price must handle its absence.

**Important limitation, worth stating plainly**

A green typecheck does **not** mean the data is correct. TypeScript checks
*shape*, not *values*. Nine categories of bad data still compile today, including
an ownership share of 150 percent, shares that do not total 100, a
`primaryContactId` pointing at a contact that does not exist, an empty contacts
list on a published listing, and a negative asking price. These are listed in the
"Known holes" table of `docs/type-safety/expected-type-errors.md` and need runtime
validation. Nobody should read "typecheck passed" as "this listing is valid."

## Out of scope for Sprint 2 Topic 1

- Runtime validation libraries and schema definitions
- Database tables, migrations, or Supabase row types
- HTTP API routes and request/response validation
- React form components and client-side validation UX
- Authentication, authorization, and multi-tenant rules
- Search indexing or vector fields beyond the current listing model
- Changing production data or deploying a service

## Follow-ups (for the next topic / implementers)

1. Import domain types from `src/types/index.ts`, not from individual files.
2. Keep `npm run typecheck` green before expanding the model.
3. If product adds a new status, property type, contact role, ownership
   relationship, or currency: extend the **union**, update the field inventory
   and domain brief, update the fixtures, and update this ADR. Do not widen the
   field back to free `string`.
4. Build runtime validation for the "Known holes" list once an API boundary
   exists. That is where percentage ranges and id-reference checks belong.
5. Use `docs/type-safety/verification-checklist.md` as the acceptance gate
   whenever these types change.

## Evidence links

- Domain brief: `docs/domain/investor-listing-domain-brief.md`
- Field inventory: `docs/domain/listing-field-inventory.md`
- Expected compile errors: `docs/type-safety/expected-type-errors.md`
- Verification checklist: `docs/type-safety/verification-checklist.md`
- Types entrypoint: `src/types/index.ts`
- Valid fixtures: `src/fixtures/sample-investor-listings.ts`
- Invalid fixtures: `src/fixtures/invalid-listings.errors.ts`
