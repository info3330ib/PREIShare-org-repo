import { createFileRoute } from '@tanstack/react-router'
import { DealsList } from '../../components/dashboard/DealsList'
import { sampleInvestorListings } from '../../fixtures/sample-investor-listings'
import { isOpenDeal } from '../../lib/deals'

export const Route = createFileRoute('/dashboard/deals')({
  component: DealsPage,
})

function DealsPage() {
  // The page decides what "open" means, using the same rule as the home
  // page's "Open deals" stat card, so the two numbers always match.
  const openDeals = sampleInvestorListings.filter(isOpenDeal)

  return <DealsList listings={openDeals} />
}
