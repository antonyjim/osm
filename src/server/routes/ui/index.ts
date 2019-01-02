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
import { verify } from 'jsonwebtoken';
import { jwtSecret } from '../../lib/connection';


// Constants and global variables
const uiRoutes = Router()

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
        verify(req.query.token, jwtSecret, (err, decoded) => {
            if (err) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                let fileStream = createReadStream('./static/tokenError.html')
                fileStream.on('data', function(data) {
                    res.write(data)
                })
                fileStream.on('end', function() {
                    res.end()
                    return
                })
            } else if (decoded.userId) {
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                let fileStream = createReadStream('./static/setpass.html')
                fileStream.on('data', function(data) {
                    res.write(data)
                })
                fileStream.on('end', function() {
                    res.end()
                    return
                })
            } else {
                res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
                let fileStream = createReadStream('./static/tokenError.html')
                fileStream.on('data', function(data) {
                    res.write(data)
                })
                fileStream.on('end', function() {
                    res.end()
                    return
                })
            }
        })
    }
})

uiRoutes.post('/setPassword', (function(req: Request, res: Response) {
    if(!req.body.token) {
        res.status(200).json({
            error: true,
            message: 'No token provided. Please click on forgot password'
        })
    } else {
        verify(req.body.token, jwtSecret, (err: Error, decoded) => {
            if (err || !decoded.userId) {
                console.error(err)
                console.log(JSON.stringify(decoded))
                res.status(200).json({
                    error: true,
                    message: 'Token expired or invalid. Please click on forgot password'
                })
            } else {
                new User({userId: decoded.userId})
                .setPassword(req.body.password1, req.body.password2)
                .then(onPasswordSet => {
                    res.status(200).json(onPasswordSet)
                }, onPasswordNotSet => {
                    res.status(200).json(onPasswordNotSet)
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).send()
                })

            }
        })
    }
}))

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