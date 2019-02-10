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
import { Log } from '../lib/log';

// Constants and global variables
const router = Router()

router.use('/public', staticRoutes)
// Advanced logging
router.use((req, res, next) => {
    new Log(req.method + ' ' + req.originalUrl).info()
    return next()
})
router.use((req, res, next) => {
    console.log('Debugging is set to ' + process.env.DEBUG)
    next() 
})
router.use(bodyParser.json())
router.use('/api', apiRoutes)
router.use(cookieParser())
router.use('/', uiRoutes)


export { router }