;`
Load each module that has a mountPoint key in its package.json.
`
import { readdirSync, existsSync } from 'fs'
import { ChildProcess, spawn, exec } from 'child_process'
import { resolve } from 'path'

import { Router, Request, Response } from 'express'
import * as createProxy from 'http-proxy'

import { range } from '@lib/utils'
import { debug } from '@lib/log'
import { IDictionary } from '@osm/server'
import { IOSMPackageOpt } from '@osm/OSM_Package'
import { stdioRedirect } from '@app/loadProxyWorker'
import { app } from '@app/app'

const logger = debug('app:startup')
const proxyPortPool: number[] = range(12000, 24000)
const proxy = createProxy.createProxyServer()
export let workers = []

proxy.on('error', (err) => {
  logger(err)
})

function spawnChild(
  spawnArgs: string[],
  packageDir: string,
  packageName: string,
  port: string
) {
  const workerProcess: ChildProcess = spawn(spawnArgs[0], spawnArgs.slice(1), {
    cwd: packageDir,
    env: {
      ...process.env,
      ['OSM_PROXY_LISTEN_' + packageName.toUpperCase()]: port
    },
    stdio: 'pipe'
  })

  logger(
    'Worker process listening on port %s and pid %d',
    port,
    workerProcess.pid
  )

  workerProcess.on('error', (err) => {
    console.error(err)
  })

  workerProcess.on('exit', (err) => {
    console.error(err)
    workers = workers.filter((w: [string, ChildProcess]) => {
      if (w[1].pid === workerProcess.pid) {
        return false
      } else {
        return true
      }
    })
    workers.push([port, spawnChild(spawnArgs, packageDir, packageName, port)])
  })

  workers.push([port, workerProcess])
  return workerProcess
}

function loadSimpleProxy(
  packageName: string,
  port: string,
  packageDetails: IOSMPackageOpt
) {
  const packageDir = resolve(__dirname, '..', '..', '..', packageName)
  const spawnArgs = packageDetails.entry.spawn.split(' ')
  process.chdir(packageDir)
  // Spawn a process for the package
  try {
    const workerProcess: ChildProcess = spawnChild(
      spawnArgs,
      packageDir,
      packageName,
      port
    )
    return [port, workerProcess]
  } catch (err) {
    console.error(err)
    return err
  }
}

export default function loadPackages(
  router: Router,
  apiRouter: Router
): [Router, Router] {
  const packageDir: string = resolve(__dirname, '..', '..', '..')
  const packages: string[] = readdirSync(packageDir) // Read the packages/ directory

  packages.forEach((packageName: string) => {
    if (
      packageName === 'core' ||
      packageName === 'client' ||
      packageName === 'install'
    ) {
      return
    }
    if (existsSync(resolve(packageDir, packageName, 'package.json'))) {
      const packagePackageJson = require(resolve(
        packageDir,
        packageName,
        'package.json'
      ))
      const osmDetails: IOSMPackageOpt = packagePackageJson.OSM
      // For javascript apps, forward all requests to the client entry
      if (
        osmDetails.basePath &&
        osmDetails.client === 'standalone' &&
        osmDetails.entry.client
      ) {
        router.use(
          osmDetails.basePath,
          require(resolve(packageDir, packageName, osmDetails.entry.client))
        )
      }

      if (osmDetails.baseApiPath && osmDetails.entry.lib) {
        router.use(
          osmDetails.baseApiPath.replace(/^\/api/, ''),
          require(resolve(packageDir, packageName, osmDetails.entry.lib))
        )
      }

      // If we have a baseApiPath and proxy and we are using the core
      // client, then we can simply proxy only api requests
      if (
        osmDetails.baseApiPath &&
        osmDetails.entry.proxy &&
        osmDetails.client === 'core' &&
        osmDetails.entry.proxy.toLowerCase() === 'env'
      ) {
        const proxyDetails = loadSimpleProxy(
          packagePackageJson.name,
          proxyPortPool.shift().toString(),
          osmDetails
        )

        const forwardPort: string = proxyDetails[0].toString()
        apiRouter.use(
          osmDetails.baseApiPath.replace(/^\/api/, ''),
          (req: Request, res: Response) => {
            proxy.web(
              req,
              res,
              {
                target: 'http://127.0.0.1:' + forwardPort
              },
              (err) => {
                if (err) {
                  logger(err)
                }
              }
            )
          }
        )
      } else if (
        osmDetails.basePath &&
        osmDetails.entry.proxy &&
        osmDetails.entry.proxy.toLowerCase() === 'env'
      ) {
        const proxyDetails = loadSimpleProxy(
          packagePackageJson.name,
          proxyPortPool.shift().toString(),
          osmDetails
        )

        const forwardPort = proxyDetails[0]
        router.use(osmDetails.basePath, (req: Request, res: Response) => {
          proxy.web(req, res, { target: '127.0.0.1:' + forwardPort })
        })
      }
    }
  })

  return [router, apiRouter]
}
