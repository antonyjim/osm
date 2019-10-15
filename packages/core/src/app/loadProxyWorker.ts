;`
Load a proxy for forwarding requests to another process.
This will be used when package.OSM.client == 'proxy' or
when package.OSM.entry.proxy && package.OSM.entry.spawn
is specified.

This module allows modules to be written in languages other
than javascript. For a python example, see the 'domain' package.
`

import { createServer, Server } from 'http'
import { spawn, ChildProcess, SpawnOptions } from 'child_process'
import { resolve } from 'path'
import { EventEmitter } from 'events'

// Use the npm module proxy for setting up the proxy
import * as setup from 'proxy'

// For logging
import { debug } from '@lib/log'
import { Stream } from 'stream'

const logger = debug('app:startup')
const proxyEvents: EventEmitter = new EventEmitter()
let proxyServer: ChildProcess
let waiting: Boolean = true // Waiting for instructions from parent
let listening: Boolean = false // Whether server is listening

export interface ISpawnNegotiation {
  packageName: string
  command: string
  port: [number, number]
  action: 'close' | 'open' | 'retry'
}

/**
 * Redirects child process stdio to package if
 * @param packageName Name of package to check for debug info
 */
export function stdioRedirect(
  packageName
): Array<
  'pipe' | 'ipc' | 'ignore' | 'inherit' | Stream | number | null | undefined
> {
  const debugArg = process.env.DEBUG
  let searchDebug: string
  if (debugArg) {
    searchDebug = debugArg.split(',').find((arg) => {
      if (arg === 'app:' + packageName || arg === '*' || arg === 'app:*') {
        return true
      } else {
        return false
      }
    })
  } else {
    searchDebug = null
  }
  if (searchDebug) {
    return ['pipe', process.stdout, process.stderr]
  } else {
    return ['ignore', 'ignore', 'ignore']
  }
}

/**
 *
 * @param packageName Name of package being started
 * @param command Spawn arguments provided from package.json
 * @param listenPort Port for proxy to listen on
 * @param port Port to assign to environment variables
 */
function setupProxy(
  packageName: string,
  command: string,
  listenPort: number,
  port: number
): ChildProcess {
  // Spawn a process for the package
  const workerProcess: ChildProcess = spawn(command, {
    cwd: resolve(__dirname, '..', '..', packageName),
    env: {
      ...process.env,
      ['OSM_PROXY_LISTEN_' + packageName.toUpperCase()]: port.toString()
    },
    stdio: stdioRedirect(packageName)
  })

  const proxy: Server = setup(createServer())

  // Listen for an error when creating the proxy. The most
  // likely error to encounter is EADDRINUSE, so we will listen
  // for that error in particular.
  proxy.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      process.send(err.code)
      // true to indicate we have sent a message to
      // parent process to send new port
      proxyEvents.emit('error', err, true)
    } else {
      proxyEvents.emit('error', err, false)
    }
  })

  proxyEvents.on('retry', (tryAgainPort: number) => {
    proxy.listen(tryAgainPort, () => {
      waiting = false
      listening = proxy.listening
      logger('Proxy for package %s listening on port %d', packageName, port)
      process.send('message', proxy)
    })
  })

  proxy.listen(listenPort, () => {
    waiting = false
    listening = true
    logger('Proxy for package %s listening on port %d', packageName, port)
  })

  return workerProcess
}

function handleTick() {
  if (waiting || !listening) {
    process.nextTick(handleTick)
  }
}

// Check if we are being run from a forked process
if (require.main === module) {
  // Listen for messages from parent process with spawn args
  process.on('message', (message: ISpawnNegotiation) => {
    switch (message.action) {
      case 'close': {
        proxyServer.kill('SIGINT')
      }
      case 'open': {
        proxyServer = setupProxy(
          message.packageName,
          message.command,
          message.port[0],
          message.port[1]
        )

        proxyEvents.on('error', (err, handled) => {
          if (handled) {
          }
        })
      }

      case 'retry': {
        proxyEvents.emit('retry')
      }
    }
  })

  handleTick()
}
