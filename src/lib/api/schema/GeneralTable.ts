/**
 * src/lib/ql/schema/others.ts
 * Provide a Querynator interface for tables that
 * do not have their own customer resolvers
 */

// Node Modules

// NPM Modules

// Local Modules
import { Querynator } from '../../queries'
import { getTables } from '../../model/constructSchema'

// Constants and global variables

export async function genericTableQuery(
  queryFields,
  args,
  context,
  pagination?
) {
  if (context.req.params.id) {
    return await new GenericTable(context, queryFields).getById(args)
  } else {
    return await new GenericTable(context, queryFields).where(args, pagination)
  }
}

export async function genericTableDelete(
  queryFields,
  args,
  context,
  pagination?
) {
  return await new GenericTable(context, queryFields).delete(args)
}

export async function genericTableUpdate(
  queryFields,
  args,
  context,
  pagination?
) {
  if (context.req.params.id) {
    return await new GenericTable(context, queryFields).update(args)
  }
}

export async function genericTableCreate(
  queryFields,
  args,
  context,
  pagination?
) {
  return await new GenericTable(context, queryFields).create(args)
}

class GenericTable extends Querynator {
  constructor(context, fields) {
    super(context, fields)
    if (
      context.req.params.table &&
      context.req.params.table.endsWith('_list')
    ) {
      this.tableName = context.req.params.table.slice(0, -5)
    } else {
      this.tableName = context.req.params.table
    }
    this.primaryKey = getTables()[this.tableName].primaryKey
    this.warnings = []
    this.errors = []
    this.emit('init')
  }

  public async getById(id) {
    return await this.byId(id)
  }

  public async where(args, pagination) {
    if (args === null || args === undefined) {
      this.all(pagination)
        .then((queryResults) => {
          return queryResults
        })
        .catch((queryErr) => {
          console.log('[GENERIC_TABLE] Query Error %s', queryErr.message)
          throw queryErr
        })
    } else {
      this.byFields({ fields: args }, pagination)
        .then((queryResults) => {
          return queryResults
        })
        .catch((queryErr) => {
          console.log('[GENERIC_TABLE] Query Error %s', queryErr.message)
          throw queryErr
        })
    }
  }

  public async create(fields) {
    return new Promise((resolve) => {
      this.insert(fields)
        .then((onInserted) => {
          resolve(onInserted)
        })
        .catch((err) => {
          this.warnings.push({ message: err.message })
          resolve({ error: err })
        })
    })
  }

  public async update(fields) {
    this.createUpdate(fields).catch((err) => {
      this.errors.push({ message: err })
    })
    return await this.byId(this.context.req.params.id)
  }

  public async delete(id: string) {
    return await this.deleteRecord(id)
  }
}
