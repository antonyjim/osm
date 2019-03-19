/**
 * Entry point for the various tests
 */

import * as mocha from 'mocha'
import { expect } from 'chai'
import Querynator from './unit/lib/queries/Querynator'
import constructSchema from '../src/server/lib/API/schema/constructSchema'
import builder from './unit/lib/queries/builder'
import sheet from './unit/lib/excel'

const testDirectories = ['./API/tables', './lib/Querynator']

// before(async () => {
//   process.env.NODE_ENV = 'test'
//   await constructSchema()
// })

// Querynator()

builder()
sheet()

describe('smoke test', function() {
  it('checks equality', function() {
    expect(true).to.be.true
  })
})
