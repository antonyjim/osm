/**
 * routes.ui.index.ts
 * Provide a route for all UI routes
*/

// Node Modules
import { createReadStream } from 'fs';

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import { ResponseMessage, StatusMessage } from '../../types/server';
import { UserTypes } from '../../types/users';
import { Login, getToken } from '../../lib/users/login';
import { tokenValidation } from './../middleware/authentication'


// Constants and global variables
const uiRoutes = Router()

uiRoutes.use(tokenValidation())
uiRoutes.post('/login', function(req: Request, res: Response) {
    let responseBody: ResponseMessage
    let tokenPayload: UserTypes.AuthToken = null;
    if (req.body.user && req.body.user.username && req.body.user.password) {
        console.log(JSON.stringify(req.body.user), ' Logging in')
        new Login(req.body.user).authenticate()
        .then((onUserAuthenticated: StatusMessage) => {
            tokenPayload = {
                userIsAuthenticated: true,
                userId: onUserAuthenticated.details.userId,
                userRole: onUserAuthenticated.details.userRole
            }
            let token = getToken(tokenPayload)
            responseBody = {
                error: false,
                message: 'Success',
                details: {
                    token
                }
            }
            res.cookie('token', token)
            console.log('Login response body is ', JSON.stringify(responseBody))
            res.status(200).json(responseBody)
        }, (onUserNotAuthenticated: StatusMessage) => {
            responseBody = {
                error: true,
                message: onUserNotAuthenticated.message
            }
            res.cookie('token', getToken())
            res.status(200).json(responseBody)
        })
        .catch((err: StatusMessage) => {
            console.error(err)
            responseBody = {
                error: true,
                errorMessage: err.message
            }
            res.cookie('token', getToken())
            res.status(200).json(responseBody)
        })
    } else {
        responseBody = {
            error: true,
            errorMessage: 'Invalid username or password',
            message: 'Invalid username or password'
        }
        res.cookie('token', getToken())
        res.status(200).json(responseBody)
    }
})

uiRoutes.get('/logout', function(req, res) {
    res.cookie('token', null)
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    let fileStream = createReadStream('./public/login.html')
    fileStream.on('data', function(data) {
        res.write(data)
    })
    fileStream.on('end', function() {
        res.end()
        return
    })
})

uiRoutes.get('*', function(req, res) {
    if (req.auth.isAuthenticated && req.auth.userId) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream('./index.html')
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream('./public/login.html')
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    }
})

export { uiRoutes }