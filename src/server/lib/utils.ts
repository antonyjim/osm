/**
 * utils.ts
 * Provide a list of utilities to improve the server
 */

// Node Modules
import { cpus, arch, freemem, hostname, platform, totalmem } from 'os'
import { Querynator } from './connection'

// NPM Modules

// Local Modules

// Constants and global variables

export function LoginException(message: string, details?: Error) {
  this.message = message
  this.details = details
  this.error = true
}

export async function getServerStatus() {
  const cpuCount = cpus().length
  const architecture = arch()
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
      OS
    },
    db: {
      poolLimit: process.env.DB_POOL_LIMIT || '1',
      dbName: process.env.DB_DB || 'thq',
      NODE_ENV: process.env.NODE_ENV || 'development',
      version: await new Querynator().createQ(
        { query: 'SELECT VERSION() AS VERSION' },
        'CALL'
      )
    }
  }
}
