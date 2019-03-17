/**
 * connection.ts
 * Provide the sql connection string
 */

// Node Modules
import { EventEmitter } from 'events'

// NPM Modules
import uuid = require('uuid/v4')
import { Pool, PoolConfig, createPool, PoolConnection } from 'mysql'

// Local Modules
import { getTables } from './ql/schema/constructSchema'
import { Log } from './log'
import { isBoolean } from './validation'
import { IResponseMessage } from '../../types/server'
import { resolve } from 'path'
import loadModule from './ql/hooks/loadHook'
import { IFieldError } from '../../types/api'

// Constants and global variables
const poolConfig: PoolConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'node',
  password: process.env.DB_PASS || 'development',
  database: process.env.DB_DB || 'thq',
  connectionLimit: parseInt(process.env.DB_POOL_LIMIT, 10) || 1
}

const jwtSecret = process.env.JWT_KEY || 'secret'
const HOOKS_DIR = resolve(__dirname, './hooks')

let pool: Pool
function getPool(): Pool {
  if (pool) {
    return pool
  }
  pool = createPool(poolConfig)
  return pool
}

async function simpleQuery(query: string, params?: any[]): Promise<any> {
  return new Promise((resolveQuery) => {
    getPool().getConnection((err, conn) => {
      if (err) conn.release()
      console.log(conn.format(query, params))
      conn.release()
    })
    getPool().query(query, params, (err: Error, results: any[]) => {
      if (err) throw err
      return resolveQuery(results)
    })
  })
}

class Querynator extends EventEmitter {
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
    return new Promise((resolveQuery, reject) => {
      this.pool.getConnection((err: Error, conn: PoolConnection) => {
        if (err) return reject(err)
        this.validate(conn, query, action !== null ? action : null)
          .then((authorized) => {
            if (authorized === true || authorized === 1) {
              if (
                process.env.STATEMENT_LOGGING === 'true' ||
                process.env.STATEMENT_LOGGING
              ) {
                console.log(conn.format(query, params))
              }
              conn.query(query, params, (qErr: Error, results: any[]) => {
                if (qErr) {
                  conn.rollback()
                  conn.release()
                  console.error(qErr)
                  throw err
                }
                conn.commit((cErr) => {
                  conn.release()
                  if (cErr) {
                    conn.rollback()
                    return reject(cErr)
                  }
                  // console.log(inspect(results))
                  return resolveQuery(results)
                })
              })
            } else {
              throw new Error('User unauthorized to perform that action.')
            }
          })
          .catch((qErr) => {
            try {
              conn.release()
            } catch (err) {
              console.error(err)
            }
            return reject(qErr.message)
          })
      })
    })
  }

  private async validateFieldIsValid(
    fieldInfo: {
      type: string
      readonly: boolean
      nullable: boolean
      reference: string
      tableRef: string
      maxLength: number
    },
    fieldValue: string | boolean | number
  ) {
    if (
      !fieldInfo.nullable &&
      (fieldValue === null || fieldValue === undefined)
    ) {
      throw new Error(`Value cannot be null`)
    } else if (fieldInfo.reference && fieldInfo.tableRef) {
      const row = await simpleQuery(
        'SELECT DISTINCT ?? FROM ?? WHERE ?? = ??',
        [
          fieldInfo.reference,
          fieldInfo.tableRef,
          fieldInfo.reference,
          fieldValue
        ]
      ).catch((e) => {
        throw new Error('Invalid reference')
      })
      if (Array.isArray(row) && row.length !== 0) return true
      else throw new Error('Invalid reference')
    } else if (fieldInfo.type === 'boolean') {
      if (isBoolean(fieldValue)) {
        return !!fieldValue
      } else {
        throw new Error('Expected boolean')
      }
    } else if (fieldInfo.type === 'string' && typeof fieldValue === 'string') {
      if (fieldInfo.maxLength) return fieldValue.slice(0, fieldInfo.maxLength)
      else return fieldValue
    } else if (fieldInfo.type === 'number') {
      if (typeof fieldInfo === 'number') return fieldInfo
      else if (
        typeof fieldValue === 'string' &&
        !isNaN(parseInt(fieldValue, 10))
      ) {
        return parseInt(fieldValue, 10)
      } else throw new Error('Expected number')
    } else throw new Error('Unknown exception occurred')
  }

  /**
   * Allow operators to be used with graphql queries in the format {field: "operator|value"}
   * @param fields Object containing field operators
   */
  private evaluateFieldOperator(field) {
    if (!field || typeof field !== 'string') return field
    const op = field.split('|')
    // Test for the existence of an operator
    if (op[1] && op[1] !== null && op[1].length > 0) {
      switch (op[0]) {
        case 'lt': {
          return {
            operator: '<',
            value: op[1]
          }
        }
        case 'gt': {
          return {
            operator: '>',
            value: op[1]
          }
        }
        case 'lte': {
          return {
            operator: '<=',
            value: op[1]
          }
        }
        case 'gte': {
          return {
            operator: '>=',
            value: op[1]
          }
        }
        case 'lk': {
          return {
            operator: 'LIKE',
            value: `%${op[1]}%` // op[1].replace('*', '%')
          }
        }
        default: {
          return {
            operator: '=',
            value: op[1]
          }
        }
      }
    } else {
      return {
        operator: '=',
        value: op
      }
    }
  }

  protected async queryBuilder(
    fields: string[] | string = this.queryFieldsArr
  ) {
    const schema = getTables()
    const tableCols = schema[this.tableName].columns
    const validFields = []
    const fieldPlaceholders = []
    const tableAliases = {} // Every table gets it's own alias, something like `sys_user` `t1`
    const baseStatement = 'SELECT '
    const tableParams = []
    const leftJoin = ' LEFT JOIN ?? ?? ON ??.?? = ??.?? '
    let tableAliasIndex = 1
    let fromStatement = ' FROM '
    let fieldArr
    if ((fields && fields[0] === '*') || !fields) {
      fieldArr = schema[this.tableName].defaultFields
    } else if (!Array.isArray(fields)) fieldArr = fields.split(',')
    else fieldArr = fields

    fieldArr.map((qField) => {
      const refCol = tableCols[qField]
      if (validFields.includes(qField)) return false // Prevent duplicate fields in queries
      if (refCol) {
        if (!refCol.localRef && !tableAliases[this.tableName]) {
          tableAliases[this.tableName] = `t${tableAliasIndex}` // Add the table to aliases
          fromStatement += ' ?? ?? ' // Provide for table alias e.g. `sys_user` `t1`
          tableParams.push(this.tableName, `t${tableAliasIndex}`) // Add params to field substution
          validFields.push(tableAliases[this.tableName], qField) // Add field value to params with alias
          tableAliasIndex++
          fieldPlaceholders.push('??.??')
        } else if (refCol.localRef && refCol.tableRef) {
          const alias = `t${tableAliasIndex}`
          if (!tableAliases[refCol.tableRef]) {
            tableAliases[refCol.tableRef] = alias
          }
          tableAliasIndex++

          fromStatement += leftJoin // Add the join statement, which requires 6 params
          /*
            Params required for joins:
              1. Name of the table that is being joined
              2. Alias of the table being joined
              3. Alias of the table on the left of the join
              4. Column from the table on the left of the join
              5. Alias of table being joined (same as 2)
              6. Column of the table being joined
          */
          tableParams.push(
            refCol.tableRef,
            alias,
            tableAliases[this.tableName],
            refCol.localRef,
            alias,
            refCol.reference
          )
          /*
            Params required for the select part of the query:
              1. table alias of table being joined
              2. column from joined table
              3. alias for this column
          */
          validFields.push(alias, refCol.displayAs, qField)
          fieldPlaceholders.push('??.?? AS ??')
        } else {
          validFields.push(tableAliases[this.tableName], qField)
          fieldPlaceholders.push('??.??')
        }
      } else {
        this.warnings.push({
          message: `Column "${qField}" does not exist on table "${
            this.tableName
          }"`
        })
      }
    })
    return {
      query: `${baseStatement} ${fieldPlaceholders.join(
        ', '
      )} ${fromStatement}`,
      params: Array.prototype.concat(validFields, tableParams),
      aliases: tableAliases,
      countField: validFields[1]
    }
    // return await simpleQuery(`${baseStatement} ${fieldPlaceholders.join(', ')} ${fromStatement}`, Array.prototype.concat(validFields, tableParams))
  }

  /**
   * Validate that the fields that are being queried are real fields
   * @param fields Object containing the fields to be validated against
   * @param aliases Table aliases received from this.queryBuilder
   */
  protected async validateFieldsExist(
    fields: string[],
    aliases?: any
  ): Promise<
    { validField: string[]; placeHolder: string; originalField: string }[]
  > {
    const schema = getTables()
    const validFields: {
      validField: string[]
      placeHolder: string
      originalField: string
    }[] = []

    fields.map((field) => {
      if (schema[this.tableName] && schema[this.tableName].columns[field]) {
        const ref = schema[this.tableName].columns[field]
        const thisField = {
          validField: [],
          placeHolder: '',
          originalField: ''
        }
        if (
          aliases &&
          aliases[ref.tableRef] &&
          schema[ref.tableRef] &&
          schema[ref.tableRef].columns[ref.displayAs]
        ) {
          thisField.validField.push(aliases[ref.tableRef], ref.displayAs)
          thisField.placeHolder = '??.??'
          thisField.originalField = field
        } else if (aliases && aliases[this.tableName]) {
          thisField.validField.push(aliases[this.tableName], field)
          thisField.placeHolder = '??.??'
          thisField.originalField = field
        } else if (aliases && !aliases[this.tableName]) {
          return false
        } else {
          thisField.validField.push(field)
          thisField.placeHolder = '??'
          thisField.originalField = field
        }
        validFields.push(thisField)
      }
    })
    return validFields
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
    const queryParams = await this.queryBuilder()
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
    {
      order,
      offset,
      limit
    }: {
      order?: { by?: string; direction?: 'ASC' | 'DESC' }
      offset?: number
      limit?: number
    }
  ) {
    const params = this.baseParams
    params.push(this.tableName)
    const queryParams = await this.queryBuilder()

    if (fields) {
      const validatedFields = await this.validateFieldsExist(
        Object.keys(fields),
        queryParams.aliases
      )
      if (validatedFields.length > 0) queryParams.query += ' WHERE '
      validatedFields.map((col, i) => {
        const fieldValue = fields[col.originalField]
        if (typeof fieldValue === 'string') {
          const parsedField = this.evaluateFieldOperator(fieldValue)
          queryParams.query +=
            col.placeHolder + ' ' + parsedField.operator + ' ?'
          queryParams.params = queryParams.params.concat(col.validField)
          queryParams.params.push(parsedField.value)
        } else if (Array.isArray(fields[col.originalField])) {
          queryParams.query += col.placeHolder + ' IN ?'
          queryParams.params = queryParams.params.concat(col.validField)
          queryParams.params.push(fields[col.originalField])
        } else {
          queryParams.query += col.placeHolder + ' = ?'
          queryParams.params = queryParams.params.concat(col.validField)
          queryParams.params.push(fieldValue)
        }
        if (i + 1 !== Object.keys(fields).length) queryParams.query += ' AND '
      })
    }

    // Query for count for meta information
    queryParams.params.unshift(queryParams.countField) // Add the primary key to the beginning of the array for the next query
    const count = await this.createQ({
      query:
        'SELECT COUNT(??) AS COUNT FROM (' +
        queryParams.query +
        ') AS COUNTING',
      params: queryParams.params
    })
    queryParams.params.shift() // Remove the primary key for the main query

    if (order && order.by && order.direction) {
      queryParams.query += 'ORDER BY ??'
      queryParams.query += order.direction === 'DESC' ? ' DESC' : ' ASC'
      queryParams.params.push(order.by)
    }

    if (limit !== null && !isNaN(limit)) {
      queryParams.query += ' LIMIT ' + limit
    }

    if (offset !== null && !isNaN(offset)) {
      queryParams.query += ' OFFSET ' + offset
    }

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

  /**
   * Return all rows
   * @param param0 Object containing the information for pagination
   */
  protected async all({
    limit,
    offset,
    order
  }: {
    limit?: number
    offset?: number
    order?: { by?: string; direction?: 'ASC' | 'DESC' }
  }) {
    const count = await this.createQ({
      query: 'SELECT COUNT(??) AS COUNT FROM ??',
      params: [this.primaryKey, this.tableName]
    })
    const queryParams = await this.queryBuilder() // The query with necessary joins
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
    if (hookHandle) {
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
    if (hookHandle) {
      try {
        console.log(
          '[HOOK_LOADER] RUNNING ' + updateHook + ' ON ' + this.tableName
        )
        updateFields = hookHandle(fields[this.primaryKey], fields).fields
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
      if (handle) {
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

export { getPool, jwtSecret, Querynator, simpleQuery, HOOKS_DIR }
