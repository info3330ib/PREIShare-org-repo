import { createFileRoute } from '@tanstack/react-router'
import { StatsCard } from '../../components/dashboard/StatsCard'
import { PortfolioSummary } from '../../components/dashboard/PortfolioSummary'
import type { PortfolioBreakdownRow } from '../../components/dashboard/PortfolioSummary'
import { RecentActivity } from '../../components/dashboard/RecentActivity'
import type { RecentActivityItem } from '../../components/dashboard/RecentActivity'
import { MOCK_ACTIVITY, MOCK_HOLDINGS } from '../../fixtures/dashboard-mock'
import { sampleInvestorListings } from '../../fixtures/sample-investor-listings'
import { isOpenDeal } from '../../lib/deals'
import { formatDate, formatMoney } from '../../lib/format'
import { PROPERTY_TYPE_LABELS } from '../../lib/labels'
import type { PropertyType } from '../../types'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHomePage,
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
    dateLabel: formatDate(item.date),
  }))

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatsCard
          label="Total portfolio value"
          value={formatMoney(totalValue, 'USD')}
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
