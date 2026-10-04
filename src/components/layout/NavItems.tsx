import { Link, useRouterState } from '@tanstack/react-router'
import { dashboardNavItems, isNavItemActive } from './navConfig'

const baseLink = 'block rounded-md px-3 py-2 text-sm no-underline'
const inactiveLink = `${baseLink} text-[var(--sea-ink-soft)]`
const activeLink = `${baseLink} bg-[rgba(79,184,178,0.14)] font-semibold text-[var(--lagoon-deep)]`

/**
 * Renders the dashboard nav from navConfig and marks the current page.
 *
 * Active state comes from isNavItemActive, the same rule Header uses for its
 * title, so the highlighted link and the page title always agree.
 *
 * The router's Link also marks links active on its own (aria-current,
 * data-status), using prefix matching by default. Passing each item's
 * `exact` flag through activeOptions makes the router agree with
 * isNavItemActive; without it, Home is announced as the current page on
 * every dashboard URL.
 */
export function NavItems() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <nav aria-label="Dashboard" className="dashboard-nav">
      <ul className="m-0 list-none p-0">
        {dashboardNavItems.map((item) => {
          const isActive = isNavItemActive(item, pathname)
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                activeOptions={{ exact: item.exact }}
                className={isActive ? activeLink : inactiveLink}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
