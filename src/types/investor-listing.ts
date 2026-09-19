import type { ListingStatus } from './listing-status'
import type { PropertyType } from './property-type'
import type { Address } from './address'
import type { FinancialSummary } from './financial-summary'

/**
 * Core PREIshare investor listing — scalar fields, the two
 * controlled-vocabulary fields (status, property type), and the
 * address/financial-summary nested types. Contacts and ownership
 * are added in later steps.
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
}
