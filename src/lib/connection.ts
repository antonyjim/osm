/**
 * connection.ts
 * Provide the sql connection string
 */

// Node Modules
import { resolve } from 'path'

// NPM Modules
import { Pool, PoolConfig, createPool } from 'mysql'
import { IDictionary } from '../types/server'

// Local Modules

// Constants and global variables
const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'node',
  password: process.env.DB_PASS || 'development',
  database: process.env.DB_DB || 'thq',
  connectionLimit: parseInt(process.env.DB_POOL_LIMIT, 10) || 1
}

const jwtSecret = process.env.JWT_KEY || 'secret'
const HOOKS_DIR = resolve(__dirname, './hooks')

let pool: Pool
function getPool(): Pool {
  if (pool) {
    return pool
  }
  console.log(
    '[SQL_CONNECTION] Creating new connection with username %s and host %s',
    poolConfig.user,
    poolConfig.host
  )
  pool = createPool(poolConfig)
  return pool
}

/**
 * @description Performs a query with no authorization. To be used for system calls
 * @param query String with SQL
 * @param params Unescaped values to be injected
 */
async function simpleQuery(query: string, params?: any[]): Promise<any> {
  return new Promise((resolveQuery, rejectQuery) => {
    getPool().getConnection((err, conn) => {
      if (err) {
        if (conn) conn.release()
        return rejectQuery(err)
      }
      if (query.indexOf('FROM  LIMIT') > -1) {
        console.error(query)
        return rejectQuery('Blank query')
      }
      try {
        if (!params) {
          console.log('[SQL_SIMPLE] No params provided')
        }
        // console.log('[SQL_SIMPLE] %s', conn.format(query, params))
      } catch (e) {
        console.error('[SQL_SIMPLE] %s', e.message)
        console.error(e)
        return rejectQuery(e)
      }
      try {
        conn.release()
      } catch (e) {
        return rejectQuery()
      }
    })
    getPool().query(query, params, (err: Error, results: any[]) => {
      if (err) rejectQuery(err)
      return resolveQuery(results)
    })
  })
}

export { getPool, jwtSecret, simpleQuery, HOOKS_DIR }
