/**
 * routes.api.index.ts
 * Provide a single route for all api routes and parse appropriate middleware
*/

// Node Modules


// NPM Modules
import { Router } from 'express'

// Local Modules
import { endpointAuthentication, tokenValidation } from '../middleware/authentication';
import { orderRoutes } from './ordering';
import { Login } from './../../lib/users/login'
import { StatusMessage } from '../../types/server';

// Constants and global variables
const apiRoutes = Router()

apiRoutes.use('/getToken', function(req, res) {
    if (req.query.username && req.query.password) {
        new Login({username: req.query.username, plaintextPassword: req.query.password}).authenticate()
        .then((onSuccessfulAuthentication: StatusMessage) => {
            
        })
    }
})

apiRoutes.use(tokenValidation())
apiRoutes.use(endpointAuthentication())
apiRoutes.use('/ordering', orderRoutes)

export { apiRoutes }