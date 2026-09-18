/**
 * Allowed asset classes for a PREIshare investor listing.
 * Source of truth: docs/domain/listing-field-inventory.md
 * ("Identity and classification" → propertyType). No other value
 * is permitted; adding one requires updating the field inventory
 * and the domain brief first.
 */
export type PropertyType =
  | 'multifamily'
  | 'office'
  | 'retail'
  | 'industrial'
  | 'mixed_use'
  | 'land'
