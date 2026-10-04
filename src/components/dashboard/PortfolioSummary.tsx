import { useId } from 'react'

/** One row of the breakdown: a property type and how many holdings have it. */
export type PortfolioBreakdownRow = {
  readonly id: string
  /** Investor-facing property type, e.g. "Multifamily". */
  readonly label: string
  readonly holdingCount: number
}

export type PortfolioSummaryProps = {
  rows: readonly PortfolioBreakdownRow[]
}

/**
 * How the investor's holdings break down by property type.
 *
 * Deliberately shows no total value (a StatsCard owns that) and no individual
 * holdings (PortfolioTable owns those, on the Portfolio page), per the
 * "Must NOT do" rules in docs/component-plan.md. The page computes the rows.
 */
export function PortfolioSummary({ rows }: PortfolioSummaryProps) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-xl border border-[var(--line)] bg-white/60 p-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="m-0 text-base font-semibold text-[var(--sea-ink)]">
          Holdings by property type
        </h2>
        <p className="m-0 text-xs font-medium uppercase tracking-wide text-[var(--sea-ink-soft)]">
          Mock data
        </p>
      </div>
      <ul className="m-0 mt-3 list-none p-0">
        {rows.map((row) => (
          <li
            key={row.id}
            className="flex justify-between border-t border-[var(--line)] py-2 text-sm"
          >
            <span className="text-[var(--sea-ink)]">{row.label}</span>
            <span className="text-[var(--sea-ink-soft)]">
              {row.holdingCount} {row.holdingCount === 1 ? 'holding' : 'holdings'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
