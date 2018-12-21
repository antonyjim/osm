/**
 * routes.static.ts
 * Serve static files such as js, css
*/

// Node Modules
import { join } from 'path'


// NPM Modules
import * as express from 'express'

// Local Modules


// Constants and global variables
const staticRoutes = express.Router()

staticRoutes.use('/', express.static(join(__dirname, join('../../public'))))


export { staticRoutes }