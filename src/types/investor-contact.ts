import type { ContactRole } from './contact-role'

/**
 * A person the team can reach about an investor listing.
 * Source of truth: docs/domain/listing-field-inventory.md ("Investor contacts").
 */
export interface InvestorContact {
  /** Stable id within the listing's contact list (string is fine for now). */
  id: string

  /** Person or firm name. */
  fullName: string

  /** Why this contact appears on the listing. */
  role: ContactRole

  /**
   * Email address for this contact.
   *
   * TODO: the inventory actually requires "at least one of email/phone"
   * per contact, not email specifically. Making email required (with
   * phone optional) is a simplification, matching this step's scaffold.
   * Expressing the real at-least-one rule needs a union type
   * (`{email: string; phone?: string} | {email?: string; phone: string}`),
   * which is out of scope for this step.
   */
  email: string

  /** Phone, if used. See the TODO on `email` above. */
  phone?: string
}
