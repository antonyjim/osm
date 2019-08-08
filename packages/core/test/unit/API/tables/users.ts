/**
 * Test user functionality
 */
import * as mocha from 'mocha'
import { expect } from 'chai'
import User from '../../../../src/lib/users/users'
// var expressStubs = require('./../../expressStubs')
// var req = expressStubs.req
import { stubs } from '../stubs'
const req = stubs.req

describe('User CRUD operations', async function() {
  it('should update the user by uuid', async function(done) {
    req.params.id = 'testtesttesttesttesttesttesttesttest'
    return expect(await new User({ req }).update({})).to.throw(
      TypeError,
      'Update body is empty! Nothing to update.'
    )
  })
})
