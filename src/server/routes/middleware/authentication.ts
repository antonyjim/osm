/**
 * routes.middleware.authentication.ts
 * 
 * Handle validation of endpoints and token issuance
*/

// Node Modules


// NPM Modules
import { Request, Response, NextFunction } from 'express'
import { sign, verify } from 'jsonwebtoken'

// Local Modules
import { validateEndpoint } from './../../lib/navigation/navigation'
import { StatusMessage } from './../../types/server'
import { UserTypes } from '../../types/users';
import { jwtSecret } from '../../lib/connection';

// Constants and global variables

export function tokenValidation() {
    return function tokenValidation(req: Request, res: Response, next: NextFunction) {
        let anonToken: UserTypes.AuthToken = {
            userIsAuthenticated: false,
            userId: null,
            userRole: null
        }
        let authorizationHeader = req.get('Authorization')

        function handleOnAuthError(error: Error) {
            req.auth = {
                isAuthenticated: false,
                isAuthorized: false,
                userId: null
            }
            console.error(error)
            next()
        }
        if (!authorizationHeader) {
            sign(anonToken, jwtSecret, {expiresIn: '1h'}, function(err: Error, token: string) {
                if (err) {handleOnAuthError(err)}
                res.set('Authorization', token)
                next()
            })
        } else {
            verify(authorizationHeader, jwtSecret, function(err: Error, decoded: UserTypes.AuthToken) {
                if (err) {handleOnAuthError(err)}
                let authToken: UserTypes.AuthToken = {
                    userIsAuthenticated: true,
                    userId: decoded.userId,
                    userRole: decoded.userRole
                }
                sign(authToken, jwtSecret, function(err: Error, token: string) {
                    if (err) {handleOnAuthError(err)}
                    res.set('Authorization', token)
                    next()
                })
            })
        }
    }
}

export function endpointAuthentication() {
    return function endpointAuthentication(req: Request, res: Response, next: NextFunction) {
        if (!req.auth || !req.auth.isAuthenticated || !req.auth.userId) {
            req.auth.isAuthorized = false
        } else {
            validateEndpoint(req.method, req.path, req.auth.role)
            .then((onUserAuthorized: StatusMessage) => {
                req.auth.isAuthorized = onUserAuthorized.details.authorized
                next()
            }, (onUserUnAuthorized: StatusMessage) => {
                req.auth.isAuthorized = onUserUnAuthorized.details.authorized
                next()
            })
            .catch((error: StatusMessage) => {
                console.error(error)
                req.auth.isAuthorized = false
                next()
            })
        }
    }
}