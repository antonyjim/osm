/**
 * {{componentTitle}}/server/router.ts
 */

import { Router, Request, Response } from 'express'

const customComponentRoutes = Router()

customComponentRoutes.get('/', (req: Request, res: Response) => {
  res.send('Hello world!')
})

// This HAS to be a default export,
// or else the main app will not
// require your expres module
export default customComponentRoutes
