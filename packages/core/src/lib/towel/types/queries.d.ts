import { IWarning } from './warningAndErrors'
import { IDictionary } from './schema'

declare namespace Queries {
  interface IQueryParams {
    params: any[]
    query: string
    aliases: IDictionary<string>
    countField: string
    warnings: IWarning[]
  }

  export interface ISelectByFields {
    meta: {
      count: number
      from: number
      to: number
    }
    warnings: IWarning[]
  }

  export interface ISelectById {
    [key: string]: any
  }
}
