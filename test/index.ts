/**
 * Entry point for the various tests
 */

import * as mocha from 'mocha'
import { expect } from 'chai'
import Querynator from './lib/Querynator'
import constructSchema from '../src/server/lib/ql/schema/constructSchema'

const testDirectories = ['./API/tables', './lib/Querynator']

before(async () => {
  process.env.NODE_ENV = 'test'
  await constructSchema()
})

Querynator()

describe('smoke test', function() {
  it('checks equality', function() {
    expect(true).to.be.true
  })
})
