/**
 * lib/Querynator/querynator.ts
 * Bring everything together for the Querynator class
 */

// Node Modules
import { EventEmitter } from 'events'

// NPM Modules
import { v4 as uuid } from 'uuid'
import { Pool, PoolConnection } from 'mysql'

// Local Modules
import loadModule from '../api/hooks/loadHook'
import { IResponseMessage, IPagination } from '../../types/server'
import { IFieldError } from '../../types/api'
import { getTables } from '../api/schema/constructSchema'
import { getPool } from '../connection'
import { Log } from '../log'
import {
  validateFieldIsValid,
  validateFieldsExist
} from './builder/fieldValidator'
import { evaluateFieldOperator } from './builder/evalOperator'
import { queryBuilder } from './builder'
import { byFields as _byFields } from './builder/byFields'

// Constants and global variables

export class Querynator extends EventEmitter {
  private pool: Pool
  protected tableName: string
  protected deleteByDate?: boolean
  protected primaryKey: string
  protected context: any
  protected baseParams: any[]
  protected queryFields: string
  protected queryFieldsArr: string[]
  protected warnings: any[]
  protected errors: any[]
  private worker?: boolean
  protected tableSchema?: any

  // Methods
  private validateFieldIsValid = validateFieldIsValid
  private validateFieldsExist = validateFieldsExist
  private queryBuilder = queryBuilder

  /**
   * Create an interface for graphql to query from, with authorization included
   * @param context Context from the GQL query
   * @param queryFields Info from the GQL query
   */
  constructor(context?: any, queryFields?: string[], worker?: boolean) {
    super()
    this.pool = getPool()
    this.queryFieldsArr = queryFields
    this.baseParams = []
    this.context = context
    this.tableName = ''
    this.warnings = []
    this.errors = []
    this.worker = worker
    this.tableSchema = getTables()[this.tableName]
    this.once('init', () => {
      if (this.queryFieldsArr && Array.isArray(this.queryFieldsArr)) {
        const fieldPlaceholders: string[] = []
        this.queryFieldsArr.map((field) => {
          if (field === '*') {
            fieldPlaceholders.push('*')
          } else {
            fieldPlaceholders.push('??.??')
            this.baseParams.push(this.tableName, field)
          }
        })
        this.queryFields = fieldPlaceholders.join(', ')
      } else {
        this.queryFields = '*'
      }
    })
  }

  /**
   * Validate that the user is authorized to perform the requested action
   * @param conn Pool connection object
   * @param query Entire query, or just the verb
   * @param actionOverride Override the verb present in the query such as when calling a procedure
   */
  private async validate(
    conn: PoolConnection,
    query: string,
    actionOverride?: string
  ) {
    return new Promise((resolveAuthorized) => {
      if (actionOverride === 'CALL' || this.worker) {
        return resolveAuthorized(true)
      }
      const validationFunction = 'tbl_validation'
      const role = this.context.req.auth.r || 'No-Conf'
      const action = actionOverride || query.split(' ')[0]
      const params = [validationFunction, [role, this.tableName, action]]
      if (
        process.env.STATEMENT_LOGGING === 'true' ||
        process.env.STATEMENT_LOGGING
      ) {
        console.log(conn.format('SELECT ?? (?) AS AUTHED', params))
        // new Log(conn.format('SELECT ?? (?) AS AUTHED', params)).info()
      }
      conn.query('SELECT ?? (?) AS AUTHED', params, (err, authed) => {
        if (err) {
          new Log(err.message).error(1)
          throw err
        }
        if (authed[0]) {
          return resolveAuthorized(authed[0].AUTHED || false)
        } else {
          return resolveAuthorized(authed[0])
        }
      })
    })
  }

  /**
   * Create a query and return a promise containing th results
   * @param {object} queryParams Object containing the query and any params to be escaped
   * @param action Override the verb present in the query. CALL overrides all verbs
   */
  public async createQ(
    { query, params }: { query: string; params?: any },
    action?: string
  ): Promise<any[] | any> {
    return new Promise((resolveQuery, rejectQuery) => {
      this.pool.getConnection((err: Error, conn: PoolConnection) => {
        if (err) return rejectQuery(err)
        this.validate(conn, query, action !== null ? action : null)
          .then((authorized) => {
            if (authorized === true || authorized === 1) {
              if (
                process.env.STATEMENT_LOGGING === 'true' ||
                process.env.STATEMENT_LOGGING
              ) {
                console.log('[QUERYNATOR] %s', conn.format(query, params))
              }
              conn.query(query, params, (qErr: Error, results: any[]) => {
                if (qErr) {
                  conn.rollback()
                  conn.release()
                  console.error('[QUERYNATOR] ERROR IN QUERY %s', qErr.message)
                  throw qErr
                }
                conn.commit((commitErr) => {
                  conn.release()
                  if (commitErr) {
                    conn.rollback()
                    return rejectQuery(commitErr)
                  }
                  // console.log(inspect(results))
                  return resolveQuery(results)
                })
              })
            } else {
              throw new Error('User unauthorized to perform that action.')
            }
          })
          .catch((queryErr) => {
            try {
              conn.release()
            } catch (releaseConnErr) {
              console.error(releaseConnErr)
            }
            return rejectQuery(queryErr.message)
          })
      })
    })
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

      const validOrNot = await this.validateFieldIsValid(
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

  /**
   * Validate fields provided in request bodies against the schema
   * defined in sys_db_dictionary
   * @param providedFields Fields provided in the body of the request
   */
  protected async validateUpdatedFields(
    providedFields: any
  ): Promise<{ errors: IFieldError[]; warnings: IFieldError[]; valid: any }> {
    const returnVal = {
      errors: [],
      warnings: [],
      valid: {}
    }
    const schema = getTables()
    const tableSchema = schema[this.tableName].columns
    delete providedFields[this.primaryKey] // Don't allow updates on primary keys
    if (!providedFields) throw new Error('Missing fields')
    Object.keys(providedFields).map(async (field: string) => {
      if (field.endsWith('_display')) return false // Return for joined fields.
      if (!(field in tableSchema)) {
        return this.warnings.push({
          message: `Field ${field} does not exist on table ${this.tableName}`,
          field
        })
      }

      const validOrNot = await this.validateFieldIsValid(
        tableSchema[field],
        providedFields[field]
      ).catch((err) => {
        if (tableSchema[field].nullable) {
          this.warnings.push({
            message: err.message,
            field
          })
        } else {
          this.errors.push({
            message: err.message,
            field
          })
        }
      })

      returnVal.valid[field] = validOrNot
    })

    return returnVal
  }

  protected async byId(reqId: string): Promise<IResponseMessage> {
    if (typeof reqId !== 'string') {
      throw new TypeError(this.primaryKey + ' must be in string format')
    }
    const id = reqId
    const queryParams = await this.queryBuilder(
      this.tableName,
      this.queryFieldsArr
    )
    queryParams.query += ' WHERE ??.?? = ?'
    queryParams.params.push(
      queryParams.aliases[this.tableName],
      this.primaryKey,
      id
    )
    return {
      warnings: this.warnings,
      data: await this.createQ(queryParams)
    }
  }

  protected async byFields(
    { fields }: { fields: any },
    pagination: IPagination
  ) {
    const fieldParams = await _byFields(
      {
        fields: this.queryFieldsArr,
        args: fields,
        table: this.tableName,
        baseParams: this.baseParams
      },
      pagination
    )
    this.warnings.concat(fieldParams.warnings)

    return {
      meta: fieldParams.meta,
      data: await this.createQ(fieldParams.queryParams)
    }
  }

  /**
   * Return all rows
   * @param param0 Object containing the information for pagination
   */
  protected async all({ limit, offset, order }: IPagination) {
    const count = await this.createQ({
      query: 'SELECT COUNT(??) AS COUNT FROM ??',
      params: [this.primaryKey, this.tableName]
    })
    const queryParams = await this.queryBuilder(
      this.tableName,
      this.queryFieldsArr
    ) // The query with necessary joins
    if (limit && limit !== null && !isNaN(limit) && limit <= 100) {
      // Put a hard limit on 100 rows
      queryParams.query += ' LIMIT ' + limit
    } else {
      queryParams.query += ' LIMIT 20'
    }
    if (offset + limit > count[0].COUNT) {
      offset = count[0].COUNT - limit < 0 ? 0 : count[0].COUNT - limit
    }
    // Limit the offset to the max number of results
    else if (offset === null || isNaN(offset)) offset = 0 // Fallback to an offset of 0 if an invalid offset is provided
    queryParams.query += ' OFFSET ' + offset

    return {
      meta: {
        count: count[0].COUNT,
        from: offset < 1 ? 1 : offset,
        to: limit + offset > count[0].COUNT ? count[0].COUNT : limit + offset
      },
      warnings: this.warnings,
      data: await this.createQ(queryParams)
    }
  }

  protected async insert(providedFields: any) {
    let id
    if (this.primaryKey === 'sys_id') id = uuid()
    providedFields[this.primaryKey] = id

    const createHook = 'onBeforeUpdate'
    const hookHandle = loadModule(this.tableName, createHook)
    let insertFields = { ...providedFields }
    // Execute hook handle
    if (typeof hookHandle === 'function') {
      try {
        console.log(
          '[HOOK_LOADER] RUNNING ' + createHook + ' ON ' + this.tableName
        )
        insertFields = hookHandle(
          providedFields[this.primaryKey],
          providedFields
        ).fields
      } catch (err) {
        console.log(
          '[HOOK_LOADER] ENCOUNTERED ERROR AT ' +
            createHook +
            ' ON ' +
            this.tableName
        )
        console.error(err)
        insertFields = providedFields
      }
    } else {
      insertFields = providedFields
    }

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
    inserted = await this.createQ({ query, params }).catch((err) => {
      this.errors.push(err)
      return {
        errors: this.errors,
        warnings: this.warnings
      }
    })
    if (inserted.affectedRows === 0) {
      returnObject.errors.push({ message: 'Record was not created' })
    } else {
      returnObject.info.push({ message: 'Record was successfully created' })
    }

    const updatedObj = await this.byId(id)

    returnObject.data[this.tableName] = updatedObj.data.shift()
    returnObject.warnings = validatedFields.warnings

    if (returnObject.errors.length === 0) delete returnObject.errors
    return returnObject
  }

  protected async createUpdate(fields: any) {
    // Search for update hook handler for this table
    const updateHook = 'onBeforeUpdate'
    const hookHandle = loadModule(this.tableName, updateHook)
    let updateFields = {}
    // Execute hook handle
    if (typeof hookHandle === 'function') {
      try {
        console.log(
          '[HOOK_LOADER] RUNNING ' + updateHook + ' ON ' + this.tableName
        )
        updateFields = hookHandle(fields[this.primaryKey], fields)
          .confirmedFields
      } catch (err) {
        console.log(
          '[HOOK_LOADER] ENCOUNTERED ERROR AT ' +
            updateHook +
            ' ON ' +
            this.tableName
        )
        console.error(err)
        updateFields = fields
      }
    } else {
      updateFields = fields
    }

    const query = 'UPDATE ?? SET ? WHERE ?? = ?'
    const validatedFields = await this.validateUpdatedFields(
      updateFields
    ).catch((err) => {
      console.log(err)
      throw err
    })

    let params = []
    let changedRows
    const returnObject = {
      errors: [],
      warnings: []
    }
    if (Object.keys(validatedFields.valid).length === 0) {
      return {
        errors: this.errors,
        warnings: this.warnings
      }
    }

    if (validatedFields.valid[this.primaryKey]) {
      delete validatedFields.valid[this.primaryKey]
    }
    if (Object.keys(validatedFields.valid).length === 0) {
      validatedFields.errors.push({
        message: 'Could not update because of missing fields',
        field: 'all'
      })
    }
    if (this.errors.length > 0) {
      return {
        errors: this.errors,
        warnings: this.warnings
      }
    }
    params = [
      this.tableName,
      validatedFields.valid,
      this.primaryKey,
      this.context.req.params.id
    ]
    changedRows = await this.createQ({ query, params })
    if (changedRows.affectedRows === 0) {
      returnObject.errors.push({ message: 'Record was not updated' })
    } else {
      const afterUpdateHook = 'onAfterUpdated'
      const handle = loadModule(this.tableName, afterUpdateHook)
      if (handle && typeof handle === 'function') {
        ;(async () => {
          try {
            handle(this.context.req.params.id, validatedFields.valid)
          } catch (err) {
            console.error(err)
            console.log(
              '[HOOK_LOADER] ENCOUNTERED ERROR AT ' +
                afterUpdateHook +
                ' ON ' +
                this.tableName
            )
          }
        })()
      } else {
        console.log(
          '[HOOK_LOADER] Hook was found, but typeof hook was %s',
          typeof handle
        )
      }
    }

    if (this.warnings.length > 0) returnObject.warnings = this.warnings

    return returnObject
  }

  protected async deleteRecord(id) {
    const permanentDeleteQuery = 'DELETE FROM ?? WHERE ?? = ?'
    const setDeleteDateQuery = 'UPDATE ?? SET ? WHERE ?? = ?'
    const permanentDeleteParams = [this.tableName, this.primaryKey, id]

    return await this.createQ({
      query: permanentDeleteQuery,
      params: permanentDeleteParams
    }).catch((err) => {
      console.log(err)
    })
  }
}
