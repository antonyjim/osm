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
import { apiRoutes } from './api/index'
import { uiRoutes } from './ui/index'
import { staticRoutes } from './static'
import { Log, RequestLog } from '../lib/log'

// Constants and global variables
const router = Router()

router.use('/public', staticRoutes)
// Advanced logging
router.use((req, res, next) => {
  RequestLog(req.method, req.path)
  return next()
})
router.use(bodyParser.json())
// Require token in query string for api calls
router.use('/api', apiRoutes)
// Parse cookies on routes that return a webpage
router.use(cookieParser())
router.use('/', uiRoutes)

export { router }
