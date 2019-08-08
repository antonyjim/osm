import { Request, Response } from 'express'
import { join } from 'path'
import { simpleQuery } from '../../lib/queries'
import { jwtKeys } from './authentication'

function sendUnauthorized(res: Response) {
  res.status(403).json({
    errors: [
      {
        message: 'Unauthorized to access route.'
      }
    ]
  })
}

/**
 * Fetches and returns an array of all roles a user is
 * currently authorized for in the provided scope.
 * @param userId User id to get the roles for
 * @param scope Current application scope
 */
export function getUserRoles(userId: string, scope: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const query = 'CALL fetch_user_role(?, ?)'
    const params = [userId, scope]
    simpleQuery(query, params)
      .then(resolve)
      .catch(reject)
  })
}

/**
 * Validates that a user is authorized for a particular express route
 * @param roleRequired String representing the minimum role a user must possess
 * @param callback Callback if user is authenticated
 */
export function authorize(
  roleRequired: string,
  callback: (req: Request, res: Response) => void
): (sourceReq: Request, sourceRes: Response) => void {
  return (sourceReq: Request, sourceRes: Response) => {
    if (!sourceReq.auth[jwtKeys.user] || !sourceReq.auth[jwtKeys.scope]) {
      sendUnauthorized(sourceRes)
    } else {
      getUserRoles(sourceReq[jwtKeys.user], sourceReq[jwtKeys.scope]).then(
        (roles: string[]) => {
          if (roles.indexOf(roleRequired) > -1) {
            callback(sourceReq, sourceRes)
          } else {
            sendUnauthorized(sourceRes)
          }
        }
      )
    }
  }
}
