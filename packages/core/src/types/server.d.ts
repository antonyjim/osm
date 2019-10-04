import * as express from 'express'
import { IFieldMessage } from './api'
import { ITableSchema } from './forms'
import { jwtKeys } from '../routes/middleware/authentication'
import { FieldType } from './queries'

declare global {
  namespace Express {
    interface Request {
      auth?: {
        [jwtKeys.isAuthenticated]?: boolean
        [jwtKeys.isAuthorized]?: boolean
        [jwtKeys.user]?: string
        [jwtKeys.claimLevel]?: string
        [jwtKeys.claim]?: string
        [jwtKeys.scope]?: string
        [jwtKeys.token]?: string
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
  app: {
    version: string
    domain: string
  }
}

export interface IPagination {
  order?: { by?: string; direction?: 'ASC' | 'DESC' }
  offset?: number
  limit?: number
}

export interface IFileUpload {
  sys_id?: string
  content_type: string
  referenced_table: string
  referenced_table_record: string
  file_name: string
  file_size: number
  file_contents: Buffer
}

// Interfaces
export interface IQueryCondition {
  fieldName: string
  fieldValue: FieldType // Actual value to set
  conditionModifier?: string // =, <, <=
}
