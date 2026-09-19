/**
 * Currencies a PREIshare listing price may be stated in.
 * Source of truth: docs/domain/listing-field-inventory.md
 * ("Financial summary" -> financials.currency), which marks this a
 * fixed-choice field. Inventory rule #2: fixed-choice fields are never
 * free text. Adding a currency requires updating the field inventory first.
 */
export type CurrencyCode = 'USD' | 'CAD' | 'EUR' | 'GBP'
