type HeaderProps = {
  title?: string
}

/**
 * Top bar: shows the current page title only.
 *
 * No user menu, avatar, or sign-out control. docs/component-plan.md rules
 * that out for Header explicitly, and this sprint has no sign-in at all.
 */
export function Header({ title = 'Investor Dashboard' }: HeaderProps) {
  return (
    <header className="dashboard-header">
      <h1 className="header-title">{title}</h1>
    </header>
  )
}
