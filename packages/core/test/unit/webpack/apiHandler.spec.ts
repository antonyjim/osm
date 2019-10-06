/**
 * Test webpack ApiResource parser
 */

const parseResourceRequest = require('../../../resources/webpack/utils/apiHandler')
import db from '../../utils/queries'
import { generateKeyHash } from '../../utils/generateKeyHash'
import { assert } from 'chai'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join } from 'path'

describe('webpack api resource parser', function() {
  const testCaseDir: string = join(__dirname, 'apiHandler_cases')
  const testExpectedDir: string = join(__dirname, 'apiHandler_expected')
  const testFileCases: string[] = readdirSync((<string>testCaseDir) as string) // Just so we know it's a string
  let testCaseIterator: number = 0
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
  const t_parseResourceRequest = function(done) {
    const startingFileVals = readFileSync(
      join(testCaseDir, testFileCases[testCaseIterator])
    ).toString()
    // do_magic
    const parsedResult = parseResourceRequest(startingFileVals)

    // Check for what we should have
    const checkClient = existsSync(
      join(testExpectedDir, testFileCases[testCaseIterator] + '_client')
    )
    const checkServer = existsSync(
      join(testExpectedDir, testFileCases[testCaseIterator] + '_server')
    )

    if (checkClient) {
      const expectedClientCode = readFileSync(
        join(testExpectedDir, testFileCases[testCaseIterator] + '_client')
      ).toString()
      done(assert.equal(parsedResult, expectedClientCode))
    }

    if (checkClient) {
      const expectedServerResults = require(join(
        testExpectedDir,
        testFileCases[testCaseIterator] + '_server'
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

  for (; testCaseIterator < testFileCases.length; testCaseIterator++) {
    it('should convert ApiResource requests', t_parseResourceRequest)
  }
})
