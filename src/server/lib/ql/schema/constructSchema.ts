/**
 * lib/ql/schema/constructSchema.ts
 * Create a schema object from the sys_db_dictionary and sys_db_object tables
*/

// Node Modules
import { inspect } from "util";
import { EventEmitter } from "events";

// Local Modules
import { simpleQuery } from "../../connection";

// Constants and global module variables
const
    SYS_DB_OBJECT = 'sys_db_object',
    SYS_DB_DICTIONARY = 'sys_db_dictionary'

let tables = null
let references = []

/**
 * Converts an sql data type such as VARCHAR, INT
 * into a valid javascript data type such as
 * string, number, boolean.
 * @param type SQL Data Type
 */
export function sqlToJsType(type: string) {
    let returnType: string = ''
    switch (type.toUpperCase()) {
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
    if (tables) return Promise.resolve(tables)
    tables = {}
    let tableConstructorEmitter = new EventEmitter()
    let gotTables: any[] = await simpleQuery('SELECT ??, ?? FROM ??', ['sys_id', 'name', SYS_DB_OBJECT]).catch(e => console.error(e)) || []
    if (gotTables.length === 0) throw new Error('No tables found')
    gotTables.map((tableInfo, i) => {
        (async () => {
            let tableName: string = tableInfo.name
            tables[tableName] = {
                primaryKey: '',
                displayField: '',
                defaultFields: [],
                columns: {}
            }
            /* Find the column name, reference field, selectablility, table_name, table_display_name */
            let statement = 'SELECT `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t1`.??, `t2`.?? AS ??, `t3`.?? AS ??, `t4`.?? AS ?? FROM ?? `t1` LEFT JOIN ?? `t2` ON `t1`.?? = `t2`.?? INNER JOIN ?? `t3` ON `t1`.?? = `t3`.?? LEFT JOIN ?? `t4` ON `t2`.?? = `t4`.?? WHERE `t3`.?? = ?'
            let params = [
                'column_name',
                'base_url', 
                'nullable',
                'type',
                'default_view',
                'update_key', 
                'readonly',
                'visible',
                'column_name', /* AS */ 'reference_id_display',
                'name', /* AS */ 'table_name_display',
                'name', /* AS */ 'reference_id_table_name_display',
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
                tableName
            ]
            let tableColumns = await simpleQuery(statement, params) // I know I'm trying to avoid static queries, but come on
            tableColumns.map(col => {
                tables[tableName].columns[col.column_name] = {
                    type: sqlToJsType(col.type),
                    nullable: col.nullable,
                    readonly: col.readonly,
                    reference: col.reference_id_display || false
                }
                if (col.default_view) tables[tableName].defaultFields.push(col.column_name)
                if (col.reference_id_display) references.push({col: col.column_name, table: tableName, refTable: col.reference_id_table_name_display, refCol: col.reference_id_display})
                if (col.base_url) tables[tableName].displayField = col.column_name
                if (col.update_key) tables[tableName].primaryKey = col.column_name
            })
            if (i === gotTables.length - 1) tableConstructorEmitter.emit('done')
            else tableConstructorEmitter.emit('tabled')
        })()
    })
    /**
     * Wait for all of the normal field to be populated in the
     * table object, then add in all of the reference columns.
     */
    tableConstructorEmitter.on('done', () => {
        references.map(ref => {
            let colName = ref.col + '_display'
            let colTable = ref.table
            let refTable = ref.refTable
            let refCol = ref.refCol
            let colDetails = tables[refTable].columns[refCol]
            tables[colTable].columns[colName] = {
                type: colDetails.type,
                readonly: colDetails.readonly,
                localRef: ref.col, // The name of the id for JOIN ON
                displayAs: tables[refTable].displayField || tables[refTable].primaryKey,
                reference: refCol, // Foreign reference column
                tableRef: refTable // Foreign reference table
            }
        })
        console.log(inspect(tables, false, 5))
        Promise.resolve(tables)
    })

}