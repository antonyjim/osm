/**
 * routes.ui.accounts.ts
 * Handle user account functions
 * such as change customer, user administration
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'


// Local Modules
import { ResponseMessage, StatusMessage } from '../../types/server'
import { Login, getToken } from '../../lib/users/login'
import { UserTypes } from '../../types/users'
import { getRoleAuthorizedNavigation } from '../../lib/navigation/navigation';


// Constants and global variables
const uiAccountRoutes: Router = Router()
let responseBody: ResponseMessage

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

uiAccountRoutes.post('/login', function(req: Request, res: Response) {
    let tokenPayload: UserTypes.AuthToken = null;
    if (req.body.user.username && req.body.user.password) {
        new Login(req.body.user).authenticate()
        .then((onUserAuthenticated: StatusMessage) => {
            tokenPayload = {
                userIsAuthenticated: true,
                userId: onUserAuthenticated.details.userId
            }
            res.set('Authorization', `Bearer ${getToken(tokenPayload)}`)
            res.status(200).json(responseBody)
        }, (onUserNotAuthenticated: StatusMessage) => {
            responseBody = {
                error: true,
                message: onUserNotAuthenticated.message
            }
            res.set('Authorization', `Bearer ${getToken()}`)
            res.status(200).json(responseBody)
        })
        .catch((err: StatusMessage) => {
            console.error(err)
            responseBody = {
                error: true,
                errorMessage: err.message
            }
            res.set('Authorization', `Bearer ${getToken()}`)
            res.status(200).json(responseBody)
        })
    } else {
        responseBody = {
            error: true,
            errorMessage: 'Invalid username or password',
            message: 'Invalid username or password'
        }
        res.set('Authorization', `Bearer ${getToken()}`)
        res.status(200).json(responseBody)
    }
})

export { uiAccountRoutes }