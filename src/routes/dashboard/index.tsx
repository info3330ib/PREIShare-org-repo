import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardHomePage,
})

function DashboardHomePage() {
  return (
    <main>
      <h1>Dashboard overview</h1>
      <p>
        Placeholder. Will show total portfolio value, number of holdings, open
        deals count, and recent activity, all as labeled mock data.
      </p>
    </main>
  )
}
