/**
 * src/routes/api/descriptions.ts
 * Provide a description of what fields are located
 * on the requested table.
 */

// Node Modules

// NPM Modules
import { Router, Request, Response } from 'express'

// Local Modules
import Description from '../../app/model/descriptions'
import Towel from '../../lib/queries/towel/towel'
import getForm from '../../app/model/constructForms'
import { jwtKeys } from '../middleware/authentication'

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
  } else {
    res.status(404).send({
      errors: {
        message: 'No data found for form ' + req.params.table
      }
    })
  }
})

/**
 * @route /api/q/describe/:table
 * @method GET
 * @description Returns a description of a table including user permissions.
 */
descriptions.get('/:table', (req: Request, res: Response) => {
  // Create a new description object with the currently logged
  // in user in order to retrieve the correct field data.
  const tableDescription = new Description(
    req.auth[jwtKeys.user],
    req.auth[jwtKeys.scope],
    req.params.table
  )

  tableDescription
    .verifyAndReturnFields()
    .then(tableDescription.getUserPermissions)
    .then((fields) => {
      res.status(200).json(fields)
    })
    .catch((err) => {
      res.status(500).send()
      console.error(err)
    })
})

export default descriptions
