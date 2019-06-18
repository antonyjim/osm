/**
 * lib/ql/API.ts
 * Provide API URL parsing and field validation
 */

// Node Modules

// NPM Modules

// Local Modules
import { Querynator } from '../queries'
import { Log } from '../log'
import { rootQueries } from './schema/queries'
import rootMutations from './schema/mutations'
import { getTables } from '../model/constructSchema'
import {
  genericTableQuery,
  genericTableDelete,
  genericTableUpdate,
  genericTableCreate
} from './schema/GeneralTable'
import {
  IFieldMessage,
  IAPIByIdResponse,
  IAPIGetByFieldsResponse
} from '../../types/api'

// Constants and global variables

interface IAPIResponse {
  status: number
  body: {
    errors?: any[]
    warnings?: [
      {
        message: string
      }?
    ]
    info?: any[]
    meta?: any
    data?: any
  }
}

export default class APICall extends Querynator {
  private response: IAPIResponse

  constructor(context) {
    super(context)
    this.response = {
      status: 200,
      body: {
        errors: [],
        warnings: [],
        info: [],
        data: {}
      }
    }
  }

  /* Send the response */
  protected sendResponse = () =>
    this.context.res.status(this.response.status).json(this.response.body)

  /**
   * Log and handle any errors encountered in the resolver functions
   * @param err Error to be logged
   * @param terminatingError Whether the response should be sent or should wait until data is received
   */
  protected handleError(
    err: Error | IFieldMessage[],
    terminatingError?: boolean
  ) {
    // Use this for sending an internal server error response
    const requestFailure = () => {
      if (this.response.body.errors.length > 0) {
        this.context.res.status(200).send(this.response.body)
      } else {
        this.context.res.status(200).send(this.response.body)
      }
    }
    let message = null

    // An array may be passed to the error handler in the event of a bulk insert / update
    if (Array.isArray(err)) {
      this.response.body.errors = this.response.body.errors.concat(err)
      console.log('[API] Error in request %s', err)
      console.log(err)
    } else if (err && err.message) {
      if (typeof err === 'string') {
        message = err
      } else if (err && err.message) {
        message = err.message
      }
      console.log('[API] Error in request %s', message)
      console.log(err)
      this.response.body.errors.push({ message })
    } else {
      console.log('[API] No errors found')
      return 0
    }

    if (terminatingError) {
      requestFailure()
      new Log(message).error(3)
    } else {
      new Log(message).error(4)
    }
  } // handleError()

  /**
   * Create new users from a POST request
   */
  public create() {
    // rootQueries[queryTable](fields, this.context.req.params.id, this.context)
    const queryTable: string = this.context.req.params.table
    let handler
    if (rootMutations.create[queryTable]) {
      handler = rootMutations.create[queryTable]
    } else if (queryTable in getTables()) {
      handler = genericTableCreate
    }
    if (handler) {
      handler(
        this.context.req.query.fields,
        this.context.req.body,
        this.context
      )
        .then((rows) => {
          if (!rows) rows = {}
          if (rows.warnings) {
            Array.isArray(rows.warnings)
              ? this.response.body.warnings.concat(rows.warnings)
              : this.response.body.warnings.push(rows.warnings) // Allow non-terminating errors to be passed in the response
          }
          if (rows.errors) {
            Array.isArray(rows.errors) && rows.errors.length > 0
              ? (this.response.body.errors = rows.errors)
              : this.response.body.errors.push(rows.errors)
            this.response.status = 400
            return this.sendResponse()
          }
          if (Array.isArray(rows.info)) {
            this.response.body.info = this.response.body.info.concat(rows.info)
          }
          if (rows.data) {
            this.response.body.data[queryTable] = rows.data[queryTable]
          }
          this.response.status = 201
          return this.sendResponse()
        })
        .catch((err) => {
          console.error(err.stack)
          return this.handleError(err, true)
        })
    } else {
      return this.handleError(
        new Error(`Table ${this.context.req.params.table} does not exist.`),
        true
      )
    }
  } // create()

  /**
   * Update data received from PUT requests
   */
  public update() {
    const queryTable = this.context.req.params.table
    const id = this.context.req.params.id
    const updateBody = this.context.req.body
    const queryFields = this.context.req.query.fields
    let handler
    if (rootMutations.update[queryTable]) {
      handler = rootMutations.update[queryTable]
    } else if (queryTable in getTables()) {
      handler = genericTableUpdate
    }
    /* Update the table by calling on the resolver function */
    if (handler && id) {
      handler(queryFields, updateBody, this.context)
        .then(
          (rows) => {
            if (rows && rows.warnings) {
              console.log('Warnings received in the update for resource %s', id)
              console.log(rows.warnings)
              this.response.body.warnings.push(rows.warnings) // Allow non-terminating errors to be passed in the response
            }
            if (rows && rows.info) this.response.body.info.push(rows.info)
            if (
              (rows && Array.isArray(rows.errors) && rows.errors.length > 0) ||
              (rows && rows.errors && rows.errors.message)
            ) {
              return this.handleError(rows.errors, true)
            }

            if (rows && rows.data) {
              this.response.body.data[queryTable] = rows.data[0]
            } else {
              this.response.body.data[queryTable] = rows[0]
            }
            this.response.status = 204
            return this.sendResponse()
          },
          (onRejection) => {
            this.response.status = 401
            this.response.body.errors.push({ message: onRejection })
            this.sendResponse()
            console.error(onRejection)
          }
        )
        .catch((err) => {
          console.error(err)
          return this.handleError(err, true)
        })
    } else if (!id) {
      /* Require the ID to update any record */
      return this.handleError(
        new Error(
          `Cannot update table ${queryTable} because an invalid identifier was provided`
        ),
        true
      )
    } else {
      /* In the event that no resolver is found in rootMutations.update */
      return this.handleError(
        new Error(`Table ${queryTable} does not exist.`),
        true
      )
    }
  } // update()

  /**
   * Delete requested record from DELETE request
   */
  public delete() {
    const queryTable = this.context.req.params.table
    const id = this.context.req.params.id
    const queryFields = this.context.req.query.fields
    let handler
    if (rootMutations.delete[queryTable]) {
      handler = rootMutations.delete[queryTable]
    } else if (queryTable in getTables()) {
      handler = genericTableDelete
    }
    if (handler && id) {
      /* Pass the query fields, id and context */
      handler(queryFields, id, this.context)
        .then((rows) => {
          if (rows.errors) this.response.body.errors.push(rows.errors) // Allow non-terminating errors to be passed in the response
          if (rows.warnings) this.response.body.warnings.push(rows.warnings)
          if (rows.data) {
            this.response.body.data[queryTable] = rows.data[0]
          } else {
            this.response.body.data[queryTable] = rows[0]
          }
          this.response.status = 204
          return this.sendResponse()
        })
        .catch((err) => {
          return this.handleError(err, true)
        })
    } else {
      return this.handleError(
        new Error(`Table ${this.context.req.params.table} does not exist.`),
        true
      )
    }
  } // delete()

  /**
   * Provide a simple interface for accepting queries from /api/q/:table/:id
   * Arguments are passed in 2 ways:
   *  1. Pathname parameters:
   *    - table: represents the table name that is going to be queried
   *    - id: represents the value of the primary key for a specific resource
   *  2. Query string parameters:
   *    - fields: A comma separated list of fields that exist on the object
   *      NOTE: If no fields are provided, the response will default to displaying
   *      the defaults that are specified in the sys_db_dictionary table.
   *    - args: A comma separated list of key value pairs that will be evaluated
   *      as object. E.g. ?args=active=eq|true,name=lk|john*
   *    - order_by: A single column name to order the list
   *    - order_direction: Either DESC or ASC
   */
  public query(): void {
    const queryTable: string = this.context.req.params.table
    const queryId: string = this.context.req.params.id || false
    const rawArgs: string = this.context.req.query.args
    const fields: string = this.context.req.query.fields
    const order: { by?: string; direction?: 'ASC' | 'DESC' } = {}
    let queryFields: string[] = []
    let args: any = null
    let handler
    if (rootQueries[queryTable]) {
      handler = rootQueries[queryTable]
    } else if (
      (queryTable.endsWith('_list') &&
        queryTable.slice(0, -5) in getTables()) ||
      queryTable in getTables()
    ) {
      handler = genericTableQuery
    }

    // Optionally provide a fields argument.
    // If no fields are provided, the Querynator will choose defualts
    if (fields) queryFields = fields.split(',')

    if (rawArgs && rawArgs.length > 0 && rawArgs !== undefined) {
      args = {}
      rawArgs.split(',').map((arg) => {
        const keyVal = arg.split('=')
        args[keyVal[0]] = keyVal[1]
      })
    }

    if (this.context.req.query.order_by) {
      order.by = this.context.req.query.order_by
      order.direction = this.context.req.query.order_direction || 'ASC'
    }
    if (queryTable && !queryTable.endsWith('_list') && queryId && handler) {
      // If both the ID and table is provided, query the single record
      handler(queryFields, this.context.req.params.id, this.context)
        .then(
          (rows: IAPIByIdResponse) => {
            if (rows.errors) this.response.body.errors.concat(rows.errors) // Allow non-terminating errors to be passed in the response
            if (rows.warnings) this.response.body.warnings.concat(rows.warnings)
            if (rows.data) {
              this.response.body.data[queryTable] = rows.data[0]
            } else {
              this.response.body.data[queryTable] = rows[0]
            }
            this.response.status = 200
            this.sendResponse()
          },
          (failure) => {
            this.handleError(failure, true)
          }
        )
        .catch((err) => this.handleError(err, true))
    } else if (queryTable && handler) {
      /* If just the table is provided, query with the args */
      const pagination = {
        limit: parseInt(this.context.req.query.limit, 10) || 20,
        offset: parseInt(this.context.req.query.offset, 10) || 0,
        order
      }

      handler(queryFields, args, this.context, pagination)
        .then((rows: IAPIGetByFieldsResponse) => {
          if (rows.errors) this.response.body.errors.concat(rows.errors) // Allow non-terminating errors to be passed in the response
          if (rows.warnings) this.response.body.warnings.concat(rows.warnings)
          if (rows.meta) this.response.body.meta = rows.meta
          if (rows.data) {
            this.response.body.data[queryTable] = rows.data
          } else {
            this.response.body.data[queryTable] = rows
          }
          this.response.status = 200
          this.sendResponse()
        })
        .catch((err: Error) => {
          console.error(`[API] Caught at ${queryTable} for reason ${err}`)
          console.error(err.stack)
          this.handleError(err, true)
        })
    } else {
      this.handleError(new Error(`No data associated with request`), true)
    }
  } // query
}
