
/**
 * lib/ql/API.ts
 * Provide API URL parsing and field validation
*/

// Node Modules


// NPM Modules


// Local Modules
import { Querynator } from "../../connection";
import { Log } from "../../log";
import { rootQueries } from "./queries";
import rootMutations from "./mutations";
import constructSchema from "./constructSchema";


// Constants and global variables

interface APIResponse {
    status: number,
    body: {
        errors?: [{
            message: string
        }?],
        warnings?: [{
            message: string
        }?]
        meta?: any
        data?: any
    }
}

export default class APICall extends Querynator {
    response: APIResponse

    constructor(context) {
        super(context)
        this.response = {
            status: 200,
            body: {
                errors: [],
                warnings: [],
                data: {}
            },
        }
    }

    /* Send the response */
    protected sendResponse = () => this.context.res.status(this.response.status).json(this.response.body)
    

    /**
     * Log and handle any errors encountered in the resolver functions
     * @param err Error to be logged
     * @param terminatingError Whether the response should be sent or should wait until data is received
     */
    protected handleError(err: Error, terminatingError?: boolean) {
        const requestFailure = () => this.context.res.status(500).send(this.response.body)
        let message = ''
        if (typeof err === 'string') message = err
        else message = err.message

        this.response.body.errors.push({message})

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
        const queryTable = this.context.req.params.table
        if(rootMutations.create[queryTable]) {
            rootMutations.create[queryTable](this.context.req.query.fields, null, this.context)
            .then(rows => {
                this.response.body.data[queryTable] = rows[0]
                this.response.status = 201
                return this.sendResponse()
            })
            .catch(err => {
                return this.handleError(err, true)
            })
        } else {
            return this.handleError(new Error(`Table ${this.context.req.params.table} does not exist.`), true)
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

        /* Update the table by calling on the resolver function */
        if(rootMutations.update[queryTable] && id) {
            rootMutations.update[queryTable](queryFields, updateBody, this.context)
            .then(rows => {
                if (rows.errors) this.response.body.errors.push(rows.errors) 
                if (rows.warnings) this.response.body.warnings.push(rows.warnings) // Allow non-terminating errors to be passed in the response
                if (rows.data) {
                    this.response.body.data[queryTable] = rows.data[0]
                } else {
                    this.response.body.data[queryTable] = rows
                }
                this.response.status = 204
                return this.sendResponse()
            })
            .catch(err => {
                console.error(err)
                return this.handleError(err, true)
            })
        } else if (!id) {
            /* Require the ID to update any record */
            return this.handleError(new Error(`Cannot update table ${queryTable} because an invalid identifier was provided`), true)
        } else {
            /* In the event that no resolver is found in rootMutations.update */
            return this.handleError(new Error(`Table ${queryTable} does not exist.`), true)
        }
    } // update()

    /**
     * Delete requested record from DELETE request
     */
    public delete() {
        const queryTable = this.context.req.params.table
        const id = this.context.req.params.id
        const queryFields = this.context.req.query.fields
        if(rootMutations.delete[queryTable] && id) {
            /* Pass the query fields, null for the body and context */
            rootMutations.delete[queryTable](queryFields, null, this.context)
            .then(rows => {
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
            .catch(err => {
                return this.handleError(err, true)
            })
        } else {
            return this.handleError(new Error(`Table ${this.context.req.params.table} does not exist.`), true)
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
        const handler: Function = rootQueries[queryTable]
        const rawArgs: string = this.context.req.query.args
        const fields: string = this.context.req.query.fields
        let queryFields: string[] = []
        let args: any = null
        let order: {by?: string, direction?: 'ASC' | 'DESC'} = {}

        /* Optionally provide a fields argument */
        if (fields) {
            queryFields = fields.split(',')
        } else {
            /* The Querynator.buildQuery will recognize this as the default */
            queryFields = ['*']
        }
        if (rawArgs && rawArgs.length > 0 && rawArgs !== undefined) {
            args = {}
            rawArgs.split(',').map(arg => {
                let keyVal = arg.split('=')
                args[keyVal[0]] = keyVal[1]
            })
        }

        if (this.context.req.query.order_by) {
            order.by = this.context.req.query.order_by
            order.direction = this.context.req.query.order_direction || 'ASC'
        }
        if (queryTable && queryId && handler) {
            /* If both the ID and table is provided, query the single record */
            rootQueries[queryTable](queryFields, this.context.req.params.id, this.context)
            .then(rows => {
                if (rows.errors) this.response.body.errors.push(rows.errors) // Allow non-terminating errors to be passed in the response
                if (rows.warnings) this.response.body.warnings.push(rows.warnings)
                if (rows.data) {
                    this.response.body.data[queryTable] = rows.data[0]
                } else {
                    this.response.body.data[queryTable] = rows[0]
                }
                this.response.status = 200
                this.sendResponse()
            }, failure => {
                this.handleError(failure, true)
            })
            .catch(err => this.handleError(err, true))
        } else if (queryTable && handler) {
            /* If just the table is provided, query with the args */
            const pagination = {
                limit: parseInt(this.context.req.query.limit) || 20,
                offset: parseInt(this.context.req.query.offset) || 0,
                order
            }
            
            handler(queryFields, args, this.context, pagination)
            .then(rows => {
                if (rows.errors) this.response.body.errors.push(rows.errors) // Allow non-terminating errors to be passed in the response
                if (rows.warnings) this.response.body.warnings.push(rows.warnings)
                if (rows.meta) this.response.body.meta = rows.meta
                if (rows.data) {
                    this.response.body.data[queryTable] = rows.data
                } else {
                    this.response.body.data[queryTable] = rows
                }
                this.response.status = 200
                this.sendResponse()
            }, failure => {
                this.handleError(failure, true)
            })
            .catch(err => this.handleError(err, true))
        } else {
            this.handleError(new Error(`No data associated with request`), true)
        }
    } // query
}