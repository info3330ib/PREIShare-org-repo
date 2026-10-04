import { Outlet, createFileRoute } from '@tanstack/react-router'
import Footer from '../components/Footer'
import Header from '../components/Header'

// Pathless layout: gives the starter pages (/ and /about) their header and
// footer. The /dashboard routes sit outside it and use AppShell instead.
export const Route = createFileRoute('/_site')({
  component: SiteLayout,
})

function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
