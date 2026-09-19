# PREIshare investor listing types

This folder holds **shared TypeScript types** for PREIshare investor listings.

## Why this exists

From the domain brief: PREIshare must *"catch missing or invalid data before
production (at compile time once types exist)."*

Loose objects and ad-hoc JSON let bad data reach production: a missing price, a
status spelled three different ways, or a nested address field that vanishes on
one screen. Investors make financial decisions from this data, so a listing that
looks complete but is not is worse than no listing at all. These types catch
those mistakes at **compile time**, before users see them.

## What belongs here

- Domain type modules only (listing, address, status, contacts, ownership).
- No UI components, no API route handlers, no database clients. Those live
  elsewhere in `src/`.

## Typecheck

From the project root:

```bash
npm install
npm run typecheck
```

**What success looks like:** the command finishes and prints nothing, with exit
code 0. No news is good news.

Notes for beginners:

- `tsc --noEmit` means "check types only; do not write compiled JavaScript files."
- This is the team's pre-review gate. Run it before asking for review.
- Valid sources include everything under `src/types/**` and
  `src/fixtures/sample-investor-listings.ts`. All of it must pass.

### The intentional error file

`src/fixtures/invalid-listings.errors.ts` is **supposed to fail.** Each export in
it breaks one rule on purpose, to prove the types actually reject bad data.

It is excluded from the clean gate in `tsconfig.json`, so it will never make
`npm run typecheck` go red. To check it deliberately:

```bash
npm run typecheck:errors
```

That command is **expected to print errors and exit non-zero.** That is the pass
condition, not a failure. The errors it prints should match the table in
`docs/type-safety/expected-type-errors.md`. If an expected error stops appearing,
a type got looser and something needs fixing.

## Strict mode (plain language)

`strict: true` in `tsconfig.json` turns on the checker's safest rules. This
project also enables:

- `noUncheckedIndexedAccess` — reading `list[0]` might return nothing, so you
  must handle the empty case.
- `exactOptionalPropertyTypes` — an optional field being absent is different
  from it being present and undefined.
- `noImplicitOverride` — overriding an inherited member must say so explicitly.

Together these refuse incomplete or loosely typed data, so the team can trust
shared listing models.

## Source of truth

Business vocabulary and field rules come from:

- `docs/domain/investor-listing-domain-brief.md` — actors, goals, lifecycle
  statuses, and what makes a listing valid.
- `docs/domain/listing-field-inventory.md` — field-by-field shapes and whether
  each one is required.

If a type here allows a status or field those documents do not list, the type is
wrong.
