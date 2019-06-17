/**
 * src/routes/api/descriptions.ts
 * Provide a description of what fields are located
 * on the requested table.
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import Description from '../../lib/model/descriptions'
import Towel from '../../lib/queries/towel/towel'
import getForm from '../../lib/model/forms/constructForms'

// Constants and global variables
const descriptions = Router()

descriptions.get('/form/:table', (req: Request, res: Response) => {
  const form = getForm(req.params.table)
  if (form) {
    res.status(200).json({
      error: false,
      message: 'Retrieved form',
      data: form
    })
  } else res.status(404).send()
})

descriptions.get('/:table', (req: Request, res: Response) => {
  new Description({ req, res }, req.params.table)
    .verifyAndReturnFields()
    .then((fields) => {
      res.status(200).json(fields)
    })
    .catch((err) => {
      res.status(500).send()
      console.error(err)
    })
})

export default descriptions
