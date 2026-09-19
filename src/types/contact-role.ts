/**
 * Allowed reasons a contact appears on a PREIshare investor listing.
 * Source of truth: docs/domain/listing-field-inventory.md
 * ("Investor contacts" -> contacts[].role). No other value is permitted.
 */
export type ContactRole =
  | 'broker'
  | 'owner_rep'
  | 'asset_manager'
  | 'investor_relations'
