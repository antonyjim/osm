import { Querynator } from '../../../lib/queries'

/**
 * lib/ql/nsacl/nsacl.ts
 * Provide functions for finding users and confirming users on ACL lists
 */

// Node Modules

// NPM Modules

// Local Modules

// Constants and global variables

export default class NSACL extends Querynator {
  constructor(context, fields) {
    super(context, fields)
    this.tableName = 'sys_user_nsacl'
    this.primaryKey = 'nsNonsig'
    const queryFieldArray: string[] = []
    this.baseParams = []
    this.queryFields = ''
    fields.map((field) => {
      queryFieldArray.push('??')
      this.baseParams.push(field)
    })
    this.queryFields = queryFieldArray.join(', ')
  }

  public async where(args, pagination) {
    if (!args) {
      throw new Error(
        'A miniumum of nsaNonsig must be provided as an argument to the nsacl_list query'
      )
    } else {
      return await this.byFields({ fields: args }, pagination)
    }
  }
}
