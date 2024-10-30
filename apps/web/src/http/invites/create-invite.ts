import type { Role } from '@saas/auth'

import { api } from '../api-client'

interface CreateInviteRequest {
  org: string
  email: string
  role: Role
}

interface CreateInviteResponse {
  inviteId: string
}

export async function createInvite({ org, email, role }: CreateInviteRequest) {
  const result = await api
    .post(`organizations/${org}/invites`, {
      json: {
        email,
        role,
      },
    })
    .json<CreateInviteResponse>()

  return result
}
