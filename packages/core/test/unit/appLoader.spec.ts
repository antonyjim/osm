/**
 * test/unit/appLoader.spec.ts
 *
 * Validates the application's ability to start.
 */

import { assert } from 'chai'

import { Pool } from 'mysql'

describe('should start the app', function() {
  it('should create a database connection', function(done) {
    process.env.DB_USER = 'test'
    process.env.DB_PASS = 'test_account'
    process.env.DB_DB = 'thq_test'
    process.env.DB_HOST = '192.168.1.122'
    process.env.DB_PORT = '3306'

    const pool: Pool = require('../../src/lib/connection').getPool()
    pool.getConnection((err, connection) => {
      // This will validate the connection
      assert.isObject(connection)
      done(err)
      connection.release()
    })
  })
})
