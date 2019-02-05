/**
 * lib/ql/users/mutations.ts
 * Create and modify user accounts
*/

// Node Modules

// NPM Modules


// Local Modules
import User from "../users/users";

// Constants and global variables


export const userMutations = {
    add_user:((_, fields, context, info) => new User(context, info).create(fields)),
    update_user: ((_, fields, context, info) => new User(context, info).update(fields))
}
