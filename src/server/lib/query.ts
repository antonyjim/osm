/**
 * query.ts
 * Provide a standard table query method
*/

// Node Modules
import { Pool } from 'mysql';

// NPM Modules


// Local Modules
import { getPool } from './connection'
import { StatusMessage, QueryResponse } from '../types/server';

// Constants and global variables
const pool: Pool = getPool()

const tables = {
    rolePermissions: {
        rpId: {
            type: 'string',
            length: 9
        },
        rpPriv: {
            type: 'string',
            length: 36
        }
    },
    nsInfo: {
        nsNonsig: {
            type: 'string',
            length: 9
        },
        nsTradeStyle: {
            type: 'string',
            length: 100
        },
        nsAddr1: {
            type: 'string',
            length: 40
        },
        nsAddr2: {
            type: 'string',
            length: 40
        },
        nsCity: {
            type: 'string',
            length: 40
        },
        nsState: {
            type: 'string',
            length: 2
        },
        nsPostalCode: {
            type: 'string',
            length: 10
        },
        nsCountry: {
            type: 'string',
            length: 2
        },
        nsIsActive: {
            type: 'bool'
        }
    },
    nsAccess: {

    }
}

function formatQuery(column: string, query: any, format: any): string {
    let statement: string = ''
    let notModifier: boolean = false
    let textOperator: string = query.split('^')[0]
    let operator: string = ''
    let val = query.split('^')[1]

    switch(textOperator) { 
        case 'eq': {
            operator = ' = '
            break
        } case 'ne': {
            operator = ' = '
            notModifier = true
            break
        } case 'gt': {
            operator = ' > '
            break
        } case 'lt': {
            operator = ' < '
            break
        } case 'gte': {
            operator = ' >= '
            break
        } case 'lte': {
            operator = ' <= '
            break
        } case 'lk': {
            operator = ' LIKE '
            break
        } case 'nlk': {
            operator = ' LIKE '
            notModifier = true
            break
        } default: {
            return null
        }
    }

    if (format.type === 'string' && typeof query !== 'string') return ''
    else if (format.type === 'number') {
        val = parseInt(val)
        if (val === NaN) return ''
    } else if (format.type === 'date') {
        val = new Date(val)
        if (val == 'Invalid Date') return ''
    } else {
        return ''
    }
    statement = (notModifier ? 'NOT ': '') + column + operator + pool.escape(val)
    return statement
}

function queryResponse(error, message, results): QueryResponse {
    return {
        error,
        message,
        results,
        count: results.length
    }
}

export function queryTable(table: string, rawQuery: any): Promise<StatusMessage> {
    return new Promise((resolve, reject) => {
        if (tables[table]) {
            let columns = tables[table]
            let conditions = []
            let query: string = ''
            for (let col in Object.keys(rawQuery)) {
                if (columns[col]) {
                    conditions.push(formatQuery(col, rawQuery[col], columns[col]))
                } else {
                    continue
                }
            }
            query = `
                SELECT ${Object.keys(tables[table]).join(',')}
                FROM ${table}
                ${conditions.length > 0 ? 'WHERE' + conditions.join(' AND '): ''}
            `
            console.log(query)
            pool.query(query, (err: Error, results) => {
                if (err) throw err
                resolve(queryResponse(false, 'Retrieved ', results))
            })
        } else {
            reject({
                error: true,
                message: 'Requested table does not exist'
            })
        }
    })
}