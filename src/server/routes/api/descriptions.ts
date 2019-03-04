/**
 * src/routes/api/descriptions.ts
 * Provide a description of what fields are located
 * on the requested table.
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import Description from './../../lib/ql/schema/descriptions'

// Constants and global variables
const descriptions = Router()

descriptions.get('/:table', (req: Request, res: Response) => {
  new Description({ req, res }, req.params.table)
    .verifyAndReturnFields()
    .then((fields) => {
      res.status(200).json(fields)
    })
    .catch((err) => {
      console.error(err)
    })
})

export default descriptions
