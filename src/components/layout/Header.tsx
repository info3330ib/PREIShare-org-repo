import { useRouterState } from '@tanstack/react-router'
import { getPageTitle } from './navConfig'

/**
 * Top bar: shows the current page title, looked up from navConfig by URL.
 *
 * This is the page's only <h1>. Dashboard page files do not render their own,
 * or every page would show the same heading twice.
 *
 * No user menu, avatar, or sign-out control. docs/component-plan.md rules
 * that out for Header explicitly, and this sprint has no sign-in at all.
 */
export function Header() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <header className="dashboard-header">
      <h1 className="header-title">{getPageTitle(pathname)}</h1>
    </header>
  )
}
