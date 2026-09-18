# Investor Listing Domain Brief (PREIshare)

## Purpose
Define what an investor listing is in PREIshare business language so TypeScript types in later steps match real workflows—not invented fields.

Companion document: `docs/domain/listing-field-inventory.md` (field-by-field inventory). This brief defines *why* and *what*; the inventory defines *which fields*.

## Actors
- **Listing editor (internal ops)** — creates and updates listings before investors see them.
- **Investor (end user)** — browses published listings and relies on complete, consistent data.
- **Reviewer / compliance** — checks that status, price, and contact info are trustworthy before publish.
- **Future systems** — website UI, API, and database will all read the same listing shape.

## Business goals
- One shared definition of a listing across screens and teammates.
- Catch missing or invalid data before production (at compile time once types exist).
- Support nested real-world data: address, financial summary, investor contacts, ownership.

## What makes a listing unsafe to show investors
These are the failure modes this brief exists to prevent:
- **Missing price** — an investor sees an offering with no asking price, or a price with no currency.
- **Unknown or inconsistent status** — the same state spelled three ways (`Published`, `published`, `LIVE`), so filters and badges disagree across screens.
- **Incomplete address** — a property that cannot actually be located, or an address field that exists on one screen and vanishes on another.
- **No reachable contact** — an investor wants to act and has no name, email, or phone to reach.
- **Unclear ownership** — it is not stated who owns the asset or who is merely brokering it.

## Listing lifecycle statuses (allowed values only)
- `draft` — internal only; not visible to investors.
- `published` — visible to investors; must meet full validity rules.
- `under_offer` — active interest; still structured like a published listing.
- `sold` — closed deal; retained for history.
- `archived` — removed from active browse; not deleted.

No other status value is permitted. A new status requires updating this brief first.

## Nested data groups
- **Address** — street line(s), city, region/state, postal code, country.
- **Financial summary** — asking price, currency, optional projected return metrics the team agrees to track.
- **Investor contacts** — one or more people tied to the listing (name, role, email or phone).
- **Ownership** — how contacts relate to the asset (e.g., primary owner, co-owner, broker) and optional ownership share.

Each group stays its own named group. None of them collapse into a single vague "details" blob.

## Core identity fields (high level)
- Stable listing id
- Human-readable title
- Property type (fixed set, e.g. multifamily, office, retail, industrial, mixed_use, land)
- Status (from the lifecycle list above)
- Short description for investors
- Created/updated timestamps (as business concepts; format decided later)

## Success criteria — "a valid investor listing"
1. Has a non-empty id and title.
2. Status is exactly one of the allowed lifecycle values (no free-text variants).
3. Property type is exactly one of the allowed property-type values.
4. Address includes enough fields to locate the property (street, city, region/state, postal code, country).
5. Financial summary includes a numeric asking price and a currency code.
6. At least one investor contact with a name and a reachable channel (email or phone).
7. Ownership relationship for each contact is from an agreed fixed set (not free text).
8. Optional fields may be absent; required fields above must never be missing for `published`, `under_offer`, or `sold`.

## Out of scope for this topic
- Building UI forms, API routes, or database tables.
- Authentication, payments, or document uploads.
- Exact TypeScript syntax (comes in later steps).
- Choosing validation libraries or runtime schema tools.

## Handoff note
Later steps must implement types that honor this brief and the companion field inventory at `docs/domain/listing-field-inventory.md`. If a type allows a status or field not listed here, the type is wrong.
