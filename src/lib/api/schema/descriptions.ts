/**
 * lib/ql/schemadescriptions.ts
 * Provide descriptions for views and tables
 */

// Node Modules

// NPM Modules

// Local Modules
import constructSchema, { getTables } from './constructSchema'
import { Querynator, simpleQuery } from '../../queries'

// Constants and global variables

export default class Description extends Querynator {
  constructor(context, table) {
    super(context)
    if (table.toLowerCase().slice(-5) === '_list') {
      this.tableName = table.slice(0, -5)
    } else this.tableName = table
    this.verifyAndReturnFields()
  }

  /**
   * Return the columns that are visible and queryable on any given table
   */
  public async verifyAndReturnFields() {
    return new Promise(async (resolve) => {
      /* Message to be returned with the response */
      const message: string = 'Details for view ' + this.tableName
      /* Provide the key to be used when pushing updates */
      const updateKey: string = ''
      /* Describe the fields to the tableview */
      const formattedFields = {}
      /* Privileges that the user has on the table 
                one or more of: ['READ', 'UPDATE', 'DELETE', 'CREATE'] */
      const privs: string[] = []

      const schema = getTables()
      const thisTable = schema[this.tableName]
      if (!thisTable) {
        return resolve({
          errors: [
            {
              message: 'No data found for table ' + this.tableName
            }
          ]
        })
      }
      const userAuthPermissions = {
        create: false,
        edit: false,
        read: false,
        delete: false
      }
      const usersPermissions = await simpleQuery(
        'SELECT ??, ??, ??, ??, ??, ??, ??, ?? FROM ?? WHERE ?? IN (SELECT ?? FROM ?? WHERE ?? = ?) ORDER BY ??, ??, ??, ??, ??, ??, ??, ?? DESC;',
        [
          'auth_can_read',
          'auth_can_edit',
          'auth_can_create',
          'auth_can_delete',
          'auth_can_read_own',
          'auth_can_edit_own',
          'auth_can_create_own',
          'auth_can_delete_own',
          'sys_authorization',
          'auth_priv',
          'role_priv',
          'sys_role',
          'rpId',
          this.context.req.auth.r,
          'auth_can_create_own',
          'auth_can_edit',
          'auth_can_create',
          'auth_can_read',
          'auth_can_delete',
          'auth_can_read_own',
          'auth_can_edit_own',
          'auth_can_delete_own'
        ]
      )
      usersPermissions.map((perm) => {
        if (perm.auth_can_create || perm.auth_can_create_own) {
          userAuthPermissions.create = true
        }
        if (perm.auth_can_edit || perm.auth_can_edit_own) {
          userAuthPermissions.edit = true
        }
        if (perm.auth_can_delete || perm.auth_can_delete_own) {
          userAuthPermissions.delete = true
        }
        if (perm.auth_can_read || perm.auth_can_read_own) {
          userAuthPermissions.read = true
        }
      })

      Object.keys(thisTable.columns).map((col) => {
        if (col.endsWith('_display')) return false
        const thisCol = thisTable.columns[col]
        const colDetails: {
          type: string
          readonly: boolean
          reference: string
          boundTo: string
          refTable?: string
          maxLength?: number
        } = { type: 'string', readonly: true, reference: null, boundTo: null }
        colDetails.type = thisCol.type
        colDetails.readonly = !!thisCol.readonly
        colDetails.reference = thisCol.reference
        colDetails.boundTo = col
        colDetails.maxLength = thisCol.maxLength

        if (thisCol.reference) {
          const displayCol = thisTable.columns[col + '_display']
          colDetails.refTable = displayCol.refTable
          colDetails.boundTo = col + '_display'
        }
        formattedFields[thisCol.label] = colDetails
      })
      return resolve({
        ...schema[this.tableName],
        permissions: userAuthPermissions
      })
    })
  }
}
