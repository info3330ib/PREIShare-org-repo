/**
 * Physical address for a PREIshare investor listing.
 * Source of truth: docs/domain/listing-field-inventory.md ("Address").
 */
export interface Address {
  /** Street number and name. */
  street: string

  /** Unit or suite number, if any. */
  unit?: string

  /** City. */
  city: string

  /** State, province, or region. */
  region: string

  /** Postal or ZIP code. */
  postalCode: string

  /** Country code or name. */
  country: string
}
