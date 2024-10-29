'use client'

import type { Role } from '@saas/auth'
import type { ComponentProps } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { updateMemberAction } from './actions'

interface UpdateRoleMemberSelectProps extends ComponentProps<typeof Select> {
  memberId: string
}

export function UpdateRoleMemberSelect({
  memberId,
  ...props
}: UpdateRoleMemberSelectProps) {
  async function updateMemberRole(role: Role) {
    await updateMemberAction(memberId, role)
  }

  return (
    <Select {...props} onValueChange={updateMemberRole}>
      <SelectTrigger className="h-8 w-32">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="member">Member</SelectItem>
        <SelectItem value="billing">Billing</SelectItem>
      </SelectContent>
    </Select>
  )
}
