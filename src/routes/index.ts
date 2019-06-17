/**
 * routes.index.ts
 * Combine the routes for the ui and the api and provide one module for the app
 */

// Node Modules

// NPM Modules
import { Router } from 'express'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'

// Local Modules
import { Log, RequestLog } from '../lib/log'
import cell from '../lib/excel/cell'
import { simpleQuery } from '../lib/queries'
import { getHostname } from '../lib/utils'
import { apiRoutes } from './api'
import uiRoutes from './ui'

// Constants and global variables
const router = Router()

// Advanced logging
router.use((req, res, next) => {
  console.log(req.method, req.path)
  // RequestLog(req.method, req.path)
  return next()
})

simpleQuery(
  'SELECT routing, file_path FROM sys_route_module WHERE (host = ? OR host = ?) AND pre_auth = 1',
  [getHostname(), '*']
)
  .then((results: { file_path: string; routing: string }[]) => {
    results.forEach((moduleInfo) => {
      try {
        const routeHandler = require(moduleInfo.file_path)
        console.log(
          '[STARTUP] Using module located at %s for route %s',
          moduleInfo.file_path,
          moduleInfo.routing
        )
        router.use(moduleInfo.routing, routeHandler)
      } catch (e) {
        console.error(
          '[STARTUP] Could not require route %s',
          moduleInfo.file_path
        )
        console.error(e)
      }
    })
    return 0
  })
  .then(() => {
    router.get('/excel', (req, res) => {
      cell().then((status) => {
        res.status(200).json(status)
      })
    })

    router.use(bodyParser.json())
    // Require token in query string for api calls
    router.use('/api', apiRoutes)
    // Parse cookies on routes that return a webpage
    router.use(cookieParser())

    return uiRoutes()
  })
  .then((withUiRoutes: Router) => {
    router.use('/', withUiRoutes)
  })
export { router }
