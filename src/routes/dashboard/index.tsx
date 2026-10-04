import { createFileRoute } from '@tanstack/react-router'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { PortfolioSummary } from '../../components/dashboard/PortfolioSummary'
import type { PortfolioBreakdownRow } from '../../components/dashboard/PortfolioSummary'
import { RecentActivity } from '../../components/dashboard/RecentActivity'
import type { RecentActivityItem } from '../../components/dashboard/RecentActivity'
import { MOCK_ACTIVITY, MOCK_HOLDINGS } from '../../fixtures/dashboard-mock'
import { sampleInvestorListings } from '../../fixtures/sample-investor-listings'
import { isOpenDeal } from '../../lib/deals'
import type { PropertyType } from '../../types'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHomePage,
})

/**
 * Investor-facing names for each property type. Typed as a full Record, so
 * adding a value to PropertyType fails typecheck here until it gets a label.
 */
const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  multifamily: 'Multifamily',
  office: 'Office',
  retail: 'Retail',
  industrial: 'Industrial',
  mixed_use: 'Mixed use',
  land: 'Land',
}

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

// timeZone UTC: the mock dates are date-only ISO strings, which parse as UTC.
// Formatting them in local time would show the previous day west of UTC, and
// would differ between the server render and the browser.
const shortDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

function DashboardHomePage() {
  // This page owns the data. Components only receive finished props.
  const totalValue = MOCK_HOLDINGS.reduce((sum, holding) => sum + holding.value, 0)
  const openDealsCount = sampleInvestorListings.filter(isOpenDeal).length

  const countsByType = new Map<PropertyType, number>()
  for (const holding of MOCK_HOLDINGS) {
    countsByType.set(holding.propertyType, (countsByType.get(holding.propertyType) ?? 0) + 1)
  }
  const breakdownRows: PortfolioBreakdownRow[] = [...countsByType].map(([type, count]) => ({
    id: type,
    label: PROPERTY_TYPE_LABELS[type],
    holdingCount: count,
  }))

  const activityItems: RecentActivityItem[] = MOCK_ACTIVITY.map((item) => ({
    ...item,
    dateLabel: shortDate.format(new Date(item.date)),
  }))

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard
          label="Total portfolio value"
          value={usd.format(totalValue)}
          hint="Your share across all holdings"
        />
        <StatsCard
          label="Number of holdings"
          value={String(MOCK_HOLDINGS.length)}
          hint="Properties you hold a share in"
        />
        <StatsCard
          label="Open deals"
          value={String(openDealsCount)}
          hint="Published or under offer"
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <PortfolioSummary rows={breakdownRows} />
        <RecentActivity items={activityItems} />
      </div>
    </div>
  )
}
