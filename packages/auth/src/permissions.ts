import { AbilityBuilder } from '@casl/ability'
import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  admin: (_, { can }) => {
    can('manage', 'all')
  },
  member: (user, { can }) => {
    // can('invite', 'User')
    can(['create', 'get'], 'Project')
    can(['update', 'delete'], 'Project', { ownerId: { $eq: user.id } })
  },
  billing: () => {},
}
