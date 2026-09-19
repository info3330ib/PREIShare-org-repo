import type { OwnershipRelationship } from './ownership-relationship'

/**
 * One row describing how a contact relates to the asset on a PREIshare
 * investor listing. A listing can have multiple ownership rows (e.g. a
 * primary owner, a co-owner, and a broker are each their own row).
 * Source of truth: docs/domain/listing-field-inventory.md ("Ownership").
 */
export interface Ownership {
  /** Which contact this row refers to. Must match an InvestorContact.id in the same listing's `contacts` array. */
  contactId: string

  /** This contact's relationship to the asset. */
  relationship: OwnershipRelationship

  /** Optional ownership share, as a percentage (0-100). */
  sharePercent?: number
}
