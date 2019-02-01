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
import { tableMutations } from "../tables/mutations"

// Constants and global variables
const cudResolvers = {
    create: {
        user: userMutations.add_user,
        sys_db_object: tableMutations.add_table
    },
    update: {
        user: userMutations.update_user,
        sys_db_object: tableMutations.update_table
    }
}

export default cudResolvers