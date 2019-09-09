import { Pool, PoolConfig, createPool, MysqlError } from 'mysql'
import { ITableSchema, IDatabaseSchema } from '../types/schema'

// I hate having a global variabled... but there's not really a whole lot of
// options to store database information.
const towelInitInfo: {
  pool?: Pool
  schema?: IDatabaseSchema
} = {
  schema: {
    database: process.env.DB_NAME
  }
}

function getPool(): Pool {
  return towelInitInfo.pool
}

export function getSchema(table): ITableSchema {
  return towelInitInfo.schema.tables[table]
}

export function init({
  databaseConnection,
  tables,
  sync
}: {
  databaseConnection: PoolConfig
  tables?: [string]
  sync?: boolean
}): Promise<boolean> {
  return new Promise((resolve) => {
    const newDbPoolConfig: PoolConfig = { ...databaseConnection }
    {
      if (!databaseConnection.password) {
        newDbPoolConfig.password = process.env.DB_PASS
      }
      if (!databaseConnection.user) {
        newDbPoolConfig.password = process.env.DB_USER
      }
      if (!databaseConnection.host) {
        newDbPoolConfig.host = process.env.DB_HOST || 'localhost'
      }
      if (!databaseConnection.port) {
        newDbPoolConfig.port = parseInt(process.env.DB_PORT, 10) || 3306
      }
      if (!databaseConnection.database) {
        newDbPoolConfig.database = process.env.DB_NAME
      }
      if (
        !databaseConnection.connectionLimit &&
        !isNaN(parseInt(process.env.DB_POOL_LIMIT, 10))
      ) {
        newDbPoolConfig.connectionLimit = parseInt(
          process.env.DB_POOL_LIMIT,
          10
        )
      } else {
        newDbPoolConfig.connectionLimit = 3
      }
    }
    try {
      towelInitInfo.pool = createPool({
        ...newDbPoolConfig
      })
      towelInitInfo.pool.query(
        'SELECT CONNECTION AS 1 + 1',
        (err: MysqlError, results: [{ CONNECTION: number }]) => {
          if (err) throw err
          if (results[0].CONNECTION === 2) {
            resolve(true)
          }
        }
      )
    } catch (err) {
      console.error(err)
      resolve(false)
    }
  })
}

export function simpleQuery(query: string, params?: any) {
  return new Promise((resolveQuery, rejectQuery) => {
    getPool().getConnection((err, conn) => {
      if (err) {
        if (conn) conn.release()
        rejectQuery(err)
      }
      if (query.indexOf('FROM  LIMIT') > -1) {
        rejectQuery('Blank query')
      }
      try {
        if (!params) {
          console.log('[TOWEL] No params provided')
        }
        // console.log('[SQL_SIMPLE] %s', conn.format(query, params))
      } catch (e) {
        console.error('[TOWEL] %s', e.message)
        console.error(e)
        rejectQuery(e)
      }
      conn.release()
    })
    getPool().query(query, params, (err: Error, results: any[]) => {
      if (err) rejectQuery(err)
      return resolveQuery(results)
    })
  })
}
