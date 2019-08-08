/**
 * test/unit/api/validateModel.spec.ts
 *
 * Validates the datamodel is correctly generated.
 */

import { assert } from 'chai'

import constructSchema from '../../../src/lib/model/constructSchema'
import { getQuery } from '../../utils/getRawDbQuery'
import { IDictionary } from '../../../src/types/server'
import { ITableSchema } from '../../../src/types/forms'

describe('will generate the schema', function() {
  it('should successfully generate database schema', function(done) {
    getQuery('SHOW TABLES').then((tables: { [key: string]: string }[]) => {
      constructSchema().then((schema) => {
        let hasNotFoundTable = false
        tables.forEach((table) => {
          if (!schema[table['tables_in_' + process.env.DB_DB]]) {
            hasNotFoundTable = true
          }
        })

        // Lets make sure we did not miss any tables
        done(assert.ok(hasNotFoundTable))
      })
    })
  })

  it('should have standard fields included', function(done) {
    // The schema should contain the following details:
    // - columns
    // - defaultFields
    // - displayField
    // - primaryKey
    // - tableId
    // We are going to use our test table to validate

    const expectedTestTable: ITableSchema = {
      columns: {
        sys_id: {
          columnName: 'sys_id',
          label: 'sys_id',
          maxLength: 36,
          nullable: false,
          readonly: true,
          requiredCreate: true,
          requiredUpdate: true,
          type: 'CHAR',
          visible: true
        },
        some_varchar: {
          columnName: 'some_varchar',
          label: 'some_varchar',
          maxLength: 255,
          nullable: false,
          readonly: true,
          requiredCreate: true,
          requiredUpdate: true,
          type: 'VARCHAR',
          visible: true
        },
        some_char: {
          columnName: 'some_char',
          label: 'some_char',
          maxLength: 50,
          nullable: false,
          requiredCreate: true,
          requiredUpdate: false,
          type: 'CHAR',
          visible: true
        },
        some_int: {
          columnName: 'some_int',
          label: 'some_int',
          nullable: false,
          requiredCreate: true,
          requiredUpdate: false,
          type: 'number',
          visible: true
        },
        some_double: {
          columnName: 'some_double',
          label: 'some_double',
          nullable: false,
          requiredCreate: true,
          requiredUpdate: false,
          type: 'number',
          visible: true
        },
        some_blob: {
          columnName: 'some_blob',
          label: 'some_blob',
          nullable: false,
          requiredCreate: true,
          requiredUpdate: false,
          type: 'number',
          visible: true
        },
        some_text: {
          columnName: 'some_text',
          label: 'some_text',
          nullable: false,
          requiredCreate: true,
          requiredUpdate: false,
          type: 'string',
          visible: true
        },
        some_reference: {
          columnName: 'some_reference',
          label: 'some_reference',
          maxLength: 36,
          nullable: false,
          readonly: false,
          refTable: 'sys_user',
          localRef: 'sys_id',
          requiredCreate: true,
          requiredUpdate: false,
          type: 'string',
          visible: true
        }
      },
      displayField: 'some_varchar',
      primaryKey: 'sys_id',
      defaultFields: [
        'sys_id',
        'some_varchar',
        'some_char',
        'some_int',
        'some_double',
        'some_blob',
        'some_text',
        'some_reference'
      ],
      tableId: 'string'
    }

    // PRIMARY KEY(sys_id_key),
    // sys_id_key CHAR(36),
    // some_varchar VARCHAR(255),
    // some_char CHAR(4),
    // some_int INT,
    // some_double DOUBLE,
    // some_blob BLOB,
    // some_text TEXT,
    // some_reference CHAR(36),

    constructSchema().then((schema: IDictionary<ITableSchema>) => {
      assert.deepEqual(schema['sys_unit_test'], expectedTestTable)
    })
  })
})
