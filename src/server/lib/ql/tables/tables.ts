import { Querynator } from '../../connection'
import { Validation } from '../../validation'

enum FOREIGN_KEY_ACTIONS {
  'CASCADE',
  'RESTRICT'
}

const ALTER_TABLE = 'ALTER TABLE'
const MODIFY_COLUMN = 'MODIFY COLUMN'
const CHANGE_COLUMN = 'CHANGE'
const VARCHAR = (len: number) => {
  if (typeof len !== 'number') {
    throw new TypeError('VARCHAR length must be a number')
  }
  return 'VARCHAR(' + len + ')'
}
const CHAR = (len: number) => {
  if (typeof len !== 'number') {
    throw new TypeError('CHAR length must be a number')
  }
  return 'CHAR(' + len + ')'
}
const TEXT = 'TEXT'
const NOT_NULL = 'NOT NULL'
const AUTO_INCREMENT = 'AUTO_INCREMENT'
const UNIQUE = 'UNIQUE'

class Table extends Querynator {
  constructor(context, fields) {
    super(context, fields)
    this.tableName = 'sys_db_object'
    this.primaryKey = 'sys_id'
    this.emit('init')
  }

  public async getById(id) {
    return await this.byId(id)
  }

  public async where(fields, pagination) {
    if (fields && Object.keys(fields).length > 0) {
      return await this.byFields({ fields }, pagination)
    } else {
      return await this.all(pagination)
    }
  }

  public async create(fields) {
    this.insert(fields).catch((err) =>
      this.warnings.push({ message: err.message })
    )
    return this.byId(fields.name)
  }

  public async update(fields) {
    this.createUpdate(fields).catch((err) => {
      this.errors.push({ message: err })
    })
    return this.byId(this.context.req.params.id)
  }
}

export default Table
