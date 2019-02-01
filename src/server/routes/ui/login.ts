/**
 * routes/ui/login.ts
 * Provide all routes for the application related to logging in. Primarily:
 * 1. Navigation
 * 2. Default customer information
 * 3. News
 * 4. Initial authentication
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import { getRoleAuthorizedNavigation } from '../../lib/navigation/navigation';
import { StatusMessage, ResponseMessage } from '../../types/server';
import { UserTypes } from '../../types/users';
import { Login, getToken } from '../../lib/users/login';
import { Log } from '../../lib/log';
import User, { forgotPassword } from '../../lib/ql/users/users';

// Constants and global variables
const loginRoutes = Router()

loginRoutes.get('/navigation', function(req: Request, res: Response) {
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

loginRoutes.post('/', function(req: Request, res: Response) {
    let responseBody: ResponseMessage
    let tokenPayload: UserTypes.AuthToken = null;
    if (req.body.user && req.body.user.username && req.body.user.password) {
        new Login(req.body.user).authenticate()
        .then((onUserAuthenticated: StatusMessage) => {
            tokenPayload = {
                userIsAuthenticated: true,
                userId: onUserAuthenticated.details.userId,
                userRole: onUserAuthenticated.details.userRole,
                userNonsig: onUserAuthenticated.details.userNonsig
            }
            let token = getToken(tokenPayload)
            responseBody = {
                error: false,
                message: 'Success',
                details: {
                    token
                }
            }
            res.status(200).json(responseBody)
        }, (onUserNotAuthenticated: StatusMessage) => {
            responseBody = {
                error: true,
                message: onUserNotAuthenticated.message
            }
            res.status(200).json(responseBody)
        })
        .catch((err: StatusMessage) => {
            new Log(err).error(2)
            responseBody = {
                error: true,
                errorMessage: err.message
            }
            res.status(200).json(responseBody)
        })
    } else {
        responseBody = {
            error: true,
            errorMessage: 'Invalid username or password',
            message: 'Invalid username or password'
        }
        res.status(200).json(responseBody)
    }
})

/**
 * Send forgot password emails to users
 */
loginRoutes.post('/forgot', function(req: Request, res: Response) {
    if (!req.body.email) {
        res.status(200).json({
            error: true,
            message: 'No email provided'
        })
    } else {
        forgotPassword(req.body.email)
        res.status(200).json({
            error: false,
            message: 'Instructions have been sent to ' + req.body.email
        })
    }
})

loginRoutes.post('/newUser', function(req, res) {
    new User().create(req.body)
    .then(onUserCreated => {
        res.status(200).json(onUserCreated)
    }, onInvalidFields => {
        res.status(200).json(onInvalidFields)
    })
    .catch((err: Error | TypeError) => {
        res.status(200).json({
            error: true,
            message: err.message
        })
    })
})

export default loginRoutes