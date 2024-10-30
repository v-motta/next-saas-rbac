import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ability, getCookieOrganization } from '@/auth/auth'
import { Button } from '@/components/ui/button'

import { ProjectList } from './project-list'

export default async function Projects() {
  const currentOrg = getCookieOrganization()
  const permissions = await ability()

  const canGetProjects = permissions?.can('get', 'Project')
  const canCreateProject = permissions?.can('create', 'Project')

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>

        {canCreateProject && (
          <Button size="sm" asChild>
            <Link href={`/org/${currentOrg}/create-project`}>
              <Plus className="mr-2 size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>

      {canGetProjects ? (
        <ProjectList />
      ) : (
        <p className="text-sm text-muted-foreground">
          You are not allowed to see organization projects.
        </p>
      )}
    </div>
  )
}
