import type { ListingStatus } from './listing-status'
import type { PropertyType } from './property-type'
import type { Address } from './address'
import type { FinancialSummary } from './financial-summary'
import type { InvestorContact } from './investor-contact'
import type { Ownership } from './ownership'

/**
 * Fields every PREIshare investor listing has, regardless of status.
 * A listing must never be anonymous: it always names at least the
 * people who can be reached about it and how they relate to the asset.
 */
export interface InvestorListingBase {
  /** Stable unique id for this listing (assigned by the system). Set once, never reassigned. */
  readonly id: string

  /** Short public headline shown in search results and cards. */
  title: string

  /** Longer plain-text description of the investment opportunity. */
  summary: string

  /** The asset class this property belongs to. */
  propertyType: PropertyType

  /** Physical location of the property. Required, the inventory has no exception allowing a listing without one. */
  address: Address

  /**
   * Pricing and financial metrics. Optional, metrics can be missing early
   * in a deal. Note: this means `askingPrice` is not guaranteed on every
   * InvestorListing, it only exists when financialSummary is present.
   */
  financialSummary?: FinancialSummary

  /** ISO-8601 datetime string when the listing was first created. Set once, never reassigned. */
  readonly createdAt: string

  /**
   * ISO-8601 datetime string when the listing was last updated.
   * Readonly on this object: producing an "updated" listing means
   * creating a new object (e.g. via spread), not mutating this field.
   */
  readonly updatedAt: string

  /** One or more people associated with this listing. A published/under_offer/sold listing needs at least one. */
  contacts: InvestorContact[]

  /**
   * Must match the `id` of one entry in `contacts`.
   * TypeScript cannot fully enforce "id exists in the array" from this
   * field alone; it is still typed `string` (not a loose object) so
   * callers pass an id, not an inline duplicate of a contact.
   */
  primaryContactId: string

  /** How each contact relates to the asset. Zero or more rows; a listing can have a primary owner, a co-owner, and a broker as separate entries. */
  ownership: Ownership[]
}

/**
 * Discriminated union on `status`: TypeScript uses this field to tell the
 * two branches apart. Only `'sold'` (a closed deal, per the domain brief's
 * own wording for that status) requires `closedAt`; every other status
 * must not have a usable one.
 *
 * NOTE: `closedAt` is not yet described in docs/domain/investor-listing-domain-brief.md
 * or the field inventory. It's added here by direct instruction; the docs
 * should get a follow-up update so this type isn't ahead of its own source of truth.
 */
export type InvestorListing =
  | (InvestorListingBase & {
      status: Exclude<ListingStatus, 'sold'>
      /** Not used unless the listing is sold. */
      closedAt?: undefined
    })
  | (InvestorListingBase & {
      status: 'sold'
      /** ISO-8601 datetime string. Required once a listing is sold. */
      closedAt: string
    })

/** A listing whose deal has closed (status is 'sold'). */
export type ClosedInvestorListing = Extract<InvestorListing, { status: 'sold' }>

/** A listing whose deal has not closed yet (any status other than 'sold'). */
export type OpenInvestorListing = Exclude<InvestorListing, { status: 'sold' }>
