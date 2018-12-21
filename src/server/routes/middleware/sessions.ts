/**
 * sessions.ts
 * 
 * Handle all validation and renewal of sessions using passport
*/

// Node Modules


// NPM Modules
import { 
        Router, 
        Request, 
        Response, 
        NextFunction 
        } from 'express'

// Local Modules
import { authenticate } from 'passport'
import { Strategy } from 'passport-local'

// Constants and global variables
const uiMiddleware: Router = Router()

uiMiddleware.use((req: Request, res: Response, next: NextFunction) => {

})

export { uiMiddleware }