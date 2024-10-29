'use server'

import type { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCookieOrganization } from '@/auth/auth'
import { removeMember } from '@/http/remove-member'
import { updateMember } from '@/http/update-member'

export async function removeMemberAction(memberId: string) {
  const currentOrg = getCookieOrganization()

  await removeMember({ org: currentOrg!, memberId })

  revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = getCookieOrganization()

  await updateMember({ org: currentOrg!, memberId, role })

  revalidateTag(`${currentOrg}/members`)
}
