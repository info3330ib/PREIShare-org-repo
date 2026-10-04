import type { InvestorListing } from '../types'

/**
 * Is this listing an open deal an investor could act on?
 *
 * Per docs/domain/investor-listing-domain-brief.md: `published` and
 * `under_offer` are visible and active; `draft` is internal only, and `sold`
 * and `archived` are closed or withdrawn.
 *
 * The dashboard home's "Open deals" count and the Deals page both use this,
 * so the two numbers cannot disagree (docs/dashboard-ia.md, Deals rule).
 */
export function isOpenDeal(listing: InvestorListing): boolean {
  return listing.status === 'published' || listing.status === 'under_offer'
}
