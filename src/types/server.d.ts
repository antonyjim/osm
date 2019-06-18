import * as express from 'express'
import { IFieldMessage } from './api'
import { ITableSchema } from './forms'

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

    interface Application {
      schema?: IDictionary<ITableSchema>
    }
  }
}

export interface IDictionary<T> {
  [key: string]: T
}

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
  errors?: IFieldMessage[]
  warnings?: IFieldMessage[]
  info?: IFieldMessage[]
  data?: any
}

export interface IServerStats {
  loaded?: boolean
  os: {
    cpuCount: number
    architecture: string
    openMem: number
    totMem: number
    host: string
    OS: string
    processMem: {
      rss: number
      heapTotal: number
      heapUsed: number
      external: number
    }
  }
  db: {
    poolLimit: number
    dbName: string
    NODE_ENV: string
    version: any[]
    // version: { VERSION: string }[]
  }
}

export interface IPagination {
  order?: { by?: string; direction?: 'ASC' | 'DESC' }
  offset?: number
  limit?: number
}
