/**
 * /lib/log.ts
 * Provide core logging features to the site
 */

// Node Modules

// NPM Modules

// Local Modules
import { Querynator, simpleQuery } from './queries'

// Constants and global variables

class Log {
  private tableName: string
  private requiresContext?: boolean
  private primaryKey?: string
  private message: string

  constructor(
    message: string,
    context?: { table: string; primaryKey: string }
  ) {
    if (context && !context.primaryKey && context.table) {
      console.error(
        'When a log table is supplied, a primary key must also be supplied'
      )
    } else if (!message) {
      console.error(
        new TypeError('Any logging requires a message to be supplied')
      )
    } else if (context && context.table && context.primaryKey) {
      console.log(`Context of ${context} supplied`)
      context.table.endsWith('_log')
        ? (this.tableName = context.table)
        : (this.tableName = context.table + '_log')
      this.primaryKey = context.primaryKey
      this.requiresContext = true
      this.message = message
    } else if (!message && !context) {
      console.error('Any logging requires a message to be supplied')
    } else {
      this.tableName = 'sys_log'
      this.requiresContext = false
      this.message = message
    }
  }

  protected createQ({ query, params }) {
    try {
      simpleQuery(query, params)
    } catch (e) {
      console.error('CRITICAL LOGGING ERROR ' + e.message)
    }
  }

  public info(objectId?: string) {
    const params = [this.tableName]
    let log = ''
    let query = ''
    if (this.requiresContext) {
      if (!objectId) {
        console.error(
          new TypeError(
            `Logging to ${this.tableName} requires a primary key of ${
              this.primaryKey
            }`
          )
        )
      }
      query = 'INSERT INTO ?? (??, log_message, log_severity) VALUES (?, ?, 5)'
      params.push(this.primaryKey)
      params.push(objectId)
    } else {
      query = 'INSERT INTO ?? (log_message, log_severity) VALUES (?, 5)'
    }
    if (this.message && typeof this.message !== 'string') {
      log = JSON.stringify(this.message)
    } else if (typeof this.message === 'string') {
      log = this.message
    } else {
      console.error('Cannot log without a message')
    }
    console.log(
      'INFO ' + new Date().toISOString().replace('T', ' ') + ': ' + log
    )
    params.push(log)
    this.createQ({ query, params })
    return 0
  }

  public error(severity: number = 3, objectId?: string) {
    if (!this.message) return null
    console.error(
      'ERROR(' +
        severity +
        ') ' +
        new Date().toISOString().replace('T', ' ') +
        ': ' +
        this.message
    )
    let log = ''
    let query = ''
    const params: any[] = [this.tableName]
    if (this.requiresContext) {
      if (!objectId) {
        console.error(
          new TypeError(
            `Logging errors to ${this.tableName} requires a primary key of ${
              this.primaryKey
            }`
          )
        )
      }
      query = 'INSERT INTO ?? (??, log_message, log_severity) VALUES (?, ?, ?)'
      params.push(this.primaryKey)
      params.push(objectId)
    } else {
      query = 'INSERT INTO ?? (log_message) VALUES (?)'
    }
    if (this.message && typeof this.message !== 'string') {
      log = JSON.stringify(this.message)
    } else if (this.message && typeof this.message === 'string') {
      log = this.message
    } else {
      console.error('Cannot log without a message')
    }
    params.push(log)
    params.push(severity)
    this.createQ({ query, params })
  }

  public async get(timeframe: Date[], reqId?: string) {
    let query: string = ''
    let params = []
    if (timeframe.length === 2) {
      if (reqId && this.requiresContext) {
        query =
          'SELECT * FROM ?? WHERE log_time BETWEEN ? AND ? AND ?? = ? ORDER BY log_time DESC'
        params = [
          this.tableName,
          timeframe[0],
          timeframe[1],
          this.primaryKey,
          reqId
        ]
      } else if (!this.requiresContext) {
        query =
          'SELECT * FROM ?? WHERE log_time BETWEEN ? AND ? ORDER BY log_time DESC'
        params = [this.tableName, timeframe[0], timeframe[1]]
      } else {
        console.error(
          new Error(
            'Context is required to retrieve logs from ' + this.tableName
          )
        )
      }
    } else {
      if (reqId && this.requiresContext) {
        query = 'SELECT * FROM ?? WHERE ?? = ? ORDER BY log_time DESC LIMIT 20'
        params = [this.tableName, this.primaryKey, reqId]
      } else if (!this.requiresContext) {
        query = 'SELECT * FROM ?? ORDER BY log_time DESC'
        params = [this.tableName]
      } else {
        console.error(
          new Error(
            'Context is required to retrieve logs from ' + this.tableName
          )
        )
      }
    }
    return await new Querynator().createQ({ query, params }, 'CALL')
  }
}

function RequestLog(method: string, uri: string) {
  const params: string[] = [
    'sys_log_request',
    'request_uri',
    uri,
    'request_method',
    method
  ]
  const query: string = 'INSERT INTO ?? SET ?? = ?, ?? = ?'
  simpleQuery(query, params).catch((err) => {
    console.error(err)
  })
}

export { Log, RequestLog }
