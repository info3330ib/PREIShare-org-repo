import type { CurrencyCode } from './currency-code'

/**
 * Financial metrics for a PREIshare investor listing.
 * Source of truth: docs/domain/listing-field-inventory.md ("Financial summary").
 */
export interface FinancialSummary {
  /** Listed price amount. */
  askingPrice: number

  /** Currency the price is stated in. Closed set, see CurrencyCode. */
  currency: CurrencyCode

  /** Optional projected internal rate of return, as a percentage. */
  projectedIrrPercent?: number

  /** Optional cap rate, as a percentage. */
  capRatePercent?: number
}
