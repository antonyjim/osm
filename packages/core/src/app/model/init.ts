// Generate the schema into an object
import { simpleQuery, getPool } from '@lib/connection'
import { uuid } from '@lib/utils'
import { copyDirSync } from '@lib/utils'
import { debug } from '@lib/log'
import constructSchema, { tables } from '@app/model/constructSchema'
import { IDictionary } from '@osm/server'
import { ITableSchema } from '@osm/forms'
import { IDescribeResult } from '@osm/queries'
import { MAX_SQL_COL, databaseConfig } from '@root/config'
import { describeColumn, IFullColumn } from '@lib/schema/table/describe'
import specialColumnNames from './specialColumnNames'
import * as humanize from 'humanize-string'

const log = debug('app:init')
const flaggedKeyFields: {
  table: string
  field: string
  columnId: string
}[] = []

/**
 * Copy everything using SHOW TABLES
 * Will eventually be replaced by Towel.Schema
 */
export function initSchema() {
  return new Promise((resolveSchema, rejectSchema) => {
    Promise.all([
      constructSchema(),
      simpleQuery(
        `SHOW TABLES WHERE NOT Tables_in_${process.env.DB_DB} LIKE '%_list'`
      )
    ])
      .then(
        ([tables, allTables]: [
          IDictionary<ITableSchema>,
          IDictionary<string>[]
        ]) => {
          return Promise.all(
            allTables.map((table) => {
              return new Promise(
                (resolveTableDescription, rejectTableDescription) => {
                  const tableName = table['Tables_in_' + process.env.DB_DB]
                  let currTableId: string = ''
                  // if (tables[tableName] && tables[tableName].tableId !== '') {
                  //   console.log(
                  //     'Table %s already exists in table schema with %s',
                  //     tableName,
                  //     inspect(tables[tableName], false, 1)
                  //   )

                  //   return
                  // } else {
                  //   console.log('Table %s does not exist in current schema', tableName)
                  createTableIfNotExists(tableName)
                    .then((tableId) => {
                      currTableId = tableId
                      return simpleQuery('DESCRIBE ??', [tableName])
                    })
                    .then((columns: IDescribeResult[]) => {
                      // const existingColumns = existingTables[tableName].columns
                      const allColumns: string[] = [
                        'sys_id',
                        'reference_id',
                        'column_name',
                        'visible',
                        'admin_view',
                        'readonly',
                        'nullable',
                        'label',
                        'hint',
                        'type',
                        'len',
                        'default_value',
                        'required_on_create',
                        'required_on_update',
                        'table_name',
                        'default_view',
                        'update_key',
                        'column_order',
                        'enum',
                        'display_field'
                      ]
                      let minColIndex = 0
                      let hasSetDisplay = false

                      let theseColumns = columns.map((col) => {
                        // Check if the column is already defined, and figure out sort order
                        if (
                          tables[tableName] &&
                          tables[tableName].columns[col.Field]
                        ) {
                          if (tables[tableName].columns[col.Field])
                            if (tables[tableName].columns[col.Field].order) {
                              // Check if the column order is less than that of the minColIndex,
                              // If so, do not allow any future columns from having a column index
                              // equal to or below this column's col index
                              if (
                                tables[tableName].columns[col.Field].order <=
                                minColIndex
                              ) {
                                minColIndex =
                                  tables[tableName].columns[col.Field].order + 1
                              }
                            }

                          return // Column already defined
                        } else {
                          // Define a new column
                          log('Column %s is not defined', col.Field)
                          const columnId = uuid()
                          let columnOrder = minColIndex
                          minColIndex++
                          let displayField = false

                          // Lets look for special field details
                          const specialDetails =
                            specialColumnNames[col.Field] || {}
                          // Set the first non-id and non-foreign reference
                          // to be a display field.
                          if (
                            col.Field !== 'sys_id' &&
                            hasSetDisplay === false &&
                            col.Key !== 'MUL'
                          ) {
                            displayField = true
                            hasSetDisplay = true
                          }

                          // We'll look for foreign keys after inserting descriptions
                          if (col.Key === 'MUL') {
                            flaggedKeyFields.push({
                              table: tableName,
                              field: col.Field,
                              columnId
                            })
                          }

                          return [
                            columnId, // sys_id
                            null, // reference_id
                            col.Field, // column_name,
                            specialDetails.visible || true, // visible
                            false, // admin_view
                            false, // readonly
                            col.Null === 'NO', // nullable
                            specialDetails.label || humanize(col.Field), // label
                            specialDetails.hint || null, // hint
                            parseType(col.Type).dataType.toUpperCase(), // type
                            parseType(col.Type).dataLength, // len
                            col.Default, // default_value
                            true, // required_on_create
                            false, // required_on_update
                            currTableId, // table_name
                            true, // default_view
                            col.Key === 'PRI' ? true : false, // update_key
                            columnOrder, // column_order
                            null, // enum
                            displayField // display_field
                          ]
                        }
                      })

                      theseColumns = theseColumns.filter((val) => {
                        return val !== undefined
                      })

                      if (theseColumns.length > 0) {
                        return simpleQuery(
                          'INSERT INTO sys_db_dictionary (??) VALUES ?',
                          [allColumns, theseColumns]
                        )
                      } else {
                        // If we aren't doing anything, then we just need to move on so that we can resolve the whole function
                        return Promise.resolve()
                      }
                    })
                    .then(resolveTableDescription)
                    .catch((err) => {
                      console.error(
                        '[CONSTRUCT_SCHEMA] Error inserting table descriptions'
                      )
                      console.error(err)
                      rejectTableDescription(err)
                    })
                }
              )
            })
          )
        }
      )
      .then(() => {
        // Take all of the flagged fields and search for their reference
        return Promise.all(
          flaggedKeyFields.map((refCol) => {
            return new Promise((resolveDesc, rejectDesc) => {
              describeColumn(
                databaseConfig.database,
                refCol.table,
                refCol.field
              )
                .then((describedColumn: IFullColumn) => {
                  if (describedColumn.reference) {
                    // Try to find the reference id
                    simpleQuery(
                      'UPDATE sys_db_dictionary SET reference_id = (SELECT t1.sys_id FROM sys_db_dictionary t1 LEFT JOIN sys_db_object t2 ON t1.table_name = t2.sys_id WHERE t1.column_name = ? and t2.name = ? LIMIT 1) WHERE sys_id = ?',
                      [
                        describedColumn.reference.name,
                        describedColumn.reference.table,
                        refCol.columnId
                      ]
                    )
                      .then(resolveDesc)
                      .catch(rejectDesc)
                  } else {
                    return resolveDesc()
                  }
                })
                .catch(rejectDesc)
            })
          })
        )
      })
      .then(constructSchema)
      .then(resolveSchema)
      .catch((err) => {
        console.error(
          `[CONSTRUCT_SCHEMA] CRITICAL ERROR WHEN STARTING SERVER ${err.message}`
        )
        rejectSchema(err)
        getPool().end()
      })
  })

  function parseType(sqlType: string) {
    function getLen(type) {
      const numInParens: string[] = type.match(/\(\d*\)/g)
      if (numInParens.length === 0) {
        return 0
      }
      const len = parseInt(numInParens[0].slice(1, -1), 10)
      if (isNaN(len)) {
        return 0
      } else {
        return len
      }
    }

    const returnType = {
      dataType: 'tinyint',
      dataLength: 0
    }
    const switchVal = sqlType
      .replace(/\s?\(\d*\)/g, '')
      .trim()
      .toLowerCase()
    switch (switchVal) {
      // Check for unicode
      case 'nchar':
      case 'char': {
        returnType.dataType = 'char'
        returnType.dataLength = getLen(sqlType)
        break
      }

      // Check for unicode
      case 'nvarchar':
      case 'varchar': {
        returnType.dataType = 'varchar'
        returnType.dataLength = getLen(sqlType)
        break
      }
      case 'int': {
        returnType.dataType = 'int'
        returnType.dataLength = getLen(sqlType)
        break
      }
      case 'bigint': {
        returnType.dataType = 'bigint'
        returnType.dataLength = getLen(sqlType)
        break
      }
      case 'longtext':
      case 'text': {
        returnType.dataType = 'text'
        returnType.dataLength = 65535
        break
      }

      case 'longblob':
      case 'blob': {
        returnType.dataType = 'blob'
        returnType.dataLength = 65535
        break
      }
      case 'tinyint': {
        returnType.dataType = 'boolean'
        returnType.dataLength = null
        break
      }
      case 'enum': {
        returnType.dataType = 'varchar'
        returnType.dataLength = 40 // Maxlength of an enum
        break
      }
      default: {
        returnType.dataType = sqlType
        returnType.dataLength = null
      }
    }
    return returnType
  }
}

function createTableIfNotExists(tableName: string): Promise<string> {
  return new Promise((resolveCreatedTable, rejectCreatedTable) => {
    simpleQuery(
      'SELECT sdo.sys_id, sdo.read_role, sdo.edit_role, sdo.delete_role FROM sys_db_object sdo WHERE sdo.name = ?',
      [tableName]
    ).then(
      (
        tables: {
          sys_id: string
          read_role: string | null
          edit_role: string | null
          delete_role: string | null
        }[]
      ) => {
        if (tables && tables.length > 0) {
          resolveCreatedTable(tables[0].sys_id)
        } else {
          // const id = uuid()
          // await simpleQuery('INSERT INTO sys_db_object VALUES (?)', [
          //   [id, tableName, tableName, null, null]
          // ])
          const newId = uuid()
          simpleQuery(
            `INSERT INTO sys_db_object (name, label, sys_id) VALUES ?`,
            [[[tableName, tableName, newId]]]
          )
            .then(() => {
              resolveCreatedTable(newId)
              console.log(
                '[STARTUP] Inserted default authorization values for table %s',
                tableName
              )
            })
            .catch((err) => {
              rejectCreatedTable(err)
              console.error(
                '[STARTUP] Error inserting default values for table %s',
                tableName
              )
            })
        }
      }
    )
  })
}

export default function() {}
