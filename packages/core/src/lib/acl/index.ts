;`
Provide functions for viewing and modifying roles in OSM
`

export interface IAccessRole {
  sys_id: string
  inherits: string
  friendly_name: string
  app_scope: string
  active: boolean
}

export interface IAccessRoleWithTables {
  role: IAccessRole
  edit_tables: string[]
  read_tables: string[]
  delete_tables: string[]
}
