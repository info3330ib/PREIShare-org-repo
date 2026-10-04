import { Link } from '@tanstack/react-router'

type SidebarProps = {
  brandLabel?: string
}

/**
 * Left navigation chrome for the investor dashboard shell.
 *
 * Placeholder links only. Active-state highlighting and a shared navConfig
 * (so Sidebar and Header can't disagree on labels) are a later step, per
 * docs/component-plan.md.
 */
export function Sidebar({ brandLabel = 'PREIshare' }: SidebarProps) {
  return (
    <aside className="dashboard-sidebar" aria-label="Investor navigation">
      <div className="sidebar-brand">{brandLabel}</div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/dashboard/deals">Deals</Link>
          </li>
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
