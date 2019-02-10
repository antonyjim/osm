/**
 * Entry point for the various tests
 */

var mocha = require('mocha')
var request = require('request')
var expect = require('chai').expect

describe('smoke test', function() {
    it('checks equality', function() {
        expect(true).to.be.true
    })
})