import { ConnectionConfig, createConnection } from 'mysql'

/**
 * Basically clone database shit from src/config,
 * then copy simple query
 */

const databaseConfig: ConnectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'node',
  password: process.env.DB_PASS || 'development',
  database: process.env.DB_DB || 'osm',
  port: parseInt(process.env.DB_PORT, 10) || 3306
}

function getConnection() {
  return createConnection(databaseConfig)
}

/**
 * Export some useful db functionality
 */
export default {
  clear(tableName: string) {
    return new Promise((resolveClear, rejectClear) => {
      const connection = getConnection()
      connection.query('DELETE FROM ??', tableName, (err, results) => {
        connection.end()
        if (err) {
          rejectClear(err)
        } else {
          resolveClear()
        }
      })
    })
  },
  query(queryString, params) {
    return new Promise((resolveQuery, rejectQuery) => {
      const conn = getConnection()
      conn.query(queryString, params, (err, results) => {
        conn.end()
        if (err) {
          rejectQuery(err)
        } else {
          resolveQuery(results)
        }
      })
    })
  }
}
