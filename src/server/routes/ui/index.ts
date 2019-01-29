/**
 * routes.ui.index.ts
 * Provide a route for all UI routes
*/

// Node Modules
import { createReadStream } from 'fs';
import { resolve } from 'path';

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import { tokenValidation } from './../middleware/authentication'
import bodyParser = require('body-parser');
import { ResponseMessage, StatusMessage } from '../../types/server';
import { Log } from '../../lib/log';
import { Login, getToken } from '../../lib/users/login';
import User, { forgotPassword } from '../../lib/ql/users/users';
import { UserTypes } from '../../types/users';


// Constants and global variables
const uiRoutes = Router()

// Body parser must be included in api and ui separately due to GraphQL request errors
uiRoutes.use(bodyParser.json())
uiRoutes.use(tokenValidation())

uiRoutes.post('/uiRoutes', function(req: Request, res: Response) {
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
            res.cookie('token', token)
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
            new Log(err).error(2)
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
    let fileStream = createReadStream(resolve(__dirname, '../../../static/login.html'))
    fileStream.on('data', function(data) {
        res.write(data)
    })
    fileStream.on('end', function() {
        res.end()
        return
    })
})

/**
 * Send forgot password emails to users
 */
uiRoutes.post('/forgot', function(req: Request, res: Response) {
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

uiRoutes.get('/verifyToken', function(req: Request, res: Response) {
    if (!req.query.token) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream(resolve(__dirname, '../../../static/tokenError.html'))
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream(resolve(__dirname, '../../../static/setpass.html'))
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    }
})

uiRoutes.post('/verify', function(req: Request, res: Response) {
    if (req.body.token && req.body.password1 && req.body.password2) {
        new User().confirmAccount(req.body.token, req.body.password1, req.body.password2)
        .then((onConfirmed) => {
            res.status(200).json(onConfirmed)
        })
        .catch(err => {
            res.status(200).json({
                error: true,
                message: err.message
            })
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'Missing required fields.'
        })
    }
})

uiRoutes.post('/login', function(req: Request, res: Response) {
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
            res.cookie('token', token)
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
            new Log(err).error(2)
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

uiRoutes.post('/newUser', function(req, res) {
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

uiRoutes.get('*', function(req, res) {
    if (req.auth.isAuthenticated && req.auth.userId) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream(resolve(__dirname, '../../../static/index.html'))
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream(resolve(__dirname, '../../../static/login.html'))
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
