;`
Load each module that has a mountPoint key in its package.json.
`
import { readdirSync, existsSync } from 'fs'
import { ChildProcess, spawn } from 'child_process'
import { resolve } from 'path'

import { Router, Request, Response } from 'express'
import * as createProxy from 'http-proxy'

import { range } from '@lib/utils'
import { IDictionary } from '@osm/server'
import { IOSMPackageOpt } from '@osm/OSM_Package'
import { stdioRedirect } from '@app/loadProxyWorker'

const proxyPortPool: number[] = range(12000, 24000)
const proxy = createProxy.createProxyServer()

function loadSimpleProxy(
  packageName: string,
  port: string,
  packageDetails: IOSMPackageOpt
) {
  // Spawn a process for the package
  const workerProcess: ChildProcess = spawn(packageDetails.entry.spawn, {
    cwd: resolve(__dirname, '..', '..', '..', packageName),
    env: {
      ...process.env,
      ['OSM_PROXY_LISTEN_' + packageName.toUpperCase()]: port
    },
    stdio: stdioRedirect(packageName)
  })

  return port
}

export default function loadPackages(router: Router, apiRouter: Router) {
  const packageDir: string = resolve(__dirname, '..', '..', '..')
  const packages: string[] = readdirSync(packageDir) // Read the packages/ directory

  packages.forEach((packageName: string) => {
    if (packageName === 'core' || packageName === 'client') {
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
        const forwardPort = loadSimpleProxy(
          packagePackageJson.name,
          proxyPortPool.shift().toString(),
          osmDetails
        )
        apiRouter.use(
          osmDetails.baseApiPath.replace(/^\/api/, ''),
          (req: Request, res: Response) => {
            proxy.web(req, res, { target: '127.0.0.1:' + forwardPort })
          }
        )
      } else if (
        osmDetails.basePath &&
        osmDetails.entry.proxy &&
        osmDetails.entry.proxy.toLowerCase() === 'env'
      ) {
        const forwardPort = loadSimpleProxy(
          packagePackageJson.name,
          proxyPortPool.shift().toString(),
          osmDetails
        )
        router.use(osmDetails.basePath, (req: Request, res: Response) => {
          proxy.web(req, res, { target: '127.0.0.1:' + forwardPort })
        })
      }
    }
  })
}
