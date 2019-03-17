/**
 * lib.navigation.navigation.ts
 *
 * Handle validation of navigation endpoints
 */

// Node Modules

// NPM Modules

// Local Modules
import { getPool, Querynator } from './../connection'
import { IStatusMessage } from '../../../types/server'
import { IRolePermissions } from '../../../types/roles'
import { Log } from '../log'

// Constants and global variables
const pool = getPool()

export function getRoleAuthorizedNavigation(
  userId: string,
  userNonsig: string
): Promise<IStatusMessage> {
  return new Promise((resolve, reject) => {
    const resultSet = {
      navs: null,
      privs: null
    }

    if (userId && userNonsig) {
      const query =
        'SELECT * FROM ?? WHERE ?? = (SELECT ?? FROM ?? WHERE ?? = ? AND ?? = ?)'
      const params = [
        'uiNavigation',
        'rpId',
        'nsaRole',
        'sys_user_nsacl',
        'nsaUserId',
        userId,
        'nsaNonsig',
        userNonsig
      ]
      new Querynator()
        .createQ({ query, params }, 'CALL')
        .then((navigation) => {
          const role = navigation[0] ? navigation[0].rpId : 'No-Conf'
          resultSet.navs = navigation
          const queryPrivs = 'SELECT DISTINCT ?? FROM ?? WHERE ?? = ?'
          const paramPrivs = ['role_priv', 'sys_role', 'rpId', role]
          return new Querynator().createQ(
            { query: queryPrivs, params: paramPrivs },
            'CALL'
          )
        })
        .then((authorizedPrivs) => {
          resultSet.privs = authorizedPrivs.map((priv) => priv.role_priv)
          resolve({
            error: false,
            message: 'Retrieved',
            details: resultSet
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

/**
 *
 * @param method HTTP Request Method
 * @param endpoint PathName
 * @param role Role from user token
 */
export function validateEndpoint(
  method,
  endpoint,
  role
): Promise<IStatusMessage> {
  return new Promise((resolve, reject) => {
    if (method && endpoint && role) {
      const sqlStatement = `SELECT endpointvalidation(${pool.escape([
        role,
        endpoint.split('?')[0],
        method
      ])}) AS authed`
      pool.query(
        sqlStatement,
        (err: Error, authorizedNavigationLinks: IRolePermissions[]) => {
          if (err) {
            throw err
          }
          if (
            authorizedNavigationLinks[0] &&
            authorizedNavigationLinks[0].authed
          ) {
            resolve({
              error: false,
              message: 'User allowed',
              details: {
                authorized: true
              }
            })
          } else {
            reject({
              error: false,
              message: 'User not allowed',
              details: {
                authorized: false
              }
            })
          }
        }
      )
    } else {
      reject({
        error: true,
        message: 'Missing method, endpoint or role'
      })
    }
  })
}
