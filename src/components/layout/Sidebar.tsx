import { useEffect, useId, useState } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { NavItems } from './NavItems'

type SidebarProps = {
  brandLabel?: string
}

/**
 * Left navigation chrome for the investor dashboard shell.
 *
 * Holds no labels or paths of its own: the link list comes from NavItems,
 * which reads navConfig. NavItems renders its own <nav>, which is the one
 * navigation landmark, so this wrapper is a plain <div>, not an <aside>.
 *
 * Owns the phone-width collapse (docs/component-plan.md): below 768px the
 * links sit behind a Menu button, and dashboard.css does the hiding. On wider
 * screens the button is hidden and the links always show.
 */
export function Sidebar({ brandLabel = 'PREIshare' }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const navRegionId = useId()
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  // The sidebar stays mounted across dashboard pages, so close the menu after navigating.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="dashboard-sidebar" data-open={open}>
      <div className="sidebar-bar">
        <div className="sidebar-brand">{brandLabel}</div>
        <button
          type="button"
          className="sidebar-toggle"
          aria-expanded={open}
          aria-controls={navRegionId}
          onClick={() => setOpen((current) => !current)}
        >
          Menu
        </button>
      </div>
      <div id={navRegionId} className="sidebar-nav-region">
        <NavItems />
      </div>
    </div>
  )
}
