/**
 * utils.ts
 * Provide a list of utilities to improve the server
 */

// Node Modules
import { cpus, arch, freemem, hostname, platform, totalmem } from 'os'
import { simpleQuery } from './queries'
import { IServerStats } from '../../types/server'

// NPM Modules

// Local Modules

// Constants and global variables

export function LoginException(message: string, details?: Error) {
  this.message = message
  this.details = details
  this.error = true
}

export async function getServerStatus(): Promise<IServerStats> {
  const cpuCount = cpus().length
  const architecture = arch()
  const processMem = process.memoryUsage()
  const openMem = freemem()
  const totMem = totalmem()
  const host = hostname()
  const OS = platform()
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
    }
  }
}
