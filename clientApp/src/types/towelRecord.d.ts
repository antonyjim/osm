import { IFieldError } from './api'

export interface ITowelQueryResponse {
  meta: {
    count: number
    from: number
    to: number
  }
  warnings: IFieldError[]
  data: any[]
}
