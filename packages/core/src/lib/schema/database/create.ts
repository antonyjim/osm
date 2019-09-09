import { Connection, createConnection, MysqlError } from 'mysql'

export function createDatabase(
  dbName: string,
  conn: Connection
): Promise<Connection> {
  return new Promise((resolve, reject) => {
    const newConn: Connection = createConnection({
      ...conn.config,
      database: null
    })
    newConn.connect((mysqlConnectErr: MysqlError) => {
      if (mysqlConnectErr) reject(mysqlConnectErr)
      if (newConn.state === 'authenticated') {
        newConn.query(
          'CREATE DATABASE ??',
          dbName,
          (mysqlCreateDbErr: MysqlError, results) => {
            if (mysqlCreateDbErr) reject(mysqlCreateDbErr)
            newConn.query('USE ??', dbName, (err: MysqlError) => {
              if (err) reject(err)
              conn.end()
              newConn.config.database = dbName
              resolve(newConn)
            })
          }
        )
      }
    })
  })
}

export function createDatabaseIfNotExists(
  dbName: string,
  conn: Connection
): Promise<Connection> {
  return new Promise((resolve, reject) => {
    const newConn: Connection = createConnection({
      ...conn.config,
      database: ''
    })
    newConn.connect((err) => {
      if (err) reject(err)

      if (newConn.state === 'authenticated') {
        newConn.query(
          'CREATE DATABASE IF NOT EXISTS ??',
          dbName,
          (createDbErr: MysqlError, results) => {
            if (createDbErr) reject(createDbErr)
            conn.end()
            newConn.query('USE ??', dbName, (useDbErr: MysqlError) => {
              if (useDbErr) reject(useDbErr)
              resolve(newConn)
            })
          }
        )
      } else {
        reject(new Error('Could not establish database connection'))
      }
    })
  })
}
