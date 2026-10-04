import { useId } from 'react'

export type RecentActivityItem = {
  readonly id: string
  /** What happened, e.g. "Distribution received". */
  readonly title: string
  /** What it happened to, e.g. a property name. */
  readonly detail: string
  /** ISO date for the machine-readable <time dateTime>. */
  readonly date: string
  /** The same date formatted for people, e.g. "Sep 28, 2026". */
  readonly dateLabel: string
}

export type RecentActivityProps = {
  items: readonly RecentActivityItem[]
}

/**
 * A short, newest-first list of recent account events.
 *
 * Plain text only: no links and no navigation, so nothing here can point
 * outside the four pages in docs/dashboard-ia.md. The page supplies the items.
 */
export function RecentActivity({ items }: RecentActivityProps) {
  const headingId = useId()

  return (
    <section
      aria-labelledby={headingId}
      className="rounded-xl border border-[var(--line)] bg-white/60 p-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="m-0 text-base font-semibold text-[var(--sea-ink)]">
          Recent activity
        </h2>
        <p className="m-0 text-xs font-medium uppercase tracking-wide text-[var(--sea-ink-soft)]">
          Mock data
        </p>
      </div>
      <ol className="m-0 mt-3 list-none p-0">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between gap-3 border-t border-[var(--line)] py-2 text-sm"
          >
            <span>
              <span className="block text-[var(--sea-ink)]">{item.title}</span>
              <span className="block text-xs text-[var(--sea-ink-soft)]">{item.detail}</span>
            </span>
            <time dateTime={item.date} className="shrink-0 text-xs text-[var(--sea-ink-soft)]">
              {item.dateLabel}
            </time>
          </li>
        ))}
      </ol>
    </section>
  )
}
