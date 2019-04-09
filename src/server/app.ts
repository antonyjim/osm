/**
 * app.ts
 * Provide an entry point for the THQ application
 */

// Node Modules
import * as cluster from 'cluster'
import { cpus } from 'os'
import { createReadStream } from 'fs'
import { resolve } from 'path'

// NPM Modules
import * as express from 'express'

// Local Modules
import { router } from './routes/index'
import { Log } from './lib/log'
import { getPool } from './lib/connection'
import constructSchema from './lib/api/schema/constructSchema'
import { constructForms } from './lib/api/forms/constructForms'
import generateHooks from './lib/api/hooks/generateHooks'
import { syncDbSchema } from './lib/api/schema/dbSchemaGen'
import { staticRoutes } from './routes/static'

export function routes() {
  if (process.env.NODE_ENV === 'production') {
    const cores: number = cpus().length
    if (cluster.isMaster) {
      console.log('Started cluster, master process as ' + process.pid)
      let i: number = parseInt(process.env.CLUSTER_COUNT, 10) || cores
      while (i >= 0) {
        cluster.fork()
        i--
      }

      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker process ${worker.process.pid} crashed`)
      })
    } else {
      listen()
    }
  } else {
    listen()
  }

  function listen() {
    // Constants and global variables
    const app = express()
    const port = parseInt(process.env.SERVER_PORT, 10) || 8020
    // Routes
    app.disable('x-powered-by')
    app.use('/', router)
    process.on('SIGTERM', (e) => {
      getPool().end()
      new Log('Pool connections closed').info()
    })

    app.listen(port, () => {
      new Log(`Listening at port ${port} on process ${process.pid}`).info()

      syncDbSchema()

      constructSchema()
        .then((tables) => {
          console.log('Completed bulding schema')
          constructForms()
          generateHooks()
        })
        .catch((err) => {
          console.error(
            `[CONSTRUCT_SCHEMA] CRITICAL ERROR WHEN STARTING SERVER ${
              err.message
            }`
          )
          getPool().end()
        })
    })
  }
}

export function internalError() {
  const app = express()
  const port = parseInt(process.env.SERVER_PORT, 10) || 8020

  app.use('/public', staticRoutes)

  app.get('*', (req, res) => {
    try {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      createReadStream(resolve(__dirname, '../../static/error505.html')).pipe(
        res
      )
    } catch (err) {
      res.send('<html>Internal server error</html>')
    }
  })

  app.listen(port, () => {
    console.log('[APP] Listening for fallback on port %d', port)
  })
}
