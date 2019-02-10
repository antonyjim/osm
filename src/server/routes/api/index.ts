/**
 * routes.api.index.ts
 * Provide a single route for all api routes and parse appropriate middleware
*/

// Node Modules


// NPM Modules
import { Router, Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

// Local Modules
import { endpointAuthentication, apiTokenValidation } from '../middleware/authentication';
import { adminRoutes } from './admin'
import { Login, getToken } from './../../lib/users/login'
import { StatusMessage } from '../../types/server';
import { jwtSecret } from '../../lib/connection';
import { q } from './q';
import bodyParser = require('body-parser');
import { UserTypes } from '../../types/users';
import useradminRoutes from './users';

// Constants and global variables
const apiRoutes = Router()

apiRoutes.get('/getToken', function(req: Request, res: Response){
    if (req.query.username && req.query.password) {
        Login({username: req.query.username, password: req.query.password})
        .then((onSuccessfulAuthentication: StatusMessage) => {
            let payload: UserTypes.AuthToken = {
                iA: true,
                u: onSuccessfulAuthentication.details.sys_id,
                r: onSuccessfulAuthentication.details.userRole,
                c: onSuccessfulAuthentication.details.userNonsig
                }
            let token = getToken(payload)
            res.status(200).json({
                token,
                error: false,
                message: 'Success'
            })
            /*
            sign(payload, jwtSecret, {expiresIn: '5h'}, function(err: Error, token: string) {
                if (err) throw err
                res.status(200).json({
                    token,
                    error: false,
                    message: 'Success'
                })
            })
            */
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
apiRoutes.use('/q', q) // q is for general api queries
apiRoutes.use(endpointAuthentication())
apiRoutes.use(bodyParser.json())
apiRoutes.use('/admin', adminRoutes) // admin is for site-administration duties
apiRoutes.use('/users', useradminRoutes) // users is for user administration
apiRoutes.get('/refresh', (req: Request, res: Response) => {
    if (req.auth.iA && req.auth.c) {
        let payload = {
            iA: true,
            u: req.auth.u,
            r: req.auth.r,
            c: req.auth.c
            }
        sign(payload, jwtSecret, {expiresIn: '5h'}, function(err: Error, token: string) {
            if (err) res.status(500).end()
            res.status(200).json({
                token,
                error: false,
                message: 'Success'
            })
        })
    } else {
        if (!res.headersSent) {
            res.status(401).json({
                error: true,
                message: 'User is not authenticated'
            })
        } else {
            return 0
        }
    }
})
export { apiRoutes }