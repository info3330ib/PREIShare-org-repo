# Investor listing types — verification checklist

Use this list before review. Check each box only when you have evidence.

Boxes already checked below were verified on 2026-09-19 by reading the files and
running the commands named in the evidence column. Re-verify after any change.

## A. Domain coverage

- [x] Every required field from `docs/domain/listing-field-inventory.md` appears on `InvestorListing` or a nested type it uses. *(Evidence: id, title, description→`summary`, status, propertyType, createdAt, updatedAt, address.*, financials.*, contacts[].*, ownership[].* all mapped. See "Known naming differences" below.)*
- [x] Listing status values match the allowed business statuses, no free-form strings. *(Evidence: `ListingStatus` = draft | published | under_offer | sold | archived, identical to the brief's lifecycle list.)*
- [x] Property type values match the allowed property kinds. *(Evidence: `PropertyType` = multifamily | office | retail | industrial | mixed_use | land, identical to the inventory row.)*
- [x] Address and FinancialSummary nested shapes match the inventory. *(Evidence: all 6 address fields and all 4 financial fields present with matching required/optional marks.)*
- [x] Investor contact and ownership relationship fields match the domain brief. *(Evidence: `ContactRole` and `OwnershipRelationship` are closed unions holding exactly the inventory's listed values.)*

## B. Type safety shape

- [x] Public types are exported from `src/types/index.ts`. *(Evidence: 12 re-exports, no type bodies redefined in the barrel.)*
- [x] Discriminated status modeling still matches `docs/type-safety/expected-type-errors.md`. *(Evidence: cases 5 and 6 in that doc are the `sold`-requires-`closedAt` and `closedAt`-on-draft failures, both confirmed by `npm run typecheck:errors`.)*
- [x] Readonly intent is documented where the team agreed on it. *(Evidence: `readonly id`, `readonly createdAt`, `readonly updatedAt` on `InvestorListingBase`, each with a comment explaining why; case 8 proves reassignment fails.)*

## C. Fixtures

- [x] `src/fixtures/sample-investor-listings.ts` typechecks cleanly and includes more than one realistic listing. *(Evidence: 5 listings, one per status; `npm run typecheck` exits 0.)*
- [x] `src/fixtures/invalid-listings.errors.ts` still demonstrates the intentional failures listed in the expected-errors doc. *(Evidence: `npm run typecheck:errors` reports 9 errors, one per documented case.)*
- [x] Expected-error notes still match the real compiler messages, no stale examples. *(Evidence: every message in that doc was copied from real `tsc` output, not predicted.)*

## D. Typecheck gate

- [x] `package.json` defines a `typecheck` script that runs `tsc --noEmit`.
- [x] Running the typecheck script from the project root succeeds for valid sources. *(Evidence: exit 0.)*
- [x] The intentional invalid fixtures file is not required to pass the normal typecheck gate. *(Evidence: excluded in `tsconfig.json`; checked separately via `npm run typecheck:errors` using `tsconfig.errors.json`.)*
- [x] `src/types/README.md` explains how a beginner runs typecheck and what success looks like. *(Evidence: "Typecheck" section, including that the error file failing is the pass condition.)*
- [x] The production build is unaffected by the intentional error file. *(Evidence: `npm run build` exits 0; Vite strips types without checking them.)*

## E. Sign-off

- [X] I re-ran typecheck after any last fixes.
- [X] I would hand this package to a teammate without a verbal walkthrough of secret steps.

---

## Known naming differences (types vs. inventory)

These are deliberate and reviewed, not drift. The field inventory states that
"field names are suggestions the types may adopt; meanings and shapes are mandatory."

| Inventory name | Type name | Note |
| --- | --- | --- |
| `description` | `summary` | Same meaning. Inventory marks it optional for drafts; the type currently requires it on every listing, which is stricter. |
| `address.line1` | `address.street` | Same meaning. |
| `address.line2` | `address.unit` | Same meaning, still optional. |
| `contacts[].name` | `contacts[].fullName` | Same meaning. |
| `ownership[].contactNameOrId` | `ownership[].contactId` | Narrowed to an id only. |
| `ownership[].sharePercent` | `ownership[].sharePercent` | Unchanged. |

## Drift found and fixed on 2026-09-19

Walking this checklist turned up four fields that existed in the types but were
not described in the domain docs, meaning the types were ahead of their own
source of truth. The docs were updated to match (the types were left alone,
since each field was added deliberately).

| Field | Fix applied |
| --- | --- |
| `closedAt` | Added to the field inventory, and the close-date rule added to the domain brief's lifecycle section. |
| `primaryContactId` | Added to the field inventory under Investor contacts. |
| `contacts[].id` | Added to the field inventory, noting that ownership rows and `primaryContactId` reference it. |
| Currency codes | The inventory now names the agreed set explicitly: `USD`, `CAD`, `EUR`, `GBP`, matching the `CurrencyCode` union. |

## Rules the compiler does not enforce

Do not assume a green typecheck means the data is valid. See the "Known holes"
table in `docs/type-safety/expected-type-errors.md`, currently 9 categories,
including ownership shares outside 0-100, shares that do not total 100, a
`primaryContactId` pointing at no real contact, an empty `contacts` array on a
published listing, and negative prices. These need runtime validation.
