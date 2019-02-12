
/**
 * /lib/log.ts
 * Provide core logging features to the site
*/

// Node Modules


// NPM Modules

// Local Modules
import { getPool, Querynator } from "./connection";
import { resolve } from "url";

// Constants and global variables


class Log {
    tableName: string;
    requiresContext?: boolean;
    primaryKey?: string;
    message: string;

    constructor(message) {
        this.tableName = 'sys_log'
        this.requiresContext = false
        this.message = message
    }

    protected createQ({query, params}) {
        try {
            getPool().getConnection((err, conn) => {
                if (err) console.error(err.message)
                conn.query(query, params, (err, results) => {
                    if (err) console.error(err)
                    conn.commit((err) => {
                        conn.release()
                        if (err) conn.rollback()
                    })
                })
            })
        } catch(e) {
            console.error('CRITICAL LOGGING ERROR ' + e.message)
        }
    }

    public info(objectId?: string) {
        let log = ''
        let query = ''
        let params = [this.tableName]
        if (this.requiresContext) {
            if (!objectId) {
                throw new TypeError(`Logging to ${this.tableName} requires a primary key of ${this.primaryKey}`)
            }
            query = 'INSERT INTO ?? (??, log_message, log_severity) VALUES (?, ?, 5)'
            params.push(this.primaryKey)
            params.push(objectId)
        } else {
            query = 'INSERT INTO ?? (log_message, log_severity) VALUES (?, 5)'
        }
        if (typeof this.message !== 'string') {
            log = JSON.stringify(this.message).slice(0, 250)
        } else if (typeof this.message === 'string') {
            log = this.message.slice(0, 250)
        } else {
            console.error('Cannot log without a message')
        }
        console.log('INFO ' + new Date().toISOString().replace('T', ' ') + ': ' + log)
        params.push(log)
        this.createQ({query, params})
        return 0 
    }

    public error(severity: number = 3, objectId?: string) {
        console.error('ERROR(' + severity + ') ' + new Date().toISOString().replace('T', ' ') + ': ' + this.message)
        let log = ''
        let query = ''
        let params: any[] = [this.tableName]
        if (this.requiresContext) {
            if (!objectId) {
                throw new TypeError(`Logging errors to ${this.tableName} requires a primary key of ${this.primaryKey}`)
            }
            query = 'INSERT INTO ?? (??, log_message, log_severity) VALUES (?, ?, ?)'
            params.push(this.primaryKey)
            params.push(objectId)
        } else {
            query = 'INSERT INTO ?? (log_message) VALUES (?)'
        }
        if (this.message && typeof this.message !== 'string') {
            log = JSON.stringify(this.message).slice(0, 250)
        } else if (this.message && typeof this.message === 'string') {
            log = this.message.slice(0, 250)
        } else {
            console.error('Cannot log without a message')
        }
        params.push(log)
        params.push(severity)
        this.createQ({query, params})
    }

    public async get(timeframe: Date[], reqId?: string) {
        let query: string = ''
        let params = []
        if (timeframe.length === 2) {
            if (reqId && this.requiresContext) {
                query = 'SELECT * FROM ?? WHERE log_time BETWEEN ? AND ? AND ?? = ? ORDER BY log_time DESC'
                params = [
                    this.tableName,
                    timeframe[0],
                    timeframe[1],
                    this.primaryKey,
                    reqId
                ]
            } else if (!this.requiresContext) {
                query = 'SELECT * FROM ?? WHERE log_time BETWEEN ? AND ? ORDER BY log_time DESC'
                params = [
                    this.tableName,
                    timeframe[0],
                    timeframe[1]
                ]
            } else {
                throw new Error('Context is required to retrieve logs from ' + this.tableName)
            }
        } else {
            if (reqId && this.requiresContext) {
                query = 'SELECT * FROM ?? WHERE ?? = ? ORDER BY log_time DESC LIMIT 20'
                params = [
                    this.tableName,
                    this.primaryKey,
                    reqId
                ]
            } else if (!this.requiresContext) {
                query = 'SELECT * FROM ?? ORDER BY log_time DESC'
                params = [
                    this.tableName
                ]
            } else {
                throw new Error('Context is required to retrieve logs from ' + this.tableName)
            }
        }
        return await new Querynator().createQ({query, params}, 'CALL')
    }
}

class UserLog extends Log {
    constructor(message?) {
        super(message)
        this.tableName = 'sys_log_user'
        this.primaryKey = 'log_user'
        this.requiresContext = true
        this.message = message
    }
}

export { Log, UserLog }