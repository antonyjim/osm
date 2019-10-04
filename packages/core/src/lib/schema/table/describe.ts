/*tslint:disable:class-name */ // Allows interfaces to be named after actual schema
import { Connection, MysqlError } from 'mysql'
import { getPool, simpleQueryWithCb } from '@lib/connection'
import { simpleQuery } from '@lib/queries'

export interface IFullColumn {
  name: string
  type: string
  length?: number
  database: string
  table: string
  position: number
  default?: number | string | boolean | Date
  reference?: {
    database: string
    table: string
    column: IFullColumn
  }
  attributes?: string[]
}

export interface IDetailedTable {
  columns: { [id: string]: IFullColumn }
  primaryKey: string
  engine: 'InnoDB' | 'ISAM'
  charset: 'UTF8' | 'LATIN1'
  autoIncrement: boolean
  temporary: boolean
  createOptions: string[]
  database: string
}

namespace information_schema {
  export interface tables {
    TABLE_SCHEMA: string
    TABLE_NAME: string
    TABLE_TYPE: string
    ENGINE: 'InnoDB' | 'ISAM' | null
    AUTO_INCREMENT: number
    CREATE_TIME: Date
    TABLE_COLLATION: 'utf8_general_ci' | 'latin1_swedish_ci'
    CREATE_OPTIONS: string
    TEMPORARY: 'Y' | 'N'
    // This doesn't actually exist on the tables table, it is a result of a join below
    PRIMARY_KEY_COL: string
  }

  export interface columns {
    TABLE_SCHEMA: string
    TABLE_NAME: string
    COLUMN_NAME: string
    ORDINAL_POSITION: number
    COLUMN_DEFAULT: string | number | boolean | Date
    IS_NULLABLE: 'YES' | 'NO'
    DATA_TYPE: string
    CHARACTER_MAXIMUM_LENGTH: number
    NUMERIC_PRECISION: number
    NUMERIC_SCALE: number
    DATETIME_PRECISION: number
    CHARACTER_SET_NAME: string
    COLLATION_NAME: string
    COLUMN_TYPE: string
    COLUMN_KEY: 'YES' | 'NO'
    EXTRA: string
  }

  export interface key_column_usage {
    CONSTRAINT_SCHEMA: string
    CONSTRAINT_NAME: string
    TABLE_SCHEMA: string
    TABLE_NAME: string
    COLUMN_NAME: string
    ORDINAL_POSITION: number
    POSITION_IN_UNIQUE_CONTRAINT: number
    REFERENCED_TABLE_SCHEMA: string
    REFERENCED_TABLE_NAME: string
    REFERENCED_COLUMN_NAME: string
  }

  export interface column_with_key {
    TABLE_SCHEMA: string
    TABLE_NAME: string
    COLUMN_NAME: string
    ORDINAL_POSITION: number
    COLUMN_DEFAULT: string | number | boolean | Date
    IS_NULLABLE: 'YES' | 'NO'
    DATA_TYPE: string
    CHARACTER_MAXIMUM_LENGTH: number
    NUMERIC_PRECISION: number
    NUMERIC_SCALE: number
    DATETIME_PRECISION: number
    CHARACTER_SET_NAME: string
    COLLATION_NAME: string
    COLUMN_TYPE: string
    COLUMN_KEY: 'YES' | 'NO'
    EXTRA: string
    REFERENCED_TABLE_SCHEMA: string
    REFERENCED_TABLE_NAME: string
    REFERENCED_COLUMN_NAME: string
  }
}

// Helper function to convert information_schema.tables into ITableSchema
function convertTableToFriendlyFormat(
  table: information_schema.tables
): Promise<IDetailedTable> {
  return new Promise((resolve, reject) => {
    let collation: 'UTF8' | 'LATIN1' = 'UTF8'
    // mysql stores collation in a different form than the table is created with
    if (table.TABLE_COLLATION && table.TABLE_COLLATION.startsWith('latin1')) {
      collation = 'LATIN1'
    } else if (table.TABLE_COLLATION === null) {
      collation = null // ... It can also be null
    }

    const schema: IDetailedTable = {
      columns: {},
      primaryKey: '',
      engine: table.ENGINE,
      charset: collation,
      autoIncrement: table.AUTO_INCREMENT === 1,
      temporary: table.TEMPORARY === 'Y',
      createOptions: table.CREATE_OPTIONS.split(' '),
      database: table.TABLE_SCHEMA
    }

    return resolve(schema)
  })
}

/**
 * Convert information schema data into normalized js object
 * @param column Column information from information_schema
 */
function convertColumnToFriendlyFormat(
  column: information_schema.column_with_key
): Promise<IFullColumn> {
  return new Promise((resolve, reject) => {
    const col: IFullColumn = {
      name: column.COLUMN_NAME,
      type: column.COLUMN_TYPE,
      length: column.CHARACTER_MAXIMUM_LENGTH,
      database: column.TABLE_SCHEMA,
      table: column.TABLE_NAME,
      position: column.ORDINAL_POSITION,
      default: column.COLUMN_DEFAULT,
      attributes: column.EXTRA.split(' ')
    }

    if (column.REFERENCED_COLUMN_NAME) {
      describeColumn(
        column.REFERENCED_TABLE_SCHEMA,
        column.REFERENCED_TABLE_NAME,
        column.REFERENCED_COLUMN_NAME
      )
        .then((refColumn: IFullColumn) => {
          col.reference = {
            database: column.REFERENCED_TABLE_SCHEMA,
            table: column.REFERENCED_TABLE_NAME,
            column: refColumn
          }
          return resolve(col)
        })
        .catch(reject)
    } else {
      return resolve(col)
    }
  })
}

export function describeTable(
  databaseName: string,
  tableName: string
): Promise<IDetailedTable> {
  return new Promise((resolve, reject) => {
    simpleQueryWithCb(
      "SELECT t1.*, t2.COLUMN_NAME AS PRIMARY_KEY_COL FROM INFORMATION_SCHEMA.TABLES t1 LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE t2 ON t1.TABLE_NAME = t2.TABLE_NAME WHERE t1.TABLE_SCHEMA = ? AND t1.TABLE_NAME = ? AND t2.CONSTRAINT_NAME = 'PRIMARY'",
      [databaseName, tableName],
      (err: MysqlError, results: information_schema.tables[]) => {
        if (err) reject(err)
        if (results.length === 0) {
          reject(
            new Error(
              'Table ' +
                tableName +
                ' does not exist on database ' +
                databaseName
            )
          )
        } else {
          resolve(convertTableToFriendlyFormat(results[0]))
        }
      }
    )
  })
}

function describeColumn(
  databaseName: string,
  tableName: string,
  columnName: string | [string]
) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(columnName)) {
      columnName = [columnName]
    }
    simpleQueryWithCb(
      'SELECT t1.*, t2.REFERENCED_TABLE_SCHEMA, t2.REFERENCED_TABLE_NAME, t2.REFERENCED_COLUMN_NAME, t2.CONTSTRAINT_NAME FROM INFORMATION_SCHEMA.COLUMNS t1 LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ON t1.COLUMN_NAME = t2.COLUMN_NAME WHERE t1.TABLE_NAME = ? AND t1.COLUMN_NAME IN (?) AND t1.TABLE_SCHEMA = ?',
      [tableName, columnName, databaseName],
      (err: MysqlError, results: information_schema.column_with_key[]) => {
        if (err) reject(err)
        const allColumns = []
        results.forEach((column) => {
          allColumns.push(convertColumnToFriendlyFormat(column))
        })

        Promise.all(allColumns)
          .then(resolve)
          .catch(reject)
      }
    )
  })
}
