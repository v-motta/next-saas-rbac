import { api } from './api-client'

interface CreateProjectRequest {
  org: string
  name: string
  description: string
}

export async function createProject({
  org,
  name,
  description,
}: CreateProjectRequest) {
  await api.post(`organizations/${org}/projects`, {
    json: {
      name,
      description,
    },
  })
}
