/**
 * lib/ql/schemadescriptions.ts
 * Provide descriptions for views and tables
 */

// Local Modules
import { getTables } from './constructSchema'
import { Querynator, simpleQuery } from '../queries'

export interface ITablePermissions {
  can_edit: boolean
  can_delete: boolean
  can_read: boolean
}

/**
 * @typedef {Object} Description
 * @member {string} userId The user id of the user retrieving the description
 * @member {string} table The name of the table used for the query
 * @member {string} scope The scope of the currently logged in user
 */
export default class Description extends Querynator {
  private userId: string
  private table: string
  private scope: string

  constructor(userId: string, scope: string, table: string) {
    super(userId)
    this.userId = userId
    this.scope = scope

    if (table.toLowerCase().slice(-5) === '_list') {
      this.tableName = table.slice(0, -5)
    } else {
      this.tableName = table
    }
    // this.verifyAndReturnFields()
  }

  /**
   * Return the columns that are visible and queryable on any given table
   */
  public async verifyAndReturnFields() {
    return new Promise((resolve, reject) => {
      /* Message to be returned with the response */
      const message: string = 'Details for view ' + this.tableName
      /* Provide the key to be used when pushing updates */
      const updateKey: string = ''
      /* Describe the fields to the tableview */
      const formattedFields = {}

      const schema = getTables()
      if (!schema[this.tableName]) {
        return resolve({
          errors: [
            {
              message: 'No data found for table ' + this.tableName
            }
          ]
        })
      } else {
        resolve({ ...schema[this.tableName] })
      }

      // Object.keys(thisTable.columns).forEach((col) => {
      //   if (col.endsWith('_display')) return false
      //   const thisCol = thisTable.columns[col]
      //   const colDetails: {
      //     type: string
      //     readonly: boolean
      //     reference: string
      //     boundTo: string
      //     refTable?: string
      //     maxLength?: number
      //   } = { type: 'string', readonly: true, reference: null, boundTo: null }
      //   colDetails.type = thisCol.type
      //   colDetails.readonly = !!thisCol.readonly
      //   colDetails.reference = thisCol.reference
      //   colDetails.boundTo = col
      //   colDetails.maxLength = thisCol.maxLength

      //   if (thisCol.reference) {
      //     const displayCol = thisTable.columns[col + '_display']
      //     colDetails.refTable = displayCol.refTable
      //     colDetails.boundTo = col + '_display'
      //   }
      //   formattedFields[thisCol.label] = colDetails
      // })
    })
  }

  /**
   * Return a list of user permissions for the specified table
   * @returns {Object} List of user permissions
   */
  public async getUserPermissions(): Promise<ITablePermissions> {
    return new Promise((resolveUserPermissions, rejectUserPermissions) => {
      simpleQuery('CALL fetch_user_table_permissions(?, ?, ?)', [
        this.context,
        this.scope,
        this.tableName
      ])
    })
  }
}
