// This file will be used to load your component into the
// application as a whole. It is expected that there will
// be a single default export for the router object.

import { Router, Request, Response } from 'express'
// import { authorize } from '@core'
const conversion = require('../../../build/Release/conversion')

// Initialize the router
const routes: Router = Router()

routes.get('/:opt?', (req: Request, res: Response) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  if (!req.params.opt) {
    res.write(conversion.showMenu())
  } else if (
    !isNaN(parseFloat(req.query.v)) &&
    !isNaN(parseInt(req.params.opt))
  ) {
    res.write(
      conversion.getConversion(
        parseInt(req.params.opt),
        parseFloat(req.query.v)
      )
    )
  } else if (!isNaN(parseInt(req.params.opt))) {
    res.write(conversion.getConversion(parseInt(req.params.opt)))
  } else {
    res.write(conversion.getConversion(11))
  }

  res.end()
})

module.exports = routes
