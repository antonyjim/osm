/**
 * routes.index.ts
 * Combine the routes for the ui and the api and provide one module for the app
 */

// Node Modules

// NPM Modules
import { Router, static as serveStaticDirectory } from 'express'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'

// Local Modules
import { Log, RequestLog } from '@lib/log'
import cell from '@lib/excel/cell'
import { simpleQuery } from '@lib/queries'
import { getHostname } from '@lib/utils'
import { apiRoutes } from './api'
import uiRoutes from './ui'
import { tokenValidation } from './middleware/authentication'
import { join } from 'path'
import { clientPath } from '../config'
import { debug } from '@lib/log'

// Constants and global variables
const router = Router()
const log = debug('app:routes')

// Advanced logging
router.use((req, res, next) => {
  log(req.method, req.path)
  // RequestLog(req.method, req.path)
  return next()
})

simpleQuery(
  'SELECT routing, file_path FROM sys_route_module WHERE (host = ? OR host = ?) AND pre_auth = 1',
  [getHostname(), '*']
)
  // .then((results: { file_path: string; routing: string }[]) => {
  //   results.forEach((moduleInfo) => {
  //     try {
  //       const routeHandler = require(moduleInfo.file_path)
  //       console.log(
  //         '[STARTUP] Using module located at %s for route %s',
  //         join(__dirname, moduleInfo.file_path),
  //         moduleInfo.routing
  //       )
  //       router.use(moduleInfo.routing, routeHandler)
  //     } catch (e) {
  //       console.error(
  //         '[STARTUP] Could not require route located at %s for route %s',
  //         join(__dirname, moduleInfo.file_path),
  //         moduleInfo.routing
  //       )
  //       console.error(e)
  //     }
  //   })
  //   return 0
  // })
  .then(() => {
    router.use(
      '/public/static',
      serveStaticDirectory(join(clientPath, 'build/static'))
    )
    router.use('/public/', serveStaticDirectory(join(clientPath, 'public')))
    router.get('/excel', (req, res) => {
      cell().then((status) => {
        res.status(200).json(status)
      })
    })

    router.use(bodyParser.json())
    // Parse cookies on routes that return a webpage
    router.use(cookieParser())
    router.use(tokenValidation())
    router.use('/api', apiRoutes)

    return uiRoutes()
  })
  .then((withUiRoutes: Router) => {
    router.use('/', withUiRoutes)
  })
  .catch((err) => {
    console.error('[STARTUP] Error in evaluating routes:')
    console.error(err)
  })
export { router }
