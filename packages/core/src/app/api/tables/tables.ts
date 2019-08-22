import { Querynator, simpleQuery } from '../../../lib/queries'
import Towel from '../../../lib/queries/towel/towel'
import { TowelRecord } from '../../../lib/queries/towel/towelRecord'
import { ITableField } from '../../../types/forms'

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
    const insertedRecords = this.insert(fields).catch((err) =>
      this.warnings.push({ message: err.message })
    )
    if (this.warnings.length === 0) {
      try {
        simpleQuery(
          'CREATE TABLE IF NOT EXISTS ?? (PRIMARY KEY(??), ?? ' +
            CHAR(36) +
            ')',
          [fields.name, this.primaryKey, this.primaryKey]
        )
        if (fields.audits === true) {
          simpleQuery(
            `CREATE TABLE IF NOT EXISTS ?? (
PRIMARY KEY(update_time, update_user),
update_time DATETIME,
update_user CHAR(36),
resource CHAR(36),
message VARCHAR(255),

FOREIGN KEY(update_user)
  REFERENCES ??(??)
  ON DELETE RESTRICT
  ON UPDATE CASCADE
`,
            [fields.name + '_audit', 'sys_user', 'sys_id']
          )
          new TowelRecord('sys_db_dictionary').create({})
        }
      } catch (e) {
        this.deleteRecord(insertedRecords[this.tableName][this.primaryKey])
        return {
          errors: ['Could not create table']
        }
      }
    }

    return insertedRecords
  }

  public async update(fields) {
    this.createUpdate(fields).catch((err) => {
      this.errors.push({ message: err })
    })
    return this.byId(this.context.req.params.id)
  }
}

export default Table
