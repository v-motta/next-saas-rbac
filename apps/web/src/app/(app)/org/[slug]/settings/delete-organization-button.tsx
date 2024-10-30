import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCookieOrganization } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import { deleteOrganization } from '@/http/organizations/delete-organization'

export function DeleteOrganizationButton() {
  async function deleteOrganizationAction() {
    'use server'

    const currentOrg = getCookieOrganization()

    await deleteOrganization({ org: currentOrg! })

    redirect('/')
  }

  return (
    <form action={deleteOrganizationAction}>
      <Button type="submit" variant="destructive" className="w-56">
        <XCircle className="mr-2 size-4" />
        Delete organization
      </Button>
    </form>
  )
}
