/**
 * routes.ui.home.ts
 * Provide routes for loading the initial login and app page
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import { Navigation } from '../../lib/users/navigation'

// Constants and global variables
const homeRoutes = Router()

homeRoutes.get('/navigation')

export { homeRoutes }