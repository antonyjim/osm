/**
 * routes.ui.index.ts
 * Provide a route for all UI routes
*/

// Node Modules
import { createReadStream } from 'fs';
import { resolve } from 'path';

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import { tokenValidation } from './../middleware/authentication'
import bodyParser = require('body-parser');
import loginRoutes from './login'
import verifyRoutes from './verification';

// Constants and global variables
const uiRoutes = Router()

// Body parser must be included in api and ui separately due to GraphQL request errors
uiRoutes.use(bodyParser.json())
uiRoutes.use(tokenValidation())
uiRoutes.use('/login', loginRoutes)
uiRoutes.use('/verify', verifyRoutes)

uiRoutes.get('/logout', function(req, res) {
    res.cookie('token', null)
    res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
    let fileStream = createReadStream(resolve(__dirname, '../../../static/login.html'))
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
        let fileStream = createReadStream(resolve(__dirname, '../../../static/index.html'))
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream(resolve(__dirname, '../../../static/login.html'))
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
