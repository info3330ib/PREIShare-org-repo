import { createFileRoute } from '@tanstack/react-router'
import { DealsList } from '../../components/dashboard/DealsList'
import { sampleInvestorListings } from '../../fixtures/sample-investor-listings'
import { isOpenDeal } from '../../lib/deals'

export const Route = createFileRoute('/dashboard/deals')({
  component: DealsPage,
})

function DealsPage() {
  // The page decides what "open" means, with the same rule as the home stat card.
  const openDeals = sampleInvestorListings.filter(isOpenDeal)

  return <DealsList listings={openDeals} />
}
