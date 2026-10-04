import { useId } from 'react'
import type { InvestorListing, ListingStatus } from '../../types'
import { formatMoney } from '../../lib/format'
import { LISTING_STATUS_LABELS, PROPERTY_TYPE_LABELS } from '../../lib/labels'

export type DealsListProps = {
  /** Already-filtered open deals. This component only displays them. */
  listings: readonly InvestorListing[]
  /** Shown instead of the list when there are no deals. */
  emptyMessage?: string
}

/** Badge colors per status, so status reads at a glance without the text. */
const STATUS_BADGE: Record<ListingStatus, string> = {
  published: 'bg-[rgba(79,184,178,0.18)] text-[var(--lagoon-deep)]',
  under_offer: 'bg-[rgba(214,158,46,0.18)] text-[#8a5a00]',
  draft: 'bg-black/5 text-[var(--sea-ink-soft)]',
  sold: 'bg-black/5 text-[var(--sea-ink-soft)]',
  archived: 'bg-black/5 text-[var(--sea-ink-soft)]',
}

/**
 * Open deals as scannable cards: name, property type and location, asking
 * price, and a status badge.
 *
 * Takes InvestorListing values from src/types rather than its own deal shape,
 * and never decides which statuses count as open (the page filters with
 * isOpenDeal), per docs/component-plan.md. No invest or checkout actions.
 */
export function DealsList({
  listings,
  emptyMessage = 'There are no open deals right now. New opportunities will appear here when they are published.',
}: DealsListProps) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-xl border border-[var(--line)] bg-white/60 p-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="m-0 text-base font-semibold text-[var(--sea-ink)]">
          Open deals
        </h2>
        <p className="m-0 text-xs font-medium uppercase tracking-wide text-[var(--sea-ink-soft)]">
          Mock data
        </p>
      </div>

      {listings.length === 0 ? (
        <p className="m-0 mt-3 text-sm text-[var(--sea-ink-soft)]">{emptyMessage}</p>
      ) : (
        <ul className="m-0 mt-3 grid list-none gap-3 p-0">
          {listings.map((listing) => {
            const price = listing.financialSummary
            return (
              <li
                key={listing.id}
                className="flex flex-wrap items-start justify-between gap-3 rounded-lg border border-[var(--line)] p-3"
              >
                <div className="min-w-0">
                  <h3 className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
                    {listing.title}
                  </h3>
                  <p className="m-0 mt-1 text-xs text-[var(--sea-ink-soft)]">
                    {PROPERTY_TYPE_LABELS[listing.propertyType]} · {listing.address.city},{' '}
                    {listing.address.region}
                  </p>
                  <p className="m-0 mt-2 text-sm text-[var(--sea-ink)]">
                    {price
                      ? `Asking ${formatMoney(price.askingPrice, price.currency)}`
                      : 'Asking price not yet listed'}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_BADGE[listing.status]}`}
                >
                  {LISTING_STATUS_LABELS[listing.status]}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
