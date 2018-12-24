/**
 * routes.api.nonsigs.ts
 * Handle administration of nonsig data
*/

// Node Modules


// NPM Modules
import { Router } from 'express'

// Local Modules
import { Nonsig } from '../../lib/users/maintenance';
import { StatusMessage } from './../../types/server'


// Constants and global variables
const nonsigRoutes = Router()

nonsigRoutes.post('/add', function(req, res) {
    if (req.body) {
        new Nonsig(req.body).create()
        .then((onSuccess: StatusMessage) => {
            res.status(200).json(onSuccess)
        }, (onFailure: StatusMessage) => {
            res.status(200).json(onFailure)
        })
        .catch((error: StatusMessage) => {
            res.status(500).json(error)
        })
    } else {
        res.status(200).json({
            error: true,
            message: 'No user provided'
        })
    }
})

export { nonsigRoutes }