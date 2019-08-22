/**
 * lib/ql/schema/mutations.ts
 * Provide resolvers for:
 * 1. Creating
 * 2. Updating
 * 3. Deleting
 * records in any table.
 */

// Node Modules

// NPM Modules

// Local Modules
import { userMutations } from '../mutations/userMutations'
import { tableMutations } from '../tables/mutations'
import columnMutations from '../columns/mutations'

// Constants and global variables
const rootMutations = {
  create: {
    sys_user: userMutations.add_user,
    sys_db_object: tableMutations.add_table,
    sys_db_dictionary: columnMutations.create_column
  },
  update: {
//    sys_user: userMutations.update_user,
    sys_db_object: tableMutations.update_table,
    sys_db_dictionary: columnMutations.update_column
  },
  delete: {}
}

export default rootMutations
