/**
 * lib.navigation.navigation.ts
 *
 * Handle validation of navigation endpoints
 */

// Node Modules

// NPM Modules

// Local Modules
import { Querynator, simpleQuery } from '../../lib/queries'
import { IStatusMessage } from '../../types/server'
import { IRolePermissions } from '../../types/roles'
import { Log } from '../../lib/log'

// Constants and global variables

/**
 * Returns a list of all links a user is able to see
 * @param userId User ID of requested user
 * @param currentScope Current application scope
 */
export function getRoleAuthorizedNavigation(
  userId: string,
  currentScope: string
): Promise<IStatusMessage> {
  return new Promise((resolve, reject) => {
    if (userId && currentScope) {
      const navQuery: string = 'CALL fetch_navigation(?, ?)'
      const navParams: string[] = [userId, currentScope]
      const roleQuery: string = 'CALL fetch_user_role(?, ?)'
      const roleParams: string[] = [userId, currentScope]
      Promise.all([
        simpleQuery(navQuery, navParams),
        simpleQuery(roleQuery, roleParams)
      ])
        .then(([navigation, roles]) => {
          resolve({
            error: false,
            message: 'Retrieved',
            details: {
              navigation,
              roles
            }
          })
        })
        .catch((err) => {
          reject({
            error: true,
            message: err.message
          })
        })
    } else {
      reject({
        error: true,
        message: 'Missing or invalid role'
      })
    }
  })
}

// /**
//  *
//  * @param method HTTP Request Method
//  * @param endpoint PathName
//  * @param role Role from user token
//  */
// export function validateEndpoint(
//   method,
//   endpoint,
//   role
// ): Promise<IStatusMessage> {
//   return new Promise((resolve, reject) => {
//     if (method && endpoint && role) {
//       simpleQuery('SELECT endpoint_validation(?, ?, ?) AS authed', [
//         role,
//         endpoint.split('?')[0],
//         method
//       ])
//         .then((authorizedNavigationLinks) => {
//           if (
//             authorizedNavigationLinks[0] &&
//             authorizedNavigationLinks[0].authed
//           ) {
//             resolve({
//               error: false,
//               message: 'User allowed',
//               details: {
//                 authorized: true
//               }
//             })
//           } else {
//             reject({
//               error: false,
//               message: 'User not allowed',
//               details: {
//                 authorized: false
//               }
//             })
//           }
//         })
//         .catch((err) => {
//           reject({
//             error: true,
//             message: err.message,
//             details: {
//               authorized: false
//             }
//           })
//         })
//     } else {
//       reject({
//         error: true,
//         message: 'Missing method, endpoint or role'
//       })
//     }
//   })
// }
