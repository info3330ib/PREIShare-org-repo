import type { PropertyType } from '../types'

/**
 * MOCK DATA for the investor dashboard shell. Every value here is invented.
 *
 * Pages import these and pass them to components as props; components never
 * import this file directly (docs/component-plan.md, composition rule 4).
 * Later steps replace these constants without touching component markup.
 */

/**
 * One property the investor holds a share of.
 *
 * There is no holdings type in src/types/ yet. Per docs/investor-dashboard-brief.md
 * (Open questions), this stays a local mock shape until that is decided.
 */
export type MockHolding = {
  readonly id: string
  readonly propertyName: string
  readonly propertyType: PropertyType
  /** Value of the investor's share, in USD. */
  readonly value: number
  /** Investor's ownership share of the property, 0-100. */
  readonly sharePercent: number
}

export const MOCK_HOLDINGS: readonly MockHolding[] = [
  { id: 'h1', propertyName: 'Oak Ridge Apartments', propertyType: 'multifamily', value: 185000, sharePercent: 12 },
  { id: 'h2', propertyName: 'Bluebonnet Flats', propertyType: 'multifamily', value: 142000, sharePercent: 8 },
  { id: 'h3', propertyName: 'Gateway Office Center', propertyType: 'office', value: 96000, sharePercent: 5 },
  { id: 'h4', propertyName: 'Trinity Logistics Hub', propertyType: 'industrial', value: 120000, sharePercent: 6 },
]

/**
 * The signed-in investor's own details. Fields are exactly the brief's:
 * name, email, phone, and investor-since date. Contact details are
 * fictional (example.com domain, 555 phone exchange).
 */
export type MockInvestorProfile = {
  readonly fullName: string
  readonly email: string
  readonly phone: string
  /** ISO date the investor joined. */
  readonly investorSince: string
}

export const MOCK_PROFILE: MockInvestorProfile = {
  fullName: 'Morgan Ellis',
  email: 'morgan.ellis@example.com',
  phone: '+1-512-555-0199',
  investorSince: '2024-03-12',
}

/** One recent event on the investor's account. */
export type MockActivityItem = {
  readonly id: string
  readonly title: string
  readonly detail: string
  /** ISO date, used for the machine-readable <time dateTime>. */
  readonly date: string
}

/**
 * About five events, per the brief. Deal events name real listings from
 * src/fixtures/sample-investor-listings.ts so the home page and Deals page
 * tell a consistent story.
 */
export const MOCK_ACTIVITY: readonly MockActivityItem[] = [
  { id: 'a1', title: 'Distribution received', detail: 'Oak Ridge Apartments', date: '2026-09-28' },
  { id: 'a2', title: 'Deal moved under offer', detail: 'Cedar Industrial Park, Building C', date: '2026-09-15' },
  { id: 'a3', title: 'New deal published', detail: 'Riverfront Multifamily, 24 Units', date: '2026-09-10' },
  { id: 'a4', title: 'Holding added', detail: 'Trinity Logistics Hub', date: '2026-08-30' },
  { id: 'a5', title: 'Distribution received', detail: 'Gateway Office Center', date: '2026-08-15' },
]
