export namespace TowelTypes {
  type AggregateTypes = 'COUNT' | 'AVE' | 'MIN' | 'MAX'
  type QueryValueTypes = string | boolean | number | Date

  enum QueryTypes {
    SELECT = 0,
    AGGREGATE,
    INSERT,
    UPDATE,
    DELETE,
    EXEC
  }

  enum Operators {
    equal = 0,
    notEqual,
    like,
    notLike,
    in,
    notIn,
    lessThan,
    lessThanOrEqual,
    greaterThan,
    greaterThanOrEqual
  }

  interface IQueryOperator {
    operator: string
    not: boolean
    value: QueryValueTypes
  }

  interface IAggregateQuery {
    COUNT?: number
    AVE?: number
    MIN?: number
    MAX?: number
  }

  interface IQueryResult {
    [key: string]: string | boolean | number
  }

  interface IQueryUpdateResult {
    fieldCount: number
    affectedRows: number
    insertId: number
    serverStatus: number
    warningCount: number
    message: string
    protocol41: boolean
    changedRows: number
  }
}
