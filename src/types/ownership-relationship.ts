/**
 * Allowed relationships between a contact and the asset in a PREIshare
 * investor listing. Source of truth: docs/domain/listing-field-inventory.md
 * ("Ownership" -> ownership[].relationship). No other value is permitted.
 */
export type OwnershipRelationship =
  | 'primary_owner'
  | 'co_owner'
  | 'broker'
  | 'property_manager'
