import { evaluateFieldOperator } from '../../../../src/server/lib/queries/builder/evalOperator'
import { expect } from 'chai'

// return {
//   operator: '=',
//   value: op,
//   not: false
// }
export default function() {
  describe('query builders', function() {
    var i = 0
    const testVal = 'test'
    const inputValues = [
      'lte|' + testVal,
      'gte|' + testVal,
      'eq|' + testVal,
      'ne|' + testVal,
      'gt|' + testVal,
      'lt|' + testVal,
      'lk|' + testVal,
      ''
    ]

    const expectedValues: {
      operator: string
      value: string
      not: boolean
    }[] = [
      {
        operator: '<=',
        value: testVal,
        not: false
      },
      {
        operator: '>=',
        value: testVal,
        not: false
      },
      {
        operator: '=',
        value: testVal,
        not: false
      },
      {
        operator: '=',
        value: testVal,
        not: true
      },
      {
        operator: '>',
        value: testVal,
        not: false
      },
      {
        operator: '<',
        value: testVal,
        not: false
      },
      {
        operator: 'LIKE',
        value: `%${testVal}%`,
        not: false
      },
      {
        operator: '=',
        value: '',
        not: false
      }
    ]
    const callback = function() {
      expect(evaluateFieldOperator(inputValues[i])).to.equal(expectedValues[i])
    }
    for (i; i < inputValues.length; i++) {
      it(`should convert ${inputValues[i]} when value is provided`, callback)
    }
  })
}
