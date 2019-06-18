/**
 * q.ts
 * Prove routes for the api table query
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import API from '../../lib/api/index'

// Constants and global variables
const q = Router()

q.get('/:table', API())
q.get('/:table/:id', API())
q.post('/:table', API())
q.patch('/:table/:id', API())
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
