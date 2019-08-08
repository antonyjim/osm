/**
 * test/utils/getRawDbQuery.ts
 *
 * Returns a pure connection for validating database
 * updates / deletes / inserts
 */

import { createConnection } from 'mysql'

const testTable = `
  CREATE TABLE sys_unit_test (
    PRIMARY KEY(sys_id_key),
    sys_id_key CHAR(36),
    some_varchar VARCHAR(255),
    some_char CHAR(4),
    some_int INT,
    some_double DOUBLE,
    some_blob BLOB,
    some_text TEXT,
    some_reference CHAR(36),

    FOREIGN KEY some_reference
      REFERENCES sys_user(sys_id),
      ON DELETE RESTRICT,
      ON UPDATE RESTRICT
  ) CHARSET=uft8;
`

const testData = `
    INSERT INTO sys_unit_test VALUES (
      '5e418b85-15ca-4cbd-bb07-eea5d23c3b60', 
      'Some variable length string',
      'S9DF',
      5,
      4.23,
      'blob',
      'some_text',
      '3627ee6a-bc8f-428f-8984-3b0c49170c8c'
    )
`

const testDataObject = [
  {
    sys_id: '5e418b85-15ca-4cbd-bb07-eea5d23c3b60',
    some_varchar: 'Some variable length string',
    some_char: 'S9DF',
    some_int: 5,
    some_double: 4.23,
    some_blob: 'blob',
    some_text: 'some_text',
    some_reference: '3627ee6a-bc8f-428f-8984-3b0c49170c8c'
  }
]

function getQuery(query, params?) {
  return new Promise((resolveQuery, rejectQuery) => {
    const conn = createConnection({
      user: 'test',
      password: 'test_user',
      host: '192.168.1.122',
      port: 3306,
      database: 'thq_test'
    })

    conn.query(query, params, (err, results) => {
      if (err) rejectQuery(err)
      conn.query('DROP TABLE IF EXISTS sys_unit_test', (err) => {
        if (err) throw err
        conn.query(testTable, (err) => {
          if (err) throw err
          conn.query(testData, (err) => {
            if (err) throw err
            resolveQuery(results)
          })
        })
      })
    })
  })
}

export { getQuery }
