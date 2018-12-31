/**
 * routes.ui.accounts.ts
 * Handle user account functions
 * such as change customer, user administration
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'


// Local Modules
import { StatusMessage } from '../../types/server'
import { getRoleAuthorizedNavigation } from '../../lib/navigation/navigation';


// Constants and global variables
const uiAccountRoutes: Router = Router()

uiAccountRoutes.get('/navigation', function(req: Request, res: Response) {
    console.log(JSON.stringify(req.auth))
    getRoleAuthorizedNavigation(req.auth.userRole)
    .then((onResolved: StatusMessage) => {
        res.status(200).json(onResolved)
    }, (onFailure: StatusMessage) => {
        res.status(200).json(onFailure)
    })
    .catch((err: StatusMessage) => {
        res.status(200).json(err)
    })
})

export { uiAccountRoutes }