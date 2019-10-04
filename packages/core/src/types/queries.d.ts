import { IDictionary } from './server'
import { GenericFieldTypes } from './forms'

// Return types from any given database field
export type FieldType = number | string | boolean | Buffer

// Different query operators such as =, <, >=
export enum FieldOperators {
  EQUALS,
  EQ = '=',
  LESS_THAN = '<',
  LT = '<',
  GREATER_THAN = '>',
  GT = '>',
  LESS_THAN_OR_EQUAL = '<=',
  LTE = '<=',
  GREATER_THAN_OR_EQUAL = '>=',
  GTE = '>=',
  BETWEEN = 'BETWEEN',
  BTWN = 'BETWEEN',
  LIKE = 'LIKE',
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

export interface IDescribeResult {
  Field: string
  Type: string
  Null: 'NO' | 'YES'
  Key: 'PRI' | 'MUL' | null
  Default: GenericFieldTypes | null
}
