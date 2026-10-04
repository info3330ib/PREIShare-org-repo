import { useId } from 'react'

/** The investor's details, already formatted for display by the page. */
export type ProfileCardData = {
  readonly fullName: string
  readonly email: string
  readonly phone: string
  /** ISO date for the machine-readable <time dateTime>. */
  readonly investorSince: string
  /** The same date formatted for people, e.g. "Mar 12, 2024". */
  readonly investorSinceLabel: string
}

export type ProfileCardProps = {
  profile: ProfileCardData
}

/**
 * Read-only card with the investor's name, email, phone, and investor-since
 * date (docs/investor-dashboard-brief.md, Profile).
 *
 * No edit fields, no password change, and no sign-in state, per
 * docs/component-plan.md. This sprint has no authentication at all.
 */
export function ProfileCard({ profile }: ProfileCardProps) {
  const headingId = useId()

  const fields = [
    { term: 'Name', detail: profile.fullName },
    { term: 'Email', detail: profile.email },
    { term: 'Phone', detail: profile.phone },
  ]

  return (
    <section
      aria-labelledby={headingId}
      className="max-w-xl rounded-xl border border-[var(--line)] bg-white/60 p-4"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id={headingId} className="m-0 text-base font-semibold text-[var(--sea-ink)]">
          Your details
        </h2>
        <p className="m-0 text-xs font-medium uppercase tracking-wide text-[var(--sea-ink-soft)]">
          Mock data
        </p>
      </div>
      <dl className="m-0 mt-3">
        {fields.map((field) => (
          <div
            key={field.term}
            className="flex flex-wrap justify-between gap-x-4 border-t border-[var(--line)] py-2 text-sm"
          >
            <dt className="text-[var(--sea-ink-soft)]">{field.term}</dt>
            <dd className="m-0 break-all text-[var(--sea-ink)]">{field.detail}</dd>
          </div>
        ))}
        <div className="flex flex-wrap justify-between gap-x-4 border-t border-[var(--line)] py-2 text-sm">
          <dt className="text-[var(--sea-ink-soft)]">Investor since</dt>
          <dd className="m-0 text-[var(--sea-ink)]">
            <time dateTime={profile.investorSince}>{profile.investorSinceLabel}</time>
          </dd>
        </div>
      </dl>
    </section>
  )
}
