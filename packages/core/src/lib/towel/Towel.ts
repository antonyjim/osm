// import * as Towel from '../Towel'
import { ConnectionConfig, Pool, Connection } from 'mysql'
import { evaluateFieldOperator } from '@lib/towel/internals/builder/evalOperator'
import { init } from './internals/connection'
import { TowelTypes } from './types/towel'

// import { Towel } from '../Towel'

/**
 * Creates a new database operation
 * @class
 */
export class Towel {
  // The table that is being worked on
  private tableName: string

  // Indicates whether mysql.query has run.
  // If so, will throw an error
  private hasQueried: boolean = false

  // Indicates query type.
  // Will throw an error if updateById is
  // called is type is select etc...
  private queryType: TowelTypes.QueryTypes = 0

  // List of fields to be returned from select query
  private fieldList: string[] = []

  // List of conditions and values to be used in
  // select and update queries
  private conditions: { [key: string]: TowelTypes.IQueryOperator } = {}

  // List of aggregates to be used in select query
  private aggregates?: { [key in TowelTypes.AggregateTypes]: string }

  // Provide access to raw connection
  private rawConnection: Connection

  private error?: Error

  /**
   * Returns a new Towel instance with the table passed.
   * @param table Name of primary table being queried
   */
  constructor(table: string, queryFieldList?: string[]) {
    if (!table) {
      throw new Error('Table must be provided to towel!')
    }
    if (queryFieldList) {
      this.fieldList = queryFieldList
    }
    this.tableName = table
  }

  /**
   * Provide the towel with database information to establish a connection
   * and connect to the specified database. Any parameters not defined will
   * be read from process.env
   * @param { Object } param0 Provide database information.
   */
  public static init = init

  /**
   *
   * @param { Array<string> } fieldNames Field list to return from query
   * @returns { Towel }
   */
  public setFields(fieldNames: [string]): this {
    if (!Array.isArray(fieldNames)) {
    } else {
      this.fieldList = fieldNames
      return this
    }
  }

  /**
   * Add a condition to a new SELECT / UPDATE / DELETE query
   * @param { string } column Column to filter by
   * @param { string | Array } condition Value to set the column
   * @param { string } operator Operator to use in query, defaults to =
   * @return {Towel}
   */
  public addCondition(
    column: string,
    condition: string | boolean,
    operator: string = '='
  ): this {
    if (
      [TowelTypes.QueryTypes.INSERT, TowelTypes.QueryTypes.EXEC].indexOf(
        this.queryType
      ) > -1
    ) {
      throw new Error(
        'Cannot add a where statement to INSERT or EXEC statements'
      )
    }

    this.conditions[column] = evaluateFieldOperator({ condition, operator })
    return this
  }

  /**
   * Adds an aggregate contraint to the query
   * @param aggregate Which aggregate query to use (COUNT, MAX, etc)
   * @param column Which column to calculate the aggregate on. Defaults to primary key
   * @returns { Towel }
   */
  public addAggregate(
    aggregate: TowelTypes.AggregateTypes,
    column: string
  ): this {
    if (!['COUNT', 'AVE', 'MIN', 'MAX', 'SUM'].includes(aggregate)) {
      this.error = new Error(
        'Expected valid SQL aggregate type, got: ' + aggregate
      )
    }
    this.queryType = TowelTypes.QueryTypes.SELECT
    this.aggregates[aggregate] = column
    return this
  }

  public addOrArgument() {}

  /**
   * Submit an aggregate query.
   * Returns a promise containing the aggregates
   * @returns { Promise }
   */
  public queryAggregate(): Promise<TowelTypes.IAggregateQuery> {
    return new Promise((resolve, reject) => {
      if (this.queryType !== TowelTypes.QueryTypes.SELECT) {
        reject(
          new Error(
            'Must set aggregate using addAggregate before an aggregate query can proceed'
          )
        )
      } else {
        // Submit the query
        resolve()
      }
    })
  }

  /**
   * Submits a select query. Returns an array of objects
   * @returns { Promise }
   */
  public select(): Promise<TowelTypes.IQueryResult[]> {
    return new Promise((resolve, reject) => {
      // Return a select query
      resolve()
    })
  }

  public add(obj: {
    [column: string]: TowelTypes.QueryValueTypes
  }): Promise<TowelTypes.IQueryUpdateResult> {
    return new Promise((resolve, reject) => {
      // Return an insert into query
      resolve()
    })
  }

  public update(obj: {
    [column: string]: TowelTypes.QueryValueTypes
  }): Promise<TowelTypes.IQueryUpdateResult> {
    return new Promise((resolve, reject) => {
      // Return an update where query
      resolve()
    })
  }

  public delete(): Promise<TowelTypes.IQueryUpdateResult> {
    return new Promise((resolve, reject) => {
      // Return a delete where query
      resolve()
    })
  }
}
