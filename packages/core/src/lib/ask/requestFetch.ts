import * as express from 'express'
import { app } from '@app/app'
import { simpleQuery } from '@lib/connection'
import { Towel } from '@lib/towel'
import { jwtKeys } from 'routes/middleware/authentication'

// Fetch a request context from sys_pending_request
export default function(
  requestContext: express.Request,
  responseContext: express.Response,
  returnId: string
) {
  const towelQuery = new Towel('sys_pending_request')
  towelQuery.addCondition('return_token', returnId, '=')
  towelQuery.addCondition('user_id', requestContext.auth[jwtKeys.user], '=')
  simpleQuery(
    'SELECT user_id, request_url, request_context FROM sys_pending_request WHERE '
  )
  app._router.forEach((layer) => {})
}
