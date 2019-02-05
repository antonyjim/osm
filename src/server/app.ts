/**
 * app.ts
 * Provide an entry point for the THQ application
*/

// Node Modules


// NPM Modules
import * as express from 'express'

// Local Modules
import { router } from './routes/index'
import { Log } from './lib/log';

export default function routes() {
    // Constants and global variables
    const app = express()
    const port = 8020
    // Routes
    app.disable('x-powered-by')
    app.use('/', router)

    app.listen(port, function() {
        new Log(`Listening at port ${port}`).info()
        console.log(`Listening on port ${port}`);
    })
}