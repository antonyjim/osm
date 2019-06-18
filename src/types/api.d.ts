import { Queries } from './queries'
import { IDictionary } from './server'

export interface IFieldMessage {
  message: string // Friendly field to be displayed in UI
  field?: string // Id of invalid field
}

export interface IAPIGetByFieldsResponse {
  errors?: IFieldMessage[]
  warnings?: IFieldMessage[]
  info?: IFieldMessage[]
  data: IDictionary<any>
  meta: Queries.IMetaInfo
}

export interface IAPIByIdResponse {
  errors?: IFieldMessage[]
  warnings?: IFieldMessage[]
  info?: IFieldMessage[]
  data: {
    [tableName: string]: any
  }
  meta?: Queries.IMetaInfo
}
