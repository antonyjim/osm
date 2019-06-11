/**
 * lib/ql/schema/constructSchema.ts
 * Create a schema object from the sys_db_dictionary and sys_db_object tables
 */

// Node Modules
import { EventEmitter } from 'events'

// Local Modules
import { simpleQuery } from '../connection'
import Towel from '../queries/towel/towel'
import { ITableField, ITableSchema } from '../../types/forms'

// Constants and global module variables
const SYS_DB_OBJECT = 'sys_db_object'
const SYS_DB_DICTIONARY = 'sys_db_dictionary'

let tables: ISchema = null
const references = []
const TEMPLATE_TABLE: ITableSchema = {
  columns: {},
  defaultFields: [],
  displayField: '',
  primaryKey: '',
  tableId: ''
}

interface ISchema {
  [table: string]: ITableSchema
}

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

export default async function constructSchema(): Promise<ISchema> {
  return new Promise((resolveTables) => {
    // if (tables) return resolve(tables)
    tables = {}
    const tableConstructorEmitter = new EventEmitter()
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
          label: '',
          visible: true,
          type: colDetails.type,
          readonly: colDetails.readonly,
          localRef: ref.col, // The name of the id for JOIN ON
          displayAs:
            tables[refTable].displayField || tables[refTable].primaryKey,
          reference: refCol, // Foreign reference column
          refTable // Foreign reference table
        }
        if (tables[colTable].defaultFields.indexOf(ref.col) > -1) {
          tables[colTable].defaultFields.push(colName)
        }
      })
      return resolveTables(tables)
    })

    simpleQuery('SELECT ??, ?? FROM ??', ['sys_id', 'name', SYS_DB_OBJECT])
      .then((gotTables: any[] | void) => {
        if (!Array.isArray(gotTables)) {
          throw new Error('No tables found')
        }
        gotTables.map((tableInfo, i) => {
          ;(async () => {
            const tableName: string = tableInfo.name
            tables[tableName] = {
              primaryKey: '',
              tableId: '',
              displayField: '',
              defaultFields: [],
              columns: {}
            }
            /* Find the column name, reference field, selectablility, table_name, table_display_name */
            const statement =
              'SELECT `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t2`.?? AS ??, `t3`.?? AS ??, `t4`.?? AS ?? FROM ?? `t1` LEFT JOIN ?? `t2` ON `t1`.?? = `t2`.?? INNER JOIN ?? `t3` ON `t1`.?? = `t3`.?? LEFT JOIN ?? `t4` ON `t2`.?? = `t4`.?? WHERE `t3`.?? = ? ORDER BY `t1`.??'
            const params = [
              'column_name',
              'display_field',
              'nullable',
              'label',
              'type',
              'table_name',
              'required_on_update',
              'required_on_create',
              'default_view',
              'update_key',
              'len',
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
            const tableColumns = await simpleQuery(statement, params).catch(
              (err) => console.error(err)
            ) // I know I'm trying to avoid static queries, but come on
            if (tableColumns.length === 0) {
              console.error(
                'Table %s does not have any fields associated with it',
                tableName
              )
              return Promise.resolve()
            }
            if (!tables[tableName]) tables[tableName] = { ...TEMPLATE_TABLE }
            tables[tableName].tableId = tableColumns[0].table_name
            if (tableColumns) {
              tableColumns.map((col) => {
                tables[tableName].columns[col.column_name] = {
                  type: sqlToJsType(col.type),
                  nullable: col.nullable,
                  readonly: col.readonly,
                  maxLength: col.len,
                  reference: col.reference_id_display || false,
                  refTable: col.reference_id_table_name_display,
                  label: col.label,
                  visible: col.visible || false,
                  requiredUpdate: col.required_on_update,
                  requiredCreate: col.required_on_create
                }
                if (col.default_view) {
                  tables[tableName].defaultFields.push(col.column_name)
                }
                if (col.reference_id_display) {
                  references.push({
                    col: col.column_name,
                    table: tableName,
                    refTable: col.reference_id_table_name_display,
                    refCol: col.reference_id_display
                  })
                }

                if (col.display_field) {
                  tables[tableName].displayField = col.column_name
                }
                if (col.update_key) {
                  tables[tableName].primaryKey = col.column_name
                }
              })
            }
            return Promise.resolve()
          })()
            .then(() => {
              if (i === gotTables.length - 1) {
                tableConstructorEmitter.emit('done')
              }
            })
            .catch((err) => {
              console.error(err)
            })
        })
      })
      .catch((err) => {
        console.error(err)
      })
  })
}

export function getTables(): ISchema {
  if (tables) {
    // if (process.env.NODE_ENV === 'development') constructSchema()
    return tables
  } else {
    constructSchema()
    return tables
  }
}
