import { api } from './api-client'

interface CreateProjectRequest {
  org: string
  name: string
  description: string
}

interface CreateProjectResponse {
  projectId: string
}

export async function createProject({
  org,
  name,
  description,
}: CreateProjectRequest) {
  const result = await api
    .post(`organization/${org}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json<CreateProjectResponse>()

  return result
}
