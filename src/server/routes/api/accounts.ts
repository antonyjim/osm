/**
 * routes.api.accounts.ts
 * Create and edit user accounts
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'


// Local Modules
import { User, Nonsig } from '../../lib/users/maintenance';
import { StatusMessage } from '../../types/server';
import { getRoleAuthorizedNavigation } from '../../lib/navigation/navigation';

// Constants and global variables
const apiAccountRoutes = Router()

apiAccountRoutes.get('/navigation', function(req: Request, res: Response) {
    console.log(JSON.stringify(req.auth))
    getRoleAuthorizedNavigation(req.auth.userId, req.auth.userNonsig)
    .then((onResolved: StatusMessage) => {
        res.status(200).json(onResolved)
    }, (onFailure: StatusMessage) => {
        res.status(200).json(onFailure)
    })
    .catch((err: StatusMessage) => {
        res.status(200).json(err)
    })
})

export { apiAccountRoutes }