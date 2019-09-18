export function replaceStringOperator(stringOp: string) {
  switch (stringOp) {
    case '<':
    case 'lt': {
      return {
        operator: '<',
        not: false
      }
    }
    case '>':
    case 'gt': {
      return {
        operator: '>',
        not: false
      }
    }
    case '<=':
    case 'lte': {
      return {
        operator: '<=',
        not: false
      }
    }
    case '>=':
    case 'gte': {
      return {
        operator: '>=',
        not: false
      }
    }
    case 'lk': {
      return {
        operator: 'LIKE',
        not: false
      }
    }
    case '!=':
    case 'ne': {
      return {
        operator: '=',
        not: true
      }
    }
    default: {
      return {
        operator: '=',
        not: false
      }
    }
  }
}

/**
 * Allow operators to be used with graphql queries in the format {field: "operator|value"}
 * @param fields Object containing field operators
 */
export function evaluateFieldOperator(
  field
): { operator: string; value: string; not: boolean } {
  if (!field || typeof field !== 'string') return field
  const op = field.split('|')
  // Test for the existence of an operator
  if (op[1] && op[1] !== null && op[1].length > 0) {
    const operatorDetails: {
      operator: string
      not: boolean
    } = replaceStringOperator(op[0])

    if (operatorDetails.operator === 'LIKE') {
      return {
        ...operatorDetails,
        value: `%${op[1]}%` // op[1].replace('*', '%')
      }
    }
    return {
      ...operatorDetails,
      value: op[1]
    }
  } else {
    return {
      operator: '=',
      value: field,
      not: false
    }
  }
}
