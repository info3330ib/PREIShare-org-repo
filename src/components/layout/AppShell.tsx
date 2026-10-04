import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

type AppShellProps = {
  title?: string
  children: ReactNode
}

/**
 * Shared investor chrome: sidebar + header + one main content region.
 *
 * This is the only <main> landmark on a /dashboard/* page. Child route pages
 * must not render their own <main>, or the page would end up with two.
 *
 * Child routes render inside `children`, wired from the dashboard layout
 * route's <Outlet />.
 */
export function AppShell({ title = 'Investor Dashboard', children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell-main-column">
        <Header title={title} />
        <main className="app-shell-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
