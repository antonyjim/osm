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
  reference?: IFullColumn
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
    COLUMN_KEY: 'PRI' | 'MUL' | 'UNI'
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
    COLUMN_KEY: 'PRI' | 'MUL' | 'UNI'
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
export function describeColumn(
  databaseName: string,
  tableName: string,
  columnName: string
): Promise<IFullColumn> {
  return new Promise((resolve, reject) => {
    simpleQuery(
      `
SELECT TABLE_SCHEMA,
TABLE_NAME,
COLUMN_NAME,
ORDINAL_POSITION,
COLUMN_DEFAULT,
IS_NULLABLE,
DATA_TYPE,
CHARACTER_MAXIMUM_LENGTH,
NUMERIC_PRECISION,
NUMERIC_SCALE,
DATETIME_PRECISION,
CHARACTER_SET_NAME,
COLLATION_NAME,
COLUMN_TYPE,
COLUMN_KEY,
EXTRA FROM INFORMATION_SCHEMA.COLUMNS WHERE
TABLE_NAME = ? AND
COLUMN_NAME = ? AND
TABLE_SCHEMA = ?`,
      [tableName, columnName, databaseName]
    ).then((column: information_schema.columns) => {
      column = column[0]
      const col: IFullColumn = {
        name: column.COLUMN_NAME,
        type: column.COLUMN_TYPE,
        length: column.CHARACTER_MAXIMUM_LENGTH,
        database: column.TABLE_SCHEMA,
        table: column.TABLE_NAME,
        position: column.ORDINAL_POSITION,
        default: column.COLUMN_DEFAULT,
        attributes: column.EXTRA && column.EXTRA.split(' ')
      }

      if (column.COLUMN_KEY === 'MUL') {
        getForeignKey(
          column.TABLE_SCHEMA,
          column.TABLE_NAME,
          column.COLUMN_NAME
        )
          .then((refColumn: IFullColumn) => {
            col.reference = refColumn
            return resolve(col)
          })
          .catch(reject)
      } else {
        return resolve(col)
      }
    })
  })
}

export function getTableColumns(databaseName: string, tableName: string) {
  return new Promise((resolveAllColumns, rejectAllColumns) => {
    simpleQuery(
      'SELECT COLUMN_NAME, COLUMN_DEFAULT, IS_NULLABLE, DATA_TYPE, CHARACTER_MAXIMUM_LENGTH, \
      COLUMN_KEY, EXTRA\
      '
    )
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

export function getForeignKey(
  databaseName: string,
  tableName: string,
  columnName: string
): Promise<IFullColumn> {
  return new Promise((resolve, reject) => {
    simpleQueryWithCb(
      'SELECT REFERENCED_TABLE_SCHEMA, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME, CONSTRAINT_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE WHERE TABLE_NAME = ? AND COLUMN_NAME IN (?) AND TABLE_SCHEMA = ? AND NOT REFERENCED_TABLE_SCHEMA IS NULL',
      [tableName, columnName, databaseName],
      (err: MysqlError, results: information_schema.key_column_usage[]) => {
        if (err) reject(err)
        if (results.length > 0 && results[0].REFERENCED_TABLE_SCHEMA) {
          describeColumn(
            results[0].REFERENCED_TABLE_SCHEMA,
            results[0].REFERENCED_TABLE_NAME,
            results[0].REFERENCED_COLUMN_NAME
          )
            .then(resolve)
            .catch(reject)
        } else {
          resolve()
        }
      }
    )
  })
}
