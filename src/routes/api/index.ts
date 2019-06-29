/**
 * routes.api.index.ts
 * Provide a single route for all api routes and parse appropriate middleware
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

// Local Modules
import {
  endpointAuthentication,
  apiTokenValidation
} from '../middleware/authentication'
import { adminRoutes } from './admin'
import { login, getToken } from './../../lib/users/login'
import { IStatusMessage } from '../../types/server'
import { jwtSecret } from '../../lib/connection'
import { q } from './q'
import bodyParser = require('body-parser')
import { UserTypes } from '../../types/users'
import useradminRoutes from './users'
import descriptions from './descriptions'
import { excelRoute } from './excel'
import { getRoleAuthorizedNavigation } from '../../lib/navigation/navigation'
import { fileRouter } from './fileHandler'
import { ccRoutes } from './customComponents'

// Constants and global variables
const apiRoutes = Router()

apiRoutes.get('/getToken', (req: Request, res: Response) => {
  if (req.query.username && req.query.password) {
    login({ username: req.query.username, password: req.query.password })
      .then(
        (onSuccessfulAuthentication: IStatusMessage) => {
          const payload: UserTypes.IAuthToken = {
            iA: true,
            u: onSuccessfulAuthentication.details.sys_id,
            r: onSuccessfulAuthentication.details.userRole,
            c: onSuccessfulAuthentication.details.userNonsig
          }
          const token = getToken(payload)
          res.status(200).json({
            token,
            error: false,
            message: 'Success'
          })
          /*
            sign(payload, jwtSecret, {expiresIn: '5h'}, function(err: Error, token: string) {
                if (err) throw err
                res.status(200).json({
                    token,
                    error: false,
                    message: 'Success'
                })
            })
            */
        },
        (onUnSuccessfulAuthentication: IStatusMessage) => {
          res.status(200).json({
            error: true,
            message: onUnSuccessfulAuthentication.message
          })
        }
      )
      .catch((err) => {
        console.error(err)
        res.status(500).json({
          error: true,
          message: err
        })
      })
  }
})

apiRoutes.use('/excel', excelRoute)
apiRoutes.use(apiTokenValidation())
apiRoutes.use('/describe', descriptions)
apiRoutes.use('/q', q) // q is for general api queries
apiRoutes.get('/navigation', (req: Request, res: Response) => {
  getRoleAuthorizedNavigation(req.auth.u, req.auth.c)
    .then((onResolved: IStatusMessage) => {
      res.status(200).json(onResolved)
    })
    .catch((err: IStatusMessage) => {
      res.status(200).json(err)
    })
})
// For now we are just going to go around endpoint authentication
apiRoutes.use('/c', ccRoutes)
apiRoutes.use('/attachments', fileRouter)
apiRoutes.use(endpointAuthentication())
apiRoutes.use(bodyParser.json())
apiRoutes.use('/admin', adminRoutes) // admin is for site-administration duties
apiRoutes.use('/users', useradminRoutes) // users is for user administration
apiRoutes.get('/refresh', (req: Request, res: Response) => {
  if (req.auth.iA && req.auth.c) {
    const payload = {
      iA: true,
      u: req.auth.u,
      r: req.auth.r,
      c: req.auth.c
    }
    sign(
      payload,
      jwtSecret,
      { expiresIn: '5h' },
      (err: Error, token: string) => {
        if (err) res.status(500).end()
        res.status(200).json({
          token,
          error: false,
          message: 'Success'
        })
      }
    )
  } else {
    if (!res.headersSent) {
      res.status(401).json({
        error: true,
        message: 'User is not authenticated'
      })
    } else {
      return 0
    }
  }
})
export { apiRoutes }
