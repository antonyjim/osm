/**
 * routes/ui/login.ts
 * Provide all routes for the application related to logging in. Primarily:
 * 1. Navigation
 * 2. Default customer information
 * 3. News
 * 4. Initial authentication
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import { getRoleAuthorizedNavigation } from '../../lib/navigation/navigation'
import { IStatusMessage, IResponseMessage } from '../../../types/server'
import { UserTypes } from '../../../types/users'
import { Login, getToken } from '../../lib/users/login'
import { Log } from '../../lib/log'
import User, { forgotPassword } from '../../lib/ql/users/users'

// Constants and global variables
const loginRoutes = Router()

loginRoutes.get('/navigation', (req: Request, res: Response) => {
  getRoleAuthorizedNavigation(req.auth.u, req.auth.c)
    .then(
      (onResolved: IStatusMessage) => {
        res.status(200).json(onResolved)
      },
      (onFailure: IStatusMessage) => {
        res.status(200).json(onFailure)
      }
    )
    .catch((err: IStatusMessage) => {
      res.status(200).json(err)
    })
})

loginRoutes.post('/', (req: Request, res: Response) => {
  let responseBody: IResponseMessage
  let tokenPayload: UserTypes.IAuthToken = null
  if (
    !req.auth.u &&
    req.body.user &&
    req.body.user.username &&
    req.body.user.password
  ) {
    Login(req.body.user)
      .then(
        (onUserAuthenticated: IStatusMessage) => {
          tokenPayload = {
            iA: true,
            u: onUserAuthenticated.details.sys_id,
            r: onUserAuthenticated.details.userRole,
            c: onUserAuthenticated.details.userNonsig
          }
          const token = getToken(tokenPayload)
          responseBody = {
            info: [{ message: 'Success' }],
            data: {
              token
            }
          }
          res.status(200).json(responseBody)
        },
        (onUserNotAuthenticated: IStatusMessage) => {
          responseBody = {
            errors: [{ message: onUserNotAuthenticated.message }]
          }
          res.status(200).json(responseBody)
        }
      )
      .catch((err: Error) => {
        new Log(err.message).error(2)
        responseBody = {
          errors: [{ message: err.message }]
        }
        if (!res.headersSent) {
          res.status(200).json(responseBody)
        }
      })
  } else {
    responseBody = {
      errors: [{ message: 'Invalid username or password' }]
    }
    res.status(200).json(responseBody)
  }
})

/**
 * Send forgot password emails to users
 */
loginRoutes.post('/forgot', (req: Request, res: Response) => {
  if (!req.body.email) {
    res.status(200).json({
      error: true,
      message: 'No email provided'
    })
  } else {
    forgotPassword(req.body.email)
    res.status(200).json({
      error: false,
      message: 'Instructions have been sent to ' + req.body.email
    })
  }
})

loginRoutes.post('/newUser', (req: Request, res: Response) => {
  new User()
    .create(req.body)
    .then(
      (onUserCreated) => {
        res.status(200).json(onUserCreated)
      },
      (onInvalidFields) => {
        res.status(200).json(onInvalidFields)
      }
    )
    .catch((err: Error | TypeError) => {
      res.status(200).json({
        error: true,
        message: err.message
      })
    })
})

export default loginRoutes
