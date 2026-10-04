import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <>
      <h1>Profile</h1>
      <p>
        Placeholder. Will show mock name, email, phone, and investor-since date.
      </p>
    </>
  )
}
