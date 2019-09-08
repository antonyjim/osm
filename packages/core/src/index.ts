/**
 * Start the web server.
 *
 * First, we need to verify the database connection.
 *
 * If we cannot establish a connection, we start the
 * fallback http listener from ./app
 */

// std
import { readFile, existsSync } from 'fs'
import { resolve } from 'path'
// Set up aliases
require('module-alias/register')
;(function startApplication() {
  // Since I'm too cheap for dotenv, I wrote my own parser
  // Of course, it's not nearly as full featured and should
  // really be replaced with dotenv
  const NODE_ENV: string = process.env.NODE_ENV || 'development'
  const potentialFiles: string[] = [
    NODE_ENV.toLowerCase() + '.env',
    'dot.env',
    '.env'
  ]

  let envFile: string

  potentialFiles.forEach((file: string) => {
    if (existsSync(resolve(__dirname, '..', file))) {
      envFile = file
      return
    }
  })

  // Load environment variables

  readFile(
    resolve(__dirname, '..', envFile),
    { encoding: 'utf8' },
    (dotEnvReadErr: Error, data: string) => {
      if (dotEnvReadErr) {
        console.error(dotEnvReadErr)
        console.error(
          '[STARTUP] dot.env not found in cwd. Defaulting to environment variables.'
        )
        require('./lib/connection')
          .testConnection()
          .then((status) => {
            if (status) {
              // Start the web server
              console.log(
                '[STARTUP] Successfully established database connection. Starting http listener'
              )
              require('./app').routes()
            } else {
              console.log(
                '[STARTUP] Failed to establish database connection. Defaulting to fallback http listener'
              )
              require('./app').internalError()
            }
          })
          .catch((err) => {
            console.error(err)
            console.log(
              '[STARTUP] Failed to establish database connection with error %s. Defaulting to fallback http listener',
              err
            )
            require('./app').internalError()
          })
      } // end if
      const lines: string[] | number[] = data.split('\n')
      lines.map((line: string) => {
        const key: string = line.split('=')[0]
        const value: string = line.split('=')[1]
        if (value && value[0] === "'") {
          process.env[key] = value.slice(1, -1)
        } else {
          process.env[key] = value
        }
      })
      require('./lib/connection')
        .testConnection()
        .then((status) => {
          if (status) {
            // Start the web server
            console.log(
              '[STARTUP] Successfully established database connection. Starting http listener'
            )
            require('./app').routes()
          } else {
            console.log(
              '[STARTUP] Failed to establish database connection. Defaulting to fallback http listener'
            )
            require('./app').internalError()
          }
        })
        .catch((dbConnectionErr) => {
          console.error(dbConnectionErr)
          console.log(
            '[STARTUP] Failed to establish database connection with error %s. Defaulting to fallback http listener',
            dbConnectionErr
          )
          require('./app').internalError()
        })
    }
  )
})()
