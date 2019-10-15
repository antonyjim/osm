/**
 * hostInfo.ts
 * Exports a function to grab information about the current
 * for the page located at /admin/debug
 */

// Node Modules
import { cpus, freemem, totalmem, hostname, platform, arch } from 'os'

// NPM Modules

// Local Modules
import { IServerStats } from '../../../types/server'
import { simpleQuery } from '../../../lib/queries'
import { version, domain } from '../../../config'

export async function getServerStats(): Promise<IServerStats> {
  const cpuCount = cpus().length
  const architecture = arch()
  const processMem = process.memoryUsage()
  const openMem = freemem()
  const totMem = totalmem()
  const host = hostname()
  const OS = platform()
  const appVersion = version

  return await {
    os: {
      cpuCount,
      architecture,
      openMem,
      totMem,
      host,
      OS,
      processMem
    },
    db: {
      poolLimit: parseInt(process.env.DB_POOL_LIMIT, 10) || 1,
      dbName: process.env.DB_DB || 'thq',
      NODE_ENV: process.env.NODE_ENV || 'development',
      version: await simpleQuery('SELECT VERSION() AS VERSION')
    },
    app: {
      version: appVersion,
      domain
    }
  }
}
