/**
 * routes/ui/verification
 * Provide router for verification of new accounts and password resets
*/

// Node Modules
import { createReadStream } from 'fs';
import { resolve } from 'path';

// NPM Modules
import { Router, Request, Response } from 'express'
import User from '../../lib/ql/users/users';

// Local Modules


// Constants and global variables
const verifyRoutes: Router = Router()

verifyRoutes.get('/token', function(req: Request, res: Response) {
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

verifyRoutes.post('/', function(req: Request, res: Response) {
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

export default verifyRoutes