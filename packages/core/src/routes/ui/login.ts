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
import { IStatusMessage, IResponseMessage } from '@osm/server'
import { UserTypes } from '@osm/users'
import { login, getToken, sysUser } from '@app/users/login'
import { Log } from '@lib/log'
import User, { forgotPassword } from '@app/users/users'
import { createReadStream } from 'fs'
import { resolve } from 'path'
import { setResponseToken, jwtKeys } from '../middleware/authentication'

// Constants and global variables
const authRoutes = Router()

authRoutes.get('/login', (req: Request, res: Response) => {
  res.cookie('token', null)
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
  const fileStream = createReadStream(
    resolve(__dirname, '../../../static/login.html')
  )
  fileStream.on('data', (data) => {
    res.write(data)
  })
  fileStream.on('end', () => {
    res.end()
    return
  })
})

// There's no reason to store the login elsewhere
authRoutes.get('/logout', (req: Request, res: Response) => {
  setResponseToken(res, null)
  res.redirect(302, '/')
  // res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
  // const fileStream = createReadStream(
  //   resolve(__dirname, '../../../static/login.html')
  // )
  // fileStream.on('data', (data) => {
  //   res.write(data)
  // })
  // fileStream.on('end', () => {
  //   res.end()
  //   return
  // })
})

authRoutes.post('/login', (req: Request, res: Response) => {
  let responseBody: IResponseMessage = {}
  let tokenPayload: UserTypes.IAuthToken = null
  if (
    !req.auth[jwtKeys.user] &&
    req.body.user &&
    req.body.user.username &&
    req.body.user.password
  ) {
    login(req.body.user)
      .then((onUserAuthenticated: IStatusMessage) => {
        tokenPayload = {
          [jwtKeys.isAuthenticated]: true,
          [jwtKeys.user]: onUserAuthenticated.details[sysUser.userId],
          [jwtKeys.scope]: onUserAuthenticated.details[sysUser.appScope],
          [jwtKeys.claimLevel]:
            onUserAuthenticated.details[sysUser.claimLevel] || 'global',
          [jwtKeys.claim]: onUserAuthenticated.details[sysUser.claim]
        }
        const token = getToken(tokenPayload)
        setResponseToken(res, token)
        responseBody = {
          info: [{ message: 'Success' }],
          data: {
            token
          }
        }
        res.status(200).json(responseBody)
      })
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
authRoutes.post('/forgot', (req: Request, res: Response) => {
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

authRoutes.post('/newUser', (req: Request, res: Response) => {
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

export default authRoutes
