/**
 * routes.ui.accounts.ts
 * Handle user account functions
 * such as change customer, user administration
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'


// Local Modules


// Constants and global variables
const uiAccountRoutes: Router = Router()

uiAccountRoutes.get('/myUsers', function(req: Request, res: Response) {
    
})

export { uiAccountRoutes }