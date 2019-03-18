/**
 * Allow operators to be used with graphql queries in the format {field: "operator|value"}
 * @param fields Object containing field operators
 */
export function evaluateFieldOperator(field) {
  if (!field || typeof field !== 'string') return field
  const op = field.split('|')
  // Test for the existence of an operator
  if (op[1] && op[1] !== null && op[1].length > 0) {
    switch (op[0]) {
      case 'lt': {
        return {
          operator: '<',
          value: op[1]
        }
      }
      case 'gt': {
        return {
          operator: '>',
          value: op[1]
        }
      }
      case 'lte': {
        return {
          operator: '<=',
          value: op[1]
        }
      }
      case 'gte': {
        return {
          operator: '>=',
          value: op[1]
        }
      }
      case 'lk': {
        return {
          operator: 'LIKE',
          value: `%${op[1]}%` // op[1].replace('*', '%')
        }
      }
      case 'ne': {
        return {
          operator: '=',
          value: op[1],
          not: true
        }
      }
      default: {
        return {
          operator: '=',
          value: op[1]
        }
      }
    }
  } else {
    return {
      operator: '=',
      value: op,
      not: false
    }
  }
}
