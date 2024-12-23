'use server'

import { type Role, roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCookieOrganization } from '@/auth/auth'
import { createInvite } from '@/http/invites/create-invite'
import { revokeInvite } from '@/http/invites/revoke-invite'
import { removeMember } from '@/http/members/remove-member'
import { updateMember } from '@/http/members/update-member'

const inviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
})

export async function createInviteAction(data: FormData) {
  const currentOrg = getCookieOrganization()
  const result = inviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, role } = result.data

  try {
    await createInvite({
      org: currentOrg!,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json<{ message: string }>()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully created the invite.',
    errors: null,
  }
}

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

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = getCookieOrganization()

  await revokeInvite({ org: currentOrg!, inviteId })

  revalidateTag(`${currentOrg}/invites`)
}
