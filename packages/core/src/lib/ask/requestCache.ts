import { Request } from 'express'
import { generateKeyHash } from '@lib/utils'
import { jwtKeys } from '../../routes/middleware/authentication'
import { simpleQuery } from '@lib/queries'
import { writeFile } from 'fs'
import { resourceDir } from '@config'
import { resolve } from 'path'

export default function(reqContext: Request) {
  const returnSessionKey = generateKeyHash(16)
  // Store the route info so that it can be called later
  // We may need to store information, but this should be a good
  // starting place.

  const storedInfo = {
    params: reqContext.params,
    query: reqContext.query,
    auth: reqContext.auth
  }

  const inputInfo = {
    return_token: returnSessionKey,
    user_id: reqContext.auth[jwtKeys.user],
    request_url: reqContext.url,
    request_time: new Date().getTime(),
    request_context: storedInfo
  }

  simpleQuery('INSERT INTO sys_pending_request SET ?', [inputInfo])
    .then(() => {
      console.log('[REQUEST_PEND] Created request %s', returnSessionKey)
    })
    .catch((err) => {
      console.error(err)
      writeFile(
        resolve(resourceDir, 'ask', returnSessionKey + '.json'),
        JSON.stringify({
          return_token: returnSessionKey,
          user_id: reqContext.auth[jwtKeys.user],
          request_time: new Date().getTime(),
          request_context: inputInfo
        }),
        { encoding: 'utf8' },
        (err) => {
          // If writing the file fails then we have another issue
          console.error(err)
        }
      )
    })

  return returnSessionKey
}
