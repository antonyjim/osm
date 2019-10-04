/**
 * src/lib/towel.ts
 * Provide the Towel class for manipulating
 * data structures on the server. Usage will
 * be almost exactly similar to the client version
 * of this class. Towel queries will generally avoid
 * the querynator class, as there is no need to go
 * through the hoops to use that class.
 */

// Node Modules

// NPM Modules

// Local Modules
import { simpleQuery } from '../'
import { getTables } from '../../../app/model/constructSchema'
import generateHooks from '../../../app/model/generateHooks'
import { ITableField, ITableSchema } from '@osm/forms'
import { byFields as _byFields } from '../../towel/internals/builder/byFields'
import {
  IFieldMessage,
  IAPIGetByFieldsResponse,
  IAPIByIdResponse
} from '@osm/api'
import { TowelRecord } from './towelRecord'
import { IPagination, IResponseMessage, IDictionary } from '@osm/server'
import { ITowelQueryResponse } from '@osm/towelRecord'
import { queryBuilder } from '../../towel/internals/builder'
import { IByFieldsQueryBuilder, IMetaInfo, FieldType } from '@osm/queries'

export default class Towel extends TowelRecord {
  private args: {
    col: string
    value: string
    operator: string
    not?: boolean
  }[]

  private pagination: IPagination = {
    limit: 25,
    offset: 0
  }

  constructor(table: string) {
    super(table)
    let schema
    try {
      schema = getTables()
      if (!schema[table]) {
        throw new Error(`${table} does not exist in the schema.`)
      }
    } catch (err) {
      throw new Error('Schema has not been initialized')
    }

    this.warnings = []
    this.args = []

    this.tableName = table
    this.tableSchema = schema[table]
    if (!this.tableSchema) {
      throw new Error('Towel could not locate table ' + table)
    } else {
      this.primaryKey = this.tableSchema.primaryKey
    }
  }

  public setLimit(limit: number): this {
    this.pagination.limit = limit
    return this
  }

  public addArgument(
    col: string,
    value: string,
    operator: string = '=',
    not?: boolean
  ): this {
    this.args.push({
      col,
      value,
      operator,
      not
    })
    return this
  }

  private async all(): Promise<IAPIGetByFieldsResponse> {
    const count = await simpleQuery('SELECT COUNT(??) AS COUNT FROM ??', [
      this.primaryKey,
      this.tableName
    ])
    const queryParams = queryBuilder(this.tableName, this.queryFieldsArr) // The query with necessary joins
    if (
      this.pagination.limit &&
      this.pagination.limit !== null &&
      !isNaN(this.pagination.limit)
    ) {
      // Put a hard limit on 100 rows
      queryParams.query += ' LIMIT ' + this.pagination.limit
    } else {
      queryParams.query += ' LIMIT 25'
    }
    if (this.pagination.offset + this.pagination.limit > count[0].COUNT) {
      this.pagination.offset =
        count[0].COUNT - this.pagination.limit < 0
          ? 0
          : count[0].COUNT - this.pagination.limit
    }
    // Limit the offset to the max number of results
    else if (this.pagination.offset === null || isNaN(this.pagination.offset)) {
      this.pagination.offset = 0
    } // Fallback to an offset of 0 if an invalid offset is provided
    queryParams.query += ' OFFSET ' + this.pagination.offset

    return {
      meta: {
        count: count[0].COUNT,
        from: this.pagination.offset < 1 ? 1 : this.pagination.offset,
        to:
          this.pagination.limit + this.pagination.offset > count[0].COUNT
            ? count[0].COUNT
            : this.pagination.limit + this.pagination.offset
      },
      warnings: this.warnings,
      data: await simpleQuery(queryParams.query, queryParams.params)
    }
  }

  private async byFields(
    { fields }: { [field: string]: string | boolean | number },
    pagination: {
      order?: { by?: string; direction?: 'ASC' | 'DESC' }
      offset?: number
      limit?: number
    }
  ): Promise<IAPIGetByFieldsResponse> {
    return new Promise((resolveByFields, rejectByFields) => {
      // First we  build the query
      _byFields(
        {
          fields: this.requestedFields,
          args: fields,
          table: this.tableName
        },
        pagination
      )
        .then((fieldParams: IByFieldsQueryBuilder) => {
          // We'll take care of some logging
          if (fieldParams.warnings) {
            console.log(
              '[TOWEL_RECORD] %d warnings received in query builder: %s',
              fieldParams.warnings.length,
              fieldParams.warnings
            )
          }

          // This will eventually make it's way back to the response
          this.warnings.concat(fieldParams.warnings)
          return Promise.all([
            fieldParams.meta,
            simpleQuery(
              fieldParams.queryParams.query,
              fieldParams.queryParams.params
            )
          ])
        })
        .then(([metaData, data]: [IMetaInfo, IDictionary<any>]) => {
          return resolveByFields({
            meta: metaData,
            data,
            warnings: this.warnings
          })
        })
    })
  }

  public static refreshHooks(): void {
    generateHooks()
    console.log('[TOWEL] Regenerating Hooks')
  }

  public static async rawQuery(
    query,
    params?
  ): Promise<IDictionary<FieldType>[]> {
    return new Promise(
      (
        resolve: (rows: IDictionary<FieldType>[]) => void,
        reject: (err: Error) => void
      ) => {
        simpleQuery(query, params)
          .then((rows) => {
            resolve(rows)
          })
          .catch((err) => {
            console.error('[TOWEL] ERROR OCCURRED AT RAW QUERY')
            console.error('[TOWEL] \n' + err.message)
            reject(err)
          })
      }
    )
  }

  public async get(args?: { [key: string]: boolean | string | number }) {
    try {
      // Not exactly sure what I was going for here
      // if (args && Array.isArray(args)) {
      //   const fields = {}
      //   fields[this.primaryKey] = args.id
      //   return await this.byFields({ ...fields }, {})
      // } else
      if (args && typeof args.id === 'string') {
        console.log('[TOWEL_RECORD] Fetching records by id')
        const record = await this.byId(args.id)
        if (record.data && record.data[this.tableName]) {
          return record.data[this.tableName]
        } else {
          return record
        }
      } else if (args && typeof args === 'object') {
        console.log('[TOWEL_RECORD] Fetching records by arguments object')
        return await this.byFields(args, {})
      } else {
        console.log('[TOWEL_RECORD] Fetching all records')
        return await this.all()
      }
    } catch (err) {
      // Rethrow error
      throw err
    }
  }
}
