import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

type AppShellProps = {
  children: ReactNode
}

/**
 * Shared investor chrome: sidebar + header + one main content region.
 *
 * This is the only <main> landmark on a /dashboard/* page. Child route pages
 * must not render their own <main>, or the page would end up with two.
 *
 * Header finds the page title itself from navConfig, so AppShell takes no
 * title prop; passing one would be a second, competing source for the title.
 *
 * Child routes render inside `children`, wired from the dashboard layout
 * route's <Outlet />.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell-main-column">
        <Header />
        <main className="app-shell-content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
