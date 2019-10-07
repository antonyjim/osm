import { ITableField } from './forms'
import { ITablePermissions } from './global'
import { IStatusMessage } from './server'

export interface IFieldError {
  message: string // Friendly field to be displayed in UI
  error?: boolean
  field?: string // Id of invalid field
}

export interface IAPIGETResponse<T> {
  errors: IStatusMessage[]
  warnings: IStatusMessage[]
  info: string[]
  data: T
  meta?: {
    count: number
    from: number
    to: number
  }
}

export interface ITableDescriptionResponse {
  errors: IStatusMessage[]
  warnings: IStatusMessage[]
  info: string[]
  defaultFields: string[]
  userPreferences?: string[]
  columns: IDictionary<ITableField>
  primaryKey: string
  permissions: ITablePermissions
  displayField: string
}
