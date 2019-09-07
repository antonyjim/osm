import { Connection, MysqlError } from 'mysql'
import { connect } from 'http2'

export default function syncTables(
  database: string,
  connection: Connection
): Promise<null> {
  return new Promise((resolve) => {
    if (!database) {
      throw new Error('Expected string for database, got: ' + database)
    }
    const colName: string = 'Tables_in_' + database
    connection.query('SHOW TABLES', (err: MysqlError, tables: any[]) => {
      if (err) throw err
      if (tables.length === 0) return resolve(null)
      tables.map((table) => {
        const thisTable = table[colName]
        connection.query('SELECT * FROM thisTable')
      })
    })
  })
}
