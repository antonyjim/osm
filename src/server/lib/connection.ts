/**
 * connection.ts
 * Provide the sql connection string
*/

// Node Modules
import { EventEmitter } from 'events';

// NPM Modules
import uuid = require('uuid/v4');
import { Pool, PoolConfig, createPool, PoolConnection } from 'mysql'

// Local Modules
import constructSchema from './ql/schema/constructSchema';
import { Log } from './log';
import { isBoolean } from './validation';
import { inspect } from 'util';

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

function simpleQuery(query: string, params?: any[]): Promise<any[]> {
    return new Promise(resolve => {
        getPool().getConnection((err, conn) => {
            if (err) console.error(err)
            console.log(conn.format(query, params).toString())
            conn.release()
        })
        getPool().query(query, params, (err: Error, results: any[]) => {
            if (err) console.error(err)
            return resolve(results)
        })
    })
}


class Querynator extends EventEmitter {
    protected pool: Pool
    protected tableName: string
    protected primaryKey: string
    protected context: any
    protected baseParams: any[]
    protected queryFields: string
    private queryFieldsArr: string[]
    protected warnings: any[]
    protected errors: any[]

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
        this.tableName = ''
        this.warnings = []
        this.errors = []
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
                    conn.release()
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
                                console.log(inspect(results))
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

    private async validateFieldIsValid(
        fieldInfo: {type: string, readonly: boolean, nullable: boolean, reference: string, tableRef: string}, 
        fieldValue: string | boolean | number) {
            if (!fieldInfo.nullable && (fieldValue === null || fieldValue === undefined)) throw new Error(`Value cannot be null`)
            else if (fieldInfo.reference && fieldInfo.tableRef) {
                const row = await simpleQuery(
                    'SELECT DISTINCT ?? FROM ?? WHERE ?? = ??', 
                    [fieldInfo.reference, fieldInfo.tableRef, fieldInfo.reference, fieldValue]
                ).catch(e => {throw new Error('Invalid reference')})
                if (Array.isArray(row) && row.length !== 0) return true
                else throw new Error('Invalid reference')
            }
            else if (fieldInfo.type === 'boolean') {
                if (isBoolean(fieldValue)) {
                    return !!fieldValue
                } else {
                    throw new Error('Expected boolean')
                }
            }
            else if (fieldInfo.type === 'string' && typeof fieldValue === 'string') return fieldValue
            else if (fieldInfo.type === 'number') {
                if (typeof fieldInfo === 'number') return fieldInfo
                else if (typeof fieldValue === 'string' && parseInt(fieldValue) !== NaN) return parseInt(fieldValue)
                else throw new Error('Expected number')
            }
            else throw new Error('Unknown exception occurred')
    }

    /**
     * Allow operators to be used with graphql queries in the format {field: "operator|value"}
     * @param fields Object containing field operators
     */
    private evaluateFieldOperator(field) {
        if (!field || typeof field !== 'string') return field
        let op = field.split('|')
        // Test for the existence of an operator
        if (op[1] && op[1] !== null && op[1].length > 0) {
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
                        value: `%${op[1]}%` // op[1].replace('*', '%')
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

    protected async queryBuilder(fields: string[] | string = this.queryFieldsArr) {
        let schema = await constructSchema().catch(e => console.error(e))
        let tableCols = schema[this.tableName].columns
        let validFields = []
        let fieldPlaceholders = []
        let tableAliases = {} // Every table gets it's own alias, something like `sys_user` `t1`
        let tableAliasIndex = 1
        let baseStatement = 'SELECT '
        let fromStatement = ' FROM '
        let leftJoin = ' LEFT JOIN ?? ?? ON ??.?? = ??.?? '
        let tableParams = []
        let fieldArr
        if (fields && fields[0] === '*' || !fields) fieldArr = schema[this.tableName].defaultFields
        else if (!Array.isArray(fields)) fieldArr = fields.split(',')
        else fieldArr = fields

        fieldArr.map(qField => {
            let refCol = tableCols[qField]
            if (refCol) {
                if (!refCol.reference && !tableAliases[this.tableName]) {
                    tableAliases[this.tableName] = `t${tableAliasIndex}` // Add the table to aliases
                    fromStatement += ' ?? ?? ' // Provide for table alias e.g. `sys_user` `t1`
                    tableParams.push(this.tableName, `t${tableAliasIndex}`) // Add params to field substution
                    validFields.push(tableAliases[this.tableName], qField) // Add field value to params with alias
                    tableAliasIndex++
                    fieldPlaceholders.push('??.??')
                } else if (refCol.localRef && refCol.tableRef) {
                    let alias = `t${tableAliasIndex}`
                    if (!tableAliases[refCol.tableRef]) tableAliases[refCol.tableRef] = alias
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
                    validFields.push(
                        alias, 
                        refCol.displayAs,
                        qField
                    )
                    fieldPlaceholders.push('??.?? AS ??')
                } else {
                    validFields.push(tableAliases[this.tableName], qField)
                    fieldPlaceholders.push('??.??')
                }
            } else {
                this.warnings.push({
                    message: `Column "${qField}" does not exist on table "${this.tableName}"`
                })
            }
        })
        return {
            query: `${baseStatement} ${fieldPlaceholders.join(', ')} ${fromStatement}`,
            params: Array.prototype.concat(validFields, tableParams),
            aliases: tableAliases,
            countField: validFields[1]
        }
        // return await simpleQuery(`${baseStatement} ${fieldPlaceholders.join(', ')} ${fromStatement}`, Array.prototype.concat(validFields, tableParams))
    }

    protected async validateFieldsExist(fields: string[], aliases?: any): Promise<{validField: string[], placeHolder: string, originalField: string}[]> {
        const schema = await constructSchema().catch(e => console.error(e))
        let validFields: {validField: string[], placeHolder: string, originalField: string}[] = []

        fields.map(field => {
            if (schema[this.tableName] && schema[this.tableName].columns[field]) {
                let ref = schema[this.tableName].columns[field]
                let thisField = {
                    validField: [],
                    placeHolder: '',
                    originalField: ''
                }
                if (aliases 
                    && aliases[ref.tableRef] 
                    && schema[ref.tableRef] 
                    && schema[ref.tableRef].columns[ref.displayAs]) {
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

    protected async validateNewFields(providedFields: any): Promise<{errors: FieldError[], warnings: FieldError[], valid: any}> {
        const returnVal = {
            errors: [],
            warnings: [],
            valid: {}
        }
        const schema = await constructSchema().catch(e => console.error(e))
        const tableSchema = schema[this.tableName].columns
        if (!providedFields) throw new Error('Missing fields')
        Object.keys(tableSchema).map(async field => {
            if (field.endsWith('_display')) return false // Return for joined fields.
            if (!Object.keys(providedFields).includes(field)) return false

            const validOrNot = await this.validateFieldIsValid(tableSchema[field], providedFields[field])
            .catch(err => {
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

    /**
     * Validate fields provided in request bodies against the schema
     * defined in sys_db_dictionary
     * @param providedFields Fields provided in the body of the request
     */
    protected async validateUpdatedFields(providedFields: any): Promise<{errors: FieldError[], warnings: FieldError[], valid: any}> {
        const returnVal = {
            errors: [],
            warnings: [],
            valid: {}
        }
        const schema = await constructSchema().catch(e => console.error(e))
        const tableSchema = schema[this.tableName].columns
        delete providedFields[this.primaryKey] // Don't allow updates on primary keys
        if (!providedFields) throw new Error('Missing fields')
        Object.keys(tableSchema).map(async field => {
            if (field.endsWith('_display')) return false // Return for joined fields.
            if (!Object.keys(providedFields).includes(field)) return false

            const validOrNot = await this.validateFieldIsValid(tableSchema[field], providedFields[field])
            .catch(err => {
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

    protected async byId(reqId: string): Promise<any> {
        if (typeof reqId !== 'string') throw new TypeError(this.primaryKey + ' must be in string format')
        let id = reqId
        let queryParams = await this.queryBuilder()
        queryParams.query += ' WHERE ??.?? = ?'
        queryParams.params.push(queryParams.aliases[this.tableName], this.primaryKey, id)
        return ({
            warnings: this.warnings,
            data: await this.createQ(queryParams)
        })
    }

    protected async byFields({fields}: {fields: any}, {order, offset, limit}: {order?: {by?: string, direction?: 'ASC' | 'DESC'}, offset?: number, limit?: number}) {
        let params = this.baseParams
        params.push(this.tableName)
        let queryParams = await this.queryBuilder()
        
        if (fields) {
            const validatedFields = await this.validateFieldsExist(Object.keys(fields), queryParams.aliases)
            validatedFields.length > 0 ? queryParams.query += ' WHERE ' : void 0
            validatedFields.map((col, i) => {
                let fieldValue = fields[col.originalField]
                if (typeof fieldValue === 'string') {
                    let parsedField = this.evaluateFieldOperator(fieldValue)
                    queryParams.query += col.placeHolder + ' ' + parsedField.operator + ' ?'
                    queryParams.params = queryParams.params.concat(col.validField)
                    queryParams.params.push(parsedField.value)
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
        const count = await this.createQ({query: 'SELECT COUNT(??) AS COUNT FROM (' + queryParams.query + ') AS COUNTING', params: queryParams.params})
        queryParams.params.shift() // Remove the primary key for the main query

        if (order && order.by && order.direction) {
            queryParams.query += 'ORDER BY ??'
            queryParams.query += order.direction === 'DESC' ? ' DESC': ' ASC'
            queryParams.params.push(order.by)
        }

        if (limit !== null && !isNaN(limit)) {
            queryParams.query += ' LIMIT ' + limit
        }

        if (offset !== null && !isNaN(offset)) {
            queryParams.query += ' OFFSET ' + offset
        }

        return ({
            meta: {
                count: count[0].COUNT,
                from: offset < 1 ? 1 : offset,
                to: limit + offset > count[0].COUNT ? count[0].COUNT : limit + offset
            },
            warnings: this.warnings,
            data: await this.createQ(queryParams)
        })
    }

    /**
     * Return all rows
     * @param param0 Object containing the information for pagination
     */
    protected async all({limit, offset, order}: {limit?: number, offset?: number, order?: {by?: string, direction?: 'ASC' | 'DESC'}}) {
        const count = await this.createQ({query: 'SELECT COUNT(??) AS COUNT FROM ??', params: [ this.primaryKey, this.tableName ]})
        let queryParams = await this.queryBuilder() // The query with necessary joins
        if (limit && limit !== null && !isNaN(limit) && limit <= 100) { // Put a hard limit on 100 rows
            queryParams.query += ' LIMIT ' + limit
        } else {
            queryParams.query += ' LIMIT 20'
        }
        if (offset + limit > count[0].COUNT) offset = count[0].COUNT - limit < 0 ? 0 : count[0].COUNT - limit // Limit the offset to the max number of results
        else if (offset === null || isNaN(offset)) offset = 0 // Fallback to an offset of 0 if an invalid offset is provided
        queryParams.query += ' OFFSET ' + offset

        return ({
            meta: {
                count: count[0].COUNT,
                from: offset < 1 ? 1 : offset,
                to: limit + offset > count[0].COUNT ? count[0].COUNT : limit + offset
            },
            warnings: this.warnings,
            data: await this.createQ(queryParams)
        })
    }
    protected async insert(providedFields: any, id?: string) {
        id = this.primaryKey === 'sys_id' ? id = uuid() : id = id
        providedFields[this.primaryKey] = id

        const query = 'INSERT INTO ?? SET ?'
        const params = [this.tableName]
        let validatedFields = await this.validateNewFields(providedFields)
        let returnObject = {}
        let inserted
        if (validatedFields.errors.length > 0) {
            return {
                errors: validatedFields.errors,
                warnings: validatedFields.warnings
            }
        }
        params.push(validatedFields.valid)
        inserted = this.createQ({query, params}).catch(err => {
            this.errors.push(err)
            return {
                errors: this.errors,
                warnings: this.warnings
            }
        })
        if (inserted.changedRows === 0) returnObject['errors'].push({message: 'Record was not updated'})
        returnObject[this.tableName] = await this.byId(id)
        returnObject['warnings'] = validatedFields['warnings']

        return returnObject
    }

    protected async createUpdate(fields: any) {
        const query = 'UPDATE ?? SET ? WHERE ?? = ?'
        let validatedFields = await this.validateUpdatedFields(fields).catch(err => console.log(err))
        let params = []
        let changedRows
        let returnObject = {
            errors: [],
            warnings: [],
            data: {}
        }
        if (!validatedFields) return {
            errors: this.errors,
            warnings: this.warnings
        }
        if (validatedFields.valid[this.primaryKey]) delete validatedFields.valid[this.primaryKey]
        if (Object.keys(validatedFields.valid).length === 0) {
            validatedFields.errors.push({message: 'Could not update because of missing fields', field: 'all'})
        }
        if (this.errors.length > 0) {
            return {
                errors: this.errors,
                warnings: this.warnings
            }
        }
        params = [this.tableName, validatedFields.valid, this.primaryKey, this.context.req.params.id]
        changedRows = await this.createQ({query, params})
        if (changedRows.changedRows === 0) returnObject['errors'].push({message: 'Record was not updated'})
        returnObject.data[this.tableName] = await this.byId(this.context.req.params.id)
        returnObject['warnings'] = this.warnings

        return returnObject
    }
}

export { getPool, transporterSettings, jwtSecret, Querynator, simpleQuery }
