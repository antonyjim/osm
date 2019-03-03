import * as express from 'express'

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
  error: boolean
  errorMessage?: string
  message?: string
  details?: any
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
