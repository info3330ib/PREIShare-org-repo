# Expected type errors for invalid investor listings

`src/fixtures/invalid-listings.errors.ts` is **supposed to fail typechecking.**
Each export in that file breaks exactly one rule encoded in the types, with every
other field valid, so the error that appears is the one the case is named after.

The error text below was captured from a real `npx tsc --noEmit` run, not predicted.

## Current state

| Command | Exit code | Meaning |
| --- | --- | --- |
| `npm run build` | 0 | Production build is unaffected; Vite strips types without checking them, so the live deploy is safe. |
| `npm run typecheck` | 2 | Fails on purpose, because of this file. A later step wires a script that treats these failures as expected proof. |

## The cases

| # | Export | Business problem | Rule that catches it | Actual TypeScript error |
| --- | --- | --- | --- | --- |
| 1 | `invalidStatusSpelling` | A typo'd status makes the listing invisible to filters and badges | `ListingStatus` closed union | `TS2322: Type '"availble"' is not assignable to type '"draft" \| "published" \| "under_offer" \| "sold" \| "archived"'` |
| 2 | `missingAddressCity` | Property cannot be located or mapped for an investor | `Address.city` is required | `TS2741: Property 'city' is missing in type '{ street; region; postalCode; country }' but required in type 'Address'` |
| 3 | `priceAsString` | Money as text sorts lexicographically (`"9000" > "80000"`) and breaks arithmetic | `FinancialSummary.askingPrice: number` | `TS2322: Type 'string' is not assignable to type 'number'` |
| 4 | `invalidContactRole` | A role outside the agreed vocabulary breaks role-based filtering | `ContactRole` closed union | `TS2322: Type '"primary"' is not assignable to type 'ContactRole'` |
| 5 | `soldWithoutClosedAt` | A closed deal with no close date corrupts historical reporting | Discriminated union: `status: 'sold'` branch requires `closedAt: string` | `TS2322: Type '{ ... status: "sold" ... }' is not assignable to type 'InvestorListing'` |
| 6 | `closedAtOnDraftListing` | A draft carrying a close date would be counted as a completed deal | Discriminated union: non-`'sold'` branches type `closedAt` as `undefined` only | `TS2322: Type '{ ... status: "draft"; closedAt: string ... }' is not assignable to type 'InvestorListing'` |
| 7 | `ownershipAsSingleObject` | One owner object cannot represent co-owners, a broker, and a manager | `InvestorListing.ownership: Ownership[]` | `TS2353: Object literal may only specify known properties, and 'contactId' does not exist in type 'Ownership[]'` |
| 8 | `reassignReadonlyId` | Reassigning an id silently breaks every existing reference to that listing | `readonly id` on `InvestorListingBase` | `TS2540: Cannot assign to 'id' because it is a read-only property` |
| 9 | `unsupportedCurrency` | A price in an unsupported currency renders with an unknown symbol and cannot be converted | `CurrencyCode` closed union | `TS2322: Type '"XYZ"' is not assignable to type 'CurrencyCode'` |

## Rules for maintaining this file

- Do **not** "fix" the errors in `invalid-listings.errors.ts`. They are the proof.
- That file must never use `any`, `unknown` escapes, `as` assertions, or `@ts-ignore`.
  Silencing an error there defeats the purpose of the file.
- Every export in the fixtures file must have a row here, and every row here must
  point at a real export. If you add or remove a case, update both.
- Happy-path samples live in `src/fixtures/sample-investor-listings.ts` and must
  stay valid. If a type change breaks them, the type change needs review.

## Known holes: bad data that still typechecks today

These are **not** covered by the cases above, because TypeScript cannot catch them
with the types as written. They need runtime validation, or a type change that has
not been made yet. Listed here so nobody assumes the compiler is covering them.

> **Closed since the first draft of this doc:** currency used to be free text
> (`currency: 'XYZ'` compiled). It is now the `CurrencyCode` union, and case 9
> above is the fixture proving it. That was the only hole in this list that plain
> TypeScript could close without conditional/mapped-type cleverness.

| Hole | Example that compiles today | Why the type misses it | Possible fix |
| --- | --- | --- | --- |
| Ownership share out of range | `sharePercent: 150` | `number` has no bounds | Runtime validation. Not expressible in plain TypeScript without branded types. |
| Ownership shares don't total 100 | two rows at `60` and `60` | Per-row typing cannot see the other rows | Runtime validation. |
| Dangling `primaryContactId` | `primaryContactId: 'ct_does_not_exist'` | Typed `string`; TypeScript cannot verify it matches an `id` in `contacts` | Runtime validation. Already noted in the type's own comment. |
| Dangling `ownership[].contactId` | `contactId: 'ct_nobody'` | Same reason as above | Runtime validation. |
| Empty contacts on a published listing | `contacts: []` with `status: 'published'` | `InvestorContact[]` permits an empty array | A non-empty tuple type (`[InvestorContact, ...InvestorContact[]]`) on the non-draft branches only. The domain brief allows a draft to have none, so this cannot be applied to every branch. |
| Negative or zero price | `askingPrice: -5000` | `number` includes negatives, zero, and `Infinity` | Runtime validation. |
| Timestamps that aren't dates | `createdAt: 'not-a-date'` | Typed `string`; the ISO-8601 format is a convention, not a constraint | Runtime validation, or a branded/template-literal type. |
| Contact with neither email nor phone | `phone` omitted and `email` omitted | `email` is currently required, which is a stricter but *different* rule than the inventory's "at least one of email/phone" | A union of the two valid shapes. Already flagged as a TODO in `investor-contact.ts`. |
| Percent vs decimal confusion | `capRatePercent: 0.073` meaning 7.3% | Both are valid `number`s | Runtime validation, or a branded type. Field name and comment are the only current guard. |
