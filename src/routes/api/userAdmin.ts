/**
 * src/server/routes/api/userAdmin.ts
 * Provide routes for user administration
 * so that permissions to the sys_user
 * API route don't have to be directly
 * granted to user administrators.
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules

// Constants and global variables
const uAdminRouter = Router()

uAdminRouter.get('/users', (req: Request, res: Response) => {
  res.status(200).send('Fuck you')
})
