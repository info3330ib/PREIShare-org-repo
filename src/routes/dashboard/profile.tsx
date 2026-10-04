import { createFileRoute } from '@tanstack/react-router'
import { ProfileCard } from '../../components/dashboard/ProfileCard'
import { MOCK_PROFILE } from '../../fixtures/dashboard-mock'
import { formatDate } from '../../lib/format'

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage,
})

function ProfilePage() {
  return (
    <ProfileCard
      profile={{
        ...MOCK_PROFILE,
        investorSinceLabel: formatDate(MOCK_PROFILE.investorSince),
      }}
    />
  )
}
