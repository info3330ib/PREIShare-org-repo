import type { ListingStatus } from './listing-status'
import type { PropertyType } from './property-type'
import type { Address } from './address'
import type { FinancialSummary } from './financial-summary'
import type { InvestorContact } from './investor-contact'
import type { Ownership } from './ownership'

/**
 * Core PREIshare investor listing. A listing must never be anonymous:
 * it always names at least the people who can be reached about it and
 * how they relate to the asset.
 */
export interface InvestorListing {
  /** Stable unique id for this listing (assigned by the system). */
  id: string

  /** Short public headline shown in search results and cards. */
  title: string

  /** Longer plain-text description of the investment opportunity. */
  summary: string

  /** Where this listing currently sits in its lifecycle. */
  status: ListingStatus

  /** The asset class this property belongs to. */
  propertyType: PropertyType

  /** Physical location of the property. Required, the inventory has no exception allowing a listing without one. */
  address: Address

  /**
   * Pricing and financial metrics. Optional, metrics can be missing early
   * in a deal. Note: this means `askingPrice` is no longer guaranteed on
   * every InvestorListing the way it was before this step, it now only
   * exists when financialSummary itself is present.
   */
  financialSummary?: FinancialSummary

  /** ISO-8601 datetime string when the listing was first created. */
  createdAt: string

  /** ISO-8601 datetime string when the listing was last updated. */
  updatedAt: string

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
