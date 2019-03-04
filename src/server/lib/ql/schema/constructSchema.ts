/**
 * lib/ql/schema/constructSchema.ts
 * Create a schema object from the sys_db_dictionary and sys_db_object tables
 */

// Node Modules
import { inspect } from 'util'
import { EventEmitter } from 'events'

// Local Modules
import { simpleQuery } from '../../connection'

// Constants and global module variables
const SYS_DB_OBJECT = 'sys_db_object'
const SYS_DB_DICTIONARY = 'sys_db_dictionary'

let tables = null
const references = []

/**
 * Converts an sql data type such as VARCHAR, INT
 * into a valid javascript data type such as
 * string, number, boolean.
 * @param type SQL Data Type
 */
export function sqlToJsType(type: string) {
  let returnType: string = ''
  let swType
  if (type) swType = type.toUpperCase()
  else swType = type
  switch (swType) {
    case 'VARCHAR': {
      returnType = 'string'
      break
    }
    case 'CHAR': {
      returnType = 'string'
      break
    }
    case 'BOOLEAN': {
      returnType = 'boolean'
      break
    }
    case 'INT': {
      returnType = 'number'
      break
    }
    case 'FLOAT': {
      returnType = 'number'
      break
    }
    default: {
      returnType = 'string'
    }
  }
  return returnType
}

export default async function constructSchema() {
  if (tables) return tables
  tables = {}
  const tableConstructorEmitter = new EventEmitter()
  const gotTables: any[] | void = await simpleQuery('SELECT ??, ?? FROM ??', [
    'sys_id',
    'name',
    SYS_DB_OBJECT
  ])
  if (!Array.isArray(gotTables)) {
    return new Error('No tables found')
  }
  gotTables.map((tableInfo, i) => {
    ;(async () => {
      const tableName: string = tableInfo.name
      tables[tableName] = {
        primaryKey: '',
        displayField: '',
        defaultFields: [],
        columns: {}
      }
      /* Find the column name, reference field, selectablility, table_name, table_display_name */
      const statement =
        'SELECT `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t2`.?? AS ??, `t3`.?? AS ??, `t4`.?? AS ?? FROM ?? `t1` LEFT JOIN ?? `t2` ON `t1`.?? = `t2`.?? INNER JOIN ?? `t3` ON `t1`.?? = `t3`.?? LEFT JOIN ?? `t4` ON `t2`.?? = `t4`.?? WHERE `t3`.?? = ? ORDER BY `t1`.??'
      const params = [
        'column_name',
        'base_url',
        'nullable',
        'label',
        'type',
        'default_view',
        'update_key',
        'readonly',
        'visible',
        'column_name',
        /* AS */ 'reference_id_display',
        'name',
        /* AS */ 'table_name_display',
        'name',
        /* AS */ 'reference_id_table_name_display',
        SYS_DB_DICTIONARY,
        SYS_DB_DICTIONARY,
        'reference_id',
        'sys_id',
        'sys_db_object',
        'table_name',
        'sys_id',
        'sys_db_object',
        'table_name',
        'sys_id',
        'name',
        tableName,
        'col_order'
      ]
      const tableColumns = await simpleQuery(statement, params) // I know I'm trying to avoid static queries, but come on
      tableColumns.map((col) => {
        tables[tableName].columns[col.column_name] = {
          type: sqlToJsType(col.type),
          nullable: col.nullable,
          readonly: col.readonly,
          reference: col.reference_id_display || false,
          refTable: col.reference_id_table_name_display,
          label: col.label
        }
        if (col.default_view)
          tables[tableName].defaultFields.push(col.column_name)
        if (col.reference_id_display) {
          references.push({
            col: col.column_name,
            table: tableName,
            refTable: col.reference_id_table_name_display,
            refCol: col.reference_id_display
          })
        }

        if (col.base_url) {
          tables[tableName].displayField = col.column_name
          tables[tableName].columns[col.column_name].baseURL = col.base_url
        }
        if (col.update_key) tables[tableName].primaryKey = col.column_name
      })
      i === gotTables.length - 1
        ? tableConstructorEmitter.emit('done')
        : tableConstructorEmitter.emit('tabled')
    })()
  })
  /**
   * Wait for all of the normal field to be populated in the
   * table object, then add in all of the reference columns.
   */
  tableConstructorEmitter.once('done', () => {
    references.map((ref) => {
      const colName = ref.col + '_display'
      const colTable = ref.table
      const refTable = ref.refTable
      const refCol = ref.refCol
      const colDetails = tables[refTable].columns[refCol]
      tables[colTable].columns[colName] = {
        type: colDetails.type,
        readonly: colDetails.readonly,
        localRef: ref.col, // The name of the id for JOIN ON
        displayAs: tables[refTable].displayField || tables[refTable].primaryKey,
        reference: refCol, // Foreign reference column
        tableRef: refTable // Foreign reference table
      }
      if (tables[colTable].defaultFields.indexOf(ref.col) > -1) {
        tables[colTable].defaultFields.push(colName)
      }
    })
    console.log(inspect(tables), 5)
    return tables
  })
}
