/**
 * Start the web server
 */

import { readFile } from 'fs'
import { resolve } from 'path'

async function testDBConn(): Promise<boolean> {
  return new Promise((resolveDbConnection) => {
    try {
      require('./lib/connection')
        .getPool()
        .getConnection((err, conn) => {
          if (err) {
            console.error(err)
            return resolveDbConnection(false)
          } else {
            conn.release()
            return resolveDbConnection(true)
          }
        })
    } catch (err) {
      return resolveDbConnection(false)
    }
  })
}

// Load environment variables
readFile(
  resolve(__dirname, '../dot.env'),
  { encoding: 'utf8' },
  (dotEnvReadErr: Error, data: string) => {
    if (dotEnvReadErr) {
      console.error(dotEnvReadErr)
      console.error(
        '[STARTUP] dot.env not found in cwd. Defaulting to environment variables.'
      )
      testDBConn()
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
        // console.log(
        //   '[STARTUP] Setting environment variable %s to value %s',
        //   key,
        //   value
        // )
        process.env[key] = value.slice(1, -1)
      } else {
        process.env[key] = value
      }
    })
    testDBConn()
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
