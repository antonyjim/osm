import { IAccessRole } from '.'
import { simpleQuery } from '@lib/connection'
import { Towel } from '@lib/towel'
;`
Provide functions for accessing roles
`

export function getAccessRoleByName(
  roleName: string,
  fields?: string[]
): Promise<IAccessRole> {
  return new Promise(
    (
      resolveAccessRole: (results: IAccessRole) => void,
      rejectAccessRole: (err: Error) => void
    ) => {
      const t: Towel = new Towel('sys_role', fields ? fields : undefined)
      t.addCondition('name', roleName)
      t.select().then()
    }
  )
}

export function getAccessRoleById(
  roleId: string,
  fields?: string[]
): Promise<IAccessRole> {
  return new Promise(
    (
      resolveAccessRole: (results: IAccessRole) => void,
      rejectAccessRole: (err: Error) => void
    ) => {
      const t: Towel = new Towel('sys_role', fields ? fields : undefined)
    }
  )
}
