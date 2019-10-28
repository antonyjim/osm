// import * as Towel from '../Towel'
import { ConnectionConfig, Pool, Connection } from 'mysql'
import { evaluateFieldOperator } from '@lib/towel/internals/builder/evalOperator'
import { TowelTypes } from './types/towel'

// import { Towel } from '../Towel'

/**
 * Creates a new database operation
 * @class
 */
export class TowelRecord {
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

  // Primary key of record being queried
  private primaryKey: string

  // List of conditions and values to be used in
  // select and update queries
  private conditions: { [key: string]: TowelTypes.IQueryOperator } = {}

  // List of aggregates to be used in select query
  private aggregates?: { [key in TowelTypes.AggregateTypes]: string }

  // Allow access to the raw connection
  public rawConnection: Connection

  private error?: Error

  /**
   * Returns a new Towel instance with the table passed.
   * @param table Name of primary table being queried
   * @param { string[] | string } queryFieldList
   * @param { string } id Primary key value
   */
  constructor(table: string, queryFieldList?: string[] | string, id?: string) {
    if (!table) {
      throw new Error('Table must be provided to towel!')
    }

    // First check if we were provided a list of fields
    // or an id as the second argument
    if (queryFieldList && Array.isArray(queryFieldList)) {
      this.fieldList = queryFieldList
    } else if (typeof queryFieldList === 'string') {
      // If queryFieldList is not an array, then we need to
      // apply it to the primary key
      this.primaryKey = queryFieldList
    }

    if (id) {
      this.primaryKey = id
    }
    this.tableName = table
    this.hasQueried = false
  }

  /**
   *
   * @param {Array<string>} fieldNames Field list to return from query
   * @returns {Towel}
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
   * @param {string} column Column to filter by
   * @param {string | Array} condition Value to set the column
   * @param {string} operator Operator to use in query, defaults to =
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
   * @returns {Towel}
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

  /**
   * Submit an aggregate query.
   * Returns a promise containing the aggregates
   * @returns {Promise}
   */
  public queryAggregate(): Promise<TowelTypes.IAggregateQuery> {
    return new Promise((resolve, reject) => {
      if (this.hasQueried) {
        reject(new Error('Cannot query aggregates after query has already run'))
      } else if (this.queryType !== TowelTypes.QueryTypes.SELECT) {
        reject(
          new Error(
            'Must set aggregate using addAggregate before an aggregate query can proceed'
          )
        )
      } else {
        this.hasQueried = true
        // Submit the query
        resolve()
      }
    })
  }

  /**
   * Submits a select query. Returns an array of objects
   * @returns {Promise}
   */
  public select(): Promise<TowelTypes.IQueryResult[]> {
    return new Promise((resolve, reject) => {
      if (this.hasQueried) {
        reject(new Error('Cannot submit query after query has already run'))
      } else {
        // Return a select query
        resolve()
      }
    })
  }

  public selectById(id: string): Promise<TowelTypes.IQueryResult> {
    return new Promise((resolve, reject) => {
      // Return a single record
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

  public deleteById(): Promise<TowelTypes.IQueryUpdateResult> {
    return new Promise((resolve, reject) => {
      // Return a delete query
      resolve()
    })
  }
}
