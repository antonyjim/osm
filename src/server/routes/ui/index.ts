/**
 * routes.ui.index.ts
 * Provide a route for all UI routes
*/

// Node Modules
import { createReadStream } from 'fs';

// NPM Modules
import { Router } from 'express'

// Local Modules
import { uiAccountRoutes } from './accounts'
import { homeRoutes } from './home'

// Constants and global variables
const uiRoutes = Router()

uiRoutes.use('/account', uiAccountRoutes)
uiRoutes.get('*', function(req, res) {
    console.log(JSON.stringify(req.auth))
    if (req.auth.isAuthenticated) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream('./index.html')
        fileStream.on('data', function(data) {
            res.write(data)
        })
        fileStream.on('end', function() {
            res.end()
            return
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'})
        let fileStream = createReadStream('./public/login.html')
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