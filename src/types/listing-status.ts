/**
 * Allowed lifecycle states for a PREIshare investor listing.
 * Source of truth: docs/domain/investor-listing-domain-brief.md
 * ("Listing lifecycle statuses"). No other value is permitted;
 * adding one requires updating that brief first.
 */
export type ListingStatus =
  | 'draft'
  | 'published'
  | 'under_offer'
  | 'sold'
  | 'archived'
