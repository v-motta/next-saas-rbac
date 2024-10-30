interface InvitePageProps {
  params: {
    id: string
  }
}
export default async function InvitePage({ params }: InvitePageProps) {
  const inviteId = params.id

  return (
    <div>
      <h1>{inviteId}</h1>
    </div>
  )
}
