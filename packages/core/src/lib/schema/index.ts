import {
  Connection,
  ConnectionConfig,
  createConnection,
  MysqlError
} from 'mysql'
import { createDatabaseIfNotExists } from './database/create'
import { dropDatabase } from './database/drop'
import { createTable, INewTable } from './table/create'
import { Towel, TowelRecord } from '@lib/towel'
import { databaseConfig } from 'config'

export default class TowelSchema {
  private connection: Connection
  private ready: boolean

  /**
   *
   */
  constructor() {
    this.connection = createConnection(databaseConfig)
  }

  /**
   * Initializes the table schema and creates the database if necessary
   */
  public init(): Promise<this> {
    return new Promise((resolve, reject) => {
      if (this.connection.state === 'authenticated') {
        this.connection.query(
          'USE ??',
          this.connection.config.database,
          (err) => {
            if (err) reject(err)
            resolve(this)
          }
        )
      } else {
        this.connection.connect((connectionErr: MysqlError) => {
          if (connectionErr) {
            if (connectionErr.errno === 1049) {
              this.createDatabase(this.connection.config.database)
                .then(() => {
                  this.ready = true
                  resolve(this)
                })
                .catch((errCreatingDb: MysqlError) => {
                  reject(errCreatingDb)
                })
            } else if (connectionErr.errno === 1044) {
              reject(
                new Error(
                  'Current Mysql user does not have access to database ' +
                    this.connection.config.database
                )
              )
            } else {
              reject(connectionErr)
            }
          } else {
            this.ready = true
            resolve(this)
          }
        })
      }
    })
  }

  /**
   * Creates a database, then changes the session to use
   * the newly created database.
   * @param databaseName {string} Name of the database to create
   */
  public createDatabase(databaseName: string): Promise<this> {
    return new Promise((resolve, reject) => {
      createDatabaseIfNotExists(databaseName, this.connection)
        .then((newConn) => {
          this.connection = newConn
          resolve(this)
        })
        .catch(reject)
    })
  }

  /**
   * Drops the requirested database
   * @param databaseName {string} The database to drop
   */
  public dropDatabase(databaseName: string): Promise<this> {
    return new Promise((resolve, reject) => {
      if (!this.ready) {
        reject(new Error('Query called before connection was initialized'))
      }
      dropDatabase(databaseName, this.connection)
        .then((droppedConnection) => {
          this.connection = droppedConnection
          return resolve(this)
        })
        .catch(reject)
    })
  }

  /**
   * Creates a table according to the options passed
   * @param tableName {string} Name of the table to create
   * @param tableOpts {object} Options to be passed to table
   */
  public createTable(tableName: string, tableOpts: INewTable): Promise<this> {
    return new Promise((resolve, reject) => {
      if (!this.ready) {
        reject(new Error('Query called before connection was initialized'))
      }
      createTable(tableName, tableOpts, this.connection)
        .then((created: Connection) => {
          this.connection = created
          resolve(this)
        })
        .catch((err: MysqlError) => {
          reject(err)
        })
    })
  }
}
