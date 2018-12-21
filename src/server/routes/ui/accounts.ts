/**
 * routes.ui.accounts.ts
 * Handle user account functions
 * such as change customer, user administration
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'


// Local Modules
import { ResponseMessage, StatusMessage } from '../../types/server';
import { Login, getToken } from '../../lib/users/login';
import { UserTypes } from '../../types/users';


// Constants and global variables
const uiAccountRoutes: Router = Router()
let responseBody: ResponseMessage

uiAccountRoutes.get('/myUsers', function(req: Request, res: Response) {
    
})

uiAccountRoutes.get('/navigation', function(req: Request, res: Response) {
    
})

uiAccountRoutes.post('/login', function(req: Request, res: Response) {
    let tokenPayload: UserTypes.AuthToken = null;
    if (req.body.user.username && req.body.user.password) {
        new Login(req.body.user).authenticate()
        .then((onUserAuthenticated: StatusMessage) => {
            tokenPayload = {
                userIsAuthenticated: true,
                userId: onUserAuthenticated.details.userId
            }
            res.set('Authorization', `JWT ${getToken(tokenPayload)}`)
            res.status(200).json(responseBody)
        }, (onUserNotAuthenticated: StatusMessage) => {
            responseBody = {
                error: true,
                message: onUserNotAuthenticated.message
            }
            res.set('Authorization', `JWT ${getToken()}`)
            res.status(200).json(responseBody)
        })
        .catch((err: StatusMessage) => {
            console.error(err)
            responseBody = {
                error: true,
                errorMessage: err.message
            }
            res.set('Authorization', `JWT ${getToken()}`)
            res.status(200).json(responseBody)
        })
    } else {
        responseBody = {
            error: true,
            errorMessage: 'Invalid username or password',
            message: 'Invalid username or password'
        }
        res.set('Authorization', `JWT ${getToken()}`)
        res.status(200).json(responseBody)
    }
})

export { uiAccountRoutes }