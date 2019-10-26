// This file will be used to load your component into the
// application as a whole. It is expected that there will
// be a single default export for the router object.

import { Router, Request, Response } from 'express'
// import { authorize } from '@core'
const buildL = '../../../build/Release/conversion'
const conversion = require(buildL)

// Initialize the router
const routes: Router = Router()

routes.get('/:opt', (req: Request, res: Response) => {
  if (!isNaN(parseInt(req.query.v)) && !isNaN(parseInt(req.params.opt))) {
    res.send(conversion.getConversion(parseInt(req.params.opt), req.query.v))
  } else if (!isNaN(parseInt(req.params.opt))) {
    res.send(conversion.getConversion(parseInt(req.params.opt)))
  } else {
    res.send(conversion.getConversion(11))
  }
})

routes.get('/menu', (req: Request, res: Response) => {
  res.send(conversion.showMenu())
})

export default routes
