/**
 * routes.ui.index.ts
 * Provide a route for all UI routes
*/

// Node Modules


// NPM Modules
import { Router } from 'express'

// Local Modules
import { uiAccountRoutes } from './routes.ui.accounts'

// Constants and global variables
const uiRoutes = Router()

uiRoutes.use('/account', uiAccountRoutes)

export { uiRoutes }