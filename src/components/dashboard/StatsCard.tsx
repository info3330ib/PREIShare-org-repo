import { useId } from 'react'

export type StatsCardProps = {
  /** What the number means, e.g. "Total portfolio value". */
  label: string
  /** The figure itself, already formatted by the page, e.g. "$4,250,000". */
  value: string
  /** Optional one-line context under the value, e.g. "Across 4 holdings". */
  hint?: string
}

/**
 * One headline metric for the investor dashboard home.
 *
 * Presentational only: the page computes and formats `value`. This component
 * never fetches, imports fixtures, or shows more than one metric
 * (docs/component-plan.md).
 */
export function StatsCard({ label, value, hint }: StatsCardProps) {
  const labelId = useId()

  return (
    <article
      aria-labelledby={labelId}
      className="rounded-xl border border-[var(--line)] bg-white/60 p-4"
    >
      <p id={labelId} className="m-0 text-sm text-[var(--sea-ink-soft)]">
        {label}
      </p>
      <p className="m-0 mt-1 text-2xl font-semibold text-[var(--sea-ink)]">{value}</p>
      {hint ? <p className="m-0 mt-1 text-xs text-[var(--sea-ink-soft)]">{hint}</p> : null}
      <p className="m-0 mt-2 text-xs font-medium uppercase tracking-wide text-[var(--sea-ink-soft)]">
        Mock data
      </p>
    </article>
  )
}
