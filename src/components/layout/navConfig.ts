/**
 * Single source of truth for the investor dashboard's nav labels, paths, and
 * page titles. Sidebar (via NavItems) and Header both read from here, so a
 * label and its page title can never drift apart.
 *
 * Source: docs/dashboard-ia.md. Per docs/investor-dashboard-brief.md, the
 * visible page title must match its nav label, so `title` equals `label`.
 */

/** The four dashboard routes. Typed so a typo in a path fails typecheck. */
export type DashboardPath =
  | '/dashboard'
  | '/dashboard/portfolio'
  | '/dashboard/deals'
  | '/dashboard/profile'

export type NavItemConfig = {
  readonly label: string
  readonly path: DashboardPath
  readonly title: string
  /**
   * True if this item is active only on its exact path, not on paths nested
   * under it. Home needs this: every dashboard path starts with `/dashboard`,
   * so prefix matching would make Home active on every page.
   */
  readonly exact: boolean
}

export const dashboardNavItems: readonly NavItemConfig[] = [
  { label: 'Home', path: '/dashboard', title: 'Home', exact: true },
  { label: 'Portfolio', path: '/dashboard/portfolio', title: 'Portfolio', exact: false },
  { label: 'Deals', path: '/dashboard/deals', title: 'Deals', exact: false },
  { label: 'Profile', path: '/dashboard/profile', title: 'Profile', exact: false },
]

/** Strips one trailing slash so `/dashboard/` and `/dashboard` compare equal. */
function normalize(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname
}

/**
 * Is this nav item the current page?
 *
 * Exact items match only their own path. The rest also match anything nested
 * under them. NavItems passes the same `exact` flag to the router's Link, so
 * the router's own active marking (aria-current) agrees with this function.
 */
export function isNavItemActive(item: NavItemConfig, pathname: string): boolean {
  const current = normalize(pathname)
  if (item.exact) return current === item.path
  return current === item.path || current.startsWith(`${item.path}/`)
}

/** The nav item for the current page, or undefined outside the dashboard. */
export function getActiveNavItem(pathname: string): NavItemConfig | undefined {
  return dashboardNavItems.find((item) => isNavItemActive(item, pathname))
}

/** Header title for the current page. Same matching rule as the active link. */
export function getPageTitle(pathname: string): string {
  return getActiveNavItem(pathname)?.title ?? 'Dashboard'
}
