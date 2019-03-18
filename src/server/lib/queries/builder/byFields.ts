import { evaluateFieldOperator } from './evalOperator'
import { validateFieldsExist } from './fieldValidator'
import { queryBuilder } from '.'
import { simpleQuery } from '../../connection'

/**
 * lib/queries/builder/byFields.ts
 * Resolve object into SQL query string with params
 */

// Node Modules

// NPM Modules

// Local Modules

// Constants and global variables

/**
 * Build a query for pagination from an object of arguments
 * @param param0 Contains an array of fields requested from the API
 * @param pagination Pagination data
 */
export async function byFields(
  {
    fields,
    table,
    args,
    baseParams = []
  }: {
    fields: any
    table: string
    args: any
    baseParams?: string[]
  },
  pagination: {
    order?: { by?: string; direction?: 'ASC' | 'DESC' }
    offset?: number
    limit?: number
  }
) {
  const warnings = []
  // Sometimes the constructor for querynator will provide a set
  // of parameters based on the defaults for the table that is
  // being queried if no fields are provided from the API.

  // Eventually this behavior will be phased out with the introduction
  // of the Towel api, but this will stay here for compat reasons.
  const params = baseParams
  params.push(table)
  const queryParams = await queryBuilder(table, fields)
  warnings.concat(queryParams.warnings) // Carry warnings to parent

  const validatedFields = validateFieldsExist(
    Object.keys(args),
    table,
    queryParams.aliases
  )
  if (validatedFields.length > 0) queryParams.query += ' WHERE '
  validatedFields.map((col, i) => {
    const fieldValue = args[col.originalField]
    if (typeof fieldValue === 'string') {
      const { value, operator, not } = evaluateFieldOperator(fieldValue)
      if (not) {
        queryParams.query += 'NOT ' + col.placeHolder + ' ' + operator + ' ?'
      } else {
        queryParams.query += col.placeHolder + ' ' + operator + ' ?'
      }

      queryParams.params = queryParams.params.concat(col.validField)
      queryParams.params.push(value)
    } else if (Array.isArray(args[col.originalField])) {
      queryParams.query += col.placeHolder + ' IN ?'
      queryParams.params = queryParams.params.concat(col.validField)
      queryParams.params.push(args[col.originalField])
    } else {
      queryParams.query += col.placeHolder + ' = ?'
      queryParams.params = queryParams.params.concat(col.validField)
      queryParams.params.push(fieldValue)
    }
    if (i + 1 !== Object.keys(args).length) queryParams.query += ' AND '
  })

  // Query for count for meta information
  queryParams.params.unshift(queryParams.countField) // Add the primary key to the beginning of the array for the next query

  // While this query is most likely grossly inefficient, it works.
  // Eventually I will refactor it from:
  // SELECT COUNT(sys_id) AS COUNT FROM (SELECT sys_id FROM sys_customer WHERE active = true) AS COUNTING
  // to:
  // SELECT COUNT(sys_id) FROM sys_customer WHERE active = true;
  //
  // But today is not that day...
  const count = await simpleQuery(
    'SELECT COUNT(??) AS COUNT FROM (' + queryParams.query + ') AS COUNTING',
    queryParams.params
  )
  queryParams.params.shift() // Remove the primary key for the data query

  if (pagination.order && pagination.order.by && pagination.order.direction) {
    queryParams.query += 'ORDER BY ??'
    queryParams.query +=
      pagination.order.direction === 'DESC' ? ' DESC' : ' ASC'
    queryParams.params.push(pagination.order.by)
  }

  if (pagination.limit !== null && !isNaN(pagination.limit)) {
    queryParams.query += ' LIMIT ' + pagination.limit
  }

  if (pagination.offset !== null && !isNaN(pagination.offset)) {
    queryParams.query += ' OFFSET ' + pagination.offset
  }

  return {
    meta: {
      count: count[0].COUNT,
      from: pagination.offset < 1 ? 1 : pagination.offset,
      to:
        pagination.limit + pagination.offset > count[0].COUNT
          ? count[0].COUNT
          : pagination.limit + pagination.offset
    },
    warnings,
    queryParams
  }
}
