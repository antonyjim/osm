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
import { IStatusMessage } from './../../../types/server'
import { UserTypes } from '../../../types/users'
import { jwtSecret } from '../../lib/connection'

// Constants and global variables

/**
 * Validate tokens present in the cookie of the request, really only applicable to the main login/app page
 */
export function tokenValidation() {
  return (req: Request, res: Response, next: NextFunction) => {
    const anonToken: UserTypes.IAuthToken = {
      iA: false,
      u: null,
      r: null,
      c: null
    }
    let tokenCookie = req.query.token || req.cookies.token
    if (tokenCookie) {
      tokenCookie = tokenCookie.split('Bearer ')[1] || tokenCookie
    }
    req.auth = {}
    function handleOnAuthError(error: Error) {
      req.auth = {
        iA: false,
        iZ: false,
        u: null,
        c: null
      }
      sign(
        anonToken,
        jwtSecret,
        { expiresIn: '1h' },
        (err: Error, token: string) => {
          if (err) console.error(err)
          req.auth = {
            iA: false,
            iZ: false,
            u: null,
            c: null
          }
          res.cookie('token', token)
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
            iA: false,
            iZ: false,
            u: null,
            c: null
          }
          res.cookie('token', token)
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
              iA: true,
              u: decoded.u,
              r: decoded.r,
              c: decoded.c
            }
            sign(
              authToken,
              jwtSecret,
              { expiresIn: '1h' },
              (signErr: Error, token: string) => {
                if (signErr) handleOnAuthError(signErr)
                req.auth = {
                  iA: true,
                  iZ: false,
                  u: decoded.u,
                  r: decoded.r,
                  c: decoded.c
                }
                res.cookie('token', token)
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

/**
 * Validate the token located in the token query parameter on API requests only
 */
export function apiTokenValidation() {
  return (req: Request, res: Response, next: NextFunction) => {
    const anonToken: UserTypes.IAuthToken = {
      iA: false,
      u: null,
      r: null,
      c: null
    }
    let tokenCookie = req.query.token
    if (tokenCookie) {
      tokenCookie = tokenCookie.split('Bearer ')[1] || tokenCookie
    }
    req.auth = {}
    function handleOnAuthError(error: Error) {
      req.auth = {
        iA: false,
        iZ: false,
        u: null,
        c: null
      }
      sign(
        anonToken,
        jwtSecret,
        { expiresIn: '1h' },
        (err: Error, token: string) => {
          if (err) res.status(500).end()
          req.auth = {
            iA: false,
            iZ: false,
            u: null,
            c: null
          }
          req.auth.t = token
          res.status(401).json({
            error: true,
            message: 'User unauthenticated or token expired'
          })
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
            iA: false,
            iZ: false,
            u: null,
            c: null
          }
          req.auth.t = token
          res.status(401).json({
            error: true,
            message: 'User unauthenticated or token expired'
          })
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
              iA: true,
              u: decoded.u,
              r: decoded.r,
              c: decoded.c
            }
            sign(
              authToken,
              jwtSecret,
              { expiresIn: '1h' },
              (signErr: Error, token: string) => {
                if (signErr) handleOnAuthError(signErr)
                req.auth = {
                  iA: true,
                  iZ: false,
                  u: decoded.u,
                  r: decoded.r,
                  c: decoded.c
                }
                req.auth.t = token
                next()
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

/**
 * Validate the endpoint that is attepmting to be accessed by comparing
 * the role in the token to the roles on the sys_navigation table.
 */
export function endpointAuthentication() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !req.auth.iA || !req.auth.u) {
      req.auth.iZ = false
      console.log(JSON.stringify(req.auth))
      return res.status(401).json({
        error: true,
        message: 'User unauthenticated or token expired'
      })
    } else {
      validateEndpoint(req.method, req.originalUrl, req.auth.r)
        .then(
          (onUserAuthorized: IStatusMessage) => {
            req.auth.iZ = onUserAuthorized.details.authorized
            next()
          },
          (onUserUnAuthorized: IStatusMessage) => {
            req.auth.iZ = onUserUnAuthorized.details.authorized
            console.log('User is not authorized')
            return res.status(401).json({
              error: true,
              message: 'User unauthorized with current privileges'
            })
          }
        )
        .catch((error: IStatusMessage) => {
          console.error(error)
          req.auth.iZ = false
          return res.status(401).json({
            error: true,
            message: 'User authorization failed'
          })
        })
    }
  }
}
