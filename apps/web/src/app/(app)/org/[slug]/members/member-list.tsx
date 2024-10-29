import { getCookieOrganization } from '@/auth/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'

export async function MemberList() {
  const currentOrg = getCookieOrganization()
  const { members } = await getMembers(currentOrg!)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="py-2.5" style={{ width: 48 }}>
                  <Avatar>
                    <AvatarFallback />
                    {member.avatarUrl && (
                      <AvatarImage
                        src={member.avatarUrl}
                        width={32}
                        height={32}
                        alt=""
                        className="aspect-square size-full"
                      />
                    )}
                  </Avatar>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
