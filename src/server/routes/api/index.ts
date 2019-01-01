/**
 * routes.api.index.ts
 * Provide a single route for all api routes and parse appropriate middleware
*/

// Node Modules


// NPM Modules
import { Router } from 'express'
import { sign } from 'jsonwebtoken'

// Local Modules
import { endpointAuthentication, apiTokenValidation } from '../middleware/authentication';
import { orderRoutes } from './ordering';
import { adminRoutes } from './admin'
import { apiAccountRoutes } from './accounts'
import { Login } from './../../lib/users/login'
import { StatusMessage, Response } from '../../types/server';
import { jwtSecret } from '../../lib/connection';
import { Request } from 'express-serve-static-core';

// Constants and global variables
const apiRoutes = Router()

apiRoutes.get('/getToken', function(req, res) {
    if (req.query.username && req.query.password) {
        new Login({username: req.query.username, password: req.query.password}).authenticate()
        .then((onSuccessfulAuthentication: StatusMessage) => {
            let payload = {
                userIsAuthenticated: true,
                userId: onSuccessfulAuthentication.details.userId,
                userRole: onSuccessfulAuthentication.details.userRole
                }
            sign(payload, jwtSecret, {expiresIn: '1h'}, function(err: Error, token: string) {
                if (err) throw err
                res.status(200).json({
                    token,
                    error: false,
                    message: 'Success'
                })
            })
        }, (onUnSuccessfulAuthentication: StatusMessage) => {
            res.status(200).json({
                error: true,
                message: onUnSuccessfulAuthentication.message
            })
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({
                error: true,
                message: err
            })
        })
    }
})

apiRoutes.use(apiTokenValidation())
apiRoutes.use(endpointAuthentication())
apiRoutes.use('/admin', adminRoutes)
apiRoutes.use('/ordering', orderRoutes)
apiRoutes.use('/accounts', apiAccountRoutes)
apiRoutes.get('/refresh', (req: Request, res: Response) => {
    if (req.auth.isAuthenticated) {
        let payload = {
            userIsAuthenticated: true,
            userId: req.auth.userId,
            userRole: req.auth.userRole
            }
        sign(payload, jwtSecret, {expiresIn: '10m'}, function(err: Error, token: string) {
            if (err) res.status(500)
            res.status(200).json({
                token,
                error: false,
                message: 'Success'
            })
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'User is not authenticated'
        })
    }
})
export { apiRoutes }