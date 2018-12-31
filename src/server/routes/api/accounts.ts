/**
 * routes.api.accounts.ts
 * Create and edit user accounts
*/

// Node Modules


// NPM Modules
import { Router } from 'express'
import { User, Nonsig } from '../../lib/users/maintenance';
import { StatusMessage } from '../../types/server';

// Local Modules


// Constants and global variables
const apiAccountRoutes = Router()

apiAccountRoutes.post('/newUser', function(req, res) {
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
                details: onUserCreated.details,
                token: req.auth.token
            })
        }, (onUserNotCreated) => {
            res.status(200).json({
                error: onUserNotCreated.error,
                message: onUserNotCreated.message,
                details: onUserNotCreated.details,
                token: req.auth.token
            })
        })
        .catch(err => {
            console.error(err)
            res.status(500).json({
                error: true,
                message: 'Unexpected error occurred',
                token: req.auth.token
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

export { apiAccountRoutes }