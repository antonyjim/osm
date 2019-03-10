import * as express from 'express'
import { IFieldError } from './api'

export interface IValidationFields {
  isInvalid: boolean
  fieldName: string
  fieldValue: string
}

export interface IStatusMessage {
  error: boolean
  message: string
  details?: any
}

export interface IQueryResponse {
  error: boolean
  message: string
  count?: number
  results?: any
}

export interface IResponseMessage {
  errors?: IFieldError[]
  warnings?: IFieldError[]
  info?: IFieldError[]
  data?: any
}

declare global {
  namespace Express {
    interface Request {
      auth?: {
        iA?: boolean
        iZ?: boolean
        u?: string
        c?: string
        r?: string
        t?: string
      }
    }
  }
}
