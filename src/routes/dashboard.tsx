import { Outlet, createFileRoute } from '@tanstack/react-router'

/**
 * Parent layout route for every /dashboard/* page.
 *
 * Child routes in src/routes/dashboard/ render where <Outlet /> sits. Without the
 * Outlet, the child URLs would still match but nothing would appear on screen.
 *
 * Placeholder only: AppShell (sidebar, header, main region) replaces this in a
 * later step, per docs/component-plan.md. No <main> here; each child page owns
 * its own <main> landmark.
 */
export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div data-area="dashboard-layout">
      <p>PREIshare investor dashboard (layout placeholder; the shell comes next)</p>
      <Outlet />
    </div>
  )
}
