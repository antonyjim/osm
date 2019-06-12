/**
 * routes.ui.index.ts
 * Provide a route for all UI routes
 */

// Node Modules
import { createReadStream } from 'fs'
import { resolve } from 'path'

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import { tokenValidation } from './../middleware/authentication'
import loginRoutes from './login'
import verifyRoutes from './verification'
import { getServerStatus } from '../../lib/utils'
// import * as routes from '../../../../service-tomorrow-client/server'
// import * as routes from 'serve-client'
/* tslint:disable:no-var-requires */

const routes = require('../../../../service-tomorrow-client/index')

// Constants and global variables
const uiRoutes = Router()

// Body parser must be included in api and ui separately due to GraphQL request errors
uiRoutes.use(tokenValidation())
uiRoutes.use('/login', loginRoutes)
uiRoutes.use('/verify', verifyRoutes)

uiRoutes.get('/logout', (req: Request, res: Response) => {
  res.cookie('token', null)
  routes.getLogin(req, res)
  // res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
  // const fileStream = createReadStream(
  //   resolve(__dirname, '../../../../static/login.html')
  // )
  // fileStream.on('data', (data) => {
  //   res.write(data)
  // })
  // fileStream.on('end', () => {
  //   res.end()
  //   return
  // })
})

uiRoutes.get('/stats', (req: Request, res: Response) => {
  getServerStatus().then((stats) => {
    res.status(200).json(stats)
  })
})

uiRoutes.get('/wetty', (req: Request, res: Response) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
  const fileStream = createReadStream(
    resolve(__dirname, '../../../../static/wettyError.html')
  )
  fileStream.on('data', (data) => {
    res.write(data)
  })
  fileStream.on('end', () => {
    res.end()
    return
  })
})

uiRoutes.all('*', routes.routes)

// uiRoutes.get('*', (req: Request, res: Response) => {
//   if (req.auth.iA && req.auth.u) {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
//     const fileStream = createReadStream(
//       resolve(__dirname, '../../../../static/index.html')
//     )
//     fileStream.on('data', (data) => {
//       res.write(data)
//     })
//     fileStream.on('end', () => {
//       res.end()
//       return
//     })
//   } else {
//     res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' })
//     const fileStream = createReadStream(
//       resolve(__dirname, '../../../../static/login.html')
//     )
//     fileStream.on('data', (data) => {
//       res.write(data)
//     })
//     fileStream.on('end', () => {
//       res.end()
//       return
//     })
//   }
// })

export { uiRoutes }
