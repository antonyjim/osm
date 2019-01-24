/**
 * connection.ts
 * Provide the sql connection string
*/

// Node Modules


// NPM Modules
import { Pool, PoolConfig, createPool, PoolConnection } from 'mysql'


// Local Modules


// Constants and global variables
const poolConfig: PoolConfig = {
    host    : 'localhost',
    user    : 'node',
    password: '0735f1c3-c220-4bd7-9c28-53a8945dbe6f',
    database: 'thq',
    connectionLimit: 1
}

const transporterSettings = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'tz7enfexgeicjpfo@ethereal.email',
        pass: 'Qw6SnGJy33Gumm5BgY'
    }
}

const jwtSecret = '33adcbf2-f404-482a-9ca6-6c1f091a7416'

let pool: Pool
function getPool(): Pool {
    if (pool) {return pool}
    pool = createPool(poolConfig)
    return pool
}

class Querynator {
    protected pool: Pool
    protected tableName: string
    protected primaryKey: string

    constructor() {
        this.pool = getPool()
    }

    public async createQ({query, params}: {query: string, params?: any}): Promise<any[] | any> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err: Error, conn: PoolConnection) => {
                if (err) return reject(err)
                console.log(conn.format(query, params))
                conn.query(query, params, (err: Error, results: any[]) => {
                    if (err) {
                        conn.release()
                        conn.rollback()
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
            })
        })
    }

    /**
     * Allow operators to be used with graphql queries in the format {field: "operator|value"}
     * @param fields Object containing field operators
     */
    private evaluateFieldOperator(field) {
        let op = field.split('|')
        // Test for the existence of an operator
        if (op[1]) {
            switch(op[0]) {
                case 'lt': {
                    return '<'
                }
                case 'gt': {
                    return '>'
                }
                case 'lte': {
                    return '<='
                }
                case 'gte': {
                    return '>='
                }
                case 'lk': {
                    return 'LIKE'
                }
                default: {
                    return '='
                }
            }
        } else {
            return '='
        }
    }

    protected async byId(reqId: string): Promise<any> {
        return (await this.createQ({
            query: 'SELECT * FROM ?? WHERE ?? = ? LIMIT 1',
            params: [this.tableName, this.primaryKey, reqId]
        })).shift()
    }

    protected byFields({fields, limit, offset, order}: {fields: any, limit?: number, offset?: number, order?: {by: string, direction: string}}) {
        let query = 'SELECT * FROM ?? WHERE '
        let params = [this.tableName]

        if (fields) {
            Object.keys(fields).forEach((col, i) => {
                let fieldValue = fields[col]
                if (typeof fieldValue === 'string') {
                    query += '?? ' + this.evaluateFieldOperator(fieldValue) + ' ?'
                } else {
                    query += '?? = ?'
                }
                params.push(col, fieldValue)
                if (i + 1 !== Object.keys(fields).length) query += ' AND '
            })
        }


        if (order !== undefined && order.by !== null && order.direction !== null) {
            query += 'ORDER BY ??'
            query += order.direction === 'DESC' ? ' DESC': ' ASC'
            params.push(order.by)
        }

        if (limit !== null && !isNaN(limit)) {
            query += ' LIMIT ' + limit
        }

        if (offset !== null && !isNaN(offset)) {
            query += ' OFFSET ??'
            params.push(offset.toString())
        }
        return this.createQ({query, params})
    }

    protected all(limit?, offset?) {
        let query: string = 'SELECT * FROM ??',
            params: Array<string> = [this.tableName]

        if (limit !== null && !isNaN(limit)) {
            query += ' LIMIT ' + limit
        } else {
            limit = 20
            query += ' LIMIT ' + limit
        }

        if (offset !== null && !isNaN(offset)) {
            query += ' OFFSET ??'
            params.push(offset.toString())
        }

        return this.createQ({query, params})
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