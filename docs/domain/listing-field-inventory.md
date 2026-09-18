# Listing Field Inventory (PREIshare)

Use this table as the source of truth when defining TypeScript types. Field names are suggestions the types may adopt; meanings and shapes are mandatory.

Companion document: `docs/domain/investor-listing-domain-brief.md` (actors, goals, lifecycle, and validity rules). If this inventory and the brief ever disagree, the brief wins and this file must be corrected.

**Shapes used below:** text, number, yes/no, fixed choice (a closed list of allowed values), nested object, list.

## Identity and classification
| Field | Meaning | Shape | Required? | Example / allowed values |
| --- | --- | --- | --- | --- |
| id | Stable unique id for the listing | text | yes | `lst_rev_1001` |
| title | Short name shown to investors | text | yes | `Riverfront Multifamily Offering` |
| description | Longer investor-facing summary | text | yes for published, under_offer, sold; optional for draft | `Value-add asset near transit...` |
| status | Lifecycle state | fixed choice | yes | `draft`, `published`, `under_offer`, `sold`, `archived` |
| propertyType | Asset class | fixed choice | yes | `multifamily`, `office`, `retail`, `industrial`, `mixed_use`, `land` |
| isFeatured | Whether the listing is promoted on the browse page | yes/no | no | `true` |
| createdAt | When the listing record was created | text (timestamp; exact format decided in the types step) | yes | `2026-03-01T10:00:00Z` |
| updatedAt | Last meaningful edit | text (timestamp; exact format decided in the types step) | yes | `2026-03-15T16:30:00Z` |

## Address (nested object)
| Field | Meaning | Shape | Required? | Example |
| --- | --- | --- | --- | --- |
| address.line1 | Street number and name | text | yes | `500 River Rd` |
| address.line2 | Unit/suite (if any) | text | no | `Suite 200` |
| address.city | City | text | yes | `Austin` |
| address.region | State/province/region | text | yes | `TX` |
| address.postalCode | Postal code | text | yes | `78701` |
| address.country | Country code or name | text | yes | `US` |

## Financial summary (nested object)
| Field | Meaning | Shape | Required? | Example |
| --- | --- | --- | --- | --- |
| financials.askingPrice | Listed price amount | number | yes | `12500000` |
| financials.currency | Currency the price is stated in | fixed choice (agreed supported currency codes) | yes | `USD`, `CAD`, `EUR`, `GBP` |
| financials.projectedIrrPercent | Optional projected internal rate of return | number | no | `12.5` |
| financials.capRatePercent | Optional cap rate | number | no | `5.8` |

## Investor contacts (list of nested objects)
At least one contact is required for any listing that is `published`, `under_offer`, or `sold`.

| Field | Meaning | Shape | Required? | Example |
| --- | --- | --- | --- | --- |
| contacts[].name | Person or firm name | text | yes (each contact) | `Jordan Lee` |
| contacts[].role | Why they appear on the listing | fixed choice | yes (each contact) | `broker`, `owner_rep`, `asset_manager`, `investor_relations` |
| contacts[].email | Email if used | text | at least one of email/phone required per contact | `jordan@example.com` |
| contacts[].phone | Phone if used | text | at least one of email/phone required per contact | `+1-512-555-0142` |

## Ownership (list of nested objects tied to contacts)
| Field | Meaning | Shape | Required? | Example |
| --- | --- | --- | --- | --- |
| ownership[].contactNameOrId | Which contact the row refers to | text | yes | `Jordan Lee` or contact id |
| ownership[].relationship | Relationship to the asset | fixed choice | yes | `primary_owner`, `co_owner`, `broker`, `property_manager` |
| ownership[].sharePercent | Optional ownership share, as a percentage | number | no | `60` |

## Inventory rules (must hold)
1. Do not invent extra top-level groups beyond identity, address, financials, contacts, and ownership without updating the domain brief.
2. Every "fixed choice" field stays a closed list of allowed values—never free text. Adding a value to any closed list requires updating the domain brief first.
3. Address and financials are nested objects, not a scatter of flat optional text fields.
4. Contacts are a list; a valid published listing needs at least one contact.
5. Every required field above must appear in later TypeScript types unless the decision record deliberately relaxes it, and that relaxation is written down.

## Out of scope for this inventory
- UI form layout, API request/response shapes, and database columns or migrations.
- Validation library choice and runtime schema definitions.
- Actual type syntax, which comes in a later step.
