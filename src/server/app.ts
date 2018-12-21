/**
 * app.ts
 * Provide an entry point for the THQ application
*/

// Node Modules


// NPM Modules
import * as express from 'express'
import * as morgan from 'morgan'

// Local Modules
import { router } from './routes/index'

// Constants and global variables
const app = express()
const port = 8080

// Routes
app.use(morgan())
app.use('/', router)

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
})
