/**
 * lib/queries/towel/towelRecord.ts
 * Provide the base class for the Towel class.
 * This module is split up like so to provide most of the singular
 * modifiers. I.e. functions that only modify one resource at a time.
 * E.g. getById, delete, update.
 *
 * It is important to note that this is NOT the Querynator class, though it does
 * provide a lot of similar functionality. It is also very important to note that
 * while Querynator validates a user has access to the requested resource,
 * the Towel record does not. This is due to the fact that
 */

// Node Modules

// NPM Modules

// Local Modules
import { byFields as _byFields } from '../builder/byFields'
import { ITableSchema } from '../../../../types/forms'
import { IFieldError } from '../../../../types/api'
import { getTables } from '../../api/schema/constructSchema'
import { simpleQuery } from '../../connection'
import { queryBuilder } from '../builder'

// Constants and global variables

export class TowelRecord {
  protected tableName: string // Database table name
  protected tableSchema: ITableSchema // Schema from the sys_db_dictionary table
  protected queryFieldsArr: string[] // List of fields to return from query
  protected primaryKey: string // Duh
  protected warnings: IFieldError[] // Errors encountered in the fields
  protected hasAggregate: boolean
  protected aggregates: {
    [aggregate: string]: string
  }

  constructor(table: string) {
    let schema
    try {
      schema = getTables()
      if (!schema[table]) {
        throw new Error(`${table} does not exist in the schema.`)
      }
    } catch (err) {
      throw new Error('Schema has not been initialized')
    }

    this.warnings = []
    this.tableName = table
    this.tableSchema = schema[table]
    this.queryFieldsArr = schema[table].defaultFields
    if (!this.tableSchema) {
      throw new Error('Towel could not locate table ' + table)
    } else {
      this.primaryKey = this.tableSchema.primaryKey
    }

    console.log('New Towel instantiated')
  }

  public addAggregate(aggregate: string, field: string) {
    this.hasAggregate = true
  }

  public async byId(id: string) {
    if (typeof id !== 'string') {
      throw new TypeError(this.primaryKey + ' must be in string format')
    }
    const queryParams = await queryBuilder(this.tableName, this.queryFieldsArr)
    queryParams.query += ' WHERE ??.?? = ?'
    queryParams.params.push(
      queryParams.aliases[this.tableName],
      this.primaryKey,
      id
    )
    return {
      warnings: this.warnings,
      data: await simpleQuery(queryParams.query, queryParams.params)
    }
  }
}
