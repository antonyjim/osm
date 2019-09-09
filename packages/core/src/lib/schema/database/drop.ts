import { Connection, MysqlError } from 'mysql'

export function dropDatabase(
  dbName: string,
  conn: Connection
): Promise<Connection> {
  return new Promise((resolve, reject) => {
    conn.query('DROP DATABASE IF EXISTS ??', dbName, (err: MysqlError) => {
      if (err) reject(err)
      return resolve(conn)
    })
  })
}
