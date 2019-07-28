export interface IFieldError {
  message: string // Friendly field to be displayed in UI
  field?: string // Id of invalid field
}

export interface IAPIGETResponse<T> {
  errors: IFieldError[]
  warnings: IFieldError[]
  info: string[]
  data: T
  meta?: {
    count: number
    from: number
    to: number
  }
}
