import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <>
      <p>
        Placeholder. Will show mock name, email, phone, and investor-since date.
      </p>
    </>
  )
}
