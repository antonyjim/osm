/**
 * Validate that database connection can be established and queries are returned
 */

// Expect from chai
import { assert } from 'chai'

// Test Module
import { simpleQuery } from '../../../src/server/lib/connection'

export default function() {
  it('should make a query with no arguments', async function() {
    const table = simpleQuery('SELECT * FROM sys_db_dictionary LIMIT 1')
    assert.isArray(table, 'returned array')
  })

  it('should make a query with array of arguments', async function() {
    const query = await simpleQuery(
      'SELECT ?? FROM sys_db_dictionary WHERE ?? = ?',
      ['sys_id', 'len', 36]
    )
    assert.isArray(query, 'returned array with args')
  })

  it('should throw an error with invalid query (from mysql)', async function(done) {
    assert.throws(await simpleQuery('INVALID QUERY'), 'throws on invalid query')
  })
}
