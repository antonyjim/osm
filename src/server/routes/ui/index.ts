/**
 * routes.ui.index.ts
 * Provide a route for all UI routes
*/

// Node Modules


// NPM Modules
import { Router } from 'express'

// Local Modules
import { uiAccountRoutes } from './accounts'
import { homeRoutes } from './home'
import { tokenValidation } from '../middleware/authentication'

// Constants and global variables
const uiRoutes = Router()

uiRoutes.use(tokenValidation)
uiRoutes.use('/', function(req, res) {
    if (req.auth.isAuthenticated) {
        
    }
})
uiRoutes.use('/account', uiAccountRoutes)

export { uiRoutes }