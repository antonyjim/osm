/**
 * routes.index.ts
 * Combine the routes for the ui and the api and provide one module for the app
*/

// Node Modules


// NPM Modules
import { Router } from 'express'

// Local Modules
import { apiRoutes } from './api/routes.api.index'
import { uiRoutes } from './ui/routes.ui.index'
import { staticRoutes } from './routes.static'

// Constants and global variables
const router = Router()

router.use('/public', staticRoutes)
router.use('/api', apiRoutes)
router.use('/', uiRoutes)


export { router }