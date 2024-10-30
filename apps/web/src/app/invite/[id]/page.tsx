import { getInvite } from '@/http/invites/get-invite'

interface InvitePageProps {
  params: {
    id: string
  }
}
export default async function InvitePage({ params }: InvitePageProps) {
  const inviteId = params.id

  const { invite } = await getInvite(inviteId)

  return (
    <div>
      <h1>{JSON.stringify(invite)}</h1>
    </div>
  )
}
