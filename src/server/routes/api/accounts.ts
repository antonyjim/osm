/**
 * routes.api.accounts.ts
 * Create and edit user accounts
*/

// Node Modules


// NPM Modules
import { Router } from 'express'
import { Validation } from '../../lib/validation';
import { User, Nonsig } from '../../lib/users/maintenance';
import { StatusMessage } from '../../types/server';

// Local Modules


// Constants and global variables
const apiAccountRoutes = Router()

apiAccountRoutes.post('/newUser', function(req, res) {
    if (req.body) {
        let newUser = new User(req.body).createNew()
        res.status(200).json(newUser)
    } else {
        res.status(200).json({
            error: true,
            message: 'No user provided'
        })
    }
})

export { apiAccountRoutes }