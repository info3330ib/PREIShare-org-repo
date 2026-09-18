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

## How to check types

From the project root:

```bash
npm install
npm run typecheck
```

That runs `tsc --noEmit`: TypeScript checks the project and reports errors
without writing any JavaScript output files.

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
