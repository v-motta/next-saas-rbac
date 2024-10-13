import type { Role } from '@saas/auth'

import { api } from './api-client'

interface GetOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
    role: Role
  }[]
}

export async function getOrganizations() {
  const result = await api.get('organizations').json<GetOrganizationsResponse>()

  console.log(result)

  return result
}
