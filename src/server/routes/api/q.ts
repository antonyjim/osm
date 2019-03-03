/**
 * q.ts
 * Prove routes for the api table query
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import API from '../../lib/ql/schema'
import Description from '../../lib/ql/schema/descriptions'

// Constants and global variables
const q = Router()

q.get('/describe/:table', (req: Request, res: Response) => {
  new Description({ req, res }, req.params.table)
    .verifyAndReturnFields()
    .then((fields) => {
      res.status(200).json(fields)
    })
    .catch((err) => {
      console.error(err)
    })
})
q.get('/:table', API())
q.get('/:table/:id', API())
q.post('/:table', API())
q.put('/:table/:id', API())
q.delete('/:table/:id', API())
q.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    errors: [
      {
        message: 'No data associated with location ' + req.originalUrl
      }
    ],
    data: null
  })
})

export { q }
