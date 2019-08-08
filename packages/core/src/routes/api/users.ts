/**
 * routes/api/users.ts
 * Provide routes for users to edit their own profiles
 * and for administrators to administrate their sub-accounts
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'
import User from '../../lib/users/users'
import { Log } from '../../lib/log'

// Local Modules

// Constants and global variables
const useradminRoutes = Router()

useradminRoutes.get('/me', (req: Request, res: Response) => {
  // new User({ req, res })
  //   .profile()
  //   .then((me) => {
  //     res.status(200).json({
  //       errors: null,
  //       data: me
  //     })
  //   })
  //   .catch((err) => {
  //     new Log(err.message).error()
  //     res.status(500).json({
  //       errors: [
  //         {
  //           message: err.message
  //         }
  //       ],
  //       data: null
  //     })
  //   })
  new User({ req, res })
    .profile(req.query.sys_id)
    .then(([user, logs, customers]) => {
      res.status(200).json({
        errors: null,
        data: {
          user,
          logs,
          customers
        }
      })
    })
    .catch((err) => {
      new Log(err.message).error()
      res.status(500).json({
        errors: [
          {
            message: err.message
          }
        ],
        data: null
      })
    })
})

useradminRoutes.get('/myusers', (req: Request, res: Response) => {
  res.status(200).json(['blue'])
})

useradminRoutes.get('/profile', (req: Request, res: Response) => {
  new User({ req, res })
    .profile(req.query.sys_id)
    .then(([user, logs, customers]) => {
      res.status(200).json({
        errors: null,
        data: {
          user: user[0],
          logs,
          customers
        }
      })
    })
    .catch((err) => {
      new Log(err.message).error()
      res.status(500).json({
        errors: [
          {
            message: err.message
          }
        ],
        data: null
      })
    })
})

export default useradminRoutes
