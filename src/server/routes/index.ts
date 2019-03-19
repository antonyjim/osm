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
import cell from '../lib/excel/cell'

// Constants and global variables
const router = Router()

router.use('/public', staticRoutes)
// Advanced logging
router.use((req, res, next) => {
  console.log(req.method, req.path)
  // RequestLog(req.method, req.path)
  return next()
})

router.get('/xcel', (req, res) => {
  cell()
  res.status(200).send()
})
router.use(bodyParser.json())
// Require token in query string for api calls
router.use('/api', apiRoutes)
// Parse cookies on routes that return a webpage
router.use(cookieParser())

router.use('/', uiRoutes)

export { router }
