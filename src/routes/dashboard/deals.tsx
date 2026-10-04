import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/deals')({
  component: DealsPage,
})

function DealsPage() {
  return (
    <main>
      <h1>Deals</h1>
      <p>
        Placeholder. Will list open deals only (published or under offer), from
        the sample investor listings.
      </p>
    </main>
  )
}
