import { createFileRoute } from '@tanstack/react-router'
import { PortfolioTable } from '../../components/dashboard/PortfolioTable'
import type { PortfolioTableRow } from '../../components/dashboard/PortfolioTable'
import { MOCK_HOLDINGS } from '../../fixtures/dashboard-mock'
import { formatMoney } from '../../lib/format'
import { PROPERTY_TYPE_LABELS } from '../../lib/labels'

export const Route = createFileRoute('/dashboard/portfolio')({
  component: PortfolioPage,
})

function PortfolioPage() {
  // Same MOCK_HOLDINGS as the home page, so the holdings count and total
  // value shown there match the rows listed here.
  const rows: PortfolioTableRow[] = MOCK_HOLDINGS.map((holding) => ({
    id: holding.id,
    propertyName: holding.propertyName,
    propertyTypeLabel: PROPERTY_TYPE_LABELS[holding.propertyType],
    valueLabel: formatMoney(holding.value, 'USD'),
    shareLabel: `${holding.sharePercent}%`,
  }))

  return <PortfolioTable rows={rows} />
}
