/**
 * connection.ts
 * Provide the sql connection string
*/

// Node Modules


// NPM Modules
import { Pool, PoolConfig, createPool, PoolConnection } from 'mysql'
import { Log } from './log';
import { EventEmitter } from 'events';


// Local Modules


// Constants and global variables
const poolConfig: PoolConfig = {
    host    : process.env.DB_HOST || 'localhost',
    user    : process.env.DB_USER || 'node',
    password: process.env.DB_PASS || 'development',
    database: process.env.DB_DB || 'thq',
    connectionLimit: parseInt(process.env.DB_POOL_LIMIT) || 1
}

const transporterSettings = {
    host: process.env.HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT) || 587,
    auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || ''
    }
}

const jwtSecret = process.env.JWT_KEY || 'secret'

let pool: Pool
function getPool(): Pool {
    if (pool) {return pool}
    pool = createPool(poolConfig)
    return pool
}

class Querynator extends EventEmitter {
    protected pool: Pool
    protected tableName: string
    protected primaryKey: string
    protected context: any
    protected baseParams: any[]
    protected queryFields: string
    private queryFieldsArr: string[]

    /**
     * Create an interface for graphql to query from, with authorization included
     * @param context Context from the GQL query
     * @param queryFields Info from the GQL query
     */
    constructor(context?: any, queryFields?: string[]) {
        super()
        this.pool = getPool()
        this.queryFieldsArr = queryFields
        this.baseParams = []
        this.context = context
        this.tableName =  ''
        this.once('init', () => {
            if (this.queryFieldsArr && Array.isArray(this.queryFieldsArr)) {
                let fieldPlaceholders: string[] = []
                this.queryFieldsArr.map(field => {
                    if (field === '*') {
                        fieldPlaceholders.push('*')    
                    } else {
                        fieldPlaceholders.push('??.??')
                        this.baseParams.push(this.tableName, field)
                    }
                })
                this.queryFields = fieldPlaceholders.join(', ')
            }
        })
    }

    /**
     * Validate that the user is authorized to perform the requested action
     * @param conn Pool connection object
     * @param query Entire query, or just the verb
     * @param actionOverride Override the verb present in the query such as when calling a procedure
     */
    private async validate(conn: PoolConnection, query: string, actionOverride?: string) {
        return new Promise(resolve => {
            if (actionOverride === 'CALL') {
                return resolve(true)
            }
            const validationFunction = 'tbl_validation'
            const role = this.context.req.auth.r || 'No-Conf'
            const action = actionOverride || query.split(' ')[0]
            let params = [validationFunction, [role, this.tableName, action]]
            if (process.env.STATEMENT_LOGGING === 'true' || process.env.STATEMENT_LOGGING) {
                new Log(conn.format('SELECT ?? (?) AS AUTHED', params)).info()
            }
            conn.query('SELECT ?? (?) AS AUTHED', params, (err, authed) => {
                if (err) {
                    new Log(err.message).error(1)
                    throw err
                }
                if (authed[0]) {
                    return resolve(authed[0].AUTHED || false)
                } else {
                    return resolve(authed[0])
                }
            })
        })
    }

    /**
     * Create a query and return a promise containing th results
     * @param {object} queryParams Object containing the query and any params to be escaped 
     * @param action Override the verb present in the query. CALL overrides all verbs
     */
    public async createQ({query, params}: {query: string, params?: any}, action?: string): Promise<any[] | any> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: Error, conn: PoolConnection) => {
                if (err) return reject(err)
                this.validate(conn, query, action !== null ? action: null)
                .then((authorized) => {
                    if (authorized === true || authorized === 1) {
                        if (process.env.STATEMENT_LOGGING === 'true' || process.env.STATEMENT_LOGGING) {
                            console.log(conn.format(query, params))
                            // new Log(conn.format(query, params)).info()
                        }
                        conn.query(query, params, (err: Error, results: any[]) => {
                            if (err) {
                                conn.rollback()
                                conn.release()
                                return reject(err)
                            }
                            conn.commit((err) => {
                                conn.release()
                                if (err) {
                                    conn.rollback()
                                    return reject(err)
                                }
                                return resolve(results)
                            })
                        })
                    } else {
                        return reject('User unauthorized to perform that action.')
                    }
                })
                .catch(err => {
                    return reject(err.message)
                })
            })
        })
    }

    protected updateById(id) {
        
    }

    /**
     * Allow operators to be used with graphql queries in the format {field: "operator|value"}
     * @param fields Object containing field operators
     */
    private evaluateFieldOperator(field) {
        if (!field || typeof field !== 'string') return field
        let op = field.split('|')
        let fieldInfo = {
            operator: '',
            value: ''
        }
        // Test for the existence of an operator
        if (op[1]) {
            switch(op[0]) {
                case 'lt': {
                    return ({
                        operator: '<',
                        value: op[1]
                    })
                }
                case 'gt': {
                    return ({
                        operator: '>',
                        value: op[1]
                    })
                }
                case 'lte': {
                    return ({
                        operator: '<=',
                        value: op[1]
                    })
                }
                case 'gte': {
                    return ({
                        operator: '>=',
                        value: op[1]
                    })
                }
                case 'lk': {
                    return ({
                        operator: 'LIKE',
                        value: op[1].replace('*', '%')
                    })
                }
                default: {
                    return ({
                        operator: '=',
                        value: op[1]
                    })
                }
            }
        } else {
            return ({
                operator: '=',
                value: op
            })
        }
    }

    protected async byId(reqId: string): Promise<any> {
        if (typeof reqId !== 'string') throw new TypeError(this.primaryKey + ' must be in string format')
        let params: any[] = this.baseParams
        let query: string = ''
        let id = reqId
        query = 'SELECT ' + this.queryFields + ' FROM ?? WHERE ?? = ?'
        params.push(this.tableName, this.primaryKey, id)
        return this.createQ({
            query,
            params
        })
    }

    protected async byFields({fields}: {fields: any}, {order, offset, limit}: {order?: {by?: string, direction?: 'ASC' | 'DESC'}, offset?: number, limit?: number}) {
        let query = 'SELECT ' + this.queryFields + ' FROM ?? WHERE '
        let params = this.baseParams
        params.push(this.tableName + '_list')

        if (fields) {
            Object.keys(fields).forEach((col, i) => {
                let fieldValue = fields[col]
                if (typeof fieldValue === 'string') {
                    let parsedField = this.evaluateFieldOperator(fieldValue)
                    query += '?? ' + parsedField.operator + ' ?'
                    params.push(col, parsedField.value)
                } else {
                    query += '?? = ?'
                    params.push(col, fieldValue)
                }
                if (i + 1 !== Object.keys(fields).length) query += ' AND '
            })
        }


        if (order && order.by && order.direction) {
            query += 'ORDER BY ??'
            query += order.direction === 'DESC' ? ' DESC': ' ASC'
            params.push(order.by)
        }

        if (limit !== null && !isNaN(limit)) {
            query += ' LIMIT ' + limit
        }

        if (offset !== null && !isNaN(offset)) {
            query += ' OFFSET ' + offset
        }
        return await this.createQ({query, params})
    }

    protected async all({limit, offset, order}: {limit?: number, offset?: number, order?: {by?: string, direction?: 'ASC' | 'DESC'}}) {
        let query: string = 'SELECT * FROM ??',
            params: Array<string> = [ this.tableName + '_list' ]

        if (limit && limit !== null && !isNaN(limit)) {
            query += ' LIMIT ' + limit
        } else {
            query += ' LIMIT 20'
        }

        if (offset !== null && !isNaN(offset)) {
            query += ' OFFSET ' + offset
        }

        return await this.createQ({query, params})
    }

    protected async insert({query, params}) {
        return this.createQ({query, params})
    }

    protected createUpdate(fields: any, id: string) {
        const query = 'UPDATE ?? SET ? WHERE ?? = ?'
        const params = [this.tableName, fields, this.primaryKey, id]
        return this.createQ({query, params})
    }
}

export { getPool, transporterSettings, jwtSecret, Querynator }
