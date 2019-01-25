
/**
 * /lib/log.ts
 * Provide core logging features to the site
*/

// Node Modules


// NPM Modules

// Local Modules
import { getPool } from "./connection";

// Constants and global variables


class Log {
    tableName: string;
    requiresContext?: boolean;
    primaryKey?: string;

    constructor() {
        this.tableName = 'sys_log'
        this.requiresContext = false
    }

    private createQ({query, params}) {
        let pool = getPool()
        pool.query(query, params, (err) => {
            if (err) console.error(err)
        })
    }

    public message(message: string, objectId?: string) {
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
            query = 'INSERT INTO ?? (log_message) VALUES (?)'
        }
        if (typeof message !== 'string') {
            log = JSON.stringify(message).slice(0, 100)
        } else {
            log = message.slice(0, 100)
        }
        params.push(log)
        this.createQ({query, params})
        return 0
    }

    public error(message: string, severity: number = 3, objectId?: string) {
        let log = ''
        let query = ''
        let params: any[] = [this.tableName]
        if (this.requiresContext) {
            if (!objectId) {
                throw new TypeError(`Logging to ${this.tableName} requires a primary key of ${this.primaryKey}`)
            }
            query = 'INSERT INTO ?? (??, log_message, log_severity) VALUES (?, ?, ?)'
            params.push(this.primaryKey)
            params.push(objectId)
        } else {
            query = 'INSERT INTO ?? (log_message) VALUES (?)'
        }
        if (typeof message !== 'string') {
            log = JSON.stringify(message).slice(0, 100)
        } else {
            log = message.slice(0, 100)
        }
        params.push(log)
        params.push(severity)
        this.createQ({query, params})
    }
}

class UserLog extends Log {
    constructor() {
        super()
        this.tableName = 'sys_log_user'
        this.primaryKey = 'log_user'
        this.requiresContext = true
    }
}

export { Log, UserLog }