import { IFieldMessage } from './api'

export interface ITowelQueryResponse {
  meta: {
    count: number
    from: number
    to: number
  }
  warnings: IFieldMessage[]
  data: any[]
}
