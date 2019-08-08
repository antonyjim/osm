/**
 * lib/ql/users/mutations.ts
 * Create and modify user accounts
 */

// Node Modules

// NPM Modules

// Local Modules
import User from '../../users/users'

// Constants and global variables

export const userMutations = {
  add_user: (fields, body, context) => new User(context, fields).create(body),
//  update_user: (fields, body, context) => new User(context, fields).update(body)
}
