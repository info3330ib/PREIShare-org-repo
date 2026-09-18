import type { ListingStatus } from './listing-status'
import type { PropertyType } from './property-type'

/**
 * Core PREIshare investor listing — scalar fields plus the two
 * controlled-vocabulary fields (status, property type). Nested
 * types (address, financials, contacts) are added in later steps.
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

  /**
   * Asking price in whole US dollars (no currency symbol).
   * Example: 450000 means $450,000.
   */
  askingPrice: number

  /** ISO-8601 datetime string when the listing was first created. */
  createdAt: string

  /** ISO-8601 datetime string when the listing was last updated. */
  updatedAt: string
}
