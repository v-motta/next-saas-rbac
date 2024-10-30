import { api } from '../api-client'

interface DeleteOrganizationRequest {
  org: string
}

export async function deleteOrganization({ org }: DeleteOrganizationRequest) {
  await api.delete(`organizations/${org}`)
}
