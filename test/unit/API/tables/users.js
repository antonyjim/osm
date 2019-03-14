//@ts-check
/**
 * Test user functionality
 */

var expect = require('chai').expect
var mocha = require('mocha')
var User = require('./../../../dist/lib/ql/users/users')['default']
var expressStubs = require('./../../expressStubs')
var req = expressStubs.req



describe('User CRUD operations', async function() {
    it('should update the user by uuid', async function(done) {
        req.params.id = 'testtesttesttesttesttesttesttesttest'
        return expect(await new User({req}).update()).to.throw(TypeError, 'Update body is empty! Nothing to update.')
    })
})