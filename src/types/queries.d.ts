import { IDictionary } from './server'

declare namespace Queries {
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
