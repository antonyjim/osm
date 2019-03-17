/**
 * src/lib/towel.ts
 * Provide the Towel class for manipulating
 * data structures on the server. Usage will
 * be almost exactly similar to the client version
 * of this class. Towel queries will generally avoid
 * the querynator class, as there is no need to go
 * through the hoops to use that class.
 */

// Node Modules

// NPM Modules

// Local Modules
import { Querynator, simpleQuery } from './connection'
import { getTables } from './ql/schema/constructSchema'
import generateHooks from './ql/hooks/generateHooks'

// Constants and global variables

export default class Towel extends Querynator {
  constructor({ table, fields }) {
    let schema
    try {
      schema = getTables()
      if (!schema[table]) {
        throw new Error(`${table} does not exist in the schema.`)
      }
    } catch (err) {
      throw new Error('Schema has not been initialized')
    }

    super({}, fields, true)
    this.tableName = table
    this.tableSchema = schema[table]
    this.queryFieldsArr = fields
    if (!this.tableSchema) {
      throw new Error('Towel could not locate table ' + table)
    } else {
      this.primaryKey = this.tableSchema.primaryKey
    }

    console.log('New Towel instantiated')
  }

  public static refreshHooks(): void {
    generateHooks()
    console.log('[TOWEL] Regenerating Hooks')
  }

  public static async rawQuery(query, params?): Promise<any> {
    return new Promise((resolve) => {
      simpleQuery(query, params)
        .then((rows) => {
          resolve(rows)
        })
        .catch((err) => {
          console.error('[TOWEL] ERROR OCCURRED AT RAW QUERY')
          console.error('[TOWEL] \n' + err.message)
          throw err
        })
    })
  }

  public async get(args?: { id?: string | string[] }) {
    try {
      if (Array.isArray(args && args.id)) {
        const fields = {}
        fields[this.primaryKey] = args.id
        return await this.byFields({ fields }, {})
      } else if (args && typeof args.id === 'string') {
        const record = await this.byId(args.id)
        if (record.data && record.data[this.tableName]) {
          return record.data[this.tableName]
        } else {
          return record
        }
      } else {
        return await this.all({})
      }
    } catch (err) {
      // Rethrow error
      throw err
    }
  }
}
