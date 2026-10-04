import { useId } from 'react'

/** One holding, already formatted for display by the page. */
export type PortfolioTableRow = {
  readonly id: string
  readonly propertyName: string
  /** Investor-facing property type, e.g. "Multifamily". */
  readonly propertyTypeLabel: string
  /** Value of the investor's share, formatted, e.g. "$185,000". */
  readonly valueLabel: string
  /** Ownership share, formatted, e.g. "12%". */
  readonly shareLabel: string
}

export type PortfolioTableProps = {
  rows: readonly PortfolioTableRow[]
  /** Shown instead of the table when there are no rows. */
  emptyMessage?: string
}

/**
 * Every holding the investor owns, one per row: property, type, value, and
 * ownership share (docs/investor-dashboard-brief.md, Portfolio).
 *
 * Presentational only. The page supplies the rows. No total-value summary
 * (a StatsCard on the home page owns that) and no market data, per
 * docs/component-plan.md.
 */
export function PortfolioTable({
  rows,
  emptyMessage = 'You have no holdings yet. Properties you invest in will appear here.',
}: PortfolioTableProps) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-xl border border-[var(--line)] bg-white/60 p-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="m-0 text-base font-semibold text-[var(--sea-ink)]">
          Your holdings
        </h2>
        <p className="m-0 text-xs font-medium uppercase tracking-wide text-[var(--sea-ink-soft)]">
          Mock data
        </p>
      </div>

      {rows.length === 0 ? (
        <p className="m-0 mt-3 text-sm text-[var(--sea-ink-soft)]">{emptyMessage}</p>
      ) : (
        // Scrolls inside its own box on narrow screens, so the page itself
        // never scrolls sideways (a brief success criterion). Focusable so
        // keyboard users can scroll it.
        <div
          className="dash-table-wrap mt-3"
          role="region"
          aria-label="Holdings table, scrollable"
          tabIndex={0}
        >
          <table aria-labelledby={headingId} className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-[var(--sea-ink-soft)]">
                <th scope="col" className="py-2 pr-4 font-medium">Property</th>
                <th scope="col" className="py-2 pr-4 font-medium">Type</th>
                <th scope="col" className="py-2 pr-4 text-right font-medium">Value</th>
                <th scope="col" className="py-2 text-right font-medium">Your share</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[var(--line)]">
                  <th scope="row" className="py-2 pr-4 text-left font-normal text-[var(--sea-ink)]">
                    {row.propertyName}
                  </th>
                  <td className="py-2 pr-4 text-[var(--sea-ink-soft)]">{row.propertyTypeLabel}</td>
                  <td className="py-2 pr-4 text-right text-[var(--sea-ink)]">{row.valueLabel}</td>
                  <td className="py-2 text-right text-[var(--sea-ink)]">{row.shareLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
