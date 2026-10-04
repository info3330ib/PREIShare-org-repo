import { NavItems } from './NavItems'

type SidebarProps = {
  brandLabel?: string
}

/**
 * Left navigation chrome for the investor dashboard shell.
 *
 * Holds no labels or paths of its own: the link list comes from NavItems,
 * which reads navConfig. NavItems renders its own <nav>, so there is no
 * second <nav> here.
 */
export function Sidebar({ brandLabel = 'PREIshare' }: SidebarProps) {
  return (
    <aside className="dashboard-sidebar" aria-label="Investor navigation">
      <div className="sidebar-brand">{brandLabel}</div>
      <NavItems />
    </aside>
  )
}
