/**
 * lib/ql/index.ts
 * Provide the single export for the API
 */

// Node Modules

// NPM Modules
import { Request, Response } from 'express'

// Local Modules
import APICall from './API'

// Constants and global variables

export default function API() {
  return (req: Request, res: Response) => {
    switch (req.method) {
      case 'PATCH': {
        new APICall({ req, res }).update()
        break
      }
      case 'GET': {
        new APICall({ req, res }).query()
        break
      }
      case 'POST': {
        new APICall({ req, res }).create()
        break
      }
      case 'DELETE': {
        new APICall({ req, res }).delete()
      }
      default: {
        res.status(501).send()
      }
    }
  }
}
