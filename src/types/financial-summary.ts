/**
 * Financial metrics for a PREIshare investor listing.
 * Source of truth: docs/domain/listing-field-inventory.md ("Financial summary").
 */
export interface FinancialSummary {
  /** Listed price amount. */
  askingPrice: number

  /**
   * Currency the price is stated in (e.g. USD, CAD, EUR, GBP).
   *
   * TODO: the inventory marks this a "fixed choice" field, same category
   * as ListingStatus/PropertyType, not free text. It is typed `string`
   * here because this step only covers amount/rate fields. Consider a
   * named CurrencyCode union (in its own file, matching the other two
   * unions) so this can't drift into an unsupported currency silently.
   */
  currency: string

  /** Optional projected internal rate of return, as a percentage. */
  projectedIrrPercent?: number

  /** Optional cap rate, as a percentage. */
  capRatePercent?: number
}
