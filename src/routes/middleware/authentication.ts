/**
 * routes.middleware.authentication.ts
 *
 * Handle validation of endpoints and token issuance
 */

// Node Modules

// NPM Modules
import { Request, Response, NextFunction } from 'express'
import { sign, verify } from 'jsonwebtoken'

// Local Modules
import { validateEndpoint } from './../../lib/navigation/navigation'
import { IStatusMessage } from './../../types/server'
import { UserTypes } from '../../types/users'
import { jwtSecret } from '../../lib/connection'

// Constants and global variables
const authorizationHeader: string = 'Authorization'
const defaultClaimLevel: string = 'g'
const useCookie: boolean = true // Determines whether to use 'Authorization' or 'Set-Cookie'

export enum jwtKeys {
  isAuthenticated = 'iA',
  isAuthorized = 'iZ',
  claimLevel = 'l',
  claim = 'c',
  user = 'u',
  role = 'r',
  token = 't',
  scope = 's'
}

/*
  This will be used to assign to anonymous users
  or users with expired tokens
*/
const anonToken: UserTypes.IAuthToken = {
  [jwtKeys.isAuthenticated]: false,
  [jwtKeys.isAuthorized]: false,
  [jwtKeys.user]: null,
  [jwtKeys.claim]: null,
  [jwtKeys.claimLevel]: defaultClaimLevel
}

export function setResponseToken(res: Response, token: string) {
  if (useCookie) {
    res.cookie('token', `Bearer ${token}`)
  } else {
    res.set(authorizationHeader, `Bearer ${token}`)
  }
}

/**
 * Validate tokens present in the cookie of the request, really only applicable to the main login/app page
 */
export function tokenValidation() {
  return (req: Request, res: Response, next: NextFunction) => {
    let tokenCookie =
      req.query.token || req.header(authorizationHeader) || req.cookies.token
    if (tokenCookie) {
      tokenCookie = tokenCookie.split('Bearer ')[1] || tokenCookie
    }
    req.auth = {}
    function handleOnAuthError(error: Error) {
      req.auth = {
        [jwtKeys.isAuthenticated]: false,
        [jwtKeys.isAuthorized]: false,
        [jwtKeys.user]: null,
        [jwtKeys.claim]: null,
        [jwtKeys.claimLevel]: defaultClaimLevel
      }
      sign(
        anonToken,
        jwtSecret,
        { expiresIn: '1h' },
        (err: Error, token: string) => {
          if (err) console.error(err)
          req.auth = {
            [jwtKeys.isAuthenticated]: false,
            [jwtKeys.isAuthorized]: false,
            [jwtKeys.user]: null,
            [jwtKeys.claimLevel]: defaultClaimLevel,
            [jwtKeys.claim]: null
          }
          setResponseToken(res, token)

          return next()
        }
      )
    }
    if (!tokenCookie) {
      sign(
        anonToken,
        jwtSecret,
        { expiresIn: '1h' },
        (err: Error, token: string) => {
          if (err) handleOnAuthError(err)
          req.auth = {
            [jwtKeys.isAuthenticated]: false,
            [jwtKeys.isAuthorized]: false,
            [jwtKeys.user]: null,
            [jwtKeys.claimLevel]: defaultClaimLevel,
            [jwtKeys.claim]: null
          }
          setResponseToken(res, token)
          return next()
        }
      )
    } else {
      verify(
        tokenCookie,
        jwtSecret,
        (err: Error, decoded: UserTypes.IAuthToken) => {
          if (err) handleOnAuthError(err)
          if (decoded) {
            const authToken: UserTypes.IAuthToken = {
              [jwtKeys.isAuthenticated]: true,
              [jwtKeys.user]: decoded[jwtKeys.user],
              [jwtKeys.scope]: decoded[jwtKeys.scope],
              [jwtKeys.claimLevel]: decoded[jwtKeys.claimLevel],
              [jwtKeys.claim]: decoded[jwtKeys.claim]
            }
            sign(
              authToken,
              jwtSecret,
              { expiresIn: '1h' },
              (signErr: Error, token: string) => {
                if (signErr) handleOnAuthError(signErr)
                req.auth = {
                  [jwtKeys.isAuthenticated]: true,
                  [jwtKeys.isAuthorized]: false,
                  [jwtKeys.user]: decoded[jwtKeys.user],
                  [jwtKeys.scope]: decoded[jwtKeys.scope],
                  [jwtKeys.claimLevel]: decoded[jwtKeys.claimLevel],
                  [jwtKeys.claim]: decoded[jwtKeys.claim]
                }
                setResponseToken(res, token)
                return next()
              }
            )
          } else {
            handleOnAuthError(new Error('Expired token'))
          }
        }
      )
    }
  }
}

export function requireAuthentication() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.auth[jwtKeys.isAuthenticated]) {
      next()
    } else {
      res.status(401).json({
        error: true,
        errors: [
          {
            message: 'User unauthorized to continue.'
          }
        ]
      })
    }
  }
}

/**
 * Validate the token located in the token query parameter on API requests only
 */
// export function apiTokenValidation() {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const anonToken: UserTypes.IAuthToken = {
//       [jwtKeys.isAuthenticated]: false,
//       [jwtKeys.user]: null,
//       [jwtKeys.scope]: null,
//       [jwtKeys.claimLevel]: defaultClaimLevel,
//       [jwtKeys.claim]: null
//     }

//     /*
//       Look for the token in the cookies first, then in the query string
//     */
//     let tokenCookie: string =
//       req.query.token || req.header(authorizationHeader) || req.cookies.token

//     if (!tokenCookie) {
//       return handleOnAuthError()
//     }

//     if (tokenCookie) {
//       tokenCookie = tokenCookie.split('Bearer ')[1] || tokenCookie
//     }

//     req.auth = {}

//     function handleOnAuthError(error?: Error) {
//       req.auth = {
//         [jwtKeys.isAuthenticated]: false,
//         [jwtKeys.isAuthorized]: false,
//         [jwtKeys.user]: null,
//         [jwtKeys.claimLevel]: defaultClaimLevel,
//         [jwtKeys.claim]: null
//       }
//       sign(
//         anonToken,
//         jwtSecret,
//         { expiresIn: '1h' },
//         (err: Error, token: string) => {
//           if (err) res.status(500).end()
//           req.auth = {
//             [jwtKeys.isAuthenticated]: false,
//             [jwtKeys.isAuthorized]: false,
//             [jwtKeys.user]: null,
//             [jwtKeys.claimLevel]: defaultClaimLevel,
//             [jwtKeys.claim]: null
//           }

//           req.auth.t = token
//           res.cookie('token', token)
//           return res.status(401).json({
//             errors: [
//               {
//                 error: true,
//                 message: 'User unauthenticated or token expired'
//               }
//             ]
//           })
//           res.end()
//         }
//       )
//     }
//     if (!tokenCookie) {
//       sign(
//         anonToken,
//         jwtSecret,
//         { expiresIn: '1h' },
//         (err: Error, token: string) => {
//           if (err) handleOnAuthError(err)
//           req.auth = {
//             [jwtKeys.isAuthenticated]: false,
//             [jwtKeys.isAuthorized]: false,
//             [jwtKeys.user]: null,
//             [jwtKeys.claimLevel]: defaultClaimLevel, // Default global scope
//             [jwtKeys.claim]: null
//           }

//           setResponseToken(res, token)
//           return res.status(401).json({
//             errors: [
//               {
//                 error: true,
//                 message: 'User unauthenticated or token expired'
//               }
//             ]
//           })
//         }
//       )
//     } else {
//       verify(
//         tokenCookie,
//         jwtSecret,
//         (err: Error, decoded: UserTypes.IAuthToken) => {
//           if (err) handleOnAuthError(err)
//           if (decoded) {
//             const authToken: UserTypes.IAuthToken = {
//               [jwtKeys.isAuthenticated]: true,
//               [jwtKeys.user]: decoded[jwtKeys.user],
//               [jwtKeys.scope]: decoded[jwtKeys.scope],
//               [jwtKeys.claimLevel]: decoded[jwtKeys.claimLevel],
//               [jwtKeys.claim]: decoded[jwtKeys.claim]
//             }
//             sign(
//               authToken,
//               jwtSecret,
//               { expiresIn: '1h' },
//               (signErr: Error, token: string) => {
//                 if (signErr) handleOnAuthError(signErr)
//                 req.auth = {
//                   [jwtKeys.isAuthenticated]: true,
//                   [jwtKeys.isAuthorized]: false,
//                   [jwtKeys.user]: decoded[jwtKeys.user],
//                   [jwtKeys.scope]: decoded[jwtKeys.scope],
//                   [jwtKeys.claimLevel]: decoded[jwtKeys.claimLevel],
//                   [jwtKeys.claim]: decoded[jwtKeys.claim]
//                 }
//                 req.auth.t = token
//                 setResponseToken(res, token)
//                 next()
//               }
//             )
//           } else {
//             handleOnAuthError(new Error('Expired token'))
//           }
//         }
//       )
//     }
//   }
// }

/**
 * Validate the endpoint that is attepmting to be accessed by comparing
 * the role in the token to the roles on the sys_navigation table.
 */
export function endpointAuthentication() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      !req.auth ||
      !req.auth[jwtKeys.isAuthenticated] ||
      !req.auth[jwtKeys.user]
    ) {
      req.auth[jwtKeys.isAuthorized] = false
      return res.status(401).json({
        errors: [
          {
            error: true,
            message: 'User unauthenticated or token expired'
          }
        ]
      })
    } else {
      validateEndpoint(req.method, req.originalUrl, req.auth[jwtKeys.scope])
        .then(
          (onUserAuthorized: IStatusMessage) => {
            req.auth[jwtKeys.isAuthorized] = onUserAuthorized.details.authorized
            next()
          },
          (onUserUnAuthorized: IStatusMessage) => {
            req.auth[jwtKeys.isAuthorized] =
              onUserUnAuthorized.details.authorized
            console.log('User is not authorized')
            return res.status(401).json({
              errors: [
                {
                  error: true,
                  message: 'User unauthorized with current priviledge'
                }
              ]
            })
          }
        )
        .catch((error: IStatusMessage) => {
          console.error(error)
          req.auth[jwtKeys.isAuthorized] = false
          return res.status(401).json({
            error: true,
            message: 'User unauthorized with current priviledge'
          })
        })
    }
  }
}
