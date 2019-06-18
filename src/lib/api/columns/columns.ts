/**
 * lib/ql/columns/columns.ts
 * Manage the schema
 */

// Node Modules

// NPM Modules

// Local Modules
import { Querynator } from '../../queries'
import constructSchema from '../../model/constructSchema'

// Constants and global variables

export default class Column extends Querynator {
  constructor(context, fields) {
    super(context, fields)
    this.tableName = 'sys_db_dictionary'
    this.primaryKey = 'sys_id'
    this.emit('init')
  }

  public async getById(id) {
    return await this.byId(id)
  }

  public async create(fields) {
    if (fields && fields.column_name && fields.type) {
      console.log('Do something')
    }
    return await this.insert(fields)
  }

  public async update(fields) {
    return new Promise((resolveUpdate, rejectUpdate) => {
      this.createUpdate(fields)
        .then((updRes) => {
          constructSchema()
          return resolveUpdate(updRes)
        })
        .catch(rejectUpdate)
    })
  }

  public async getFields(fields, pagination) {
    if (fields) {
      return await this.byFields({ fields }, pagination)
    } else {
      return await this.all(pagination)
    }
  }
}
