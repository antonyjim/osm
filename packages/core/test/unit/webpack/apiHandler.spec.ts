/**
 * Test webpack ApiResource parser
 */

const parseResourceRequest = require('../../../resources/webpack/utils/babel.apiRequestGenerator')
import db from '../../utils/queries'
import { generateKeyHash } from '../../utils/generateKeyHash'
import { assert } from 'chai'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'
import 'mocha'

;(function() {
  describe('webpack api resource parser', function() {
    const testCaseDir: string = join(__dirname, 'apiHandler_cases')
    const testExpectedDir: string = join(__dirname, 'apiHandler_expected')
    let testCaseHash: string

    before(function(done) {
      db.clear('sys_generated_resource')
        .then(done)
        .catch(done)
    })

    beforeEach(function() {
      testCaseHash = generateKeyHash(8)
      process.env.OVERRIDE_KEY_HASH = testCaseHash
    })

    /**
     * Read each
     */
    const t_parseResourceRequest = function(testName: string, done: MochaDone) {
      const startingFileVals = readFileSync(
        join(testCaseDir, testName)
      ).toString()
      // do_magic
      const parsedResult = parseResourceRequest(startingFileVals)

      // Check for what we should have
      const checkClient = existsSync(
        join(testExpectedDir, testName + '_client')
      )
      const checkServer = existsSync(
        join(testExpectedDir, testName + '_server')
      )

      if (checkClient) {
        const expectedClientCode = readFileSync(
          join(testExpectedDir, testName + '_client')
        ).toString()
        done(assert.equal(parsedResult, expectedClientCode))
      }

      if (checkClient) {
        const expectedServerResults = require(join(
          testExpectedDir,
          testName + '_server'
        ))
        db.query(
          'SELECT sql_query FROM sys_generated_resource WHERE resource_hash  = ?',
          testCaseHash
        )
          .then((insertedData) => {
            done(
              assert.deepEqual(
                insertedData,
                expectedServerResults,
                'Parser inserted incorrect data in sys_generated_resource'
              )
            )
          })
          .catch(done)
      }
    }

    it('should ignore commented ApiResource objects', function(d) {
      t_parseResourceRequest('commented_request', d)
    })

    it('should parse a very simple ApiResource object', function(d) {
      t_parseResourceRequest('simple_object', d)
    })

    it('should parse a deeply nested object with joins', function(d) {
      t_parseResourceRequest('complex_object', d)
    })

    it('should parse a large file (over 1000 lines)', function(d) {
      t_parseResourceRequest('large_file', d)
    })

    it('should serialize multiple ApiResource requests in one object', function(d) {
      t_parseResourceRequest('multiple_request', d)
    })
  })
})()
