/**
 * connection.ts
 * Provide the sql connection string
 */

// Node Modules
import { resolve } from 'path'
import { MysqlError } from 'mysql'

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
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  connectionLimit: parseInt(process.env.DB_POOL_LIMIT, 10) || 1
}

const jwtSecret = process.env.JWT_KEY || 'secret'
const HOOKS_DIR = resolve(__dirname, './hooks')

let pool: Pool
function getPool(refresh?: boolean): Pool {
  if (pool && !refresh) {
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
        if (conn) {
          try {
            conn.release()
          } catch (er) {
            // Attempt to reconnect
            // since this usually errors out due to
            // connection being closed
            pool = getPool(true)
            return rejectQuery(er)
          }
        }
        return rejectQuery(err)
      }
      if (query.indexOf('FROM  LIMIT') > -1) {
        console.error(query)
        return rejectQuery('Blank query')
      }
      try {
        if (!params) {
          console.log('[SQL_SIMPLE] No params provided for statement %s', query)
          params = ['']
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
        // Attempt to reconnect
        // since this usually errors out due to
        // connection being closed
        pool = getPool(true)
        return rejectQuery(e)
      }
    })
    // console.log('[SQL_SIMPLE] %s %s', query, params)
    getPool().query(query, params, (err: MysqlError, results: any[]) => {
      if (err) {
        // Attempt to reconnect
        // since this usually errors out due to
        // connection being closed
        if (err.code === 'POOL_CLOSED') {
          pool = getPool(true)
        }
        return rejectQuery(err)
      }
      return resolveQuery(results)
    })
  })
}

/**
 * Validate the database connection
 */
async function testConnection(): Promise<boolean> {
  return new Promise((resolveDbConnection) => {
    try {
      getPool().getConnection((err, conn) => {
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

export { getPool, jwtSecret, simpleQuery, testConnection, HOOKS_DIR }
