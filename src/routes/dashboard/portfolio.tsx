import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/portfolio')({
  component: PortfolioPage,
})

function PortfolioPage() {
  return (
    <>
      <h1>Portfolio</h1>
      <p>
        Placeholder. Will list mock holdings: property name, property type,
        value, and ownership share.
      </p>
    </>
  )
}
