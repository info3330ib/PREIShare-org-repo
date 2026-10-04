import { Outlet, createFileRoute } from '@tanstack/react-router'
import { AppShell } from '../components/layout/AppShell'

/**
 * Parent layout route for every /dashboard/* page.
 *
 * Child routes in src/routes/dashboard/ render where <Outlet /> sits, inside
 * AppShell's main region. Without the Outlet, the child URLs would still
 * match but nothing would appear on screen.
 */
export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  )
}
