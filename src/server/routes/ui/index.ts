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
import { User } from '../../lib/users/maintenance';
import bodyParser = require('body-parser');


// Constants and global variables
const uiRoutes = Router()

// Body parser must be included in api and ui separately due to GraphQL request errors
uiRoutes.use(bodyParser.json())
uiRoutes.use(tokenValidation())

uiRoutes.get('/verifyToken', function(req: Request, res: Response) {
    if (!req.query.token) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream('./static/tokenError.html')
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream('./static/setpass.html')
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
        new User({userConfirmation: req.body.token})
        .confirmAccount(req.body.password1, req.body.password2)
        .then((onConfirmed) => {
            res.status(200).json(onConfirmed)
        }, (onNotConfirmed) => {
            res.status(200).json(onNotConfirmed)
        })
        .catch(err => {
            res.status(200).json({
                error: true,
                message: 'Unexpected error occurred. Please try again later.'
            })
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'Missing required fields.'
        })
    }
})

uiRoutes.post('/forgot', function(req: Request, res: Response) {
    /**
     * create table userLogging (
     *      userId CHAR(36),
     *      logAction VARCHAR(50), -- Password changed, password request initiated, user account created, user nonsig changed
     *      logTimeStamp INT(10) -- Epoch timestamp
     * )
     */
    if (!req.body.email) {
        res.status(200).json({
            error: true,
            message: 'No email provided'
        })
    } else {
        new User({userEmail: req.body.email}).forgotPassword()
        res.status(200).json({
            error: false,
            message: 'Instructions have been sent to ' + req.body.email
        })
    }
})

/*
uiRoutes.post('/newUser', function(req: Request, res: Response) {
    if (req.body) {
        if (req.body.userNonsig) {
            req.body.userDefaultNonsig = req.body.userNonsig
        }
        console.log(JSON.stringify(req.body))
        new User(req.body).createNew()
        .then((onUserCreated) => {
            res.status(200).json({
                error: onUserCreated.error,
                message: onUserCreated.message,
                details: onUserCreated.details
            })
        }, (onUserNotCreated) => {
            res.status(200).json(onUserNotCreated)
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({
                error: true,
                message: 'Unexpected error occurred'
            })
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'No user provided',
            token: req.auth.token
        })
    }
})
*/

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
    let fileStream = createReadStream('./static/login.html')
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
        let fileStream = createReadStream('./static/index.html')
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream('./static/login.html')
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