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
import { v4 as uuid } from 'uuid'

// Local Modules
import { byFields as _byFields } from '../builder/byFields'
import { ITableSchema } from '../../../types/forms'
import { IFieldError } from '../../../types/api'
import { getTables } from '../../model/constructSchema'
import { simpleQuery } from '../../connection'
import { queryBuilder } from '../builder'
import { validateFieldIsValid } from '../builder/fieldValidator'

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
  protected requestedFields: string[]

  constructor(table: string) {
    let schema
    try {
      schema = getTables()
      if (!schema[table]) {
        throw new Error(`[TOWEL_RECORD] ${table} does not exist in the schema.`)
      }
    } catch (err) {
      console.error(err)
      throw new Error('[TOWEL_RECORD] Schema has not been initialized')
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

    console.log('[TOWEL] New Towel instantiated for table %s', this.tableName)
  }

  protected async validateNewFields(
    providedFields: any
  ): Promise<{ errors: IFieldError[]; warnings: IFieldError[]; valid: any }> {
    const returnVal = {
      errors: [],
      warnings: [],
      valid: {}
    }
    const schema = getTables()
    const tableSchema = schema[this.tableName].columns
    if (!providedFields) throw new Error('Missing fields')
    for (const field in tableSchema) {
      if (field.endsWith('_display')) continue // Return for joined fields.
      if (!Object.keys(providedFields).includes(field)) continue

      const validOrNot = await validateFieldIsValid(
        tableSchema[field],
        providedFields[field]
      ).catch((err) => {
        if (tableSchema[field].nullable && !tableSchema[field].requiredCreate) {
          returnVal.warnings.push({
            message: err.message,
            field
          })
        } else {
          console.log({
            message: err.message,
            field
          })
          returnVal.errors.push({
            message: err.message,
            field
          })
        }
      })
      returnVal.valid[field] = validOrNot
    }
    return returnVal
  }

  public addAggregate(aggregate: string, field: string) {
    this.hasAggregate = true
  }

  public setFields(fields: string | string[]): TowelRecord {
    if (Array.isArray(fields)) {
      this.requestedFields = fields
    } else {
      this.requestedFields = fields.split(',')
    }
    return this
  }

  public async create(fields) {
    let id
    if (this.primaryKey === 'sys_id') id = uuid()
    fields[this.primaryKey] = id

    let insertFields = { ...fields }
    // Execute hook handle

    insertFields = fields

    const query = 'INSERT INTO ?? SET ?'
    const params = [this.tableName]
    const validatedFields = await this.validateNewFields(insertFields)
    const returnObject = {
      errors: [],
      warnings: [],
      info: [],
      data: {}
    }
    let inserted
    if (validatedFields.errors && validatedFields.errors.length > 0) {
      return {
        errors: validatedFields.errors,
        warnings: validatedFields.warnings
      }
    }
    params.push(validatedFields.valid)
    inserted = await simpleQuery(query, params).catch((err) => {
      this.warnings.push(err)
      return {
        warnings: this.warnings
      }
    })
    if (inserted.affectedRows === 0) {
      returnObject.warnings.push({ message: 'Record was not created' })
    } else {
      returnObject.info.push({ message: 'Record was successfully created' })
    }

    const updatedObj = await this.byId(id)

    returnObject.data[this.tableName] = updatedObj.data.shift()
    returnObject.warnings = validatedFields.warnings

    if (returnObject.errors.length === 0) delete returnObject.errors
    return returnObject
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
