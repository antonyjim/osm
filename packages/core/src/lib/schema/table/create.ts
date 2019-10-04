import {
  IColumn,
  stringifySqlColumn,
  IColumnDefinition
} from '../column/serialize'
import { Connection, MysqlError } from 'mysql'
import { describeTable, IDetailedTable } from './describe'

export interface INewTable {
  ifNotExists?: boolean
  charset?: 'UTF8' | 'LATIN1'
  primaryKey?: string | [string]
  engine?: 'InnoDB' | 'ISAM'
  columns: IColumn[]
}

const defaultTableOpts: INewTable = {
  ifNotExists: true,
  charset: 'UTF8',
  engine: 'InnoDB',
  columns: []
}

/**
 * Creates a table according to the options passed
 * @param tableName {string} Name of the table to create
 * @param tableOpts {object} Options to be passed to table
 */
export function createTable(
  tableName: string,
  tableOpts: INewTable,
  connection?: Connection
): Promise<Connection> {
  return new Promise((resolve, reject) => {
    tableOpts = { ...defaultTableOpts, ...tableOpts }
    let sql: string = ''
    let params: (string | number | boolean | Date)[] = []

    let tableHead: string =
      'CREATE TABLE ' +
      (tableOpts.ifNotExists ? 'IF NOT EXISTS' : '') +
      ' ?? (\r\n'
    const tableParams: string[] = [tableName]

    if (Array.isArray(tableOpts.primaryKey)) {
      tableHead += 'PRIMARY KEY('
      for (const key of tableOpts.primaryKey) {
        tableHead += '??, '
        tableParams.push(key)
      }
      tableHead += '),\r\n'
    } else if (typeof tableOpts.primaryKey === 'string') {
      tableHead += 'PRIMARY KEY(??),\r\n'
      tableParams.push(tableOpts.primaryKey)
    }

    // All of the following arrays are used for combinging
    // the strings returned from stringifySqlColumn()
    let allColumns: string = ''
    const allColumnParams: (string | number | boolean | Date)[] = []

    const allNameTypes: string[] = []
    const allNameTypeParams: (string | number | boolean | Date)[] = []

    const allIndexes: string[] = []
    const allIndexParams: (string | number | boolean | Date)[] = []

    const allForeignKeys: string[] = []
    const allForeignKeyParams: (string | number | boolean | Date)[] = []
    for (const col of tableOpts.columns) {
      try {
        const def: IColumnDefinition = stringifySqlColumn(col)
        allNameTypes.push(def.nameType.value)
        allNameTypeParams.push(...def.nameType.params)

        if (def.index && def.index.value.length > 0) {
          allIndexes.push(def.index.value)
          allIndexParams.push(...def.index.params)
        }

        if (def.reference && def.reference.value.length > 0) {
          allForeignKeys.push(def.reference.value)
          allForeignKeyParams.push(...def.reference.params)
        }
      } catch (err) {
        return reject(err)
      }
    }

    allColumns += allNameTypes.join(',\r\n')
    allColumnParams.push(...allNameTypeParams)

    if (allIndexes.length > 0) {
      allColumns += ',\r\n' + allIndexes.join(',\r\n')
      allColumnParams.push(...allIndexParams)
    }

    if (allForeignKeys.length > 0) {
      allColumns += ',\r\n' + allForeignKeys.join(',\r\n')
      allColumnParams.push(...allForeignKeyParams)
    }

    const tableFooter: string =
      ') ENGINE = ' + tableOpts.engine + ' CHARSET = ' + tableOpts.charset

    sql = tableHead + allColumns + tableFooter
    params = [...tableParams, ...allColumnParams]

    const describeTables: Promise<boolean>[] = []
    tableOpts.columns.map((column: IColumn) => {
      describeTables.push(
        new Promise((resolveDesciption, rejectDesciption) => {
          if (column.reference) {
            describeTable(
              connection.config.database,
              column.reference.table
            ).then((tableSchema: IDetailedTable) => {
              if (tableSchema.engine !== tableOpts.engine) {
                rejectDesciption(
                  new Error(
                    'Foreign key could not be created. Table ' +
                      tableName +
                      ' is an ' +
                      tableOpts.engine +
                      ' table while ' +
                      column.reference.table +
                      ' is an ' +
                      tableSchema.engine +
                      ' table.'
                  )
                )
              } else if (tableSchema.charset !== tableOpts.charset) {
                rejectDesciption(
                  new Error(
                    'Foreign key could not be created. Table ' +
                      tableName +
                      ' uses the ' +
                      tableOpts.charset +
                      ' charset while ' +
                      column.reference.table +
                      ' uses ' +
                      tableSchema.charset +
                      '.'
                  )
                )
              }
            })
          }
        })
      )
    })
    queryCreateTable(sql, params, connection)
      .then(resolve)
      .catch(reject)
  })
}

function queryCreateTable(
  sql: string,
  params: (string | boolean | number | Date)[],
  conn: Connection
): Promise<Connection> {
  return new Promise((resolve, reject) => {
    conn.query(sql, params, (err: MysqlError) => {
      if (err) {
        if (err.errno === 150) {
          reject(new Error('Foreign key contraint is malformed'))
        } else {
          reject(err)
        }
      }
      resolve(conn)
    })
  })
}
