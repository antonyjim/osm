import { IDictionary } from './server'

declare namespace Queries {
  // Return types from any given database field
  export type FieldType = number | string | boolean | Buffer

  // Different query operators such as =, <, >=
  export enum FieldOperators {
    EQUALS,
    EQ = '=',
    LESS_THAN,
    LT = '<',
    GREATER_THAN,
    GT = '>',
    LESS_THAN_OR_EQUAL,
    LTE = '<=',
    GREATER_THAN_OR_EQUAL,
    GTE = '>=',
    BETWEEN,
    BTWN = 'BETWEEN',
    LIKE,
    LK = 'LIKE'
  }

  export interface IMetaInfo {
    count: number
    from: number
    to: number
  }

  export interface IByFieldsQueryBuilder {
    meta?: IMetaInfo
    queryParams: IQueryBuilderInfo
    errors?: { message: string | Error }[]
    warnings: { message: string }[]
  }

  export interface IQueryBuilderInfo {
    params: any[]
    query: string
    aliases: IDictionary<string>
    countField: string
    warnings: { message: string }[]
    errors?: { message: string | Error }[]
  }
}
